# Function: normalize()

> **normalize**(`p`): `string`

Normalize a string path, reducing '..' and '.' parts.
When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used.

## Parameters

• **p**: `string`

string path to normalize.

## Returns

`string`

## Defined in

[packages/util-path/index.ts:23](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/util-path/index.ts#L23)
