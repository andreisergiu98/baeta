# Interface: ExecPluginOptions

## Properties

### exec

> **exec**: `string` \| (`ctx`) => `void` \| `Promise`\<`void`\>

---

### actionName?

> `optional` **actionName**: `string`

---

### name?

> `optional` **name**: `string`

---

### skip()?

> `optional` **skip**: (`ctx`) => `boolean` \| `Promise`\<`boolean`\>

#### Parameters

##### ctx

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

###### changedFile

[`WatcherFile`](../../generator/interfaces/WatcherFile.md)

#### Returns

`boolean` \| `Promise`\<`boolean`\>

---

### watch?

> `optional` **watch**: [`GeneratorPluginV1WatchOptions`](../../generator-sdk/type-aliases/GeneratorPluginV1WatchOptions.md)
