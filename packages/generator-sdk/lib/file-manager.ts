import { File, type FileOptions } from './file.ts';

export class FileManager {
	fileOptions?: FileOptions;

	private readonly entries: File[] = [];

	constructor(fileOptions?: FileOptions) {
		this.fileOptions = fileOptions;
	}

	get files(): readonly File[] {
		return this.entries;
	}

	createAndAdd(filename: string, content: string, tag: string, options?: FileOptions) {
		const file = new File(filename, content, tag, { ...this.fileOptions, ...options });
		this.add(file);
		return file;
	}

	add(...files: File[]) {
		for (const file of files) {
			const index = this.entries.findIndex((f) => f.filename === file.filename);
			if (index >= 0) {
				this.entries[index] = file;
			} else {
				this.entries.push(file);
			}
		}
	}

	get(filename: string) {
		return this.entries.find((file) => file.filename === filename);
	}
}
