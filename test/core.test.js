const { JobRunner } = require("../src/core/jobRunner");

describe("JobRunner", () => {
  it("should run jobs in sequence and handle errors", async () => {
    const runner = new JobRunner();
    let result = [];
    runner.addJob(async () => {
      result.push(1);
    });
    runner.addJob(async () => {
      result.push(2);
    });
    await new Promise((r) => setTimeout(r, 100));
    expect(result).toEqual([1, 2]);
  });
});
