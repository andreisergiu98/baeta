# SubscriptionBuilderOptions\<Source, Context, Args, Info\>

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

<a id="extensions"></a> `extensions`

</td>
<td>

readonly [`Extension`](../classes/Extension.md)\<`unknown`\>[]

</td>
</tr>
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

<a id="middlewares"></a> `middlewares`

</td>
<td>

[`Middleware`](../../index/type-aliases/Middleware.md)\<[`SubscriptionWrapper`](../type-aliases/SubscriptionWrapper.md), `Source`, `Context`, `Args`, `Info`\>[]

</td>
</tr>
<tr>
<td>

<a id="store"></a> `store`

</td>
<td>

`Map`\<`symbol`, `Readonly`\<`unknown`\>\>

</td>
</tr>
</tbody>
</table>
