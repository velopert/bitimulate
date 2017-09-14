import React, {Component} from 'react';
import styles from './TradeChart.scss';
import classNames from 'classnames/bind';
import echarts from 'echarts';
import moment from 'moment';
import {Spinner} from 'components';

const cx = classNames.bind(styles);
class TradeChart extends Component {

  echart = null

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loading && !this.props.loading) {
      this.drawChart();
    }
  }

  componentWillUnmount() {
    if (this.echart) {
      this
        .echart
        .dispose();
      this.echart = null;
    }
  }

  drawChart = () => {
    if (this.props.loading) 
      return;
    if (this.echart) {
      this
        .echart
        .dispose();
      this.echart = null;
    }
    const myChart = echarts.init(this.chart);
    this.echart = myChart;
    const {data} = this.props;

    const dates = data.map(info => moment(new Date(info.get('date') * 1000)).format('MMM DD HH:mm')).toJS();
    const candleStickData = data.map(info => {
      return [
        info.get('open').toFixed(10),
        info.get('close').toFixed(10),
        info.get('low').toFixed(10),
        info.get('high').toFixed(10)
      ];
    }).toJS();
    const volumes = data
      .map(info => info.get('volume'))
      .toJS();
    const avgs = data
      .map(info => info.get('close'))
      .toJS();

    function calculateMA(count) {
      const result = [];
      for (let i = 0; i < data.size; i++) {
        if (i < count) {
          result.push('-');
          continue;
        }
        let sum = 0;
        for (let j = 0; j < count; j++) {
          sum += data.getIn([
            i - j,
            'weightedAverage'
          ]);
        }

        result.push((sum / count).toFixed(10));
      }
      return result;
    }

    console.log(calculateMA(5));

    var option = {
      backgroundColor: '#424242',
      // legend: {
      //   data: [
      //     { name: '가치변화', icon: 'rect' },
      //     { name: 'MA5', icon: 'rect' },
      //     { name: 'MA15', icon: 'rect' },
      //     { name: 'MA50', icon: 'rect' }
      //   ],
      //   inactiveColor: '#777',
      //   textStyle: {
      //     color: '#fff'
      //   }
      // },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false,
          type: 'cross',
          lineStyle: {
            color: '#376df4',
            width: 2,
            opacity: 1
          }
        }
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: {
          lineStyle: {
            color: '#8392A5'
          }
        }
      },
      yAxis: {
        scale: true,
        axisLine: {
          lineStyle: {
            color: '#8392A5'
          }
        },
        splitLine: {
          show: false
        }
      },
      grid: [
          {
              left: '0',
              right: '0',
              height: '60%'
          },
          {
              left: '0%',
              right: '0%',
              bottom: '10%',
              height: '15%'
          }
      ],
      dataZoom: [
        {
          textStyle: {
            color: '#8392A5'
          },
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.' +
              '3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V2' +
              '4.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          dataBackground: {
            areaStyle: {
              color: '#8392A5'
            },
            lineStyle: {
              opacity: 0.8,
              color: '#8392A5'
            }
          },
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }, {
          type: 'inside'
        }
      ],
      animation: false,
      series: [
        {
          type: 'candlestick',
          name: '가치변화',
          data: candleStickData,
          itemStyle: {
            normal: {
              color: '#0CF49B',
              color0: '#FD1050',
              borderColor: '#0CF49B',
              borderColor0: '#FD1050'
            }
          }
        }, {
          name: 'MA5',
          type: 'line',
          data: calculateMA(5),
          smooth: true,
          lineStyle: {
            normal: {
              width: 2,
              color: '#ffbc62',
            }
          }
        },{
          name: 'MA15',
          type: 'line',
          data: calculateMA(15),
          smooth: true,
          lineStyle: {
            normal: {
              width: 2,
              color: '#3eabff',
            }
          }
        }, {
          name: 'MA50',
          type: 'line',
          data: calculateMA(50),
          smooth: true,
          lineStyle: {
            normal: {
              width: 2,
              color: '#26ffc5'
            }
          }
        }
        //   {     name: 'Volume',     type: 'bar',     xAxisIndex: 1,     yAxisIndex:
        // 1,     data: data.volumes }
      ]
    };

    myChart.setOption(option);
  }
  componentDidMount() {
    this.drawChart();
  }

  render() {
    const {loading} = this.props;
    return (
      <div className={cx('trade-chart')}>
        {loading
          ? <Spinner/>
          : <div
            className={cx('chart')}
            ref={ref => {
            this.chart = ref
          }}></div>}
      </div>
    )
  }
}

export default TradeChart;