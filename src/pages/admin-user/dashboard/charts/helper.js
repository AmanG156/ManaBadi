/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-curly-newline */
import { colors } from '../../../../theme';
import chartTypes from './types';

function getQuery(type, selectedOption, enrollGraphOption) {
  let query = '';
  if (type === chartTypes.ENROLLMENT_GROWTH_ACROSS_YEAR) {
    query = {
      measures: ['EnrolledCourse.count'],
      dimensions: ['EnrolledCourse.academicYear'],
      order: [['EnrolledCourse.academicYear', 'desc']],
      filters: [
        {
          member: 'EnrolledCourse.courseStatus',
          operator: 'notEquals',
          values: ['CANCELLED'],
        },
        {
          member: 'EnrolledCourse.academicYear',
          operator: 'equals',
          values: [
            enrollGraphOption || '2019-2020',
            '2020-2021',
            '2021-2022',
            '2022-2023',
          ],
        },
      ],
    };
  }
  if (type === chartTypes.RETURNING_BREAKDOWN_ACROSS_YEAR) {
    query = {
      limit: 5000,
      dimensions: [
        'EnrolledCourse.academicYear',
        'EnrolledCourse.returningStudent',
      ],
      order: [['EnrolledCourse.academicYear', 'desc']],
      measures: ['EnrolledCourse.count'],
      filters: [
        {
          member: 'EnrolledCourse.returningStudent',
          operator: 'equals',
          values: ['true', 'false'],
        },
        {
          member: 'EnrolledCourse.courseStatus',
          operator: 'notEquals',
          values: ['CANCELLED'],
        },
        {
          member: 'EnrolledCourse.academicYear',
          operator: 'equals',
          values: [
            enrollGraphOption || '2019-2020',
            '2020-2021',
            '2021-2022',
            '2022-2023',
          ],
        },
      ],
    };
  }
  if (
    type === chartTypes.COURSE_ENROLLMENT_BREAKDOWN
    && selectedOption === 'year'
  ) {
    query = {
      order: { 'EnrolledCourse.count': 'desc' },
      measures: ['EnrolledCourse.count'],
      limit: 5000,
      dimensions: ['EnrolledCourse.courseName'],
      filters: [
        {
          member: 'EnrolledCourse.academicYear',
          operator: 'equals',
          values: ['2022-2023'],
        },
      ],
    };
  }
  if (
    type === chartTypes.COURSE_ENROLLMENT_BREAKDOWN
    && selectedOption === 'month'
  ) {
    query = {
      order: { 'EnrolledCourse.count': 'desc' },
      measures: ['EnrolledCourse.count'],
      limit: 5000,
      dimensions: ['EnrolledCourse.courseName'],
      timeDimensions: [
        { dimension: 'EnrolledCourse.createdAt', dateRange: 'Last 30 days' },
      ],
    };
  }
  if (
    type === chartTypes.COURSE_ENROLLMENT_BREAKDOWN
    && selectedOption === 'week'
  ) {
    query = {
      order: { 'EnrolledCourse.count': 'desc' },
      measures: ['EnrolledCourse.count'],
      limit: 5000,
      timeDimensions: [
        { dimension: 'EnrolledCourse.createdAt', dateRange: 'Last 7 days' },
      ],
      dimensions: ['EnrolledCourse.courseName'],
    };
  }
  if (
    type === chartTypes.COURSE_ENROLLMENT_BREAKDOWN
    && selectedOption === 'today'
  ) {
    query = {
      order: { 'EnrolledCourse.count': 'desc' },
      measures: ['EnrolledCourse.count'],
      limit: 5000,
      timeDimensions: [
        { dimension: 'EnrolledCourse.createdAt', dateRange: 'Today' },
      ],
      dimensions: ['EnrolledCourse.courseName'],
    };
  }
  if (
    type === chartTypes.ENROLLMENT_BREAKDOWN_BY_WEEK
    && selectedOption === 'year'
  ) {
    query = {
      limit: 5000,
      dimensions: ['EnrolledCourse.returningStudent'],
      order: { 'EnrolledCourse.count': 'desc' },
      measures: ['EnrolledCourse.count'],
      filters: [
        {
          member: 'EnrolledCourse.returningStudent',
          operator: 'equals',
          values: ['true', 'false'],
        },
        {
          member: 'EnrolledCourse.academicYear',
          operator: 'equals',
          values: ['2022-2023'],
        },
      ],
      timeDimensions: [
        { dimension: 'EnrolledCourse.createdAt', granularity: 'week' },
      ],
    };
  }
  if (
    type === chartTypes.ENROLLMENT_BREAKDOWN_BY_WEEK
    && selectedOption === 'month'
  ) {
    query = {
      limit: 5000,
      dimensions: ['EnrolledCourse.returningStudent'],
      order: [['EnrolledCourse.createdAt', 'desc']],
      measures: ['EnrolledCourse.count'],
      filters: [
        {
          member: 'EnrolledCourse.returningStudent',
          operator: 'equals',
          values: ['true', 'false'],
        },
        {
          member: 'EnrolledCourse.courseStatus',
          operator: 'notEquals',
          values: ['CANCELLED'],
        },
      ],
      timeDimensions: [
        {
          dimension: 'EnrolledCourse.createdAt',
          granularity: 'week',
          dateRange: 'Last 30 days',
        },
      ],
    };
  }
  if (type === chartTypes.RETURNING_BREAKDOWN && selectedOption === 'year') {
    query = {
      limit: 5000,
      dimensions: ['EnrolledCourse.returningStudent'],
      order: { 'EnrolledCourse.createdAt': 'asc' },
      measures: ['EnrolledCourse.count'],
      filters: [
        {
          member: 'EnrolledCourse.returningStudent',
          operator: 'equals',
          values: ['true', 'false'],
        },
        {
          member: 'EnrolledCourse.academicYear',
          operator: 'equals',
          values: ['2022-2023'],
        },
      ],
    };
  }
  if (type === chartTypes.RETURNING_BREAKDOWN && selectedOption === 'month') {
    query = {
      limit: 5000,
      dimensions: ['EnrolledCourse.returningStudent'],
      order: { 'EnrolledCourse.createdAt': 'asc' },
      measures: ['EnrolledCourse.count'],
      filters: [
        {
          member: 'EnrolledCourse.returningStudent',
          operator: 'equals',
          values: ['true', 'false'],
        },
      ],
      timeDimensions: [
        { dimension: 'EnrolledCourse.createdAt', dateRange: 'Last 30 days' },
      ],
    };
  }
  if (type === chartTypes.RETURNING_BREAKDOWN && selectedOption === 'week') {
    query = {
      limit: 5000,
      dimensions: ['EnrolledCourse.returningStudent'],
      order: { 'EnrolledCourse.createdAt': 'asc' },
      measures: ['EnrolledCourse.count'],
      filters: [
        {
          member: 'EnrolledCourse.returningStudent',
          operator: 'equals',
          values: ['true', 'false'],
        },
      ],
      timeDimensions: [
        { dimension: 'EnrolledCourse.createdAt', dateRange: 'Last 7 days' },
      ],
    };
  }
  if (type === chartTypes.RETURNING_BREAKDOWN && selectedOption === 'today') {
    query = {
      limit: 5000,
      dimensions: ['EnrolledCourse.returningStudent'],
      order: { 'EnrolledCourse.createdAt': 'asc' },
      measures: ['EnrolledCourse.count'],
      filters: [
        {
          member: 'EnrolledCourse.returningStudent',
          operator: 'equals',
          values: ['true', 'false'],
        },
      ],
      timeDimensions: [
        { dimension: 'EnrolledCourse.createdAt', dateRange: 'Today' },
      ],
    };
  }
  if (type === chartTypes.GEO_REGION_BREAK_DOWN && selectedOption === 'year') {
    query = {
      measures: ['EnrolledCourse.count'],
      limit: 5000,
      filters: [
        {
          member: 'EnrolledCourse.academicYear',
          operator: 'equals',
          values: ['2022-2023'],
        },
        { member: 'Region.geoRegion', operator: 'set', values: ['null'] },
      ],
      dimensions: ['Region.geoRegion'],
      order: { 'EnrolledCourse.count': 'desc' },
    };
  }
  if (type === chartTypes.GEO_REGION_BREAK_DOWN && selectedOption === 'month') {
    query = {
      order: { 'EnrolledCourse.count': 'desc' },
      measures: ['EnrolledCourse.count'],
      limit: 5000,
      timeDimensions: [
        {
          dimension: 'EnrolledCourse.createdAt',
          dateRange: 'Last 30 days',
        },
      ],
      dimensions: ['Region.geoRegion'],
      filters: [
        { member: 'Region.geoRegion', operator: 'set', values: ['null'] },
      ],
    };
  }
  if (type === chartTypes.GEO_REGION_BREAK_DOWN && selectedOption === 'week') {
    query = {
      order: { 'EnrolledCourse.count': 'desc' },
      measures: ['EnrolledCourse.count'],
      limit: 5000,
      timeDimensions: [
        {
          dimension: 'EnrolledCourse.createdAt',
          dateRange: 'Last 7 days',
        },
      ],
      dimensions: ['Region.geoRegion'],
      filters: [
        { member: 'Region.geoRegion', operator: 'set', values: ['null'] },
      ],
    };
  }
  if (type === chartTypes.GEO_REGION_BREAK_DOWN && selectedOption === 'today') {
    query = {
      order: { 'EnrolledCourse.count': 'desc' },
      measures: ['EnrolledCourse.count'],
      limit: 5000,
      timeDimensions: [
        {
          dimension: 'EnrolledCourse.createdAt',
          dateRange: 'Today',
        },
      ],
      dimensions: ['Region.geoRegion'],
      filters: [
        { member: 'Region.geoRegion', operator: 'set', values: ['null'] },
      ],
    };
  }
  if (type === chartTypes.COURSE_ENROLLMENT_BREAKDOWN_BY_REGION) {
    query = {
      dimensions: ['EnrolledCourse.academicYear', 'Region.geoRegion'],
      order: [['EnrolledCourse.academicYear', 'desc']],
      measures: ['EnrolledCourse.count'],
      filters: [
        {
          member: 'EnrolledCourse.academicYear',
          operator: 'equals',
          values: [
            enrollGraphOption || '2022-2023',
            '2021-2022',
            '2020-2021',
            '2019-2020',
          ],
        },
        { member: 'Region.geoRegion', operator: 'set', values: [] },
        {
          member: 'EnrolledCourse.courseStatus',
          operator: 'notEquals',
          values: ['CANCELLED%20'],
        },
      ],
    };
  }
  if (type === chartTypes.MAP_VIEW && selectedOption === 'year') {
    query = {
      dimensions: [
        'Location.name',
        'Address.country',
        'Address.state',
        'Address.latitude',
        'Address.longitude',
      ],
      order: { 'EnrolledCourse.count': 'desc' },
      filters: [
        { member: 'Address.state', operator: 'set' },
        { member: 'Address.latitude', operator: 'set' },
        { member: 'Address.longitude', operator: 'set' },
        { member: 'Address.country', operator: 'set' },
        {
          member: 'EnrolledCourse.academicYear',
          operator: 'equals',
          values: ['2022-2023'],
        },
      ],
      measures: ['EnrolledCourse.count'],
    };
  }
  if (type === chartTypes.MAP_VIEW && selectedOption === 'month') {
    query = {
      dimensions: [
        'Location.name',
        'Address.country',
        'Address.state',
        'Address.latitude',
        'Address.longitude',
      ],
      order: { 'EnrolledCourse.count': 'desc' },
      filters: [
        { member: 'Address.state', operator: 'set' },
        { member: 'Address.latitude', operator: 'set' },
        { member: 'Address.longitude', operator: 'set' },
        { member: 'Address.country', operator: 'set' },
        {
          member: 'EnrolledCourse.courseStatus',
          operator: 'notEquals',
          values: ['CANCELLED'],
        },
      ],
      measures: ['EnrolledCourse.count'],
      timeDimensions: [
        {
          dimension: 'EnrolledCourse.createdAt',
          dateRange: 'Last 30 days',
        },
      ],
    };
  }
  // 3rd
  if (type === chartTypes.ENROLLMENT_BREAKDOWN_ACROSS_YEAR) {
    query = {
      measures: ['EnrolledCourse.count'],
      limit: 5000,
      timeDimensions: [
        { dimension: 'EnrolledCourse.createdAt', granularity: 'day' },
      ],
      filters: [
        {
          member: 'EnrolledCourse.academicYear',
          operator: 'equals',
          values: [
            enrollGraphOption || '2022-2023',
            '2021-2022',
            '2020-2021',
            '2019-2020',
          ],
        },
        {
          member: 'EnrolledCourse.courseStatus',
          operator: 'notEquals',
          values: ['CANCELLED'],
        },
      ],
    };
  }
  // 4th
  if (type === chartTypes.COURSE_ENROLLMENT_BREAKDOWN_ACROSS_YEAR) {
    query = {
      dimensions: [
        'EnrolledCourse.courseName',
        'EnrolledCourse.academicYear',
        'Course.level',
      ],
      order: [
        ['EnrolledCourse.academicYear', 'desc'],
        ['Course.level', 'desc'],
      ],
      measures: ['EnrolledCourse.count'],
      filters: [
        {
          member: 'EnrolledCourse.academicYear',
          operator: 'equals',
          values: [
            enrollGraphOption || '2022-2023',
            '2021-2022',
            '2020-2021',
            '2019-2020',
          ],
        },
        {
          member: 'EnrolledCourse.courseStatus',
          operator: 'notEquals',
          values: ['CANCELLED'],
        },
      ],
    };
  }
  return query;
}

function getEnrollQuery(selectedOption) {
  let query;
  if (selectedOption === 'acrossyear') {
    query = {
      measures: ['EnrolledCourse.count'],
      filters: [
        {
          member: 'EnrolledCourse.courseStatus',
          operator: 'notEquals',
          values: ['CANCELLED'],
        },
      ],
      dimensions: ['EnrolledCourse.academicYear'],
      order: [['EnrolledCourse.academicYear', 'desc']],
    };
    return query;
  }
  if (selectedOption === 'year') {
    query = {
      measures: ['EnrolledCourse.count'],
      filters: [
        {
          member: 'EnrolledCourse.courseStatus',
          operator: 'notEquals',
          values: ['CANCELLED'],
        },
        {
          member: 'EnrolledCourse.academicYear',
          operator: 'equals',
          values: ['2022-2023'],
        },
      ],
    };
    return query;
  }
  if (selectedOption === 'month') {
    query = {
      measures: ['EnrolledCourse.count'],
      timeDimensions: [
        { dimension: 'EnrolledCourse.createdAt', dateRange: 'Last 30 days' },
      ],
    };
    return query;
  }
  if (selectedOption === 'week') {
    query = {
      measures: ['EnrolledCourse.count'],
      timeDimensions: [
        { dimension: 'EnrolledCourse.createdAt', dateRange: 'Last 7 days' },
      ],
    };
    return query;
  }
  if (selectedOption === 'today') {
    query = {
      measures: ['EnrolledCourse.count'],
      timeDimensions: [
        { dimension: 'EnrolledCourse.createdAt', dateRange: 'Today' },
      ],
    };
    return query;
  }
  return true;
}
const COLORS = [
  colors.persianBlue,
  colors.yellowOrange,
  colors.rum,
  colors.highLand,
  colors.violet,
  colors.persimmon,
  colors.rosePink,
  colors.primary,
  colors.secondary,
];
function getColor(year) {
  let color;
  if (year === '2018-2019') {
    color = COLORS[0];
  }
  if (year === '2019-2020') {
    color = COLORS[1];
  }
  if (year === '2020-2021') {
    color = COLORS[2];
  }
  if (year === '2021-2022') {
    color = COLORS[3];
  }
  if (year === '2022-2023') {
    color = COLORS[4];
  }
  return color;
}

const formatYearArray = (arr) => {
  const yearSet = new Set();
  let finalArr = [];
  arr.forEach((itm) => {
    if (!yearSet.has(itm.name)) {
      yearSet.add(itm.name);
      const sameYearArr = arr.filter((yr) => yr.name === itm.name);
      sameYearArr.sort((a, b) => b.isReturning - a.isReturning);
      sameYearArr.forEach((smY) => {
        smY.sortBy = Number(smY.name.split('-').join(''));
      });
      finalArr = [...finalArr, ...sameYearArr];
    }
  });

  finalArr.sort((a, b) => b.sortBy - a.sortBy);
  finalArr.forEach((itm) => delete itm.sortBy);
  return finalArr;
};

export { getEnrollQuery, getQuery, getColor, formatYearArray };
