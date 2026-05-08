#! /usr/bin/env node

import { register } from 'node:module';
register('@baeta/builder/tsx-loader', import.meta.url);
await import(new URL('../cli.ts', import.meta.url).href);
