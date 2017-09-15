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

    const dates = data.map(info => moment(new Date(info.get('date') * 1000)).format('YY. MMM DD HH:mm')).toJS();
    const candleStickData = data.map(info => {
      return [
        info
          .get('open')
          .toFixed(10),
        info
          .get('close')
          .toFixed(10),
        info
          .get('low')
          .toFixed(10),
        info
          .get('high')
          .toFixed(10)
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

    var option = {
      backgroundColor: '#eeeeee',
      legend: {
        top: 0,
        data: [
          {
            name: '가치변화',
            icon: 'rect'
          }, {
            name: 'MA5',
            icon: 'rect'
          }, {
            name: 'MA15',
            icon: 'rect'
          }, {
            name: 'MA50',
            icon: 'rect'
          }
        ],
        inactiveColor: '#777'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        backgroundColor: 'rgba(245, 245, 245, 0.8)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
          color: '#000'
        },
        position: function (pos, params, el, elRect, size) {
          var obj = {
            top: 10
          };
          obj[
            ['left', 'right'][+ (pos[0] < size.viewSize[0] / 2)]
          ] = 30;
          return obj;
        },
        extraCssText: 'width: 170px'
      },
      axisPointer: {
        link: {xAxisIndex: 'all'},
        label: {
            backgroundColor: '#777'
          }
      },

      grid: [
        {
          top: '10%',
          left: '0',
          right: '0',
          height: '65%'
        }, {
          left: '0',
          right: '0',
          bottom: '5%',
          height: '15%'
        }
      ],
      // xAxis: {   type: 'category',   data: dates,   axisLine: {     lineStyle: {
      //    color: '#8392A5'     }   } },
      xAxis: [
        {
          type: 'category',
          data: dates,
          scale: true,
          boundaryGap: false,
          axisLine: {
            onZero: false
          },
          splitLine: {
            show: false
          },
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax',
          axisPointer: {
            z: 100
          }
        }, {
          type: 'category',
          gridIndex: 1,
          data: dates,
          scale: true,
          boundaryGap: false,
          axisLine: {
            onZero: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax'
        }
      ],
      yAxis: [
        {
          scale: true,
          splitArea: {
            show: true
          }
        }, {
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [
            0, 1
          ],
          start: 60,
          end: 100
        }, {
          show: true,
          xAxisIndex: [
            0, 1
          ],
          type: 'slider',
          bottom: '0%',
          height: '5%',
          start: 60,
          end: 100
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
              width: 2
            }
          }
        }, {
          name: 'MA15',
          type: 'line',
          data: calculateMA(15),
          smooth: true,
          lineStyle: {
            normal: {
              width: 2
            }
          }
        }, {
          name: 'MA50',
          type: 'line',
          data: calculateMA(50),
          smooth: true,
          lineStyle: {
            normal: {
              width: 2
            }
          }
        }, {
          name: 'Volume',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: volumes
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
          ? <Spinner color="#a1a1a1"/>
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