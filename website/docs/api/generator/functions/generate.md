# Function: generate()

> **generate**(`options`, `plugins`, `hooks`?): `Promise`\<`undefined` \| \{ `didEnd`: `string`[]; `didGenerate`: `string`[]; `didSetup`: `string`[]; `fileManager`: [`FileManager`](../../generator-sdk/classes/FileManager.md); `generatorOptions`: [`NormalizedGeneratorOptions`](../../generator-sdk/interfaces/NormalizedGeneratorOptions.md); `pluginNames`: `string`[]; `watching`: `boolean`; `changedFile`: [`WatcherFile`](../interfaces/WatcherFile.md); \}\>

## Parameters

### options

[`GeneratorOptions`](../interfaces/GeneratorOptions.md)

### plugins

[`GeneratorPluginV1`](../interfaces/GeneratorPluginV1.md)\<`unknown`\>[]

### hooks?

[`GeneratorHooks`](../interfaces/GeneratorHooks.md)

## Returns

`Promise`\<`undefined` \| \{ `didEnd`: `string`[]; `didGenerate`: `string`[]; `didSetup`: `string`[]; `fileManager`: [`FileManager`](../../generator-sdk/classes/FileManager.md); `generatorOptions`: [`NormalizedGeneratorOptions`](../../generator-sdk/interfaces/NormalizedGeneratorOptions.md); `pluginNames`: `string`[]; `watching`: `boolean`; `changedFile`: [`WatcherFile`](../interfaces/WatcherFile.md); \}\>
