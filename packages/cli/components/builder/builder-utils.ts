import type { build } from '@baeta/compiler';
import { createRequire } from 'node:module';

type Build = typeof build;

export async function importCompiler(): Promise<Build> {
  try {
    const require = createRequire(import.meta.url);
    const { build } = require('@baeta/compiler');
    return build;
  } catch (e) {
    throw new Error('@baeta/compiler is not installed!');
  }
}
