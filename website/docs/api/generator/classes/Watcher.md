# Watcher

## Constructors

### Constructor

> **new Watcher**(`cwd`, `options?`): `Watcher`

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
<tr>
<td>

`options?`

</td>
<td>

`Options`

</td>
</tr>
</tbody>
</table>

#### Returns

`Watcher`

## Methods

### close()

> **close**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

---

### createSubscription()

> **createSubscription**(): `object`

#### Returns

`object`

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`unsubscribe()`

</td>
<td>

() => `Promise`\<`void`\>

</td>
</tr>
</tbody>
</table>

---

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

[`MatchPattern`](../../generator-sdk/type-aliases/MatchPattern.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### off()

> **off**(`event`, `listener`): `void`

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

`event`

</td>
<td>

`EventType`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

[`WatcherListener`](../type-aliases/WatcherListener.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### on()

> **on**(`event`, `listener`): `void`

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

`event`

</td>
<td>

`EventType`

</td>
</tr>
<tr>
<td>

`listener`

</td>
<td>

[`WatcherListener`](../type-aliases/WatcherListener.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### onEvents()

> **onEvents**(`err`, `events`): `void`

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

`err`

</td>
<td>

`Error` \| `null`

</td>
</tr>
<tr>
<td>

`events`

</td>
<td>

`Event`[]

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

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

[`MatchPattern`](../../generator-sdk/type-aliases/MatchPattern.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`
