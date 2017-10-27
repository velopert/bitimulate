const User = require('db/models/User');
const log = require('lib/log');
const progress = require('cli-progress');

const batchSize = 100; // 1000;

function getUsersCount() {
  return User.count().exec();
}

async function processWallets() {
  try {
    const count = await getUsersCount();
    log.info(count, 'users');
    const length = Math.ceil(count / batchSize);

    const bar = new progress.Bar({}, progress.Presets.shades_classic);
    bar.start(length - 1, 0);
    for(let i = 0; i < length; i++) {
      const users = await User.find().skip(i * batchSize).limit(batchSize).exec();
      await Promise.all(users.map(user => user.saveBalance(10)));
      // console.log(i * batchSize, batchSize * (i + 1));
      bar.update(i);
    }
    bar.stop();
  } catch (e) {

  }
  console.log('processing wallets...');
}

module.exports = processWallets;