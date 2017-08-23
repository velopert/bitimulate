const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const log = require('lib/log');

const {
  MONGO_URI: mongoURI
} = process.env;

module.exports = (function () {
  mongoose.Promise = global.Promise;

  return {
    connect () {
      return mongoose.connect(mongoURI, {
        useMongoClient: true
      }).then(
        () => {
          log.info('Successfully connected to mongodb');
        }
      ).catch(e => {
        console.error(e);
      });
    }
  };
})();