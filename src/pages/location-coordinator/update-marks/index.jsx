/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import useStyles from '../../../custom-hooks/useStyles';
import { AntSwitch, style } from './style';
import ButtonAtom from '../../../components/atoms/button/index';
import commonStyle from '../../register/style';
import { Buttons } from '../../../constant';
import { getLocalStorage } from '../../../utils/localStorageMethod';
import userRoles from '../../../constant/userRoles';
import { PerformantTextField, PerformantDropdown } from '../../../components/atoms';

function UpdateMarks(props) {
  const {
    studentData,
    courseData,
    handleClose,
    updateMarks,
  } = props;
  const marksValidation = {};
  const marksInitial = {};
  const maxMarksValues = {};
  const { t } = useTranslation();
  const userRole = getLocalStorage('userRole');
  const registerClasses = useStyles(commonStyle)();
  const enrollStudentDetails = useSelector((state) => state.getStudent.enrollmentDetails);
  const enrollDetails = studentData?.updateType === 'marks' ? (enrollStudentDetails?.marks?.[0] || {}) : (enrollStudentDetails?.homeworkMarks?.[0] || {});
  const [isPresent, setIsPresent] = useState(false);
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
  const classes = useStyles(style)();

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
      courseName: studentData?.courseTo,
      studentId: studentData?.studentId,
      updateType: studentData?.updateType,
      quarterName: studentData?.selectedQuarter,
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
        payload.weightage = enrollDetails?.academic_panel?.weightage;
        payload.maximumMarks = enrollDetails?.academic_panel?.maximumMarks;
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
        payload.weightage = enrollDetails?.academic_panel?.weightage;
        payload.maximumMarks = enrollDetails?.academic_panel?.maximumMarks;
        payload.isPresent = isPresent;
        payload.locationId = studentData?.location;
        updateMarks(payload);
      }
    },
  });

  React.useEffect(() => {
    enrollDetails?.studentDetailMarks?.forEach((elem, i) => {
      marksValidation[`marksField-${i}`] = Yup.number()
        .required('Required')
        .typeError('Required');
      marksInitial[`marksField-${i}`] = elem.obtainedMarks;
      formik.values[`marksField-${i}`] = elem.obtainedMarks;
      maxMarksValues[`marksField-${i}`] = elem?.academicPanelMarks?.marks;
    });
  }, [enrollDetails?.studentDetailMarks]);

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

  const handlePresent = () => {
    setIsPresent(!isPresent);
  };

  return (
    <Box>
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
                formik.errors.fullName,
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
                disabled={userRole === userRoles.REGION_COORDINATOR}
                error={getErrorText('courseName')}
                options={courseData}
              />
              {getErrorText('courseName')}
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
                error={getErrorText('quarterName')}
                options={studentData?.quarterOptions}
              />
              {getErrorText('quarterName')}
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
          </Grid>
          <Grid container>
            <Grid container spacing={2} mt={3} mb={2} className={classes.addStyleHead}>
              <Grid item xs={3}>
                <Typography variant="body1" gutterBottom>
                  {t('SNO')}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" gutterBottom>
                  {t('MARKS')}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" gutterBottom>
                  {t('CATEGORY')}
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
                    formik.handleChange,
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
                  {' '}
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
          <Grid container justifyContent="flex-end">
            <ButtonAtom
              btntype={Buttons.SECONDARY}
              name={t('CANCEL')}
              className={classes.secButtonNew}
              onClick={handleClose}
            />
            <ButtonAtom
              btntype={Buttons.PRIMARY}
              name={t('UPDATE')}
              onClick={formik.handleSubmit}
              className={[classes.activeButtonNew, classes.secButtonNew]}
            />
          </Grid>
        </form>
      </FormikProvider>
    </Box>
  );
}
export default UpdateMarks;
