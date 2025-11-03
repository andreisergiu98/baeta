# BaetaCache

## Implements

- `DurableObject`

## Constructors

### Constructor

> **new BaetaCache**(`state`, `env`): `BaetaCache`

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

`state`

</td>
<td>

`DurableObjectState`

</td>
</tr>
<tr>
<td>

`env`

</td>
<td>

\{[`key`: `string`]: `never`; \}

</td>
</tr>
</tbody>
</table>

#### Returns

`BaetaCache`

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

<a id="env"></a> `env`

</td>
<td>

`public`

</td>
<td>

`object`

</td>
</tr>
<tr>
<td>

<a id="state"></a> `state`

</td>
<td>

`public`

</td>
<td>

`DurableObjectState`

</td>
</tr>
</tbody>
</table>

## Methods

### alarm()

> **alarm**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

`DurableObject.alarm`

---

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

### fetch()

> **fetch**(`request`): `Promise`\<`Response`\>

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

`request`

</td>
<td>

`Request`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`Response`\>

#### Implementation of

`DurableObject.fetch`

---

### flush()

> **flush**(): `Promise`\<`null`\>

#### Returns

`Promise`\<`null`\>

---

### get()

> **get**(`keys`): `Promise`\<`string`\>

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

`Promise`\<`string`\>

---

### handleEviction()

> **handleEviction**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

---

### list()

> **list**(`prefix`, `startAfter?`, `limit?`): `Promise`\<`string`\>

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

`Promise`\<`string`\>

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

### scheduledEviction()

> **scheduledEviction**(`at`): `Promise`\<`void`\>

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

`at`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>
