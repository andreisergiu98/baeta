# Function: useInput()

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

## Parameters

• **inputHandler**: `Handler`

• **options?**: `Options`

## Returns

`void`

## Defined in

.yarn/\_\_virtual\_\_/ink-virtual-46a2052950/0/cache/ink-npm-5.1.0-5eb899d847-aa60256b38.zip/node\_modules/ink/build/hooks/use-input.d.ts:96
