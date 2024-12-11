# Variable: default

> **default**: `object`

## Type declaration

### addExt()

> **addExt**: (`file`, `ext`) => `string`

Adds .ext to filename, but only if it doesn't already have the exact extension.

#### Parameters

##### file

`string`

string filename to add extension to

##### ext

`string`

string extension to add

#### Returns

`string`

### basename()

> **basename**: (`p`, `ext`?) => `string`

Return the last portion of a path. Similar to the Unix basename command.
Often used to extract the file name from a fully qualified path.

#### Parameters

##### p

`string`

the path to evaluate.

##### ext?

`string`

optionally, an extension to remove from the result.

#### Returns

`string`

### changeExt()

> **changeExt**: (`filename`, `ext`, `ignoreExts`?, `maxSize`?) => `string`

Changes a filename's extension to ext. If it has no (valid) extension, it adds it.

Valid extensions are considered to be up to maxSize chars long, counting the dot (defaults to 7).

An Array of ignoreExts (eg ['.min']) prevents these from being considered as extension, thus are not changed - the new extension is added instead.

#### Parameters

##### filename

`string`

string filename to change it's extension

##### ext

`string`

string extension to change to

##### ignoreExts?

`string`[]

array extensions to ignore

##### maxSize?

`number`

number max length of the extension

#### Returns

`string`

### defaultExt()

> **defaultExt**: (`filename`, `ext`, `ignoreExts`?, `maxSize`?) => `string`

Adds .ext to filename, only if it doesn't already have any old extension.

(Old) extensions are considered to be up to maxSize chars long, counting the dot (defaults to 7).

An Array of ignoreExts (eg ['.min']) will force adding default .ext even if one of these is present.

#### Parameters

##### filename

`string`

string filename to default to it's extension

##### ext

`string`

string extension to default to

##### ignoreExts?

`string`[]

array extensions to ignore

##### maxSize?

`number`

number max length of the extension

#### Returns

`string`

### delimiter

> **delimiter**: `string`

### dirname()

> **dirname**: (`p`) => `string`

Return the directory name of a path. Similar to the Unix dirname command.

#### Parameters

##### p

`string`

the path to evaluate.

#### Returns

`string`

### extname()

> **extname**: (`p`) => `string`

Return the extension of the path, from the last '.' to end of string in the last portion of the path.
If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string

#### Parameters

##### p

`string`

the path to evaluate.

#### Returns

`string`

### format()

> **format**: (`pathObject`) => `string`

Returns a path string from an object - the opposite of parse().

#### Parameters

##### pathObject

`ParsedPath`

#### Returns

`string`

### isAbsolute()

> **isAbsolute**: (`path`) => `boolean`

Determines whether {path} is an absolute path. An absolute path will always resolve to the same location, regardless of the working directory.

#### Parameters

##### path

`string`

path to test.

#### Returns

`boolean`

### join()

> **join**: (...`paths`) => `string`(...`paths`) => `string`

Join all arguments together and normalize the resulting path.
Arguments must be strings. In v0.8, non-string arguments were silently ignored. In v0.10 and up, an exception is thrown.

#### Parameters

##### paths

...`any`[]

string paths to join.

#### Returns

`string`

Join all arguments together and normalize the resulting path.
Arguments must be strings. In v0.8, non-string arguments were silently ignored. In v0.10 and up, an exception is thrown.

#### Parameters

##### paths

...`string`[]

string paths to join.

#### Returns

`string`

### joinSafe()

> **joinSafe**: (...`p`) => `string`

Exactly like path.join(), but it keeps the first meaningful ./.

Note that the unix / is returned everywhere, so windows \ is always converted to unix /.

#### Parameters

##### p

...`any`[]

#### Returns

`string`

### normalize()

> **normalize**: (`p`) => `string`

Normalize a string path, reducing '..' and '.' parts.
When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used.

#### Parameters

##### p

`string`

string path to normalize.

#### Returns

`string`

### normalizeSafe()

> **normalizeSafe**: (`p`) => `string`

Exactly like path.normalize(path), but it keeps the first meaningful ./.

Note that the unix / is returned everywhere, so windows \ is always converted to unix /.

#### Parameters

##### p

`string`

string path to normalize.

#### Returns

`string`

### normalizeTrim()

> **normalizeTrim**: (`p`) => `string`

Exactly like path.normalizeSafe(path), but it trims any useless ending /.

#### Parameters

##### p

`string`

string path to normalize

#### Returns

`string`

### parse()

> **parse**: (`pathString`) => `ParsedPath`

Returns an object from a path string - the opposite of format().

#### Parameters

##### pathString

`string`

path to evaluate.

#### Returns

`ParsedPath`

### posix

> **posix**: _typeof_ `posix`

### posixPath()

> **posixPath**: (`pathname`) => `string`

#### Parameters

##### pathname

`string`

#### Returns

`string`

### relative()

> **relative**: (`from`, `to`) => `string`

Solve the relative path from {from} to {to}.
At times we have two absolute paths, and we need to derive the relative path from one to the other. This is actually the reverse transform of path.resolve.

#### Parameters

##### from

`string`

##### to

`string`

#### Returns

`string`

### removeExt()

> **removeExt**: (`filename`, `ext`) => `string`

Removes the specific ext extension from filename, if it has it. Otherwise it leaves it as is. As in all upath functions, it be .ext or ext.

#### Parameters

##### filename

`string`

##### ext

`string`

string extension to remove

#### Returns

`string`

### resolve()

> **resolve**: (...`pathSegments`) => `string`

The right-most parameter is considered {to}. Other parameters are considered an array of {from}.

Starting from leftmost {from} parameter, resolves {to} to an absolute path.

If {to} isn't already absolute, {from} arguments are prepended in right to left order, until an absolute path is found. If after using all {from} paths still no absolute path is found, the current working directory is used as well. The resulting path is normalized, and trailing slashes are removed unless the path gets resolved to the root directory.

#### Parameters

##### pathSegments

...`any`[]

string paths to join. Non-string arguments are ignored.

#### Returns

`string`

### sep

> **sep**: `string`

### toUnix()

> **toUnix**: (`p`) => `string`

Just converts all `to/` and consolidates duplicates, without performing any normalization.

#### Parameters

##### p

`string`

string path to convert to unix.

#### Returns

`string`

### trimExt()

> **trimExt**: (`filename`, `ignoreExts`?, `maxSize`?) => `string`

Trims a filename's extension.

Extensions are considered to be up to maxSize chars long, counting the dot (defaults to 7).

An Array of ignoreExts (eg ['.min']) prevents these from being considered as extension, thus are not trimmed.

#### Parameters

##### filename

`string`

string filename to trim it's extension

##### ignoreExts?

`string`[]

array extensions to ignore

##### maxSize?

`number`

number max length of the extension

#### Returns

`string`

### win32

> **win32**: _typeof_ `win32`

### winPath()

> **winPath**: (`pathname`) => `string`

#### Parameters

##### pathname

`string`

#### Returns

`string`
