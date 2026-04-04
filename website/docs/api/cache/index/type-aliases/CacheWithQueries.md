# CacheWithQueries\<Item, QueryDefinitions\>

> **CacheWithQueries**\<`Item`, `QueryDefinitions`\> = `object`

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Item`

</td>
</tr>
<tr>
<td>

`QueryDefinitions` _extends_ `QueryDefinitionMap`\<`Item`\>

</td>
</tr>
</tbody>
</table>

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="queries"></a> `queries`

</td>
<td>

`QueryMethodMap`\<`QueryDefinitions`\>

</td>
</tr>
</tbody>
</table>

## Methods

### delete()

> **delete**(`ref`, `options?`): `Promise`\<`void`\>

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

`ref`

</td>
<td>

[`ItemRef`](ItemRef.md) \| [`ItemRef`](ItemRef.md)[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`CacheHooksOptions`](CacheHooksOptions.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

---

### deleteQueries()

> **deleteQueries**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

---

### get()

> **get**(`ref`): `Promise`\<`Item` \| `null`\>

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

`ref`

</td>
<td>

[`ItemRef`](ItemRef.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`Item` \| `null`\>

---

### getMany()

> **getMany**(`refs`): `Promise`\<`Item`[] \| `null`\>

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

`refs`

</td>
<td>

[`ItemRef`](ItemRef.md)[]

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`Item`[] \| `null`\>

---

### getPartial()

> **getPartial**(`refs`): `Promise`\<(`Item` \| `null`)[]\>

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

`refs`

</td>
<td>

[`ItemRef`](ItemRef.md)[]

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<(`Item` \| `null`)[]\>

---

### insert()

> **insert**(`item`, `options?`): `Promise`\<`void`\>

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

`item`

</td>
<td>

`Item` \| `Item`[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`CacheHooksOptions`](CacheHooksOptions.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

---

### update()

> **update**(`item`, `options?`): `Promise`\<`void`\>

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

`item`

</td>
<td>

`Item` \| `Item`[]

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`CacheHooksOptions`](CacheHooksOptions.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>
