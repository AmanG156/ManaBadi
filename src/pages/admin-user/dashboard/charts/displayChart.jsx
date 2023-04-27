import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import clsx from 'clsx';
import {
  EnrollmentGrowthAcrossYear,
  ReturningBreakdownAcrossYear,
  CourseEnrollmentBreakdown,
  EnrollmentBreakDownByweek,
  GeoRegionBreakdownGraph,
  ReturningBreakdown,
  CourseEnrollBreakdownAcrossYear,
  GeoRegionBreakdownAcrossYear,
  EnrollmentBreakDownAcrossYear,
  MapView,
} from './index';

import useCustomCubeQuery from '../../../../custom-hooks/useCustomCubeQuery';
import useStyles from '../../../../custom-hooks/useStyles';
import style from './style';
import { getQuery } from './helper';
import chartTypes from './types';
import useAdmin from '../../../../custom-hooks/useAdmin';

function renderChart(type, chartData, t) {
  if (type === chartTypes.ENROLLMENT_GROWTH_ACROSS_YEAR) {
    return (
      <EnrollmentGrowthAcrossYear
        label={t('ENROLLMENT_GROWTH_ACROSS_YEAR')}
        data={chartData?.length && chartData[0]}
      />
    );
  }
  if (type === chartTypes.RETURNING_BREAKDOWN_ACROSS_YEAR) {
    return (
      <ReturningBreakdownAcrossYear
        label={t('RETURNING_BREAKDOWN_ACROSS_YEAR')}
        data={chartData?.length && chartData[0]}
      />
    );
  }
  if (type === chartTypes.COURSE_ENROLLMENT_BREAKDOWN) {
    return (
      <CourseEnrollmentBreakdown
        label={t('COURSE_ENROLLMENT_BREAKDOWN')}
        data={chartData?.length && chartData[0]}
      />
    );
  }

  if (type === chartTypes.ENROLLMENT_BREAKDOWN_BY_WEEK) {
    return (
      <EnrollmentBreakDownByweek
        label={t('ENROLLMENT_BREAKDOWN_BY_WEEK')}
        data={chartData?.length && chartData[0]}
      />
    );
  }
  if (type === chartTypes.RETURNING_BREAKDOWN) {
    return (
      <ReturningBreakdown
        label={t('RETURNING_BREAKDOWN')}
        data={chartData?.length && chartData[0]}
      />
    );
  }
  if (type === chartTypes.GEO_REGION_BREAK_DOWN) {
    return (
      <GeoRegionBreakdownGraph
        label={t('GEO_REGION_BREAKDOWN')}
        data={chartData?.length && chartData[0]}
      />
    );
  }
  if (type === chartTypes.COURSE_ENROLLMENT_BREAKDOWN_BY_REGION) {
    return (
      <GeoRegionBreakdownAcrossYear
        label={t('GEO_REGION_BREAKDOWN')}
        data={chartData?.length && chartData[0]}
      />
    );
  }
  if (type === chartTypes.COURSE_ENROLLMENT_BREAKDOWN_ACROSS_YEAR) {
    return (
      // <GroupedBarChart
      <CourseEnrollBreakdownAcrossYear
        label={t('COURSE_ENROLLMENT_BREAKDOWN')}
        data={chartData?.length && chartData[0]}
      />
    );
  }
  if (type === chartTypes.MAP_VIEW) {
    return (
      <MapView
        label={t('MAP_VIEW')}
        data={chartData?.length && chartData[0]}
      />
    );
  }
  if (type === chartTypes.ENROLLMENT_BREAKDOWN_ACROSS_YEAR) {
    return (
      <EnrollmentBreakDownAcrossYear
        label={t('ENROLLMENT_BREAKDOWN1')}
        data={chartData?.length && chartData[0]}
      />
    );
  }
  return true;
}
function DisplayChart(props) {
  const { type, setLoading } = props;
  const adminData = useAdmin();
  const selectedOption = adminData?.graphOption;
  const enrollGraphOption = adminData?.enrollGraphOption;
  useEffect(() => {}, [selectedOption, adminData, enrollGraphOption]);
  const query = getQuery(type, selectedOption, enrollGraphOption);
  const {
    chartData, resultSet, error,
  } = useCustomCubeQuery(query, type);
  const { t } = useTranslation();
  const classes = useStyles(style)();
  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (!resultSet) {
    setLoading(true);
    return null;
  }
  if (resultSet) {
    setLoading(false);
  }
  return (
    <div
      className={
        type === chartTypes.ENROLLMENT_GROWTH_ACROSS_YEAR
          ? clsx(classes.containterLinerChart, classes.containter)
          : classes.containter
      }
    >
      {chartData && chartData?.length ? (
        renderChart(type, chartData, t, resultSet)
      ) : (
        <Grid className={classes.noData}>
          <DoNotDisturbIcon />
          <Grid>
            <Typography variant="subtitle2" color="text.secondary">
              {t('NO_DATA')}
            </Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default DisplayChart;
