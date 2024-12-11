# Interface: ExecPluginOptions

Configuration options for the exec plugin.

## Properties

### exec

> **exec**: `string` \| (`ctx`) => `void` \| `Promise`\<`void`\>

Command to execute - can be either:

- A string command to be executed via shell
- A function that receives the generator context

---

### actionName?

> `optional` **actionName**: `string`

Action name displayed in the generation status.
Shows as "Generating {actionName}..."

---

### name?

> `optional` **name**: `string`

Plugin name displayed in logs

---

### skip()?

> `optional` **skip**: (`ctx`) => `boolean` \| `Promise`\<`boolean`\>

Optional function to determine if execution should be skipped

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

true if execution should be skipped, false otherwise

---

### watch?

> `optional` **watch**: [`GeneratorPluginV1WatchOptions`](../../generator-sdk/type-aliases/GeneratorPluginV1WatchOptions.md)

File watching configuration
