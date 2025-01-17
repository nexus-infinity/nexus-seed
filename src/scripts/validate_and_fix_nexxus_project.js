
const fs = require("fs");
const path = require("path");
const execSync = require("child_process").execSync;

function runCommand(command) {
  try {
    console.log(`[INFO]: Running: ${command}`);
    execSync(command, { stdio: "inherit" });
    console.log(`[INFO]: Command succeeded: ${command}`);
  } catch (error) {
    console.error(`[ERROR]: Command failed: ${command}`);
    process.exit(1);
  }
}

function checkAndFixFile(filePath, fixCallback) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf-8");
    const fixedContent = fixCallback(content);
    fs.writeFileSync(filePath, fixedContent, "utf-8");
    console.log(`[INFO]: Fixed ${filePath}`);
  } else {
    console.error(`[ERROR]: File not found: ${filePath}`);
    process.exit(1);
  }
}

function validateAndFixProject() {
  console.log("[INFO]: Starting validation and fix process...");
  
  // Check project structure
  const requiredFiles = [
    "vite.config.mjs",
    "src/index.ts",
    "src/taskQueue.ts",
    "src/workflowManager.ts",
    "src/loggingSystem.ts",
    "src/fileScanner.ts",
    "src/largeFileProcessor.ts",
    "src/metadataExtractor.ts",
    "src/errorHandling.ts"
  ];

  requiredFiles.forEach(file => {
    if (!fs.existsSync(file)) {
      console.error(`[ERROR]: Missing required file: ${file}`);
      process.exit(1);
    }
  });

  console.log("[INFO]: All required files are present.");

  // Validate TypeScript
  console.log("[INFO]: Validating TypeScript...");
  try {
    runCommand("npx tsc --noEmit");
  } catch {
    console.log("[INFO]: Fixing TypeScript issues...");
    
    // Example fix: Fixing src/index.ts for missing arguments
    checkAndFixFile("src/index.ts", (content) => {
      return content.replace(/loggingSystem.log\(`Metadata extracted for \$\{filePath\}:`, metadata\)/g, 
        "loggingSystem.log(`Metadata extracted for ${filePath}: ${metadata}`)");
    });

    console.log("[INFO]: Retrying TypeScript validation...");
    runCommand("npx tsc --noEmit");
  }

  // Build project
  console.log("[INFO]: Building the project...");
  runCommand("npm run build");

  console.log("[INFO]: Validation and fixes completed successfully!");
}

validateAndFixProject();
