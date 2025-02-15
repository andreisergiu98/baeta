import { readFile } from 'node:fs/promises';
import type { Ctx, WatcherFile } from '@baeta/generator-sdk';
import { createExecPlugin } from '@baeta/plugin-exec';
import { resolve } from '@baeta/util-path';
import type { PrismaPluginOptions } from './options.ts';

async function compareSchemas(cwd: string, current: string, generated: string) {
	const [currentSchema, generatedSchema] = await Promise.all([
		readFile(resolve(cwd, current), 'utf-8'),
		readFile(resolve(cwd, generated), 'utf-8').catch(() => null),
	]);
	return currentSchema.replaceAll(' ', '') === generatedSchema?.replaceAll(' ', '');
}

export function createPrismaClientPlugin(options: PrismaPluginOptions) {
	const { prismaSchema, generateCommand, generatedSchemaPath } = options;

	return createExecPlugin({
		name: 'prisma-client',
		actionName: 'Prisma client',
		exec: generateCommand ?? 'prisma generate',
		watch: (generatorOptions, watcher, reload) => {
			const prismaPath = resolve(generatorOptions.cwd, prismaSchema);

			const handleChange = (file: WatcherFile) => {
				if (file.path === prismaPath) {
					reload(file);
				}
			};

			watcher.on('update', handleChange);
			watcher.on('delete', handleChange);
		},
		skip: async (ctx: Ctx) => {
			const schema = resolve(ctx.generatorOptions.cwd, prismaSchema);

			if (ctx.watching && ctx.changedFile?.path !== schema) {
				return true;
			}

			if (!ctx.watching && generatedSchemaPath) {
				return compareSchemas(ctx.generatorOptions.cwd, prismaSchema, generatedSchemaPath);
			}

			return false;
		},
	});
}
