export { isMatch } from 'micromatch';
export { micromatch };

import micromatch from 'micromatch';

import { AsyncSubscription, EventType, Options, subscribe } from '@parcel/watcher';
import path from 'path';

export type WatcherListener = (path: WatcherFile) => void;

type MatchFn = (testString: string) => boolean;
type MatchPattern = string | RegExp | MatchFn;

export interface WatcherFile {
  type: EventType;
  path: string;
  relativePath: string;
}

export class Watcher {
  private subscriptionPromise: Promise<AsyncSubscription>;
  private subscription: AsyncSubscription | undefined;

  private listeners: Record<EventType, WatcherListener[]> = {
    create: [],
    update: [],
    delete: [],
  };

  private ignored: MatchPattern[] = [];

  constructor(private readonly cwd: string, options?: Options) {
    this.subscriptionPromise = subscribe(
      cwd,
      (err, events) => {
        if (err) {
          console.error(err);
          return;
        }

        const filteredEvents = events.filter((event) => {
          return !this.isIgnored(event.path);
        });

        for (const event of filteredEvents) {
          for (const listener of this.listeners[event.type]) {
            listener({
              type: event.type,
              path: event.path,
              relativePath: path.relative(cwd, event.path),
            });
          }
        }
      },
      options
    );

    this.subscriptionPromise.then((subscription) => {
      this.subscription = subscription;
    });
  }

  on(event: EventType, listener: WatcherListener) {
    this.listeners[event].push(listener);
  }

  off(event: EventType, listener: WatcherListener) {
    this.listeners[event] = this.listeners[event].filter((l) => l !== listener);
  }

  ignore(pattern: MatchPattern) {
    this.ignored.push(pattern);
  }

  unignore(pattern: MatchPattern) {
    this.ignored = this.ignored.filter((p) => p !== pattern);
  }

  isIgnored(path: string) {
    return this.ignored.some((pattern) => {
      if (typeof pattern === 'string') {
        return path === pattern || micromatch.isMatch(path, pattern);
      } else if (pattern instanceof RegExp) {
        return pattern.test(path);
      } else {
        return pattern(path);
      }
    });
  }

  async close() {
    const subscription = this.subscription || (await this.subscriptionPromise);
    await subscription.unsubscribe();
  }
}
