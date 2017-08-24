const log = require('lib/log');
const ChartData = require('db/models/ChartData');
const Joi = require('joi');

exports.getChartData = async (ctx) => {
  const { period } = ctx.query;

  if(!period) {
    ctx.body = {
      message: 'period is missing'
    };
    ctx.status = 400;
  }

  const { name } = ctx.params;

  // ☑️ TODO: 데이터 캐싱
  try {
    const data = await ChartData.findByNameAndPeriod(name, period);
    ctx.body = data;
  } catch (e) {
    ctx.throw(e, 500);
  }
};