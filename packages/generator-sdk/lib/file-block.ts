import { constants as fsConstants } from 'node:fs';
import { mkdir, open, writeFile } from 'node:fs/promises';
import { dirname } from '@baeta/util-path';
import { File, type FileOptions } from './file.ts';

const OPEN_FLAGS_RW = fsConstants.O_RDWR | fsConstants.O_NOFOLLOW;

export class FileBlock extends File {
	public override filename: string;
	public override content: string;
	public override tag: string;
	public start: string;
	public end: string;
	constructor(
		filename: string,
		content: string,
		start: string,
		end: string,
		tag: string,
		options?: FileOptions,
	) {
		super(filename, content, tag, {
			enableLintHeaders: options?.enableLintHeaders ?? false,
			disableGenerationNoticeHeader: options?.disableGenerationNoticeHeader ?? true,
		});
		this.filename = filename;
		this.content = content;
		this.start = start;
		this.end = end;
		this.tag = tag;
	}

	override write = async () => {
		if (this.persisted) {
			return;
		}
		this.persisted = true;

		const dir = dirname(this.filename);
		await mkdir(dir, { recursive: true });

		const [existingContent, fd] = await this.getExistingContent();

		this.content = this.addBlockToContent(existingContent);
		const content = await this.buildContent();

		if (!fd) {
			return await writeFile(this.filename, content, 'utf-8');
		}

		try {
			await fd.truncate(0);
			await fd.write(content, 0, 'utf-8');
		} finally {
			await fd.close();
		}
	};

	override unlink = async () => {
		this.persisted = false;

		const [existingContent, fd] = await this.getExistingContent();

		if (!fd) {
			return;
		}

		try {
			const [start, end] = this.getSlices(existingContent);
			await fd.truncate(0);
			await fd.write(start + end, 0, 'utf-8');
		} finally {
			await fd.close();
		}
	};

	protected async getExistingContent() {
		const fd = await open(this.filename, OPEN_FLAGS_RW).catch(() => null);
		if (!fd) {
			return ['', null] as const;
		}
		const existingContent = await fd.readFile('utf-8').catch(async (err) => {
			await fd.close();
			throw err;
		});
		return [existingContent, fd] as const;
	}

	protected getSlices(existingContent: string) {
		const startMarkerIndex = existingContent.indexOf(this.start);
		if (startMarkerIndex === -1) {
			return [existingContent, '', false] as const;
		}
		const endMarkerIndex = existingContent.indexOf(this.end, startMarkerIndex + this.start.length);
		if (endMarkerIndex === -1) {
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
