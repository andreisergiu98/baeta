import { FileManager } from '@baeta/generator-sdk';
import fs from 'fs/promises';
import { readState } from './persistence';

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

  const currentFilenames = current.getPersistedFileNames();
  const toUnlink = state.previousFiles.filter((file) => !currentFilenames.includes(file));
  const promises = toUnlink.map((file) => fs.unlink(file).catch(() => {}));

  return Promise.all(promises).then(() => {});
}
