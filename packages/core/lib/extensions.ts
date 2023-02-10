import { Extension } from '../sdk';

export function createExtensions(...extensions: Array<() => Extension>) {
  return extensions;
}
