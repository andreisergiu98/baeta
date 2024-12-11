# Function: generate()

> **generate**(`options`, `plugins`, `hooks`?): `Promise`\<`undefined` \| \{ `changedFile`: [`WatcherFile`](../interfaces/WatcherFile.md); `didEnd`: `string`[]; `didGenerate`: `string`[]; `didSetup`: `string`[]; `fileManager`: [`FileManager`](../../generator-sdk/classes/FileManager.md); `generatorOptions`: [`NormalizedGeneratorOptions`](../../generator-sdk/interfaces/NormalizedGeneratorOptions.md); `pluginNames`: `string`[]; `watching`: `boolean`; \}\>

## Parameters

### options

[`GeneratorOptions`](../interfaces/GeneratorOptions.md)

### plugins

[`GeneratorPluginV1`](../interfaces/GeneratorPluginV1.md)\<`unknown`\>[]

### hooks?

[`GeneratorHooks`](../interfaces/GeneratorHooks.md)

## Returns

`Promise`\<`undefined` \| \{ `changedFile`: [`WatcherFile`](../interfaces/WatcherFile.md); `didEnd`: `string`[]; `didGenerate`: `string`[]; `didSetup`: `string`[]; `fileManager`: [`FileManager`](../../generator-sdk/classes/FileManager.md); `generatorOptions`: [`NormalizedGeneratorOptions`](../../generator-sdk/interfaces/NormalizedGeneratorOptions.md); `pluginNames`: `string`[]; `watching`: `boolean`; \}\>
