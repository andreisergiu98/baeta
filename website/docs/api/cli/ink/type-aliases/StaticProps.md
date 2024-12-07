# Type Alias: StaticProps\<T\>

> **StaticProps**\<`T`\>: `object`

## Type Parameters

• **T**

## Type declaration

### children()

> `readonly` **children**: (`item`, `index`) => `ReactNode`

Function that is called to render every item in `items` array.
First argument is an item itself and second argument is index of that item in `items` array.
Note that `key` must be assigned to the root component.

#### Parameters

• **item**: `T`

• **index**: `number`

#### Returns

`ReactNode`

### items

> `readonly` **items**: `T`[]

Array of items of any type to render using a function you pass as a component child.

### style?

> `readonly` `optional` **style**: `Styles`

Styles to apply to a container of child elements. See <Box> for supported properties.
