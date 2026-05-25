import type { Source } from '@baeta/util-graphql';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { parse, print } from 'graphql';
import type { FederationInfo } from './federation-info.ts';
import type { FederationSpec } from './spec.ts';

export function printSDL(
	spec: FederationSpec,
	sources: Source[],
	federationInfo: FederationInfo,
): string {
	const importList = [...federationInfo.usedDirectiveNames].map((name) => `"${name}"`).join(', ');
	const repeatableDirectives = new Set(
		spec.directives.filter((d) => d.repeatable).map((d) => d.name.replace('@', '')),
	);
	const link = `extend schema @link(url: "https://specs.apollo.dev/federation/v${spec.version}", import: [${importList}])`;
	const merged = mergeTypeDefs(
		[parse(link), ...sources.map((s) => s.document).filter((el) => el != null)],
		{
			useSchemaDefinition: false,
			repeatableLinkImports: repeatableDirectives,
		},
	);
	const sdl = ['', print(merged), ''].join('\n');
	return `export default ${JSON.stringify(sdl)};\n`;
}
