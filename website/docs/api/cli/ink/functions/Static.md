# Function: Static()

> **Static**\<`T`\>(`props`): `React.JSX.Element`

`<Static>` component permanently renders its output above everything else.
It's useful for displaying activity like completed tasks or logs - things that
are not changing after they're rendered (hence the name "Static").

It's preferred to use `<Static>` for use cases like these, when you can't know
or control the amount of items that need to be rendered.

For example, [Tap](https://github.com/tapjs/node-tap) uses `<Static>` to display
a list of completed tests. [Gatsby](https://github.com/gatsbyjs/gatsby) uses it
to display a list of generated pages, while still displaying a live progress bar.

## Type Parameters

• **T**

## Parameters

• **props**: [`StaticProps`](../type-aliases/StaticProps.md)\<`T`\>

## Returns

`React.JSX.Element`
