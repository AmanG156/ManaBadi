/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  Box, Grid, Typography, TextField,
} from '@mui/material';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import useStyles from '../../../custom-hooks/useStyles';
import { AntSwitch } from '../../location-coordinator/update-marks/style';
import style from '../my-class/style';
import commonStyle from '../../register/style';
import { PerformantTextField, PerformantDropdown } from '../../../components/atoms';
import ButtonAtom from '../../../components/atoms/button';
import { Buttons } from '../../../constant';

function UpdateMarks(props) {
  const {
    studentData,
    handleClose,
    updateMarks,
  } = props;
  const marksValidation = {};
  const marksInitial = {};
  const maxMarksValues = {};
  const { t } = useTranslation();
  const registerClasses = useStyles(commonStyle)();
  const classes = useStyles(style)();
  const [isPresent, setIsPresent] = useState(false);
  const enrollStudentDetails = useSelector((state) => state.getStudent.enrollmentDetails);
  const enrollDetails = studentData?.updateType === 'marks' ? (enrollStudentDetails?.marks?.[0] || {}) : (enrollStudentDetails?.homeworkMarks?.[0] || {});
  const [isMarksTotal, setMarksTotal] = useState(0);
  React.useEffect(() => {
    setIsPresent(enrollDetails.isAttended);
  }, [enrollDetails.isAttended]);
  const textField = (
    label,
    id,
    type,
    handleChange,
    onBlur,
    value,
    error,
    max,
    min,
    required = true,
    disable = false,
    allowSpecialCharacter = false,
  ) => {
    const formattedValue = Math.max(Number(min), Math.min(Number(max), Number(value)));

    return (
      <PerformantTextField
        label={label}
        id={id}
        required={required}
        name={id}
        type={type}
        value={type === 'number' ? formattedValue : value}
        onBlur={onBlur}
        error={error}
        onChange={handleChange}
        disabled={disable}
        allowSpecialCharacter={allowSpecialCharacter}
        max={max}
        min={0}
        onKeyDown={(event) => {
          if (type === 'number' && (event.key === '+' || event.key === '-' || event.key === 'E' || event.key === 'e')) {
            event.preventDefault();
          }
        }}
      />
    );
  };
  const marksValidations = Yup.object({
    fullName: Yup.string()
      .required(t('FULL_NAME_REQUIRED'))
      .typeError(t('FULL_NAME_REQUIRED')),
    courseName: Yup.string()
      .required(t('COURSE_REQUIRED'))
      .typeError(t('COURSE_REQUIRED')),
    quarterName: Yup.string()
      .required(t('QUARTER_REQUIRED'))
      .typeError(t('QUARTER_REQUIRED')),
    ...marksValidation,
  });
  const validationSchema = marksValidations;
  const formik = useFormik({
    initialValues: {
      fullName: studentData?.firstName,
      quarterName: studentData?.selectedQuarter,
      courseName: studentData?.courseTo,
      studentId: studentData?.studentId,
      updateType: studentData?.updateType,
      ...marksInitial,
    },
    validationSchema,
    onSubmit: (values) => {
      // setShowLoader(true);
      const payload = values;
      if (values?.updateType === 'marks') {
        const studentMarksDetail = enrollDetails?.studentDetailMarks?.map((o1, index) => ({
          academicPanelMarksId: o1?.academicPanelMarks?.id,
          obtainedMarks: values[`marksField-${index}`],
        }));
        payload.studentDetailMarks = studentMarksDetail;
        payload.academicYear = studentData?.academicYear;
        payload.courseId = studentData?.courseTo;
        payload.isPresent = isPresent;
        payload.locationId = studentData?.location;
        updateMarks(payload);
      } else {
        const studentHomeworkMarksDetail = enrollDetails?.studentHomeworkMarksDetail?.map((o1, index) => ({
          homeworkPanelMarksId: o1?.homeworkPanelMarks?.id,
          obtainedMarks: values[`marksField-${index}`],
        }));
        payload.studentHomeworkMarksDetail = studentHomeworkMarksDetail;
        payload.academicYear = studentData?.academicYear;
        payload.courseId = studentData?.courseTo;
        payload.isPresent = isPresent;
        payload.locationId = studentData?.location;
        updateMarks(payload);
      }
    },
  });
  React.useEffect(() => {
    let marks = 0;
    enrollDetails?.studentDetailMarks?.forEach((elem, i) => {
      marksValidation[`marksField-${i}`] = Yup.number()
        .required('Required')
        .typeError('Required');
      marksInitial[`marksField-${i}`] = elem.obtainedMarks;
      formik.values[`marksField-${i}`] = elem.obtainedMarks;
      maxMarksValues[`marksField-${i}`] = elem?.academicPanelMarks?.marks;
      marks += elem.obtainedMarks;
    });
    setMarksTotal(marks);
  }, [enrollDetails?.studentDetailMarks]);
  const handlePresent = () => {
    setIsPresent(!isPresent);
  };

  const customMarkChange = (e) => {
    let marks = 0;
    enrollDetails?.studentDetailMarks?.forEach((elem, i) => {
      if (`marksField-${i}` === e.target.id) {
        marks += Number(e.target.value);
      } else {
        marks += elem.obtainedMarks;
      }
    });
    setMarksTotal(marks);
  };

  return (
    <Box className={classes.teacherPopup}>
      <FormikProvider value={formik}>
        <form
          name="tenantUserForm"
          noValidate
          autoComplete="off"
          className={`${registerClasses.form} ${classes.form} ${classes.changeGridLayout}`}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              {textField(
                t('FULL_NAME'),
                'fullName',
                'text',
                formik.handleChange,
                formik.handleBlur,
                formik.values.fullName,
                '',
                '',
                true,
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <PerformantDropdown
                shrink
                minWidth="100%"
                labelId={t('COURSE')}
                label={`${t('COURSE')}`}
                id="courseName"
                name="courseName"
                value={formik.values.courseName}
                handleChange={formik.handleChange}
                required
                options={studentData?.courses}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <PerformantDropdown
                shrink
                minWidth="100%"
                label={`${t('QUARTER')}`}
                labelId={t('QUARTER')}
                id="quarterName"
                name="quarterName"
                value={formik.values.quarterName}
                handleChange={formik.handleChange}
                required
                options={studentData?.quarterOptions}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.switchSection}>
              <Typography variant="h5" gutterBottom component="div">
                {t('ATTENDANCE')}
              </Typography>
              <Stack className={classes.switchUi} spacing={1}>
                <Typography>{t('ABSENT')}</Typography>
                <AntSwitch checked={isPresent} onChange={() => handlePresent()} inputProps={{ 'aria-label': 'ant design' }} />
                <Typography className={isPresent ? classes.setGreen : ''}>{t('PRESENT')}</Typography>
              </Stack>
            </Grid>
            <Grid container>
              <Grid container spacing={2} mt={3} mb={2} className={classes.addStyleHead}>
                <Grid item xs={3}>
                  <Typography variant="body1" gutterBottom>
                    {t('CATEGORY')}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" gutterBottom>
                    {t('MARKS')}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1" gutterBottom>
                    {t('NOTES')}
                  </Typography>
                </Grid>
              </Grid>
              {/* // {marksOptions?.length > 0 && marksOptions?.map((e, i) => ( */}
              {enrollDetails?.studentDetailMarks?.map((e, i) => (
                <Grid container spacing={2} className={classes.alignHorCenter}>
                  <Grid item xs={3}>
                    <Typography variant="body1" gutterBottom>
                      {i + 1}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} className={classes.marksDropDown}>
                    {textField(
                      t('MARKS'),
                      `marksField-${i}`,
                      'number',
                      customMarkChange,
                      formik.handleBlur,
                      formik.values[`marksField-${i}`],
                      formik.errors[`marksField-${i}`],
                      e?.academicPanelMarks?.marks,
                      0,
                      true,
                      false,
                      true,
                    )}
                    {' '}
                    /
                    {e?.academicPanelMarks?.marks}
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body1" gutterBottom>
                      {e?.academicPanelMarks?.notes}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <div className={classes.markWrap}>
              <div className={classes.marksTotal}>
                <span>Total Marks</span>
                <TextField
                  id="outlined-number"
                  label=" Marks"
                  value={isMarksTotal}
                />
              </div>
            </div>
            <Grid container justifyContent="flex-end">
              <ButtonAtom
                btntype={Buttons.SECONDARY}
                name={t('CANCEL')}
                className={classes.secButtonNew}
                onClick={handleClose}
              />
              <ButtonAtom
                btntype={Buttons.PRIMARY}
                name={t('SAVE')}
                onClick={() => formik.handleSubmit()}
                className={[classes.activeButtonNew, classes.secButtonNew]}
              />
            </Grid>
          </Grid>
        </form>
      </FormikProvider>
    </Box>
  );
}
export default UpdateMarks;
