import { createHash } from 'node:crypto';
import { constants as fsConstants } from 'node:fs';
import fs from 'node:fs/promises';
import { dirname } from '@baeta/util-path';
import { createComment } from './file-comment.ts';

const OPEN_FLAGS_CREATE_EXCL =
	fsConstants.O_CREAT | fsConstants.O_EXCL | fsConstants.O_WRONLY | fsConstants.O_NOFOLLOW;

/**
 * Options for generated files.
 */
export interface FileOptions {
	/**
	 * Disable generation notice at the beginning of the file.
	 * @defaultValue false
	 */
	disableGenerationNoticeHeader?: boolean;

	/**
	 * Enable lint disabling headers at the beginning of the file.
	 * Can be either a boolean to enable all supported lint headers or an object to enable specific ones.
	 * @defaultValue false
	 */
	enableLintHeaders?:
		| boolean
		| {
				/**
				 * Enable oxlint comment at the beginning of the file.
				 * @defaultValue false
				 */
				oxlint?: boolean;
				/**
				 * Enable eslint-disable comment at the beginning of the file.
				 * @defaultValue false
				 */
				eslint?: boolean;
				/**
				 * Enable biome v1 comment at the beginning of the file.
				 * @defaultValue false
				 */
				biomeV1?: boolean;
				/**
				 * Enable biome v2 comment at the beginning of the file.
				 * @defaultValue false
				 */
				biomeV2?: boolean;
		  };

	/**
	 * Disallow overwriting the file.
	 * @defaultValue false
	 */
	disableOverwrite?: boolean;

	/**
	 * Add custom header at the beginning of the file.
	 * The returned text is written as is. Use `comment` to wrap it in the file's comment syntax,
	 * or `name` to pick the syntax for file types that `comment` doesn't know.
	 * Return an empty string to skip the header.
	 *
	 * @param comment - Wraps text in the file's comment syntax, or returns `null` for unknown file types.
	 *
	 * @example
	 * ```ts
	 * addHeader: (name, content, tag, comment) => comment('Copyright Acme') ?? '',
	 * ```
	 */
	addHeader?: (
		name: string,
		content: string,
		tag: string,
		comment: (text: string) => string | null,
	) => string;

	/**
	 * Edit the content of the file before writing it.
	 */
	transformContent?: (name: string, content: string, tag: string) => string | Promise<string>;
}

export type FileState =
	| {
			status: 'pending';
	  }
	| {
			status: 'errored';
			err: Error;
	  }
	| {
			status: 'writing';
	  }
	| {
			status: 'removing';
	  }
	| {
			status: 'removed';
	  }
	| {
			status: 'skipped';
	  }
	| {
			status: 'persisted';
			hash: string;
	  };

export class File {
	state: FileState = { status: 'pending' };
	readonly filename: string;
	readonly content: string;
	readonly tag: string;
	readonly options?: FileOptions;

	constructor(filename: string, content: string, tag: string, options?: FileOptions) {
		this.filename = filename;
		this.content = content;
		this.tag = tag;
		this.options = options;
	}

	write = async () => {
		assertCanModifyByState(this.state);
		this.state = { status: 'writing' };
		let hash: string;
		let content: string;

		try {
			const result = await this.buildContent();
			hash = result.hash;
			content = result.content;
			const dir = dirname(this.filename);
			await fs.mkdir(dir, { recursive: true });
		} catch (err) {
			this.state = { status: 'errored', err: err as Error };
			throw err;
		}

		if (!this.options?.disableOverwrite) {
			try {
				await fs.writeFile(this.filename, content, 'utf-8');
				this.state = { status: 'persisted', hash };
			} catch (err) {
				this.state = { status: 'errored', err: err as Error };
				throw err;
			}
			return;
		}

		let fd: fs.FileHandle | undefined;
		try {
			fd = await fs.open(this.filename, OPEN_FLAGS_CREATE_EXCL, 0o644);
		} catch (err) {
			if ((err as NodeJS.ErrnoException).code === 'EEXIST') {
				this.state = { status: 'skipped' };
				return;
			}
			this.state = { status: 'errored', err: err as Error };
			throw err;
		}

		let closed = false;
		try {
			await fd.writeFile(content, 'utf-8');
			await fd.close();
			closed = true;
			this.state = { status: 'persisted', hash };
		} catch (err) {
			this.state = { status: 'errored', err: err as Error };
			await fs.unlink(this.filename).catch(() => {});
			throw err;
		} finally {
			if (!closed) await fd.close().catch(() => {});
		}
	};

	unlink = async () => {
		if (this.options?.disableOverwrite) {
			return;
		}
		assertCanModifyByState(this.state);
		if (this.state.status === 'skipped') {
			return;
		}
		this.state = { status: 'removing' };
		await fs.unlink(this.filename).catch(() => {
			// Ignore errors when trying to unlink, as the file might not exist or be already unlinked.
		});
		this.state = { status: 'removed' };
	};

	protected async buildContent() {
		let content = this.buildHeader() + this.content;
		if (this.options?.transformContent) {
			content = await this.options.transformContent(this.filename, content, this.tag);
		}
		const hash = createHash('sha256').update(content).digest('hex');
		const hashComment = this.createComment(`@fileHash sha256:${hash}`);
		if (!hashComment) return { content, hash };
		return { content: hashComment + '\n' + content, hash };
	}

	protected buildHeader() {
		const headerItems: string[] = [];

		if (this.options?.disableGenerationNoticeHeader !== true) {
			const comment = this.createComment(
				'This file was generated by Baeta. Do not edit it directly. All changes will be overwritten by the generator.',
			);
			if (comment) headerItems.push(comment);
		}

		if (
			this.options?.enableLintHeaders === true ||
			typeof this.options?.enableLintHeaders === 'object'
		) {
			if (
				this.options?.enableLintHeaders === true ||
				this.options?.enableLintHeaders?.eslint !== false
			) {
				const comment = this.createComment('eslint-disable', 'block');
				if (comment) headerItems.push(comment);
			}
			if (
				this.options?.enableLintHeaders === true ||
				this.options?.enableLintHeaders?.oxlint !== false
			) {
				const comment = this.createComment('oxlint-disable', 'block');
				if (comment) headerItems.push(comment);
			}
			if (
				this.options?.enableLintHeaders === true ||
				this.options?.enableLintHeaders?.biomeV1 !== false
			) {
				const comment = this.createComment('@biome-ignore-all: generated file', 'block');
				if (comment) headerItems.push(comment);
			}
			if (
				this.options?.enableLintHeaders === true ||
				this.options?.enableLintHeaders?.biomeV2 !== false
			) {
				const comment = this.createComment('biome-ignore-all lint: generated file', 'block');
				if (comment) headerItems.push(comment);
			}
		}

		if (this.options?.addHeader) {
			const customHeader = this.options.addHeader(this.filename, this.content, this.tag, (text) =>
				this.createComment(text),
			);
			if (customHeader) headerItems.push(customHeader);
		}

		if (headerItems.length === 0) {
			return '';
		}

		return `${headerItems.join('\n')}\n\n`;
	}

	protected createComment(comment: string, kind: 'line' | 'block' = 'line') {
		return createComment(this.filename, comment, kind);
	}
}

export function assertCanModifyByState(state: FileState) {
	if (state.status === 'writing') {
		throw new Error('Cannot unlink while writing the file.');
	}
	if (state.status === 'removing') {
		throw new Error('Cannot unlink while removing the file.');
	}
}
