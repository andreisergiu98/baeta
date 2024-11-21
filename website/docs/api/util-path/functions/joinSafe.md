# Function: joinSafe()

> **joinSafe**(...`p`): `string`

Exactly like path.join(), but it keeps the first meaningful ./.

Note that the unix / is returned everywhere, so windows \ is always converted to unix /.

## Parameters

• ...**p**: `any`[]

## Returns

`string`

## Defined in

[packages/util-path/index.ts:22](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/util-path/index.ts#L22)
