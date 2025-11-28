#! /usr/bin/env node

import { importTSX } from '@baeta/builder/bundler';

await importTSX('../cli.ts', import.meta.url);
