# Interface: StoreOptions\<Root\>

Configuration options for cache stores

## Extends

- [`DefaultStoreOptions`](DefaultStoreOptions.md)

## Extended by

- [`RequiredStoreOptions`](RequiredStoreOptions.md)

## Type Parameters

• **Root**

## Properties

### getRef()?

> `optional` **getRef**: (`root`) => [`ItemRef`](../type-aliases/ItemRef.md)

Function to extract object reference id

#### Parameters

##### root

`Root`

#### Returns

[`ItemRef`](../type-aliases/ItemRef.md)

---

### revision?

> `optional` **revision**: `number`

Manual cache version for invalidation

---

### ttl?

> `optional` **ttl**: `number`

Time-to-live in seconds

#### Default

```ts
3600;
```

#### Inherited from

[`DefaultStoreOptions`](DefaultStoreOptions.md).[`ttl`](DefaultStoreOptions.md#ttl)
