# Class: File

## Extended by

- [`FileBlock`](FileBlock.md)

## Constructors

### new File()

> **new File**(`filename`, `content`, `tag`, `options`?): [`File`](File.md)

#### Parameters

• **filename**: `string`

• **content**: `string`

• **tag**: `string`

• **options?**: [`FileOptions`](../interfaces/FileOptions.md)

#### Returns

[`File`](File.md)

## Properties

### content

> **content**: `string`

***

### filename

> **filename**: `string`

***

### persisted

> **persisted**: `boolean` = `false`

***

### tag

> **tag**: `string`

## Methods

### buildContent()

> `protected` **buildContent**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

***

### buildHeader()

> `protected` **buildHeader**(): `string`

#### Returns

`string`

***

### createComment()

> `protected` **createComment**(`comment`): `string`

#### Parameters

• **comment**: `string`

#### Returns

`string`

***

### unlink()

> **unlink**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### write()

> **write**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>
