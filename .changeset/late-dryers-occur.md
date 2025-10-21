---
"@baeta/extension-cache-cloudflare": major
"@baeta/extension-cache-upstash": major
"@baeta/extension-cache-redis": major
"@baeta/extension-cache-keyv": major
"@baeta/extension-complexity": major
"@baeta/subscriptions-pubsub": major
"@baeta/plugin-cloudflare": major
"@baeta/plugin-directives": major
"@baeta/plugin-pagination": major
"@baeta/plugin-gitignore": major
"@baeta/extension-cache": major
"@baeta/extension-auth": major
"@baeta/plugin-graphql": major
"@baeta/generator-sdk": major
"@baeta/plugin-prisma": major
"@baeta/util-encoding": major
"create-baeta": major
"@baeta/plugin-exec": major
"@baeta/directives": major
"@baeta/generator": major
"@baeta/util-path": major
"@baeta/tests-cache-stores": major
"@baeta/util-env": major
"@baeta/util-log": major
"@baeta/errors": major
"@baeta/plugin": major
"@baeta/core": major
"@baeta/cli": major
"@baeta/env": major
"@baeta/subscriptions-cloudflare": minor
---

Baeta v2 – major refactor

- **Side-effect-free type generation & resolver definitions.**  
  The types generator and resolver definitions were reworked to be side-effect free, improving type safety.
- **Stricter type safety.**  
  You must now **explicitly define resolvers for every field** during development—breakages that used to surface at runtime are now caught at compile time.
- **Removed `@baeta/compiler`.**  
  Since modern runtimes can execute TypeScript natively, the separate compiler package is no longer needed. Use your runtime’s native TS support or your existing build setup.
- **Subscriptions update.**  
  `@baeta/subscriptions-pubsub` now targets **`graphql-subscriptions` v3**.
