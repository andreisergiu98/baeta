# Class: BaetaCache

## Implements

- `DurableObject`

## Constructors

### new BaetaCache()

> **new BaetaCache**(`state`, `env`): [`BaetaCache`](BaetaCache.md)

#### Parameters

• **state**: `DurableObjectState`

• **env**

#### Returns

[`BaetaCache`](BaetaCache.md)

## Properties

### env

> **env**: `object`

#### Index Signature

 \[`key`: `string`\]: `never`

***

### state

> **state**: `DurableObjectState`

## Methods

### alarm()

> **alarm**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

`DurableObject.alarm`

***

### delete()

> **delete**(`keys`): `Promise`\<`null`\>

#### Parameters

• **keys**: `string`[]

#### Returns

`Promise`\<`null`\>

***

### fetch()

> **fetch**(`request`): `Promise`\<`Response`\>

#### Parameters

• **request**: `Request`\<`unknown`, `CfProperties`\<`unknown`\>\>

#### Returns

`Promise`\<`Response`\>

#### Implementation of

`DurableObject.fetch`

***

### get()

> **get**(`keys`): `Promise`\<`string`\>

#### Parameters

• **keys**: `string`[]

#### Returns

`Promise`\<`string`\>

***

### handleEviction()

> **handleEviction**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### list()

> **list**(`prefix`, `startAfter`?, `limit`?): `Promise`\<`string`\>

#### Parameters

• **prefix**: `string`

• **startAfter?**: `string`

• **limit?**: `number`

#### Returns

`Promise`\<`string`\>

***

### put()

> **put**(`values`, `ttl`?): `Promise`\<`null`\>

#### Parameters

• **values**: [`string`, `string`][]

• **ttl?**: `number`

#### Returns

`Promise`\<`null`\>

***

### scheduledEviction()

> **scheduledEviction**(`at`): `Promise`\<`void`\>

#### Parameters

• **at**: `number`

#### Returns

`Promise`\<`void`\>
