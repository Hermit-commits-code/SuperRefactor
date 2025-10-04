const vscode = require("vscode");
const extension = require("../src/extension");

describe("Extension", () => {
  it("should export activate and deactivate functions", () => {
    expect(typeof extension.activate).toBe("function");
    expect(typeof extension.deactivate).toBe("function");
  });
});
