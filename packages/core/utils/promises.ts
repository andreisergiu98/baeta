export function flattenPromises<T>(promises: Array<Promise<T[]>>) {
  return Promise.all(promises).then((result) => result.flat());
}
