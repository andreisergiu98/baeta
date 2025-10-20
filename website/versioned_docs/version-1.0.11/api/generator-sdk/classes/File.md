# File

## Extended by

- [`FileBlock`](FileBlock.md)

## Constructors

### Constructor

> **new File**(`filename`, `content`, `tag`, `options?`): `File`

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

`File`

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="content"></a> `content`

</td>
<td>

`public`

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

<a id="filename"></a> `filename`

</td>
<td>

`public`

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

<a id="persisted"></a> `persisted`

</td>
<td>

`public`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
</tr>
<tr>
<td>

<a id="tag"></a> `tag`

</td>
<td>

`public`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
</tr>
</tbody>
</table>

## Methods

### buildContent()

> `protected` **buildContent**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

---

### buildHeader()

> `protected` **buildHeader**(): `string`

#### Returns

`string`

---

### createComment()

> `protected` **createComment**(`comment`): `string`

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

`comment`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### unlink()

> **unlink**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

---

### write()

> **write**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>
