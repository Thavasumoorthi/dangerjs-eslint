const { danger, warn, fail } = require('danger');
const { execSync } = require('child_process');

// Get all the files changed in the PR
const changedFiles = danger.git.modified_files.filter(file => file.endsWith('.js'));



if (changedFiles.length > 0) {
  console.log('Running ESLint on the following files:', changedFiles);
}
  changedFiles.forEach(file => {

    if(file!="dangerfile.js")
    {
        const eslintOutput = execSync(`npx eslint ${file}`, { encoding: 'utf-8' });
        console.log("++eslint",eslintOutput)
    }
    
})