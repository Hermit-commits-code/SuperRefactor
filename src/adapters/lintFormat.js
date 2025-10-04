/**
 * SuperRefactor Pro – Linting & Formatting Integration
 *
 * This module provides utilities to run ESLint and Prettier on migrated files,
 * auto-fix issues, and log results for professional code quality.
 *
 * Author: Hermit-commits-code
 * License: MIT
 */

const { execSync } = require("child_process");

/**
 * Run ESLint on a file and auto-fix issues.
 * @param {string} filePath - Path to the file to lint
 * @returns {Object} { success: boolean, output: string }
 */
function runEslint(filePath) {
    try {
        const output = execSync(`npx eslint "${filePath}" --fix`, { encoding: "utf8" });
        console.log(`[Lint] ESLint completed for ${filePath}`);
        return { success: true, output };
    } catch (err) {
        console.error(`[Lint] ESLint error for ${filePath}: ${err.message}`);
        return { success: false, output: err.message };
    }
}

/**
 * Run Prettier on a file to format code.
 * @param {string} filePath - Path to the file to format
 * @returns {Object} { success: boolean, output: string }
 */
function runPrettier(filePath) {
    try {
        const output = execSync(`npx prettier --write "${filePath}"`, { encoding: "utf8" });
        console.log(`[Format] Prettier completed for ${filePath}`);
        return { success: true, output };
    } catch (err) {
        console.error(`[Format] Prettier error for ${filePath}: ${err.message}`);
        return { success: false, output: err.message };
    }
}

module.exports = {
    runEslint,
    runPrettier
};
