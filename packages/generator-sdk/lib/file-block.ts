import { createHash } from 'node:crypto';
import { constants as fsConstants } from 'node:fs';
import { type FileHandle, mkdir, open, writeFile } from 'node:fs/promises';
import { dirname } from '@baeta/util-path';
import { assertCanModifyByState, File, type FileOptions } from './file.ts';

const OPEN_FLAGS_RW = fsConstants.O_RDWR | fsConstants.O_NOFOLLOW;

export class FileBlock extends File {
	readonly start: string;
	readonly end: string;

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
		this.start = start;
		this.end = end;
	}

	override write = async () => {
		assertCanModifyByState(this.state);
		this.state = { status: 'writing' };

		let fd: FileHandle | null = null;
		try {
			await mkdir(dirname(this.filename), { recursive: true });
			const existing = await this.readExisting();
			fd = existing.fd;

			const { content, hash } = await this.buildFileContent(existing.content);

			if (fd) {
				await fd.truncate(0);
				await fd.write(content, 0, 'utf-8');
			} else {
				await writeFile(this.filename, content, 'utf-8');
			}
			this.state = { status: 'persisted', hash };
		} catch (err) {
			this.state = { status: 'errored', err: err as Error };
			throw err;
		} finally {
			await fd?.close().catch(() => {});
		}
	};

	override unlink = async () => {
		assertCanModifyByState(this.state);
		this.state = { status: 'removing' };

		let fd: FileHandle | null = null;
		try {
			const existing = await this.readExisting();
			fd = existing.fd;

			const slices = fd ? this.getSlices(existing.content) : null;
			if (fd && slices) {
				await fd.truncate(0);
				await fd.write(slices[0] + slices[1], 0, 'utf-8');
			}
			this.state = { status: 'removed' };
		} catch (err) {
			this.state = { status: 'errored', err: err as Error };
			throw err;
		} finally {
			await fd?.close().catch(() => {});
		}
	};

	protected async buildFileContent(existing: string) {
		const block = `${this.start}\n${this.buildHeader()}${this.content}\n${this.end}\n`;
		const hash = createHash('sha256').update(block).digest('hex');

		const slices = this.getSlices(existing);
		let content = slices
			? slices[0] + block + slices[1]
			: existing + this.buildPadding(existing) + block;

		if (this.options?.transformContent) {
			content = await this.options.transformContent(this.filename, content, this.tag);
		}

		return { content, hash };
	}

	protected async readExisting(): Promise<{ content: string; fd: FileHandle | null }> {
		let fd: FileHandle;
		try {
			fd = await open(this.filename, OPEN_FLAGS_RW);
		} catch (err) {
			// Only a missing file falls back to a fresh write. Anything else (ELOOP from
			// O_NOFOLLOW, EACCES, EISDIR) must not fall through to writeFile.
			if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
				return { content: '', fd: null };
			}
			throw err;
		}

		try {
			return { content: await fd.readFile('utf-8'), fd };
		} catch (err) {
			await fd.close().catch(() => {});
			throw err;
		}
	}

	protected getSlices(existing: string): readonly [before: string, after: string] | null {
		const startIndex = existing.indexOf(this.start);
		if (startIndex === -1) {
			return null;
		}

		const endIndex = existing.indexOf(this.end, startIndex + this.start.length);
		if (endIndex === -1) {
			throw new Error(
				`Found start marker without a matching end marker in ${this.filename}: ${this.start}`,
			);
		}

		const after = existing.slice(endIndex + this.end.length);
		return [
			existing.slice(0, startIndex),
			after.startsWith('\n') ? after.slice(1) : after,
		] as const;
	}

	protected buildPadding(existing: string) {
		if (existing === '' || existing.endsWith('\n\n')) {
			return '';
		}
		if (existing.endsWith('\n')) {
			return '\n';
		}
		return '\n\n';
	}
}
