---
"@baeta/core": patch
---

Add `mapMaybePromiseAll` and `mapMaybePromiseAny` to `@baeta/core/utils`. They map every item and combine the results like `Promise.all` / `Promise.any`, staying sync when the results allow it.
