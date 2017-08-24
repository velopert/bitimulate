const chalk = require('chalk');
const Moment = require('moment');

function getTime() {
  const now = new Moment();
  const time = chalk.dim(`[${now.format('HH:mm:ss')}]`);
  return time;
}

function log(...message) {
  const time = getTime();
  const type = chalk.bold('[LOG]');
  console.log(`${time}${type}`, ...message);
}

log.info = (...message) => {
  const time = getTime();
  const type = chalk.bold(chalk.cyan('[INFO]'));
  console.log(`${time}${type}`, ...message);
};

log.error = (...message) => {
  const time = getTime();
  const type = chalk.bold(chalk.red('[ERROR]'));
  console.log(`${time}${type}`, ...message);
};

module.exports = log;