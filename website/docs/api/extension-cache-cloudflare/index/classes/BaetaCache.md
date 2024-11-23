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

#### Defined in

[packages/extension-cache-cloudflare/lib/baeta-cache.ts:39](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/extension-cache-cloudflare/lib/baeta-cache.ts#L39)

## Properties

### env

> **env**: `object`

#### Index Signature

 \[`key`: `string`\]: `never`

#### Defined in

[packages/extension-cache-cloudflare/lib/baeta-cache.ts:41](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/extension-cache-cloudflare/lib/baeta-cache.ts#L41)

***

### state

> **state**: `DurableObjectState`

#### Defined in

[packages/extension-cache-cloudflare/lib/baeta-cache.ts:40](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/extension-cache-cloudflare/lib/baeta-cache.ts#L40)

## Methods

### alarm()

> **alarm**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

`DurableObject.alarm`

#### Defined in

[packages/extension-cache-cloudflare/lib/baeta-cache.ts:164](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/extension-cache-cloudflare/lib/baeta-cache.ts#L164)

***

### delete()

> **delete**(`keys`): `Promise`\<`null`\>

#### Parameters

• **keys**: `string`[]

#### Returns

`Promise`\<`null`\>

#### Defined in

[packages/extension-cache-cloudflare/lib/baeta-cache.ts:108](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/extension-cache-cloudflare/lib/baeta-cache.ts#L108)

***

### fetch()

> **fetch**(`request`): `Promise`\<`Response`\>

#### Parameters

• **request**: `Request`\<`unknown`, `CfProperties`\<`unknown`\>\>

#### Returns

`Promise`\<`Response`\>

#### Implementation of

`DurableObject.fetch`

#### Defined in

[packages/extension-cache-cloudflare/lib/baeta-cache.ts:44](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/extension-cache-cloudflare/lib/baeta-cache.ts#L44)

***

### get()

> **get**(`keys`): `Promise`\<`string`\>

#### Parameters

• **keys**: `string`[]

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/extension-cache-cloudflare/lib/baeta-cache.ts:71](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/extension-cache-cloudflare/lib/baeta-cache.ts#L71)

***

### handleEviction()

> **handleEviction**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/extension-cache-cloudflare/lib/baeta-cache.ts:113](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/extension-cache-cloudflare/lib/baeta-cache.ts#L113)

***

### list()

> **list**(`prefix`, `startAfter`?, `limit`?): `Promise`\<`string`\>

#### Parameters

• **prefix**: `string`

• **startAfter?**: `string`

• **limit?**: `number`

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/extension-cache-cloudflare/lib/baeta-cache.ts:98](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/extension-cache-cloudflare/lib/baeta-cache.ts#L98)

***

### put()

> **put**(`values`, `ttl`?): `Promise`\<`null`\>

#### Parameters

• **values**: [`string`, `string`][]

• **ttl?**: `number`

#### Returns

`Promise`\<`null`\>

#### Defined in

[packages/extension-cache-cloudflare/lib/baeta-cache.ts:79](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/extension-cache-cloudflare/lib/baeta-cache.ts#L79)

***

### scheduledEviction()

> **scheduledEviction**(`at`): `Promise`\<`void`\>

#### Parameters

• **at**: `number`

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/extension-cache-cloudflare/lib/baeta-cache.ts:155](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/extension-cache-cloudflare/lib/baeta-cache.ts#L155)
