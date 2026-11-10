import { type CliContext, createCommand, makeWarningMessage } from '@baeta/cli-sdk';
import { runApp } from '../lib/app.ts';
import { createGeneratorOutput, isInteractive } from '../lib/generator-output.ts';

export function createGenerateCommand() {
	return createCommand({
		name: 'generate',
		aliases: ['g'],
		describe: 'generate types and module definitions',
		options: {
			watch: {
				type: 'boolean',
				short: 'w',
				describe: 'Watch for changes',
			},
			run: {
				type: 'string',
				short: 'r',
				describe:
					'Command to start after the first generation. With --watch, restarted after a crash.',
			},
		},
		handler: async (args, ctx) => {
			if (!ctx.config.ok) {
				throw ctx.config.error;
			}
			const watch = args.watch ?? false;
			if (args.run != null) {
				await generateAndRun(ctx, args.run, watch);
				return;
			}
			const output = createGeneratorOutput({ watch, live: isInteractive(process.stderr) });
			if (watch) {
				await ctx.generator.watch(output.events);
			} else {
				await ctx.generator.generate(output.events);
			}
		},
	});
}

async function generateAndRun(ctx: CliContext, command: string, watch: boolean) {
	const exit = Promise.withResolvers<number>();
	let started = false;
	let running = false;
	const output = createGeneratorOutput({
		watch,
		live: false,
		tagged: true,
		onEnd: () => {
			if (running) {
				return;
			}
			started = true;
			running = true;
			runApp(command).then(({ code, interrupted }) => {
				if (watch && code !== 0 && !interrupted) {
					running = false;
					output.print(
						makeWarningMessage(
							`App exited with code ${code}. Restarting it after the next generation.`,
						),
					);
				} else {
					exit.resolve(code);
				}
			}, exit.reject);
		},
	});

	if (!watch) {
		await ctx.generator.generate(output.events);
		if (started) {
			process.exitCode = await exit.promise;
		}
		return;
	}

	const close = await ctx.generator.watch(output.events);
	try {
		process.exitCode = await exit.promise;
	} finally {
		await close();
	}
}
