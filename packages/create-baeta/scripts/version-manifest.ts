import fs from 'node:fs/promises';

async function parseManifest(dir: string) {
	try {
		const manifest = await fs.readFile(`../${dir}/package.json`, 'utf8');
		return JSON.parse(manifest) as { name: string; version: string };
	} catch {}
}

async function generateVersions() {
	console.log('[create-baeta] Generating versions.json...');

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

	await fs.writeFile('versions.json', JSON.stringify(map, null, 2));

	console.log('[create-baeta] Generated versions.json');
}

await generateVersions();
