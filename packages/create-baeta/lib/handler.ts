import path from 'node:path';
import { logger } from '@docusaurus/logger';
import shell from 'shelljs';
import supportsColor from 'supports-color';
import { getAppName } from './app-name.ts';
import type { PackageManager } from './constants.ts';
import { getInstallCommand, getPackageManager } from './package-manager.ts';
import { copyTemplate, getTemplate } from './templates.ts';

interface Args {
	packageManager?: PackageManager;
	skipInstall?: boolean;
	appName?: string;
	template?: string;
	rootDir: string;
}

export async function handler(args: Args) {
	const appName = await getAppName(args.appName, args.rootDir);
	const dest = path.resolve(args.rootDir, appName);

	const template = await getTemplate(appName, args.template);

	logger.info('Creating new Baeta project...');

	try {
		await copyTemplate(template, dest);
	} catch (err) {
		logger.error`Copying Baeta template name=${template.name} failed!`;
		throw err;
	}

	const pkgManager = await getPackageManager(dest, args);

	if (!args.skipInstall) {
		shell.cd(dest);
		logger.info`Installing dependencies with name=${pkgManager}...`;
		const result = shell.exec(getInstallCommand(pkgManager), {
			env: {
				...process.env,
				...(supportsColor.stdout ? { FORCE_COLOR: '1' } : {}),
			},
		});

		if (result.code !== 0) {
			console.log('Dependency installation failed.');
			logger.error('Dependency installation failed.');
			logger.info`The app directory has already been created, and you can retry by typing:

code=${`cd ${dest}`}
code=${`${pkgManager} install`}`;

			process.exit(0);
		}
	}

	const useNpm = pkgManager === 'npm';
	const useBun = pkgManager === 'bun';
	const useRunCommand = useNpm || useBun;

	logger.success`Created name=${dest}.`;

	logger.info`Inside that directory, you can run several commands:

  code=${`${pkgManager} start`}
    Starts the development server.

  code=${`${pkgManager} ${useRunCommand ? 'run ' : ''}build`}
    Bundles your server application.

We recommend that you begin by typing:

  code=${`cd ${dest}`}
  code=${`${pkgManager} start`}
`;
}
