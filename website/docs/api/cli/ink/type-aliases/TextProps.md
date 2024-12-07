# Type Alias: TextProps

> **TextProps**: `object`

## Type declaration

### backgroundColor?

> `readonly` `optional` **backgroundColor**: `LiteralUnion`\<`ForegroundColorName`, `string`\>

Same as `color`, but for background.

### bold?

> `readonly` `optional` **bold**: `boolean`

Make the text bold.

### children?

> `readonly` `optional` **children**: `ReactNode`

### color?

> `readonly` `optional` **color**: `LiteralUnion`\<`ForegroundColorName`, `string`\>

Change text color. Ink uses chalk under the hood, so all its functionality is supported.

### dimColor?

> `readonly` `optional` **dimColor**: `boolean`

Dim the color (emit a small amount of light).

### inverse?

> `readonly` `optional` **inverse**: `boolean`

Inverse background and foreground colors.

### italic?

> `readonly` `optional` **italic**: `boolean`

Make the text italic.

### strikethrough?

> `readonly` `optional` **strikethrough**: `boolean`

Make the text crossed with a line.

### underline?

> `readonly` `optional` **underline**: `boolean`

Make the text underlined.

### wrap?

> `readonly` `optional` **wrap**: `Styles`\[`"textWrap"`\]

This property tells Ink to wrap or truncate text if its width is larger than container.
If `wrap` is passed (by default), Ink will wrap text and split it into multiple lines.
If `truncate-*` is passed, Ink will truncate text instead, which will result in one line of text with the rest cut off.
