# SubscriptionBuilderOptions\<Result, Source, Context, Args, Info\>

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

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="field"></a> `field`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="metadata"></a> `metadata`

</td>
<td>

`Map`\<`symbol`, `Readonly`\<`unknown`\>\>

</td>
</tr>
<tr>
<td>

<a id="middlewares"></a> `middlewares`

</td>
<td>

[`Middleware`](../../index/type-aliases/Middleware.md)\<[`Subscription`](../type-aliases/Subscription.md)\<`unknown`\>, `Source`, `Context`, `Args`, `Info`\>[]

</td>
</tr>
<tr>
<td>

<a id="requiredpluginids"></a> `requiredPluginIds`

</td>
<td>

`Set`\<[`PluginId`](../type-aliases/PluginId.md)\>

</td>
</tr>
</tbody>
</table>
