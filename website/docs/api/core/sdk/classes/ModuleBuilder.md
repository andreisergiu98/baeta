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

`TypesBuilders` *extends* [`TypesBuildersMap`](../type-aliases/TypesBuildersMap.md)\<`Context`, `Info`\>

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`TypesResolvers` *extends* [`TypesResolversMap`](../type-aliases/TypesResolversMap.md)\<`Context`, `Info`\>

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

## Constructors

### Constructor

> **new ModuleBuilder**\<`Context`, `Info`, `TypesBuilders`, `TypesResolvers`\>(`options`): `ModuleBuilder`\<`Context`, `Info`, `TypesBuilders`, `TypesResolvers`\>

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

[`ModuleBuilderOptions`](../interfaces/ModuleBuilderOptions.md)\<`Context`, `Info`, `TypesBuilders`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`ModuleBuilder`\<`Context`, `Info`, `TypesBuilders`, `TypesResolvers`\>

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="requiredpluginids"></a> `requiredPluginIds`

</td>
<td>

`readonly`

</td>
<td>

`ReadonlySet`\<[`PluginId`](../type-aliases/PluginId.md)\>

</td>
</tr>
</tbody>
</table>

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

(`middleware`) => \{ readonly addMiddleware: (middleware: Middleware\<unknown, unknown, Context, unknown, Info\>) =\> any; readonly addTransformer: (transformer: SchemaTransformer \| SchemaTransformer\[\]) =\> any; readonly addRequiredPluginId: (id: PluginId) =\> any; readonly mergeMeta: (meta: Map\<symbol, unknown\>) =\> any; readonly commit: () =\> ModuleBuilder\<Context, Info, TypesBuilders, TypesResolvers\>; readonly commitToMethods: () =\> ModuleMethods\<Context, Info, TypesBuilders, TypesResolvers\>; \}

</td>
</tr>
<tr>
<td>

`addRequiredPluginId()`

</td>
<td>

(`id`) => \{ readonly addMiddleware: (middleware: Middleware\<unknown, unknown, Context, unknown, Info\>) =\> any; readonly addTransformer: (transformer: SchemaTransformer \| SchemaTransformer\[\]) =\> any; readonly addRequiredPluginId: (id: PluginId) =\> any; readonly mergeMeta: (meta: Map\<symbol, unknown\>) =\> any; readonly commit: () =\> ModuleBuilder\<Context, Info, TypesBuilders, TypesResolvers\>; readonly commitToMethods: () =\> ModuleMethods\<Context, Info, TypesBuilders, TypesResolvers\>; \}

</td>
</tr>
<tr>
<td>

`addTransformer()`

</td>
<td>

(`transformer`) => \{ readonly addMiddleware: (middleware: Middleware\<unknown, unknown, Context, unknown, Info\>) =\> any; readonly addTransformer: (transformer: SchemaTransformer \| SchemaTransformer\[\]) =\> any; readonly addRequiredPluginId: (id: PluginId) =\> any; readonly mergeMeta: (meta: Map\<symbol, unknown\>) =\> any; readonly commit: () =\> ModuleBuilder\<Context, Info, TypesBuilders, TypesResolvers\>; readonly commitToMethods: () =\> ModuleMethods\<Context, Info, TypesBuilders, TypesResolvers\>; \}

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

`mergeMeta()`

</td>
<td>

(`meta`) => \{ readonly addMiddleware: (middleware: Middleware\<unknown, unknown, Context, unknown, Info\>) =\> any; readonly addTransformer: (transformer: SchemaTransformer \| SchemaTransformer\[\]) =\> any; readonly addRequiredPluginId: (id: PluginId) =\> any; readonly mergeMeta: (meta: Map\<symbol, unknown\>) =\> any; readonly commit: () =\> ModuleBuilder\<Context, Info, TypesBuilders, TypesResolvers\>; readonly commitToMethods: () =\> ModuleMethods\<Context, Info, TypesBuilders, TypesResolvers\>; \}

</td>
</tr>
</tbody>
</table>

***

### toMethods()

> **toMethods**(): [`ModuleMethods`](../type-aliases/ModuleMethods.md)\<`Context`, `Info`, `TypesBuilders`, `TypesResolvers`\>

#### Returns

[`ModuleMethods`](../type-aliases/ModuleMethods.md)\<`Context`, `Info`, `TypesBuilders`, `TypesResolvers`\>
