# Interface: Options

## Extended by

- [`ScanOptions`](ScanOptions.md)

## Properties

### basename?

> `optional` **basename**: `boolean`

Allow glob patterns without slashes to match a file path based on its basename. Same behavior as [minimatch](https://github.com/isaacs/minimatch) option `matchBase`.

#### Default

```ts
false
```

#### Example

```js
mm(['a/b.js', 'a/c.md'], '*.js');
//=> []

mm(['a/b.js', 'a/c.md'], '*.js', {matchBase: true});
//=> ['a/b.js']
```

***

### bash?

> `optional` **bash**: `boolean`

Enabled by default, this option enforces bash-like behavior with stars immediately following a bracket expression.
Bash bracket expressions are similar to regex character classes, but unlike regex, a star following a bracket expression **does not repeat the bracketed characters**.
Instead, the star is treated the same as an other star.

#### Default

```ts
true
```

#### Example

```js
var files = ['abc', 'ajz'];
console.log(mm(files, '[a-c]*'));
//=> ['abc', 'ajz']

console.log(mm(files, '[a-c]*', {bash: false}));
```

***

### capture?

> `optional` **capture**: `boolean`

Return regex matches in supporting methods.

#### Default

```ts
undefined
```

***

### contains?

> `optional` **contains**: `boolean`

Allows glob to match any part of the given string(s).

#### Default

```ts
undefined
```

***

### cwd?

> `optional` **cwd**: `string`

Current working directory. Used by `picomatch.split()`

#### Default

```ts
process.cwd()
```

***

### debug?

> `optional` **debug**: `boolean`

Debug regular expressions when an error is thrown.

#### Default

```ts
undefined
```

***

### dot?

> `optional` **dot**: `boolean`

Match dotfiles. Otherwise dotfiles are ignored unless a `.` is explicitly defined in the pattern.

#### Default

```ts
false
```

***

### expandRange()?

> `optional` **expandRange**: (`left`, `right`, `options`) => `string`

Custom function for expanding ranges in brace patterns, such as `{a..z}`.
The function receives the range values as two arguments, and it must return a string to be used in the generated regex.
It's recommended that returned strings be wrapped in parentheses. This option is overridden by the expandBrace option.

#### Parameters

• **left**: `string`

• **right**: `string`

• **options**: [`Options`](Options.md)

#### Returns

`string`

#### Default

```ts
undefined
```

***

### failglob?

> `optional` **failglob**: `boolean`

Similar to the `--failglob` behavior in Bash, throws an error when no matches are found.

#### Default

```ts
false
```

***

### fastpaths?

> `optional` **fastpaths**: `boolean`

To speed up processing, full parsing is skipped for a handful common glob patterns. Disable this behavior by setting this option to false.

#### Default

```ts
true
```

***

### flags?

> `optional` **flags**: `boolean`

Regex flags to use in the generated regex. If defined, the `nocase` option will be overridden.

#### Default

```ts
undefined
```

***

### format()?

> `optional` **format**: (`returnedString`) => `string`

Custom function for formatting the returned string. This is useful for removing leading slashes, converting Windows paths to Posix paths, etc.

#### Parameters

• **returnedString**: `string`

#### Returns

`string`

#### Default

```ts
undefined
```

***

### ignore?

> `optional` **ignore**: `string` \| readonly `string`[]

One or more glob patterns for excluding strings that should not be matched from the result.

#### Default

```ts
undefined
```

***

### keepQuotes?

> `optional` **keepQuotes**: `boolean`

Retain quotes in the generated regex, since quotes may also be used as an alternative to backslashes.

#### Default

```ts
false
```

***

### literalBrackets?

> `optional` **literalBrackets**: `boolean`

When `true`, brackets in the glob pattern will be escaped so that only literal brackets will be matched.

#### Default

```ts
undefined
```

***

### lookbehinds?

> `optional` **lookbehinds**: `boolean`

Support regex positive and negative lookbehinds. Note that you must be using Node 8.1.10 or higher to enable regex lookbehinds.

#### Default

```ts
true
```

***

### matchBase?

> `optional` **matchBase**: `boolean`

Alias for `basename`.

#### Default

```ts
false
```

***

### maxLength?

> `optional` **maxLength**: `number`

Limit the max length of the input string. An error is thrown if the input string is longer than this value.

#### Default

```ts
65536
```

***

### nobrace?

> `optional` **nobrace**: `boolean`

Disable brace matching, so that `{a,b}` and `{1..3}` would be treated as literal characters.

#### Default

```ts
false
```

***

### nobracket?

> `optional` **nobracket**: `boolean`

Disable matching with regex brackets.

#### Default

```ts
undefined
```

***

### nocase?

> `optional` **nocase**: `boolean`

Perform case-insensitive matching. Equivalent to the regex `i` flag.
Note that this option is ignored when the `flags` option is defined.

#### Default

```ts
false
```

***

### noext?

> `optional` **noext**: `boolean`

Alias for `noextglob`

#### Default

```ts
false
```

***

### noextglob?

> `optional` **noextglob**: `boolean`

Disable support for matching with extglobs (like `+(a|b)`)

#### Default

```ts
false
```

***

### noglobstar?

> `optional` **noglobstar**: `boolean`

Disable matching with globstars (`**`).

#### Default

```ts
undefined
```

***

### nonegate?

> `optional` **nonegate**: `boolean`

Disallow negation (`!`) patterns, and treat leading `!` as a literal character to match.

#### Default

```ts
undefined
```

***

### noquantifiers?

> `optional` **noquantifiers**: `boolean`

Disable support for regex quantifiers (like `a{1,2}`) and treat them as brace patterns to be expanded.

#### Default

```ts
false
```

***

### onIgnore()?

> `optional` **onIgnore**: (`item`) => `void`

Function to be called on ignored items.

#### Parameters

• **item**: [`Item`](Item.md)

#### Returns

`void`

#### Default

```ts
undefined
```

***

### onMatch()?

> `optional` **onMatch**: (`item`) => `void`

Function to be called on matched items.

#### Parameters

• **item**: [`Item`](Item.md)

#### Returns

`void`

#### Default

```ts
undefined
```

***

### onResult()?

> `optional` **onResult**: (`item`) => `void`

Function to be called on all items, regardless of whether or not they are matched or ignored.

#### Parameters

• **item**: [`Item`](Item.md)

#### Returns

`void`

#### Default

```ts
undefined
```

***

### posix?

> `optional` **posix**: `boolean`

Support POSIX character classes ("posix brackets").

#### Default

```ts
false
```

***

### prepend?

> `optional` **prepend**: `boolean`

String to prepend to the generated regex used for matching.

#### Default

```ts
undefined
```

***

### regex?

> `optional` **regex**: `boolean`

Use regular expression rules for `+` (instead of matching literal `+`), and for stars that follow closing parentheses or brackets (as in `)*` and `]*`).

#### Default

```ts
false
```

***

### strictBrackets?

> `optional` **strictBrackets**: `boolean`

Throw an error if brackets, braces, or parens are imbalanced.

#### Default

```ts
undefined
```

***

### strictSlashes?

> `optional` **strictSlashes**: `boolean`

When true, picomatch won't match trailing slashes with single stars.

#### Default

```ts
undefined
```

***

### unescape?

> `optional` **unescape**: `boolean`

Remove backslashes from returned matches.

#### Default

```ts
undefined
```

#### Example

In this example we want to match a literal `*`:

```js
mm.match(['abc', 'a\\*c'], 'a\\*c');
//=> ['a\\*c']

mm.match(['abc', 'a\\*c'], 'a\\*c', {unescape: true});
//=> ['a*c']
```

***

### windows?

> `optional` **windows**: `boolean`

Convert all slashes in file paths to forward slashes. This does not convert slashes in the glob pattern itself

#### Default

```ts
undefined
```
