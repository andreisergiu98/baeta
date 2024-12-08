import type { LoadedBaetaConfig } from '../../lib/config-loader.ts';
import { createCommand, makeErrorMessage, renderComponent } from '../../sdk/index.ts';
import { Builder, BuilderWithGenerator } from './builder.tsx';

interface Args {
	watch?: boolean;
	generate?: boolean;
	onSuccess?: string;
	onError?: string;
}

export function createBuildCommand(config?: LoadedBaetaConfig) {
	return createCommand<Args>({
		command: 'build',
		aliases: ['b'],
		describe: 'build a typescript application',
		builder: (yargs) => {
			return yargs
				.option('watch', {
					alias: 'w',
					boolean: true,
					describe: 'Watch for changes',
				})
				.options('generate', {
					alias: 'g',
					boolean: true,
					describe: 'Run generator before building',
				})
				.option('onSuccess', {
					string: true,
					describe: 'Command to run on a successful build',
				})
				.option('onError', {
					alias: 'f',
					string: true,
					describe: 'Command to run on a build error',
				});
		},
		handler: createHandler(config),
	});
}

function createHandler(config?: LoadedBaetaConfig) {
	return (args: Args) => {
		if (!config) {
			console.log(makeErrorMessage("baeta.js is required to run 'build'"));
			return;
		}

		if (args.generate) {
			return renderComponent(BuilderWithGenerator, args, {
				watchConfig: args.watch,
				initialConfig: config,
			});
		}
		return renderComponent(Builder, args, {
			watchConfig: args.watch,
			initialConfig: config,
		});
	};
}
