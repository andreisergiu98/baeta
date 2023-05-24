import { Ctx } from '@baeta/generator-sdk';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

export interface PersistedState {
  version: '1';
  previousFiles: string[];
}

function isVersion1(state: unknown): state is PersistedState {
  if (typeof state !== 'object' || state === null) {
    return false;
  }

  if ((state as Record<string, unknown>).version !== '1') {
    return false;
  }

  return true;
}

export function getStateFilename(cwd: string) {
  const hash = crypto.createHash('shake256', {
    outputLength: 8,
  });
  hash.update(cwd);
  const name = hash.digest('hex');
  return path.join(os.tmpdir(), 'baeta', `${name}.json`);
}

export async function readState(filename: string) {
  try {
    const content = await fs.readFile(filename, 'utf-8');
    const state = JSON.parse(content) as PersistedState;

    if (isVersion1(state)) {
      return state;
    }
  } catch (error) {
    // do nothing
  }

  return null;
}

export async function saveState(filename: string, ctx: Ctx) {
  const state: PersistedState = {
    version: '1',
    previousFiles: ctx.fileManager.getPersistedFileNames(),
  };

  try {
    await fs.mkdir(path.dirname(filename), { recursive: true });
    await fs.writeFile(filename, JSON.stringify(state, null, 2));
    return true;
  } catch (error) {
    return false;
  }
}
