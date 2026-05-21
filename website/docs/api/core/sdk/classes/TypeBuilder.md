# TypeBuilder\<Source, Context, Info, FieldsBuilders, FieldsResolvers\>

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

`FieldsBuilders` *extends* [`FieldsBuildersMap`](../type-aliases/FieldsBuildersMap.md)\<`Source`, `Context`, `Info`\>

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`FieldsResolvers` *extends* [`FieldsResolversMap`](../type-aliases/FieldsResolversMap.md)\<`Source`, `Context`, `Info`\>

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

## Constructors

### Constructor

> **new TypeBuilder**\<`Source`, `Context`, `Info`, `FieldsBuilders`, `FieldsResolvers`\>(`options`): `TypeBuilder`\<`Source`, `Context`, `Info`, `FieldsBuilders`, `FieldsResolvers`\>

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

[`TypeBuilderOptions`](../interfaces/TypeBuilderOptions.md)\<`Source`, `Context`, `Info`, `FieldsBuilders`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`TypeBuilder`\<`Source`, `Context`, `Info`, `FieldsBuilders`, `FieldsResolvers`\>

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

### type

#### Get Signature

> **get** **type**(): `string`

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

(`middleware`) => \{ readonly type: string; readonly addMiddleware: (middleware: Middleware\<unknown, Source, Context, unknown, Info\>) =\> any; readonly addRequiredPluginId: (id: PluginId) =\> any; readonly mergeMeta: (meta: Map\<symbol, unknown\>) =\> any; readonly commit: () =\> TypeBuilder\<Source, Context, Info, FieldsBuilders, any\>; readonly commitToMethods: () =\> TypeMethods\<Source, Context, Info, FieldsBuilders, any\>; \}

</td>
</tr>
<tr>
<td>

`addRequiredPluginId()`

</td>
<td>

(`id`) => \{ readonly type: string; readonly addMiddleware: (middleware: Middleware\<unknown, Source, Context, unknown, Info\>) =\> any; readonly addRequiredPluginId: (id: PluginId) =\> any; readonly mergeMeta: (meta: Map\<symbol, unknown\>) =\> any; readonly commit: () =\> TypeBuilder\<Source, Context, Info, FieldsBuilders, any\>; readonly commitToMethods: () =\> TypeMethods\<Source, Context, Info, FieldsBuilders, any\>; \}

</td>
</tr>
<tr>
<td>

`commit()`

</td>
<td>

() => `TypeBuilder`\<`Source`, `Context`, `Info`, `FieldsBuilders`, `any`\>

</td>
</tr>
<tr>
<td>

`commitToMethods()`

</td>
<td>

() => [`TypeMethods`](../type-aliases/TypeMethods.md)\<`Source`, `Context`, `Info`, `FieldsBuilders`, `any`\>

</td>
</tr>
<tr>
<td>

`mergeMeta()`

</td>
<td>

(`meta`) => \{ readonly type: string; readonly addMiddleware: (middleware: Middleware\<unknown, Source, Context, unknown, Info\>) =\> any; readonly addRequiredPluginId: (id: PluginId) =\> any; readonly mergeMeta: (meta: Map\<symbol, unknown\>) =\> any; readonly commit: () =\> TypeBuilder\<Source, Context, Info, FieldsBuilders, any\>; readonly commitToMethods: () =\> TypeMethods\<Source, Context, Info, FieldsBuilders, any\>; \}

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
</tbody>
</table>

***

### toMethods()

> **toMethods**(): [`TypeMethods`](../type-aliases/TypeMethods.md)\<`Source`, `Context`, `Info`, `FieldsBuilders`, `FieldsResolvers`\>

#### Returns

[`TypeMethods`](../type-aliases/TypeMethods.md)\<`Source`, `Context`, `Info`, `FieldsBuilders`, `FieldsResolvers`\>
