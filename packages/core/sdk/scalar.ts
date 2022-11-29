import { ScalarResolver } from '../lib';
import { ModuleBuilder } from '../sdk';

export function createScalarBuilder(module: ModuleBuilder, scalar: string) {
  const builder = (resolver: ScalarResolver) => {
    module.onScalar(scalar, resolver);
  };
  return builder;
}
