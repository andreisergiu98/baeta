# FieldCompiler\<Result, Source, Context, Args, Info\>

## Type Parameters

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

`Source`

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
<tr>
<td>

`Info`

</td>
</tr>
</tbody>
</table>

## Constructors

### Constructor

> **new FieldCompiler**\<`Result`, `Source`, `Context`, `Args`, `Info`\>(`options`): `FieldCompiler`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

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

[`FieldCompilerOptions`](../interfaces/FieldCompilerOptions.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`FieldCompiler`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

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

<a id="kind"></a> `kind`

</td>
<td>

`readonly`

</td>
<td>

`"Field"`

</td>
<td>

`'Field'`

</td>
</tr>
</tbody>
</table>

## Accessors

### field

#### Get Signature

> **get** **field**(): `string`

##### Returns

`string`

***

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

[`Middleware`](../../index/type-aliases/Middleware.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

***

### addTopLevelMiddleware()

> **addTopLevelMiddleware**(`middleware`): `void`

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

***

### build()

> **build**(`typeMiddlewares`): `object`

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

[`Middleware`](../../index/type-aliases/Middleware.md)\<`unknown`, `Source`, `Context`, `unknown`, `Info`\>[]

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
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`requiredPluginIds`

</td>
<td>

`ReadonlySet`\<[`PluginId`](../type-aliases/PluginId.md)\>

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`resolver`

</td>
<td>

`GraphQLFieldResolver`\<`Source`, `Context`, `Args`, `Result` \| `PromiseLike`\<`Result`\>\>

</td>
<td>

`resolverAdapter`

</td>
</tr>
</tbody>
</table>

***

### useMetadata()

> **useMetadata**\<`T`\>(`key`): `object`

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
