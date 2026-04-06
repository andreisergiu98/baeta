# PipelineOptions\<Pipeline, Result, Items\>

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

`Pipeline`

</td>
</tr>
<tr>
<td>

`Result`

</td>
</tr>
<tr>
<td>

`Items`

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

<a id="addcommand"></a> `addCommand`

</td>
<td>

(`pipeline`, `item`) => `void`

</td>
</tr>
<tr>
<td>

<a id="estimatesize"></a> `estimateSize`

</td>
<td>

(`item`) => `number`

</td>
</tr>
<tr>
<td>

<a id="executepipeline"></a> `executePipeline`

</td>
<td>

(`pipeline`) => `Promise`\<`Result`[]\>

</td>
</tr>
<tr>
<td>

<a id="items-1"></a> `items`

</td>
<td>

`Items`[]

</td>
</tr>
<tr>
<td>

<a id="makepipeline"></a> `makePipeline`

</td>
<td>

() => `Pipeline`

</td>
</tr>
<tr>
<td>

<a id="maxbatchbytes"></a> `maxBatchBytes`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

<a id="maxbatchcount"></a> `maxBatchCount`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

<a id="estimateoverheadbytes"></a> `estimateOverheadBytes?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>
