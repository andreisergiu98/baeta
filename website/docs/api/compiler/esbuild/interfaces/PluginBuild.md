# PluginBuild

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="esbuild"></a> `esbuild`

</td>
<td>

`object`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`esbuild.analyzeMetafile`

</td>
<td>

(`metafile`, `options?`) => `Promise`\<`string`\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`esbuild.analyzeMetafileSync`

</td>
<td>

(`metafile`, `options?`) => `string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`esbuild.build`

</td>
<td>

\<`T`\>(`options`) => `Promise`\<[`BuildResult`](BuildResult.md)\<`T`\>\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`esbuild.buildSync`

</td>
<td>

\<`T`\>(`options`) => [`BuildResult`](BuildResult.md)\<`T`\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`esbuild.context`

</td>
<td>

\<`T`\>(`options`) => `Promise`\<[`BuildContext`](BuildContext.md)\<`T`\>\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`esbuild.formatMessages`

</td>
<td>

(`messages`, `options`) => `Promise`\<`string`[]\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`esbuild.formatMessagesSync`

</td>
<td>

(`messages`, `options`) => `string`[]

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`esbuild.initialize`

</td>
<td>

(`options`) => `Promise`\<`void`\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`esbuild.transform`

</td>
<td>

\<`T`\>(`input`, `options?`) => `Promise`\<[`TransformResult`](TransformResult.md)\<`T`\>\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`esbuild.transformSync`

</td>
<td>

\<`T`\>(`input`, `options?`) => [`TransformResult`](TransformResult.md)\<`T`\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`esbuild.version`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="initialoptions"></a> `initialOptions`

</td>
<td>

[`BuildOptions`](BuildOptions.md)

</td>
<td>

Documentation: https://esbuild.github.io/plugins/#build-options

</td>
</tr>
</tbody>
</table>

## Methods

### onDispose()

> **onDispose**(`callback`): `void`

Documentation: https://esbuild.github.io/plugins/#on-dispose

#### Parameters

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

`callback`

</td>
<td>

() => `void`

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### onEnd()

> **onEnd**(`callback`): `void`

Documentation: https://esbuild.github.io/plugins/#on-end

#### Parameters

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

`callback`

</td>
<td>

(`result`) => `null` \| `void` \| [`OnEndResult`](OnEndResult.md) \| `Promise`\<`null` \| `void` \| [`OnEndResult`](OnEndResult.md)\>

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### onLoad()

> **onLoad**(`options`, `callback`): `void`

Documentation: https://esbuild.github.io/plugins/#on-load

#### Parameters

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

[`OnLoadOptions`](OnLoadOptions.md)

</td>
</tr>
<tr>
<td>

`callback`

</td>
<td>

(`args`) => `undefined` \| `null` \| [`OnLoadResult`](OnLoadResult.md) \| `Promise`\<`undefined` \| `null` \| [`OnLoadResult`](OnLoadResult.md)\>

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### onResolve()

> **onResolve**(`options`, `callback`): `void`

Documentation: https://esbuild.github.io/plugins/#on-resolve

#### Parameters

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

[`OnResolveOptions`](OnResolveOptions.md)

</td>
</tr>
<tr>
<td>

`callback`

</td>
<td>

(`args`) => `undefined` \| `null` \| [`OnResolveResult`](OnResolveResult.md) \| `Promise`\<`undefined` \| `null` \| [`OnResolveResult`](OnResolveResult.md)\>

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### onStart()

> **onStart**(`callback`): `void`

Documentation: https://esbuild.github.io/plugins/#on-start

#### Parameters

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

`callback`

</td>
<td>

() => `null` \| `void` \| [`OnStartResult`](OnStartResult.md) \| `Promise`\<`null` \| `void` \| [`OnStartResult`](OnStartResult.md)\>

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### resolve()

> **resolve**(`path`, `options?`): `Promise`\<[`ResolveResult`](ResolveResult.md)\>

Documentation: https://esbuild.github.io/plugins/#resolve

#### Parameters

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

`path`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`ResolveOptions`](ResolveOptions.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<[`ResolveResult`](ResolveResult.md)\>
