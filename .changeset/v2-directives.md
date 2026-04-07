---
"@baeta/directives": major
---

`@baeta/directives` still ships the same catalog of built-in input/object directives (`@validString`, `@validInt`, `@validFloat`, `@constraints`, `@trim`, `@lower`, `@upper`), but the way directives are applied to a module changed along with the new side-effect-free builder API.

#### How directives are registered

In v1 a module came from a `getXModule()` factory and `$directive` was a void side-effect method that pushed a schema transformer onto the module. In v2 the module is a direct export and `$directive()` is an immutable method you chain before `$schema()` — `Module.$directive(transformer).$schema({ ... })` — accepting a single transformer or an array.

#### `@validString` `format` argument removed

The `format: EMAIL | UUID | URL` argument (and the generated `StringFormat` enum) was dropped from `@validString`, along with its `email-validator` and `is-url` dependencies.
