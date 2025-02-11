# @baeta/util-path

## Variables

### default

> **default**: `object`

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="addext"></a> `addExt`

</td>
<td>

(`file`, `ext`) => `string`

</td>
</tr>
<tr>
<td>

<a id="basename"></a> `basename`

</td>
<td>

(`p`, `ext`?) => `string`

</td>
</tr>
<tr>
<td>

<a id="changeext"></a> `changeExt`

</td>
<td>

(`filename`, `ext`, `ignoreExts`?, `maxSize`?) => `string`

</td>
</tr>
<tr>
<td>

<a id="defaultext"></a> `defaultExt`

</td>
<td>

(`filename`, `ext`, `ignoreExts`?, `maxSize`?) => `string`

</td>
</tr>
<tr>
<td>

<a id="delimiter"></a> `delimiter`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="dirname"></a> `dirname`

</td>
<td>

(`p`) => `string`

</td>
</tr>
<tr>
<td>

<a id="extname"></a> `extname`

</td>
<td>

(`p`) => `string`

</td>
</tr>
<tr>
<td>

<a id="format"></a> `format`

</td>
<td>

(`pathObject`) => `string`

</td>
</tr>
<tr>
<td>

<a id="isabsolute"></a> `isAbsolute`

</td>
<td>

(`path`) => `boolean`

</td>
</tr>
<tr>
<td>

<a id="join"></a> `join`

</td>
<td>

(...`paths`) => `string`(...`paths`) => `string`

</td>
</tr>
<tr>
<td>

<a id="joinsafe"></a> `joinSafe`

</td>
<td>

(...`paths`) => `string`

</td>
</tr>
<tr>
<td>

<a id="normalize"></a> `normalize`

</td>
<td>

(`p`) => `string`

</td>
</tr>
<tr>
<td>

<a id="normalizesafe"></a> `normalizeSafe`

</td>
<td>

(`p`) => `string`

</td>
</tr>
<tr>
<td>

<a id="normalizetrim"></a> `normalizeTrim`

</td>
<td>

(`p`) => `string`

</td>
</tr>
<tr>
<td>

<a id="parse"></a> `parse`

</td>
<td>

(`pathString`) => `ParsedPath`

</td>
</tr>
<tr>
<td>

<a id="posix"></a> `posix`

</td>
<td>

_typeof_ `posix`

</td>
</tr>
<tr>
<td>

<a id="posixpath"></a> `posixPath`

</td>
<td>

(`pathname`) => `string`

</td>
</tr>
<tr>
<td>

<a id="relative"></a> `relative`

</td>
<td>

(`from`, `to`) => `string`

</td>
</tr>
<tr>
<td>

<a id="removeext"></a> `removeExt`

</td>
<td>

(`filename`, `ext`) => `string`

</td>
</tr>
<tr>
<td>

<a id="resolve"></a> `resolve`

</td>
<td>

(...`pathSegments`) => `string`

</td>
</tr>
<tr>
<td>

<a id="sep"></a> `sep`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="tounix"></a> `toUnix`

</td>
<td>

(`p`) => `string`

</td>
</tr>
<tr>
<td>

<a id="trimext"></a> `trimExt`

</td>
<td>

(`filename`, `ignoreExts`?, `maxSize`?) => `string`

</td>
</tr>
<tr>
<td>

<a id="win32"></a> `win32`

</td>
<td>

_typeof_ `win32`

</td>
</tr>
<tr>
<td>

<a id="winpath"></a> `winPath`

</td>
<td>

(`pathname`) => `string`

</td>
</tr>
</tbody>
</table>

---

### delimiter

> `const` **delimiter**: `string` = `upath.delimiter`

---

### posix

> `const` **posix**: _typeof_ `posix` = `upath.posix`

---

### sep

> `const` **sep**: `string` = `upath.sep`

---

### win32

> `const` **win32**: _typeof_ `win32` = `upath.win32`

## Functions

### addExt()

> **addExt**(`file`, `ext`): `string`

Adds .ext to filename, but only if it doesn't already have the exact extension.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`file`

</td>
<td>

`string`

</td>
<td>

string filename to add extension to

</td>
</tr>
<tr>
<td>

`ext`

</td>
<td>

`string`

</td>
<td>

string extension to add

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### basename()

> **basename**(`p`, `ext`?): `string`

Return the last portion of a path. Similar to the Unix basename command.
Often used to extract the file name from a fully qualified path.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`p`

</td>
<td>

`string`

</td>
<td>

the path to evaluate.

</td>
</tr>
<tr>
<td>

`ext`?

</td>
<td>

`string`

</td>
<td>

optionally, an extension to remove from the result.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### changeExt()

> **changeExt**(`filename`, `ext`, `ignoreExts`?, `maxSize`?): `string`

Changes a filename's extension to ext. If it has no (valid) extension, it adds it.

Valid extensions are considered to be up to maxSize chars long, counting the dot (defaults to 7).

An Array of ignoreExts (eg ['.min']) prevents these from being considered as extension, thus are not changed - the new extension is added instead.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`filename`

</td>
<td>

`string`

</td>
<td>

string filename to change it's extension

</td>
</tr>
<tr>
<td>

`ext`

</td>
<td>

`string`

</td>
<td>

string extension to change to

</td>
</tr>
<tr>
<td>

`ignoreExts`?

</td>
<td>

`string`[]

</td>
<td>

array extensions to ignore

</td>
</tr>
<tr>
<td>

`maxSize`?

</td>
<td>

`number`

</td>
<td>

number max length of the extension

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### defaultExt()

> **defaultExt**(`filename`, `ext`, `ignoreExts`?, `maxSize`?): `string`

Adds .ext to filename, only if it doesn't already have any old extension.

(Old) extensions are considered to be up to maxSize chars long, counting the dot (defaults to 7).

An Array of ignoreExts (eg ['.min']) will force adding default .ext even if one of these is present.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`filename`

</td>
<td>

`string`

</td>
<td>

string filename to default to it's extension

</td>
</tr>
<tr>
<td>

`ext`

</td>
<td>

`string`

</td>
<td>

string extension to default to

</td>
</tr>
<tr>
<td>

`ignoreExts`?

</td>
<td>

`string`[]

</td>
<td>

array extensions to ignore

</td>
</tr>
<tr>
<td>

`maxSize`?

</td>
<td>

`number`

</td>
<td>

number max length of the extension

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### dirname()

> **dirname**(`p`): `string`

Return the directory name of a path. Similar to the Unix dirname command.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`p`

</td>
<td>

`string`

</td>
<td>

the path to evaluate.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### extname()

> **extname**(`p`): `string`

Return the extension of the path, from the last '.' to end of string in the last portion of the path.
If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`p`

</td>
<td>

`string`

</td>
<td>

the path to evaluate.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### format()

> **format**(`pathObject`): `string`

Returns a path string from an object - the opposite of parse().

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`pathObject`

</td>
<td>

`ParsedPath`

</td>
<td>

path to evaluate.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### isAbsolute()

> **isAbsolute**(`path`): `boolean`

Determines whether {path} is an absolute path. An absolute path will always resolve to the same location, regardless of the working directory.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`path`

</td>
<td>

`string`

</td>
<td>

path to test.

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

---

### join()

#### Call Signature

> **join**(...`paths`): `string`

Join all arguments together and normalize the resulting path.
Arguments must be strings. In v0.8, non-string arguments were silently ignored. In v0.10 and up, an exception is thrown.

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

...`paths`

</td>
<td>

`any`[]

</td>
<td>

string paths to join.

</td>
</tr>
</tbody>
</table>

##### Returns

`string`

#### Call Signature

> **join**(...`paths`): `string`

Join all arguments together and normalize the resulting path.
Arguments must be strings. In v0.8, non-string arguments were silently ignored. In v0.10 and up, an exception is thrown.

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

...`paths`

</td>
<td>

`string`[]

</td>
<td>

string paths to join.

</td>
</tr>
</tbody>
</table>

##### Returns

`string`

---

### joinSafe()

> **joinSafe**(...`paths`): `string`

Exactly like path.join(), but it keeps the first meaningful ./.

Note that the unix / is returned everywhere, so windows \ is always converted to unix /.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

...`paths`

</td>
<td>

`any`[]

</td>
<td>

string paths to join

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### normalize()

> **normalize**(`p`): `string`

Normalize a string path, reducing '..' and '.' parts.
When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`p`

</td>
<td>

`string`

</td>
<td>

string path to normalize.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### normalizeSafe()

> **normalizeSafe**(`p`): `string`

Exactly like path.normalize(path), but it keeps the first meaningful ./.

Note that the unix / is returned everywhere, so windows \ is always converted to unix /.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`p`

</td>
<td>

`string`

</td>
<td>

string path to normalize.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### normalizeTrim()

> **normalizeTrim**(`p`): `string`

Exactly like path.normalizeSafe(path), but it trims any useless ending /.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`p`

</td>
<td>

`string`

</td>
<td>

string path to normalize

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### parse()

> **parse**(`pathString`): `ParsedPath`

Returns an object from a path string - the opposite of format().

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`pathString`

</td>
<td>

`string`

</td>
<td>

path to evaluate.

</td>
</tr>
</tbody>
</table>

#### Returns

`ParsedPath`

---

### posixPath()

> **posixPath**(`pathname`): `string`

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`pathname`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### relative()

> **relative**(`from`, `to`): `string`

Solve the relative path from {from} to {to}.
At times we have two absolute paths, and we need to derive the relative path from one to the other. This is actually the reverse transform of path.resolve.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`from`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`to`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### removeExt()

> **removeExt**(`filename`, `ext`): `string`

Removes the specific ext extension from filename, if it has it. Otherwise it leaves it as is. As in all upath functions, it be .ext or ext.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`filename`

</td>
<td>

`string`

</td>
<td>

string filename to remove extension to

</td>
</tr>
<tr>
<td>

`ext`

</td>
<td>

`string`

</td>
<td>

string extension to remove

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### resolve()

> **resolve**(...`pathSegments`): `string`

The right-most parameter is considered {to}. Other parameters are considered an array of {from}.

Starting from leftmost {from} parameter, resolves {to} to an absolute path.

If {to} isn't already absolute, {from} arguments are prepended in right to left order, until an absolute path is found. If after using all {from} paths still no absolute path is found, the current working directory is used as well. The resulting path is normalized, and trailing slashes are removed unless the path gets resolved to the root directory.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

...`pathSegments`

</td>
<td>

`any`[]

</td>
<td>

string paths to join. Non-string arguments are ignored.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### toUnix()

> **toUnix**(`p`): `string`

Just converts all `to/` and consolidates duplicates, without performing any normalization.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`p`

</td>
<td>

`string`

</td>
<td>

string path to convert to unix.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### trimExt()

> **trimExt**(`filename`, `ignoreExts`?, `maxSize`?): `string`

Trims a filename's extension.

Extensions are considered to be up to maxSize chars long, counting the dot (defaults to 7).

An Array of ignoreExts (eg ['.min']) prevents these from being considered as extension, thus are not trimmed.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`filename`

</td>
<td>

`string`

</td>
<td>

string filename to trim it's extension

</td>
</tr>
<tr>
<td>

`ignoreExts`?

</td>
<td>

`string`[]

</td>
<td>

array extensions to ignore

</td>
</tr>
<tr>
<td>

`maxSize`?

</td>
<td>

`number`

</td>
<td>

number max length of the extension

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### winPath()

> **winPath**(`pathname`): `string`

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`pathname`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`
