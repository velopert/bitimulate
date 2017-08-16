const FB = require('fb');
const google = require('googleapis');

const plus = google.plus('v1');

function getFacebookProfile(accessToken) {
  return FB.api('me', { fields: ['email'], access_token: accessToken }).then(
    (auth) => ({
      id: auth.id,
      email: auth.email
    })
  );
}

function getGoogleProfile(accessToken) {
  return new Promise((resolve, reject) => {
    plus.people.get({
      userId: 'me', 
      access_token: accessToken
    }, (err, auth) => {
      if(err) reject(err);
      resolve({
        id: auth.id,
        email: auth.emails[0].value
      });
    });
  });
}

exports.getProfile = (provider, accessToken) => {
  const getters = {
    google: getGoogleProfile,
    facebook: getFacebookProfile
  };
  
  return getters[provider](accessToken);
};