import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { type Ctx, createPluginV1, type GeneratorPluginV1WatchOptions } from '@baeta/generator-sdk';
import { resolve } from '@baeta/util-path';

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
	/**
	 * Working directory for string commands, resolved against the generator's working directory.
	 * @defaultValue the generator's working directory
	 */
	cwd?: string;
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
				return await next();
			}

			if (typeof options.exec !== 'string') {
				await options.exec(ctx);
				return await next();
			}

			await runCommand(options.exec, resolve(ctx.generatorOptions.cwd, options.cwd ?? '.'));
			return await next();
		},
	});
}

async function runCommand(command: string, cwd: string) {
	const child = spawn(command, { cwd, shell: true, stdio: ['ignore', 'pipe', 'pipe'] });
	const output: Buffer[] = [];
	child.stdout.on('data', (chunk: Buffer) => output.push(chunk));
	child.stderr.on('data', (chunk: Buffer) => output.push(chunk));

	const [code, signal] = (await once(child, 'close').catch((error) => {
		throw new Error(`Command failed to start in ${cwd}: ${command}`, { cause: error });
	})) as [number | null, NodeJS.Signals | null];

	if (code !== 0) {
		const reason = signal ? `was killed with ${signal}` : `failed with exit code ${code}`;
		const message = Buffer.concat(output).toString().trim();
		throw new Error([`Command ${reason}: ${command}`, message].filter(Boolean).join('\n'));
	}
}

export default createExecPlugin;
