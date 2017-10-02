const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const token = require('lib/token');

const { PASSWORD_HASH_KEY: secret } = process.env;

function hash(password) {
  return crypto.createHmac('sha256', secret).update(password).digest('hex');
}

const Wallet = new Schema({
  BTC: Schema.Types.Double,
  USD: Schema.Types.Double
}, { _id: false, strict: false });

const User = new Schema({
  displayName: String,
  email: String,
  social: {
    facebook: {
      id: String,
      accessToken: String
    },
    google: {
      id: String,
      accessToken: String
    }
  },
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  metaInfo: {
    initial: {
      currency: String,
      value: Schema.Types.Double
    },
    pinned: [String]
  },
  wallet: {
    type: Wallet,
    default: {
      BTC: 0,
      USD: 0
    }
  }
});

User.statics.findByEmail = function(email) {
  return this.findOne({email}).exec();
};

User.statics.findByDisplayName = function(displayName) {
  return this.findOne({displayName}).exec();
};

User.statics.findExistancy = function({email, displayName}) {
  return this.findOne({
    $or: [
      {email},
      {displayName}
    ]
  }).exec();
};

User.statics.findSocialId = function({provider, id}) {
  const key = `social.${provider}.id`;

  return this.findOne({
    [key]: id
  });
};

User.statics.localRegister = function({ displayName, email, password, initial }) {
  const user = new this({
    displayName, 
    email,
    password: hash(password),
    metaInfo: {
      initial
    }
  });

  // sets initial money
  const { currency, value } = initial;
  user.wallet[currency] = value;

  return user.save();
};

User.statics.socialRegister = function({
  displayName,
  email,
  provider,
  accessToken,
  socialId,
  initial
}) {
  const user = new this({
    displayName,
    email,
    social: {
      [provider]: {
        id: socialId,
        accessToken: accessToken
      }
    },
    metaInfo: {
      initial
    }
  });

  const { currency, value } = initial;
  
  user.wallet[currency] = value;

  return user.save();
};

User.methods.validatePassword = function(password) {
  const hashed = hash(password);
  return this.password === hashed;
};

User.methods.generateToken = function() {
  const { _id, displayName } = this;
  return token.generateToken({
    user: {
      _id,
      displayName
    }
  }, 'user');
};

module.exports = mongoose.model('User', User);