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

## Properties

### content

> **content**: `string`

#### Inherited from

[`File`](File.md).[`content`](File.md#content)

***

### end

> **end**: `string`

***

### filename

> **filename**: `string`

#### Inherited from

[`File`](File.md).[`filename`](File.md#filename)

***

### persisted

> **persisted**: `boolean` = `false`

#### Inherited from

[`File`](File.md).[`persisted`](File.md#persisted)

***

### start

> **start**: `string`

***

### tag

> **tag**: `string`

#### Inherited from

[`File`](File.md).[`tag`](File.md#tag)

## Methods

### addBlockToContent()

> `protected` **addBlockToContent**(`existingContent`): `string`

#### Parameters

• **existingContent**: `string`

#### Returns

`string`

***

### buildContent()

> `protected` **buildContent**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

#### Inherited from

[`File`](File.md).[`buildContent`](File.md#buildcontent)

***

### buildHeader()

> `protected` **buildHeader**(): `string`

#### Returns

`string`

#### Inherited from

[`File`](File.md).[`buildHeader`](File.md#buildheader)

***

### buildPadding()

> `protected` **buildPadding**(`existingContent`): `""` \| "\n" \| "\n\n"

#### Parameters

• **existingContent**: `string`

#### Returns

`""` \| "\n" \| "\n\n"

***

### createComment()

> `protected` **createComment**(`comment`): `string`

#### Parameters

• **comment**: `string`

#### Returns

`string`

#### Inherited from

[`File`](File.md).[`createComment`](File.md#createcomment)

***

### getExistingContent()

> `protected` **getExistingContent**(): `Promise`\<readonly [`string`, `FileHandle`] \| readonly [`""`, `null`]\>

#### Returns

`Promise`\<readonly [`string`, `FileHandle`] \| readonly [`""`, `null`]\>

***

### getSlices()

> `protected` **getSlices**(`existingContent`): readonly [`string`, `""`, `false`] \| readonly [`string`, `string`, `true`]

#### Parameters

• **existingContent**: `string`

#### Returns

readonly [`string`, `""`, `false`] \| readonly [`string`, `string`, `true`]

***

### unlink()

> **unlink**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

[`File`](File.md).[`unlink`](File.md#unlink)

***

### write()

> **write**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

[`File`](File.md).[`write`](File.md#write)
