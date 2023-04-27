import { Grid } from '@mui/material';
import React from 'react';
import {
  PieChart, Pie, Cell, Legend, Tooltip,
} from 'recharts';
import useStyles from '../../../../custom-hooks/useStyles';
import { colors } from '../../../../theme';
import { CustomTooltip } from './commonComponent';
import style from './style';

const COLORS = [colors.torchRed, colors.yellow, colors.purple, colors.vibrantGreen, colors.reddishMagenta, colors.borderGrey, colors.pinkShade, colors.skyBlue, colors.persianBlue, colors.darkBrown, colors.seaGreen, colors.purpleShade, colors.dullGreen, colors.rosePink, colors.blackGreen];

function CourseEnrollmentBreakdown({ label, data }) {
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
    <Grid conatiner className={classes.regionPiechart}>
      <div className={classes.heading}>{label}</div>
      <PieChart
        width={400}
        height={400}
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
          innerRadius={60}
          fill="#8884d8"
          minAngle={7}
        >
          {data?.length && data?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              innerRadius={37}
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

export default CourseEnrollmentBreakdown;
