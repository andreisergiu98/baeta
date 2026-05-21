# FieldBuilder\<Result, Source, Context, Args, Info\>

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

> **new FieldBuilder**\<`Result`, `Source`, `Context`, `Args`, `Info`\>(`options`): `FieldBuilder`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

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

[`FieldBuilderOptions`](../interfaces/FieldBuilderOptions.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`FieldBuilder`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

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

(`mw`) => \{ readonly type: string; readonly field: string; readonly addMiddleware: (mw: Middleware\<Result, Source, Context, Args, Info\>) =\> any; readonly mergeMeta: (meta: Map\<symbol, unknown\>) =\> any; readonly addRequiredPluginId: (id: PluginId) =\> any; readonly commit: () =\> FieldBuilder\<Result, Source, Context, Args, Info\>; readonly commitToMethods: () =\> FieldMethods\<Result, Source, Context, Args, Info\>; \}

</td>
</tr>
<tr>
<td>

`addRequiredPluginId()`

</td>
<td>

(`id`) => \{ readonly type: string; readonly field: string; readonly addMiddleware: (mw: Middleware\<Result, Source, Context, Args, Info\>) =\> any; readonly mergeMeta: (meta: Map\<symbol, unknown\>) =\> any; readonly addRequiredPluginId: (id: PluginId) =\> any; readonly commit: () =\> FieldBuilder\<Result, Source, Context, Args, Info\>; readonly commitToMethods: () =\> FieldMethods\<Result, Source, Context, Args, Info\>; \}

</td>
</tr>
<tr>
<td>

`commit()`

</td>
<td>

() => `FieldBuilder`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

`commitToMethods()`

</td>
<td>

() => [`FieldMethods`](../type-aliases/FieldMethods.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>

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

`mergeMeta()`

</td>
<td>

(`meta`) => \{ readonly type: string; readonly field: string; readonly addMiddleware: (mw: Middleware\<Result, Source, Context, Args, Info\>) =\> any; readonly mergeMeta: (meta: Map\<symbol, unknown\>) =\> any; readonly addRequiredPluginId: (id: PluginId) =\> any; readonly commit: () =\> FieldBuilder\<Result, Source, Context, Args, Info\>; readonly commitToMethods: () =\> FieldMethods\<Result, Source, Context, Args, Info\>; \}

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

> **toMethods**(): [`FieldMethods`](../type-aliases/FieldMethods.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>

#### Returns

[`FieldMethods`](../type-aliases/FieldMethods.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>
