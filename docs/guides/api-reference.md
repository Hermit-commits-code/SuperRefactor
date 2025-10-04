# API Reference: SuperRefactor Pro

## Core Modules

- `RefactorEngine`: Orchestrates refactor jobs, manages state, coordinates modules.
- `JobRunner`: Handles job queue, concurrency, and rollback.

## Adapters

- `jsToTsMigrator`: JS→TS migration workflow, file renaming, type inference.
- `pythonRefactor`: Python symbol rename, move, extract/inline, circular dependency resolution.
- `lintFormat`: Integrates ESLint, Prettier, Flake8, Black.
- `testIntegration`: Runs Jest, Mocha, PyTest after refactor.

## UI

- `PreviewPanel`: WebView for diff preview and test results.

## Example Usage

```js
const { migrateProject } = require("src/adapters/jsToTsMigrator");
migrateProject("my_project", { runTests: true, testRunner: "jest" });
```

---

_Expand this reference as APIs evolve._
