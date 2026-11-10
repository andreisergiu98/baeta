---
"@baeta/plugin-exec": patch
---

String commands run through the shell, and they run in the generator's working directory instead of `process.cwd()`.
The new `cwd` option sets a different directory, resolved against the generator's.
