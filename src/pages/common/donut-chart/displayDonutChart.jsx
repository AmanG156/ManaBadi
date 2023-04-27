import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import DonutChart from '.';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';
import Constant from '../../../store/constant';
import { getCubejsApi } from '../../../utils/cube';

function DisplayDonutChart({
  location, year, renderCusomizedLegend, renderCustomizedLabel,
}) {
  if (!location || !year) {
    return null;
  }
  const classes = useStyles(styles)();
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState([]);
  const [isLoading, setLoader] = useState(true);

  const query = {
    measures: ['EnrolledCourse.count'],
    dimensions: ['EnrolledCourse.courseName', 'Course.level'],
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
    order: [['Course.level',
      'asc']],
  };
  useEffect(() => {
    setChartData([]);
    dispatch({
      type: Constant.SET_STUDENTS,
      payload: '--',
    });
    setLoader(true);
    getCubejsApi().load(query).then((resultSet) => {
      if ((resultSet?.rawData() || []).length > 0) {
        const data = resultSet?.rawData().map((item) => {
          return {
            name: item['EnrolledCourse.courseName'],
            value: parseInt(item['EnrolledCourse.count'], 10),
            level: item['Course.level'],
          };
        });
        setChartData(data);
        if (data) {
          const students = data.reduce((sum, item) => {
            // eslint-disable-next-line no-param-reassign
            sum += item.value;
            return sum;
          }, 0);

          dispatch({
            type: Constant.SET_STUDENTS,
            payload: students,
          });
        }
      }
      setLoader(false);
    });
  }, [location, year]);
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={classes.loadingStyles}>
        {t('LOADING')}
      </div>
    );
  }

  if (!chartData || (chartData.length === 0)) {
    return (<div className={classes.noData}><div>{t('NO_DATA')}</div></div>);
  }

  return (
    <div className={classes.chartWrapper}>
      <DonutChart
        chartsData={chartData?.length && chartData}
        renderCusomizedLegend={renderCusomizedLegend}
        renderCustomizedLabel={renderCustomizedLabel}
      />
    </div>
  );
}

export default DisplayDonutChart;
