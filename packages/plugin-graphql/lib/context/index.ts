import type { PluginFunction, Types } from '@graphql-codegen/plugin-helpers';
import { buildMapperImport, parseMapper } from '@graphql-codegen/visitor-plugin-common';
import type { GraphQLSchema } from 'graphql';

interface Config {
	contextType: string | undefined;
}

export const plugin: PluginFunction<Config> = async (
	schema: GraphQLSchema,
	documents: Types.DocumentFile[],
	config: Config,
): Promise<Types.PluginOutput> => {
	const prepend: string[] = [];
	const mapper = parseMapper(config.contextType || 'any');

	if (mapper.isExternal && mapper.source) {
		const identifier = mapper.default ? 'ContextType' : `${mapper.import} as ContextType`;

		const result = buildMapperImport(
			mapper.source,
			[
				{
					identifier,
					asDefault: mapper.default,
				},
			],
			true,
		);

		if (result) {
			prepend.push(result);
		}
	} else {
		prepend.push(`type ContextType = ${mapper.type}`);
	}

	prepend.push('export type { ContextType }');

	return {
		content: '',
		prepend: prepend,
	};
};

export default { plugin };
