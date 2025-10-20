# FieldCompiler\<Result, Source, Context, Args, Info\>

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

`Result`

</td>
<td>

`Any`

</td>
</tr>
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

`Args`

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
</tbody>
</table>

## Constructors

### Constructor

> **new FieldCompiler**\<`Result`, `Source`, `Context`, `Args`, `Info`\>(`type`, `field`, `store`, `middlewares`, `resolver`): `FieldCompiler`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

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

[`Middleware`](../../index/type-aliases/Middleware.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>[]

</td>
</tr>
<tr>
<td>

`resolver`

</td>
<td>

[`Resolver`](../../index/type-aliases/Resolver.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`FieldCompiler`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

## Accessors

### field

#### Get Signature

> **get** **field**(): `string`

##### Returns

`string`

---

### type

#### Get Signature

> **get** **type**(): `string`

##### Returns

`string`

## Methods

### addInitialMiddleware()

> **addInitialMiddleware**(`middleware`): `void`

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

[`Middleware`](../../index/type-aliases/Middleware.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

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

[`Middleware`](../../index/type-aliases/Middleware.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### build()

> **build**(`typeMiddlewares`): `GraphQLFieldResolver`\<`Source`, `Context`, `Args`, `Result`\>

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

`typeMiddlewares`

</td>
<td>

[`Middleware`](../../index/type-aliases/Middleware.md)\<`any`, `any`, `any`, `any`, `any`\>[]

</td>
</tr>
</tbody>
</table>

#### Returns

`GraphQLFieldResolver`\<`Source`, `Context`, `Args`, `Result`\>

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
