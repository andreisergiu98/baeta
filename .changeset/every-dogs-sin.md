---
"@baeta/plugin-directives": major
"@baeta/directives": major
"@baeta/core": major
---

Move input directives from `@baeta/core` to `@baeta/directives` as `inputValidationAppPlugin`, registered per module with `$use(inputDirectives([...]))`. Input directives are validation-only: `getValue()` became `value`, `setValue()` and the `@trim`, `@lower` and `@upper` directives were removed.

App plugins can return `onSchema` from `mutate`, and `ModuleCompiler` exposes `typedef`.
