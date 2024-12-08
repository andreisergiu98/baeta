import type { LoadedBaetaConfig } from '../../lib/config-loader.ts';
import { createCommand, makeErrorMessage, renderComponent } from '../../sdk/index.ts';
import { Generator } from './generator.tsx';

interface Args {
	watch?: boolean;
	skipInitial?: boolean;
	run?: string;
}

export function createGenerateCommand(config?: LoadedBaetaConfig) {
	return createCommand<Args>({
		command: 'generate',
		aliases: ['g'],
		describe: 'generate types and module definitions',
		builder: (yargs) => {
			return yargs
				.option('watch', {
					alias: 'w',
					boolean: true,
					describe: 'Watch for changes',
				})
				.option('skipInitial', {
					alias: 's',
					boolean: true,
					describe: 'Skip initial generation when running in watch mode',
				})
				.option('run', {
					alias: 'r',
					string: true,
					describe:
						"Command to run after generation. If it's a long running process (ie. `bun --watch`), it will be kept alive.",
				});
		},
		handler: createHandler(config),
	});
}

function createHandler(config?: LoadedBaetaConfig) {
	return (args: Args) => {
		if (!config) {
			console.log(makeErrorMessage("baeta.js is required to run 'generate'"));
			return;
		}

		return renderComponent(
			Generator,
			{
				watch: args.watch,
				skipInitial: args.skipInitial,
				run: args.run,
			},
			{
				watchConfig: args.watch,
				initialConfig: config,
			},
		);
	};
}
