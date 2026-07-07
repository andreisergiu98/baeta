import path from 'node:path';
import { execa } from 'execa';
import { getAppName } from './app-name.ts';
import type { PackageManager } from './constants.ts';
import { logger } from './logger.ts';
import { getInstallArgs, getPackageManager } from './package-manager.ts';
import { getRuntime } from './runtime.ts';
import { copyTemplate, getTemplate } from './templates.ts';

export interface Args {
	packageManager?: PackageManager;
	skipInstall?: boolean;
	appName?: string;
	template?: string;
	rootDir: string;
}

export async function handler(args: Args) {
	const appName = await getAppName(args.appName, args.rootDir);
	const dest = path.resolve(args.rootDir, appName);

	const template = await getTemplate(args.template);

	const runtime = await getRuntime();

	logger.info('Creating new Baeta project...');

	try {
		await copyTemplate(appName, runtime, template, dest);
	} catch (err) {
		logger.error`Copying Baeta template name=${template} failed!`;
		throw err;
	}

	const pkgManager = await getPackageManager(dest, args);

	const useNpm = pkgManager === 'npm';
	const useBun = pkgManager === 'bun';
	const useRunCommand = useNpm || useBun;
	const runCommand = useRunCommand ? 'run ' : '';

	const start = `${pkgManager} start`;
	const build = `${pkgManager} ${runCommand}build`;
	const cd = `cd ${dest}`;
	const install = `${pkgManager} install`;

	if (!args.skipInstall) {
		logger.info`Installing dependencies with name=${pkgManager}...`;
		const result = await execa(pkgManager, getInstallArgs(pkgManager), {
			cwd: dest,
			stdio: 'inherit',
			reject: false,
		});

		if (result.failed) {
			logger.error('Dependency installation failed.');
			logger.info`The app directory has already been created, and you can retry by typing:

code=${cd}
code=${install}`;

			process.exit(1);
		}
	}

	logger.success`Created name=${dest}.`;

	logger.info`Inside that directory, you can run several commands:

  code=${start}
    Starts the development server.

  code=${build}
    Generates the Baeta application.

We recommend that you begin by typing:

  code=${cd}
  code=${start}
`;
}
