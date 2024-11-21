# Class: FileBlock

## Extends

- [`File`](File.md)

## Constructors

### new FileBlock()

> **new FileBlock**(`filename`, `content`, `start`, `end`, `tag`, `options`?): [`FileBlock`](FileBlock.md)

#### Parameters

• **filename**: `string`

• **content**: `string`

• **start**: `string`

• **end**: `string`

• **tag**: `string`

• **options?**: [`FileOptions`](../interfaces/FileOptions.md)

#### Returns

[`FileBlock`](FileBlock.md)

#### Overrides

[`File`](File.md).[`constructor`](File.md#constructors)

#### Defined in

[packages/generator-sdk/lib/file-block.ts:6](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-block.ts#L6)

## Properties

### content

> **content**: `string`

#### Inherited from

[`File`](File.md).[`content`](File.md#content)

#### Defined in

[packages/generator-sdk/lib/file-block.ts:8](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-block.ts#L8)

***

### end

> **end**: `string`

#### Defined in

[packages/generator-sdk/lib/file-block.ts:10](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-block.ts#L10)

***

### filename

> **filename**: `string`

#### Inherited from

[`File`](File.md).[`filename`](File.md#filename)

#### Defined in

[packages/generator-sdk/lib/file-block.ts:7](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-block.ts#L7)

***

### persisted

> **persisted**: `boolean` = `false`

#### Inherited from

[`File`](File.md).[`persisted`](File.md#persisted)

#### Defined in

[packages/generator-sdk/lib/file.ts:32](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file.ts#L32)

***

### start

> **start**: `string`

#### Defined in

[packages/generator-sdk/lib/file-block.ts:9](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-block.ts#L9)

***

### tag

> **tag**: `string`

#### Inherited from

[`File`](File.md).[`tag`](File.md#tag)

#### Defined in

[packages/generator-sdk/lib/file-block.ts:11](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-block.ts#L11)

## Methods

### addBlockToContent()

> `protected` **addBlockToContent**(`existingContent`): `string`

#### Parameters

• **existingContent**: `string`

#### Returns

`string`

#### Defined in

[packages/generator-sdk/lib/file-block.ts:81](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-block.ts#L81)

***

### buildContent()

> `protected` **buildContent**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

#### Inherited from

[`File`](File.md).[`buildContent`](File.md#buildcontent)

#### Defined in

[packages/generator-sdk/lib/file.ts:60](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file.ts#L60)

***

### buildHeader()

> `protected` **buildHeader**(): `string`

#### Returns

`string`

#### Inherited from

[`File`](File.md).[`buildHeader`](File.md#buildheader)

#### Defined in

[packages/generator-sdk/lib/file.ts:70](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file.ts#L70)

***

### buildPadding()

> `protected` **buildPadding**(`existingContent`): `""` \| "\n" \| "\n\n"

#### Parameters

• **existingContent**: `string`

#### Returns

`""` \| "\n" \| "\n\n"

#### Defined in

[packages/generator-sdk/lib/file-block.ts:88](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-block.ts#L88)

***

### createComment()

> `protected` **createComment**(`comment`): `string`

#### Parameters

• **comment**: `string`

#### Returns

`string`

#### Inherited from

[`File`](File.md).[`createComment`](File.md#createcomment)

#### Defined in

[packages/generator-sdk/lib/file.ts:97](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file.ts#L97)

***

### getExistingContent()

> `protected` **getExistingContent**(): `Promise`\<readonly [`string`, `FileHandle`] \| readonly [`""`, `null`]\>

#### Returns

`Promise`\<readonly [`string`, `FileHandle`] \| readonly [`""`, `null`]\>

#### Defined in

[packages/generator-sdk/lib/file-block.ts:56](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-block.ts#L56)

***

### getSlices()

> `protected` **getSlices**(`existingContent`): readonly [`string`, `""`, `false`] \| readonly [`string`, `string`, `true`]

#### Parameters

• **existingContent**: `string`

#### Returns

readonly [`string`, `""`, `false`] \| readonly [`string`, `string`, `true`]

#### Defined in

[packages/generator-sdk/lib/file-block.ts:66](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-block.ts#L66)

***

### unlink()

> **unlink**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

[`File`](File.md).[`unlink`](File.md#unlink)

#### Defined in

[packages/generator-sdk/lib/file-block.ts:43](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-block.ts#L43)

***

### write()

> **write**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

[`File`](File.md).[`write`](File.md#write)

#### Defined in

[packages/generator-sdk/lib/file-block.ts:20](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-block.ts#L20)
