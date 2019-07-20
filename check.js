const { exec } = require('child_process');
const { CLIEngine } = require('eslint');

const cli = new CLIEngine({});
function getErrorLevel(number) {
  switch (number) {
    case 2:
      return 'error';
    case 1:
      return 'warn';
    default:
  }
  return 'undefined';
}
let pass = 0;
exec('git status -s | egrep \'^[AM]\' | egrep \'.(vue|js)$\'', (error, stdout) => {
  if (stdout.length) {
    process.env.NODE_ENV = 'production';

    let array = stdout.split('\n');
    array.pop();
    array = array.map((status) => {
      return status.split('  ')[1];
    });
    const { results } = cli.executeOnFiles(array);
    let errorCount = 0;
    let warningCount = 0;
    results.forEach((result) => {
      errorCount += result.errorCount;
      warningCount += result.warningCount;
      if (result.messages.length > 0) {
        console.log('\n');
        console.log(result.filePath);
        result.messages.forEach((obj) => {
          const level = getErrorLevel(obj.severity);
          console.log(`   ${obj.line}:${obj.column}  ${level}  ${obj.message}  ${obj.ruleId}`);
          pass = 1;
        });
      }
    });
    if (warningCount > 0 || errorCount > 0) {
      console.log(`\n   ${errorCount + warningCount} problems (${errorCount} ${'errors'} ${warningCount} warnings)`);
    }
    process.exit(pass);
  }
  if (error !== null) {
    console.log(`exec error: ${error}`);
  }
});
