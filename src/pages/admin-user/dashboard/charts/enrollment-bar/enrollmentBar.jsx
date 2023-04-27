import React from 'react';
import { useCubeQuery } from '@cubejs-client/react';
import { Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from '../../style';
import useStyles from '../../../../../custom-hooks/useStyles';
import useAdmin from '../../../../../custom-hooks/useAdmin';
import { getEnrollQuery } from '../helper';

function EnrollBarData({ setEnrollGraphOption, enrollGraphOption }) {
  const { t } = useTranslation();
  const classes = useStyles(styles)();
  const adminData = useAdmin();
  const selectedOption = adminData?.graphOption;
  const query = getEnrollQuery(selectedOption);
  // use hook to grab data from Cube
  const {
    resultSet, isLoading, error, progress,
  } = useCubeQuery(query);

  if (isLoading) {
    return (
      <div>
        {(progress && progress.stage && progress.stage.stage) || 'loading'}
      </div>
    );
  }

  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (!resultSet) {
    return null;
  }
  const resultSetData = resultSet.loadResponses[0].data.sort((a, b) => a['EnrolledCourse.academicYear'].localeCompare(b['EnrolledCourse.academicYear']));
  const displayAcrossYearBar = () => (
    <Box className={classes.boxDiv}>
      <Typography variant="Body1" gutterBottom className={classes.headingColor}>Total Enrollment: </Typography>
      <Box className={classes.enrollmentBar}>
        {resultSetData?.map((e) => (
          <Box className={enrollGraphOption === e['EnrolledCourse.academicYear']
            ? classes.activeAcademicYear : classes.enrolled}
          >
            <Typography
              variant="body1"
              gutterBottom
              className={classes.academicYear}
              onClick={() => setEnrollGraphOption(e['EnrolledCourse.academicYear'])}
            >
              {e['EnrolledCourse.academicYear']}
              {' '}
              :
              {' '}
            </Typography>
            <Typography variant="button" display="block" gutterBottom>{e['EnrolledCourse.count']}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
  const displayYearMonthEnrollBar = (tran) => (
    <Box className={[classes.boxDiv, classes.centerAlign]}>
      {resultSetData?.map((e) => (
        <Box className={classes.enrolled}>
          <Typography
            variant="body1"
            gutterBottom
            className={classes.academicYear}
            onClick={() => setEnrollGraphOption(e['EnrolledCourse.academicYear'])}
          >
            {tran('TOTAL_ENROLLMENTS')}
            {' '}
            :
            {' '}
          </Typography>
          <Typography variant="button" display="block" gutterBottom>{e['EnrolledCourse.count']}</Typography>
        </Box>
      ))}

    </Box>
  );

  const setEnrollBar = () => {
    if (selectedOption === 'none') { return <div />; }
    if (selectedOption === 'acrossyear') { return displayAcrossYearBar(t); }
    return displayYearMonthEnrollBar(t);
  };
  return (
    <div>
      {setEnrollBar()}
    </div>
  );
}

export default EnrollBarData;
