# DOMElement

> **DOMElement** = `object` & `InkNode`

## Type declaration

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

`attributes`

</td>
<td>

`Record`\<`string`, `DOMNodeAttribute`\>

</td>
</tr>
<tr>
<td>

`childNodes`

</td>
<td>

`DOMNode`[]

</td>
</tr>
<tr>
<td>

`nodeName`

</td>
<td>

`ElementNames`

</td>
</tr>
<tr>
<td>

`internal_transform?`

</td>
<td>

`OutputTransformer`

</td>
</tr>
<tr>
<td>

`isStaticDirty?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`onComputeLayout()?`

</td>
<td>

() => `void`

</td>
</tr>
<tr>
<td>

`onImmediateRender()?`

</td>
<td>

() => `void`

</td>
</tr>
<tr>
<td>

`onRender()?`

</td>
<td>

() => `void`

</td>
</tr>
<tr>
<td>

`staticNode?`

</td>
<td>

`DOMElement`

</td>
</tr>
</tbody>
</table>
