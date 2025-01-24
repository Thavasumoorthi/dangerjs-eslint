import { danger, fail } from "danger";
const { execSync } = require("child_process");

// Run Git command to get added and modified files
const createdFilterAddedFiles = execSync('git diff --name-only --cached --diff-filter=AM').toString().split('\n').filter(Boolean);
console.log("createdandfilteraddedfiles", createdFilterAddedFiles);


let jsFiles =[...danger.git.modified_files,... danger.git.created_files]

// Run ESLint on changed JavaScript files
 jsFiles = jsFiles.filter((file) =>  file.endsWith(".js"));
console.log("jsfiles is", jsFiles);

jsFiles = jsFiles.filter((file) => file !== "dangerfile.js");
console.log("after filter jsfiles is", jsFiles);

if (jsFiles.length > 0) {
  console.log("Running ESLint on modified files...");
  try {
    // Run ESLint and capture output
    const eslintOutput = execSync(`npx eslint ${jsFiles.join(" ")}`, {
      encoding: "utf-8",
    });
    console.log("++ESlintoutput ", eslintOutput);
  } catch (error) {
    // Fail the Danger run if ESLint reports issues
    const eslintErrors = error.stdout || error.message;
    fail(`ESLint reported errors:\n\n\`\`\`\n${eslintErrors}\n\`\`\``);
  }
} else {
  console.log("No JavaScript files were modified.");
}

// DangerRule: checking if package.json has been changed or not
const modifiedFiles = danger.git.modified_files || danger.git.created_files;
console.log("Recently modified files are ", modifiedFiles);

modifiedFiles.forEach(file => {
  if (file === "package.json") {
    fail("You have recently changed the package.json file");
  }
});
