import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export function createContextualTmpDir(cwd: string) {
	const hash = crypto.createHash('shake256', {
		outputLength: 10,
	});
	hash.update(cwd);
	const suffix = hash.digest('hex');
	const prefix = fs.realpathSync(os.tmpdir());
	return path.join(prefix, 'baeta', `p_${suffix}`);
}
