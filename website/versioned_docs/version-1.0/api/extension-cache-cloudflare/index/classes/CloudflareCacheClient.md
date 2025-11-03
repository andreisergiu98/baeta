# CloudflareCacheClient

## Constructors

### Constructor

> **new CloudflareCacheClient**(`durableObject`): `CloudflareCacheClient`

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

`durableObject`

</td>
<td>

`DurableObjectNamespace`

</td>
</tr>
</tbody>
</table>

#### Returns

`CloudflareCacheClient`

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="durableobject"></a> `durableObject`

</td>
<td>

`public`

</td>
<td>

`DurableObjectNamespace`

</td>
</tr>
</tbody>
</table>

## Methods

### delete()

> **delete**(`keys`): `Promise`\<`null`\>

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

`keys`

</td>
<td>

`string`[]

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`null`\>

---

### deleteOne()

> **deleteOne**(`key`): `Promise`\<`null`\>

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

`key`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`null`\>

---

### flush()

> **flush**(): `Promise`\<`null`\>

#### Returns

`Promise`\<`null`\>

---

### get()

> **get**(`keys`): `Promise`\<(`null` \| `string`)[]\>

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

`keys`

</td>
<td>

`string`[]

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<(`null` \| `string`)[]\>

---

### getOne()

> **getOne**(`key`): `Promise`\<`null` \| `string`\>

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

`key`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`null` \| `string`\>

---

### list()

> **list**(`prefix`, `startAfter?`, `limit?`): `Promise`\<`string`[]\>

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

`prefix`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`startAfter?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`limit?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`string`[]\>

---

### put()

> **put**(`values`, `ttl?`): `Promise`\<`null`\>

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

`values`

</td>
<td>

\[`string`, `string`\][]

</td>
</tr>
<tr>
<td>

`ttl?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`null`\>

---

### putOne()

> **putOne**(`key`, `value`, `ttl?`): `Promise`\<`null`\>

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

`key`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`ttl?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`null`\>
