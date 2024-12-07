# Interface: ExecPluginOptions

## Properties

### actionName?

> `optional` **actionName**: `string`

---

### exec

> **exec**: `string` \| (`ctx`) => `void` \| `Promise`\<`void`\>

---

### name?

> `optional` **name**: `string`

---

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

---

### watch?

> `optional` **watch**: [`GeneratorPluginV1WatchOptions`](../../generator-sdk/type-aliases/GeneratorPluginV1WatchOptions.md)
