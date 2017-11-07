const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const User = require('./User');

const { Schema } = mongoose;
// const { Types } = Schema;

const EarningsHistory = new Schema({
  ratio: Schema.Types.Double,
  userId: {
    type: Schema.Types.ObjectId,
    ref: User
  }
}, { timestamps: true });

EarningsHistory.index({ createdAt: 1 }, {expireAfterSeconds: 60 * 60 * 24 * 30});

EarningsHistory.statics.create = function(userId, ratio) {
  const earnings = new this({
    userId,
    ratio
  });

  return earnings.save();
};

module.exports = mongoose.model('EarningsHistory', EarningsHistory);