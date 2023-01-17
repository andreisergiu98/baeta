import { File } from './file';

export class FileManager {
  files: File[] = [];

  add(...file: File[]) {
    this.files.push(...file);
  }

  get(filename: string) {
    return this.files.find((file) => file.filename === filename);
  }

  getAll() {
    return this.files;
  }

  getByTag(tag: string) {
    return this.files.filter((file) => file.tag === tag);
  }

  remove(filename: string) {
    const index = this.files.findIndex((file) => file.filename === filename);
    this.files.splice(index, 1);
  }

  removeAll() {
    this.files = [];
  }

  removeByTag(tag: string) {
    this.files = this.files.filter((file) => file.tag !== tag);
  }

  writeAll() {
    return Promise.all(this.files.map((file) => file.write()));
  }

  writeByTag(tag: string) {
    const files = this.getByTag(tag);
    return Promise.all(files.map((file) => file.write()));
  }

  unlinkAll() {
    return Promise.all(this.files.map((file) => file.unlink())).then(() => {
      // void
    });
  }
}
