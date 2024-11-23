# Function: changeExt()

> **changeExt**(`filename`, `ext`, `ignoreExts`?, `maxSize`?): `string`

Changes a filename's extension to ext. If it has no (valid) extension, it adds it.

Valid extensions are considered to be up to maxSize chars long, counting the dot (defaults to 7).

An Array of ignoreExts (eg ['.min']) prevents these from being considered as extension, thus are not changed - the new extension is added instead.

## Parameters

• **filename**: `string`

string filename to change it's extension

• **ext**: `string`

string extension to change to

• **ignoreExts?**: `string`[]

array extensions to ignore

• **maxSize?**: `number`

number max length of the extension

## Returns

`string`

## Defined in

[packages/util-path/index.ts:14](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/util-path/index.ts#L14)
