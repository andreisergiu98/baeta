import fs from "fs/promises";
import path from "path";

const manifest = ".publish.json";

async function getManifest() {
  const manifestContent = await fs.readFile(manifest).catch(() => null);
  if (!manifestContent) {
    return;
  }
  return JSON.parse(manifestContent);
}

async function writeManifest(files, to) {
  const dest = files.map((file) => path.join(to, file));
  await fs.writeFile(manifest, JSON.stringify(dest), "utf-8");
}

async function getAllFiles(dir) {
  const result = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const item of result) {
    if (item.isDirectory()) {
      const res = await getAllFiles(path.join(dir, item.name));
      const innerFiles = res.map((file) => path.join(item.name, file));
      files.push(...innerFiles);
    } else {
      files.push(item.name);
    }
  }
  return files;
}

async function moveFile(file, from, to) {
  const fromPath = path.join(from, file);
  const toPath = path.join(to, file);
  const toDir = path.dirname(toPath);
  await fs.mkdir(path.resolve(toDir), { recursive: true });
  return fs.rename(fromPath, toPath);
}

async function moveFiles(from, to) {
  const manifest = await getManifest();
  if (manifest != null) {
    throw new Error("Remove manifest before moving files");
  }

  const files = await getAllFiles(from);
  const promises = [];
  for (const file of files) {
    promises.push(moveFile(file, from, to));
  }
  await Promise.all(promises);
  await fs.rm(from, { recursive: true });
  return writeManifest(files, to);
}

async function cleanFiles() {
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

const arg = process.argv[2];

if (arg === "--move") {
  const from = process.argv[3];

  if (!from) {
    throw new Error("Missing from path");
  }

  moveFiles(from, ".");
} else if (arg === "--clean") {
  cleanFiles();
} else {
  [console.log("Usage: prep.js [--move|--clean]")];
}
