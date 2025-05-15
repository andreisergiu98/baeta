# ResolverMapper

## Constructors

### Constructor

> **new ResolverMapper**(): `ResolverMapper`

#### Returns

`ResolverMapper`

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

<a id="middlewares"></a> `middlewares`

</td>
<td>

`readonly`

</td>
<td>

[`MiddlewareMap`](../type-aliases/MiddlewareMap.md)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

<a id="prependedmiddlewares"></a> `prependedMiddlewares`

</td>
<td>

`readonly`

</td>
<td>

[`MiddlewareMap`](../type-aliases/MiddlewareMap.md)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

<a id="resolvers"></a> `resolvers`

</td>
<td>

`readonly`

</td>
<td>

[`ResolversMap`](../type-aliases/ResolversMap.md)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

<a id="scalars"></a> `scalars`

</td>
<td>

`readonly`

</td>
<td>

[`ScalarsMap`](../type-aliases/ScalarsMap.md)

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

<a id="typefields"></a> `typeFields`

</td>
<td>

`readonly`

</td>
<td>

`Record`\<`string`, `undefined` \| `string`[]\>

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

<a id="types"></a> `types`

</td>
<td>

`readonly`

</td>
<td>

`string`[]

</td>
<td>

`[]`

</td>
</tr>
</tbody>
</table>

## Methods

### addMiddleware()

> **addMiddleware**\<`Result`, `Root`, `Context`, `Args`\>(`type`, `field`, `middleware`): `void`

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Result`

</td>
</tr>
<tr>
<td>

`Root`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Args`

</td>
</tr>
</tbody>
</table>

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

`type`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`field`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`middleware`

</td>
<td>

[`NativeMiddleware`](../type-aliases/NativeMiddleware.md)\<`Result`, `Root`, `Context`, `Args`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### addMiddlewareToMap()

> `protected` **addMiddlewareToMap**\<`Result`, `Root`, `Context`, `Args`\>(`map`, `type`, `field`, `middleware`): `void`

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Result`

</td>
</tr>
<tr>
<td>

`Root`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Args`

</td>
</tr>
</tbody>
</table>

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

`map`

</td>
<td>

[`MiddlewareMap`](../type-aliases/MiddlewareMap.md)

</td>
</tr>
<tr>
<td>

`type`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`field`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`middleware`

</td>
<td>

[`NativeMiddleware`](../type-aliases/NativeMiddleware.md)\<`Result`, `Root`, `Context`, `Args`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### compose()

> **compose**(): `IResolvers`

#### Returns

`IResolvers`

---

### getTypeFields()

> **getTypeFields**(`type`): `string`[]

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

`type`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`[]

---

### getTypes()

> **getTypes**(): `string`[]

#### Returns

`string`[]

---

### prependMiddleware()

> **prependMiddleware**\<`Result`, `Root`, `Context`, `Args`\>(`type`, `field`, `middleware`): `void`

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Result`

</td>
</tr>
<tr>
<td>

`Root`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Args`

</td>
</tr>
</tbody>
</table>

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

`type`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`field`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`middleware`

</td>
<td>

[`NativeMiddleware`](../type-aliases/NativeMiddleware.md)\<`Result`, `Root`, `Context`, `Args`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### registerTypeField()

> **registerTypeField**(`type`, `field`): `void`

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

`type`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`field`

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

### setDefaultFieldResolver()

> **setDefaultFieldResolver**(`type`, `field`): `void`

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

`type`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`field`

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

### setResolver()

> **setResolver**\<`Result`, `Root`, `Context`, `Args`\>(`type`, `field`, `resolver`): `void`

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Result`

</td>
</tr>
<tr>
<td>

`Root`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Args`

</td>
</tr>
</tbody>
</table>

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

`type`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`field`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`resolver`

</td>
<td>

[`NativeResolver`](../type-aliases/NativeResolver.md)\<`Result`, `Root`, `Context`, `Args`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### setScalar()

> **setScalar**(`scalar`, `resolver`): `void`

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

`scalar`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`resolver`

</td>
<td>

[`ScalarResolver`](../../index/type-aliases/ScalarResolver.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### setSubscription()

> **setSubscription**\<`Payload`, `Result`, `Root`, `Context`, `Args`\>(`field`, `resolver`): `void`

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Payload`

</td>
</tr>
<tr>
<td>

`Result`

</td>
</tr>
<tr>
<td>

`Root`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Args`

</td>
</tr>
</tbody>
</table>

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

`field`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`resolver`

</td>
<td>

[`NativeSubscription`](../type-aliases/NativeSubscription.md)\<`Payload`, `Result`, `Root`, `Context`, `Args`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### setTypenameResolver()

> **setTypenameResolver**\<`Result`, `Value`, `Context`\>(`type`, `resolver`): `void`

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Result`

</td>
</tr>
<tr>
<td>

`Value`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
</tbody>
</table>

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

`type`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`resolver`

</td>
<td>

[`NativeTypeResolver`](../type-aliases/NativeTypeResolver.md)\<`Result`, `Value`, `Context`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`void`
