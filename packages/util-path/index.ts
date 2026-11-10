import path from 'node:path';
import { relative } from 'pathe';

export * from 'pathe';
export { default } from 'pathe';

export function posixPath(pathname: string) {
	return pathname.split(path.win32.sep).join(path.posix.sep);
}

export function winPath(pathname: string) {
	return pathname.split(path.posix.sep).join(path.win32.sep);
}

export function makeRelativePathForImport(from: string, to: string) {
	const res = posixPath(relative(from, to));
	if (res.startsWith('.') || res.startsWith('/')) {
		return res;
	}
	return `./${res}`;
}
