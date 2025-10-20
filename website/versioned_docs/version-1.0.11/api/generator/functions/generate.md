# generate()

> **generate**(`options`, `plugins`, `hooks?`): `Promise`\<`undefined` \| \{ `didEnd`: `string`[]; `didGenerate`: `string`[]; `didSetup`: `string`[]; `fileManager`: [`FileManager`](../../generator-sdk/classes/FileManager.md); `generatorOptions`: [`NormalizedGeneratorOptions`](../../generator-sdk/interfaces/NormalizedGeneratorOptions.md); `pluginNames`: `string`[]; `watching`: `boolean`; `changedFile?`: [`WatcherFile`](../interfaces/WatcherFile.md); \}\>

## Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`GeneratorOptions`](../interfaces/GeneratorOptions.md)

</td>
</tr>
<tr>
<td>

`plugins`

</td>
<td>

[`GeneratorPluginV1`](../interfaces/GeneratorPluginV1.md)\<`unknown`\>[]

</td>
</tr>
<tr>
<td>

`hooks?`

</td>
<td>

[`GeneratorHooks`](../interfaces/GeneratorHooks.md)

</td>
</tr>
</tbody>
</table>

## Returns

`Promise`\<`undefined` \| \{ `didEnd`: `string`[]; `didGenerate`: `string`[]; `didSetup`: `string`[]; `fileManager`: [`FileManager`](../../generator-sdk/classes/FileManager.md); `generatorOptions`: [`NormalizedGeneratorOptions`](../../generator-sdk/interfaces/NormalizedGeneratorOptions.md); `pluginNames`: `string`[]; `watching`: `boolean`; `changedFile?`: [`WatcherFile`](../interfaces/WatcherFile.md); \}\>
