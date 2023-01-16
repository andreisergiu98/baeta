import fs from 'fs/promises';
import { join } from 'path';

interface Pkg {
  name?: string;
  type?: string;
  sideEffects?: boolean;
  publishConfig?: PkgPublishConfig;
}

interface PkgPublishConfig {
  exports?: Record<string, PkgExport>;
}

interface PkgExport {
  types?: string;
  import?: string;
  require?: string;
}

interface ForgedPkg {
  name: string;
  type?: string;
  main?: string;
  module?: string;
  types?: string;
  sideEffects?: boolean;
}

const manifest = '.publish.json';

async function getManifest() {
  const manifestContent = await fs.readFile(manifest, 'utf-8').catch(() => null);
  if (!manifestContent) {
    return;
  }
  return JSON.parse(manifestContent);
}

async function writeManifest(files: string[]) {
  if (files.length === 0) {
    return;
  }
  await fs.writeFile(manifest, JSON.stringify(files), 'utf-8');
}

async function removeNestedPackages() {
  const files = await getManifest();
  if (files == null) {
    return;
  }

  const promises = [fs.unlink(manifest)];
  for (const file of files) {
    promises.push(fs.unlink(file));
  }

  await Promise.all(promises);
}

async function loadPackageJson(): Promise<Pkg> {
  const content = await fs.readFile(`${process.cwd()}/package.json`, 'utf-8');
  return JSON.parse(content);
}

function forgePackage(pkgName: string, entry: string, exports: PkgExport) {
  const name = join(pkgName, entry);

  if (name === pkgName) {
    return;
  }

  const forged: ForgedPkg = {
    name,
  };

  if (exports.types) {
    forged.types = join('../', exports.types);
  }

  return forged;
}

async function createNestedPackages() {
  const pkg = await loadPackageJson();

  if (pkg.name == null) {
    console.log('Missing name, skipping...');
    return;
  }

  if (pkg.publishConfig == null) {
    console.log('Missing publishConfig, skipping...');
    return;
  }

  if (pkg.publishConfig?.exports == null) {
    console.log('Missing publishConfig.exports, skipping...');
    return;
  }

  const entries = Object.entries(pkg.publishConfig.exports);
  const created: string[] = [];
  const promises: Promise<void>[] = [];

  for (const [path, exports] of entries) {
    const forged = forgePackage(pkg.name, path, exports);

    if (!forged) {
      continue;
    }

    if (pkg.type) {
      forged.type = pkg.type;
    }

    if (pkg.sideEffects) {
      forged.sideEffects = pkg.sideEffects;
    }

    const dist = join(path, 'package.json');
    created.push(dist);
    promises.push(fs.writeFile(dist, JSON.stringify(forged, null, 2)));
  }

  await promises;
  writeManifest(created);
  return created;
}

async function run() {
  const arg = process.argv[2];

  if (arg === '--help') {
    console.log('Usage: prep.js prepares packages for publish [--clean cleans afterwards]');
    return;
  }

  if (arg === '--clean') {
    removeNestedPackages();
    return;
  }

  const manifest = await getManifest();
  if (manifest != null) {
    console.log('[ERROR] Remove manifest before preparing');
    process.exit(1);
  }

  createNestedPackages();
}

run();
