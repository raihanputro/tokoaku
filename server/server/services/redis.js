const _ = require('lodash');
const Redis = require('ioredis');

const redisHost = process.env.REDIS_HOST || '127.0.0.1:6379';
let client = null;

/*
 *  PRIVATE FUNCTION
 */
const __redis = () => {
  if (_.isNull(client) || (!_.isEmpty(client) && client.status === 'end')) {
    console.log(['Redis', 'INFO'], { info: 'SINGLE_REDIS' });
    const redisArr = redisHost.split(':');
    const host = redisArr[0];
    const port = redisArr[1];
    const password = redisArr[2];
    client = new Redis({
      port,
      host,
      password,
      retryStrategy: (options) => {
        console.log(['Redis Session', `Retry Strategy on host ${host}`], { options });
        if (options.error && options.error.code === 'ECONNREFUSED') {
          // If redis refuses the connection or is not able to connect
          return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
          // End reconnection after the specified time limit
          return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
          // End reconnecting with built in error
          return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 4000);
      }
    });

    return client;
  } 
  
  client.on('connect', (err) => {
    console.log(['Redis', 'Connected', 'INFO'], { info: `${err}` });
  });

  client.on('error', (err) => {
    console.log(['Redis', 'Client On Error', 'ERROR'], { info: `${err}` });
    client.disconnect();
    return Promise.reject(err);
  });

  return client;
};

/*
 *  PUBLIC FUNCTION
 */
const getKey = async (dataObject) => {
  const { key, isErrorOptional } = dataObject;
  return new Promise((resolve, reject) => {
    __redis().get(key, (err, result) => {
      if (err) {
        console.log(['Redis', 'Get Data', 'ERROR'], {
          key,
          info: `${err}`
        });
        if (isErrorOptional) {
          return resolve(null);
        }

        return reject(err);
      }

      return resolve(result);
    });
  });
};

const setKey = async (dataObject) => {
  const { key, value, isSetExpired, second, isErrorOptional } = dataObject;
  return new Promise((resolve, reject) => {
    __redis().set(key, value, (err, result) => {
      if (err) {
        console.log(['Redis', 'Set Data', 'ERROR'], {
          key,
          info: `${err}`
        });

        if (isErrorOptional) {
          return resolve(null);
        }

        return reject(err);
      }

      if (isSetExpired) {
        let expiredSecond = 86400; // Default expiry one day
        if (!_.isEmpty(second) && !Number.isNaN(Number(second))) {
          expiredSecond = Number(second);
        }
        __redis().expire(key, expiredSecond, (error) => {
          if (error) {
            console.log(['Redis', 'Set Expired Data', 'ERROR'], {
              key,
              info: `${err}`
            });
          }
        });
      }

      return resolve(result);
    });
  });
};

module.exports = {
  getKey,
  setKey
};