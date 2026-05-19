import { getModuleExportName } from '@baeta/generator-sdk';
import { relative } from '@baeta/util-path';
import type { FederationInfo } from './federation-info.ts';
import type { FederationDirectiveName, FederationDirectiveScalar, FederationSpec } from './spec.ts';

interface PrintResolversOptions {
	extension: '' | '.ts' | '.js';
	moduleName: string;
	typesDir: string;
	federationRootDir: string;
	moduleDefinitionName: string;
	includedDirectiveNames: Set<FederationDirectiveName>;
}

export function printResolvers(
	spec: FederationSpec,
	info: FederationInfo,
	options: PrintResolversOptions,
): string {
	const moduleExportName = getModuleExportName(options.moduleName);
	const relativeGeneratedTypesDir = relative(options.federationRootDir, options.typesDir);
	const imports = [
		'import * as BaetaFederation from "@baeta/federation"',
		info.resolvableEntitiesMap.size > 0
			? `import type * as FederationTypes from "${relativeGeneratedTypesDir}/federation${options.extension}"`
			: null,
		`import federationSDL from "./federation-sdl${options.extension}"`,
		`import { ${moduleExportName} } from "./${options.moduleDefinitionName}${options.extension}"`,
		info.resolvableEntitiesMap.size > 0
			? `import handlersMap from "./entity-handlers${options.extension}"`
			: null,
	]
		.filter((el) => el != null)
		.join(';\n');

	const scalars = getUniqueScalars(spec, options.includedDirectiveNames);
	const scalarResolvers = scalars.map(printScalarResolver);

	const moduleExportBody = [
		printQueryTypeResolver(info, moduleExportName),
		printServiceTypeResolver(moduleExportName),
		printScalarResolver({ name: '_Any', serialize: 'json' }),
		...scalarResolvers,
	]
		.map(ident(2))
		.join(',\n');

	const moduleExport = [
		`export default ${moduleExportName}.$schema({`,
		moduleExportBody,
		'});',
	].join('\n');

	return [imports, '', moduleExport].join('\n');
}

function printScalarResolver(scalar: FederationDirectiveScalar) {
	return `${scalar.name}: BaetaFederation.createFederationScalar('${scalar.serialize}', '${scalar.name}')`;
}

function printServiceTypeResolver(moduleExportName: string) {
	return [
		`_Service: ${moduleExportName}._Service.$fields({`,
		`  sdl: ${moduleExportName}._Service.sdl.key('sdl'),`,
		'})',
	].join('\n');
}

function printQueryTypeResolver(info: FederationInfo, moduleExportName: string) {
	return [
		`Query: ${moduleExportName}.Query.$fields({`,
		info.resolvableEntitiesMap.size > 0 ? printEntityFieldResolver(moduleExportName) : null,
		`  _service: ${moduleExportName}.Query._service.resolve(() => {`,
		'    return { sdl: federationSDL };',
		'  }),',
		'})',
	]
		.filter((el) => el != null)
		.join('\n');
}

function printEntityFieldResolver(moduleExportName: string) {
	return [
		`_entities: ${moduleExportName}.Query._entities.resolve((params) => {`,
		'  const representations = params.args.representations as FederationTypes.EntityRepresentation[];',
		'  return BaetaFederation.resolveEntities(representations, handlersMap satisfies FederationTypes.EntityHandlerMap, params.ctx, params.info);',
		'}),',
	]
		.map(ident(2))
		.join('\n');
}

function getUniqueScalars(
	spec: FederationSpec,
	included: Set<FederationDirectiveName>,
): FederationDirectiveScalar[] {
	const seen = new Set<string>();
	const scalars: FederationDirectiveScalar[] = [];
	for (const directive of spec.directives) {
		if (!included.has(directive.name)) continue;
		if (!directive.scalars) continue;
		for (const scalar of directive.scalars) {
			if (seen.has(scalar.name)) continue;
			seen.add(scalar.name);
			scalars.push(scalar);
		}
	}
	return scalars;
}
function ident(spaces: number) {
	return (str: string) => {
		const padding = ' '.repeat(spaces);
		return str
			.split('\n')
			.map((line) => padding + line)
			.join('\n');
	};
}
