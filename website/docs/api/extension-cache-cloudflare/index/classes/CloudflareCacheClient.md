# Class: CloudflareCacheClient

## Constructors

### new CloudflareCacheClient()

> **new CloudflareCacheClient**(`durableObject`): [`CloudflareCacheClient`](CloudflareCacheClient.md)

#### Parameters

• **durableObject**: `DurableObjectNamespace`\<`undefined`\>

#### Returns

[`CloudflareCacheClient`](CloudflareCacheClient.md)

#### Defined in

[packages/extension-cache-cloudflare/lib/cloudflare-cache-client.ts:5](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-cache-cloudflare/lib/cloudflare-cache-client.ts#L5)

## Properties

### durableObject

> **durableObject**: `DurableObjectNamespace`\<`undefined`\>

#### Defined in

[packages/extension-cache-cloudflare/lib/cloudflare-cache-client.ts:5](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-cache-cloudflare/lib/cloudflare-cache-client.ts#L5)

## Methods

### delete()

> **delete**(`keys`): `Promise`\<`null`\>

#### Parameters

• **keys**: `string`[]

#### Returns

`Promise`\<`null`\>

#### Defined in

[packages/extension-cache-cloudflare/lib/cloudflare-cache-client.ts:47](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-cache-cloudflare/lib/cloudflare-cache-client.ts#L47)

***

### deleteOne()

> **deleteOne**(`key`): `Promise`\<`null`\>

#### Parameters

• **key**: `string`

#### Returns

`Promise`\<`null`\>

#### Defined in

[packages/extension-cache-cloudflare/lib/cloudflare-cache-client.ts:56](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-cache-cloudflare/lib/cloudflare-cache-client.ts#L56)

***

### get()

> **get**(`keys`): `Promise`\<(`null` \| `string`)[]\>

#### Parameters

• **keys**: `string`[]

#### Returns

`Promise`\<(`null` \| `string`)[]\>

#### Defined in

[packages/extension-cache-cloudflare/lib/cloudflare-cache-client.ts:17](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-cache-cloudflare/lib/cloudflare-cache-client.ts#L17)

***

### getOne()

> **getOne**(`key`): `Promise`\<`null` \| `string`\>

#### Parameters

• **key**: `string`

#### Returns

`Promise`\<`null` \| `string`\>

#### Defined in

[packages/extension-cache-cloudflare/lib/cloudflare-cache-client.ts:27](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-cache-cloudflare/lib/cloudflare-cache-client.ts#L27)

***

### list()

> **list**(`prefix`, `startAfter`?, `limit`?): `Promise`\<`string`[]\>

#### Parameters

• **prefix**: `string`

• **startAfter?**: `string`

• **limit?**: `number`

#### Returns

`Promise`\<`string`[]\>

#### Defined in

[packages/extension-cache-cloudflare/lib/cloudflare-cache-client.ts:61](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-cache-cloudflare/lib/cloudflare-cache-client.ts#L61)

***

### post()

> `protected` **post**(`body`): `Promise`\<`Response`\>

#### Parameters

• **body**: `Action`

#### Returns

`Promise`\<`Response`\>

#### Defined in

[packages/extension-cache-cloudflare/lib/cloudflare-cache-client.ts:7](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-cache-cloudflare/lib/cloudflare-cache-client.ts#L7)

***

### put()

> **put**(`values`, `ttl`?): `Promise`\<`null`\>

#### Parameters

• **values**: [`string`, `string`][]

• **ttl?**: `number`

#### Returns

`Promise`\<`null`\>

#### Defined in

[packages/extension-cache-cloudflare/lib/cloudflare-cache-client.ts:32](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-cache-cloudflare/lib/cloudflare-cache-client.ts#L32)

***

### putOne()

> **putOne**(`key`, `value`, `ttl`?): `Promise`\<`null`\>

#### Parameters

• **key**: `string`

• **value**: `string`

• **ttl?**: `number`

#### Returns

`Promise`\<`null`\>

#### Defined in

[packages/extension-cache-cloudflare/lib/cloudflare-cache-client.ts:42](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-cache-cloudflare/lib/cloudflare-cache-client.ts#L42)
