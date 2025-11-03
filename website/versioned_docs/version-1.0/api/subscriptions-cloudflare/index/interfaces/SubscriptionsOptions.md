# SubscriptionsOptions\<Env, Context, ContextParams\>

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

`Env`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`ContextParams`

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

<a id="getdatabase"></a> `getDatabase`

</td>
<td>

(`env`) => [`SubscriptionDatabase`](../classes/SubscriptionDatabase.md)

</td>
</tr>
<tr>
<td>

<a id="getwsconnections"></a> `getWSConnections`

</td>
<td>

(`env`) => `DurableObjectNamespace`

</td>
</tr>
<tr>
<td>

<a id="schema"></a> `schema`

</td>
<td>

`GraphQLSchema`

</td>
</tr>
<tr>
<td>

<a id="context-1"></a> `context?`

</td>
<td>

[`SubscriptionsContextLoader`](SubscriptionsContextLoader.md)\<`Env`, `Context`, `ContextParams`\>

</td>
</tr>
<tr>
<td>

<a id="poolingtype"></a> `poolingType?`

</td>
<td>

[`PoolingType`](../type-aliases/PoolingType.md)

</td>
</tr>
</tbody>
</table>
