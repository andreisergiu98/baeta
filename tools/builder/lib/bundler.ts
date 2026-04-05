import { unlink, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { dirname, join } from 'pathe';

export * from 'esbuild';

export async function importTSX(source: string, parentURL: string): Promise<unknown> {
	const pathUrl = new URL(source, parentURL);

	const result = await build({
		entryPoints: [fileURLToPath(pathUrl)],
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
					build.onResolve({ filter }, (args) => {
						if (args.kind === 'entry-point') return;
						return { path: args.path, external: true };
					});
				},
			},
		],
	});

	const code = await result.outputFiles?.[0]?.text;

	if (code == null) {
		throw new Error('Failed to bundle TSX file');
	}

	const dir = dirname(pathUrl.pathname);
	const tempFile = join(dir, `temp-file-${process.pid}-${Date.now()}.js`);

	await writeFile(tempFile, code, 'utf-8');

	try {
		return await import(pathToFileURL(tempFile).href);
	} finally {
		await unlink(tempFile).catch(() => {});
	}
}
