import { createPrismaClientPlugin } from './lib/client-generator.ts';
import type { PrismaPluginOptions } from './lib/options.ts';

export type { PrismaPluginOptions };
export default prismaPlugin;

/**
 * A plugin that manages Prisma client generation in your Baeta project.
 * See https://baeta.io/docs/plugins/prisma
 *
 * @param options - Configuration options for the pagination plugin
 * @returns A Baeta generator plugin
 */
export function prismaPlugin(options: PrismaPluginOptions) {
	if (options.generateClient === false) {
		return [];
	}
	return [createPrismaClientPlugin(options)];
}
