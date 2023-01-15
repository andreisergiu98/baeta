import type { build } from '@baeta/compiler';

type Build = typeof build;

export async function importCompiler(): Promise<Build> {
  try {
    const { build } = require('@baeta/compiler');
    return build;
  } catch (e) {
    throw new Error('@baeta/compiler is not installed!');
  }
}
