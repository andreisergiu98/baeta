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

[packages/generator-sdk/lib/watcher.ts:13](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/generator-sdk/lib/watcher.ts#L13)
