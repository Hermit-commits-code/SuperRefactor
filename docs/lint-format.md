# Linting & Formatting Integration

## Overview & Goals
Automate code quality enforcement for JavaScript, TypeScript, and Python using ESLint, Prettier, Flake8, and Black. Ensure all code is linted and formatted after refactor operations, and before commits.

## Tools
- **JavaScript/TypeScript:** ESLint, Prettier
- **Python:** Flake8, Black
- **Pre-commit hooks:** Husky (JS/TS), pre-commit (Python)

## Workflow
1. Run ESLint and Prettier on JS/TS files after refactor/migration
2. Run Flake8 and Black on Python files after refactor
3. Auto-fix issues where possible
4. Add pre-commit hooks to enforce lint/format before commits
5. Log and report errors for troubleshooting

## Example Commands
### JavaScript/TypeScript
- `npx eslint src --ext .js,.ts --fix`
- `npx prettier --write src`

### Python
- `flake8 src`
- `black src`

## Pre-commit Hook Setup
### JS/TS (Husky)
- Install: `npm install husky --save-dev`
- Enable: `npx husky install`
- Add hook: `npx husky add .husky/pre-commit "npm run lint && npm run format"`

### Python (pre-commit)
- Install: `pip install pre-commit flake8 black`
- Add config to `.pre-commit-config.yaml`:
  ```yaml
  - repo: https://github.com/psf/black
    rev: stable
    hooks:
      - id: black
  - repo: https://github.com/pycqa/flake8
    rev: stable
    hooks:
      - id: flake8
  ```
- Enable: `pre-commit install`

## Next Steps
- Integrate lint/format steps into refactor workflow
- Document troubleshooting and edge cases
- Add tests for lint/format automation

---
*Update this document as implementation progresses.*
