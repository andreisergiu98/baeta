# CacheRef\<\_Result, \_Root, \_Args\>

Cache reference for a type field or query

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

`_Result`

</td>
</tr>
<tr>
<td>

`_Root`

</td>
</tr>
<tr>
<td>

`_Args`

</td>
</tr>
</tbody>
</table>

## Constructors

### Constructor

> **new CacheRef**\<`_Result`, `_Root`, `_Args`\>(`type`, `field`, `hash`, `revision`): `CacheRef`\<`_Result`, `_Root`, `_Args`\>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`type`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`field`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`hash`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`revision`

</td>
<td>

`number`

</td>
<td>

`1`

</td>
</tr>
</tbody>
</table>

#### Returns

`CacheRef`\<`_Result`, `_Root`, `_Args`\>

## Methods

### getHash()

> **getHash**(): `string`

#### Returns

`string`

---

### getRevision()

> **getRevision**(): `number`

#### Returns

`number`

---

### setRevision()

> **setRevision**(`revision`): `void`

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

`revision`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### toString()

> **toString**(): `string`

#### Returns

`string`
