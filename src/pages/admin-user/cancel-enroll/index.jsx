import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import useStyles from '../../../custom-hooks/useStyles';
import styles from './style';
import style from '../../register/style';
import Loader from '../../../components/atoms/loader';
import PerformantTextField from '../../../components/atoms/PerformantTextField';
import { Checkbox } from '../../../components/atoms';
import { cancelEnroll } from '../../../store/actions/getAdmin';

function CancelEnroll(props) {
  const {
    cancelEnrollInfo,
    setCancelEnroll,
    refreshList,
    setCustomForm,
    isCancelButtonDisable,
  } = props;
  const { t } = useTranslation();
  const [isAccept, setIsAccept] = useState(false);

  const [loading, setLoading] = useState(false);
  const registerClasses = useStyles(style)();
  const textField = (
    label,
    id,
    type,
    handleChange,
    onBlur,
    value,
    error,
    required = true,
    disable = false,
  ) => (
    <PerformantTextField
      label={label}
      id={id}
      required={required}
      name={id}
      type={type}
      value={value}
      onBlur={onBlur}
      error={error}
      onChange={handleChange}
      disabled={disable}
    />
  );
  const classes = useStyles(styles)();
  const validationArray = [t('STUDENT_NAME_REQUIRED'), t('ACADEMIC_YEAR_REQUIRED'),
    t('PAYPAL_SALEID_REQUIRED'), t('COURSE_REQUIRED'), t('LOCATION_REQUIRED'), t('CHANGE_LOG_REQUIRED')];
  const swapCourseValidations = Yup.object({
    studentName: Yup.string()
      .required(validationArray[0])
      .typeError(validationArray[0]),
    academicYear: Yup.string()
      .required(validationArray[1])
      .typeError(validationArray[1]),
    paypalSaleId: Yup.string()
      .required(validationArray[2])
      .typeError(validationArray[2]),
    course: Yup.string()
      .required(validationArray[3])
      .typeError(validationArray[3]),
    location: Yup.string()
      .required(validationArray[4])
      .typeError(validationArray[4]),
    changeLogs: Yup.string()
      .required(validationArray[5])
      .typeError(validationArray[5]),
    isAccept: Yup.boolean().oneOf([true], 'Message'),
  });

  const dispatch = useDispatch();
  const validationSchema = swapCourseValidations;
  const formik = useFormik({
    initialValues: {
      studentName: cancelEnrollInfo?.studentName,
      academicYear: cancelEnrollInfo?.acedemicYear,
      paypalSaleId: cancelEnrollInfo?.paypalSaleId,
      course: cancelEnrollInfo?.course,
      location: cancelEnrollInfo?.location,
      changeLogs: cancelEnrollInfo?.changeLogs,
      isAccept: false,
    },
    validationSchema,
    onSubmit: (values) => {
      const callback = () => {
        refreshList();
        setCancelEnroll(false);
        setLoading(false);
      };
      setLoading(true);
      const payloadObj = {
        studentId: cancelEnrollInfo?.studentId,
        cancellationReason: values?.changeLogs,
      };
      dispatch(cancelEnroll(payloadObj, callback));
    },
  });

  const handleAcceptanceCreteria = () => {
    setIsAccept(!isAccept);
    formik.setFieldValue('isAccept', !isAccept);
  };

  useEffect(() => {
    setCustomForm(formik);
  }, [formik?.values]);

  const setPreviousFieldTouch = (key) => {
    const allFields = [
      'studentName',
      'academicYear',
      'paypalSaleId',
      'course',
      'location',
      'changeLogs',
    ];
    const index = allFields.indexOf(key);
    if (index > -1) {
      const obj = {};
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i <= index; i++) {
        const element = allFields[i];
        obj[element] = true;
      }
      formik.setTouched({ ...formik.touched, ...obj }, true);
    }
  };

  // eslint-disable-next-line no-nested-ternary
  const getErrorText = (key, errorText) => (formik.touched[key] && formik.errors[key] ? (
    <span tested={key} className={classes.errorText}>
      {formik.errors[key]}
    </span>
  ) : errorText ? (
    <span className={classes.errorText}>{errorText}</span>
  ) : null);

  return (
    <Box>
      <FormikProvider value={formik}>
        <form
          name="tenantUserForm"
          noValidate
          autoComplete="off"
          className={`${registerClasses.form} ${classes.form}`}
        >
          <Grid container className={registerClasses.mainContainer}>
            <Grid xs={12} className={classes.previousYear}>
              {isCancelButtonDisable
                ? getErrorText('', t('PREVIOUS_YEAR_ENROLLMENTS')) : null}
            </Grid>
            <Grid container spacing={2} className={classes.innerContainer}>
              <Grid item xs={12} md={6} lg={6}>
                {textField(
                  t('STUDENT_NAME'),
                  'studentName',
                  'text',
                  formik.handleChange,
                  () => setPreviousFieldTouch('studentName'),
                  formik.values.studentName,
                  getErrorText('studentName'),
                  true,
                  true,
                )}
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                {textField(
                  t('ACADEMICYEAR'),
                  'academicYear',
                  'text',
                  formik.handleChange,
                  () => setPreviousFieldTouch('academicYear'),
                  formik.values.academicYear,
                  getErrorText('academicYear'),
                  true,
                  true,
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2} className={classes.innerContainer}>
              <Grid item xs={12} md={6} lg={6}>
                {textField(
                  t('PAYPAL_SALE_ID'),
                  'paypalSaleId',
                  'text',
                  formik.handleChange,
                  () => setPreviousFieldTouch('paypalSaleId'),
                  formik.values.paypalSaleId,
                  getErrorText('paypalSaleId'),
                  true,
                  true,
                )}
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                {textField(
                  t('COURSE'),
                  'course',
                  'text',
                  formik.handleChange,
                  () => setPreviousFieldTouch('course'),
                  formik.values.course,
                  getErrorText('course'),
                  true,
                  true,
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2} className={classes.innerContainer}>
              <Grid item xs={12} md={12} lg={12}>
                {textField(
                  t('LOCATION'),
                  'location',
                  'text',
                  formik.handleChange,
                  () => setPreviousFieldTouch('location'),
                  formik.values.location,
                  getErrorText('location'),
                  true,
                  true,
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} className={[classes.changeLogs, classes.innerContainer]}>
            <Grid item xs={12} md={12} lg={12}>
              {textField(
                t('CHANGE_LOG'),
                'changeLogs',
                'text',
                formik.handleChange,
                () => setPreviousFieldTouch('changeLogs'),
                formik.values.changeLogs,
                getErrorText('changeLogs'),
                true,
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12} className={classes.activeLabel}>
              <Checkbox
                // label={t('I_ACCEPT')}
                label=""
                checked={formik.values.isAccept}
                handleChange={handleAcceptanceCreteria}
                // className={classes.activeLabel}
              />
              <p className={classes.activeLabelP}>{t('I_ACCEPT')}</p>
            </Grid>
          </Grid>
        </form>
      </FormikProvider>

      {loading && (
        <Grid>
          <Loader message={t('LOADING')} />
        </Grid>
      )}
    </Box>
  );
}
export default CancelEnroll;
