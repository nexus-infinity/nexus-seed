const fs = require("fs");
const execSync = require("child_process").execSync;

function fixLoggingSystem() {
  const loggingFilePath = "src/loggingSystem.ts";
  if (fs.existsSync(loggingFilePath)) {
    let content = fs.readFileSync(loggingFilePath, "utf-8");
    if (!content.includes("metadata?: any")) {
      content = content.replace(
        /log\(message: string\): void {/,
        "log(message: string, metadata?: any): void {"
      );
      content = content.replace(
        /console\.log\(message\);/,
        "if (metadata) { console.log(message, metadata); } else { console.log(message); }"
      );
      fs.writeFileSync(loggingFilePath, content, "utf-8");
      console.log("[INFO]: Fixed src/loggingSystem.ts to support metadata logging.");
    } else {
      console.log("[INFO]: src/loggingSystem.ts already supports metadata logging.");
    }
  } else {
    console.error("[ERROR]: src/loggingSystem.ts not found.");
  }
}

function validateAndFixProject() {
  console.log("[INFO]: Starting validation and fix process...");
  fixLoggingSystem();

  try {
    console.log("[INFO]: Validating TypeScript...");
    execSync("npx tsc --noEmit", { stdio: "inherit" });
    console.log("[INFO]: TypeScript validation passed!");
  } catch (error) {
    console.error("[ERROR]: TypeScript validation failed. Please review logs.");
  }
}

validateAndFixProject();
