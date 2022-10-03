import { mapPrismaTypeToScalar } from './prisma-scalar';

interface ScalarOptions {
  kind?: string;
  list?: boolean;
  required?: boolean;
}

export function printType(name: string, options: ScalarOptions = {}) {
  let type = name;

  if (options.kind === 'scalar' && name !== 'ID') {
    type = mapPrismaTypeToScalar(type);
  }

  if (options.list) {
    type = `[${type}!]`;
  }

  if (options.required) {
    type += '!';
  }

  return type;
}

export const scalars = [
  'scalar DateTime',
  'scalar BigInt',
  'scalar Json',
  'scalar Decimal',
  'scalar Bytes',
];

export function printScalars() {
  return scalars.join('\n');
}
