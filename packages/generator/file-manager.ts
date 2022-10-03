import { File } from '@baeta/plugin';

export function createFileManager() {
  let files: File[] = [];

  function add(...file: File[]) {
    files.push(...file);
  }

  function get(filename: string) {
    return files.find((file) => file.filename === filename);
  }

  function getAll() {
    return files;
  }

  function getByTag(tag: string) {
    return files.filter((file) => file.tag === tag);
  }

  function remove(filename: string) {
    const index = files.findIndex((file) => file.filename === filename);
    files.splice(index, 1);
  }

  function removeAll() {
    files = [];
  }

  function removeByTag(tag: string) {
    files = files.filter((file) => file.tag !== tag);
  }

  function writeAll() {
    return Promise.all(files.map((file) => file.write()));
  }

  function writeByTag(tag: string) {
    const files = getByTag(tag);
    return Promise.all(files.map((file) => file.write()));
  }

  function unlinkAll() {
    return Promise.all(files.map((file) => file.unlink()));
  }

  return {
    add,
    get,
    getAll,
    getByTag,
    remove,
    removeAll,
    removeByTag,
    writeAll,
    writeByTag,
    unlinkAll,
  };
}

export type FileManager = ReturnType<typeof createFileManager>;
