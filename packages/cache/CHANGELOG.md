# @baeta/cache

## 2.0.0-next.16

### Major Changes

- The cache system has been fully rewritten and split out of the GraphQL framework into a standalone `@baeta/cache` package. It no longer depends on `@baeta/core` or `graphql` and can be used on its own. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

  The biggest conceptual change: the old GraphQL extension API is gone. There is no more `cacheExtension(...)`, `$createCache`, `$useCache`, `$cacheRef`, `$cacheRevision`, or `$cacheClear`. You no longer register a cache as a Baeta extension. Instead you build a cache object directly with `createCache(client, options)`, declare cached queries with `defineQuery`, and wire it into resolvers with the normal resolver builder (`.map()` / `.resolve()`) — the cache is just a library you call.

  #### Building a cache

  In v1 the storage adapter wrapped a client and you created per-type caches off a GraphQL type via the extension:

  ```typescript
  // v1
  import { cacheExtension } from "@baeta/extension-cache";
  import { RedisStore } from "@baeta/extension-cache-redis";
  import Redis from "ioredis";

  const redis = new Redis("redis://localhost:6379");
  const redisStore = new RedisStore(redis);

  export const cacheExt = cacheExtension(redisStore, { ttl: 3600 });

  // in a module
  const userCache = User.$createCache({ revision: 2 });
  ```

  In v2 you pass a `CacheClient` (the adapter) directly to `createCache`, give the cache a `name`, and provide `parse`/`serialize`. `parse`/`serialize` are now required, which lets you validate cached values on read (e.g. with Zod). TTL is now in milliseconds (`ttlMs`) instead of seconds (`ttl`):

  ```typescript
  // v2
  import { createCache, defineQuery } from "@baeta/cache";
  import { RedisCacheClient } from "@baeta/cache-ioredis";
  import Redis from "ioredis";
  import { z } from "zod";

  const redis = new Redis("redis://localhost:6379");
  const redisClient = new RedisCacheClient(redis);

  const UserSchema = z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
  });

  export const userCache = createCache(redisClient, {
    name: "UserCache",
    revision: 2,
    ttlMs: 60 * 60 * 1000, // defaults to 1 hour
    parse: (value) => UserSchema.parse(JSON.parse(value)),
    serialize: (value) => JSON.stringify(value),
  })
    .withQueries({
      findUser: defineQuery({
        resolve: async (args: { id: string | null; email: string | null }) => {
          return db.user.findUnique({
            where: { id: args.id ?? undefined, email: args.email ?? undefined },
          });
        },
      }),
      findUsers: defineQuery({
        resolve: async () => db.user.findMany(),
      }),
    })
    .build();
  ```

  `createCache(...)` returns a factory: call `.build()` for an item-only cache, or `.withQueries({...}).build()` to attach typed, cached queries. By default `getRef` extracts the `id` field; pass `getRef` for items keyed differently.

  #### Reading through the cache

  `$useCache(...)` as a resolver middleware is gone. A cached query is just an async function (`userCache.queries.findUser(args)`) that you call from a normal resolver. The resolver builder's `.map()` turns resolver params into query args:

  ```typescript
  // v1
  Query.user.$useCache(userCache);

  // v2
  export default Query.$fields({
    user: Query.user.map(({ args }) =>
      userCache.queries.findUser({
        id: args.where.id,
        email: args.where.email,
      })
    ),
    users: Query.users
      .map(() => userCache.queries.findUsers({}))
      .map(({ source }) => source ?? []),
  });
  ```

  #### Reconciling on mutations

  The single `save()` method is replaced by explicit `insert()` (new items), `update()` (existing items) and `delete()`. These give the cache enough information to reconcile every related query automatically, instead of manually clearing query results:

  ```typescript
  // v1
  Mutation.updateUser.$use(async (params, next) => {
    const user = await next();
    await userCache.save(user);
    return user;
  });

  // v2
  const createUserMutation = Mutation.createUser.resolve(async ({ args }) => {
    const user = await db.user.create({ data: args.data });
    await userCache.insert(user); // new item
    return user;
  });

  const updateUserMutation = Mutation.updateUser
    .$use(async (next) => {
      const user = await next();
      if (user) {
        await userCache.update(user); // existing item — updates all queries
      }
      return user;
    })
    .resolve(({ args }) =>
      db.user.update({ where: { id: args.where.id }, data: args.data })
    );
  ```

  #### Targeted invalidation with `indexArgsBy`

  Relationship queries ("all photos for user X") can declare `indexArgsBy` so invalidation is surgical. `defineQuery` also accepts per-query `onInsert` / `onUpdate` / `onDelete` hooks, which receive `helpers` (`invalidateAll`, `invalidateByArgs`) to invalidate only the matching index keys:

  ```typescript
  // v2
  export const userPhotoCache = createCache(redisClient, {
    name: "UserPhotoCache",
    parse: (value) => JSON.parse(value),
    serialize: (value) => JSON.stringify(value),
  })
    .withQueries({
      findUserPhotos: defineQuery({
        resolve: async (args: { userId: string }) =>
          db.userPhoto.findMany({ where: { userId: args.userId } }),
        indexArgsBy: { userId: true },
        onInsert(items, helpers) {
          return helpers.invalidateByArgs(
            items.map((item) => ({ userId: item.userId }))
          );
        },
        onDelete(pairs, helpers) {
          return helpers.invalidateByArgs(
            pairs.flatMap((p) =>
              p.previous ? [{ userId: p.previous.userId }] : []
            )
          );
        },
      }),
    })
    .build();
  ```

  #### Other changes

  - TTL is now milliseconds (`ttlMs`) everywhere, replacing v1's seconds-based `ttl`.
  - A cache must have a `name`; `revision`, `ttlMs` and `namespace` can be set on the cache or defaulted from the client.
  - By default, re-resolving a cached query does not overwrite items already in the cache (preventing a stale query result from clobbering a concurrent mutation). Set `replaceExistingItems: true` on a query to opt back into overwriting.
  - Custom hooks fire asynchronously by default; pass `{ waitForHooks: true }` to `insert`/`update`/`delete` to await them.

  See the [caching guide](https://baeta.io/docs/advanced/caching) for an end-to-end setup.

- Drop support for Node.js v23 and v25. Baeta now targets the active LTS releases — Node.js `^22.20.0`, `^24.0.0`, or `>=26.0.0`. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

### Patch Changes

- Updated dependencies [[`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c), [`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c), [`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c)]:
  - @baeta/util-encoding@2.0.0-next.5
  - @baeta/util-log@2.0.0-next.5
