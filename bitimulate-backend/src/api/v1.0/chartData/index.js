const Router = require('koa-router');

const chartData = new Router();
const chartDataCtrl = require('./chartdata.ctrl');

chartData.get('/:name', chartDataCtrl.getChartData);

module.exports = chartData;