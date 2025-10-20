# ModuleBuilder\<Context, Info, TypesBuilders, TypesResolvers\>

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

`TypesBuilders` _extends_ [`TypesBuildersMap`](../type-aliases/TypesBuildersMap.md)\<`Context`, `Info`\>

</td>
<td>

`Any`

</td>
</tr>
<tr>
<td>

`TypesResolvers` _extends_ [`TypesResolversMap`](../type-aliases/TypesResolversMap.md)\<`Context`, `Info`\>

</td>
<td>

`Any`

</td>
</tr>
</tbody>
</table>

## Constructors

### Constructor

> **new ModuleBuilder**\<`Context`, `Info`, `TypesBuilders`, `TypesResolvers`\>(`name`, `typedef`, `typeBuilders`, `defaultResolvers`, `extensions`, `transformers`, `store`, `middlewares`): `ModuleBuilder`\<`Context`, `Info`, `TypesBuilders`, `TypesResolvers`\>

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

`name`

</td>
<td>

`string`

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
<tr>
<td>

`typeBuilders`

</td>
<td>

`Readonly`\<`TypesBuilders`\>

</td>
</tr>
<tr>
<td>

`defaultResolvers`

</td>
<td>

`Readonly`\<`IResolvers`\>

</td>
</tr>
<tr>
<td>

`extensions`

</td>
<td>

readonly [`Extension`](Extension.md)\<`unknown`\>[]

</td>
</tr>
<tr>
<td>

`transformers`

</td>
<td>

readonly [`SchemaTransformer`](../type-aliases/SchemaTransformer.md)[]

</td>
</tr>
<tr>
<td>

`store`

</td>
<td>

`Map`\<`symbol`, `Readonly`\<`unknown`\>\>

</td>
</tr>
<tr>
<td>

`middlewares`

</td>
<td>

[`Middleware`](../../index/type-aliases/Middleware.md)\<`unknown`, `unknown`, `Context`, `unknown`, `Info`\>[]

</td>
</tr>
</tbody>
</table>

#### Returns

`ModuleBuilder`\<`Context`, `Info`, `TypesBuilders`, `TypesResolvers`\>

## Accessors

### name

#### Get Signature

> **get** **name**(): `string`

##### Returns

`string`

## Methods

### edit()

> **edit**(): `object`

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

`addMiddleware()`

</td>
<td>

(`middleware`) => \{ readonly addMiddleware: (middleware: Middleware\<unknown, unknown, Context, unknown, Info\>) =\> ...; readonly addTransformer: (transformer: SchemaTransformer \| SchemaTransformer\[\]) =\> ...; readonly useStore: \<T\>(key: symbol) =\> \{ ...; \}; readonly commit: () =\> ModuleBuilder\<...\>; readonly commitToMethods: () =\> Modu...

</td>
</tr>
<tr>
<td>

`addTransformer()`

</td>
<td>

(`transformer`) => \{ readonly addMiddleware: (middleware: Middleware\<unknown, unknown, Context, unknown, Info\>) =\> ...; readonly addTransformer: (transformer: SchemaTransformer \| SchemaTransformer\[\]) =\> ...; readonly useStore: \<T\>(key: symbol) =\> \{ ...; \}; readonly commit: () =\> ModuleBuilder\<...\>; readonly commitToMethods: () =\> Modu...

</td>
</tr>
<tr>
<td>

`commit()`

</td>
<td>

() => `ModuleBuilder`\<`Context`, `Info`, `TypesBuilders`, `TypesResolvers`\>

</td>
</tr>
<tr>
<td>

`commitToMethods()`

</td>
<td>

() => [`ModuleMethods`](../type-aliases/ModuleMethods.md)\<`Context`, `Info`, `TypesBuilders`, `TypesResolvers`\>

</td>
</tr>
<tr>
<td>

`useStore()`

</td>
<td>

\<`T`\>(`key`) => `object`

</td>
</tr>
</tbody>
</table>

---

### toMethods()

> **toMethods**(): [`ModuleMethods`](../type-aliases/ModuleMethods.md)\<`Context`, `Info`, `TypesBuilders`, `TypesResolvers`\>

#### Returns

[`ModuleMethods`](../type-aliases/ModuleMethods.md)\<`Context`, `Info`, `TypesBuilders`, `TypesResolvers`\>
