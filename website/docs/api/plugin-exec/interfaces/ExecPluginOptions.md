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

##### ctx

###### changedFile

[`WatcherFile`](../../generator/interfaces/WatcherFile.md)

###### didEnd

`string`[]

###### didGenerate

`string`[]

###### didSetup

`string`[]

###### fileManager

[`FileManager`](../../generator-sdk/classes/FileManager.md)

###### generatorOptions

[`NormalizedGeneratorOptions`](../../generator-sdk/interfaces/NormalizedGeneratorOptions.md)

###### pluginNames

`string`[]

###### watching

`boolean`

#### Returns

`boolean` \| `Promise`\<`boolean`\>

---

### watch?

> `optional` **watch**: [`GeneratorPluginV1WatchOptions`](../../generator-sdk/type-aliases/GeneratorPluginV1WatchOptions.md)
