# Class: CloudflareCacheClient

## Constructors

### new CloudflareCacheClient()

> **new CloudflareCacheClient**(`durableObject`): [`CloudflareCacheClient`](CloudflareCacheClient.md)

#### Parameters

##### durableObject

`DurableObjectNamespace`\<`undefined`\>

#### Returns

[`CloudflareCacheClient`](CloudflareCacheClient.md)

## Properties

### durableObject

> **durableObject**: `DurableObjectNamespace`\<`undefined`\>

## Methods

### delete()

> **delete**(`keys`): `Promise`\<`null`\>

#### Parameters

##### keys

`string`[]

#### Returns

`Promise`\<`null`\>

---

### deleteOne()

> **deleteOne**(`key`): `Promise`\<`null`\>

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`null`\>

---

### get()

> **get**(`keys`): `Promise`\<(`null` \| `string`)[]\>

#### Parameters

##### keys

`string`[]

#### Returns

`Promise`\<(`null` \| `string`)[]\>

---

### getOne()

> **getOne**(`key`): `Promise`\<`null` \| `string`\>

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`null` \| `string`\>

---

### list()

> **list**(`prefix`, `startAfter`?, `limit`?): `Promise`\<`string`[]\>

#### Parameters

##### prefix

`string`

##### startAfter?

`string`

##### limit?

`number`

#### Returns

`Promise`\<`string`[]\>

---

### put()

> **put**(`values`, `ttl`?): `Promise`\<`null`\>

#### Parameters

##### values

[`string`, `string`][]

##### ttl?

`number`

#### Returns

`Promise`\<`null`\>

---

### putOne()

> **putOne**(`key`, `value`, `ttl`?): `Promise`\<`null`\>

#### Parameters

##### key

`string`

##### value

`string`

##### ttl?

`number`

#### Returns

`Promise`\<`null`\>
