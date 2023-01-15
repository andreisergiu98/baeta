export function nameFunction(fn: Function | undefined, name: string) {
  if (!fn) {
    return;
  }

  if (fn.name !== '') {
    return;
  }

  Object.defineProperty(fn, 'name', {
    value: name,
  });
}

export function extendFunction<
  B extends Function,
  M extends Record<string, Function | Record<string, Function>>
>(fn: B, ext: M) {
  const fnExtended = fn as B & M;
  const entries = Object.entries(ext);

  const properties = entries.reduce<PropertyDescriptorMap>(
    (acc, [key, value]) => ({
      ...acc,
      [key]: {
        value,
      },
    }),
    {}
  );

  Object.defineProperties(fnExtended, properties);

  return fnExtended;
}

export function chainFunctions(funcs: Function[]) {
  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => {
    return (...args: unknown[]) => a(b(...args));
  });
}
