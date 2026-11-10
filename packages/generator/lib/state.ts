import fs from 'node:fs/promises';
import path from 'node:path';

export type GeneratedFiles = Array<FileEntry | FileBlockEntry>;

type FileEntry = {
	type: 'file';
	filename: string;
	relativeFilename: string;
	tag: string;
	hash: string;
	fromFailedRun?: boolean;
};

type FileBlockEntry = {
	type: 'file-block';
	filename: string;
	relativeFilename: string;
	tag: string;
	hash: string;
	start: string;
	end: string;
	fromFailedRun?: boolean;
};

type GeneratorState = {
	version: '3';
	files: GeneratedFiles;
};

export function getStateFilename(cacheDir: string) {
	return path.join(cacheDir, 'generator.json');
}

export async function readState(filename: string): Promise<GeneratedFiles> {
	try {
		const cache = JSON.parse(await fs.readFile(filename, 'utf-8')) as GeneratorState;
		return cache.version === '3' ? cache.files : [];
	} catch {
		return [];
	}
}

export async function writeState(filename: string, files: GeneratedFiles) {
	const state: GeneratorState = { version: '3', files };
	try {
		await fs.mkdir(path.dirname(filename), { recursive: true });
		await fs.writeFile(filename, JSON.stringify(state, null, 2));
	} catch (err) {
		console.warn(
			`Failed to save the generator state to '${filename}'. Stale generated files may not be cleaned up on the next run.`,
			err,
		);
	}
}
