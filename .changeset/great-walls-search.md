---
"create-baeta": patch
---

Scaffolded `start` scripts quote `--run` with double quotes, so they work with npm and pnpm on Windows.
Pressing Ctrl+C at the runtime or package manager prompt now exits instead of falling back to node and npm.
