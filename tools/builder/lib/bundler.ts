import { unlink, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { build } from 'esbuild';

export * from 'esbuild';

export async function importTSX(source: string, parentURL: string): Promise<unknown> {
	const pathname = new URL(source, parentURL).pathname;

	const result = await build({
		entryPoints: [pathname],
		bundle: true,
		format: 'esm',
		sourcemap: 'inline',
		jsx: 'automatic',
		jsxImportSource: 'react',
		target: 'es2024',
		write: false,
		plugins: [
			{
				name: 'make-all-packages-external',
				setup(build) {
					const filter = /^[^./]|^\.[^./]|^\.\.[^/]/; // Must not start with "/" or "./" or "../"
					build.onResolve({ filter }, (args) => ({ path: args.path, external: true }));
				},
			},
		],
	});

	const code = await result.outputFiles?.[0]?.text;

	if (code == null) {
		throw new Error('Failed to bundle TSX file');
	}

	const dir = dirname(pathname);
	const tempFile = join(dir, `temp-file-${process.pid}-${Date.now()}.js`);

	await writeFile(tempFile, code, 'utf-8');

	try {
		return await import(tempFile);
	} finally {
		await unlink(tempFile).catch(() => {});
	}
}
