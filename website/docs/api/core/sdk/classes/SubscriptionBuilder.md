# SubscriptionBuilder\<Result, Source, Context, Args, Info\>

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

> **new SubscriptionBuilder**\<`Result`, `Source`, `Context`, `Args`, `Info`\>(`options`): `SubscriptionBuilder`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

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

[`SubscriptionBuilderOptions`](../interfaces/SubscriptionBuilderOptions.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`SubscriptionBuilder`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

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

### field

#### Get Signature

> **get** **field**(): `string`

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

(`middleware`) => \{ readonly field: string; readonly addMiddleware: (middleware: Middleware\<Subscription\<unknown\>, Source, Context, Args, Info\>) =\> any; readonly addRequiredPluginId: (id: PluginId) =\> any; readonly mergeMeta: (meta: Map\<symbol, unknown\>) =\> any; readonly commit: () =\> SubscriptionBuilder\<Result, Source, Context, Args, Info\>; readonly commitToMethods: \<P = never\>() =\> SubscriptionMethods\<Result, Source, Context, Args, Info, P\>; \}

</td>
</tr>
<tr>
<td>

`addRequiredPluginId()`

</td>
<td>

(`id`) => \{ readonly field: string; readonly addMiddleware: (middleware: Middleware\<Subscription\<unknown\>, Source, Context, Args, Info\>) =\> any; readonly addRequiredPluginId: (id: PluginId) =\> any; readonly mergeMeta: (meta: Map\<symbol, unknown\>) =\> any; readonly commit: () =\> SubscriptionBuilder\<Result, Source, Context, Args, Info\>; readonly commitToMethods: \<P = never\>() =\> SubscriptionMethods\<Result, Source, Context, Args, Info, P\>; \}

</td>
</tr>
<tr>
<td>

`commit()`

</td>
<td>

() => `SubscriptionBuilder`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

`commitToMethods()`

</td>
<td>

\<`P`\>() => [`SubscriptionMethods`](../type-aliases/SubscriptionMethods.md)\<`Result`, `Source`, `Context`, `Args`, `Info`, `P`\>

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

(`meta`) => \{ readonly field: string; readonly addMiddleware: (middleware: Middleware\<Subscription\<unknown\>, Source, Context, Args, Info\>) =\> any; readonly addRequiredPluginId: (id: PluginId) =\> any; readonly mergeMeta: (meta: Map\<symbol, unknown\>) =\> any; readonly commit: () =\> SubscriptionBuilder\<Result, Source, Context, Args, Info\>; readonly commitToMethods: \<P = never\>() =\> SubscriptionMethods\<Result, Source, Context, Args, Info, P\>; \}

</td>
</tr>
</tbody>
</table>

***

### toMethods()

> **toMethods**\<`Payload`\>(): [`SubscriptionMethods`](../type-aliases/SubscriptionMethods.md)\<`Result`, `Source`, `Context`, `Args`, `Info`, `Payload`\>

#### Type Parameters

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

`Payload`

</td>
<td>

`never`

</td>
</tr>
</tbody>
</table>

#### Returns

[`SubscriptionMethods`](../type-aliases/SubscriptionMethods.md)\<`Result`, `Source`, `Context`, `Args`, `Info`, `Payload`\>
