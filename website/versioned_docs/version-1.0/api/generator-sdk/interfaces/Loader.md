# Loader\<TOptions\>

Interface for custom schema loaders.

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

`TOptions`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

## Methods

### load()

> **load**(`pointer`, `options?`): `Promise`\<`null` \| `any`[]\>

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

`pointer`

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

`TOptions`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`null` \| `any`[]\>

---

### loadSync()?

> `optional` **loadSync**(`pointer`, `options?`): `null` \| `any`[]

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

`pointer`

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

`TOptions`

</td>
</tr>
</tbody>
</table>

#### Returns

`null` \| `any`[]
