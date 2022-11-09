export function flattenPromises<T>(promises: Promise<T[]>[]) {
  return Promise.all(promises).then((result) => result.flat());
}
