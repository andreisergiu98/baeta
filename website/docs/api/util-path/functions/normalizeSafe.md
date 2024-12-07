# Function: normalizeSafe()

> **normalizeSafe**(`p`): `string`

Exactly like path.normalize(path), but it keeps the first meaningful ./.

Note that the unix / is returned everywhere, so windows \ is always converted to unix /.

## Parameters

• **p**: `string`

string path to normalize.

## Returns

`string`
