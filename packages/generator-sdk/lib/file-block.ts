import { mkdir, open, writeFile } from 'node:fs/promises';
import { dirname } from '@baeta/util-path';
import { File, type FileOptions } from './file.ts';

export class FileBlock extends File {
	public filename: string;
	public content: string;
	public start: string;
	public end: string;
	public tag: string;
	constructor(
		filename: string,
		content: string,
		start: string,
		end: string,
		tag: string,
		options?: FileOptions,
	) {
		super(filename, content, tag, {
			disableBiomeHeader: options?.disableBiomeHeader ?? true,
			disableEslintHeader: options?.disableEslintHeader ?? true,
			disableGenerationNoticeHeader: options?.disableGenerationNoticeHeader ?? true,
		});
		this.filename = filename;
		this.content = content;
		this.start = start;
		this.end = end;
		this.tag = tag;
	}

	write = async () => {
		if (this.persisted) {
			return;
		}
		this.persisted = true;

		const dir = dirname(this.filename);
		await mkdir(dir, { recursive: true });

		const [existingContent, fd] = await this.getExistingContent();

		this.content = this.addBlockToContent(existingContent);
		const content = await this.buildContent();

		if (fd) {
			await fd.truncate(0);
			await fd.write(content, 0, 'utf-8');
			await fd.close();
		} else {
			await writeFile(this.filename, content, 'utf-8');
		}
	};

	unlink = async () => {
		this.persisted = false;

		const [existingContent, fd] = await this.getExistingContent();

		if (fd) {
			const [start, end] = this.getSlices(existingContent);
			await fd.truncate(0);
			await fd.write(start + end, 0, 'utf-8');
			await fd.close();
		}
	};

	protected async getExistingContent() {
		try {
			const fd = await open(this.filename, 'r+');
			const existingContent = await fd.readFile('utf-8');
			return [existingContent, fd] as const;
		} catch {
			return ['', null] as const;
		}
	}

	protected getSlices(existingContent: string) {
		const startMarkerIndex = existingContent.indexOf(this.start);
		const endMarkerIndex = existingContent.lastIndexOf(this.end);

		if (startMarkerIndex === -1 || endMarkerIndex === -1) {
			return [existingContent, '', false] as const;
		}

		return [
			existingContent.slice(0, startMarkerIndex),
			existingContent.slice(endMarkerIndex + this.end.length),
			true,
		] as const;
	}

	protected addBlockToContent(existingContent: string) {
		const block = `${this.start}\n${this.content}\n${this.end}`;
		const [startSlice, endSlice, hasMarkers] = this.getSlices(existingContent);
		const padding = hasMarkers ? '' : this.buildPadding(existingContent);
		return startSlice + padding + block + endSlice;
	}

	protected buildPadding(existingContent: string) {
		if (existingContent === '') {
			return '';
		}

		if (existingContent.endsWith('\n\n')) {
			return '';
		}

		if (existingContent.endsWith('\n')) {
			return '\n';
		}

		return '\n\n';
	}
}
