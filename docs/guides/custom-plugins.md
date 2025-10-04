# Custom Refactor Scripts & Plugins

## Overview

SuperRefactor Pro supports user-defined refactor scripts and plugins for advanced, customizable workflows. This guide describes the plugin API, scripting interface, and extension points for building custom refactor logic.

## Plugin API Design

- **Plugin Interface:**
  - Each plugin exports a `run` function: `(context, options) => RefactorResult`
  - Plugins can access file traversal, symbol indexing, and transformation utilities.
- **Registration:**
  - Plugins are registered via a config file (e.g., `superrefactor.plugins.json`) or programmatically.
- **Lifecycle Hooks:**
  - `onInit`, `onBeforeRefactor`, `onAfterRefactor`, `onError`
- **Sandboxing:**
  - Plugins run in a controlled environment with access only to allowed APIs.

## Scripting Interface

- **Script Format:**
  - JavaScript or TypeScript modules.
  - Optionally Python scripts for Python-specific refactors.
- **Options:**
  - Pass custom options to plugins via config or command line.

## Extension Points

- **Refactor Engine:**
  - Plugins can hook into the refactor pipeline at key stages.
- **UI Integration:**
  - Plugins can add custom UI panels or commands.

## Example Plugin

```js
module.exports = {
  run: async (context, options) => {
    // Custom refactor logic here
    return { success: true, changes: [] };
  },
  onInit: () => {},
  onBeforeRefactor: () => {},
  onAfterRefactor: () => {},
  onError: (err) => {
    console.error(err);
  },
};
```

## Usage

- Add plugins to `superrefactor.plugins.json` or register via API.
- Run custom refactor scripts from the command palette or CLI.

## Next Steps

- Expand plugin API for more lifecycle hooks and UI options.
- Add plugin marketplace and sharing features.

---

For technical details, see the main README and API reference.
