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
  if(data.length === 1 && data[0].date === 0) {
    return Promise.resolve();
  }

  const converted = data.map(data => Object.assign({}, data, {
    date: data.date * 1000,
    name,
    period
  }));
  return this.create(converted);
};

ChartData.statics.findByNameAndPeriod = function(name, period) {
  const weekly = { 
    date: { 
      '$lt': new Date() - 1000 * 60 * 60 * 24 * 7
    } 
  };

  const query = Object.assign({
    name, period
  }, period === 300 ? weekly : { });

  return this.find(query).sort({
    date: 1
  });
};

module.exports = mongoose.model('ChartData', ChartData);