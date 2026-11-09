import { realpathSync } from 'node:fs';
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

export interface WatcherOptions extends Options {
	onClose?: () => void | Promise<void>;
}

export class Watcher {
	private readonly cwd: string;
	private readonly realCwd: string;
	private readonly options?: WatcherOptions;

	private readonly subscription: AsyncSubscription;

	private readonly listeners: Record<EventType, WatcherListener[]> = {
		create: [],
		update: [],
		delete: [],
	};

	private readonly watcherIgnore: WatcherIgnore;

	constructor(cwd: string, options?: WatcherOptions) {
		this.cwd = path.resolve(cwd);
		this.realCwd = getRealPath(this.cwd);
		this.options = options;
		this.watcherIgnore = new WatcherIgnore(this.cwd);
		this.subscription = this.createSubscription();
	}

	onEvents = (err: Error | null, events: Event[]) => {
		if (err) {
			console.error('File watcher error.', err);
			return;
		}

		for (const event of events) {
			const file = this.toCwdPath(event.path);
			if (this.watcherIgnore.isIgnored(file)) {
				continue;
			}
			for (const listener of this.listeners[event.type]) {
				listener({
					type: event.type,
					path: file,
					relativePath: path.relative(this.cwd, file),
				});
			}
		}
	};

	private toCwdPath(eventPath: string) {
		const file = posixPath(eventPath);
		if (
			this.realCwd !== this.cwd &&
			(file === this.realCwd || file.startsWith(`${this.realCwd}/`))
		) {
			return this.cwd + file.slice(this.realCwd.length);
		}
		return file;
	}

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

		promise.catch((err) => {
			console.error(`Failed to start file watcher for '${this.cwd}'.`, err);
		});

		const unsubscribe = async () => {
			const subscription = await promise;
			await subscription.unsubscribe();
		};

		return {
			unsubscribe,
		};
	}

	async close() {
		await this.subscription.unsubscribe();
		await this.options?.onClose?.();
	}
}

function getRealPath(dir: string) {
	try {
		return posixPath(realpathSync(dir));
	} catch {
		return dir;
	}
}
