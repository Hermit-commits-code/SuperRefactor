const vscode = require("vscode");

// Import our modules
// Removed unused imports: RefactorEngine, JSToTSMigrator
const {
  PreviewPanel,
  DocsPanel,
  WorkspaceOverviewPanel,
  VisualizationPanel,
  WelcomePanel,
} = require("./ui");
const fs = require("fs");
const path = require("path");
const MonorepoManager = require("./core/monorepoManager");
const { CiCdIntegration } = require("./core/ciCdIntegration");

const docsCommand = vscode.commands.registerCommand(
  "superrefactor.openDocs",
  () => {
    vscode.window.showInformationMessage(
      "SuperRefactor: Opening documentation guides..."
    );
    // Load all guides and render as HTML
    const guidesDir = path.join(__dirname, "../docs/guides");
    let docHtml =
      '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>SuperRefactor Docs</title><style>body{font-family:var(--vscode-font-family);margin:20px;}h2{margin-top:24px;}</style></head><body><h1>SuperRefactor Documentation & Guides</h1>';
    const guideFiles = [
      "migration-guide.md",
      "api-reference.md",
      "troubleshooting.md",
      "webview-panels.md",
    ];
    for (const file of guideFiles) {
      const filePath = path.join(guidesDir, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf8");
        docHtml += `<h2>${file
          .replace(".md", "")
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) =>
            c.toUpperCase()
          )}</h2><pre style="white-space:pre-wrap;">${content}</pre>`;
      }
    }
    docHtml += "</body></html>";
    DocsPanel.createOrShow(context.extensionUri, docHtml);
  }
);
context.subscriptions.push(docsCommand);

/**
 * Called when the extension is activated
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log("SuperRefactor Pro is now active!");

  // Detect monorepo structure and languages
  const monorepoManager = new MonorepoManager(
    vscode.workspace.rootPath || process.cwd()
  );
  monorepoManager.detectWorkspaces();
  vscode.window.showInformationMessage(
    `SuperRefactor: Detected workspaces: ${monorepoManager.workspaces.map((w) => w.path).join(", ")}`
  );

  // Register commands
  const {
    runJest,
    runMocha,
    runPyTest,
  } = require("./adapters/testIntegration");

  const refactorCommand = vscode.commands.registerCommand(
    "superrefactor.refactor",
    async () => {
      vscode.window.showInformationMessage(
        "SuperRefactor: Refactor command executed!"
      );
      // Example: Run Jest tests after refactor
      const jestResult = runJest("./tests");
      PreviewPanel.createOrShow(context.extensionUri);
      if (PreviewPanel.currentPanel) {
        PreviewPanel.currentPanel._panel.webview.html =
          PreviewPanel.currentPanel._getHtmlForWebview(
            PreviewPanel.currentPanel._panel.webview,
            jestResult.output
          );
      }
      // TODO: Implement rollback logic if !jestResult.success
    }
  );

  const migrateCommand = vscode.commands.registerCommand(
    "superrefactor.migrate",
    async () => {
      vscode.window.showInformationMessage(
        "SuperRefactor: JS to TS migration started!"
      );
      // Example: Run Mocha tests after migration
      const mochaResult = runMocha("./tests");
      PreviewPanel.createOrShow(context.extensionUri);
      if (PreviewPanel.currentPanel) {
        PreviewPanel.currentPanel._panel.webview.html =
          PreviewPanel.currentPanel._getHtmlForWebview(
            PreviewPanel.currentPanel._panel.webview,
            mochaResult.output
          );
      }
      // TODO: Implement rollback logic if !mochaResult.success
    }
  );

  const pythonRefactorCommand = vscode.commands.registerCommand(
    "superrefactor.pythonRefactor",
    async () => {
      vscode.window.showInformationMessage(
        "SuperRefactor: Python refactor started!"
      );
      // Example: Run PyTest after Python refactor
      const pyTestResult = runPyTest("./tests");
      PreviewPanel.createOrShow(context.extensionUri);
      if (PreviewPanel.currentPanel) {
        PreviewPanel.currentPanel._panel.webview.html =
          PreviewPanel.currentPanel._getHtmlForWebview(
            PreviewPanel.currentPanel._panel.webview,
            pyTestResult.output
          );
      }
      // TODO: Implement rollback logic if !pyTestResult.success
    }
  );

  const previewDiffCommand = vscode.commands.registerCommand(
    "superrefactor.previewDiff",
    () => {
      vscode.window.showInformationMessage(
        "SuperRefactor: Opening diff preview..."
      );
      // TODO: Implement diff preview
    }
  );

  const workspaceOverviewCommand = vscode.commands.registerCommand(
    "superrefactor.workspaceOverview",
    () => {
      const monorepoManager = new MonorepoManager(
        vscode.workspace.rootPath || process.cwd()
      );
      monorepoManager.detectWorkspaces();
      let overviewHtml =
        '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Workspace Overview</title><style>body{font-family:var(--vscode-font-family);margin:20px;}h2{margin-top:24px;}</style></head><body><h1>Workspace Overview</h1>';
      overviewHtml += "<h2>Detected Workspaces</h2><ul>";
      for (const ws of monorepoManager.workspaces) {
        overviewHtml += `<li><b>Type:</b> ${ws.type} <b>Path:</b> ${ws.path}</li>`;
      }
      overviewHtml += "</ul><h2>Languages</h2><ul>";
      for (const lang of monorepoManager.detectedLanguages) {
        overviewHtml += `<li>${lang}</li>`;
      }
      overviewHtml += "</ul></body></html>";
      WorkspaceOverviewPanel.createOrShow(context.extensionUri, overviewHtml);
    }
  );

  const visualizationCommand = vscode.commands.registerCommand(
    "superrefactor.visualizationPanel",
    () => {
      // Sample HTML for dependency graph and refactor preview
      let vizHtml =
        '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Refactor Visualization</title><style>body{font-family:var(--vscode-font-family);margin:20px;}h2{margin-top:24px;} .graph{margin:20px 0;} .diff{background:#f9f9f9;border:1px solid #ccc;padding:10px;}</style></head><body><h1>Refactor Visualization</h1>';
      vizHtml +=
        "<h2>Dependency Graph</h2><div class='graph'>[Graph visualization placeholder]</div>";
      vizHtml +=
        "<h2>Refactor Preview</h2><div class='diff'><pre>Before: ...\nAfter: ...</pre></div>";
      vizHtml += "</body></html>";
      VisualizationPanel.createOrShow(context.extensionUri, vizHtml);
    }
  );

  const ciCdCommand = vscode.commands.registerCommand(
    "superrefactor.ciCdChecks",
    async () => {
      const ci = new CiCdIntegration();
      const result = ci.runRefactorChecks();
      ci.reportStatus("GitHub", result);
      ci.notify("Slack", result.details);
      vscode.window.showInformationMessage(`CI/CD checks: ${result.details}`);
    }
  );

  const welcomeCommand = vscode.commands.registerCommand(
    "superrefactor.welcomePanel",
    () => {
      WelcomePanel.createOrShow(context.extensionUri);
    }
  );

  // Load and run plugins
  const pluginConfigPath = path.join(
    __dirname,
    "../superrefactor.plugins.json"
  );
  let plugins = [];
  if (fs.existsSync(pluginConfigPath)) {
    const config = JSON.parse(fs.readFileSync(pluginConfigPath, "utf8"));
    for (const pluginDef of config.plugins) {
      const pluginPath = path.join(__dirname, pluginDef.path);
      if (fs.existsSync(pluginPath)) {
        plugins.push({ ...pluginDef, module: require(pluginPath) });
      }
    }
  }

  function getFilesByExtension(ext) {
    // Example utility for plugin context
    const files = [];
    function walk(dir) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(fullPath);
        else if (entry.name.endsWith(ext)) files.push(fullPath);
      }
    }
    walk(vscode.workspace.rootPath || process.cwd());
    return files;
  }

  const runPluginCommand = vscode.commands.registerCommand(
    "superrefactor.runPlugin",
    async () => {
      for (const plugin of plugins) {
        if (plugin.module.onInit) plugin.module.onInit();
        try {
          const result = await plugin.module.run(
            { getFilesByExtension },
            plugin.options || {}
          );
          vscode.window.showInformationMessage(
            `Plugin ${plugin.name} finished: ${
              result.success ? "Success" : "Failure"
            }`
          );
          if (plugin.module.onAfterRefactor) plugin.module.onAfterRefactor();
        } catch (err) {
          if (plugin.module.onError) plugin.module.onError(err);
          else console.error(err);
        }
      }
    }
  );

  // Add commands to context
  context.subscriptions.push(refactorCommand);
  context.subscriptions.push(migrateCommand);
  context.subscriptions.push(pythonRefactorCommand);
  context.subscriptions.push(previewDiffCommand);
  context.subscriptions.push(workspaceOverviewCommand);
  context.subscriptions.push(runPluginCommand);
  context.subscriptions.push(visualizationCommand);
  context.subscriptions.push(ciCdCommand);
  context.subscriptions.push(welcomeCommand);
}

/**
 * Called when the extension is deactivated
 */
function deactivate() {
  console.log("SuperRefactor Pro deactivated");
}

module.exports = {
  activate,
  deactivate,
};
