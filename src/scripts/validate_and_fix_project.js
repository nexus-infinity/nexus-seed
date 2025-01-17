const fs = require("fs");
const execSync = require("child_process").execSync;
const path = require("path");

// Helper function to execute shell commands
function runCommand(command, description) {
  console.log(`[INFO]: ${description}...`);
  try {
    execSync(command, { stdio: "inherit" });
    console.log(`[SUCCESS]: ${description}`);
  } catch (error) {
    console.error(`[ERROR]: ${description} failed!`);
    process.exit(1);
  }
}

// Fix missing or misconfigured files
function fixProjectFiles() {
  const requiredFiles = [
    { path: "vite.config.mjs", content: `export default { base: './' };` },
    { path: "src/index.ts", content: `console.log("Hello World");` }, // Replace with your logic
  ];

  for (const file of requiredFiles) {
    if (!fs.existsSync(file.path)) {
      console.log(`[INFO]: Missing file: ${file.path}. Creating...`);
      fs.writeFileSync(file.path, file.content, "utf-8");
      console.log(`[SUCCESS]: Created ${file.path}`);
    }
  }
}

// Analyze and fix TypeScript issues
function fixTypeScriptErrors() {
  console.log("[INFO]: Validating TypeScript...");
  try {
    execSync("npx tsc --noEmit", { stdio: "inherit" });
    console.log("[SUCCESS]: TypeScript validation passed.");
  } catch (error) {
    console.log("[WARNING]: TypeScript validation failed. Attempting to fix...");
    const filesToFix = [
      "src/index.ts",
      "src/taskQueue.ts",
      "src/loggingSystem.ts",
      "src/fileScanner.ts",
      "src/largeFileProcessor.ts",
      "src/metadataExtractor.ts",
      "src/errorHandling.ts",
    ];

    filesToFix.forEach((filePath) => {
      if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, "utf-8");
        content = content.replace(/import { (\w+) } from '\.\/(\w+)'/g, `import * as $1 from './$2';`); // Example fix
        fs.writeFileSync(filePath, content, "utf-8");
        console.log(`[INFO]: Fixed ${filePath}`);
      }
    });

    console.log("[INFO]: Retrying TypeScript validation...");
    try {
      execSync("npx tsc --noEmit", { stdio: "inherit" });
      console.log("[SUCCESS]: TypeScript validation passed after fixes.");
    } catch (err) {
      console.error("[ERROR]: TypeScript validation still failing. Manual intervention required.");
    }
  }
}

// Build the project
function buildProject() {
  runCommand("npm run build", "Building the project");
}

// Serve the project and log output
function serveProject() {
  console.log("[INFO]: Starting project server...");
  try {
    execSync("npx serve dist", { stdio: "inherit" });
    console.log("[SUCCESS]: Project served successfully.");
  } catch (error) {
    console.error("[ERROR]: Failed to serve the project.");
    process.exit(1);
  }
}

// Main execution flow
function main() {
  console.log("[INFO]: Starting validation and fix process...");
  fixProjectFiles();
  fixTypeScriptErrors();
  buildProject();
  serveProject();
  console.log("[INFO]: Validation and fix process completed!");
}

// Run the script
main();