# Troubleshooting Guide: SuperRefactor Pro

## Common Issues

- **Migration errors:** Check file paths, permissions, and type definitions.
- **Test failures after refactor:** Review diff preview, rollback changes, and fix type errors.
- **Circular dependencies:** Use the Python refactor module’s resolver.
- **Performance bottlenecks:** Profile with Node.js inspector or clinic.js.

## FAQ

- **How do I rollback a refactor?** Use the rollback manager or version control.
- **Why are my tests failing after migration?** Check for missing types, broken imports, or incomplete refactor steps.
- **How do I preview changes before applying?** Use the diff preview WebView panel.

## Debugging Tips

- Run tests after every refactor.
- Use version control for safety.
- Profile resource usage for large projects.
- Document all errors and resolutions for future reference.

---

_Expand this guide as new issues arise._
