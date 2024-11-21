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

[packages/util-path/index.ts:24](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/util-path/index.ts#L24)
