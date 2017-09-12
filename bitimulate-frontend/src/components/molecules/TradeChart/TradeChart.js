import React, { Component } from 'react';
import styles from './TradeChart.scss';
import classNames from 'classnames/bind';
import echarts from 'echarts';
const cx = classNames.bind(styles);

class TradeChart extends Component {

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.data !== this.props.data) {
      this.drawChart();
    }
  }
  
  drawChart = () => {
    const myChart = echarts.init(this.chart);
    const { data } = this.props;
       
    const dates = data.map(info => new Date(info.get('date') * 1000).toString()).toJS();
    const candleStickData = data.map(info => {
      return [
        info.get('open'),
        info.get('close'),
        info.get('low'),
        info.get('high')
      ];
    }).toJS();
    const volumes = data.map(info => info.get('volume')).toJS();


    var option = {
        backgroundColor: '#424242',
        legend: {
            data: ['日K'],
            inactiveColor: '#777',
            textStyle: {
                color: '#fff'
            }
        },
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
            axisLine: { lineStyle: { color: '#8392A5' } }
        },
        yAxis: {
            scale: true,
            axisLine: { lineStyle: { color: '#8392A5' } },
            splitLine: { show: false }
        },
        grid: {
            bottom: 80
        },
        dataZoom: [{
            textStyle: {
                color: '#8392A5'
            },
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
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
        }],
        animation: false,
        series: [
            {
                type: 'candlestick',
                name: '日K',
                data: candleStickData,
                itemStyle: {
                    normal: {
                        color: '#FD1050',
                        color0: '#0CF49B',
                        borderColor: '#FD1050',
                        borderColor0: '#0CF49B'
                    }
                }
            },
            
        ]
    };
    
        myChart.setOption(option);
  }
  componentDidMount() {
    this.drawChart();
  }

  render() {
    return (
      <div className={cx('trade-chart')}>
        <div className={cx('chart')} ref={ref=>{this.chart = ref}}>
        </div>
      </div>
    )
  }
}

export default TradeChart;