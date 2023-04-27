import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from 'recharts';
import useStyles from '../../../custom-hooks/useStyles';
import colorPalete from '../courses-color-palette';
import styles from './style';

// eslint-disable-next-line func-names
const BarWithBorder = (borderHeight) => function (props) {
  const {
    fill, x, y, width, height,
  } = props;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} stroke="#fff" strokeWidth="1px" fill={fill} />
      <rect x={x} y={y} width={width} height={borderHeight} borderColor="#fff" stroke="none" fill="#fff" />
    </g>
  );
};

const defaultBarColors = ['#ffffbe', '#b3b385', '#e5ffbe', '#fff2be', '#b3a985', '#b3a985', '#aa8e74', '#b7f3a5', '#80aa74', '#c5a5f3'];

export default function ColumnChart({
  yAxisLabel, xAxisLabel, barColors, customizedAxisTick, renderCusomizedLegend, chartData, courses,
}) {
  const classes = useStyles(styles)();

  const renderBars = () => {
    if (!chartData || chartData.length === 0) {
      return null;
    }

    const bars = courses.map((val, i) => {
      let color = colorPalete(val) || defaultBarColors[i];
      if (barColors && barColors[i]) {
        color = barColors[i];
      }
      return (<Bar key={i} dataKey={val} shape={BarWithBorder(3)} stackId="a" fill={color} />);
    });

    return bars;
  };

  return (
    <ResponsiveContainer>
      <BarChart
        data={chartData}
      >

        <XAxis
          padding={{ left: 40, right: 40 }}
          dataKey="name"
          height={110}
          axisLine={{ stroke: '#2965CD' }}
          interval={0}
          tick={(value) => customizedAxisTick(value, classes)}
        >
          <Label
            fontWeight="bold"
            value={xAxisLabel}
            offset={3}
            position="insideBottom"
          />
        </XAxis>

        <YAxis
          width={80}
          padding={{ top: 50 }}
          axisLine={{ stroke: '#2965CD' }}
          tickLine={{ fill: '#2965CD', stroke: '#2965CD', strokeWidth: 2 }}
        >
          <Label
            value={yAxisLabel}
            fontWeight="bold"
            offset={25}
            position="insideLeft"
            angle={-90}
            dy={75}
          />
        </YAxis>

        <Tooltip />
        <Legend
          verticalAlign="top"
          height={110}
          align="left"
          wrapperStyle={{
            padding: '10px',
          //  width: '700px',
          }}
          iconType="circle"
          content={(value) => renderCusomizedLegend(value, classes)}
        />
        {renderBars()}
      </BarChart>
    </ResponsiveContainer>
  );
}
