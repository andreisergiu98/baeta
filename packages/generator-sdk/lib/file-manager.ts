import { File, type FileOptions } from './file.ts';

export class FileManager {
	files: File[] = [];
	fileOptions?: FileOptions;

	constructor(fileOptions?: FileOptions) {
		this.fileOptions = fileOptions;
	}

	createAndAdd(filename: string, content: string, tag: string, options?: FileOptions) {
		const file = new File(filename, content, tag, { ...this.fileOptions, ...options });
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
		if (index < 0) {
			return;
		}
		this.files.splice(index, 1);
	}

	removeAll() {
		this.files = [];
	}

	removeByTag(tag: string) {
		this.files = this.files.filter((file) => file.tag !== tag);
	}

	async writeAll() {
		const toWrite = this.files.filter((file) => !file.persisted);
		await Promise.all(toWrite.map((file) => file.write()));
	}

	async writeByTag(tag: string) {
		const files = this.getByTag(tag);
		const toWrite = files.filter((file) => !file.persisted);
		await Promise.all(toWrite.map((file) => file.write()));
	}

	async unlinkAll() {
		await Promise.all(this.files.map((file) => file.unlink()));
	}

	getPersistedFiles() {
		return this.files.filter((file) => file.persisted);
	}
}
