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
    },
    cachify(fn, exp, prefix = '') {
      return async (...params) => {
        const key = `${prefix}${fn.name}:${JSON.stringify(params)}`;
        const cached = await this.get(key);
        if (cached) {
          return cached;
        }

        const result = await fn(...params);
        this.set(key, result, exp);
        return result;
      };
    }
  };
})();