# Function: normalize()

> **normalize**(`p`): `string`

Normalize a string path, reducing '..' and '.' parts.
When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used.

## Parameters

### p

`string`

string path to normalize.

## Returns

`string`
