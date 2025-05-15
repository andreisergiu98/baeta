# BuildContext\<ProvidedOptions\>

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`ProvidedOptions` _extends_ [`BuildOptions`](BuildOptions.md)

</td>
<td>

[`BuildOptions`](BuildOptions.md)

</td>
</tr>
</tbody>
</table>

## Methods

### cancel()

> **cancel**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

---

### dispose()

> **dispose**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

---

### rebuild()

> **rebuild**(): `Promise`\<[`BuildResult`](BuildResult.md)\<`ProvidedOptions`\>\>

Documentation: https://esbuild.github.io/api/#rebuild

#### Returns

`Promise`\<[`BuildResult`](BuildResult.md)\<`ProvidedOptions`\>\>

---

### serve()

> **serve**(`options?`): `Promise`\<[`ServeResult`](ServeResult.md)\>

Documentation: https://esbuild.github.io/api/#serve

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

`options?`

</td>
<td>

[`ServeOptions`](ServeOptions.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<[`ServeResult`](ServeResult.md)\>

---

### watch()

> **watch**(`options?`): `Promise`\<`void`\>

Documentation: https://esbuild.github.io/api/#watch

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

`options?`

</td>
<td>

[`WatchOptions`](WatchOptions.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>
