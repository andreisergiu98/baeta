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

## Defined in

.yarn/\_\_virtual\_\_/ink-virtual-aec70b31ab/0/cache/ink-npm-5.0.1-25988da7ed-03eab53468.zip/node\_modules/ink/build/hooks/use-focus.d.ts:33
