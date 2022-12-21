import { createReadStream, createWriteStream } from 'node:fs';
import { rename } from 'node:fs/promises';
import { join } from 'node:path';
import { PassThrough } from 'node:stream';
import zlib from 'node:zlib';
import tar, { Headers, Pack } from 'tar-stream';
import { getPackageJSON } from '../utils/package';
import { streamToString } from '../utils/stream';

function changeFileRoot(root: string | undefined, name: string) {
  if (!root) {
    return name;
  }
  const currentRoot = join(`package/`, root, '/');
  const wantedRoot = 'package/';
  return name.replace(currentRoot, wantedRoot);
}

async function changePackageJson(content: string) {
  const body = JSON.parse(content);

  body.scripts = undefined;
  body.files = undefined;

  if (body.publishConfig != null) {
    body.publishConfig.bin = undefined;
    body.publishConfig.exports = undefined;
    body.publishConfig.publishDir = undefined;
  }

  return JSON.stringify(body, null, 2);
}

function redoPackageFiles(input: string, output: string, publishDir?: string) {
  return new Promise<void>((resolve, reject) => {
    function error(err: unknown) {
      return reject(err);
    }

    const readPkg = createReadStream(input);
    const writePkg = createWriteStream(output);

    const extract = tar.extract();
    const pack = tar.pack();

    extract.on('entry', (header, stream, next) => {
      header.name = changeFileRoot(publishDir, header.name);

      if (header.name === 'package/package.json') {
        const opt = { header, stream, pack, next };
        return patchContent(opt, changePackageJson).catch(error);
      }

      return stream.pipe(pack.entry(header, next));
    });

    extract.on('finish', () => pack.finalize());

    pack.on('close', () => resolve());

    readPkg.on('error', error);

    writePkg.on('error', error);

    extract.on('error', error);

    pack.on('error', error);

    readPkg.pipe(zlib.createGunzip()).pipe(extract);

    pack.pipe(zlib.createGzip()).pipe(writePkg);
  });
}

async function patchContent(
  opt: {
    header: Headers;
    stream: PassThrough;
    pack: Pack;
    next: (err?: unknown) => void;
  },
  patch: (current: string) => string | Promise<string>
) {
  const content = await streamToString(opt.stream);
  const result = await patch(content);
  opt.pack.entry({ ...opt.header, size: undefined }, result, opt.next);
}

async function updatePackage() {
  const config = await getPackageJSON();
  const publishDir = config?.publishConfig?.publishDir;
  const src = 'package.tgz';
  const tmp = 'package.tgz.tmp';
  await redoPackageFiles(src, tmp, publishDir);
  await rename(tmp, src);
}

updatePackage();
