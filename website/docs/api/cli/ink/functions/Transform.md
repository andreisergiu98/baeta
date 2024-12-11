# Function: Transform()

> **Transform**(`__namedParameters`): `React.JSX.Element` \| `null`

Transform a string representation of React components before they are written to output.
For example, you might want to apply a gradient to text, add a clickable link or create some text effects.
These use cases can't accept React nodes as input, they are expecting a string.
That's what <Transform> component does, it gives you an output string of its child components and lets you transform it in any way.

## Parameters

### \_\_namedParameters

[`TransformProps`](../type-aliases/TransformProps.md)

## Returns

`React.JSX.Element` \| `null`
