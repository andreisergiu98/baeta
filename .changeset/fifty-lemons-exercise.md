---
"@baeta/cli": patch
"@baeta/compiler": patch
"@baeta/core": patch
"@baeta/directives": patch
"@baeta/env": patch
"@baeta/errors": patch
"@baeta/extension-auth": patch
"@baeta/extension-cache": patch
"@baeta/extension-cache-cloudflare": patch
"@baeta/extension-cache-keyv": patch
"@baeta/extension-cache-redis": patch
"@baeta/extension-cache-upstash": patch
"@baeta/extension-complexity": patch
"@baeta/generator": patch
"@baeta/generator-sdk": patch
"@baeta/plugin": patch
"@baeta/plugin-autoload": patch
"@baeta/plugin-cloudflare": patch
"@baeta/plugin-directives": patch
"@baeta/plugin-exec": patch
"@baeta/plugin-gitignore": patch
"@baeta/plugin-graphql": patch
"@baeta/plugin-pagination": patch
"@baeta/plugin-prisma": patch
"@baeta/cloudflare-subscriptions": patch
"@baeta/subscriptions-pubsub": patch
"@baeta/util-encoding": patch
"@baeta/util-env": patch
"@baeta/util-log": patch
"@baeta/util-path": patch
---

Raise minimum required NodeJS version to 22.12.0. Drop CommonJS builds in favor of the require_esm feature from NodeJS 22.12.0 onwards.
