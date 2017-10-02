const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

const { Schema } = mongoose;
const { Types } = Schema;

const Order = new Schema({
  userId: Types.ObjectId,
  currencyPair: String,
  price: Schema.Types.Double,
  amount: Schema.Types.Double,
  sell: Boolean
});

module.exports = mongoose.model('Order', Order);