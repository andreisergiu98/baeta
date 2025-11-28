import path, { normalize } from '@baeta/util-path';

const sep = '/';

export function fixPath(root: string, toFix: string) {
	return path.resolve(path.relative(root, toFix));
}

export function getRelativePath(filepath: string, basePath: string) {
	const normalizedFilepath = normalize(filepath);
	const normalizedBasePath = ensureStartsWithSeparator(
		ensureEndsWithSeparator(normalize(basePath)),
	);
	const [, relativePath] = normalizedFilepath.split(normalizedBasePath);
	return relativePath;
}

export function extractModuleDirectory(relativePath: string): string {
	const [moduleDirectory] = relativePath.split(sep);
	return moduleDirectory;
}

function ensureStartsWithSeparator(path: string) {
	return path.startsWith(sep) ? path : sep + path;
}

function ensureEndsWithSeparator(path: string) {
	return path.endsWith(sep) ? path : path + sep;
}
