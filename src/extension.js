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
    const { runJest, runMocha, runPyTest } = require('./adapters/testIntegration');

    const refactorCommand = vscode.commands.registerCommand('superrefactor.refactor', async () => {
        vscode.window.showInformationMessage('SuperRefactor: Refactor command executed!');
        // Example: Run Jest tests after refactor
        const jestResult = runJest('./tests');
        PreviewPanel.createOrShow(context.extensionUri);
        if (PreviewPanel.currentPanel) {
            PreviewPanel.currentPanel._panel.webview.html = PreviewPanel.currentPanel._getHtmlForWebview(
                PreviewPanel.currentPanel._panel.webview,
                jestResult.output
            );
        }
        // TODO: Implement rollback logic if !jestResult.success
    });

    const migrateCommand = vscode.commands.registerCommand('superrefactor.migrate', async () => {
        vscode.window.showInformationMessage('SuperRefactor: JS to TS migration started!');
        // Example: Run Mocha tests after migration
        const mochaResult = runMocha('./tests');
        PreviewPanel.createOrShow(context.extensionUri);
        if (PreviewPanel.currentPanel) {
            PreviewPanel.currentPanel._panel.webview.html = PreviewPanel.currentPanel._getHtmlForWebview(
                PreviewPanel.currentPanel._panel.webview,
                mochaResult.output
            );
        }
        // TODO: Implement rollback logic if !mochaResult.success
    });

    const pythonRefactorCommand = vscode.commands.registerCommand('superrefactor.pythonRefactor', async () => {
        vscode.window.showInformationMessage('SuperRefactor: Python refactor started!');
        // Example: Run PyTest after Python refactor
        const pyTestResult = runPyTest('./tests');
        PreviewPanel.createOrShow(context.extensionUri);
        if (PreviewPanel.currentPanel) {
            PreviewPanel.currentPanel._panel.webview.html = PreviewPanel.currentPanel._getHtmlForWebview(
                PreviewPanel.currentPanel._panel.webview,
                pyTestResult.output
            );
        }
        // TODO: Implement rollback logic if !pyTestResult.success
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