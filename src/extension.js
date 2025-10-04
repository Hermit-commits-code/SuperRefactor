const vscode = require('vscode');

// Import our modules
const { RefactorEngine } = require('./core');
const { JSToTSMigrator } = require('./adapters');
const { PreviewPanel } = require('./ui');

/**
 * Called when the extension is activated
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('SuperRefactor Pro is now active!');

    // Register commands
    const refactorCommand = vscode.commands.registerCommand('superrefactor.refactor', () => {
        vscode.window.showInformationMessage('SuperRefactor: Refactor command executed!');
        // TODO: Implement refactor logic
    });

    const migrateCommand = vscode.commands.registerCommand('superrefactor.migrate', () => {
        vscode.window.showInformationMessage('SuperRefactor: JS to TS migration started!');
        // TODO: Implement migration logic
    });

    const pythonRefactorCommand = vscode.commands.registerCommand('superrefactor.pythonRefactor', () => {
        vscode.window.showInformationMessage('SuperRefactor: Python refactor started!');
        // TODO: Implement Python refactor logic
    });

    const previewDiffCommand = vscode.commands.registerCommand('superrefactor.previewDiff', () => {
        vscode.window.showInformationMessage('SuperRefactor: Opening diff preview...');
        // TODO: Implement diff preview
    });

    // Add commands to context
    context.subscriptions.push(refactorCommand);
    context.subscriptions.push(migrateCommand);
    context.subscriptions.push(pythonRefactorCommand);
    context.subscriptions.push(previewDiffCommand);
}

/**
 * Called when the extension is deactivated
 */
function deactivate() {
    console.log('SuperRefactor Pro deactivated');
}

module.exports = {
    activate,
    deactivate
};