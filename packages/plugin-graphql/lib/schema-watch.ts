import { isMatch, type WatcherFile } from '@baeta/generator-sdk';
import { isAbsolute } from '@baeta/util-path';

export function createSchemaWatchMatcher(schemas: string[]) {
	const includes = schemas.filter((glob) => !glob.startsWith('!'));
	const excludes = schemas.filter((glob) => glob.startsWith('!')).map((glob) => glob.slice(1));
	return (file: WatcherFile) =>
		includes.some((glob) => matchesGlob(file, glob)) &&
		!excludes.some((glob) => matchesGlob(file, glob));
}

function matchesGlob(file: WatcherFile, glob: string) {
	return isMatch(isAbsolute(glob) ? file.path : file.relativePath, glob);
}
