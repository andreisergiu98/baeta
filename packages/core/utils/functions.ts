export function nameFunction(fn: Function | undefined, name: string) {
  if (!fn) {
    return;
  }

  if (fn.name === '') {
    return;
  }

  Object.defineProperty(fn, 'name', {
    value: name,
  });
}
