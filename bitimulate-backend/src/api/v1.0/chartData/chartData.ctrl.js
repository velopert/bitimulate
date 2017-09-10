const log = require('lib/log');
const ChartData = require('db/models/ChartData');
const Joi = require('joi');
const poloniex = require('lib/poloniex');
const cache = require('lib/cache');

exports.getChartData = async (ctx) => {
  const { type } = ctx.query;

  if(!type) {
    ctx.body = {
      message: 'type is missing'
    };
    ctx.status = 400;
    return;
  }

  const day = 60 * 60 * 24;
  const today = Math.round((new Date() / 1000));

  const Option = (start, period) => ({start, period});

  const options = {
    all: Option(0, 86400),
    year: Option(today - 365 * day, 14400),
    month: Option(today - 30 * day, 1800),
    week: Option(today - 7 * day, 300)
  };

  const exists = Object.keys(options).includes(type);

  if(!exists) {
    ctx.body = {
      message: 'invalid type'
    };
    ctx.status = 400;
    return;
  }

  const { name } = ctx.params;
  const { start, period } = options[type];

  const timebase = today % period;

  const cacheKeys = {
    lastTimebase: `chart.data:${name}:${type}:last.timebase`,
    chartData: `chart.data:${name}:${type}`,
    compareDate: `chart.data:${name}:${type}.compare.date`
  };

  const lastTimebase = await cache.get(cacheKeys.lastTimebase);

  if (lastTimebase - timebase < period) {
    const data = await cache.get(cacheKeys.chartData);
    if(data) {
      log('loading from cache');
      ctx.body = data;
      return;
    }
  }

  try {
    log('loading new one');
    const data = await poloniex.getChartData(name, period, start);
    ctx.body = data;
    cache.set(cacheKeys.lastTimebase, timebase);
    cache.set(cacheKeys.chartData, data);
    if(data.length < 1) return;
    cache.set(cacheKeys.compareDate, data[data.length - 1].date);
  } catch (e) {
    ctx.throw(e, 500);
  }
};