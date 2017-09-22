const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = (function() {
  const client = redis.createClient();
  
  return {
    get client() {
      return client;
    },
    set(key, value, exp) {
      if(exp) {
        return client.setAsync(key, JSON.stringify(value), 'EX', exp);
      }
      return client.setAsync(key, JSON.stringify(value));
    },
    get(key) {
      return client.getAsync(key).then(data => {
        if(!data) return null;
        return JSON.parse(data);
      });
    }
  };
})();