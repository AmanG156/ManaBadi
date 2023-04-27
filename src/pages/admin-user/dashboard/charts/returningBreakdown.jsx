import { Grid } from '@mui/material';
import React from 'react';
import {
  PieChart, Pie, Cell, Legend, Tooltip,
} from 'recharts';
import { useTranslation } from 'react-i18next';
import useStyles from '../../../../custom-hooks/useStyles';
import { colors } from '../../../../theme';
import style from './style';
import { CustomTooltip } from './commonComponent';

const COLORS = [colors.reddishMagenta, colors.redShade];

function ReturningBreakdown({ label, data }) {
  const { t } = useTranslation();

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul>
        {payload.map((entry, index) => (
          <li key={`item-${index}`}>
            <div
              className="dots"
              style={{ background: COLORS[index % COLORS.length] }}
            />
            {entry?.value === 'false'
              ? t('NEW_STUDENTS')
              : t('RETURN_STUDENTS')}
          </li>
        ))}
      </ul>
    );
  };
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
    <Grid container className={classes.enrollWeekGraph}>
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
          minAngle={3}
          innerRadius={60}
        >
          {data?.length > 0
            && data?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
        </Pie>
        <Tooltip content={CustomTooltip} />
        <Legend content={renderLegend} iconType="circle" />
      </PieChart>
    </Grid>
  );
}

export default ReturningBreakdown;
