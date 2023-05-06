export { isMatch } from 'micromatch';
export { micromatch };

import micromatch, { scan } from 'micromatch';

import { AsyncSubscription, Event, EventType, Options, subscribe } from '@parcel/watcher';
import path from 'path';

export type WatcherListener = (path: WatcherFile) => void;

type MatchFn = (testString: string) => boolean;
type MatchPattern = string | RegExp | MatchFn;

export interface WatcherFile {
  type: EventType;
  path: string;
  relativePath: string;
}

class WatcherIgnore {
  private ignoredFiles: string[] = [];
  private ignoredRegexes: RegExp[] = [];
  private ignoredFunctions: MatchFn[] = [];
  private ignoredGlobs: MatchFn[] = [];

  private ignoredGlobsMap: Record<string, MatchFn | undefined> = {};

  ignore(pattern: MatchPattern) {
    if (typeof pattern !== 'string') {
      if (typeof pattern === 'function') {
        this.ignoredFunctions.push(pattern);
      } else {
        this.ignoredRegexes.push(pattern);
      }
      return;
    }

    const result = scan(pattern);

    if (!result.isBrace && !result.isGlobstar && !result.isExtglob && !result.isGlob) {
      this.ignoredFiles.push(pattern);
    }

    this.ignoredGlobsMap[pattern] = micromatch.matcher(pattern);
    this.ignoredGlobs = Object.values(this.ignoredGlobsMap).filter(Boolean) as MatchFn[];
  }

  unignore(pattern: MatchPattern) {
    if (typeof pattern === 'string') {
      this.ignoredFiles = this.ignoredFiles.filter((p) => p !== pattern);

      if (this.ignoredGlobsMap[pattern]) {
        delete this.ignoredGlobsMap[pattern];
        this.ignoredGlobs = Object.values(this.ignoredGlobsMap).filter(Boolean) as MatchFn[];
      }
    }

    if (pattern instanceof RegExp) {
      this.ignoredRegexes = this.ignoredRegexes.filter((p) => p !== pattern);
    }

    if (typeof pattern === 'function') {
      this.ignoredFunctions = this.ignoredFunctions.filter((p) => p !== pattern);
    }
  }

  isIgnored(path: string) {
    if (this.ignoredFiles.includes(path)) {
      return true;
    }

    if (this.ignoredGlobs.some((f) => f(path))) {
      return true;
    }

    if (this.ignoredRegexes.some((r) => r.test(path))) {
      return true;
    }

    if (this.ignoredFunctions.some((f) => f(path))) {
      return true;
    }

    return false;
  }
}

export class Watcher {
  private subscriptionPromise: Promise<AsyncSubscription>;
  private subscription: AsyncSubscription | undefined;

  private listeners: Record<EventType, WatcherListener[]> = {
    create: [],
    update: [],
    delete: [],
  };

  private watcherIgnore = new WatcherIgnore();

  constructor(private readonly cwd: string, options?: Options) {
    this.subscriptionPromise = subscribe(cwd, this.onEvents, options);
    this.subscriptionPromise.then((subscription) => {
      this.subscription = subscription;
    });
  }

  onEvents = (err: Error | null, events: Event[]) => {
    if (err) {
      console.error(err);
      return;
    }

    const filteredEvents = events.filter((event) => {
      return !this.watcherIgnore.isIgnored(event.path);
    });

    for (const event of filteredEvents) {
      for (const listener of this.listeners[event.type]) {
        listener({
          type: event.type,
          path: event.path,
          relativePath: path.relative(this.cwd, event.path),
        });
      }
    }
  };

  on(event: EventType, listener: WatcherListener) {
    this.listeners[event].push(listener);
  }

  off(event: EventType, listener: WatcherListener) {
    this.listeners[event] = this.listeners[event].filter((l) => l !== listener);
  }

  ignore(pattern: MatchPattern) {
    this.watcherIgnore.ignore(pattern);
  }

  unignore(pattern: MatchPattern) {
    this.watcherIgnore.unignore(pattern);
  }

  async close() {
    const subscription = this.subscription || (await this.subscriptionPromise);
    await subscription.unsubscribe();
  }
}
