import { File, FileBlock, type FileManager } from '@baeta/generator-sdk';
import { relative, resolve } from '@baeta/util-path';
import type { GeneratedFiles } from './state.ts';

export async function flush(fileManager: FileManager) {
	const pending = fileManager.files.filter((file) => file.state.status === 'pending');
	await settleAll(
		pending.map((file) => file.write()),
		'Failed to write generated files',
	);
}

export function getGeneratedFiles(
	cwd: string,
	fileManager: FileManager,
	options?: { failedRun?: boolean },
): GeneratedFiles {
	return fileManager.files
		.map((file) => {
			if (file.state.status !== 'persisted' || file.options?.disableOverwrite) {
				return null;
			}
			if (file instanceof FileBlock) {
				return {
					type: 'file-block' as const,
					filename: file.filename,
					relativeFilename: relative(cwd, file.filename),
					tag: file.tag,
					hash: file.state.hash,
					start: file.start,
					end: file.end,
					fromFailedRun: options?.failedRun,
				};
			}
			return {
				type: 'file' as const,
				filename: file.filename,
				relativeFilename: relative(cwd, file.filename),
				tag: file.tag,
				hash: file.state.hash,
				fromFailedRun: options?.failedRun,
			};
		})
		.filter((el) => el != null);
}

export function mergeGeneratedFiles(a: GeneratedFiles, b: GeneratedFiles): GeneratedFiles {
	const filteredA = a.filter(
		(fileA) => !b.some((fileB) => fileA.relativeFilename === fileB.relativeFilename),
	);
	return [...filteredA, ...b];
}

export function getStaleFiles(previous: GeneratedFiles, current: GeneratedFiles) {
	const currentSet = new Set(current.map((entry) => entry.relativeFilename));
	return previous.filter((entry) => !currentSet.has(entry.relativeFilename));
}

export async function unlinkStaleFiles(cwd: string, files: GeneratedFiles): Promise<void> {
	await settleAll(
		files.map((file) => {
			if (file.type === 'file-block') {
				return new FileBlock(
					resolve(cwd, file.relativeFilename),
					'',
					file.start,
					file.end,
					file.tag,
				).unlink();
			}
			return new File(resolve(cwd, file.relativeFilename), '', file.tag).unlink();
		}),
		'Failed to remove stale generated files',
	);
}

async function settleAll(tasks: Promise<unknown>[], message: string) {
	const results = await Promise.allSettled(tasks);
	const errors = results
		.filter((r): r is PromiseRejectedResult => r.status === 'rejected')
		.map((r) => r.reason);
	if (errors.length > 0) {
		throw new AggregateError(errors, `${message} (${errors.length} failed)`);
	}
}
