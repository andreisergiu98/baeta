---
"@baeta/plugin-federation": patch
---

A failed entity representation now nulls only its own entry in `_entities` instead of the whole batch.
Composite and nested `@key` fields now generate correctly and enum key fields use the enum type.
