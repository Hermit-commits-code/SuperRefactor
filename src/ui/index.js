// UI components for WebViews and panels

const vscode = require('vscode');

class PreviewPanel {
    static currentPanel = undefined;

    constructor(panel, extensionUri) {
        this._panel = panel;
        this._extensionUri = extensionUri;
        this._disposables = [];

        // Set the webview's initial html content
        this._update();

        // Listen for when the panel is disposed
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }

    /**
     * Create or show the preview panel
     * @param {vscode.Uri} extensionUri - Extension URI
     */
    static createOrShow(extensionUri) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        // If we already have a panel, show it
        if (PreviewPanel.currentPanel) {
            PreviewPanel.currentPanel._panel.reveal(column);
            return;
        }

        // Create a new panel
        const panel = vscode.window.createWebviewPanel(
            'superRefactorPreview',
            'SuperRefactor Preview',
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')]
            }
        );

        PreviewPanel.currentPanel = new PreviewPanel(panel, extensionUri);
    }

    /**
     * Update the webview content
     */
    _update() {
        const webview = this._panel.webview;
        this._panel.title = 'SuperRefactor Preview';
        this._panel.webview.html = this._getHtmlForWebview(webview);
    }

    /**
     * Generate HTML content for the webview
     * @param {vscode.Webview} webview - The webview instance
     */
    _getHtmlForWebview(webview, testResults = null) {
        let testSection = '';
        if (testResults) {
            testSection = `
                <div class="test-results">
                    <h2>Test Results</h2>
                    <pre>${testResults}</pre>
                </div>
            `;
        }
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>SuperRefactor Preview</title>
            <style>
                body { font-family: var(--vscode-font-family); }
                .diff-container { margin: 20px; }
                .file-header { font-weight: bold; margin: 10px 0; }
                .diff-line { font-family: monospace; padding: 2px; }
                .added { background-color: #e6ffed; }
                .removed { background-color: #ffeef0; }
                .test-results { margin: 20px; border: 1px solid #ccc; padding: 10px; background: #f9f9f9; }
            </style>
        </head>
        <body>
            <h1>SuperRefactor Preview</h1>
            <div class="diff-container">
                <div class="file-header">No changes to preview</div>
                <p>Run a refactor operation to see a preview of changes here.</p>
            </div>
            ${testSection}
        </body>
        </html>`;
    }

    dispose() {
        PreviewPanel.currentPanel = undefined;

        // Clean up our resources
        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
}

module.exports = { PreviewPanel };