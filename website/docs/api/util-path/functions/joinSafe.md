# Function: joinSafe()

> **joinSafe**(...`p`): `string`

Exactly like path.join(), but it keeps the first meaningful ./.

Note that the unix / is returned everywhere, so windows \ is always converted to unix /.

## Parameters

• ...**p**: `any`[]

## Returns

`string`

## Defined in

[packages/util-path/index.ts:22](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/util-path/index.ts#L22)
