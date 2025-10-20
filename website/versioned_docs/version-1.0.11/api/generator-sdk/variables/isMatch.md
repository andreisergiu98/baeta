# isMatch()

> `const` **isMatch**: (`string`, `pattern`, `options?`) => `boolean` = `micromatch.isMatch`

Returns true if the specified `string` matches the given glob `pattern`.

## Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`string`

</td>
<td>

`string`

</td>
<td>

String to match

</td>
</tr>
<tr>
<td>

`pattern`

</td>
<td>

`string` \| readonly `string`[]

</td>
<td>

Glob pattern to use for matching.

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`Options`](../namespaces/micromatch/interfaces/Options.md)

</td>
<td>

See available options for changing how matches are performed

</td>
</tr>
</tbody>
</table>

## Returns

`boolean`

Returns true if the string matches the glob pattern.

## Example

```js
var mm = require('micromatch');
mm.isMatch(string, pattern[, options]);

console.log(mm.isMatch('a.a', '*.a'));
//=> true
console.log(mm.isMatch('a.b', '*.a'));
//=> false
```
