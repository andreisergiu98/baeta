---
"@baeta/plugin-federation": minor
"@baeta/plugin-graphql": minor
"@baeta/util-graphql": minor
"@baeta/complexity": minor
"@baeta/auth": minor
"@baeta/core": minor
---

Support custom root types declared with `schema { query mutation subscription }`. The generated sources now include `roots`, which `createApplication` requires and checks against the schema.
