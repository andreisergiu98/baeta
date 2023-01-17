import { dynamicImport } from './import';

export async function dynamicImportCompiler() {
  if (process.env.BAETA_CLI_DEV === '1') {
    return require('@baeta/compiler') as typeof import('@baeta/compiler');
  }
  return dynamicImport('@baeta/compiler') as Promise<typeof import('@baeta/compiler')>;
}
