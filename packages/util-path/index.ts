import path, { type ParsedPath } from 'node:path';
import upath from 'upath';

export function posixPath(pathname: string) {
	return pathname.split(path.win32.sep).join(path.posix.sep);
}

export function winPath(pathname: string) {
	return pathname.split(path.posix.sep).join(path.win32.sep);
}

export const addExt = upath.addExt;
export const basename = upath.basename;
export const changeExt = upath.changeExt;
export const defaultExt = upath.defaultExt;
export const delimiter = upath.delimiter;
export const dirname = upath.dirname;
export const extname = upath.extname;

/**
 * Returns a path string from an object - the opposite of parse().
 *
 * @param pathObject path to evaluate.
 */
export const format = upath.format as (pathObject: ParsedPath) => string;

export const isAbsolute = upath.isAbsolute;
export const join = upath.join;

/**
 * Exactly like path.join(), but it keeps the first meaningful ./.
 *
 * Note that the unix / is returned everywhere, so windows \ is always converted to unix /.
 *
 * @param paths string paths to join
 */
// biome-ignore lint/suspicious/noExplicitAny: accept any arguments
export const joinSafe = upath.joinSafe as (...paths: any[]) => string;

export const normalize = upath.normalize;
export const normalizeSafe = upath.normalizeSafe;
export const normalizeTrim = upath.normalizeTrim;
export const parse = upath.parse;
export const posix = upath.posix;
export const relative = upath.relative;

/**
 * Removes the specific ext extension from filename, if it has it. Otherwise it leaves it as is. As in all upath functions, it be .ext or ext.
 *
 * @param filename string filename to remove extension to
 * @param ext string extension to remove
 */
export const removeExt = upath.removeExt as (filename: string, ext: string) => string;

export const resolve = upath.resolve;
export const sep = upath.sep;
export const toUnix = upath.toUnix;
export const trimExt = upath.trimExt;
export const win32 = upath.win32;

export default {
	addExt,
	basename,
	changeExt,
	defaultExt,
	delimiter,
	dirname,
	extname,
	format,
	isAbsolute,
	join,
	joinSafe,
	normalize,
	normalizeSafe,
	normalizeTrim,
	parse,
	posix,
	relative,
	removeExt,
	resolve,
	sep,
	toUnix,
	trimExt,
	win32,
	posixPath,
	winPath,
};
