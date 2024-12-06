# Function: resolve()

> **resolve**(...`pathSegments`): `string`

The right-most parameter is considered {to}.  Other parameters are considered an array of {from}.

Starting from leftmost {from} parameter, resolves {to} to an absolute path.

If {to} isn't already absolute, {from} arguments are prepended in right to left order, until an absolute path is found. If after using all {from} paths still no absolute path is found, the current working directory is used as well. The resulting path is normalized, and trailing slashes are removed unless the path gets resolved to the root directory.

## Parameters

• ...**pathSegments**: `any`[]

string paths to join.  Non-string arguments are ignored.

## Returns

`string`

## Defined in

[packages/util-path/index.ts:30](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/util-path/index.ts#L30)
