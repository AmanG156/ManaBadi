/* eslint-disable radix */
import { useCubeQuery } from '@cubejs-client/react';
import chartTypes from '../pages/admin-user/dashboard/charts/types';
import { getWeekNumOfMonthOfDate } from '../utils/methods';

function getValue(itemObj, chartType) {
  let obj;
  if (chartType === chartTypes.ENROLLMENT_BREAKDOWN_BY_WEEK) {
    const xValue = itemObj?.x?.split(',');
    const date = xValue[0];
    const monthWeek = getWeekNumOfMonthOfDate(new Date(date));

    obj = {
      isReturning: itemObj?.x.includes(',true') ? itemObj.value : 0,
      isNew: itemObj?.x.includes(',false') ? itemObj.value : 0,
      name: `${monthWeek?.month}  ${monthWeek?.week} Week`,
      flag: xValue[1],
      value: itemObj.value,
      year: xValue[0],
    };
  } else if (
    chartType === chartTypes.MAP_VIEW
  ) {
    const xValue = itemObj?.x?.split(',');
    obj = {
      value: itemObj.value,
      country: xValue[1],
      state: xValue[2],
      lat: Number(xValue[3]),
      lng: Number(xValue[4]),
    };
  } else if (chartType === chartTypes.ENROLLMENT_BREAKDOWN_ACROSS_YEAR) {
    const current = new Date(itemObj?.x);
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
    obj = {
      date,
      count: itemObj.value,
      year: current.getFullYear(),
    };
  } else if (chartType === chartTypes.COURSE_ENROLLMENT_BREAKDOWN_ACROSS_YEAR) {
    const xValue = itemObj?.x.split(',');
    obj = {
      value: itemObj.value || 0,
      courseName: xValue?.length ? xValue[0] : '',
      year: xValue?.length ? xValue[1] : '',
    };
  } else if (chartType === chartTypes.COURSE_ENROLLMENT_BREAKDOWN_BY_REGION) {
    const xValue = itemObj?.x.split(',');
    obj = {
      year: xValue?.length ? xValue[0] : '',
      region: xValue?.length ? xValue[1] : '',
      value: itemObj?.value || 0,
    };
  } else if (chartType === chartTypes.RETURNING_BREAKDOWN_ACROSS_YEAR) {
    const xValue = itemObj?.x.split(',');
    obj = {
      isReturning: itemObj?.x.includes(',true') ? itemObj.value : 0,
      isNew: itemObj?.x.includes(',false') ? itemObj.value : 0,
      value: itemObj?.value,
      flag: itemObj?.x.includes(',true') ? 'isReturning' : 'isNew',
      name: xValue[0],
      year: xValue[0],
    };
  } else {
    const xValue = itemObj?.x?.split(',');

    obj = {
      isReturning: itemObj?.x.includes(',true') ? itemObj.value : 0,
      isNew: itemObj?.x.includes(',false') ? itemObj.value : 0,
      name: xValue[0],
      flag: xValue[1],
      value: itemObj.value,
      year: xValue[0],
    };
  }
  return obj;
}
export default function useCustomCubeQuery(queryFromChart, chartType) {
  // use hook to grab data from Cube
  const {
    resultSet, isLoading, error, progress,
  } = useCubeQuery(queryFromChart);

  const chartData = resultSet
    ?.series(queryFromChart)
    ?.map((item) => item?.series?.map((obj) => getValue(obj, chartType)));

  return {
    chartData,
    resultSet,
    isLoading,
    error,
    progress,
  };
}
