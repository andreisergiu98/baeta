# ScanOptions

## Extends

- [`Options`](Options.md)

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="basename"></a> `basename?`

</td>
<td>

`boolean`

</td>
<td>

Allow glob patterns without slashes to match a file path based on its basename. Same behavior as [minimatch](https://github.com/isaacs/minimatch) option `matchBase`.

**Default**

```ts
false;
```

**Example**

```js
mm(["a/b.js", "a/c.md"], "*.js");
//=> []

mm(["a/b.js", "a/c.md"], "*.js", { matchBase: true });
//=> ['a/b.js']
```

</td>
<td>

[`Options`](Options.md).[`basename`](Options.md#basename)

</td>
</tr>
<tr>
<td>

<a id="bash"></a> `bash?`

</td>
<td>

`boolean`

</td>
<td>

Enabled by default, this option enforces bash-like behavior with stars immediately following a bracket expression.
Bash bracket expressions are similar to regex character classes, but unlike regex, a star following a bracket expression **does not repeat the bracketed characters**.
Instead, the star is treated the same as an other star.

**Default**

```ts
true;
```

**Example**

```js
var files = ["abc", "ajz"];
console.log(mm(files, "[a-c]*"));
//=> ['abc', 'ajz']

console.log(mm(files, "[a-c]*", { bash: false }));
```

</td>
<td>

[`Options`](Options.md).[`bash`](Options.md#bash)

</td>
</tr>
<tr>
<td>

<a id="capture"></a> `capture?`

</td>
<td>

`boolean`

</td>
<td>

Return regex matches in supporting methods.

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](Options.md).[`capture`](Options.md#capture)

</td>
</tr>
<tr>
<td>

<a id="contains"></a> `contains?`

</td>
<td>

`boolean`

</td>
<td>

Allows glob to match any part of the given string(s).

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](Options.md).[`contains`](Options.md#contains)

</td>
</tr>
<tr>
<td>

<a id="cwd"></a> `cwd?`

</td>
<td>

`string`

</td>
<td>

Current working directory. Used by `picomatch.split()`

**Default**

```ts
process.cwd();
```

</td>
<td>

[`Options`](Options.md).[`cwd`](Options.md#cwd)

</td>
</tr>
<tr>
<td>

<a id="debug"></a> `debug?`

</td>
<td>

`boolean`

</td>
<td>

Debug regular expressions when an error is thrown.

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](Options.md).[`debug`](Options.md#debug)

</td>
</tr>
<tr>
<td>

<a id="dot"></a> `dot?`

</td>
<td>

`boolean`

</td>
<td>

Match dotfiles. Otherwise dotfiles are ignored unless a `.` is explicitly defined in the pattern.

**Default**

```ts
false;
```

</td>
<td>

[`Options`](Options.md).[`dot`](Options.md#dot)

</td>
</tr>
<tr>
<td>

<a id="expandrange"></a> `expandRange?`

</td>
<td>

(`left`, `right`, `options`) => `string`

</td>
<td>

Custom function for expanding ranges in brace patterns, such as `{a..z}`.
The function receives the range values as two arguments, and it must return a string to be used in the generated regex.
It's recommended that returned strings be wrapped in parentheses. This option is overridden by the expandBrace option.

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](Options.md).[`expandRange`](Options.md#expandrange)

</td>
</tr>
<tr>
<td>

<a id="failglob"></a> `failglob?`

</td>
<td>

`boolean`

</td>
<td>

Similar to the `--failglob` behavior in Bash, throws an error when no matches are found.

**Default**

```ts
false;
```

</td>
<td>

[`Options`](Options.md).[`failglob`](Options.md#failglob)

</td>
</tr>
<tr>
<td>

<a id="fastpaths"></a> `fastpaths?`

</td>
<td>

`boolean`

</td>
<td>

To speed up processing, full parsing is skipped for a handful common glob patterns. Disable this behavior by setting this option to false.

**Default**

```ts
true;
```

</td>
<td>

[`Options`](Options.md).[`fastpaths`](Options.md#fastpaths)

</td>
</tr>
<tr>
<td>

<a id="flags"></a> `flags?`

</td>
<td>

`boolean`

</td>
<td>

Regex flags to use in the generated regex. If defined, the `nocase` option will be overridden.

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](Options.md).[`flags`](Options.md#flags)

</td>
</tr>
<tr>
<td>

<a id="format"></a> `format?`

</td>
<td>

(`returnedString`) => `string`

</td>
<td>

Custom function for formatting the returned string. This is useful for removing leading slashes, converting Windows paths to Posix paths, etc.

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](Options.md).[`format`](Options.md#format)

</td>
</tr>
<tr>
<td>

<a id="ignore"></a> `ignore?`

</td>
<td>

`string` \| readonly `string`[]

</td>
<td>

One or more glob patterns for excluding strings that should not be matched from the result.

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](Options.md).[`ignore`](Options.md#ignore)

</td>
</tr>
<tr>
<td>

<a id="keepquotes"></a> `keepQuotes?`

</td>
<td>

`boolean`

</td>
<td>

Retain quotes in the generated regex, since quotes may also be used as an alternative to backslashes.

**Default**

```ts
false;
```

</td>
<td>

[`Options`](Options.md).[`keepQuotes`](Options.md#keepquotes)

</td>
</tr>
<tr>
<td>

<a id="literalbrackets"></a> `literalBrackets?`

</td>
<td>

`boolean`

</td>
<td>

When `true`, brackets in the glob pattern will be escaped so that only literal brackets will be matched.

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](Options.md).[`literalBrackets`](Options.md#literalbrackets)

</td>
</tr>
<tr>
<td>

<a id="lookbehinds"></a> `lookbehinds?`

</td>
<td>

`boolean`

</td>
<td>

Support regex positive and negative lookbehinds. Note that you must be using Node 8.1.10 or higher to enable regex lookbehinds.

**Default**

```ts
true;
```

</td>
<td>

[`Options`](Options.md).[`lookbehinds`](Options.md#lookbehinds)

</td>
</tr>
<tr>
<td>

<a id="matchbase"></a> `matchBase?`

</td>
<td>

`boolean`

</td>
<td>

Alias for `basename`.

**Default**

```ts
false;
```

</td>
<td>

[`Options`](Options.md).[`matchBase`](Options.md#matchbase)

</td>
</tr>
<tr>
<td>

<a id="maxlength"></a> `maxLength?`

</td>
<td>

`number`

</td>
<td>

Limit the max length of the input string. An error is thrown if the input string is longer than this value.

**Default**

```ts
65536;
```

</td>
<td>

[`Options`](Options.md).[`maxLength`](Options.md#maxlength)

</td>
</tr>
<tr>
<td>

<a id="nobrace"></a> `nobrace?`

</td>
<td>

`boolean`

</td>
<td>

Disable brace matching, so that `{a,b}` and `{1..3}` would be treated as literal characters.

**Default**

```ts
false;
```

</td>
<td>

[`Options`](Options.md).[`nobrace`](Options.md#nobrace)

</td>
</tr>
<tr>
<td>

<a id="nobracket"></a> `nobracket?`

</td>
<td>

`boolean`

</td>
<td>

Disable matching with regex brackets.

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](Options.md).[`nobracket`](Options.md#nobracket)

</td>
</tr>
<tr>
<td>

<a id="nocase"></a> `nocase?`

</td>
<td>

`boolean`

</td>
<td>

Perform case-insensitive matching. Equivalent to the regex `i` flag.
Note that this option is ignored when the `flags` option is defined.

**Default**

```ts
false;
```

</td>
<td>

[`Options`](Options.md).[`nocase`](Options.md#nocase)

</td>
</tr>
<tr>
<td>

<a id="noext"></a> `noext?`

</td>
<td>

`boolean`

</td>
<td>

Alias for `noextglob`

**Default**

```ts
false;
```

</td>
<td>

[`Options`](Options.md).[`noext`](Options.md#noext)

</td>
</tr>
<tr>
<td>

<a id="noextglob"></a> `noextglob?`

</td>
<td>

`boolean`

</td>
<td>

Disable support for matching with extglobs (like `+(a|b)`)

**Default**

```ts
false;
```

</td>
<td>

[`Options`](Options.md).[`noextglob`](Options.md#noextglob)

</td>
</tr>
<tr>
<td>

<a id="noglobstar"></a> `noglobstar?`

</td>
<td>

`boolean`

</td>
<td>

Disable matching with globstars (`**`).

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](Options.md).[`noglobstar`](Options.md#noglobstar)

</td>
</tr>
<tr>
<td>

<a id="nonegate"></a> `nonegate?`

</td>
<td>

`boolean`

</td>
<td>

Disallow negation (`!`) patterns, and treat leading `!` as a literal character to match.

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](Options.md).[`nonegate`](Options.md#nonegate)

</td>
</tr>
<tr>
<td>

<a id="noquantifiers"></a> `noquantifiers?`

</td>
<td>

`boolean`

</td>
<td>

Disable support for regex quantifiers (like `a{1,2}`) and treat them as brace patterns to be expanded.

**Default**

```ts
false;
```

</td>
<td>

[`Options`](Options.md).[`noquantifiers`](Options.md#noquantifiers)

</td>
</tr>
<tr>
<td>

<a id="onignore"></a> `onIgnore?`

</td>
<td>

(`item`) => `void`

</td>
<td>

Function to be called on ignored items.

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](Options.md).[`onIgnore`](Options.md#onignore)

</td>
</tr>
<tr>
<td>

<a id="onmatch"></a> `onMatch?`

</td>
<td>

(`item`) => `void`

</td>
<td>

Function to be called on matched items.

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](Options.md).[`onMatch`](Options.md#onmatch)

</td>
</tr>
<tr>
<td>

<a id="onresult"></a> `onResult?`

</td>
<td>

(`item`) => `void`

</td>
<td>

Function to be called on all items, regardless of whether or not they are matched or ignored.

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](Options.md).[`onResult`](Options.md#onresult)

</td>
</tr>
<tr>
<td>

<a id="parts"></a> `parts?`

</td>
<td>

`boolean`

</td>
<td>

When `true`, the returned object will include an array of strings representing each path "segment" in the scanned glob pattern.
This is automatically enabled when `options.tokens` is `true`.

**Default**

```ts
false;
```

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="posix"></a> `posix?`

</td>
<td>

`boolean`

</td>
<td>

Support POSIX character classes ("posix brackets").

**Default**

```ts
false;
```

</td>
<td>

[`Options`](Options.md).[`posix`](Options.md#posix)

</td>
</tr>
<tr>
<td>

<a id="prepend"></a> `prepend?`

</td>
<td>

`boolean`

</td>
<td>

String to prepend to the generated regex used for matching.

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](Options.md).[`prepend`](Options.md#prepend)

</td>
</tr>
<tr>
<td>

<a id="regex"></a> `regex?`

</td>
<td>

`boolean`

</td>
<td>

Use regular expression rules for `+` (instead of matching literal `+`), and for stars that follow closing parentheses or brackets (as in `)*` and `]*`).

**Default**

```ts
false;
```

</td>
<td>

[`Options`](Options.md).[`regex`](Options.md#regex)

</td>
</tr>
<tr>
<td>

<a id="strictbrackets"></a> `strictBrackets?`

</td>
<td>

`boolean`

</td>
<td>

Throw an error if brackets, braces, or parens are imbalanced.

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](Options.md).[`strictBrackets`](Options.md#strictbrackets)

</td>
</tr>
<tr>
<td>

<a id="strictslashes"></a> `strictSlashes?`

</td>
<td>

`boolean`

</td>
<td>

When true, picomatch won't match trailing slashes with single stars.

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](Options.md).[`strictSlashes`](Options.md#strictslashes)

</td>
</tr>
<tr>
<td>

<a id="tokens"></a> `tokens?`

</td>
<td>

`boolean`

</td>
<td>

When `true`, the returned object will include an array of `tokens` (objects), representing each path "segment" in the scanned glob pattern.

**Default**

```ts
false;
```

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="unescape"></a> `unescape?`

</td>
<td>

`boolean`

</td>
<td>

Remove backslashes from returned matches.

**Default**

```ts
undefined;
```

**Example**

In this example we want to match a literal `*`:

```js
mm.match(["abc", "a\\*c"], "a\\*c");
//=> ['a\\*c']

mm.match(["abc", "a\\*c"], "a\\*c", { unescape: true });
//=> ['a*c']
```

</td>
<td>

[`Options`](Options.md).[`unescape`](Options.md#unescape)

</td>
</tr>
<tr>
<td>

<a id="windows"></a> `windows?`

</td>
<td>

`boolean`

</td>
<td>

Convert all slashes in file paths to forward slashes. This does not convert slashes in the glob pattern itself

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](Options.md).[`windows`](Options.md#windows)

</td>
</tr>
</tbody>
</table>
