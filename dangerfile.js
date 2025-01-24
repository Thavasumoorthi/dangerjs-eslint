const { danger, fail } = require("danger");
const { execSync } = require("child_process");

// Run ESLint on changed JavaScript files
let jsFiles = danger.git.modified_files.filter((file) =>
  file.endsWith(".js")
);

jsFiles=jsFiles.filter((file=>{
  file!="dangerfile.js"
}))



if (jsFiles.length > 0) {
  console.log("Running ESLint on modified files...");
  try {
    // Run ESLint and capture output
    const eslintOutput = execSync(`npx eslint ${jsFiles.join(" ")}`, {
      encoding: "utf-8",
    });
    console.log("++ESlintoutput ",eslintOutput);
  } catch (error) {
    // Fail the Danger run if ESLint reports issues
    const eslintErrors = error.stdout || error.message;
    fail(`ESLint reported errors:\n\n\`\`\`\n${eslintErrors}\n\`\`\``);
  }
} else {
  console.log("No JavaScript files were modified.");
}
