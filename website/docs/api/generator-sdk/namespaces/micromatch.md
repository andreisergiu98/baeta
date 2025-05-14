# micromatch

## Interfaces

### Item

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="glob"></a> `glob`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="input"></a> `input`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="output"></a> `output`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="regex"></a> `regex`

</td>
<td>

`RegExp`

</td>
</tr>
</tbody>
</table>

---

### Options

#### Extended by

- [`ScanOptions`](#scanoptions)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
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
</tr>
<tr>
<td>

<a id="regex-1"></a> `regex?`

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
</tr>
</tbody>
</table>

---

### ScanInfo

#### Extended by

- [`ScanInfoWithParts`](#scaninfowithparts)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="base"></a> `base`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="glob-1"></a> `glob`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="input-1"></a> `input`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="isbrace"></a> `isBrace`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="isbracket"></a> `isBracket`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="isextglob"></a> `isExtglob`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="isglob"></a> `isGlob`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="isglobstar"></a> `isGlobstar`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="negated"></a> `negated`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="negatedextglob"></a> `negatedExtglob`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="prefix"></a> `prefix`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="start"></a> `start`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

---

### ScanInfoToken

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="depth"></a> `depth`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

<a id="isglob-1"></a> `isGlob`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="value"></a> `value`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="backslashes"></a> `backslashes?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="isbrace-1"></a> `isBrace?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="isbracket-1"></a> `isBracket?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="isextglob-1"></a> `isExtglob?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="isglobstar-1"></a> `isGlobstar?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="isprefix"></a> `isPrefix?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

<a id="negated-1"></a> `negated?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

---

### ScanInfoWithParts

#### Extends

- [`ScanInfo`](#scaninfo)

#### Extended by

- [`ScanInfoWithTokens`](#scaninfowithtokens)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="base-1"></a> `base`

</td>
<td>

`string`

</td>
<td>

[`ScanInfo`](#scaninfo).[`base`](#base)

</td>
</tr>
<tr>
<td>

<a id="glob-2"></a> `glob`

</td>
<td>

`string`

</td>
<td>

[`ScanInfo`](#scaninfo).[`glob`](#glob-1)

</td>
</tr>
<tr>
<td>

<a id="input-2"></a> `input`

</td>
<td>

`string`

</td>
<td>

[`ScanInfo`](#scaninfo).[`input`](#input-1)

</td>
</tr>
<tr>
<td>

<a id="isbrace-2"></a> `isBrace`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfo`](#scaninfo).[`isBrace`](#isbrace)

</td>
</tr>
<tr>
<td>

<a id="isbracket-2"></a> `isBracket`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfo`](#scaninfo).[`isBracket`](#isbracket)

</td>
</tr>
<tr>
<td>

<a id="isextglob-2"></a> `isExtglob`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfo`](#scaninfo).[`isExtglob`](#isextglob)

</td>
</tr>
<tr>
<td>

<a id="isglob-2"></a> `isGlob`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfo`](#scaninfo).[`isGlob`](#isglob)

</td>
</tr>
<tr>
<td>

<a id="isglobstar-2"></a> `isGlobstar`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfo`](#scaninfo).[`isGlobstar`](#isglobstar)

</td>
</tr>
<tr>
<td>

<a id="negated-2"></a> `negated`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfo`](#scaninfo).[`negated`](#negated)

</td>
</tr>
<tr>
<td>

<a id="negatedextglob-1"></a> `negatedExtglob`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfo`](#scaninfo).[`negatedExtglob`](#negatedextglob)

</td>
</tr>
<tr>
<td>

<a id="parts"></a> `parts`

</td>
<td>

`string`[]

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="prefix-1"></a> `prefix`

</td>
<td>

`string`

</td>
<td>

[`ScanInfo`](#scaninfo).[`prefix`](#prefix)

</td>
</tr>
<tr>
<td>

<a id="slashes"></a> `slashes`

</td>
<td>

`number`[]

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="start-1"></a> `start`

</td>
<td>

`number`

</td>
<td>

[`ScanInfo`](#scaninfo).[`start`](#start)

</td>
</tr>
</tbody>
</table>

---

### ScanInfoWithTokens

#### Extends

- [`ScanInfoWithParts`](#scaninfowithparts)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="base-2"></a> `base`

</td>
<td>

`string`

</td>
<td>

[`ScanInfoWithParts`](#scaninfowithparts).[`base`](#base-1)

</td>
</tr>
<tr>
<td>

<a id="glob-3"></a> `glob`

</td>
<td>

`string`

</td>
<td>

[`ScanInfoWithParts`](#scaninfowithparts).[`glob`](#glob-2)

</td>
</tr>
<tr>
<td>

<a id="input-3"></a> `input`

</td>
<td>

`string`

</td>
<td>

[`ScanInfoWithParts`](#scaninfowithparts).[`input`](#input-2)

</td>
</tr>
<tr>
<td>

<a id="isbrace-3"></a> `isBrace`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfoWithParts`](#scaninfowithparts).[`isBrace`](#isbrace-2)

</td>
</tr>
<tr>
<td>

<a id="isbracket-3"></a> `isBracket`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfoWithParts`](#scaninfowithparts).[`isBracket`](#isbracket-2)

</td>
</tr>
<tr>
<td>

<a id="isextglob-3"></a> `isExtglob`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfoWithParts`](#scaninfowithparts).[`isExtglob`](#isextglob-2)

</td>
</tr>
<tr>
<td>

<a id="isglob-3"></a> `isGlob`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfoWithParts`](#scaninfowithparts).[`isGlob`](#isglob-2)

</td>
</tr>
<tr>
<td>

<a id="isglobstar-3"></a> `isGlobstar`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfoWithParts`](#scaninfowithparts).[`isGlobstar`](#isglobstar-2)

</td>
</tr>
<tr>
<td>

<a id="maxdepth"></a> `maxDepth`

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="negated-3"></a> `negated`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfoWithParts`](#scaninfowithparts).[`negated`](#negated-2)

</td>
</tr>
<tr>
<td>

<a id="negatedextglob-2"></a> `negatedExtglob`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfoWithParts`](#scaninfowithparts).[`negatedExtglob`](#negatedextglob-1)

</td>
</tr>
<tr>
<td>

<a id="parts-1"></a> `parts`

</td>
<td>

`string`[]

</td>
<td>

[`ScanInfoWithParts`](#scaninfowithparts).[`parts`](#parts)

</td>
</tr>
<tr>
<td>

<a id="prefix-2"></a> `prefix`

</td>
<td>

`string`

</td>
<td>

[`ScanInfoWithParts`](#scaninfowithparts).[`prefix`](#prefix-1)

</td>
</tr>
<tr>
<td>

<a id="slashes-1"></a> `slashes`

</td>
<td>

`number`[]

</td>
<td>

[`ScanInfoWithParts`](#scaninfowithparts).[`slashes`](#slashes)

</td>
</tr>
<tr>
<td>

<a id="start-2"></a> `start`

</td>
<td>

`number`

</td>
<td>

[`ScanInfoWithParts`](#scaninfowithparts).[`start`](#start-1)

</td>
</tr>
<tr>
<td>

<a id="tokens"></a> `tokens`

</td>
<td>

[`ScanInfoToken`](#scaninfotoken)[]

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

---

### ScanOptions

#### Extends

- [`Options`](#options)

#### Properties

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

<a id="basename-1"></a> `basename?`

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

[`Options`](#options).[`basename`](#basename)

</td>
</tr>
<tr>
<td>

<a id="bash-1"></a> `bash?`

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

[`Options`](#options).[`bash`](#bash)

</td>
</tr>
<tr>
<td>

<a id="capture-1"></a> `capture?`

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

[`Options`](#options).[`capture`](#capture)

</td>
</tr>
<tr>
<td>

<a id="contains-1"></a> `contains?`

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

[`Options`](#options).[`contains`](#contains)

</td>
</tr>
<tr>
<td>

<a id="cwd-1"></a> `cwd?`

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

[`Options`](#options).[`cwd`](#cwd)

</td>
</tr>
<tr>
<td>

<a id="debug-1"></a> `debug?`

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

[`Options`](#options).[`debug`](#debug)

</td>
</tr>
<tr>
<td>

<a id="dot-1"></a> `dot?`

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

[`Options`](#options).[`dot`](#dot)

</td>
</tr>
<tr>
<td>

<a id="expandrange-1"></a> `expandRange?`

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

[`Options`](#options).[`expandRange`](#expandrange)

</td>
</tr>
<tr>
<td>

<a id="failglob-1"></a> `failglob?`

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

[`Options`](#options).[`failglob`](#failglob)

</td>
</tr>
<tr>
<td>

<a id="fastpaths-1"></a> `fastpaths?`

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

[`Options`](#options).[`fastpaths`](#fastpaths)

</td>
</tr>
<tr>
<td>

<a id="flags-1"></a> `flags?`

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

[`Options`](#options).[`flags`](#flags)

</td>
</tr>
<tr>
<td>

<a id="format-1"></a> `format?`

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

[`Options`](#options).[`format`](#format)

</td>
</tr>
<tr>
<td>

<a id="ignore-1"></a> `ignore?`

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

[`Options`](#options).[`ignore`](#ignore)

</td>
</tr>
<tr>
<td>

<a id="keepquotes-1"></a> `keepQuotes?`

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

[`Options`](#options).[`keepQuotes`](#keepquotes)

</td>
</tr>
<tr>
<td>

<a id="literalbrackets-1"></a> `literalBrackets?`

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

[`Options`](#options).[`literalBrackets`](#literalbrackets)

</td>
</tr>
<tr>
<td>

<a id="lookbehinds-1"></a> `lookbehinds?`

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

[`Options`](#options).[`lookbehinds`](#lookbehinds)

</td>
</tr>
<tr>
<td>

<a id="matchbase-1"></a> `matchBase?`

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

[`Options`](#options).[`matchBase`](#matchbase)

</td>
</tr>
<tr>
<td>

<a id="maxlength-1"></a> `maxLength?`

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

[`Options`](#options).[`maxLength`](#maxlength)

</td>
</tr>
<tr>
<td>

<a id="nobrace-1"></a> `nobrace?`

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

[`Options`](#options).[`nobrace`](#nobrace)

</td>
</tr>
<tr>
<td>

<a id="nobracket-1"></a> `nobracket?`

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

[`Options`](#options).[`nobracket`](#nobracket)

</td>
</tr>
<tr>
<td>

<a id="nocase-1"></a> `nocase?`

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

[`Options`](#options).[`nocase`](#nocase)

</td>
</tr>
<tr>
<td>

<a id="noext-1"></a> `noext?`

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

[`Options`](#options).[`noext`](#noext)

</td>
</tr>
<tr>
<td>

<a id="noextglob-1"></a> `noextglob?`

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

[`Options`](#options).[`noextglob`](#noextglob)

</td>
</tr>
<tr>
<td>

<a id="noglobstar-1"></a> `noglobstar?`

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

[`Options`](#options).[`noglobstar`](#noglobstar)

</td>
</tr>
<tr>
<td>

<a id="nonegate-1"></a> `nonegate?`

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

[`Options`](#options).[`nonegate`](#nonegate)

</td>
</tr>
<tr>
<td>

<a id="noquantifiers-1"></a> `noquantifiers?`

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

[`Options`](#options).[`noquantifiers`](#noquantifiers)

</td>
</tr>
<tr>
<td>

<a id="onignore-1"></a> `onIgnore?`

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

[`Options`](#options).[`onIgnore`](#onignore)

</td>
</tr>
<tr>
<td>

<a id="onmatch-1"></a> `onMatch?`

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

[`Options`](#options).[`onMatch`](#onmatch)

</td>
</tr>
<tr>
<td>

<a id="onresult-1"></a> `onResult?`

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

[`Options`](#options).[`onResult`](#onresult)

</td>
</tr>
<tr>
<td>

<a id="parts-2"></a> `parts?`

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

<a id="posix-1"></a> `posix?`

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

[`Options`](#options).[`posix`](#posix)

</td>
</tr>
<tr>
<td>

<a id="prepend-1"></a> `prepend?`

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

[`Options`](#options).[`prepend`](#prepend)

</td>
</tr>
<tr>
<td>

<a id="regex-2"></a> `regex?`

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

[`Options`](#options).[`regex`](#regex-1)

</td>
</tr>
<tr>
<td>

<a id="strictbrackets-1"></a> `strictBrackets?`

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

[`Options`](#options).[`strictBrackets`](#strictbrackets)

</td>
</tr>
<tr>
<td>

<a id="strictslashes-1"></a> `strictSlashes?`

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

[`Options`](#options).[`strictSlashes`](#strictslashes)

</td>
</tr>
<tr>
<td>

<a id="tokens-1"></a> `tokens?`

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

<a id="unescape-1"></a> `unescape?`

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

[`Options`](#options).[`unescape`](#unescape)

</td>
</tr>
<tr>
<td>

<a id="windows-1"></a> `windows?`

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

[`Options`](#options).[`windows`](#windows)

</td>
</tr>
</tbody>
</table>
