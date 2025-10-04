/**
 * Synthetic Project Generator
 * Generates large, artificial codebases for stress testing SuperRefactor.
 * Usage: node syntheticProjectGenerator.js <targetDir> <numFiles> <numSymbols>
 */

const fs = require('fs');
const path = require('path');

function randomName(prefix = 'Symbol') {
    return prefix + '_' + Math.random().toString(36).substring(2, 10);
}

function generateFileContent(numSymbols) {
    let content = '';
    for (let i = 0; i < numSymbols; i++) {
        const funcName = randomName('func');
        content += `function ${funcName}() { return ${i}; }\n`;
    }
    return content;
}

function generateProject(targetDir, numFiles = 100, numSymbols = 20) {
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
    for (let i = 0; i < numFiles; i++) {
        const fileName = randomName('file') + '.js';
        const filePath = path.join(targetDir, fileName);
        const content = generateFileContent(numSymbols);
        fs.writeFileSync(filePath, content);
    }
    console.log(`Generated ${numFiles} files with ${numSymbols} symbols each in ${targetDir}`);
}

// CLI usage
if (require.main === module) {
    const args = process.argv.slice(2);
    const targetDir = args[0] || './synthetic_project';
    const numFiles = parseInt(args[1], 10) || 100;
    const numSymbols = parseInt(args[2], 10) || 20;
    generateProject(targetDir, numFiles, numSymbols);
}

module.exports = { generateProject };
