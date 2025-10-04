const jsToTsMigrator = require("../src/adapters/jsToTsMigrator");
const pythonRefactor = require("../src/adapters/pythonRefactor");

describe("Adapters", () => {
  it("should expose JS to TS migration function", () => {
    expect(typeof jsToTsMigrator.migrate).toBe("function");
  });

  it("should expose Python refactor function", () => {
    expect(typeof pythonRefactor.refactor).toBe("function");
  });
});
