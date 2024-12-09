import { File, type FileOptions } from './file.ts';

export class FileManager {
	files: File[] = [];

	constructor(public fileOptions?: FileOptions) {}

	createAndAdd(filename: string, content: string, tag: string) {
		const file = new File(filename, content, tag, this.fileOptions);
		this.add(file);
		return file;
	}

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
		const toWrite = this.files.filter((file) => !file.persisted);
		return Promise.all(toWrite.map((file) => file.write()));
	}

	writeByTag(tag: string) {
		const files = this.getByTag(tag);
		const toWrite = files.filter((file) => !file.persisted);
		return Promise.all(toWrite.map((file) => file.write()));
	}

	unlinkAll() {
		return Promise.all(this.files.map((file) => file.unlink())).then(() => {
			// void
		});
	}

	getPersistedFiles() {
		return this.files.filter((file) => file.persisted);
	}
}
