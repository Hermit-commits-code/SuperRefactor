class DocsPanel {
  static currentPanel = undefined;

  constructor(panel, extensionUri, docHtml) {
    this._panel = panel;
    this._extensionUri = extensionUri;
    this._docHtml = docHtml;
    this._disposables = [];
    this._update();
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  static createOrShow(extensionUri, docHtml) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;
    if (DocsPanel.currentPanel) {
      DocsPanel.currentPanel._panel.reveal(column);
      return;
    }
    const panel = vscode.window.createWebviewPanel(
      "superRefactorDocs",
      "SuperRefactor Docs",
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.joinPath(extensionUri, "media")],
      }
    );
    DocsPanel.currentPanel = new DocsPanel(panel, extensionUri, docHtml);
  }

  _update() {
    this._panel.title = "SuperRefactor Docs";
    this._panel.webview.html = this._docHtml;
  }

  dispose() {
    DocsPanel.currentPanel = undefined;
    this._panel.dispose();
    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) x.dispose();
    }
  }
}
// UI components for WebViews and panels

const vscode = require("vscode");

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
      "superRefactorPreview",
      "SuperRefactor Preview",
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.joinPath(extensionUri, "media")],
      }
    );

    PreviewPanel.currentPanel = new PreviewPanel(panel, extensionUri);
  }

  /**
   * Update the webview content
   */
  _update() {
    const webview = this._panel.webview;
    this._panel.title = "SuperRefactor Preview";
    this._panel.webview.html = this._getHtmlForWebview(webview);
  }

  /**
   * Generate HTML content for the webview
   * @param {vscode.Webview} webview - The webview instance
   */
  _getHtmlForWebview(webview, testResults = null) {
    let testSection = "";
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

class WorkspaceOverviewPanel {
  static currentPanel = undefined;

  constructor(panel, extensionUri, overviewHtml) {
    this._panel = panel;
    this._extensionUri = extensionUri;
    this._overviewHtml = overviewHtml;
    this._disposables = [];
    this._update();
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  static createOrShow(extensionUri, overviewHtml) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;
    if (WorkspaceOverviewPanel.currentPanel) {
      WorkspaceOverviewPanel.currentPanel._panel.reveal(column);
      return;
    }
    const panel = vscode.window.createWebviewPanel(
      "superRefactorWorkspaceOverview",
      "Workspace Overview",
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.joinPath(extensionUri, "media")],
      }
    );
    WorkspaceOverviewPanel.currentPanel = new WorkspaceOverviewPanel(
      panel,
      extensionUri,
      overviewHtml
    );
  }

  _update() {
    this._panel.title = "Workspace Overview";
    this._panel.webview.html = this._overviewHtml;
  }

  dispose() {
    WorkspaceOverviewPanel.currentPanel = undefined;
    this._panel.dispose();
    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) x.dispose();
    }
  }
}

class VisualizationPanel {
  static currentPanel = undefined;

  constructor(panel, extensionUri, vizHtml) {
    this._panel = panel;
    this._extensionUri = extensionUri;
    this._vizHtml = vizHtml;
    this._disposables = [];
    this._update();
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  static createOrShow(extensionUri, vizHtml) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;
    if (VisualizationPanel.currentPanel) {
      VisualizationPanel.currentPanel._panel.reveal(column);
      return;
    }
    const panel = vscode.window.createWebviewPanel(
      "superRefactorVisualization",
      "Refactor Visualization",
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.joinPath(extensionUri, "media")],
      }
    );
    VisualizationPanel.currentPanel = new VisualizationPanel(
      panel,
      extensionUri,
      vizHtml
    );
  }

  _update() {
    this._panel.title = "Refactor Visualization";
    this._panel.webview.html = this._vizHtml;
  }

  dispose() {
    VisualizationPanel.currentPanel = undefined;
    this._panel.dispose();
    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) x.dispose();
    }
  }
}

class WelcomePanel {
  static currentPanel = undefined;

  constructor(panel, extensionUri) {
    this._panel = panel;
    this._extensionUri = extensionUri;
    this._disposables = [];
    this._update();
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  static createOrShow(extensionUri) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;
    if (WelcomePanel.currentPanel) {
      WelcomePanel.currentPanel._panel.reveal(column);
      return;
    }
    const panel = vscode.window.createWebviewPanel(
      "superRefactorWelcome",
      "Welcome to SuperRefactor",
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.joinPath(extensionUri, "media")],
      }
    );
    WelcomePanel.currentPanel = new WelcomePanel(panel, extensionUri);
  }

  _update() {
    this._panel.title = "Welcome to SuperRefactor";
    this._panel.webview.html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome</title>
        <style>
          body { font-family: var(--vscode-font-family); margin: 20px; }
          h1 { color: var(--vscode-editor-foreground); }
          .tip { background: #e6ffed; border-left: 4px solid #2ea44f; padding: 10px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <h1>Welcome to SuperRefactor Pro!</h1>
        <div class="tip">Get started by running a refactor or migration command from the Command Palette.<br>See the <b>Help</b> panel for guides and troubleshooting.</div>
        <ul>
          <li><b>Keyboard Shortcuts:</b> Use <kbd>Ctrl+Shift+P</kbd> to open commands.</li>
          <li><b>Accessibility:</b> All panels support keyboard navigation and screen readers.</li>
          <li><b>Tooltips:</b> Hover icons for more info.</li>
        </ul>
      </body>
      </html>`;
  }

  dispose() {
    WelcomePanel.currentPanel = undefined;
    this._panel.dispose();
    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) x.dispose();
    }
  }
}

module.exports = {
  PreviewPanel,
  DocsPanel,
  WorkspaceOverviewPanel,
  VisualizationPanel,
  WelcomePanel,
};
