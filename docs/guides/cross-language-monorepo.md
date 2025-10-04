# Cross-Language & Monorepo Support

## Overview

SuperRefactor Pro now supports refactoring and migration across multiple languages (JavaScript, TypeScript, Python) and monorepo architectures. This guide outlines the architecture, detection logic, and integration points for cross-language and monorepo workflows.

## Architecture

- **Multi-language Refactor Engine:**
  - Abstracts file traversal, symbol indexing, and transformation logic for JS, TS, and Python.
  - Adapter pattern for language-specific operations.
  - Traverses all detected workspaces and files using MonorepoManager.
- **Monorepo Detection:**
  - Scans for multiple package managers (npm, pip, yarn, pnpm).
  - Detects workspace roots, subprojects, and dependency graphs.
- **Integration Points:**
  - Unified job runner for refactor tasks across languages and workspaces.
  - Shared rollback and error handling logic.
  - Workspace overview panel in the UI for visualization.

## Implementation Steps (Completed)

1. Scaffolded core engine for multi-language traversal and symbol operations.
2. Implemented monorepo detection (workspace roots, subprojects, dependency graphs).
3. Integrated JS, TS, and Python adapters with unified job runner.
4. Added UI feedback: Workspace Overview panel visualizes detected workspaces and languages.
5. Documentation expanded as features matured.

## Usage

- Refactor and migrate code across JS, TS, and Python projects in a single monorepo.
- Automatic detection of project boundaries and dependencies.
- Rollback and error handling unified across languages.
- View detected workspaces and languages in the Workspace Overview panel (command: `SuperRefactor: Workspace Overview`).

## Next Steps

- Add support for custom refactor scripts and plugins.
- Integrate visualization and collaboration features.
- Expand CI/CD integration for enterprise workflows.

---

For technical details, see the main README and API reference.
