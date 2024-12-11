# Function: joinSafe()

> **joinSafe**(...`paths`): `string`

Exactly like path.join(), but it keeps the first meaningful ./.

Note that the unix / is returned everywhere, so windows \ is always converted to unix /.

## Parameters

### paths

...`any`[]

string paths to join

## Returns

`string`
