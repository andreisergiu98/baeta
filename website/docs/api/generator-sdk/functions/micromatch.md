# Function: micromatch()

> **micromatch**(`list`, `patterns`, `options`?): `string`[]

The main function takes a list of strings and one or more glob patterns to use for matching.

## Parameters

• **list**: readonly `string`[]

A list of strings to match

• **patterns**: `string` \| readonly `string`[]

One or more glob patterns to use for matching.

• **options?**: [`Options`](../namespaces/micromatch/interfaces/Options.md)

See available options for changing how matches are performed

## Returns

`string`[]

Returns an array of matches

## Example

```js
var mm = require('micromatch');
mm(list, patterns[, options]);

console.log(mm(['a.js', 'a.txt'], ['*.js']));
//=> [ 'a.js' ]
```

## Defined in

.yarn/cache/@types-micromatch-npm-4.0.9-c49f1284da-324f4bcb4a.zip/node\_modules/@types/micromatch/index.d.ts:4
