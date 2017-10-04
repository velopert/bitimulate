const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

const { Schema } = mongoose;
const { Types } = Schema;

const Order = new Schema({
  userId: Types.ObjectId,
  currencyPair: String,
  price: Schema.Types.Double,
  amount: Schema.Types.Double,
  processedAmount: {
    type: Schema.Types.Double,
    default: 0
  },
  sell: Boolean,
  status: {
    type: String,
    enum: ['waiting', 'partial', 'processed'],
    default: 'waiting'
  },
  date: {
    type: Date,
    default: new Date()
  },
  processedDate: {
    type: Date,
    default: null
  }
});

Order.statics.findByUserId = function(userId, cursor) {
  return this.find({
    userId,
    ...(cursor ? { _id: { $lt: cursor } } : {})
  }, {
    userId: false
  }).sort({ 
    _id: -1
  }).limit(20).exec();
};

module.exports = mongoose.model('Order', Order);