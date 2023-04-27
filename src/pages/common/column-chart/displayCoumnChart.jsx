import React from 'react';
import { useCubeQuery } from '@cubejs-client/react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import ColumnChart from '.';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';

const addSuffix = (value) => {
  switch (value) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

const getName = (date) => {
  const momentDate = moment(date);
  const month = momentDate.format('MMM');
  const week = momentDate.format('w');
  const year = momentDate.format('YYYY');
  const weekOfMonth = Math.ceil(momentDate.date() / 7);

  return `W-${week} ${year}, ${month} ${weekOfMonth}${addSuffix(weekOfMonth)} Week`;
};

function DisplayColumnChart({
  location, year, yAxisLabel, xAxisLabel, barColors, customizedAxisTick, renderCusomizedLegend,
}) {
  if (!year || !location) {
    return null;
  }
  const { t } = useTranslation();

  const classes = useStyles(styles)();

  const query = {
    measures: ['EnrolledCourse.count'],
    timeDimensions: [{
      dimension: 'EnrolledCourse.createdAt',
      granularity: 'week',
    }],
    order: [['Course.level', 'asc']],
    dimensions: ['EnrolledCourse.courseName',
      'Course.level'],
    filters: [{
      member: 'EnrolledCourse.academicYear',
      operator: 'equals',
      values: [year],
    },
    {
      member: 'EnrolledCourse.locationId',
      operator: 'equals',
      values: [location],
    },
    {
      member: 'EnrolledCourse.courseStatus',
      operator: 'notEquals',
      values: ['CANCELLED'],
    },
    {
      member: 'EnrolledCourse.isActive',
      operator: 'equals',
      values: ['true'],
    },
    {
      member: 'EnrolledCourse.deletedAt',
      operator: 'notSet',
    }],
  };
  // use hook to grab data from Cube
  const {
    resultSet, isLoading, error, progress,
  } = useCubeQuery(query);

  if (isLoading) {
    return (
      <div>
        {(progress && progress.stage && progress.stage.stage) || t('LOADING')}
      </div>
    );
  }

  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (!resultSet || (resultSet.rawData().length === 0)) {
    return (<div className={classes.noData}><div>{t('NO_DATA')}</div></div>);
  }

  let chartData = resultSet.rawData().reduce((obj, item) => {
    // EnrolledCourse.createdAt.week  EnrolledCourse.courseName  EnrolledCourse.count
    let date = item['EnrolledCourse.createdAt.week'];
    [date] = date.split('.');
    const weeknumber = `W-${moment(date).isoWeek()}`;
    // eslint-disable-next-line no-param-reassign
    obj[weeknumber] = {
      ...obj[weeknumber],
      name: getName(date),
      level: item['Course.level'],
    };
    if (obj[weeknumber][item['EnrolledCourse.courseName']]) {
      // eslint-disable-next-line no-param-reassign
      obj[weeknumber][item['EnrolledCourse.courseName']] += parseInt(item['EnrolledCourse.count'], 10);
    } else {
      // eslint-disable-next-line no-param-reassign
      obj[weeknumber][item['EnrolledCourse.courseName']] = parseInt(item['EnrolledCourse.count'], 10);
    }

    if (obj.courses) {
      obj.courses = [...obj.courses, { name: item['EnrolledCourse.courseName'], level: item['Course.level'] }];
    } else {
      obj.courses = [{ name: item['EnrolledCourse.courseName'], level: item['Course.level'] }];
    }
    return obj;
  }, {});

  const courses = _.uniq(chartData.courses.sort((item) => item.level).map((item) => item.name));
  delete chartData.courses;
  const data = Object.keys(chartData).sort()
    .reduce((obj, key) => {
      // eslint-disable-next-line no-param-reassign
      obj[key] = chartData[key];
      return obj;
    }, {});

  chartData = Object.values(data);
  if (!chartData || (chartData.length === 0)) {
    return null;
  }

  return (
    <ColumnChart
      chartData={chartData}
      yAxisLabel={yAxisLabel}
      xAxisLabel={xAxisLabel}
      courses={courses}
      customizedAxisTick={customizedAxisTick}
      renderCusomizedLegend={renderCusomizedLegend}
      barColors={barColors}
    />
  );
}

export default DisplayColumnChart;
