/* eslint-disable no-nested-ternary */
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
import Dropdown from '../../../components/atoms/dropdown-with-label';
import { moveStudent } from '../../../store/actions/getStudent';
import {
  getStudentSectionsService,
  getCourseLocationService,
  getLocationsByCourseId,
  getLocationsByRegionService,
} from '../../../store/services/auth';
import { getLocalStorage } from '../../../utils/localStorageMethod';
import userRoles from '../../../constant/userRoles';
import useStudent from '../../../custom-hooks/useStudent';
import PerformantTextField from '../../../components/atoms/PerformantTextField';

function SwapCourseLocation(props) {
  const {
    swapCourseLocationInfo,
    setCustomForm,
    setSwapCourseOrLocation,
    refreshStudentsData,
    isChangeLogVisible = true,
    courseData,
  } = props;
  const { t } = useTranslation();
  const selectedStudentData = useStudent();

  const userRole = getLocalStorage('userRole');
  const [locationOptions, setLocationOptions] = useState(
    selectedStudentData?.locations,
  );
  const [sectionOptions, setSectionOptions] = useState([]);
  const [classLevelOption, setClassLevelOptions] = useState(
    courseData || selectedStudentData?.courses,
  );
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
  const swapCourseValidations = Yup.object({
    studentName: Yup.string(t('STUDENT_NAME_REQUIRED'))
      .required(t('STUDENT_NAME_REQUIRED'))
      .typeError(t('STUDENT_NAME_REQUIRED')),
    academicYear: Yup.string(t('ACADEMIC_YEAR_REQUIRED'))
      .required(t('ACADEMIC_YEAR_REQUIRED'))
      .typeError(t('ACADEMIC_YEAR_REQUIRED')),

    courseFrom: Yup.string(t('COURSE_FROM_REQUIRED'))
      .required(t('COURSE_FROM_REQUIRED'))
      .typeError(t('COURSE_FROM_REQUIRED')),

    courseTo: Yup.string(t('COURSE_TO_REQUIRED'))
      .required(t('COURSE_TO_REQUIRED'))
      .typeError(t('COURSE_TO_REQUIRED')),

    locationFrom: Yup.string(t('LOCATION_FROM_REQUIRED'))
      .required(t('LOCATION_FROM_REQUIRED'))
      .typeError(t('LOCATION_FROM_REQUIRED')),

    locationTo: Yup.string(t('LOCATION_TO_REQUIRED'))
      .required(t('LOCATION_TO_REQUIRED'))
      .typeError(t('LOCATION_TO_REQUIRED')),
    // sectionTo: Yup.string(t('SECTION_TO_REQUIRED'))
    //   .required(t('SECTION_TO_REQUIRED'))
    //   .typeError(t('SECTION_TO_REQUIRED')),
    changeLogs: Yup.string(t('CHANGE_LOG_REQUIRED'))
      .required(t('CHANGE_LOG_REQUIRED'))
      .typeError(t('CHANGE_LOG_REQUIRED')),
  });

  const dispatch = useDispatch();
  const validationSchema = swapCourseValidations;
  const formik = useFormik({
    initialValues: {
      studentName: swapCourseLocationInfo?.studentName,
      academicYear: swapCourseLocationInfo?.acedemicYear,
      courseFrom: swapCourseLocationInfo?.courseFrom,
      courseTo: swapCourseLocationInfo?.courseTo,
      locationFrom: swapCourseLocationInfo?.locationFrom,
      locationTo: swapCourseLocationInfo?.locationTo,
      sectionFrom: swapCourseLocationInfo?.sectionFrom,
      sectionTo:
        sectionOptions?.length && swapCourseLocationInfo?.sectionTo
          ? swapCourseLocationInfo?.sectionTo
          : '',
      changeLogs: swapCourseLocationInfo?.changeLogs,
    },
    validationSchema,
    onSubmit: (values) => {
      const callback = () => {
        setSwapCourseOrLocation(false);
        if (refreshStudentsData) {
          refreshStudentsData();
        }
        setLoading(false);
      };
      setLoading(true);
      const payloadObj = {
        studentId: swapCourseLocationInfo?.studentId,
        courseId: values?.courseTo,
        locationId: values?.locationTo,
        changeLog: values?.changeLogs,
        logMessage: values?.changeLogs,
      };
      if (values?.sectionTo === '') {
        payloadObj.createNewSection = true;
      } else {
        payloadObj.sectionId = values?.sectionTo;
      }
      dispatch(moveStudent(payloadObj, callback));
    },
  });

  useEffect(() => {
    const payload = {
      locationId: formik?.values?.locationTo,
      courseId: formik?.values?.courseTo,
    };
    getStudentSectionsService(payload)
      .then((res) => {
        const options = res?.data?.map((i) => ({
          id: i?.id,
          name: i?.section,
        }));
        setSectionOptions(options);
        formik.values.sectionTo = swapCourseLocationInfo?.sectionTo;
      })
      .catch(() => { });
    setCustomForm(formik);
  }, [formik?.values?.locationTo, formik?.values?.courseTo]);

  useEffect(() => {
    if (userRole !== userRoles.REGION_COORDINATOR) {
      const payload = {
        locationId: formik?.values?.locationTo,
      };

      getCourseLocationService(payload)
        .then((response) => {
          const options = [];
          response.data.forEach((option) => {
            options.push(option.course);
          });
          setClassLevelOptions(options);
        })
        .catch(() => { });

      setCustomForm(formik);
    }
  }, [formik?.values?.locationTo]);

  useEffect(() => {
    if (userRole === userRoles.REGION_COORDINATOR) {
      getLocationsByRegionService()
        .then((res) => {
          setLocationOptions(res?.data);
        })
        .catch(() => { });
    } else {
      const courseId = formik?.values?.courseTo;
      getLocationsByCourseId(courseId)
        .then((res) => {
          setLocationOptions(res?.data?.locations);
        })
        .catch(() => { });
    }
    setCustomForm(formik);
  }, [formik?.values?.courseTo]);

  useEffect(() => {
    if (userRole === userRoles.LOCATION_COORDINATOR) { formik.values.changeLogs = 'Changed Section from Location Coordinator'; }
    setCustomForm(formik);
  }, [formik?.values?.sectionTo]);

  const setPreviousFieldTouch = (key) => {
    const allFields = [
      'studentName',
      'academicYear',
      'courseFrom',
      'courseTo',
      'locationFrom',
      'locationTo',
      'sectionFrom',
      'sectionTo',
      'changeLog',
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
            <Grid container spacing={2} className={classes.innerContainer}>
              <Grid item xs={12} md={6} lg={6} className={classes.tenantUserWidth}>
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
              <Grid item xs={12} md={6} lg={6} className={classes.tenantUserWidth}>
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
            <Grid container spacing={2} className={`${classes.innerContainer}`}>
              <Grid item xs={12} md={6} lg={6} className={`${classes.tenantUserWidth}`}>
                {textField(
                  t('COURSE_FROM'),
                  'courseFrom',
                  'text',
                  formik.handleChange,
                  () => setPreviousFieldTouch('courseFrom'),
                  formik.values.courseFrom,
                  getErrorText('courseFrom'),
                  true,
                  true,
                )}
              </Grid>
              <Grid item xs={12} md={6} lg={6} className={`${classes.tenantUserWidth} ${classes.tenantUserWidth}`}>
                <Dropdown
                  minWidth="100%"
                  labelId={t('COURSE_TO')}
                  label={`${t('COURSE_TO')}*`}
                  id="courseTo"
                  name="courseTo"
                  value={formik.values.courseTo}
                  handleChange={formik.handleChange}
                  options={classLevelOption}
                  onBlur={() => setPreviousFieldTouch('courseTo')}
                  error={getErrorText('courseTo')}
                  required
                  disabled={userRole === userRoles.REGION_COORDINATOR || userRole === userRoles.LOCATION_COORDINATOR}
                />
                {getErrorText('courseTo')}
              </Grid>
            </Grid>
            <Grid container spacing={2} className={`${classes.innerContainer}`}>
              <Grid item xs={12} md={6} lg={6} className={`${classes.tenantUserWidth}`}>
                {textField(
                  t('LOCATION_FROM'),
                  'locationFrom',
                  'text',
                  formik.handleChange,
                  () => setPreviousFieldTouch('locationFrom'),
                  formik.values.locationFrom,
                  getErrorText('locationFrom'),
                  true,
                  true,
                )}
              </Grid>
              <Grid item xs={12} md={6} lg={6} className={`${classes.locationSwap} ${classes.tenantUserWidth}`}>
                <Dropdown
                  minWidth="100%"
                  label={`${t('LOCATION_TO')}*`}
                  labelId={t('LOCATION_TO')}
                  id="locationTo"
                  name="locationTo"
                  value={formik.values.locationTo}
                  handleChange={formik.handleChange}
                  options={locationOptions}
                  onBlur={() => setPreviousFieldTouch('locationTo')}
                  error={getErrorText('locationTo')}
                  required
                  disabled={userRole === userRoles.LOCATION_COORDINATOR}
                />
                {getErrorText('locationTo')}
              </Grid>
            </Grid>

            <Grid container spacing={2} className={`${classes.innerContainer}`}>
              <Grid item xs={12} md={6} lg={6} className={`${classes.tenantUserWidth}`}>
                {textField(
                  t('SECTION_FROM'),
                  'sectionFrom',
                  'text',
                  formik.handleChange,
                  () => setPreviousFieldTouch('sectionFrom'),
                  formik.values.sectionFrom,
                  getErrorText('sectionFrom'),
                  true,
                  true,
                )}
              </Grid>
              <Grid item xs={12} md={6} lg={6} className={`${classes.tenantUserWidth} ${classes.tenantUserWidth}`}>
                <Dropdown
                  minWidth="100%"
                  label={`${t('SECTION_TO')}*`}
                  labelId={t('SECTION_TO')}
                  id="sectionTo"
                  name="sectionTo"
                  value={formik.values.sectionTo}
                  handleChange={formik.handleChange}
                  options={sectionOptions}
                  onBlur={() => setPreviousFieldTouch('sectionTo')}
                  error={getErrorText('sectionTo')}
                  required
                />

                {getErrorText('sectionTo')}
              </Grid>
              {
                isChangeLogVisible && (

                  <Grid item xs={12} md={12} lg={12} className={`${classes.tenantUserWidth}`}>

                    {
                      textField(
                        t('CHANGE_LOG'),
                        'changeLogs',
                        'text',
                        formik.handleChange,
                        () => setPreviousFieldTouch('changeLogs'),
                        formik.values.changeLogs,
                        getErrorText('changeLogs'),
                        true,
                        false,
                      )
                    }
                  </Grid>
                )
              }

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
export default SwapCourseLocation;
