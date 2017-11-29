import React, { Component } from 'react';
import styles from './ProfitChart.scss';
import classNames from 'classnames/bind';
import echarts from 'echarts';
import { SpinnerBlock } from 'components';
import moment from 'moment';

window.moment = moment;
const cx = classNames.bind(styles);

class ProfitChart extends Component {
  drawChart = () => {
    const { earningsHistory } = this.props;
    if(earningsHistory.isEmpty()) return;

    if(this.echart) {
      this.echart.dispose();
      this.echart = null;
    }

    const myChart = echarts.init(this.chart);
    this.echart = myChart;

    const data = earningsHistory.toJS();

    const dates = data.map(history => moment(history.createdAt).format('YYYY-MM-DD HH:mm'));
    const values = data.map(history => history.ratio);

    const option = {
      color: ['#00BCD4'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        formatter: (params) => {
          const { value, axisValue } = params[0];
          return `<b>${axisValue}</b><br/>수익률: ${(Math.round(value * 10000)/100).toFixed(2)}%`
        }
      },
      grid: { 
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '2%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: dates,
          axisTick: { 
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: (value) => {
              return (Math.round(value * 10000)/100).toFixed(2) + '%'
            }
          }
        }
      ],
      series: [
        {
          name: '수익률',
          type: 'line',
          // barWidth: data.length > 50 ? '100%' : '75%',
          data: values,
          smooth: true,
          lineStyle: { normal: { color: '#26C6DA', width: 5 } },
          areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#80DEEA'
                }, {
                    offset: 1,
                    color: '#80DEEA'
                }])
            }
         },
        }
      ]
    };

    myChart.setOption(option);
  }

  componentDidMount() {
    const { earningsHistory } = this.props;
    if(!earningsHistory.isEmpty()) {
      this.drawChart();
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.earningsHistory !== this.props.earningsHistory) {
      if(prevProps.earningsHistory.size === this.props.earningsHistory.size) return;
      this.drawChart();
    }
  }
  
  render() {
    const { earningsHistory } = this.props;
    
    return (
      <div>
      <h2>월 수익률 차트</h2>
        { earningsHistory.isEmpty() ? 
        (
          <div className={cx('not-available')}>
            수익률 데이터가 아직 존재하지 않습니다 :(
          </div>
        ): (
          <div className={cx('profit-chart')}>
            <div className={cx('chart')} ref={ref=>this.chart = ref}>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default ProfitChart;