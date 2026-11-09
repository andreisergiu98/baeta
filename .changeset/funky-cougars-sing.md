---
"@baeta/plugin-directives": patch
"@baeta/plugin-federation": patch
"@baeta/plugin-pagination": patch
"@baeta/plugin-gitignore": patch
---

The directives, pagination and federation plugins add their `.gql` files in `setup`, so federation no longer fails when it's listed before the other two. The gitignore plugin runs in `end` and no longer needs to be listed first.
