# Function: isMatch()

> **isMatch**(`string`, `pattern`, `options`?): `boolean`

Returns true if the specified `string` matches the given glob `pattern`.

## Parameters

• **string**: `string`

String to match

• **pattern**: `string` \| readonly `string`[]

Glob pattern to use for matching.

• **options?**: [`Options`](../namespaces/micromatch/interfaces/Options.md)

See available options for changing how matches are performed

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

## Defined in

[packages/generator-sdk/lib/watcher.ts:13](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/generator-sdk/lib/watcher.ts#L13)
