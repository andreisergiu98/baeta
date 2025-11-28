# FileManager

## Constructors

### Constructor

> **new FileManager**(`fileOptions?`): `FileManager`

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

`fileOptions?`

</td>
<td>

[`FileOptions`](../interfaces/FileOptions.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`FileManager`

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="files"></a> `files`

</td>
<td>

[`File`](File.md)[]

</td>
<td>

`[]`

</td>
</tr>
<tr>
<td>

<a id="fileoptions"></a> `fileOptions?`

</td>
<td>

[`FileOptions`](../interfaces/FileOptions.md)

</td>
<td>

`undefined`

</td>
</tr>
</tbody>
</table>

## Methods

### add()

> **add**(...`file`): `void`

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

...`file`

</td>
<td>

[`File`](File.md)[]

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### createAndAdd()

> **createAndAdd**(`filename`, `content`, `tag`, `options?`): [`File`](File.md)

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

`filename`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`content`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`tag`

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

[`FileOptions`](../interfaces/FileOptions.md)

</td>
</tr>
</tbody>
</table>

#### Returns

[`File`](File.md)

---

### get()

> **get**(`filename`): [`File`](File.md) \| `undefined`

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

`filename`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

[`File`](File.md) \| `undefined`

---

### getAll()

> **getAll**(): [`File`](File.md)[]

#### Returns

[`File`](File.md)[]

---

### getByTag()

> **getByTag**(`tag`): [`File`](File.md)[]

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

`tag`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

[`File`](File.md)[]

---

### getPersistedFiles()

> **getPersistedFiles**(): [`File`](File.md)[]

#### Returns

[`File`](File.md)[]

---

### remove()

> **remove**(`filename`): `void`

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

`filename`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### removeAll()

> **removeAll**(): `void`

#### Returns

`void`

---

### removeByTag()

> **removeByTag**(`tag`): `void`

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

`tag`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### unlinkAll()

> **unlinkAll**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

---

### writeAll()

> **writeAll**(): `Promise`\<`void`[]\>

#### Returns

`Promise`\<`void`[]\>

---

### writeByTag()

> **writeByTag**(`tag`): `Promise`\<`void`[]\>

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

`tag`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`[]\>
