# WatcherIgnore

## Constructors

### Constructor

> **new WatcherIgnore**(`cwd`): `WatcherIgnore`

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

`cwd`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`WatcherIgnore`

## Methods

### ignore()

> **ignore**(`pattern`): `void`

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

`pattern`

</td>
<td>

[`MatchPattern`](../type-aliases/MatchPattern.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### isIgnored()

> **isIgnored**(`path`): `boolean`

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

`path`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

---

### isMicromatch()

> **isMicromatch**(`pattern`): `boolean`

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

`pattern`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

---

### resolveFile()

> **resolveFile**(`file`): `string`

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

`file`

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

### unignore()

> **unignore**(`pattern`): `void`

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

`pattern`

</td>
<td>

[`MatchPattern`](../type-aliases/MatchPattern.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`
