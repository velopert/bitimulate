const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { Double } } = Schema;

const ChartData = new Schema({
  name: String,
  date: Date,
  high: Double,
  low: Double,
  open: Double,
  close: Double,
  volume: Double,
  quoteVolume: Double,
  weightedAverage: Double,
  period: Number
});

ChartData.statics.drop = function () {
  return this.remove({}).exec();
};

ChartData.statics.massImport = function (name, data, period) {
  const converted = data.map(data => Object.assign({}, data, {
    date: data.date * 1000,
    name,
    period
  }));
  return this.create(converted);
};

ChartData.statics.findByNameAndPeriod = function(name, period) {
  return this.find({
    name,
    period
  }).sort({
    date: 1
  });
};

module.exports = mongoose.model('ChartData', ChartData);