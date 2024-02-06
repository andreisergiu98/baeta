import micromatch from 'micromatch';
import path from '@baeta/util-path';

export type MatchFn = (testString: string) => boolean;
export type MatchPattern = string | RegExp | MatchFn;

export class WatcherIgnore {
  private files: string[] = [];
  private regexps: RegExp[] = [];
  private functions: MatchFn[] = [];

  private globs: MatchFn[] = [];
  private globsMap = new Map<string, MatchFn>();

  constructor(private readonly cwd: string) {}

  ignore(pattern: MatchPattern) {
    if (pattern instanceof RegExp) {
      this.regexps.push(pattern);
      return;
    }

    if (typeof pattern === 'function') {
      this.functions.push(pattern);
      return;
    }

    if (!this.isMicromatch(pattern)) {
      this.files.push(this.resolveFile(pattern));
      return;
    }

    this.globsMap.set(pattern, micromatch.matcher(pattern));
    this.globs = Array.from(this.globsMap.values());
  }

  isMicromatch(pattern: string) {
    const result = micromatch.scan(pattern);
    return result.isBrace || result.isGlobstar || result.isExtglob || result.isGlob;
  }

  resolveFile(file: string) {
    return path.isAbsolute(file) ? file : path.join(this.cwd, file);
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

    if (!this.isMicromatch(pattern)) {
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

    if (this.globs.some((f) => f(path))) {
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
