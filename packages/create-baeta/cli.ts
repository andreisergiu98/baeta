import semver from 'semver';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { packageManagers } from './lib/constants.ts';
import { handler } from './lib/handler.ts';
import { engines, version } from './package.json';

const requiredVersion = engines.node;

if (!semver.satisfies(process.version, requiredVersion)) {
	console.log('Minimum Node.js version not met :(');
	console.info`You are using Node.js number=${process.version}, Requirement: Node.js number=${requiredVersion}.`;
	process.exit(1);
}

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

yargs(hideBin(process.argv))
	.version(version)
	.command({
		command: '* [appName] [template] [rootDir]',
		describe: 'Initialize website',
		builder: (yargs) => {
			return yargs
				.option('package-manager', {
					alias: 'p',
					describe: 'The package manager used to install dependencies.',
					type: 'string',
					choices: packageManagers,
				})
				.option('skip-install', {
					alias: 's',
					describe: 'Do not run package manager immediately after scaffolding',
					type: 'boolean',
				})
				.positional('appName', {
					type: 'string',
					describe: 'Name of the app',
				})
				.positional('template', {
					type: 'string',
					describe: 'Template to use',
					choices: ['yoga', 'apollo'],
				})
				.positional('rootDir', {
					type: 'string',
					describe: 'Root directory',
					default: '.',
				});
		},
		handler: (argv) => handler(argv),
	})
	.showHelpOnFail(true)
	.strict()
	.help()
	.parse();
