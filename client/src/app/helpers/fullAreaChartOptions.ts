import * as Highcharts from 'highcharts';
import { Options } from 'highcharts';

export const fullAreaChartOptions: Options = {
  chart: {
    height: 300,
  },
  title: {
    text: '',
  },
  navigator: {
    enabled: false,
  },
  scrollbar: {
    enabled: false,
  },
  rangeSelector: {
    buttons: [
      {
        type: 'day',
        count: 1,
        text: '1D',
      },
      {
        type: 'week',
        count: 1,
        text: '1W',
      },
      {
        type: 'month',
        count: 1,
        text: '1M',
      },
      {
        type: 'year',
        count: 1,
        text: '1Y',
      },
      {
        type: 'all',
        count: 1,
        text: 'All',
      },
    ],
    selected: 1,
    inputEnabled: false,
  },
  series: [
    {
      tooltip: {
        valueDecimals: 2,
      },
      type: 'area',
      color: '#0C6CF2',
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
        },
        stops: [
          [0, Highcharts.getOptions().colors[0]],
          [
            1,
            Highcharts.color(Highcharts.getOptions().colors[0])
              .setOpacity(0)
              .get('rgba')
              .toString(),
          ],
        ],
      },
      threshold: null,
      data: [] 
    },
  ],
};
