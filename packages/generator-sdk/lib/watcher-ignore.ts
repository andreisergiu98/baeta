import micromatch, { scan } from 'micromatch';

export type MatchFn = (testString: string) => boolean;
export type MatchPattern = string | RegExp | MatchFn;

export class WatcherIgnore {
  private files: string[] = [];
  private regexps: RegExp[] = [];
  private functions: MatchFn[] = [];
  private globs: MatchFn[] = [];
  private globsMap: Record<string, MatchFn | undefined> = {};

  ignore(pattern: MatchPattern) {
    if (typeof pattern !== 'string') {
      if (typeof pattern === 'function') {
        this.functions.push(pattern);
      } else {
        this.regexps.push(pattern);
      }
      return;
    }

    const result = scan(pattern);

    if (!result.isBrace && !result.isGlobstar && !result.isExtglob && !result.isGlob) {
      this.files.push(pattern);
      return;
    }

    this.globsMap[pattern] = micromatch.matcher(pattern);
    this.globs = Object.values(this.globsMap).filter(Boolean) as MatchFn[];
  }

  unignore(pattern: MatchPattern) {
    if (typeof pattern === 'string') {
      this.files = this.files.filter((p) => p !== pattern);

      if (this.globsMap[pattern]) {
        delete this.globsMap[pattern];
        this.globs = Object.values(this.globsMap).filter(Boolean) as MatchFn[];
      }
    }

    if (pattern instanceof RegExp) {
      this.regexps = this.regexps.filter((p) => p !== pattern);
    }

    if (typeof pattern === 'function') {
      this.functions = this.functions.filter((p) => p !== pattern);
    }
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
