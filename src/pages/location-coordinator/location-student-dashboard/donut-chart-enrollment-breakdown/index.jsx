import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Grid,
} from '@mui/material';
import {
  Surface,
  Symbols,
} from 'recharts';
import useStyles from '../../../../custom-hooks/useStyles';
import styles from './style';
import DisplayDonutChart from '../../../common/donut-chart/displayDonutChart';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (label) => {
  const {
    cx, cy, midAngle, innerRadius, outerRadius, payload,
  } = label;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.35;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fontWeight="bold" fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${payload.value}`}
    </text>
  );
};

const renderCusomizedLegend = ({ payload }, classes) => {
  payload.sort((a, b) => a.payload.level - b.payload.level);

  return (
    <div className={classes.customLegend}>
      {payload.map((entry, index) => {
        const { value, color } = entry;
        const style = {
        };
        return (
          <span
            key={index}
            className={classes.legendItem}
            style={style}
          >
            <Surface
              width={12}
              height={12}
              style={{ float: 'left', marginTop: '3px', marginRight: '3px' }}
              viewBox={{
                x: 0,
                y: 0,
                width: 12,
                height: 12,
              }}
            >
              <Symbols cx={5} cy={5} type="circle" size={70} fill={color} />
              <Symbols
                cx={5}
                cy={5}
                type="circle"
                size={25}
                fill={color}
              />
            </Surface>
            <span>{`  ${value}`}</span>
          </span>
        );
      })}
    </div>
  );
};

export default function DonutChartEnrollmentBreakDown({ location, year }) {
  const classes = useStyles(styles)();
  const { t } = useTranslation();
  return (
    <Grid container item direction="column">
      <div className={`${classes.title} `}>
        {t('COURSE_ENROLLMENT_BREAKDOWN')}
      </div>
      <div className={classes.horizontalLine} />
      <div>
        <DisplayDonutChart
          renderCusomizedLegend={renderCusomizedLegend}
          renderCustomizedLabel={renderCustomizedLabel}
          location={location}
          year={year}
        />
      </div>
    </Grid>

  );
}
