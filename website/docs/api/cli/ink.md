# ink

## Type Aliases

### AppProps

> **AppProps**: `object`

#### Type declaration

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

<a id="exit"></a> `exit`

</td>
<td>

(`error`?) => `void`

</td>
<td>

Exit (unmount) the whole Ink app.

</td>
</tr>
</tbody>
</table>

---

### BoxProps

> **BoxProps**: `Except`\<`Styles`, `"textWrap"`\>

---

### DOMElement

> **DOMElement**: `object` & `InkNode`

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

`attributes`

</td>
<td>

`Record`\<`string`, `DOMNodeAttribute`\>

</td>
</tr>
<tr>
<td>

`childNodes`

</td>
<td>

`DOMNode`[]

</td>
</tr>
<tr>
<td>

`nodeName`

</td>
<td>

`ElementNames`

</td>
</tr>
<tr>
<td>

`internal_transform`?

</td>
<td>

`OutputTransformer`

</td>
</tr>
<tr>
<td>

`isStaticDirty`?

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`onComputeLayout`?

</td>
<td>

() => `void`

</td>
</tr>
<tr>
<td>

`onImmediateRender`?

</td>
<td>

() => `void`

</td>
</tr>
<tr>
<td>

`onRender`?

</td>
<td>

() => `void`

</td>
</tr>
<tr>
<td>

`staticNode`?

</td>
<td>

[`DOMElement`](ink.md#domelement)

</td>
</tr>
</tbody>
</table>

---

### Instance

> **Instance**: `object`

#### Type declaration

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

<a id="cleanup"></a> `cleanup`

</td>
<td>

() => `void`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="clear"></a> `clear`

</td>
<td>

() => `void`

</td>
<td>

Clear output.

</td>
</tr>
<tr>
<td>

<a id="rerender"></a> `rerender`

</td>
<td>

`Ink`\[`"render"`\]

</td>
<td>

Replace previous root node with a new one or update props of the current root node.

</td>
</tr>
<tr>
<td>

<a id="unmount"></a> `unmount`

</td>
<td>

`Ink`\[`"unmount"`\]

</td>
<td>

Manually unmount the whole Ink app.

</td>
</tr>
<tr>
<td>

<a id="waituntilexit"></a> `waitUntilExit`

</td>
<td>

`Ink`\[`"waitUntilExit"`\]

</td>
<td>

Returns a promise, which resolves when app is unmounted.

</td>
</tr>
</tbody>
</table>

---

### Key

> **Key**: `object`

Handy information about a key that was pressed.

#### Type declaration

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

<a id="backspace"></a> `backspace`

</td>
<td>

`boolean`

</td>
<td>

Backspace key was pressed.

</td>
</tr>
<tr>
<td>

<a id="ctrl"></a> `ctrl`

</td>
<td>

`boolean`

</td>
<td>

Ctrl key was pressed.

</td>
</tr>
<tr>
<td>

<a id="delete"></a> `delete`

</td>
<td>

`boolean`

</td>
<td>

Delete key was pressed.

</td>
</tr>
<tr>
<td>

<a id="downarrow"></a> `downArrow`

</td>
<td>

`boolean`

</td>
<td>

Down arrow key was pressed.

</td>
</tr>
<tr>
<td>

<a id="escape"></a> `escape`

</td>
<td>

`boolean`

</td>
<td>

Escape key was pressed.

</td>
</tr>
<tr>
<td>

<a id="leftarrow"></a> `leftArrow`

</td>
<td>

`boolean`

</td>
<td>

Left arrow key was pressed.

</td>
</tr>
<tr>
<td>

<a id="meta"></a> `meta`

</td>
<td>

`boolean`

</td>
<td>

[Meta key](https://en.wikipedia.org/wiki/Meta_key) was pressed.

</td>
</tr>
<tr>
<td>

<a id="pagedown"></a> `pageDown`

</td>
<td>

`boolean`

</td>
<td>

Page Down key was pressed.

</td>
</tr>
<tr>
<td>

<a id="pageup"></a> `pageUp`

</td>
<td>

`boolean`

</td>
<td>

Page Up key was pressed.

</td>
</tr>
<tr>
<td>

<a id="return"></a> `return`

</td>
<td>

`boolean`

</td>
<td>

Return (Enter) key was pressed.

</td>
</tr>
<tr>
<td>

<a id="rightarrow"></a> `rightArrow`

</td>
<td>

`boolean`

</td>
<td>

Right arrow key was pressed.

</td>
</tr>
<tr>
<td>

<a id="shift"></a> `shift`

</td>
<td>

`boolean`

</td>
<td>

Shift key was pressed.

</td>
</tr>
<tr>
<td>

<a id="tab"></a> `tab`

</td>
<td>

`boolean`

</td>
<td>

Tab key was pressed.

</td>
</tr>
<tr>
<td>

<a id="uparrow"></a> `upArrow`

</td>
<td>

`boolean`

</td>
<td>

Up arrow key was pressed.

</td>
</tr>
</tbody>
</table>

---

### NewlineProps

> **NewlineProps**: `object`

#### Type declaration

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

<a id="count"></a> `count`?

</td>
<td>

`number`

</td>
<td>

Number of newlines to insert.

**Default**

```ts
1;
```

</td>
</tr>
</tbody>
</table>

---

### RenderOptions

> **RenderOptions**: `object`

#### Type declaration

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

<a id="debug"></a> `debug`?

</td>
<td>

`boolean`

</td>
<td>

If true, each update will be rendered as a separate output, without replacing the previous one.

**Default**

```ts
false;
```

</td>
</tr>
<tr>
<td>

<a id="exitonctrlc"></a> `exitOnCtrlC`?

</td>
<td>

`boolean`

</td>
<td>

Configure whether Ink should listen to Ctrl+C keyboard input and exit the app. This is needed in case `process.stdin` is in raw mode, because then Ctrl+C is ignored by default and process is expected to handle it manually.

**Default**

```ts
true;
```

</td>
</tr>
<tr>
<td>

<a id="patchconsole"></a> `patchConsole`?

</td>
<td>

`boolean`

</td>
<td>

Patch console methods to ensure console output doesn't mix with Ink output.

**Default**

```ts
true;
```

</td>
</tr>
<tr>
<td>

<a id="stderr"></a> `stderr`?

</td>
<td>

`NodeJS.WriteStream`

</td>
<td>

Error stream.

**Default**

```ts
process.stderr;
```

</td>
</tr>
<tr>
<td>

<a id="stdin"></a> `stdin`?

</td>
<td>

`NodeJS.ReadStream`

</td>
<td>

Input stream where app will listen for input.

**Default**

```ts
process.stdin;
```

</td>
</tr>
<tr>
<td>

<a id="stdout"></a> `stdout`?

</td>
<td>

`NodeJS.WriteStream`

</td>
<td>

Output stream where app will be rendered.

**Default**

```ts
process.stdout;
```

</td>
</tr>
</tbody>
</table>

---

### StaticProps\<T\>

> **StaticProps**\<`T`\>: `object`

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

#### Type declaration

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

<a id="children"></a> `children`

</td>
<td>

(`item`, `index`) => `ReactNode`

</td>
<td>

Function that is called to render every item in `items` array.
First argument is an item itself and second argument is index of that item in `items` array.
Note that `key` must be assigned to the root component.

</td>
</tr>
<tr>
<td>

<a id="items"></a> `items`

</td>
<td>

`T`[]

</td>
<td>

Array of items of any type to render using a function you pass as a component child.

</td>
</tr>
<tr>
<td>

<a id="style"></a> `style`?

</td>
<td>

`Styles`

</td>
<td>

Styles to apply to a container of child elements. See <Box> for supported properties.

</td>
</tr>
</tbody>
</table>

---

### StderrProps

> **StderrProps**: `object`

#### Type declaration

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

<a id="stderr-1"></a> `stderr`

</td>
<td>

`NodeJS.WriteStream`

</td>
<td>

Stderr stream passed to `render()` in `options.stderr` or `process.stderr` by default.

</td>
</tr>
<tr>
<td>

<a id="write"></a> `write`

</td>
<td>

(`data`) => `void`

</td>
<td>

Write any string to stderr, while preserving Ink's output.
It's useful when you want to display some external information outside of Ink's rendering and ensure there's no conflict between the two.
It's similar to `<Static>`, except it can't accept components, it only works with strings.

</td>
</tr>
</tbody>
</table>

---

### StdinProps

> **StdinProps**: `object`

#### Type declaration

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

<a id="internal_eventemitter"></a> `internal_eventEmitter`

</td>
<td>

`EventEmitter`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="internal_exitonctrlc"></a> `internal_exitOnCtrlC`

</td>
<td>

`boolean`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="israwmodesupported"></a> `isRawModeSupported`

</td>
<td>

`boolean`

</td>
<td>

A boolean flag determining if the current `stdin` supports `setRawMode`. A component using `setRawMode` might want to use `isRawModeSupported` to nicely fall back in environments where raw mode is not supported.

</td>
</tr>
<tr>
<td>

<a id="setrawmode"></a> `setRawMode`

</td>
<td>

(`value`) => `void`

</td>
<td>

Ink exposes this function via own `<StdinContext>` to be able to handle Ctrl+C, that's why you should use Ink's `setRawMode` instead of `process.stdin.setRawMode`.
If the `stdin` stream passed to Ink does not support setRawMode, this function does nothing.

</td>
</tr>
<tr>
<td>

<a id="stdin-1"></a> `stdin`

</td>
<td>

`NodeJS.ReadStream`

</td>
<td>

Stdin stream passed to `render()` in `options.stdin` or `process.stdin` by default. Useful if your app needs to handle user input.

</td>
</tr>
</tbody>
</table>

---

### StdoutProps

> **StdoutProps**: `object`

#### Type declaration

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

<a id="stdout-1"></a> `stdout`

</td>
<td>

`NodeJS.WriteStream`

</td>
<td>

Stdout stream passed to `render()` in `options.stdout` or `process.stdout` by default.

</td>
</tr>
<tr>
<td>

<a id="write-1"></a> `write`

</td>
<td>

(`data`) => `void`

</td>
<td>

Write any string to stdout, while preserving Ink's output.
It's useful when you want to display some external information outside of Ink's rendering and ensure there's no conflict between the two.
It's similar to `<Static>`, except it can't accept components, it only works with strings.

</td>
</tr>
</tbody>
</table>

---

### TextProps

> **TextProps**: `object`

#### Type declaration

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

<a id="backgroundcolor"></a> `backgroundColor`?

</td>
<td>

`LiteralUnion`\<`ForegroundColorName`, `string`\>

</td>
<td>

Same as `color`, but for background.

</td>
</tr>
<tr>
<td>

<a id="bold"></a> `bold`?

</td>
<td>

`boolean`

</td>
<td>

Make the text bold.

</td>
</tr>
<tr>
<td>

<a id="children-1"></a> `children`?

</td>
<td>

`ReactNode`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="color"></a> `color`?

</td>
<td>

`LiteralUnion`\<`ForegroundColorName`, `string`\>

</td>
<td>

Change text color. Ink uses chalk under the hood, so all its functionality is supported.

</td>
</tr>
<tr>
<td>

<a id="dimcolor"></a> `dimColor`?

</td>
<td>

`boolean`

</td>
<td>

Dim the color (emit a small amount of light).

</td>
</tr>
<tr>
<td>

<a id="inverse"></a> `inverse`?

</td>
<td>

`boolean`

</td>
<td>

Inverse background and foreground colors.

</td>
</tr>
<tr>
<td>

<a id="italic"></a> `italic`?

</td>
<td>

`boolean`

</td>
<td>

Make the text italic.

</td>
</tr>
<tr>
<td>

<a id="strikethrough"></a> `strikethrough`?

</td>
<td>

`boolean`

</td>
<td>

Make the text crossed with a line.

</td>
</tr>
<tr>
<td>

<a id="underline"></a> `underline`?

</td>
<td>

`boolean`

</td>
<td>

Make the text underlined.

</td>
</tr>
<tr>
<td>

<a id="wrap"></a> `wrap`?

</td>
<td>

`Styles`\[`"textWrap"`\]

</td>
<td>

This property tells Ink to wrap or truncate text if its width is larger than container.
If `wrap` is passed (by default), Ink will wrap text and split it into multiple lines.
If `truncate-*` is passed, Ink will truncate text instead, which will result in one line of text with the rest cut off.

</td>
</tr>
</tbody>
</table>

---

### TransformProps

> **TransformProps**: `object`

#### Type declaration

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

<a id="transform"></a> `transform`

</td>
<td>

(`children`, `index`) => `string`

</td>
<td>

Function which transforms children output. It accepts children and must return transformed children too.

</td>
</tr>
<tr>
<td>

<a id="children-2"></a> `children`?

</td>
<td>

`ReactNode`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

## Functions

### Box()

> **Box**(`props`): `ReactNode`

`<Box>` is an essential Ink component to build your layout. It's like `<div style="display: flex">` in the browser.

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

`props`

</td>
<td>

`object` & `object` & `RefAttributes`\<[`DOMElement`](ink.md#domelement)\>

</td>
</tr>
</tbody>
</table>

#### Returns

`ReactNode`

---

### measureElement()

> **measureElement**(`node`): `Output`

Measure the dimensions of a particular `<Box>` element.

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

`node`

</td>
<td>

[`DOMElement`](ink.md#domelement)

</td>
</tr>
</tbody>
</table>

#### Returns

`Output`

---

### Newline()

> **Newline**(`__namedParameters`): `Element`

Adds one or more newline (\n) characters. Must be used within <Text> components.

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

`__namedParameters`

</td>
<td>

[`NewlineProps`](ink.md#newlineprops)

</td>
</tr>
</tbody>
</table>

#### Returns

`Element`

---

### render()

> **render**(`node`, `options`?): [`Instance`](ink.md#instance)

Mount a component and render the output.

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

`node`

</td>
<td>

`ReactNode`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`WriteStream` \| [`RenderOptions`](ink.md#renderoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Instance`](ink.md#instance)

---

### Spacer()

> **Spacer**(): `Element`

A flexible space that expands along the major axis of its containing layout.
It's useful as a shortcut for filling all the available spaces between elements.

#### Returns

`Element`

---

### Static()

> **Static**\<`T`\>(`props`): `Element`

`<Static>` component permanently renders its output above everything else.
It's useful for displaying activity like completed tasks or logs - things that
are not changing after they're rendered (hence the name "Static").

It's preferred to use `<Static>` for use cases like these, when you can't know
or control the amount of items that need to be rendered.

For example, [Tap](https://github.com/tapjs/node-tap) uses `<Static>` to display
a list of completed tests. [Gatsby](https://github.com/gatsbyjs/gatsby) uses it
to display a list of generated pages, while still displaying a live progress bar.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

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

`props`

</td>
<td>

[`StaticProps`](ink.md#staticpropst)\<`T`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Element`

---

### Text()

> **Text**(`__namedParameters`): `null` \| `Element`

This component can display text, and change its style to make it colorful, bold, underline, italic or strikethrough.

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

`__namedParameters`

</td>
<td>

[`TextProps`](ink.md#textprops)

</td>
</tr>
</tbody>
</table>

#### Returns

`null` \| `Element`

---

### Transform()

> **Transform**(`__namedParameters`): `null` \| `Element`

Transform a string representation of React components before they are written to output.
For example, you might want to apply a gradient to text, add a clickable link or create some text effects.
These use cases can't accept React nodes as input, they are expecting a string.
That's what <Transform> component does, it gives you an output string of its child components and lets you transform it in any way.

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

`__namedParameters`

</td>
<td>

[`TransformProps`](ink.md#transformprops)

</td>
</tr>
</tbody>
</table>

#### Returns

`null` \| `Element`

---

### useApp()

> **useApp**(): [`AppProps`](ink.md#appprops)

`useApp` is a React hook, which exposes a method to manually exit the app (unmount).

#### Returns

[`AppProps`](ink.md#appprops)

---

### useFocus()

> **useFocus**(`__namedParameters`?): `Output`

Component that uses `useFocus` hook becomes "focusable" to Ink,
so when user presses <kbd>Tab</kbd>, Ink will switch focus to this component.
If there are multiple components that execute `useFocus` hook, focus will be
given to them in the order that these components are rendered in.
This hook returns an object with `isFocused` boolean property, which
determines if this component is focused or not.

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

`__namedParameters`?

</td>
<td>

`Input`

</td>
</tr>
</tbody>
</table>

#### Returns

`Output`

---

### useFocusManager()

> **useFocusManager**(): `Output`

This hook exposes methods to enable or disable focus management for all
components or manually switch focus to next or previous components.

#### Returns

`Output`

---

### useInput()

> **useInput**(`inputHandler`, `options`?): `void`

This hook is used for handling user input.
It's a more convenient alternative to using `StdinContext` and listening to `data` events.
The callback you pass to `useInput` is called for each character when user enters any input.
However, if user pastes text and it's more than one character, the callback will be called only once and the whole string will be passed as `input`.

```
import {useInput} from 'ink';

const UserInput = () => {
  useInput((input, key) => {
    if (input === 'q') {
      // Exit program
    }

    if (key.leftArrow) {
      // Left arrow key pressed
    }
  });

  return …
};
```

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

`inputHandler`

</td>
<td>

`Handler`

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

`Options`

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

---

### useStderr()

> **useStderr**(): [`StderrProps`](ink.md#stderrprops)

`useStderr` is a React hook, which exposes stderr stream.

#### Returns

[`StderrProps`](ink.md#stderrprops)

---

### useStdin()

> **useStdin**(): [`StdinProps`](ink.md#stdinprops)

`useStdin` is a React hook, which exposes stdin stream.

#### Returns

[`StdinProps`](ink.md#stdinprops)

---

### useStdout()

> **useStdout**(): [`StdoutProps`](ink.md#stdoutprops)

`useStdout` is a React hook, which exposes stdout stream.

#### Returns

[`StdoutProps`](ink.md#stdoutprops)
