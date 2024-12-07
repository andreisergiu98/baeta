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

#### Defined in

[packages/generator-sdk/lib/file.ts:34](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/file.ts#L34)

## Properties

### content

> **content**: `string`

#### Defined in

[packages/generator-sdk/lib/file.ts:36](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/file.ts#L36)

***

### filename

> **filename**: `string`

#### Defined in

[packages/generator-sdk/lib/file.ts:35](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/file.ts#L35)

***

### persisted

> **persisted**: `boolean` = `false`

#### Defined in

[packages/generator-sdk/lib/file.ts:32](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/file.ts#L32)

***

### tag

> **tag**: `string`

#### Defined in

[packages/generator-sdk/lib/file.ts:37](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/file.ts#L37)

## Methods

### buildContent()

> `protected` **buildContent**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

#### Defined in

[packages/generator-sdk/lib/file.ts:60](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/file.ts#L60)

***

### buildHeader()

> `protected` **buildHeader**(): `string`

#### Returns

`string`

#### Defined in

[packages/generator-sdk/lib/file.ts:70](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/file.ts#L70)

***

### createComment()

> `protected` **createComment**(`comment`): `string`

#### Parameters

• **comment**: `string`

#### Returns

`string`

#### Defined in

[packages/generator-sdk/lib/file.ts:97](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/file.ts#L97)

***

### unlink()

> **unlink**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/generator-sdk/lib/file.ts:55](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/file.ts#L55)

***

### write()

> **write**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/generator-sdk/lib/file.ts:41](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/file.ts#L41)
