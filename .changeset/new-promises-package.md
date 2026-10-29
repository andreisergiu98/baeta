---
"@baeta/promises": major
---

`@baeta/promises` is a new package of promise utilities. It ships the helpers Baeta uses to keep sync code paths sync: `isPromise`, `mapMaybePromise` and `thenMaybePromise`, plus `mapMaybePromiseAll` / `mapMaybePromiseAny`, which map every item and combine the results like `Promise.all` / `Promise.any`, staying sync when the results allow it.
