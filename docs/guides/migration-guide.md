# Migration Guide: JS→TS & Python Refactoring

## JS→TS Migration

1. Detect all `.js` and `.jsx` files in your project.
2. Use SuperRefactor to rename files to `.ts`/`.tsx` and update imports/exports.
3. Run type inference and static analysis to add TypeScript types.
4. Lint and format with ESLint and Prettier.
5. Run Jest/Mocha tests to validate migration.
6. Review diff preview and rollback if needed.

## Python Refactoring

1. Index all symbols in your Python project.
2. Use SuperRefactor to rename, move, extract, or inline symbols across files.
3. Resolve circular dependencies automatically.
4. Lint and format with Flake8 and Black.
5. Run PyTest to validate refactor.
6. Review diff preview and rollback if needed.

## Best Practices

- Always review diff previews before applying changes.
- Use version control for safety and rollback.
- Run tests after every major refactor.
- Document migration steps and lessons learned.

---

_Update this guide as workflows evolve._
