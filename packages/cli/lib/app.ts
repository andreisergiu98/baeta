import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { constants } from 'node:os';

export async function runApp(command: string) {
	const tty = process.stdin.isTTY === true;
	const group = !tty && process.platform !== 'win32';
	const app = spawn(command, { shell: true, stdio: 'inherit', detached: group });
	let interrupted = false;
	let groupSignal: NodeJS.Signals | undefined;

	const forward = (signal: NodeJS.Signals) => {
		interrupted = true;
		if (signal === 'SIGINT' && tty) {
			return;
		}
		if (!group || app.pid == null) {
			app.kill(signal);
			return;
		}
		groupSignal = signal;
		signalGroup(app.pid, signal);
	};
	process.on('SIGINT', forward);
	process.on('SIGTERM', forward);

	try {
		const [exitCode, signal] = (await once(app, 'exit')) as [number | null, NodeJS.Signals | null];
		if (groupSignal != null && app.pid != null) {
			signalGroup(app.pid, groupSignal);
		}
		const code = exitCode ?? (signal == null ? 1 : 128 + constants.signals[signal]);
		return { code, interrupted: interrupted || (tty && code === 128 + constants.signals.SIGINT) };
	} finally {
		process.off('SIGINT', forward);
		process.off('SIGTERM', forward);
	}
}

function signalGroup(pid: number, signal: NodeJS.Signals) {
	try {
		process.kill(-pid, signal);
	} catch {
		// do nothing
	}
}
