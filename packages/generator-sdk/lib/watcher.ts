import path, { posixPath } from '@baeta/util-path';
import {
	type AsyncSubscription,
	type Event,
	type EventType,
	type Options,
	subscribe,
} from '@parcel/watcher';
import micromatch from 'micromatch';
import { type MatchPattern, WatcherIgnore } from './watcher-ignore.ts';

export { micromatch };
export const isMatch = micromatch.isMatch;

export type WatcherListener = (path: WatcherFile) => void;

export interface WatcherFile {
	type: EventType;
	path: string;
	relativePath: string;
}
export class Watcher {
	private readonly cwd: string;
	private readonly options?: Options;

	private subscription: AsyncSubscription;

	private listeners: Record<EventType, WatcherListener[]> = {
		create: [],
		update: [],
		delete: [],
	};

	private watcherIgnore: WatcherIgnore;

	constructor(cwd: string, options?: Options) {
		this.cwd = cwd;
		this.options = options;
		this.watcherIgnore = new WatcherIgnore(cwd);
		this.subscription = this.createSubscription();
	}

	onEvents = (err: Error | null, events: Event[]) => {
		if (err) {
			console.error(err);
			return;
		}

		const filteredEvents = events.filter((event) => {
			return !this.watcherIgnore.isIgnored(posixPath(event.path));
		});

		for (const event of filteredEvents) {
			for (const listener of this.listeners[event.type]) {
				listener({
					type: event.type,
					path: posixPath(event.path),
					relativePath: posixPath(path.relative(this.cwd, event.path)),
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

	createSubscription() {
		const promise = subscribe(this.cwd, this.onEvents, this.options);

		const unsubscribe = async () => {
			const subscription = await promise;
			await subscription.unsubscribe();
		};

		return {
			unsubscribe,
		};
	}

	close() {
		return this.subscription.unsubscribe();
	}
}
