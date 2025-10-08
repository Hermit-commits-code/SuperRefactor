// Test for migrate.js (ideal output check)
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { migrateJsToTs } = require("./migrate");

const input = path.join(__dirname, "examples/simple.js");
const output = path.join(__dirname, "migrated/simple.ts");

// Clean up from previous runs
if (fs.existsSync(output)) fs.unlinkSync(output);

migrateJsToTs(input);

const idealTs = `// [Migrated to TypeScript]\n// A simple JS file for migration testing\nfunction greet(name: string): string {\n  return \"Hello, \" + name;\n}\n\ninterface User {\n  id: number;\n  name: string;\n}\n\nconst user: User = { id: 1, name: \"Alice\" };\n\nconsole.log(greet(user.name));\n`;

if (fs.existsSync(output)) {
  const tsCode = fs.readFileSync(output, "utf8");
  if (tsCode.trim() === idealTs.trim()) {
    // Now type-check the output
    try {
      execSync("npx tsc", { stdio: "pipe" });
      console.log(
        "Migration test passed: Output matches ideal TypeScript and type-checks with no errors."
      );
      process.exit(0);
    } catch (err) {
      console.error(
        "Migration test failed: TypeScript errors detected in migrated output."
      );
      console.error(err.stdout ? err.stdout.toString() : err.message);
      process.exit(3);
    }
  } else {
    console.error(
      "Migration test failed: Output does not match ideal TypeScript."
    );
    console.error("Expected:\n" + idealTs);
    console.error("Actual:\n" + tsCode);
    process.exit(2);
  }
} else {
  console.error("Migration test failed: Output file not created.");
  process.exit(1);
}
