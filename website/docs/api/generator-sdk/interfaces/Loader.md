# Loader\<TOptions\>

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

`GraphQlLoaderAny`

</td>
</tr>
</tbody>
</table>

## Methods

### load()

> **load**(`pointer`, `options?`): `Promise`\<`any`[] \| `null`\>

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

`Promise`\<`any`[] \| `null`\>

---

### loadSync()?

> `optional` **loadSync**(`pointer`, `options?`): `any`[] \| `null`

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

`any`[] \| `null`
