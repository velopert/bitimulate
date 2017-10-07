const LZUTF8 = require('lzutf8');

const compress = (str) => {
  return new Promise((resolve, reject) => {
    LZUTF8.compressAsync(str, {
      outputEncoding: 'BinaryString'
    }, (result, error) => {
      if(error) reject(error);
      resolve(result);
    });
  });
}

exports.compress = compress;

const parseJSON = (str) => {
  let parsed = null;
  try {
    parsed = JSON.parse(str);
  } catch (e) {
    return null;
  }
  return parsed;
};

exports.parseJSON = parseJSON;
