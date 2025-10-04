/**
 * Fuzz Test Harness for SuperRefactor
 * Randomly mutates synthetic project files and triggers refactor workflows to test robustness.
 */

const fs = require("fs");
const path = require("path");
const { migrateProject } = require("../src/adapters/jsToTsMigrator");

function randomMutation(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  // Simple mutation: randomly insert a comment or change a number
  if (Math.random() > 0.5) {
    content = "// Fuzz mutation\n" + content;
  } else {
    content = content.replace(/\d+/, () => Math.floor(Math.random() * 1000));
  }
  fs.writeFileSync(filePath, content);
}

function fuzzTestProject(targetDir, numMutations = 10) {
  const files = fs.readdirSync(targetDir).filter((f) => f.endsWith(".ts"));
  for (let i = 0; i < numMutations && i < files.length; i++) {
    const filePath = path.join(targetDir, files[i]);
    randomMutation(filePath);
    console.log(`Mutated: ${filePath}`);
  }
  // Run migration workflow after mutations
  migrateProject(targetDir, { runTests: true, testRunner: "jest" });
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const targetDir = args[0] || "./synthetic_project";
  const numMutations = parseInt(args[1], 10) || 10;
  fuzzTestProject(targetDir, numMutations);
}

module.exports = { fuzzTestProject };
