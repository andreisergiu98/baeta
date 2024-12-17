import { type Ctx, type GeneratorPluginV1WatchOptions, createPluginV1 } from '@baeta/generator-sdk';
import { execaCommand } from 'execa';

/**
 * Configuration options for the exec plugin.
 */
export interface ExecPluginOptions {
	/** Plugin name displayed in logs */
	name?: string;
	/**
	 * Action name displayed in the generation status.
	 * Shows as "Generating {actionName}..."
	 */
	actionName?: string;
	/**
	 * Command to execute - can be either:
	 * - A string command to be executed via shell
	 * - A function that receives the generator context
	 */
	exec: string | ((ctx: Ctx) => void | Promise<void>);
	/** File watching configuration */
	watch?: GeneratorPluginV1WatchOptions;
	/**
	 * Optional function to determine if execution should be skipped
	 * @returns true if execution should be skipped, false otherwise
	 */
	skip?: (ctx: Ctx) => boolean | Promise<boolean>;
}

/**
 * A plugin that executes commands or functions during generation.
 *
 * @param options - Plugin configuration options
 * @returns A Baeta generator plugin
 *
 */
export function createExecPlugin(options: ExecPluginOptions) {
	return createPluginV1({
		name: options.name || 'exec-plugin',
		actionName: options.actionName || 'custom command',
		watch: options.watch,
		generate: async (ctx, next) => {
			const skipped = await options.skip?.(ctx);

			if (skipped === true) {
				return next();
			}

			if (typeof options.exec !== 'string') {
				await options.exec(ctx);
				return next();
			}

			const child = execaCommand(options.exec, {
				cwd: process.cwd(),
				stdio: 'pipe',
			});

			await child.catch((err) => {
				throw new Error(err.stderr);
			});

			return next();
		},
	});
}

export default createExecPlugin;
