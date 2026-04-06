# Cache\<Item\>

> **Cache**\<`Item`\> = `object`

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
</tbody>
</table>

## Methods

### delete()

> **delete**(`ref`): `Promise`\<`void`\>

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
</tbody>
</table>

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

> **insert**(`item`): `Promise`\<`void`\>

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
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

---

### update()

> **update**(`item`): `Promise`\<`void`\>

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
</tbody>
</table>

#### Returns

`Promise`\<`void`\>
