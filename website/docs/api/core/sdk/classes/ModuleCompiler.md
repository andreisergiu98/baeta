# ModuleCompiler\<Context, Info, TypesResolvers\>

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

`Context`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`Info`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`TypesResolvers` _extends_ [`TypesResolversMap`](../type-aliases/TypesResolversMap.md)\<`Context`, `Info`\>

</td>
<td>

[`TypesResolversMap`](../type-aliases/TypesResolversMap.md)\<`Context`, `Info`\>

</td>
</tr>
</tbody>
</table>

## Constructors

### Constructor

> **new ModuleCompiler**\<`Context`, `Info`, `TypesResolvers`\>(`options`): `ModuleCompiler`\<`Context`, `Info`, `TypesResolvers`\>

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

[`ModuleCompilerOptions`](../interfaces/ModuleCompilerOptions.md)\<`Context`, `Info`, `TypesResolvers`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`ModuleCompiler`\<`Context`, `Info`, `TypesResolvers`\>

## Accessors

### extensions

#### Get Signature

> **get** **extensions**(): readonly [`Extension`](Extension.md)\<`unknown`\>[]

##### Returns

readonly [`Extension`](Extension.md)\<`unknown`\>[]

---

### name

#### Get Signature

> **get** **name**(): `string`

##### Returns

`string`

---

### types

#### Get Signature

> **get** **types**(): readonly [`TypeCompiler`](TypeCompiler.md)\<`unknown`, `Context`, `Info`, [`FieldsResolversMap`](../type-aliases/FieldsResolversMap.md)\<`unknown`, `Context`, `Info`\>\>[]

##### Returns

readonly [`TypeCompiler`](TypeCompiler.md)\<`unknown`, `Context`, `Info`, [`FieldsResolversMap`](../type-aliases/FieldsResolversMap.md)\<`unknown`, `Context`, `Info`\>\>[]

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

[`Middleware`](../../index/type-aliases/Middleware.md)\<`unknown`, `unknown`, `Context`, `unknown`, `Info`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### build()

> **build**(): `object`

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

`resolvers`

</td>
<td>

`IResolvers`

</td>
</tr>
<tr>
<td>

`transformers`

</td>
<td>

[`SchemaTransformer`](../type-aliases/SchemaTransformer.md)[]

</td>
</tr>
<tr>
<td>

`typedef`

</td>
<td>

`Readonly`\<`DocumentNode`\>

</td>
</tr>
</tbody>
</table>

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
