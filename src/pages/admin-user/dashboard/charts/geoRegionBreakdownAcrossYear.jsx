import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { formatData } from './formatData';
import { colors } from '../../../../theme';

export default function GeoRegionBreakdownAcrossYear(props) {
  const { data, label } = props;
  const newData = data?.length && formatData(data, 'region');
  const resultData = newData && newData?.length > 0 ? newData[0] : [];
  const defaultOptions = {
    credits: {
      enabled: false,
    },
    chart: {
      type: 'column',
    },
    title: {
      align: 'left',
      text: label,
      style: {
        padding: 0,
        fontWeight: 600,
        color: colors.primaryBlueColor,
        paddingBottom: 20,
      },
    },
    xAxis: {
      categories: resultData?.categories,
      crosshair: true,
    },
    yAxis: {
      labels: {
        format: '{value}',
      },
      min: 0,
      title: {
        text: ' ',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>'
          + '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    colors: [
      colors.persianBlue,
      colors.yellowOrange,
      colors.rum,
      colors.highLand,
      colors.violet,
      colors.persimmon,
      colors.rosePink,
      colors.primary,
      colors.secondary,
    ],
    plotOptions: {
      series: {
        pointWidth: 15,
      },
      column: {
        pointPadding: 0.2,
        size: '95%',
        borderWidth: 0,
        events: {
          legendItemClick() {
            return false;
          },
        },
      },
      allowPointSelect: false,
    },
    series: resultData?.data,
  };
  const chartOptions = { ...defaultOptions, ...props };
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}
