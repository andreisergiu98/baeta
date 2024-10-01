import { mkdir, open, writeFile } from 'node:fs/promises';
import { dirname } from '@baeta/util-path';
import { File, FileOptions } from './file';

export class FileBlock extends File {
	constructor(
		filename: string,
		content: string,
		protected start: string,
		protected end: string,
		tag: string,
		options?: FileOptions,
	) {
		super(filename, content, tag, {
			addEslintDisableHeader: options?.addEslintDisableHeader ?? false,
			addGenerationNoticeHeader: options?.addGenerationNoticeHeader ?? false,
		});
	}

	write = async () => {
		if (this.persisted) {
			return;
		}
		this.persisted = true;

		const dir = dirname(this.filename);
		await mkdir(dir, { recursive: true });

		const [existingContent, fd] = await this.getExistingContent();
		this.addBlockToContent(existingContent);
		const content = await this.buildContent();

		if (fd) {
			await fd.write(content, 0, 'utf-8');
			await fd.close();
		} else {
			await writeFile(this.filename, content, 'utf-8');
		}
	};

	protected async getExistingContent() {
		try {
			const fd = await open(this.filename, 'r+');
			const existingContent = await fd.readFile('utf-8');
			return [existingContent, fd] as const;
		} catch (err) {
			return ['', null] as const;
		}
	}

	protected getSlices(existingContent: string) {
		const startMarkerIndex = existingContent.indexOf(this.start);
		const endMarkerIndex = existingContent.indexOf(this.end);

		if (startMarkerIndex === -1 || endMarkerIndex === -1) {
			return [existingContent, ''] as const;
		}

		return [
			existingContent.slice(0, startMarkerIndex),
			existingContent.slice(endMarkerIndex + this.end.length),
		] as const;
	}

	protected addBlockToContent(existingContent: string) {
		const block = `${this.start}\n${this.content}\n${this.end}`;
		const padding = this.buildPadding(existingContent);
		const [startSlice, endSlice] = this.getSlices(existingContent);
		this.content = startSlice + padding + block + endSlice;
	}

	protected stripBlock(existingContent: string) {
		const [startSlice, endSlice] = this.getSlices(existingContent);
		return startSlice + endSlice;
	}

	protected buildPadding(existingContent: string) {
		const existingStripped = this.stripBlock(existingContent);

		if (existingStripped === '') {
			return '';
		}

		if (existingStripped.endsWith('\n\n')) {
			return '';
		}

		if (existingStripped.endsWith('\n')) {
			return '\n';
		}

		return '\n\n';
	}
}
