import path, { posixPath } from '@baeta/util-path';
import micromatch from 'micromatch';

export type MatchFn = (testString: string) => boolean;
export type MatchPattern = string | RegExp | MatchFn;

export class WatcherIgnore {
	private readonly cwd: string;
	private files: string[] = [];
	private regexps: RegExp[] = [];
	private functions: MatchFn[] = [];

	private globs: MatchFn[] = [];
	private readonly globsMap = new Map<string, MatchFn>();

	constructor(cwd: string) {
		this.cwd = cwd;
	}

	ignore(pattern: MatchPattern) {
		if (pattern instanceof RegExp) {
			this.regexps.push(pattern);
			return;
		}

		if (typeof pattern === 'function') {
			this.functions.push(pattern);
			return;
		}

		const relativePattern = this.relativeToCwd(pattern);
		if (!this.isMicromatch(relativePattern)) {
			this.files.push(this.resolveFile(pattern));
			return;
		}

		this.globsMap.set(pattern, micromatch.matcher(relativePattern));
		this.globs = Array.from(this.globsMap.values());
	}

	isMicromatch(pattern: string) {
		const result = micromatch.scan(pattern);
		return result.isBrace || result.isGlobstar || result.isExtglob || result.isGlob;
	}

	resolveFile(file: string) {
		return posixPath(path.isAbsolute(file) ? file : path.join(this.cwd, file));
	}

	private relativeToCwd(file: string) {
		const prefix = `${this.cwd}/`;
		return file.startsWith(prefix) ? file.slice(prefix.length) : file;
	}

	unignore(pattern: MatchPattern) {
		if (pattern instanceof RegExp) {
			this.regexps = this.regexps.filter((p) => p !== pattern);
			return;
		}

		if (typeof pattern === 'function') {
			this.functions = this.functions.filter((p) => p !== pattern);
			return;
		}

		if (!this.isMicromatch(this.relativeToCwd(pattern))) {
			const file = this.resolveFile(pattern);
			this.files = this.files.filter((p) => p !== file);
			return;
		}

		this.globsMap.delete(pattern);
		this.globs = Array.from(this.globsMap.values());
	}

	isIgnored(path: string) {
		if (this.files.includes(path)) {
			return true;
		}

		const relativePath = this.relativeToCwd(path);
		if (this.globs.some((f) => f(relativePath))) {
			return true;
		}

		if (this.regexps.some((r) => r.test(path))) {
			return true;
		}

		if (this.functions.some((f) => f(path))) {
			return true;
		}

		return false;
	}
}
