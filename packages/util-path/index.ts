import path from 'path';
import upath from 'upath';

export const addExt = upath.addExt;
export const basename = upath.basename;
export const changeExt = upath.changeExt;
export const defaultExt = upath.defaultExt;
export const delimiter = upath.delimiter;
export const dirname = upath.dirname;
export const extname = upath.extname;
export const format = upath.format;
export const isAbsolute = upath.isAbsolute;
export const join = upath.join;
export const joinSafe = upath.joinSafe;
export const normalize = upath.normalize;
export const normalizeSafe = upath.normalizeSafe;
export const normalizeTrim = upath.normalizeTrim;
export const parse = upath.parse;
export const posix = upath.posix;
export const relative = upath.relative;
export const removeExt = upath.removeExt;
export const resolve = upath.resolve;
export const sep = upath.sep;
export const toUnix = upath.toUnix;
export const trimExt = upath.trimExt;
export const win32 = upath.win32;

export function posixPath(pathname: string) {
  return pathname.split(path.win32.sep).join(path.posix.sep);
}

export function winPath(pathname: string) {
  return pathname.split(path.posix.sep).join(path.win32.sep);
}

export default upath;
