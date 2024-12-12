# Interface: RequiredStoreOptions\<Root\>

Required configuration options for cache stores

## Extends

- [`StoreOptions`](StoreOptions.md)\<`Root`\>

## Type Parameters

• **Root**

## Properties

### getRef()

> **getRef**: (`root`) => [`ItemRef`](../type-aliases/ItemRef.md)

Function to extract object reference id

#### Parameters

##### root

`Root`

#### Returns

[`ItemRef`](../type-aliases/ItemRef.md)

#### Overrides

[`StoreOptions`](StoreOptions.md).[`getRef`](StoreOptions.md#getref)

---

### revision?

> `optional` **revision**: `number`

Manual cache version for invalidation

#### Inherited from

[`StoreOptions`](StoreOptions.md).[`revision`](StoreOptions.md#revision)

---

### ttl?

> `optional` **ttl**: `number`

Time-to-live in seconds

#### Default

```ts
3600;
```

#### Inherited from

[`StoreOptions`](StoreOptions.md).[`ttl`](StoreOptions.md#ttl)
