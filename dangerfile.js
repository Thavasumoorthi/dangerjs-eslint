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

      console.log("++++eslintoutput",eslintOutput)
      
      // Ensure output is valid JSON and check for messages
      if (eslintOutput) {
        const lintResults = JSON.parse(eslintOutput);

        // Extract and log only the messages related to 'no-unused-vars' rule
        lintResults.forEach(result => {
          result.messages.forEach(({ message, severity, line, column }) => {
            // If severity is 2 (error), use fail, if severity is 1 (warning), use warn
            const location = `(${file}:${line}:${column})`;
            if (severity === 2) {
              fail(`${message} ${location}`);
            } else if (severity === 1) {
              warn(`${message} ${location}`);
            }
          });
        });
      } else {
        console.log(`No linting issues found for ${file}.`);
      }
    } catch (error) {
      console.error(`Error processing ESLint on file ${file}:`, error.message);
      
      // Log the output in case ESLint fails
      if (error.stdout) {
        console.error('ESLint output:', error.stdout.toString());
      }
      if (error.stderr) {
        console.error('ESLint error:', error.stderr.toString());
      }
    }
  });
} else {
  console.log('No JavaScript files changed.');
}
