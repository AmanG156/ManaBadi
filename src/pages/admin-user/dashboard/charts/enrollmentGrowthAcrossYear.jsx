import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import useStyles from '../../../../custom-hooks/useStyles';
import style from './style';

function CustomTooltip({ payload, label, active }) {
  const { t } = useTranslation('translation');
  if (active && payload !== null && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${t('VALUE')} : ${payload[0].value}`}</p>
        <p className="label">{`${t('DATE')} : ${label}`}</p>
      </div>
    );
  }

  return null;
}

function EnrollmentGrowthAcrossYear(props) {
  const { data, xAxisName, label } = props;
  const classes = useStyles(style)();
  return (
    <Grid conatiner>
      <div className={classes.heading}>{label}</div>
      <div>
        <p className="verticle">{xAxisName}</p>
        <ResponsiveContainer
          width="100%"
          height={400}
        >
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 10,
              bottom: 10,
            }}
          >
            <XAxis dataKey="name" fontSize="8px" fontWeight={500} />
            <YAxis fontSize="8px" fontWeight={500} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              height={40}
              dataKey="value"
              stroke="#2979ff"
              activeDot={{ r: 6 }}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Grid>
  );
}

export default EnrollmentGrowthAcrossYear;
