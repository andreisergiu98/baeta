# StaticProps\<T\>

> **StaticProps**\<`T`\> = `object`

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

`T`

</td>
</tr>
</tbody>
</table>

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="children"></a> `children`

</td>
<td>

`readonly`

</td>
<td>

(`item`, `index`) => `ReactNode`

</td>
<td>

Function that is called to render every item in `items` array.
First argument is an item itself and second argument is index of that item in `items` array.
Note that `key` must be assigned to the root component.

</td>
</tr>
<tr>
<td>

<a id="items"></a> `items`

</td>
<td>

`readonly`

</td>
<td>

`T`[]

</td>
<td>

Array of items of any type to render using a function you pass as a component child.

</td>
</tr>
<tr>
<td>

<a id="style"></a> `style?`

</td>
<td>

`readonly`

</td>
<td>

`Styles`

</td>
<td>

Styles to apply to a container of child elements. See <Box> for supported properties.

</td>
</tr>
</tbody>
</table>
