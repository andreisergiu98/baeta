# @baeta/cache-redis-common

## 2.0.0-next.14

### Major Changes

- `@baeta/cache-redis-common` is a new package holding the Redis/Valkey building blocks shared by `@baeta/cache-ioredis` and `@baeta/cache-iovalkey` — pipeline batching helpers (`assertNoPipelineErrors`, `batchPipeline`) and the cached Lua script loader (`createRedisScripts`, `RedisScripts`). Most applications depend on a concrete adapter rather than on this package directly. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

- Drop support for Node.js v23 and v25. Baeta now targets the active LTS releases — Node.js `^22.20.0`, `^24.0.0`, or `>=26.0.0`. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)
