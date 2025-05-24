import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { build, type Plugin } from '@baeta/compiler/esbuild';
import path from '@baeta/util-path';
import { isBuiltin, isNodeBuiltin } from '../utils/builtins.ts';

function externalizePlugin(): Plugin {
	return {
		name: 'externalize-deps',
		setup(build) {
			// externalize bare imports
			build.onResolve({ filter: /^[^.].*/ }, async ({ path: id, kind }) => {
				if (kind === 'entry-point' || path.isAbsolute(id) || isNodeBuiltin(id)) {
					return;
				}

				if (isBuiltin(id)) {
					return { external: true };
				}

				return {
					external: true,
				};
			});
		},
	};
}

function injectFileScopesPlugin(
	dirnameVarName: string,
	filenameVarName: string,
	importMetaUrlVarName: string,
): Plugin {
	return {
		name: 'inject-file-scope-variables',
		setup(build) {
			build.onLoad({ filter: /\.[cm]?[jt]s$/ }, async (args) => {
				const contents = await fs.promises.readFile(args.path, 'utf8');
				const injectValues = [
					`const ${dirnameVarName} = ${JSON.stringify(path.dirname(args.path))};`,
					`const ${filenameVarName} = ${JSON.stringify(args.path)};`,
					`const ${importMetaUrlVarName} = ${JSON.stringify(pathToFileURL(args.path).href)};`,
				].join('');

				return {
					loader: args.path.endsWith('ts') ? 'ts' : 'js',
					contents: injectValues + contents,
				};
			});
		},
	};
}

export async function bundleFile(
	fileName: string,
): Promise<{ code: string; dependencies: string[] }> {
	const dirnameVarName = '__baeta_injected_original_dirname';
	const filenameVarName = '__baeta_injected_original_filename';
	const importMetaUrlVarName = '__baeta_injected_original_import_meta_url';

	const result = await build({
		absWorkingDir: process.cwd(),
		entryPoints: [fileName],
		write: false,
		target: ['node22'],
		platform: 'node',
		bundle: true,
		format: 'esm',
		mainFields: ['main'],
		sourcemap: 'inline',
		sourceRoot: path.dirname(fileName) + path.sep,
		metafile: true,
		define: {
			__dirname: dirnameVarName,
			__filename: filenameVarName,
			'import.meta.url': importMetaUrlVarName,
			'import.meta.dirname': dirnameVarName,
			'import.meta.filename': filenameVarName,
		},
		plugins: [
			externalizePlugin(),
			injectFileScopesPlugin(dirnameVarName, filenameVarName, importMetaUrlVarName),
		],
	});

	const { text } = result.outputFiles[0];

	return {
		code: text,
		dependencies: result.metafile ? Object.keys(result.metafile.inputs) : [],
	};
}
