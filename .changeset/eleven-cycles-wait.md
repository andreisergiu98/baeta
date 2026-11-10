---
"@baeta/cli": patch
---

`generate` prints timestamped lines with a spinner instead of an Ink UI, and exits 1 without a valid config.
`generate --run` passes on the command's exit code and stdin instead of hanging. With `--watch`, a crashed command starts again after the next successful generation.
`@baeta/cli/sdk` moved to the new `@baeta/cli-sdk` package, and CLI plugins can add their own commands.
