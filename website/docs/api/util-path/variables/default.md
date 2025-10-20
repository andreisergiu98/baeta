# default

> **default**: `object`

## Type Declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="addext"></a> `addExt()`

</td>
<td>

(`file`, `ext`) => `string`

</td>
<td>

Adds .ext to filename, but only if it doesn't already have the exact extension.

</td>
</tr>
<tr>
<td>

<a id="basename"></a> `basename()`

</td>
<td>

(`p`, `ext?`) => `string`

</td>
<td>

Return the last portion of a path. Similar to the Unix basename command.
Often used to extract the file name from a fully qualified path.

</td>
</tr>
<tr>
<td>

<a id="changeext"></a> `changeExt()`

</td>
<td>

(`filename`, `ext`, `ignoreExts?`, `maxSize?`) => `string`

</td>
<td>

Changes a filename's extension to ext. If it has no (valid) extension, it adds it.

Valid extensions are considered to be up to maxSize chars long, counting the dot (defaults to 7).

An Array of ignoreExts (eg ['.min']) prevents these from being considered as extension, thus are not changed - the new extension is added instead.

</td>
</tr>
<tr>
<td>

<a id="defaultext"></a> `defaultExt()`

</td>
<td>

(`filename`, `ext`, `ignoreExts?`, `maxSize?`) => `string`

</td>
<td>

Adds .ext to filename, only if it doesn't already have any old extension.

(Old) extensions are considered to be up to maxSize chars long, counting the dot (defaults to 7).

An Array of ignoreExts (eg ['.min']) will force adding default .ext even if one of these is present.

</td>
</tr>
<tr>
<td>

<a id="delimiter"></a> `delimiter`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="dirname"></a> `dirname()`

</td>
<td>

(`p`) => `string`

</td>
<td>

Return the directory name of a path. Similar to the Unix dirname command.

</td>
</tr>
<tr>
<td>

<a id="extname"></a> `extname()`

</td>
<td>

(`p`) => `string`

</td>
<td>

Return the extension of the path, from the last '.' to end of string in the last portion of the path.
If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string

</td>
</tr>
<tr>
<td>

<a id="format"></a> `format()`

</td>
<td>

(`pathObject`) => `string`

</td>
<td>

Returns a path string from an object - the opposite of parse().

</td>
</tr>
<tr>
<td>

<a id="isabsolute"></a> `isAbsolute()`

</td>
<td>

(`path`) => `boolean`

</td>
<td>

Determines whether {path} is an absolute path. An absolute path will always resolve to the same location, regardless of the working directory.

</td>
</tr>
<tr>
<td>

<a id="join"></a> `join()`

</td>
<td>

\{(...`paths`): `string`; (...`paths`): `string`; \}

</td>
<td>

Join all arguments together and normalize the resulting path.
Arguments must be strings. In v0.8, non-string arguments were silently ignored. In v0.10 and up, an exception is thrown.

Join all arguments together and normalize the resulting path.
Arguments must be strings. In v0.8, non-string arguments were silently ignored. In v0.10 and up, an exception is thrown.

</td>
</tr>
<tr>
<td>

<a id="joinsafe"></a> `joinSafe()`

</td>
<td>

(...`paths`) => `string`

</td>
<td>

Exactly like path.join(), but it keeps the first meaningful ./.

Note that the unix / is returned everywhere, so windows \ is always converted to unix /.

</td>
</tr>
<tr>
<td>

<a id="normalize"></a> `normalize()`

</td>
<td>

(`p`) => `string`

</td>
<td>

Normalize a string path, reducing '..' and '.' parts.
When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used.

</td>
</tr>
<tr>
<td>

<a id="normalizesafe"></a> `normalizeSafe()`

</td>
<td>

(`p`) => `string`

</td>
<td>

Exactly like path.normalize(path), but it keeps the first meaningful ./.

Note that the unix / is returned everywhere, so windows \ is always converted to unix /.

</td>
</tr>
<tr>
<td>

<a id="normalizetrim"></a> `normalizeTrim()`

</td>
<td>

(`p`) => `string`

</td>
<td>

Exactly like path.normalizeSafe(path), but it trims any useless ending /.

</td>
</tr>
<tr>
<td>

<a id="parse"></a> `parse()`

</td>
<td>

(`pathString`) => `ParsedPath`

</td>
<td>

Returns an object from a path string - the opposite of format().

</td>
</tr>
<tr>
<td>

<a id="posix"></a> `posix`

</td>
<td>

_typeof_ `posix`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="posixpath"></a> `posixPath()`

</td>
<td>

(`pathname`) => `string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="relative"></a> `relative()`

</td>
<td>

(`from`, `to`) => `string`

</td>
<td>

Solve the relative path from {from} to {to}.
At times we have two absolute paths, and we need to derive the relative path from one to the other. This is actually the reverse transform of path.resolve.

</td>
</tr>
<tr>
<td>

<a id="removeext"></a> `removeExt()`

</td>
<td>

(`filename`, `ext`) => `string`

</td>
<td>

Removes the specific ext extension from filename, if it has it. Otherwise it leaves it as is. As in all upath functions, it be .ext or ext.

</td>
</tr>
<tr>
<td>

<a id="resolve"></a> `resolve()`

</td>
<td>

(...`pathSegments`) => `string`

</td>
<td>

The right-most parameter is considered {to}. Other parameters are considered an array of {from}.

Starting from leftmost {from} parameter, resolves {to} to an absolute path.

If {to} isn't already absolute, {from} arguments are prepended in right to left order, until an absolute path is found. If after using all {from} paths still no absolute path is found, the current working directory is used as well. The resulting path is normalized, and trailing slashes are removed unless the path gets resolved to the root directory.

</td>
</tr>
<tr>
<td>

<a id="sep"></a> `sep`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="tounix"></a> `toUnix()`

</td>
<td>

(`p`) => `string`

</td>
<td>

Just converts all `to/` and consolidates duplicates, without performing any normalization.

</td>
</tr>
<tr>
<td>

<a id="trimext"></a> `trimExt()`

</td>
<td>

(`filename`, `ignoreExts?`, `maxSize?`) => `string`

</td>
<td>

Trims a filename's extension.

Extensions are considered to be up to maxSize chars long, counting the dot (defaults to 7).

An Array of ignoreExts (eg ['.min']) prevents these from being considered as extension, thus are not trimmed.

</td>
</tr>
<tr>
<td>

<a id="win32"></a> `win32`

</td>
<td>

_typeof_ `win32`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="winpath"></a> `winPath()`

</td>
<td>

(`pathname`) => `string`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>
