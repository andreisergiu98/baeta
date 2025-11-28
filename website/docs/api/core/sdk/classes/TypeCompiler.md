# TypeCompiler\<Source, Context, Info, FieldsResolvers\>

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Source`

</td>
<td>

`Any`

</td>
</tr>
<tr>
<td>

`Context`

</td>
<td>

`Any`

</td>
</tr>
<tr>
<td>

`Info`

</td>
<td>

`Any`

</td>
</tr>
<tr>
<td>

`FieldsResolvers` _extends_ [`FieldsResolversMap`](../type-aliases/FieldsResolversMap.md)\<`Source`, `Context`, `Info`\>

</td>
<td>

`Any`

</td>
</tr>
</tbody>
</table>

## Constructors

### Constructor

> **new TypeCompiler**\<`Source`, `Context`, `Info`, `FieldsResolvers`\>(`type`, `store`, `middlewares`, `fieldsMap`): `TypeCompiler`\<`Source`, `Context`, `Info`, `FieldsResolvers`\>

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

`store`

</td>
<td>

`Map`\<`symbol`, `unknown`\>

</td>
</tr>
<tr>
<td>

`middlewares`

</td>
<td>

[`Middleware`](../../index/type-aliases/Middleware.md)\<`any`, `any`, `any`, `any`, `any`\>[]

</td>
</tr>
<tr>
<td>

`fieldsMap`

</td>
<td>

`FieldsResolvers`

</td>
</tr>
</tbody>
</table>

#### Returns

`TypeCompiler`\<`Source`, `Context`, `Info`, `FieldsResolvers`\>

## Accessors

### fields

#### Get Signature

> **get** **fields**(): readonly ([`FieldCompiler`](FieldCompiler.md)\<`any`, `any`, `any`, `any`, `any`\> \| `SubscriptionCompiler`\<`any`, `any`, `any`, `any`, `any`, `any`, `any`\>)[]

##### Returns

readonly ([`FieldCompiler`](FieldCompiler.md)\<`any`, `any`, `any`, `any`, `any`\> \| `SubscriptionCompiler`\<`any`, `any`, `any`, `any`, `any`, `any`, `any`\>)[]

---

### type

#### Get Signature

> **get** **type**(): `string`

##### Returns

`string`

## Methods

### build()

> **build**(`moduleMiddlewares`): `IResolvers`

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

`moduleMiddlewares`

</td>
<td>

[`Middleware`](../../index/type-aliases/Middleware.md)\<`any`, `any`, `any`, `any`, `any`\>[]

</td>
</tr>
</tbody>
</table>

#### Returns

`IResolvers`

---

### useStore()

> **useStore**\<`T`\>(`key`): `object`

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

`T`

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

`key`

</td>
<td>

`symbol`

</td>
</tr>
</tbody>
</table>

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

`get()`

</td>
<td>

() => `T` \| `undefined`

</td>
</tr>
<tr>
<td>

`set()`

</td>
<td>

(`value`) => `Map`\<`symbol`, `unknown`\>

</td>
</tr>
</tbody>
</table>
