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

`glob`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`input`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`output`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`regex`

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

- [`ScanOptions`](micromatch.md#scanoptions)

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

`basename?`

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

`bash?`

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

`capture?`

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

`contains?`

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

`cwd?`

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

`debug?`

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

`dot?`

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

`expandRange?`

</td>
<td>

(`left`: `string`, `right`: `string`, `options`: [`Options`](micromatch.md#options)) => `string`

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

`failglob?`

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

`fastpaths?`

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

`flags?`

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

`format?`

</td>
<td>

(`returnedString`: `string`) => `string`

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

`ignore?`

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

`keepQuotes?`

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

`literalBrackets?`

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

`lookbehinds?`

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

`matchBase?`

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

`maxLength?`

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

`nobrace?`

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

`nobracket?`

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

`nocase?`

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

`noext?`

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

`noextglob?`

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

`noglobstar?`

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

`nonegate?`

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

`noquantifiers?`

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

`onIgnore?`

</td>
<td>

(`item`: [`Item`](micromatch.md#item)) => `void`

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

`onMatch?`

</td>
<td>

(`item`: [`Item`](micromatch.md#item)) => `void`

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

`onResult?`

</td>
<td>

(`item`: [`Item`](micromatch.md#item)) => `void`

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

`posix?`

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

`prepend?`

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

`regex?`

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

`strictBrackets?`

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

`strictSlashes?`

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

`unescape?`

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

`windows?`

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

- [`ScanInfoWithParts`](micromatch.md#scaninfowithparts)

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

`base`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`glob`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`input`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`isBrace`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`isBracket`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`isExtglob`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`isGlob`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`isGlobstar`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`negated`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`negatedExtglob`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`prefix`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`start`

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

`depth`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`isGlob`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`backslashes?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`isBrace?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`isBracket?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`isExtglob?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`isGlobstar?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`isPrefix?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`negated?`

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

- [`ScanInfo`](micromatch.md#scaninfo)

#### Extended by

- [`ScanInfoWithTokens`](micromatch.md#scaninfowithtokens)

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

`base`

</td>
<td>

`string`

</td>
<td>

[`ScanInfo`](micromatch.md#scaninfo).[`base`](micromatch.md#base)

</td>
</tr>
<tr>
<td>

`glob`

</td>
<td>

`string`

</td>
<td>

[`ScanInfo`](micromatch.md#scaninfo).[`glob`](micromatch.md#glob-1)

</td>
</tr>
<tr>
<td>

`input`

</td>
<td>

`string`

</td>
<td>

[`ScanInfo`](micromatch.md#scaninfo).[`input`](micromatch.md#input-1)

</td>
</tr>
<tr>
<td>

`isBrace`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfo`](micromatch.md#scaninfo).[`isBrace`](micromatch.md#isbrace)

</td>
</tr>
<tr>
<td>

`isBracket`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfo`](micromatch.md#scaninfo).[`isBracket`](micromatch.md#isbracket)

</td>
</tr>
<tr>
<td>

`isExtglob`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfo`](micromatch.md#scaninfo).[`isExtglob`](micromatch.md#isextglob)

</td>
</tr>
<tr>
<td>

`isGlob`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfo`](micromatch.md#scaninfo).[`isGlob`](micromatch.md#isglob)

</td>
</tr>
<tr>
<td>

`isGlobstar`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfo`](micromatch.md#scaninfo).[`isGlobstar`](micromatch.md#isglobstar)

</td>
</tr>
<tr>
<td>

`negated`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfo`](micromatch.md#scaninfo).[`negated`](micromatch.md#negated)

</td>
</tr>
<tr>
<td>

`negatedExtglob`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfo`](micromatch.md#scaninfo).[`negatedExtglob`](micromatch.md#negatedextglob)

</td>
</tr>
<tr>
<td>

`parts`

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

`prefix`

</td>
<td>

`string`

</td>
<td>

[`ScanInfo`](micromatch.md#scaninfo).[`prefix`](micromatch.md#prefix)

</td>
</tr>
<tr>
<td>

`slashes`

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

`start`

</td>
<td>

`number`

</td>
<td>

[`ScanInfo`](micromatch.md#scaninfo).[`start`](micromatch.md#start)

</td>
</tr>
</tbody>
</table>

---

### ScanInfoWithTokens

#### Extends

- [`ScanInfoWithParts`](micromatch.md#scaninfowithparts)

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

`base`

</td>
<td>

`string`

</td>
<td>

[`ScanInfoWithParts`](micromatch.md#scaninfowithparts).[`base`](micromatch.md#base-1)

</td>
</tr>
<tr>
<td>

`glob`

</td>
<td>

`string`

</td>
<td>

[`ScanInfoWithParts`](micromatch.md#scaninfowithparts).[`glob`](micromatch.md#glob-2)

</td>
</tr>
<tr>
<td>

`input`

</td>
<td>

`string`

</td>
<td>

[`ScanInfoWithParts`](micromatch.md#scaninfowithparts).[`input`](micromatch.md#input-2)

</td>
</tr>
<tr>
<td>

`isBrace`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfoWithParts`](micromatch.md#scaninfowithparts).[`isBrace`](micromatch.md#isbrace-2)

</td>
</tr>
<tr>
<td>

`isBracket`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfoWithParts`](micromatch.md#scaninfowithparts).[`isBracket`](micromatch.md#isbracket-2)

</td>
</tr>
<tr>
<td>

`isExtglob`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfoWithParts`](micromatch.md#scaninfowithparts).[`isExtglob`](micromatch.md#isextglob-2)

</td>
</tr>
<tr>
<td>

`isGlob`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfoWithParts`](micromatch.md#scaninfowithparts).[`isGlob`](micromatch.md#isglob-2)

</td>
</tr>
<tr>
<td>

`isGlobstar`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfoWithParts`](micromatch.md#scaninfowithparts).[`isGlobstar`](micromatch.md#isglobstar-2)

</td>
</tr>
<tr>
<td>

`maxDepth`

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

`negated`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfoWithParts`](micromatch.md#scaninfowithparts).[`negated`](micromatch.md#negated-2)

</td>
</tr>
<tr>
<td>

`negatedExtglob`

</td>
<td>

`boolean`

</td>
<td>

[`ScanInfoWithParts`](micromatch.md#scaninfowithparts).[`negatedExtglob`](micromatch.md#negatedextglob-1)

</td>
</tr>
<tr>
<td>

`parts`

</td>
<td>

`string`[]

</td>
<td>

[`ScanInfoWithParts`](micromatch.md#scaninfowithparts).[`parts`](micromatch.md#parts)

</td>
</tr>
<tr>
<td>

`prefix`

</td>
<td>

`string`

</td>
<td>

[`ScanInfoWithParts`](micromatch.md#scaninfowithparts).[`prefix`](micromatch.md#prefix-1)

</td>
</tr>
<tr>
<td>

`slashes`

</td>
<td>

`number`[]

</td>
<td>

[`ScanInfoWithParts`](micromatch.md#scaninfowithparts).[`slashes`](micromatch.md#slashes)

</td>
</tr>
<tr>
<td>

`start`

</td>
<td>

`number`

</td>
<td>

[`ScanInfoWithParts`](micromatch.md#scaninfowithparts).[`start`](micromatch.md#start-1)

</td>
</tr>
<tr>
<td>

`tokens`

</td>
<td>

[`ScanInfoToken`](micromatch.md#scaninfotoken)[]

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

- [`Options`](micromatch.md#options)

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

`basename?`

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

[`Options`](micromatch.md#options).[`basename`](micromatch.md#basename)

</td>
</tr>
<tr>
<td>

`bash?`

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

[`Options`](micromatch.md#options).[`bash`](micromatch.md#bash)

</td>
</tr>
<tr>
<td>

`capture?`

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

[`Options`](micromatch.md#options).[`capture`](micromatch.md#capture)

</td>
</tr>
<tr>
<td>

`contains?`

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

[`Options`](micromatch.md#options).[`contains`](micromatch.md#contains)

</td>
</tr>
<tr>
<td>

`cwd?`

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

[`Options`](micromatch.md#options).[`cwd`](micromatch.md#cwd)

</td>
</tr>
<tr>
<td>

`debug?`

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

[`Options`](micromatch.md#options).[`debug`](micromatch.md#debug)

</td>
</tr>
<tr>
<td>

`dot?`

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

[`Options`](micromatch.md#options).[`dot`](micromatch.md#dot)

</td>
</tr>
<tr>
<td>

`expandRange?`

</td>
<td>

(`left`: `string`, `right`: `string`, `options`: [`Options`](micromatch.md#options)) => `string`

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

[`Options`](micromatch.md#options).[`expandRange`](micromatch.md#expandrange)

</td>
</tr>
<tr>
<td>

`failglob?`

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

[`Options`](micromatch.md#options).[`failglob`](micromatch.md#failglob)

</td>
</tr>
<tr>
<td>

`fastpaths?`

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

[`Options`](micromatch.md#options).[`fastpaths`](micromatch.md#fastpaths)

</td>
</tr>
<tr>
<td>

`flags?`

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

[`Options`](micromatch.md#options).[`flags`](micromatch.md#flags)

</td>
</tr>
<tr>
<td>

`format?`

</td>
<td>

(`returnedString`: `string`) => `string`

</td>
<td>

Custom function for formatting the returned string. This is useful for removing leading slashes, converting Windows paths to Posix paths, etc.

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](micromatch.md#options).[`format`](micromatch.md#format)

</td>
</tr>
<tr>
<td>

`ignore?`

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

[`Options`](micromatch.md#options).[`ignore`](micromatch.md#ignore)

</td>
</tr>
<tr>
<td>

`keepQuotes?`

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

[`Options`](micromatch.md#options).[`keepQuotes`](micromatch.md#keepquotes)

</td>
</tr>
<tr>
<td>

`literalBrackets?`

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

[`Options`](micromatch.md#options).[`literalBrackets`](micromatch.md#literalbrackets)

</td>
</tr>
<tr>
<td>

`lookbehinds?`

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

[`Options`](micromatch.md#options).[`lookbehinds`](micromatch.md#lookbehinds)

</td>
</tr>
<tr>
<td>

`matchBase?`

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

[`Options`](micromatch.md#options).[`matchBase`](micromatch.md#matchbase)

</td>
</tr>
<tr>
<td>

`maxLength?`

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

[`Options`](micromatch.md#options).[`maxLength`](micromatch.md#maxlength)

</td>
</tr>
<tr>
<td>

`nobrace?`

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

[`Options`](micromatch.md#options).[`nobrace`](micromatch.md#nobrace)

</td>
</tr>
<tr>
<td>

`nobracket?`

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

[`Options`](micromatch.md#options).[`nobracket`](micromatch.md#nobracket)

</td>
</tr>
<tr>
<td>

`nocase?`

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

[`Options`](micromatch.md#options).[`nocase`](micromatch.md#nocase)

</td>
</tr>
<tr>
<td>

`noext?`

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

[`Options`](micromatch.md#options).[`noext`](micromatch.md#noext)

</td>
</tr>
<tr>
<td>

`noextglob?`

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

[`Options`](micromatch.md#options).[`noextglob`](micromatch.md#noextglob)

</td>
</tr>
<tr>
<td>

`noglobstar?`

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

[`Options`](micromatch.md#options).[`noglobstar`](micromatch.md#noglobstar)

</td>
</tr>
<tr>
<td>

`nonegate?`

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

[`Options`](micromatch.md#options).[`nonegate`](micromatch.md#nonegate)

</td>
</tr>
<tr>
<td>

`noquantifiers?`

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

[`Options`](micromatch.md#options).[`noquantifiers`](micromatch.md#noquantifiers)

</td>
</tr>
<tr>
<td>

`onIgnore?`

</td>
<td>

(`item`: [`Item`](micromatch.md#item)) => `void`

</td>
<td>

Function to be called on ignored items.

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](micromatch.md#options).[`onIgnore`](micromatch.md#onignore)

</td>
</tr>
<tr>
<td>

`onMatch?`

</td>
<td>

(`item`: [`Item`](micromatch.md#item)) => `void`

</td>
<td>

Function to be called on matched items.

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](micromatch.md#options).[`onMatch`](micromatch.md#onmatch)

</td>
</tr>
<tr>
<td>

`onResult?`

</td>
<td>

(`item`: [`Item`](micromatch.md#item)) => `void`

</td>
<td>

Function to be called on all items, regardless of whether or not they are matched or ignored.

**Default**

```ts
undefined;
```

</td>
<td>

[`Options`](micromatch.md#options).[`onResult`](micromatch.md#onresult)

</td>
</tr>
<tr>
<td>

`parts?`

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

`posix?`

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

[`Options`](micromatch.md#options).[`posix`](micromatch.md#posix)

</td>
</tr>
<tr>
<td>

`prepend?`

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

[`Options`](micromatch.md#options).[`prepend`](micromatch.md#prepend)

</td>
</tr>
<tr>
<td>

`regex?`

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

[`Options`](micromatch.md#options).[`regex`](micromatch.md#regex-1)

</td>
</tr>
<tr>
<td>

`strictBrackets?`

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

[`Options`](micromatch.md#options).[`strictBrackets`](micromatch.md#strictbrackets)

</td>
</tr>
<tr>
<td>

`strictSlashes?`

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

[`Options`](micromatch.md#options).[`strictSlashes`](micromatch.md#strictslashes)

</td>
</tr>
<tr>
<td>

`tokens?`

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

`unescape?`

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

[`Options`](micromatch.md#options).[`unescape`](micromatch.md#unescape)

</td>
</tr>
<tr>
<td>

`windows?`

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

[`Options`](micromatch.md#options).[`windows`](micromatch.md#windows)

</td>
</tr>
</tbody>
</table>
