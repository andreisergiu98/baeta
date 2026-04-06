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

&hyphen;

</td>
</tr>
<tr>
<td>

`Context`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`Info`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`FieldsResolvers` _extends_ [`FieldsResolversMap`](../type-aliases/FieldsResolversMap.md)\<`Source`, `Context`, `Info`\>

</td>
<td>

[`FieldsResolversMap`](../type-aliases/FieldsResolversMap.md)\<`Source`, `Context`, `Info`\>

</td>
</tr>
</tbody>
</table>

## Constructors

### Constructor

> **new TypeCompiler**\<`Source`, `Context`, `Info`, `FieldsResolvers`\>(`options`): `TypeCompiler`\<`Source`, `Context`, `Info`, `FieldsResolvers`\>

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

`options`

</td>
<td>

[`TypeCompilerOptions`](../interfaces/TypeCompilerOptions.md)\<`Source`, `Context`, `Info`, `FieldsResolvers`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`TypeCompiler`\<`Source`, `Context`, `Info`, `FieldsResolvers`\>

## Accessors

### fields

#### Get Signature

> **get** **fields**(): readonly ([`FieldCompiler`](FieldCompiler.md)\<`unknown`, `Source`, `Context`, `unknown`, `Info`\> \| `SubscriptionCompiler`\<`unknown`, `unknown`, `Context`, `unknown`, `Info`, `Source`\>)[]

##### Returns

readonly ([`FieldCompiler`](FieldCompiler.md)\<`unknown`, `Source`, `Context`, `unknown`, `Info`\> \| `SubscriptionCompiler`\<`unknown`, `unknown`, `Context`, `unknown`, `Info`, `Source`\>)[]

---

### type

#### Get Signature

> **get** **type**(): `string`

##### Returns

`string`

## Methods

### addMiddleware()

> **addMiddleware**(`middleware`): `void`

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

`middleware`

</td>
<td>

[`Middleware`](../../index/type-aliases/Middleware.md)\<`unknown`, `Source`, `Context`, `unknown`, `Info`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

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

[`Middleware`](../../index/type-aliases/Middleware.md)\<`unknown`, `unknown`, `Context`, `unknown`, `Info`\>[]

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
