---
"@baeta/auth": patch
---

Auth middlewares run synchronously when everything they depend on is sync or already cached: the function passed to `createAuth`, the scope loaders a rule touches, rule and grant functions, and the resolver. Resolved async scope results are cached as plain booleans, so only the first check of a scope in a request waits on its loader.
