import React from 'react';
import {
  Grid,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  Surface,
  Symbols,
} from 'recharts';
import { CubeProvider } from '@cubejs-client/react';
import useStyles from '../../../../custom-hooks/useStyles';
import styles from './style';
import DisplayColumnChart from '../../../common/column-chart/displayCoumnChart';
import { getCubejsApi } from '../../../../utils/cube';

function CustomizedAxisTick(props) {
  const {
    x, y, payload, classes,
  } = props;

  try {
    const [firstLine, secondLine] = payload.value.split(',');
    return (
      <g className={classes.xAxisTickWrapper} transform={`translate(${x},${y})`}>
        <foreignObject x="-16" textAnchor="middle" width="3vw" height="4vw">
          <text textAnchor="middle" x="0" y="9">
            <tspan x="0" dy="24em">{firstLine}</tspan>
          </text>
        </foreignObject>
        <foreignObject x="-16" y="2vw" textAnchor="middle" width="2vw" height="4vw">
          <text textAnchor="middle" x="0" y="17">
            <tspan className={classes.bold} x="0" dy="2em">{secondLine}</tspan>
          </text>
        </foreignObject>
      </g>
    );
  } catch (e) {
    return null;
  }
}

const renderCusomizedLegend = ({ payload }, classes) => {
  return (
    <div className={classes.customLegend}>
      {payload.map((entry, index) => {
        const { dataKey, color } = entry;
        const style = {
        };
        return (
          <span
            key={index}
            className={classes.legendItem}
            onClick={() => this.handleClick(dataKey)}
            style={style}
          >
            <Surface
              width={12}
              height={12}
              // className={classes.circleAlign}
              style={{ float: 'left', marginTop: '3px', marginRight: '3px' }}
              viewBox={{
                x: 0,
                y: 0,
                width: 12,
                height: 12,
              }}
            >
              <Symbols cx={5} cy={5} type="circle" size={70} fill={color} className={classes.circleAlign} />
              <Symbols cx={5} cy={5} type="circle" size={25} fill={color} className={classes.circleAlign} />
            </Surface>
            <span>{`  ${dataKey.charAt(0).toUpperCase() + dataKey.slice(1)}`}</span>
          </span>
        );
      })}
    </div>
  );
};

const customAxisTick = (payload, classes) => <CustomizedAxisTick {...payload} classes={classes} />;

export default function BarChartEnrollmentBreakdown({ location, year }) {
  const classes = useStyles(styles)();
  const { t } = useTranslation();

  return (
    <CubeProvider cubejsApi={getCubejsApi()}>
      <Grid container item direction="column">
        <div className={`${classes.title} `}>
          {t('ENROLLMENT_BREAKDOWN')}
        </div>
        <div className={classes.horizontalLine} />
        <div className={classes.chartWrapper}>
          <DisplayColumnChart
            location={location}
            year={year}
            yAxisLabel={t('TOTAL_ENROLLMENT')}
            xAxisLabel={t('WEEK')}
            customizedAxisTick={customAxisTick}
            renderCusomizedLegend={renderCusomizedLegend}
          />
        </div>
      </Grid>
    </CubeProvider>

  );
}
