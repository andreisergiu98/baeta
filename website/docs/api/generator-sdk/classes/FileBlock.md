# FileBlock

## Extends

- [`File`](File.md)

## Constructors

### Constructor

> **new FileBlock**(`filename`, `content`, `start`, `end`, `tag`, `options?`): `FileBlock`

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

`start`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`end`

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

`FileBlock`

#### Overrides

[`File`](File.md).[`constructor`](File.md#constructor)

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
<th>Overrides</th>
<th>Inherited from</th>
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
<td>

[`File`](File.md).[`content`](File.md#content)

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="end"></a> `end`

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
<td>

&hyphen;

</td>
<td>

&hyphen;

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
<td>

[`File`](File.md).[`filename`](File.md#filename)

</td>
<td>

&hyphen;

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
<td>

&hyphen;

</td>
<td>

[`File`](File.md).[`persisted`](File.md#persisted)

</td>
</tr>
<tr>
<td>

<a id="start"></a> `start`

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
<td>

&hyphen;

</td>
<td>

&hyphen;

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
<td>

[`File`](File.md).[`tag`](File.md#tag)

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

## Methods

### addBlockToContent()

> `protected` **addBlockToContent**(`existingContent`): `string`

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

`existingContent`

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

### buildContent()

> `protected` **buildContent**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

#### Inherited from

[`File`](File.md).[`buildContent`](File.md#buildcontent)

---

### buildHeader()

> `protected` **buildHeader**(): `string`

#### Returns

`string`

#### Inherited from

[`File`](File.md).[`buildHeader`](File.md#buildheader)

---

### buildPadding()

> `protected` **buildPadding**(`existingContent`): `""` \| "\n" \| "\n\n"

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

`existingContent`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`""` \| "\n" \| "\n\n"

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

#### Inherited from

[`File`](File.md).[`createComment`](File.md#createcomment)

---

### getExistingContent()

> `protected` **getExistingContent**(): `Promise`\<readonly \[`string`, `FileHandle`\] \| readonly \[`""`, `null`\]\>

#### Returns

`Promise`\<readonly \[`string`, `FileHandle`\] \| readonly \[`""`, `null`\]\>

---

### getSlices()

> `protected` **getSlices**(`existingContent`): readonly \[`string`, `""`, `false`\] \| readonly \[`string`, `string`, `true`\]

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

`existingContent`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

readonly \[`string`, `""`, `false`\] \| readonly \[`string`, `string`, `true`\]

---

### unlink()

> **unlink**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

[`File`](File.md).[`unlink`](File.md#unlink)

---

### write()

> **write**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

[`File`](File.md).[`write`](File.md#write)
