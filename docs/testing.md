# Testing Integration

SuperRefactor Pro supports automated testing workflows for refactored codebases. After each refactor operation, the extension can run project tests using Jest (JavaScript/TypeScript), Mocha (JavaScript/TypeScript), or PyTest (Python). If any test fails, changes are blocked or rolled back to maintain code integrity.

## Supported Test Runners
- **Jest**: For JS/TS projects
- **Mocha**: For JS/TS projects
- **PyTest**: For Python projects

## Workflow
1. After refactor, SuperRefactor triggers the appropriate test suite(s) for affected files or the whole project.
2. Test results are logged and displayed in the UI.
3. If all tests pass, changes are finalized.
4. If any test fails, the extension blocks further changes or rolls back to the previous state.

## API
- `runJest(testPath)`: Runs Jest tests, returns `{ success, output }`.
- `runMocha(testPath)`: Runs Mocha tests, returns `{ success, output }`.
- `runPyTest(testPath)`: Runs PyTest tests, returns `{ success, output }`.

## Example Usage
```js
const { runJest, runMocha, runPyTest } = require('./src/adapters/testIntegration');
// JS/TS
const jestResult = runJest('./tests');
if (!jestResult.success) {
  // Rollback changes
}
// Python
const pyTestResult = runPyTest('./tests');
if (!pyTestResult.success) {
  // Rollback changes
}
```

## Next Steps
- Implement PyTest integration for Python projects
- Add UI feedback for test results
- Document error handling and rollback logic

---
*Update this document as implementation progresses.*
