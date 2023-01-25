export function createGrantCache() {
  const cache: Record<string, undefined | string[]> = {};

  return {
    getGrants: (path: string) => {
      if (!path) {
        return;
      }
      return cache[path];
    },
    setGrants: (path: string, value: string | string[]) => {
      cache[path] = Array.isArray(value) ? value : [value];
    },
  };
}

export type GrantCache = ReturnType<typeof createGrantCache>;
