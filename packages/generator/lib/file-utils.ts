import fs from 'node:fs/promises';
import { File, FileBlock, type FileManager } from '@baeta/generator-sdk';
import { readState } from './persistence.ts';

export function cleanPreviousFiles(
	current: FileManager,
	stateFile: string,
	previous?: FileManager,
) {
	if (previous) {
		return cleanByFileManager(current, previous);
	}

	return cleanByState(current, stateFile);
}

function cleanByFileManager(current: FileManager, previous: FileManager) {
	for (const currentFile of current.getAll()) {
		if (!currentFile.persisted) {
			continue;
		}
		previous.remove(currentFile.filename);
	}

	return previous.unlinkAll();
}

async function cleanByState(current: FileManager, stateFile: string) {
	const state = await readState(stateFile);

	if (state == null || state.previousFiles.length === 0) {
		return;
	}

	const currentFilenames = current.getPersistedFiles().map((file) => file.filename);

	const toUnlink = state.previousFiles
		.filter((file) => !currentFilenames.includes(file.filename))
		.map((data) => {
			if (data.type === 'file-block') {
				return new FileBlock(data.filename, data.content, data.start, data.end, data.tag);
			}
			return new File(data.filename, data.content, data.tag);
		});

	const promises = toUnlink.map((file) => file.unlink().catch(() => {}));

	return Promise.all(promises).then(() => {});
}
