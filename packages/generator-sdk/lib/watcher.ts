import { AsyncSubscription, Event, EventType, Options, subscribe } from '@parcel/watcher';
import micromatch from 'micromatch';
import path from 'path';
import { MatchPattern, WatcherIgnore } from './watcher-ignore';

export { isMatch } from 'micromatch';
export { micromatch };

export type WatcherListener = (path: WatcherFile) => void;

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
