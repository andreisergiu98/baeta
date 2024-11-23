# Interface: ExecPluginOptions

## Properties

### actionName?

> `optional` **actionName**: `string`

#### Defined in

[plugin-exec/index.ts:5](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/plugin-exec/index.ts#L5)

***

### exec

> **exec**: `string` \| (`ctx`) => `void` \| `Promise`\<`void`\>

#### Defined in

[plugin-exec/index.ts:6](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/plugin-exec/index.ts#L6)

***

### name?

> `optional` **name**: `string`

#### Defined in

[plugin-exec/index.ts:4](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/plugin-exec/index.ts#L4)

***

### skip()?

> `optional` **skip**: (`ctx`) => `boolean` \| `Promise`\<`boolean`\>

#### Parameters

• **ctx**

• **ctx.changedFile?**: [`WatcherFile`](../../generator/interfaces/WatcherFile.md)

• **ctx.didEnd**: `string`[]

• **ctx.didGenerate**: `string`[]

• **ctx.didSetup**: `string`[]

• **ctx.fileManager**: [`FileManager`](../../generator-sdk/classes/FileManager.md)

• **ctx.generatorOptions**: [`NormalizedGeneratorOptions`](../../generator-sdk/interfaces/NormalizedGeneratorOptions.md)

• **ctx.pluginNames**: `string`[]

• **ctx.watching**: `boolean`

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Defined in

[plugin-exec/index.ts:8](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/plugin-exec/index.ts#L8)

***

### watch?

> `optional` **watch**: [`GeneratorPluginV1WatchOptions`](../../generator-sdk/type-aliases/GeneratorPluginV1WatchOptions.md)

#### Defined in

[plugin-exec/index.ts:7](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/plugin-exec/index.ts#L7)
