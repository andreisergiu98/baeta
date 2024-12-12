# Interface: ResolverExtensions\<Result, Root, Context, Args\>

## Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

## Properties

### $cacheClear()

> **$cacheClear**: (`store`, `matcher`?) => `Promise`\<`void`\>

Clears cached results for the resolver

#### Parameters

##### store

[`StoreAdapter`](../../../classes/StoreAdapter.md)\<[`TypeGetter`](../../../type-aliases/TypeGetter.md)\<`Result`\>\>

Cache store adapter

##### matcher?

[`CacheQueryMatching`](../../../type-aliases/CacheQueryMatching.md)\<`Args`\>

Optional criteria for selective clearing

#### Returns

`Promise`\<`void`\>

#### Example

```typescript
// Clear all cached users
await Query.users.$cacheClear(userCache);

// Clear cached users for specific organization
await Query.users.$cacheClear(userCache, {
  args: { organizationId: "org-1" },
});
```

---

### $cacheRef

> **$cacheRef**: [`CacheRef`](../../../classes/CacheRef.md)\<`Result`, `Root`, `Args`\>

Reference cache object for a query or type field.

---

### $cacheRevision()

> **$cacheRevision**: (`number`) => `void`

Updates the cache revision for a certain resolver.

#### Parameters

##### number

`number`

New revision number

#### Returns

`void`

#### Example

```typescript
Query.users.$cacheRevision(2);
```

---

### $useCache()

> **$useCache**: (...`args`) => `void`

Enables caching for the resolver

#### Parameters

##### args

...[`UseCacheArgs`](../../../type-aliases/UseCacheArgs.md)\<`Result`, `Root`\>

Cache configuration arguments

#### Returns

`void`

#### Example

```typescript
// Simple caching
Query.user.$useCache(userCache);

// With custom options
Query.user.$useCache(userCache, {
  getRootRef: (root) => root.userId,
});
```
