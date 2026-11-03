import { createPluginV1, type WatcherFile } from '@baeta/generator-sdk';
import { generate } from './lib/codegen.ts';
import { createSchemaWatchMatcher } from './lib/schema-watch.ts';

export function graphqlPlugin() {
	return createPluginV1({
		name: 'graphql',
		actionName: 'GraphQL modules',
		watch: (options, watcher, reload) => {
			const isSchemaFile = createSchemaWatchMatcher(options.schemas);

			const handleChange = (file: WatcherFile) => {
				if (isSchemaFile(file)) {
					reload(file);
				}
			};
			watcher.on('create', handleChange);
			watcher.on('update', handleChange);
			watcher.on('delete', handleChange);
		},
		generate: async (ctx, next) => {
			const items = await generate(ctx.generatorOptions, ctx.fileManager.files);
			for (const item of items) {
				ctx.fileManager.createAndAdd(item.filename, item.content, 'graphql', item.options);
			}
			return await next();
		},
	});
}
