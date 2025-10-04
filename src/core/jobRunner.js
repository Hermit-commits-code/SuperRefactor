/**
 * Job Runner with Concurrency Controls for SuperRefactor
 * Handles refactor jobs with locking and queuing for robustness.
 */

const { MonorepoManager } = require("./monorepoManager");

class JobRunner {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  /**
   * Add a job to the queue
   * @param {Function} job - Async function representing a refactor job
   */
  addJob(job) {
    this.queue.push(job);
    this.runNext();
  }

  /**
   * Run the next job in the queue if not already running
   */
  async runNext() {
    if (this.running || this.queue.length === 0) return;
    this.running = true;
    const job = this.queue.shift();
    try {
      await job();
    } catch (err) {
      console.error("[JobRunner] Job failed:", err);
      // TODO: Rollback logic here
    } finally {
      this.running = false;
      if (this.queue.length > 0) this.runNext();
    }
  }
}

class CrossLanguageJobRunner extends JobRunner {
  constructor(monorepoManager) {
    super();
    this.monorepoManager = monorepoManager;
  }

  addCrossLanguageJob(visitor) {
    this.addJob(async () => {
      // Traverse all workspaces and run visitor
      this.monorepoManager.traverseWorkspaces((file, lang) => {
        try {
          visitor(file, lang);
        } catch (err) {
          console.error(`[CrossLanguageJobRunner] Error in ${file}:`, err);
          // Rollback logic could be added here
        }
      });
    });
  }
}

module.exports = { JobRunner, CrossLanguageJobRunner };
