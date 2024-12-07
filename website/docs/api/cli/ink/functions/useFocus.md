# Function: useFocus()

> **useFocus**(`__namedParameters`?): `Output`

Component that uses `useFocus` hook becomes "focusable" to Ink,
so when user presses <kbd>Tab</kbd>, Ink will switch focus to this component.
If there are multiple components that execute `useFocus` hook, focus will be
given to them in the order that these components are rendered in.
This hook returns an object with `isFocused` boolean property, which
determines if this component is focused or not.

## Parameters

• **\_\_namedParameters?**: `Input`

## Returns

`Output`
