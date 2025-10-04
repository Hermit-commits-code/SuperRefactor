/**
 * SuperRefactor Pro – File Traversal & Indexing Module
 *
 * This module provides robust, extensible utilities for traversing project directories,
 * filtering files by language/type, and indexing symbols for refactor operations.
 *
 * Author: Hermit-commits-code
 * License: MIT
 */

const fs = require('fs');
const path = require('path');

/**
 * Recursively traverse a directory and collect all files matching the given extensions.
 *
 * @param {string} dir - The root directory to start traversal
 * @param {string[]} extensions - Array of file extensions to include (e.g., ['.js', '.ts', '.py'])
 * @param {Object} [options] - Optional settings (e.g., exclude patterns)
 * @returns {string[]} Array of absolute file paths
 */
function collectFiles(dir, extensions, options = {}) {
    const results = [];
    const exclude = options.exclude || [];

    /**
     * Internal recursive helper
     * @param {string} currentDir
     */
    function traverse(currentDir) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);
            // Exclude directories/files matching patterns
            if (exclude.some(pattern => fullPath.includes(pattern))) continue;
            if (entry.isDirectory()) {
                traverse(fullPath);
            } else if (extensions.some(ext => entry.name.endsWith(ext))) {
                results.push(fullPath);
            }
        }
    }

    traverse(dir);
    return results;
}

/**
 * Index symbols in a set of files for fast lookup and refactor operations.
 *
 * @param {string[]} filePaths - Array of file paths to index
 * @param {Object} parser - AST parser instance (e.g., Babel, Acorn)
 * @returns {Object} Symbol index: { symbolName: [locations] }
 */
function indexSymbols(filePaths, parser) {
    const symbolIndex = {};

    for (const filePath of filePaths) {
        const code = fs.readFileSync(filePath, 'utf8');
        let ast;
        try {
            ast = parser.parse(code, { sourceType: 'module' });
        } catch (err) {
            // Professional error handling: log and continue
            console.warn(`[Symbol Indexer] Failed to parse ${filePath}:`, err.message);
            continue;
        }
        // Traverse AST and collect symbol definitions/references
        // This is a stub; extend for specific language support
        // Example: collect function/class/variable names
        // ...
    }

    return symbolIndex;
}

module.exports = {
    collectFiles,
    indexSymbols
};
