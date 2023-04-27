import { Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from 'recharts';
import useStyles from '../../../../custom-hooks/useStyles';
import { colors } from '../../../../theme';
import style from './style';

export default function EnrollmentBreakDownByweek({ label, data }) {
  const classes = useStyles(style)();
  const { t } = useTranslation();

  return (
    <Grid container className={classes.enrollWeekGraph}>
      <div className={classes.heading}>{label}</div>
      <BarChart
        width={600}
        height={300}
        data={data}
        dots="false"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend
          height={36}
          align="left"
          iconType="circle"
        />
        <Bar dataKey="isNew" fill={colors.purple} name={t('NEW_STUDENTS')} />
        <Bar
          dataKey="isReturning"
          name={t('RETURN_STUDENTS')}
          fill={colors.yellow}
        />
      </BarChart>
    </Grid>
  );
}
