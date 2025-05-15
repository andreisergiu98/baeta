# ComplexityExtensionOptions\<Context\>

Configuration options for the complexity extension.

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

`Context`

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
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="complexityerror"></a> `complexityError?`

</td>
<td>

[`GetComplexityError`](../type-aliases/GetComplexityError.md)

</td>
<td>

`undefined`

</td>
<td>

Custom error message generator

</td>
</tr>
<tr>
<td>

<a id="defaultcomplexity"></a> `defaultComplexity?`

</td>
<td>

`number`

</td>
<td>

```ts
1;
```

</td>
<td>

Base complexity score for fields

</td>
</tr>
<tr>
<td>

<a id="defaultlistmultiplier"></a> `defaultListMultiplier?`

</td>
<td>

`number`

</td>
<td>

```ts
10;
```

</td>
<td>

Multiplier applied to list fields

</td>
</tr>
<tr>
<td>

<a id="limit"></a> `limit?`

</td>
<td>

[`GetComplexityLimit`](../type-aliases/GetComplexityLimit.md)\<`Context`\>

</td>
<td>

`undefined`

</td>
<td>

Static limits or function to determine limits based on context

</td>
</tr>
</tbody>
</table>
