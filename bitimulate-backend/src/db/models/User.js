const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const token = require('lib/token');
const ExchangeRate = require('./ExchangeRate');
const EarningsHistory = require('./EarningsHistory');

const { PASSWORD_HASH_KEY: secret } = process.env;

function hash(password) {
  return crypto.createHmac('sha256', secret).update(password).digest('hex');
}

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
      value: Schema.Types.Double,
      usdRate: Schema.Types.Double
    },
    monthly: {
      usdValue: Schema.Types.Double,
      usdRate: Schema.Types.Double
    },
    pinned: [String],
    rewardWallet: {
      address: String,
      destinationTag: String
    }
  },
  wallet: {
    type: Schema.Types.Mixed,
    default: {
      BTC: 0,
      USD: 0
    }
  },
  walletOnOrder: {
    type: Schema.Types.Mixed,
    default: {
      BTC: 0,
      USD: 0
    }
  },
  balanceHistory: {
    type: [{
      value: Schema.Types.Double,
      date: Date
    }],
    default: []
  },
  earningsHistory: {
    type: [{
      ratio: Schema.Types.Double,
      date: Date
    }],
    default: []
  },
  earningsRatio: {
    type: Schema.Types.Double,
    default: 0,
    index: true
  },
  monthlyRatio: {
    type: Schema.Types.Double,
    default: 0,
    index: true
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

User.statics.localRegister = async function({ displayName, email, password, initial }) {
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

  const usdRate = await ExchangeRate.getUSDRate();
  user.metaInfo.initial.usdRate = usdRate;

  user.metaInfo.monthly = {
    usdRate,
    usdValue: initial.currency === 'BTC' ? initial.value / usdRate : initial.value
  };

  return user.save();
};

User.statics.socialRegister = async function({
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

  const usdRate = await ExchangeRate.getUSDRate();
  user.metaInfo.initial.usdRate = usdRate;

  user.metaInfo.monthly = {
    usdRate: usdRate,
    usdValue: initial.currency === 'BTC' ? initial.value / usdRate : initial.value
  };
  
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

User.methods.updateEarningsRatio = function(ratio) {
  return this.update({
    $set: {
      earningsRatio: ratio
    }
  });
};

User.methods.saveEarnings = function(ratio, monthly) {
  EarningsHistory.create(this._id, monthly);

  this.update({
    $set: {
      earningsRatio: ratio,
      monthlyRatio: monthly
    }
  }).exec();
};

User.methods.updateRewardWallet = function({address, destinationTag}) {
  this.update({
    $set: {
      'metaInfo.rewardWallet': {
        address,
        destinationTag
      }
    }
  });
};

User.statics.getTopRanking = function(monthly) {
  const key = monthly ? 'monthlyRatio' : 'earningsRatio';

  return this.find({}, { _id: false, displayName: true, [key]: true }).sort({ [key]: -1 }).limit(100).exec();
};

User.methods.saveMonthlyUSD = function(usdValue, usdRate) {
  return this.update({
    $set: {
      'metaInfo.monthly': {
        usdValue, usdRate
      }
    }
  });
};

// User.methods.saveEarnings = function(balance) {
//   if(!this.balanceHistory) {
//     return this.model('User').findByIdAndUpdate(this._id, {
//       $set: {
//         balanceHistory: [{
//           time: new Date(),
//           value: balance
//         }]
//       }
//     }).exec();
//   }

//   return this.model('User').findByIdAndUpdate(this._id, {
//     $push: {
//       balanceHistory: {
//         date: new Date(),
//         value: balance
//       }
//     }
//   }).exec();
// };

module.exports = mongoose.model('User', User);