#! /usr/bin/env node

import { prepClean, prepGenerate, prepHelp } from '../lib/prep.ts';

const arg = process.argv[2];

switch (arg) {
	case '--help':
		prepHelp();
		break;
	case '--clean':
		await prepClean();
		break;
	default:
		await prepGenerate();
}
