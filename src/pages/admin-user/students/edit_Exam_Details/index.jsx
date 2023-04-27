import React from 'react';
import * as Yup from 'yup';
import { Grid, Box, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
import { useFormik, FormikProvider } from 'formik';
import { useTranslation } from 'react-i18next';
import useStyles from '../../../../custom-hooks/useStyles';
import { Buttons } from '../../../../constant';
import { PerformantTextField } from '../../../../components/atoms';
import ButtonAtom from '../../../../components/atoms/button';
import style from './style';

export default function EditExamDetails() {
  const { t } = useTranslation();
  const classes = useStyles(style)();

  const commonSchema = Yup.object({
    studentName: Yup.string(t('FIRST_NAME_REQUIRED'))
      .required(t('STUDENT_NAME_REQUIRED')),
    // .typeError(t('STUDENT_NAME_REQUIRED')),
    parentName: Yup.string(t('LASTNAME_REQUIRED'))
      .required(t('PARENT_NAME_REQUIRED')),
    // .typeError(t('PARENT_NAME_REQUIRED')),
    academicYear: Yup.string(t('GIVE_aCADEMIC_YEAR')).required(
      t('SEARCHSCHOOL_REQUIRED'),
      // .typeError(t('ACADEMIC_YEAR_REQUIRED')),
    ),
    selectCourse: Yup.array()
      .required(t('COURSE_YEAR_SELECT')),
    // .typeError(t('COURSE_YEAR_SELECT REQUIRED')),
    hallTicketNumber: Yup.array()
      .required(t('HALL_TICKET')),
    // .typeError(t('HALL_TICKET REQUIRED')),
    fromExamLocation: Yup.array()
      .required(t('LOCATION_REQUIRED')),
    // .typeError(t('LOCATION_REQUIRED'))
  });
  const validationSchema = commonSchema;
  const formik = useFormik({
    initialValues: {
      studentName: '',
      parentName: '',
      academicYear: '',
      selectCourse: '',
      hallTicketNumber: '',
      fromExamLocation: '',
    },
    onSubmit: () => {},
    validationSchema,
  });

  const getErrorText = (key, errorText) => {
    if (formik.touched[key] && formik.errors[key]) {
      return (
        <span data-testid={key} className={classes.errorText}>
          {formik.errors[key]}
        </span>
      );
    } if (errorText) {
      return (
        <span className={classes.errorText}>
          {errorText}
        </span>
      );
    }
    return null;
  };

  return (
    <Box>
      <Grid container>
        <FormikProvider value={formik}>
          <form style={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={4} md={4} sm={4}>
                <PerformantTextField
                  label={`${t('STUDENT_NAME')}`}
                  id="studentName"
                  required
                  name="studentName"
                  type="text"
                  value={formik.values.studentName}
                  error={getErrorText('studentName')}
                  className={classes.textFieldSize}
                />
              </Grid>
              <Grid item xs={4} md={4} sm={4}>
                <PerformantTextField
                  label={`${t('PARENT_NAME')}`}
                  id="parentName"
                  required
                  name="parentName"
                  type="text"
                  value={formik.values.parentName}
                  error={getErrorText('parentName')}
                  className={classes.textFieldSize}
                />
              </Grid>
              <Grid item xs={4} md={4} sm={4}>
                <PerformantTextField
                  label={`${t('ACADEMIC_YEAR')}`}
                  id="academicYear"
                  required
                  name="academicYear"
                  type="text"
                  value={formik.values.academicYear}
                  error={getErrorText('academicYear')}
                  className={classes.textFieldSize}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} className={classes.alignGrid}>
              <Grid item xs={8} md={8} sm={8}>
                <PerformantTextField
                  label={`${t('SELECT_COURSE')}`}
                  id="selectCourse"
                  required
                  name="selectCourse"
                  type="text"
                  value={formik.values.selectCourse}
                  error={getErrorText('selectCourse')}
                  className={classes.textFieldSize}
                />
              </Grid>
              <Grid item xs={4} md={4} sm={4}>
                <PerformantTextField
                  label={`${t('HALL_TICKET_NUMBER')}`}
                  id="hallTicketNumber"
                  required
                  name="hallTicketNumber"
                  type="text"
                  value={formik.values.hallTicketNumber}
                  error={getErrorText('hallTicketNumber')}
                  className={classes.textFieldSize}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} flexDirection="row" className={classes.alignGrid}>
              <Grid item xs={12} md={12} sm={12}>
                <PerformantTextField
                  label={`${t('FROM_EXAM_LOCATION')}`}
                  id="fromExamLocation"
                  required
                  name="fromExamLocation"
                  type="text"
                  value={formik.values.fromExamLocation}
                  error={getErrorText('fromExamLocation')}
                  className={classes.performTextField}
                />
              </Grid>
            </Grid>
            <Box className={classes.cogent}>
              <Typography variant="caption"><b>View Logs</b></Typography>

              <Box className={classes.submit}>

                <ButtonAtom
                  name={t('CANCEL')}
                  btntype={Buttons.SECONDARY}
                />
                <ButtonAtom
                  name={t('SAVE_EXAM_DETAILS')}
                  btntype={Buttons.PRIMARY}
                  className={classes.activeButton}
                  onClick={formik.handleSubmit}
                />
              </Box>
            </Box>
          </form>
        </FormikProvider>
      </Grid>

    </Box>
  );
}
