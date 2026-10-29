---
"@baeta/core": patch
---

Context stores return a third `getMaybeSync(ctx)` function that returns the cached value synchronously once it has resolved, and falls back to the loader's promise while it's still loading. Sync loaders resolve immediately, so the first read is already sync.
