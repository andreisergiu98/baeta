export function createObjectLens<T = unknown>(
  obj: Record<string, unknown>,
  path: Array<string | number>
) {
  let i = 0;

  for (; i < path.length - 1; i++) {
    obj = obj[path[i]] as Record<string, unknown>;
  }

  const key = path[i];

  const get = (): T => {
    return obj[key] as T;
  };

  const set = (value: T) => {
    obj[key] = value;
  };

  return { get, set };
}
