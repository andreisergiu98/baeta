# @baeta/promises

## 2.0.0-next.18

### Major Changes

- `@baeta/promises` is a new package of promise utilities. It ships the helpers Baeta uses to keep sync code paths sync: `isPromise`, `mapMaybePromise` and `thenMaybePromise`, plus `mapMaybePromiseAll` / `mapMaybePromiseAny`, which map every item and combine the results like `Promise.all` / `Promise.any`, staying sync when the results allow it. by [@andreisergiu98](https://github.com/andreisergiu98) in [#676](https://github.com/andreisergiu98/baeta/pull/676)
