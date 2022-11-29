export function createCache(): <T>(
  namespace: string,
  key: string,
  factory: () => Promise<T>
) => Promise<T> {
  const cache = new Map<string, Promise<unknown>>();

  return function ensure<T>(namespace: string, key: string, factory: () => Promise<T>): Promise<T> {
    const cacheKey = `${namespace}:${key}`;

    const cachedValue = cache.get(cacheKey);

    if (cachedValue) {
      return cachedValue as Promise<T>;
    }

    const value = factory();
    cache.set(cacheKey, value);

    return value;
  };
}
