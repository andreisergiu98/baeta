import path from 'node:path';

export * from 'pathe';
export { default } from 'pathe';

export function posixPath(pathname: string) {
	return pathname.split(path.win32.sep).join(path.posix.sep);
}

export function winPath(pathname: string) {
	return pathname.split(path.posix.sep).join(path.win32.sep);
}
