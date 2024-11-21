# Class: FileManager

## Constructors

### new FileManager()

> **new FileManager**(`fileOptions`?): [`FileManager`](FileManager.md)

#### Parameters

• **fileOptions?**: [`FileOptions`](../interfaces/FileOptions.md)

#### Returns

[`FileManager`](FileManager.md)

#### Defined in

[packages/generator-sdk/lib/file-manager.ts:6](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-manager.ts#L6)

## Properties

### fileOptions?

> `optional` **fileOptions**: [`FileOptions`](../interfaces/FileOptions.md)

#### Defined in

[packages/generator-sdk/lib/file-manager.ts:6](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-manager.ts#L6)

***

### files

> **files**: [`File`](File.md)[] = `[]`

#### Defined in

[packages/generator-sdk/lib/file-manager.ts:4](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-manager.ts#L4)

## Methods

### add()

> **add**(...`file`): `void`

#### Parameters

• ...**file**: [`File`](File.md)[]

#### Returns

`void`

#### Defined in

[packages/generator-sdk/lib/file-manager.ts:14](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-manager.ts#L14)

***

### createAndAdd()

> **createAndAdd**(`filename`, `content`, `tag`): [`File`](File.md)

#### Parameters

• **filename**: `string`

• **content**: `string`

• **tag**: `string`

#### Returns

[`File`](File.md)

#### Defined in

[packages/generator-sdk/lib/file-manager.ts:8](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-manager.ts#L8)

***

### get()

> **get**(`filename`): `undefined` \| [`File`](File.md)

#### Parameters

• **filename**: `string`

#### Returns

`undefined` \| [`File`](File.md)

#### Defined in

[packages/generator-sdk/lib/file-manager.ts:18](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-manager.ts#L18)

***

### getAll()

> **getAll**(): [`File`](File.md)[]

#### Returns

[`File`](File.md)[]

#### Defined in

[packages/generator-sdk/lib/file-manager.ts:22](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-manager.ts#L22)

***

### getByTag()

> **getByTag**(`tag`): [`File`](File.md)[]

#### Parameters

• **tag**: `string`

#### Returns

[`File`](File.md)[]

#### Defined in

[packages/generator-sdk/lib/file-manager.ts:26](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-manager.ts#L26)

***

### getPersistedFiles()

> **getPersistedFiles**(): [`File`](File.md)[]

#### Returns

[`File`](File.md)[]

#### Defined in

[packages/generator-sdk/lib/file-manager.ts:60](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-manager.ts#L60)

***

### remove()

> **remove**(`filename`): `void`

#### Parameters

• **filename**: `string`

#### Returns

`void`

#### Defined in

[packages/generator-sdk/lib/file-manager.ts:30](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-manager.ts#L30)

***

### removeAll()

> **removeAll**(): `void`

#### Returns

`void`

#### Defined in

[packages/generator-sdk/lib/file-manager.ts:35](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-manager.ts#L35)

***

### removeByTag()

> **removeByTag**(`tag`): `void`

#### Parameters

• **tag**: `string`

#### Returns

`void`

#### Defined in

[packages/generator-sdk/lib/file-manager.ts:39](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-manager.ts#L39)

***

### unlinkAll()

> **unlinkAll**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/generator-sdk/lib/file-manager.ts:54](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-manager.ts#L54)

***

### writeAll()

> **writeAll**(): `Promise`\<`void`[]\>

#### Returns

`Promise`\<`void`[]\>

#### Defined in

[packages/generator-sdk/lib/file-manager.ts:43](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-manager.ts#L43)

***

### writeByTag()

> **writeByTag**(`tag`): `Promise`\<`void`[]\>

#### Parameters

• **tag**: `string`

#### Returns

`Promise`\<`void`[]\>

#### Defined in

[packages/generator-sdk/lib/file-manager.ts:48](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/file-manager.ts#L48)
