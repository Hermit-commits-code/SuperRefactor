/**
 * Update import/export statements in AST for TypeScript compatibility.
 * Converts CommonJS require/module.exports to ES module import/export.
 * Updates module paths and removes file extensions as needed.
 * @param {Object} ast - Babel AST object
 * @returns {Object} Updated AST
 */
function updateImportsExports(ast) {
    const traverse = require("@babel/traverse").default;
    const t = require("@babel/types");

    traverse(ast, {
        CallExpression(path) {
            // Convert require() to import
            if (
                path.node.callee.name === "require" &&
                path.node.arguments.length === 1 &&
                t.isStringLiteral(path.node.arguments[0])
            ) {
                // Example: const foo = require('bar') → import foo from 'bar'
                // This is a stub; real implementation would replace parent VariableDeclarator
                path.node.leadingComments = path.node.leadingComments || [];
                path.node.leadingComments.push({ type: "CommentLine", value: " TODO: convert require to import " });
            }
        },
        MemberExpression(path) {
            // Convert module.exports to export default
            if (
                path.node.object.name === "module" &&
                path.node.property.name === "exports"
            ) {
                path.node.leadingComments = path.node.leadingComments || [];
                path.node.leadingComments.push({ type: "CommentLine", value: " TODO: convert module.exports to export " });
            }
        },
        ImportDeclaration(path) {
            // Remove file extensions from import source
            const source = path.node.source.value;
            if (source.endsWith(".js") || source.endsWith(".jsx")) {
                path.node.source.value = source.replace(/\.(js|jsx)$/, "");
            }
        }
    });

    return ast;
}
/**
 * SuperRefactor Pro – JS→TS Syntax Transformation Module
 *
 * This module provides functions to parse JavaScript code to AST,
 * transform syntax to TypeScript-compliant constructs, and modernize code patterns.
 *
 * Author: Hermit-commits-code
 * License: MIT
 */

const babelParser = require("@babel/parser");
const babelGenerator = require("@babel/generator").default;

/**
 * Parse JavaScript code to AST using Babel parser.
 * @param {string} code - JavaScript source code
 * @returns {Object} AST object
 */
function parseJsToAst(code) {
    return babelParser.parse(code, {
        sourceType: "module",
        plugins: ["jsx", "classProperties", "objectRestSpread"]
    });
}

/**
 * Transform AST to TypeScript-compliant constructs.
 * @param {Object} ast - Babel AST object
 * @returns {Object} Transformed AST
 */


function transformAstToTs(ast) {
    /**
     * Traverse AST and apply TypeScript-compliant transformations and type inference.
     *
     * Professional notes:
     * - Modularize transformation steps for maintainability
     * - Add type annotations where possible using static analysis
     * - Convert CommonJS require/exports to ES module imports/exports
     * - Modernize legacy patterns (e.g., function expressions to arrow functions)
     * - Use Babel traverse for node manipulation
     */
    const traverse = require("@babel/traverse").default;


    traverse(ast, {
        VariableDeclarator(path) {
            // Infer type from initial value
            const init = path.node.init;
            let inferredType = "any";
            if (init) {
                if (init.type === "StringLiteral") inferredType = "string";
                else if (init.type === "NumericLiteral") inferredType = "number";
                else if (init.type === "BooleanLiteral") inferredType = "boolean";
                else if (init.type === "ArrayExpression") {
                    // Try to infer array element type
                    if (init.elements.length > 0) {
                        const first = init.elements[0];
                        if (first.type === "StringLiteral") inferredType = "string[]";
                        else if (first.type === "NumericLiteral") inferredType = "number[]";
                        else if (first.type === "BooleanLiteral") inferredType = "boolean[]";
                        else inferredType = "any[]";
                    } else {
                        inferredType = "any[]";
                    }
                }
                else if (init.type === "ObjectExpression") {
                    // Try to infer if object is a map or plain object
                    inferredType = "Record<string, any>";
                }
                else if (init.type === "ArrowFunctionExpression" || init.type === "FunctionExpression") {
                    inferredType = "Function";
                }
            }
            // Annotate identifier with inferred type (TypeScript)
            if (!path.node.id.leadingComments) path.node.id.leadingComments = [];
            path.node.id.leadingComments.push({ type: "CommentLine", value: ` inferred type: ${inferredType} ` });
        },
        FunctionDeclaration(path) {
            // Infer parameter types and return type
            const paramTypes = [];
            for (const param of path.node.params) {
                // Only handle simple identifiers for now
                if (param.type === "Identifier") {
                    paramTypes.push(`${param.name}: any`); // TODO: infer from usage
                } else {
                    paramTypes.push("any");
                }
            }
            let returnType = "any";
            // Try to infer return type from function body (stub)
            // TODO: Implement real return type inference
            if (!path.node.leadingComments) path.node.leadingComments = [];
            path.node.leadingComments.push({ type: "CommentLine", value: ` params: ${paramTypes.join(", ")} return: ${returnType} ` });
        },
        ClassDeclaration(path) {
            // Annotate class properties as 'any' (stub)
            if (!path.node.leadingComments) path.node.leadingComments = [];
            path.node.leadingComments.push({ type: "CommentLine", value: " TODO: add type annotations to class properties " });
        }
    });

    return ast;
}

/**
 * Generate TypeScript code from transformed AST.
 * @param {Object} ast - Transformed AST
 * @returns {string} TypeScript code
 */
function generateTsCode(ast) {
    const { code } = babelGenerator(ast, { retainLines: true });
    return code;
}


const fs = require("fs");


/**
 * Main function to migrate JS code to TS code and save output file.
 * @param {string} inputPath - Path to JS/JSX file
 * @param {string} outputPath - Path to save TS/TSX file
 * @returns {Object} { success: boolean, error?: string }
 */
function migrateJsFileToTs(inputPath, outputPath) {
    try {
        const jsCode = fs.readFileSync(inputPath, "utf8");
        const ast = parseJsToAst(jsCode);
        const tsAst = transformAstToTs(ast);
        const updatedAst = updateImportsExports(tsAst);
        const tsCode = generateTsCode(updatedAst);
        fs.writeFileSync(outputPath, tsCode, "utf8");
        console.log(`[Migration] Successfully migrated ${inputPath} → ${outputPath}`);
        return { success: true };
    } catch (err) {
        console.error(`[Migration] Failed to migrate ${inputPath}: ${err.message}`);
        return { success: false, error: err.message };
    }
}


module.exports = {
    parseJsToAst,
    transformAstToTs,
    updateImportsExports,
    generateTsCode,
    migrateJsFileToTs
};
