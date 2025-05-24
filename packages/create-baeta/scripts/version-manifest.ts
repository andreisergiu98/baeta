import fs from 'node:fs/promises';

async function parseManifest(dir: string) {
	try {
		const manifest = await fs.readFile(`../${dir}/package.json`, 'utf8');
		return JSON.parse(manifest) as { name: string; version: string };
	} catch (err) {}
}

async function readManifests() {
	const dirs = await fs.readdir('../', { withFileTypes: true }).then((dirs) => {
		return dirs.filter((dirent) => dirent.isDirectory()).map((dir) => dir.name);
	});

	const manifests = await Promise.all(dirs.map(parseManifest));

	const map = manifests
		.filter((manifest) => manifest != null)
		.reduce<Record<string, string>>((acc, manifest) => {
			acc[manifest.name] = manifest.version;
			return acc;
		}, {});

	return fs.writeFile('versions.json', JSON.stringify(map, null, 2));
}

readManifests().catch(console.log);
