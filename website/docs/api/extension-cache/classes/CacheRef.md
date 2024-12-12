# Class: CacheRef\<Result, Root, Args\>

Cache reference for a type field or query

## Type Parameters

• **Result**

• **Root**

• **Args**

## Constructors

### new CacheRef()

> **new CacheRef**\<`Result`, `Root`, `Args`\>(`type`, `field`, `hash`, `revision`): [`CacheRef`](CacheRef.md)\<`Result`, `Root`, `Args`\>

#### Parameters

##### type

`string`

##### field

`string`

##### hash

`string`

##### revision

`number` = `1`

#### Returns

[`CacheRef`](CacheRef.md)\<`Result`, `Root`, `Args`\>

## Methods

### getHash()

> **getHash**(): `string`

#### Returns

`string`

---

### getRevision()

> **getRevision**(): `number`

#### Returns

`number`

---

### setRevision()

> **setRevision**(`revision`): `void`

#### Parameters

##### revision

`number`

#### Returns

`void`

---

### toString()

> **toString**(): `string`

#### Returns

`string`
