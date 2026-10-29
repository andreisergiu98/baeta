---
"@baeta/core": patch
---

Middleware `next` returns `Result | PromiseLike<Result>` and `composeMiddlewares` no longer wraps each step in an async function, so sync middleware chains stay sync. Use `await next()`; don't chain `.then()`, `.catch()` or `.finally()` on it.
