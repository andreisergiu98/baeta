# @baeta/directives

## Variables

### definitions

> `const` **definitions**: `object`[]

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

`directive`

</td>
<td>

(`schema`) => `GraphQLSchema`

</td>
</tr>
<tr>
<td>

`sdl`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

## Functions

### registerDirectives()

> **registerDirectives**(`module`): `void`

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

`module`

</td>
<td>

\{ `$directive`: (`transformer`) => `void`; \}

</td>
</tr>
<tr>
<td>

`module.$directive`

</td>
<td>

(`transformer`) => `void`

</td>
</tr>
</tbody>
</table>

#### Returns

`void`
