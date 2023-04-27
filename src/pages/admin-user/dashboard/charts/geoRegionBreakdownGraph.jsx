import { Grid } from '@mui/material';
import React from 'react';
import {
  PieChart, Pie, Cell, Legend, Tooltip,
} from 'recharts';
import useStyles from '../../../../custom-hooks/useStyles';
import { colors } from '../../../../theme';
import style from './style';
import { CustomTooltip } from './commonComponent';

const COLORS = [colors.torchRed, colors.yellow, colors.purple, colors.vibrantGreen, colors.reddishMagenta, colors.lightMustard];

function GeoRegionBreakdownGraph({ label, data }) {
  const classes = useStyles(style)();
  const totalValue = data.reduce((sum, item) => {
    // eslint-disable-next-line no-param-reassign
    sum += parseInt(item.value, 10);
    return sum;
  }, 0);
  // eslint-disable-next-line no-param-reassign
  data = data.map((item) => {
    // eslint-disable-next-line no-param-reassign
    item.totalValue = totalValue;
    return item;
  });
  return (
    <Grid conatiner className={classes.geoRegionChart}>
      <div className={classes.heading}>{label}</div>
      <PieChart
        width={400}
        height={400}
        fontSize="1vw"
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <Pie
          data={data}
          color="#000000"
          dataKey="value"
          nameKey="name"
          fill="#8884d8"
          minAngle={7}
        >
          {data?.length > 0 && data?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              // radius={entry.value}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip content={CustomTooltip} />
        <Legend iconType="circle" />
      </PieChart>
    </Grid>
  );
}

export default GeoRegionBreakdownGraph;
