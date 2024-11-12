import fs from 'node:fs/promises';
import path from 'node:path';
import { type Ctx, FileBlock } from '@baeta/generator-sdk';
import { createContextualTmpDir } from '../utils/tmp.ts';

type PreviousFile = {
	type: 'file';
	filename: string;
	content: string;
	tag: string;
};

type PreviousFileBlock = {
	type: 'file-block';
	filename: string;
	content: string;
	start: string;
	end: string;
	tag: string;
};

export type PersistedState = {
	version: '2';
	previousFiles: Array<PreviousFile | PreviousFileBlock>;
};

function isVersion2(state: unknown): state is PersistedState {
	if (typeof state !== 'object' || state === null) {
		return false;
	}

	if ((state as Record<string, unknown>).version !== '2') {
		return false;
	}

	return true;
}

export function getStateFilename(cwd: string) {
	const dir = createContextualTmpDir(cwd);
	return path.join(dir, 'generator.json');
}

export async function readState(filename: string) {
	try {
		const content = await fs.readFile(filename, 'utf-8');
		const state = JSON.parse(content) as PersistedState;

		if (isVersion2(state)) {
			return state;
		}
	} catch (error) {
		// do nothing
	}

	return null;
}

export async function saveState(filename: string, ctx: Ctx) {
	const previousFiles = ctx.fileManager.getPersistedFiles().map((file) => {
		if (file instanceof FileBlock) {
			return {
				type: 'file-block',
				filename: file.filename,
				content: file.content,
				start: file.start,
				end: file.end,
				tag: file.tag,
			} as const;
		}

		return {
			type: 'file',
			filename: file.filename,
			content: file.content,
			tag: file.tag,
		} as const;
	});

	const state: PersistedState = {
		version: '2',
		previousFiles,
	};

	try {
		await fs.mkdir(path.dirname(filename), { recursive: true });
		await fs.writeFile(filename, JSON.stringify(state, null, 2));
		return true;
	} catch (error) {
		return false;
	}
}
