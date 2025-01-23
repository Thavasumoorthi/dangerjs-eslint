const { danger, warn, fail } = require('danger');
const { execSync } = require('child_process');

// Get all the files changed in the PR
const changedFiles = danger.git.modified_files.filter(file => file.endsWith('.js'));

if (changedFiles.length > 0) {
  console.log('Running ESLint on the following files:', changedFiles);

  changedFiles.forEach(file => {
    try {
      // Run ESLint on the file
      const eslintOutput = execSync(`npx eslint ${file} --format json`, { encoding: 'utf-8' });
      const lintResults = JSON.parse(eslintOutput);

      lintResults.forEach(result => {
        result.messages.forEach(({ message, severity, line, column }) => {
          if (severity === 1) {
            warn(`${message} (${file}:${line}:${column})`);
          } else if (severity === 2) {
            fail(`${message} (${file}:${line}:${column})`);
          }
        });
      });
    } catch (error) {
      console.error(`ESLint error on file ${file}:`, error.message);
    }
  });
} else {
  console.log('No JavaScript files changed.');
}
