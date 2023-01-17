import { FileManager } from '@baeta/generator-sdk';

export function cleanPreviousFiles(current: FileManager, previous?: FileManager) {
  if (!previous) {
    return;
  }

  for (const currentFile of current.getAll()) {
    if (!currentFile.persisted) {
      continue;
    }
    previous.remove(currentFile.filename);
  }

  return previous.unlinkAll();
}
