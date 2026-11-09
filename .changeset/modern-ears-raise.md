---
"@baeta/plugin-federation": patch
"@baeta/plugin-pagination": patch
---

plugin-pagination has a `shareable` option that marks the generated types `@shareable`. It defaults to `true` when the federation plugin is used, so several subgraphs can define the same connection types. plugin-federation now includes `@shareable` in its default directives and registers as `federation` instead of `graphql`.
