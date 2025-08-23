---
description: Fix all TypeScript and ESLint errors
---

Your task is to fix all TypeScript and ESLint errors. To do so:

1. Run the following commands:

- `pnpm format`: Format all files correctly with Prettier.
- `pnpm lint`: Fix lint errors and note any remaining issues.
- `pnpm ts`: Display all TypeScript errors.

2. Fix the errors using the "code" agent.

Be sure to split the errors by folder, then run the code agent for each area. The code agent should be run with a specific list of files to fix and the actions to perform, so they can all work in parallel.

Ensure that each agent updates different files, with a maximum of 5 files per agent.

3. Return to step 1 and verify that no errors remain.
