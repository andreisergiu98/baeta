# Function: normalizeSafe()

> **normalizeSafe**(`p`): `string`

Exactly like path.normalize(path), but it keeps the first meaningful ./.

Note that the unix / is returned everywhere, so windows \ is always converted to unix /.

## Parameters

• **p**: `string`

string path to normalize.

## Returns

`string`

## Defined in

[packages/util-path/index.ts:24](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/util-path/index.ts#L24)
