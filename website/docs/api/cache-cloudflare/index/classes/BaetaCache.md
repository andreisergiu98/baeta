# BaetaCache

## Extends

- `DurableObject`

## Constructors

### Constructor

> **new BaetaCache**(`ctx`, `env`): `BaetaCache`

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

`ctx`

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

\{\[`key`: `string`\]: `unknown`; \}

</td>
</tr>
</tbody>
</table>

#### Returns

`BaetaCache`

#### Overrides

`DurableObject.constructor`

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="__durable_object_brand"></a> `__DURABLE_OBJECT_BRAND`

</td>
<td>

`public`

</td>
<td>

`never`

</td>
<td>

`DurableObject.__DURABLE_OBJECT_BRAND`

</td>
</tr>
<tr>
<td>

<a id="ctx"></a> `ctx`

</td>
<td>

`protected`

</td>
<td>

`DurableObjectState`\<\{ \}\>

</td>
<td>

`DurableObject.ctx`

</td>
</tr>
<tr>
<td>

<a id="env"></a> `env`

</td>
<td>

`protected`

</td>
<td>

`Env`

</td>
<td>

`DurableObject.env`

</td>
</tr>
<tr>
<td>

<a id="handler"></a> `handler`

</td>
<td>

`public`

</td>
<td>

(`request`) => `Promise`\<`Response`\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="sql"></a> `sql`

</td>
<td>

`public`

</td>
<td>

`SqlStorage`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

## Methods

### alarm()

> **alarm**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

`DurableObject.alarm`

***

### deleteItems()

> **deleteItems**(`keys`): `void`

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

`void`

***

### deleteItemsWithDiff()

> **deleteItemsWithDiff**(`keys`): (`string` \| `null`)[]

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

(`string` \| `null`)[]

***

### deleteQueries()

> **deleteQueries**(`indexKeys`): `void`

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

`indexKeys`

</td>
<td>

`string`[]

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

***

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

#### Overrides

`DurableObject.fetch`

***

### getPartialItems()

> **getPartialItems**(`keys`): (`string` \| `null`)[]

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

(`string` \| `null`)[]

***

### getQuery()

> **getQuery**(`key`): `string` \| `null`

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

`string` \| `null`

***

### saveItems()

> **saveItems**(`items`, `expiresAt`, `disableOverwrite`): `Promise`\<`void`\>

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

`items`

</td>
<td>

\[`string`, `string`\][]

</td>
</tr>
<tr>
<td>

`expiresAt`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`disableOverwrite`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

***

### saveItemsWithDiff()

> **saveItemsWithDiff**(`items`, `expiresAt`): `Promise`\<(`string` \| `null`)[]\>

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

`items`

</td>
<td>

\[`string`, `string`\][]

</td>
</tr>
<tr>
<td>

`expiresAt`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<(`string` \| `null`)[]\>

***

### saveQuery()

> **saveQuery**(`queryKey`, `indexKeys`, `metadata`, `expiresAt`): `Promise`\<`void`\>

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

`queryKey`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`indexKeys`

</td>
<td>

`string`[]

</td>
</tr>
<tr>
<td>

`metadata`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`expiresAt`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

***

### connect()?

> `optional` **connect**(`socket`): `void` \| `Promise`\<`void`\>

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

`socket`

</td>
<td>

`Socket`

</td>
</tr>
</tbody>
</table>

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

`DurableObject.connect`

***

### webSocketClose()?

> `optional` **webSocketClose**(`ws`, `code`, `reason`, `wasClean`): `void` \| `Promise`\<`void`\>

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

`ws`

</td>
<td>

`WebSocket`

</td>
</tr>
<tr>
<td>

`code`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`reason`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`wasClean`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

`DurableObject.webSocketClose`

***

### webSocketError()?

> `optional` **webSocketError**(`ws`, `error`): `void` \| `Promise`\<`void`\>

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

`ws`

</td>
<td>

`WebSocket`

</td>
</tr>
<tr>
<td>

`error`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

`DurableObject.webSocketError`

***

### webSocketMessage()?

> `optional` **webSocketMessage**(`ws`, `message`): `void` \| `Promise`\<`void`\>

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

`ws`

</td>
<td>

`WebSocket`

</td>
</tr>
<tr>
<td>

`message`

</td>
<td>

`string` \| `ArrayBuffer`

</td>
</tr>
</tbody>
</table>

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

`DurableObject.webSocketMessage`
