import { createPrismaClientPlugin } from './lib/client-generator.ts';
import type { PrismaPluginOptions } from './lib/options.ts';

export type { PrismaPluginOptions };
export default prismaPlugin;

export function prismaPlugin(options: PrismaPluginOptions) {
	if (options.generateClient === false) {
		return [];
	}
	return [createPrismaClientPlugin(options)];
}
