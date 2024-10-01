import { WatcherFile, createPluginV1, isMatch } from '@baeta/generator-sdk';
import { generate } from './lib/codegen';

export function graphqlPlugin() {
	return createPluginV1({
		name: 'graphql',
		actionName: 'GraphQL modules',
		watch: (options, watcher, reload) => {
			const handleChange = (file: WatcherFile) => {
				if (isMatch(file.relativePath, options.schemas)) {
					reload(file);
				}
			};

			watcher.on('update', handleChange);
			watcher.on('delete', handleChange);
		},
		generate: async (ctx, next) => {
			const items = await generate(ctx.generatorOptions);

			for (const item of items) {
				ctx.fileManager.createAndAdd(item.filename, item.content, 'graphql');
			}

			return next();
		},
	});
}
