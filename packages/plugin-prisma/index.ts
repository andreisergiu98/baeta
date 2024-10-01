import { createPrismaClientPlugin } from './lib/client-generator';
import { PrismaPluginOptions } from './lib/options';

export type { PrismaPluginOptions };
export default prismaPlugin;

export function prismaPlugin(options: PrismaPluginOptions) {
	if (options.generateClient === false) {
		return [];
	}
	return [createPrismaClientPlugin(options)];
}
