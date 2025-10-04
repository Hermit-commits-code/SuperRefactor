/**
 * SuperRefactor Pro – Testing Integration
 *
 * This module provides utilities to run Jest, Mocha, or other test suites
 * on migrated files, block or rollback on failures, and log results.
 *
 * Author: Hermit-commits-code
 * License: MIT
 */

const { execSync } = require("child_process");

/**
 * Run Jest tests and log results.
 * @param {string} testPath - Path to test files or directory
 * @returns {Object} { success: boolean, output: string }
 */
function runJest(testPath) {
    try {
        const output = execSync(`npx jest "${testPath}"`, { encoding: "utf8" });
        console.log(`[Test] Jest completed for ${testPath}`);
        return { success: true, output };
    } catch (err) {
        console.error(`[Test] Jest error for ${testPath}: ${err.message}`);
        return { success: false, output: err.message };
    }
}

/**
 * Run Mocha tests and log results.
 * @param {string} testPath - Path to test files or directory
 * @returns {Object} { success: boolean, output: string }
 */
function runMocha(testPath) {
    try {
        const output = execSync(`npx mocha "${testPath}"`, { encoding: "utf8" });
        console.log(`[Test] Mocha completed for ${testPath}`);
        return { success: true, output };
    } catch (err) {
        console.error(`[Test] Mocha error for ${testPath}: ${err.message}`);
        return { success: false, output: err.message };
    }
}

module.exports = {
    runJest,
    runMocha
};
