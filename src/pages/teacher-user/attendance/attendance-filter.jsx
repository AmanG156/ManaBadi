import React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FormikProvider } from 'formik';

import useStyles from '../../../custom-hooks/useStyles';
import { Button, PerformantDropdown } from '../../../components/atoms';
import commonStyle from '../../../utils/commonClasses';

export default function AttendanceFilters({
  formik,
  classes,
  years = [],
  courses = [],
  classWeeks = [],
  noOfAbsentStudents,
  isAttendanceRecording,
  setIsAttendanceRecording,
}) {
  const { t } = useTranslation();
  const commonClasses = useStyles(commonStyle)();

  const yearChange = (e) => {
    formik.setFieldValue('year', e?.target?.value);
    // formik.setFieldValue('course', '');
    // formik.setFieldValue('classWeek', '');
  };

  const courseChange = (e) => {
    formik.setFieldValue('course', e?.target?.value);
    // formik.setFieldValue('classWeek', '');
  };

  return (
    <FormikProvider value={formik}>

      <Grid container direction="row" className={classes?.dropdowns}>
        <Grid item xs={2} className={classes?.year}>
          <PerformantDropdown
            minWidth="100%"
            label={t('YEAR')}
            labelId={t('YEAR')}
            id="year"
            name="year"
            value={formik.values.year}
            handleChange={(e) => { yearChange(e); }}
            options={years}
            customClass={classes?.year}
            variant="standard"
          />
        </Grid>
        <Grid item xs={2} className={classes?.year}>
          <PerformantDropdown
            maxWidth="50%"
            label={t('COURSES')}
            labelId={t('COURSES')}
            id="course"
            name="course"
            value={formik?.values?.course}
            handleChange={(e) => { courseChange(e); }}
            options={courses}
            customClass={classes?.year}
            variant="standard"
          />
        </Grid>
        <Grid item xs={6} className={classes?.loaction}>
          <PerformantDropdown
            maxWidth="50%"
            label={t('CLASS_WEEK')}
            labelId={t('CLASS_WEEK')}
            id="classWeek"
            name="classWeek"
            value={formik?.values?.classWeek}
            handleChange={formik?.handleChange}
            options={classWeeks}
            customClass={classes?.year}
            variant="standard"
          />
        </Grid>
        <Grid item xs={2} className={classes?.year}>
          {isAttendanceRecording ? (
            <div>
              <div>{t('NO_OF_STUDENT_ABSENT')}</div>
              <div>{noOfAbsentStudents}</div>
            </div>
          ) : (
            <Button
              id="submit"
              className={commonClasses.activeButton}
              onClick={() => setIsAttendanceRecording(true)}
              name={t('RECORD_ATTENDANCE')}
            />
          )}
        </Grid>
      </Grid>
    </FormikProvider>
  );
}
