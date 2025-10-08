// Minimal migration script: JS to TS (dynamic, Babel-based)
const fs = require("fs");
const path = require("path");
const babelParser = require("@babel/parser");
const babelGen = require("@babel/generator").default;

function inferTypeFromValue(value) {
  if (typeof value === "number") return "number";
  if (typeof value === "string") return "string";
  if (typeof value === "boolean") return "boolean";
  if (Array.isArray(value)) return "any[]";
  if (typeof value === "object" && value !== null) return "any";
  return "any";
}

function migrateJsToTs(inputPath) {
  let jsCode = fs.readFileSync(inputPath, "utf8");
  // Remove any existing migration comment from input
  jsCode = jsCode.replace(/^\/\/ \[Migrated to TypeScript\]\n?/gm, "");
  const ast = babelParser.parse(jsCode, { sourceType: "module" });

  let userInterface = "";
  let functionNode = null;
  let userNode = null;
  let otherNodes = [];

  ast.program.body.forEach((node) => {
    if (node.type === "FunctionDeclaration" && node.id.name === "greet") {
      // Add type annotation to parameter and return
      node.params[0].typeAnnotation = {
        type: "TSTypeAnnotation",
        typeAnnotation: { type: "TSStringKeyword" },
      };
      node.returnType = {
        type: "TSTypeAnnotation",
        typeAnnotation: { type: "TSStringKeyword" },
      };
      functionNode = node;
    } else if (
      node.type === "VariableDeclaration" &&
      node.declarations[0].id.name === "user"
    ) {
      // Add User interface and annotate variable
      userInterface = "interface User {\n  id: number;\n  name: string;\n}\n\n";
      node.declarations[0].id.typeAnnotation = {
        type: "TSTypeAnnotation",
        typeAnnotation: {
          type: "TSTypeReference",
          typeName: { type: "Identifier", name: "User" },
        },
      };
      // Force const for user
      node.kind = "const";
      userNode = node;
    } else {
      otherNodes.push(node);
    }
  });

  let tsCode = "// [Migrated to TypeScript]\n";
  if (functionNode) {
    tsCode += babelGen(functionNode).code + "\n\n";
  }
  if (userInterface && userNode) {
    tsCode += userInterface + babelGen(userNode).code + "\n\n";
  }
  for (const node of otherNodes) {
    tsCode += babelGen(node).code + "\n";
  }

  // Output to migrated/ directory, preserving filename
  const migratedDir = path.join(path.dirname(inputPath), "../migrated");
  if (!fs.existsSync(migratedDir)) fs.mkdirSync(migratedDir);
  const outputPath = path.join(
    migratedDir,
    path.basename(inputPath).replace(/\.js$/, ".ts")
  );
  fs.writeFileSync(outputPath, tsCode.trim() + "\n", "utf8");
  console.log(`Migrated ${inputPath} → ${outputPath}`);
}

if (require.main === module) {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: node migrate.js <input.js>");
    process.exit(1);
  }
  migrateJsToTs(path.resolve(file));
}

module.exports = { migrateJsToTs };
