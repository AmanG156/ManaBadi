import { CubeProvider } from '@cubejs-client/react';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Loader } from '../../../components/atoms';
import useAdmin from '../../../custom-hooks/useAdmin';
import DisplayChart from './charts/displayChart';
import chartTypes from './charts/types';
import { getCubejsApi } from '../../../utils/cube';

export default function gridView() {
  const adminData = useAdmin();
  const selectedOption = adminData?.graphOption;
  const [loading, setLoading] = useState(true);
  const ennrollGraphOption = adminData?.ennrollGraphOption;
  useEffect(() => {}, [selectedOption, ennrollGraphOption]);
  const displayChartAccordingToType = (type, width) => (
    <Grid item xs={12} sm={width || 6} md={width || 4}>
      <CubeProvider cubejsApi={getCubejsApi()}>
        <DisplayChart type={type} {...{ setLoading }} />
      </CubeProvider>
    </Grid>
  );

  const yearMonthWeekGraphs = () => (
    <>
      {displayChartAccordingToType(chartTypes.RETURNING_BREAKDOWN)}
      {displayChartAccordingToType(chartTypes.COURSE_ENROLLMENT_BREAKDOWN)}
      {displayChartAccordingToType(chartTypes.GEO_REGION_BREAK_DOWN)}
      {(selectedOption === 'month' || selectedOption === 'year')
        && displayChartAccordingToType(chartTypes.ENROLLMENT_BREAKDOWN_BY_WEEK)}
      {displayChartAccordingToType(chartTypes.MAP_VIEW)}
    </>
  );

  const acrossYearGraphs = () => (
    <>
      {displayChartAccordingToType(chartTypes.ENROLLMENT_GROWTH_ACROSS_YEAR, 6)}
      {displayChartAccordingToType(
        chartTypes.RETURNING_BREAKDOWN_ACROSS_YEAR,
        6,
      )}
      {displayChartAccordingToType(
        chartTypes.ENROLLMENT_BREAKDOWN_ACROSS_YEAR,
        12,
      )}
      {displayChartAccordingToType(
        chartTypes.COURSE_ENROLLMENT_BREAKDOWN_ACROSS_YEAR,
        6,
      )}
      {displayChartAccordingToType(
        chartTypes.COURSE_ENROLLMENT_BREAKDOWN_BY_REGION,
        6,
      )}
    </>
  );
  return (
    <div>
      {loading ? <Loader message="" /> : null}
      {selectedOption === 'none' ? null : (
        <Grid container spacing={2} pb={6}>
          {selectedOption === 'acrossyear' || !selectedOption
            ? acrossYearGraphs()
            : yearMonthWeekGraphs()}
        </Grid>
      )}
    </div>
  );
}
