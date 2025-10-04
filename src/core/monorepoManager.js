// MonorepoManager: Detects and manages monorepo structure, workspaces, and cross-language adapters

const fs = require("fs");
const path = require("path");

class MonorepoManager {
  constructor(rootDir) {
    this.rootDir = rootDir;
    this.workspaces = [];
    this.detectedLanguages = new Set();
  }

  detectWorkspaces() {
    // Detect package.json, pyproject.toml, etc. in subdirectories
    const entries = fs.readdirSync(this.rootDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subdir = path.join(this.rootDir, entry.name);
        if (fs.existsSync(path.join(subdir, "package.json"))) {
          this.workspaces.push({ type: "js", path: subdir });
          this.detectedLanguages.add("js");
        }
        if (fs.existsSync(path.join(subdir, "pyproject.toml"))) {
          this.workspaces.push({ type: "python", path: subdir });
          this.detectedLanguages.add("python");
        }
        // Add more language/project detection as needed
      }
    }
  }

  getAdapters() {
    // Return adapter modules for each detected language
    const adapters = {};
    if (this.detectedLanguages.has("js")) {
      adapters.js = require("../adapters/jsToTsMigrator");
    }
    if (this.detectedLanguages.has("python")) {
      adapters.python = require("../adapters/pythonRefactor");
    }
    return adapters;
  }

  traverseWorkspaces(visitor) {
    for (const ws of this.workspaces) {
      if (ws.type === "js") {
        // Traverse JS/TS files
        const files = this._findFiles(ws.path, [".js", ".ts"]);
        for (const file of files) {
          visitor(file, ws.type);
        }
      }
      if (ws.type === "python") {
        // Traverse Python files
        const files = this._findFiles(ws.path, [".py"]);
        for (const file of files) {
          visitor(file, ws.type);
        }
      }
    }
  }

  _findFiles(dir, exts) {
    let results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(this._findFiles(fullPath, exts));
      } else {
        if (exts.some((ext) => entry.name.endsWith(ext))) {
          results.push(fullPath);
        }
      }
    }
    return results;
  }
}

module.exports = MonorepoManager;
