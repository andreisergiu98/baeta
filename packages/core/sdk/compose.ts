import { createObjectLens } from '../utils/object';
import { MiddlewareMap, ResolversMap } from './resolver-mapper';

export function composeResolvers(resolvers: ResolversMap, middlewareMap: MiddlewareMap = {}) {
  for (const key in middlewareMap) {
    const fns = middlewareMap[key];
    const path = key.split('.');
    const lens = createObjectLens(resolvers, path);

    const originalResolver = lens.get();

    if (!originalResolver) {
      continue;
    }

    const createResolver = chainResolvers([...fns, () => originalResolver]);
    lens.set(createResolver());
  }
}

export function chainResolvers(funcs: Function[]) {
  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => {
    return (...args: unknown[]) => a(b(...args));
  });
}
