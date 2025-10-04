// Mock vscode module for testing
module.exports = {
    commands: {
        registerCommand: (command, callback) => ({ dispose: () => {} })
    },
    window: {
        showInformationMessage: (message) => console.log('Mock info:', message),
        createWebviewPanel: () => ({
            reveal: () => {},
            onDidDispose: () => ({ dispose: () => {} }),
            webview: { html: '' },
            title: '',
            dispose: () => {}
        }),
        activeTextEditor: null
    },
    ViewColumn: { One: 1 },
    Uri: {
        joinPath: () => ({ toString: () => '' })
    }
};