---
"@baeta/cache-redis-common": major
---

`@baeta/cache-redis-common` is a new package holding the Redis/Valkey building blocks shared by `@baeta/cache-ioredis` and `@baeta/cache-iovalkey` — pipeline batching helpers (`assertNoPipelineErrors`, `batchPipeline`) and the cached Lua script loader (`createRedisScripts`, `RedisScripts`). Most applications depend on a concrete adapter rather than on this package directly.
