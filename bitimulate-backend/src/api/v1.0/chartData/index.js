const Router = require('koa-router');

const chartData = new Router();
const chartDataCtrl = require('./chartData.ctrl');

chartData.get('/:name', chartDataCtrl.getChartData);

module.exports = chartData;