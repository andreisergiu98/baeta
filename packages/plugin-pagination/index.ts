import { createPluginV1, getModuleExportName } from '@baeta/generator-sdk';
import { join, parse } from '@baeta/util-path';

/**
 * Configuration options for a specific pagination type
 */
export interface PaginationTypeOptions {
	/** The GraphQL type for nodes (e.g., "User!") */
	nodeType?: string;
	/** The GraphQL type for cursors
	 * @defaultValue "ID!"
	 */
	cursorType?: string;
	/**
	 * Additional fields to add to the edge type
	 * @example edgeFields: ["hasPhotos: Boolean!"]
	 */
	edgeFields?: string[];
	/**
	 *  Additional fields to add to the connection type
	 * @example connectionFields: ["totalCount: Int!"]
	 */
	connectionFields?: string[];
}

/**
 * Configuration options for the pagination plugin
 */
export interface PaginationOptions<Keys extends string | number | symbol = string> {
	/**
	 * Map of type names to their pagination configuration.
	 * @example
	 * ```typescript
	 * {
	 *   // Simple configuration
	 *   User: true,
	 *
	 *   // Advanced configuration
	 *   UserCustom: {
	 *     nodeType: "User",
	 *     cursorType: "UUID!",
	 *     connectionFields: ["totalCount: Int!"],
	 *     edgeFields: ["hasPhotos: Boolean!"]
	 *   }
	 * }
	 * ```
	 */
	types: {
		[key in Keys]?: boolean | PaginationTypeOptions;
	};
	/**
	 * Whether the node field should be nullable in all connections
	 * @defaultValue true
	 */
	nullableNode?: boolean;
	/**
	 * Additional fields to add to the PageInfo type
	 * @example ["hasMorePages: Boolean!"]
	 */
	pageInfoFields?: string[];
	/**
	 * Custom name for the pagination module
	 * @defaultValue 'baeta-pagination'
	 */
	moduleName?: string;
}

function printFields(fields: string[]) {
	return fields.map((field) => `  ${field}`).join('\n');
}

function printType(name: string, fields: string[]) {
	return `type ${name} {
${printFields(fields)}
}`;
}

function printTypes(types: string[]) {
	return `${types.join('\n\n')}\n`;
}

function printPageInfo(addFields: string[] = []) {
	return printType('PageInfo', [
		...addFields,
		'hasPreviousPage: Boolean!',
		'hasNextPage: Boolean!',
	]);
}

function printResolversForType(module: string, type: string, fields: string[]) {
	return `${type}: ${module}.${type}.$fields({
${fields
	.map((field) => printResolverForField(module, type, field))
	.map(indent(4))
	.join(',\n')}
})`;
}

function printResolverForField(module: string, type: string, field: string) {
	return `${field}: ${module}.${type}.${field}.key('${field}').undefinedAsNull()`;
}

function getFieldNameFromFieldWithType(field: string) {
	const [fieldName] = field.split(':');
	return fieldName;
}

function printExport(
	moduleDefinitionName: string,
	moduleName: string,
	importExt: string,
	options: PaginationOptions,
) {
	const module = getModuleExportName(moduleName);
	const typedef = parse(moduleDefinitionName).name + importExt;

	const pageInfoResolver = printResolversForType(module, 'PageInfo', [
		'hasNextPage',
		'hasPreviousPage',
		...(options.pageInfoFields?.map(getFieldNameFromFieldWithType) ?? []),
	]);

	const typesResolvers = Object.entries(options.types).flatMap(([type, typeOptions]) => {
		if (typeOptions == null || typeOptions === false) {
			return [];
		}
		const extraEdgeFields = (typeOptions === true ? [] : (typeOptions.edgeFields ?? [])).map(
			getFieldNameFromFieldWithType,
		);
		const extraConnectionFields = (
			typeOptions === true ? [] : (typeOptions.connectionFields ?? [])
		).map(getFieldNameFromFieldWithType);
		return [
			printResolversForType(module, `${type}Connection`, [
				'pageInfo',
				'edges',
				...extraConnectionFields,
			]),
			printResolversForType(module, `${type}Edge`, ['cursor', 'node', ...extraEdgeFields]),
		];
	});

	return `import { ${module} } from "./${typedef}";

export default ${module}.$schema({
${[pageInfoResolver, ...typesResolvers].map(indent(4)).join(',\n')}
});
`;
}

function indent(size: number) {
	return (text: string) =>
		text
			.split('\n')
			.map((line) => ' '.repeat(size) + line)
			.join('\n');
}

function printConnectionTypes(
	name: string,
	typeOptions: PaginationTypeOptions,
	options: PaginationOptions,
) {
	const {
		cursorType = 'ID!',
		nodeType = name,
		connectionFields = [],
		edgeFields = [],
	} = typeOptions;

	const connection = printType(`${name}Connection`, [
		...connectionFields,
		'pageInfo: PageInfo!',
		`edges: [${name}Edge]`,
	]);

	const edge = printType(`${name}Edge`, [
		...edgeFields,
		`cursor: ${cursorType}`,
		`node: ${nodeType}${options.nullableNode === false ? '!' : ''}`,
	]);

	return [connection, edge];
}

function createConnectionModuleDir(modulesDir: string, moduleName: string) {
	return join(modulesDir, moduleName);
}

function createGqlFilename(moduleDir: string) {
	return `${moduleDir}/connections.gql`;
}

function createExportFilename(moduleDir: string) {
	return `${moduleDir}/index.ts`;
}

/**
 * A plugin that generates Relay-style pagination types for GraphQL.
 * See https://baeta.io/docs/plugins/pagination for more details
 *
 * @param options - Configuration options for the pagination plugin
 * @returns A Baeta generator plugin
 */
export function paginationPlugin<T>(options: PaginationOptions<keyof T>) {
	const { moduleName = 'baeta-pagination' } = options;

	return createPluginV1({
		name: 'pagination',
		actionName: 'pagination connections',
		watch: (generatorOptions, watcher) => {
			watcher.ignore(`${createConnectionModuleDir(generatorOptions.modulesDir, moduleName)}/**`);
		},
		generate: async (ctx, next) => {
			const types: string[] = [printPageInfo(options.pageInfoFields)];

			for (const name in options.types) {
				const typeOptions = options.types[name];
				if (typeOptions == null || typeOptions === false) {
					continue;
				}

				const connectionTypes = printConnectionTypes(
					name,
					typeOptions === true ? {} : typeOptions,
					options,
				);

				types.push(...connectionTypes);
			}

			const moduleDir = createConnectionModuleDir(ctx.generatorOptions.modulesDir, moduleName);

			const definitionFile = ctx.fileManager.createAndAdd(
				createGqlFilename(moduleDir),
				printTypes(types),
				'pagination',
			);
			await definitionFile.write();

			ctx.fileManager.add(definitionFile);

			ctx.fileManager.createAndAdd(
				createExportFilename(moduleDir),
				printExport(
					ctx.generatorOptions.moduleDefinitionName,
					moduleName,
					ctx.generatorOptions.importExtension,
					options,
				),
				'pagination',
			);

			return next();
		},
	});
}
