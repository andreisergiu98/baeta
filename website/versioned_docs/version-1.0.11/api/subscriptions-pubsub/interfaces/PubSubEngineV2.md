# PubSubEngineV2

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

<a id="asynciterator"></a> `asyncIterator`

</td>
<td>

\<`T`\>(`triggers`, ...`rest`) => `AsyncIterator`\<`T`\>

</td>
</tr>
<tr>
<td>

<a id="publish"></a> `publish`

</td>
<td>

(`triggerName`, `payload`, ...`rest`) => `Promise`\<`void`\>

</td>
</tr>
<tr>
<td>

<a id="subscribe"></a> `subscribe`

</td>
<td>

(`triggerName`, `onMessage`, ...`rest`) => `Promise`\<`number`\>

</td>
</tr>
<tr>
<td>

<a id="unsubscribe"></a> `unsubscribe`

</td>
<td>

(`subId`, ...`rest`) => `void`

</td>
</tr>
</tbody>
</table>
