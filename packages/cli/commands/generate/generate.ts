import type { LoadedBaetaConfig } from '../../lib/config-loader.ts';
import { createCommand, makeErrorMessage, renderComponent } from '../../sdk/index.ts';
import { Generator } from './generator.tsx';

interface Args {
	watch?: boolean;
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
			console.log(makeErrorMessage("baeta.ts is required to run 'generate'"));
			return;
		}

		renderComponent(
			Generator,
			{
				watch: args.watch,
				run: args.run,
			},
			{
				watchConfig: args.watch,
				initialConfig: config,
			},
		);
	};
}
