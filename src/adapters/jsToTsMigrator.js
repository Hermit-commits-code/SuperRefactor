/**
 * SuperRefactor Pro – JS→TS Migration Module
 *
 * This module provides utilities for detecting JavaScript files in a project
 * and renaming them to TypeScript equivalents as the first step in migration.
 *
 * Author: Hermit-commits-code
 * License: MIT
 */

const fs = require('fs');
const path = require('path');

/**
 * Detect all .js and .jsx files in the given directory (recursively).
 *
 * @param {string} rootDir - The root directory to scan
 * @returns {Object} { jsFiles: string[], jsxFiles: string[] }
 */
function detectJsFiles(rootDir) {
    const jsFiles = [];
    const jsxFiles = [];

    function traverse(currentDir) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);
            if (entry.isDirectory()) {
                traverse(fullPath);
            } else if (entry.name.endsWith('.js')) {
                jsFiles.push(fullPath);
            } else if (entry.name.endsWith('.jsx')) {
                jsxFiles.push(fullPath);
            }
        }
    }

    traverse(rootDir);
    return { jsFiles, jsxFiles };
}

/**
 * Rename .js files to .ts and .jsx files to .tsx
 *
 * @param {string[]} jsFiles - Array of .js file paths
 * @param {string[]} jsxFiles - Array of .jsx file paths
 * @returns {Object} { renamed: string[], errors: string[] }
 */
function renameFiles(jsFiles, jsxFiles) {
    const renamed = [];
    const errors = [];

    // Rename .js to .ts
    for (const file of jsFiles) {
        const tsFile = file.replace(/\.js$/, '.ts');
        try {
            fs.renameSync(file, tsFile);
            renamed.push(tsFile);
        } catch (err) {
            errors.push(`Failed to rename ${file} to ${tsFile}: ${err.message}`);
        }
    }

    // Rename .jsx to .tsx
    for (const file of jsxFiles) {
        const tsxFile = file.replace(/\.jsx$/, '.tsx');
        try {
            fs.renameSync(file, tsxFile);
            renamed.push(tsxFile);
        } catch (err) {
            errors.push(`Failed to rename ${file} to ${tsxFile}: ${err.message}`);
        }
    }

    return { renamed, errors };
}


// Integrate migration workflow
const {
    migrateJsFileToTs
} = require("./jsTsSyntaxTransform");
const { runEslint, runPrettier } = require("./lintFormat");
const { runJest, runMocha } = require("./testIntegration");

/**
 * Full migration workflow for a project directory
 * @param {string} rootDir - Project root directory
 * @param {Object} options - { testRunner: "jest" | "mocha", runTests: boolean }
 */
function migrateProject(rootDir, options = {}) {
    const { jsFiles, jsxFiles } = detectJsFiles(rootDir);
    const { renamed, errors } = renameFiles(jsFiles, jsxFiles);
    const migrated = [];
    for (const file of renamed) {
        // Transform and update imports/exports
        const result = migrateJsFileToTs(file, file); // Overwrite for simplicity
        migrated.push({ file, ...result });
        // Lint and format
        runEslint(file);
        runPrettier(file);
    }
    // Optionally run tests
    if (options.runTests) {
        if (options.testRunner === "mocha") {
            runMocha(rootDir);
        } else {
            runJest(rootDir);
        }
    }
    return { migrated, errors };
}

module.exports = {
    detectJsFiles,
    renameFiles,
    migrateProject
};
