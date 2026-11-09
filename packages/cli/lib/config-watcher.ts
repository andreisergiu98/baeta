import { realpathSync } from 'node:fs';
import { Watcher } from '@baeta/generator';
import path, { posixPath } from '@baeta/util-path';
import { isMatchingConfigFilename } from './config-loader.ts';

export function watchConfig(onChange: () => void) {
	const configDir = posixPath(realpathSync(process.cwd()));
	const watcher = new Watcher(configDir);
	watcher.ignore(
		(eventPath) =>
			path.dirname(eventPath) !== configDir || !isMatchingConfigFilename(path.basename(eventPath)),
	);
	watcher.on('create', onChange);
	watcher.on('update', onChange);
	watcher.on('delete', onChange);
	return watcher;
}
