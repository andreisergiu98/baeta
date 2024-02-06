import { build, Plugin } from '@baeta/compiler/esbuild';
import fs from 'fs';
import { pathToFileURL } from 'node:url';
import path from '@baeta/util-path';
import { isBuiltin } from '../utils/builtins';

function externalizePlugin(): Plugin {
  return {
    name: 'externalize-deps',
    setup(build) {
      // externalize bare imports
      build.onResolve({ filter: /^[^.].*/ }, async ({ path: id, importer, kind }) => {
        if (kind === 'entry-point' || path.isAbsolute(id) || isBuiltin(id)) {
          return;
        }

        // partial deno support as `npm:` does not work with esbuild
        if (id.startsWith('npm:')) {
          return { external: true };
        }

        // const isIdESM = isESM || kind === 'dynamic-import';
        // let idFsPath = tryNodeResolve(
        //   id,
        //   importer,
        //   { ...options, isRequire: !isIdESM },
        //   false
        // )?.id;
        // if (idFsPath && isIdESM) {
        //   idFsPath = pathToFileURL(idFsPath).href;
        // }
        return {
          //   path: idFsPath,
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
  isESM: boolean,
): Promise<{ code: string; dependencies: string[] }> {
  const dirnameVarName = '__baeta_injected_original_dirname';
  const filenameVarName = '__baeta_injected_original_filename';
  const importMetaUrlVarName = '__baeta_injected_original_import_meta_url';

  const result = await build({
    absWorkingDir: process.cwd(),
    entryPoints: [fileName],
    outfile: 'out.js',
    write: false,
    target: ['node18'],
    platform: 'node',
    bundle: true,
    format: isESM ? 'esm' : 'cjs',
    mainFields: ['main'],
    sourcemap: 'inline',
    metafile: true,
    define: {
      __dirname: dirnameVarName,
      __filename: filenameVarName,
      'import.meta.url': importMetaUrlVarName,
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
