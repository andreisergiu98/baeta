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
