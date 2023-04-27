/* eslint-disable eqeqeq */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Box, Grid } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';

import { useTranslation } from 'react-i18next';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import ButtonAtom from '../../../../components/atoms/button';
import LabeledMultiSelect from '../../../../components/atoms/multi-select-with-label';
import Dropdown from '../../../../components/atoms/dropdown-with-label';
import { Buttons } from '../../../../constant';
import useStyles from '../../../../custom-hooks/useStyles';
import style from '../../../register/style';

import DatePickerAtom from '../../../../components/atoms/datepicker';
import styles from './style';
// eslint-disable-next-line import/named
import {
  genderOptions,
} from '../../../register/student-info/constants';
import ImageUpload from '../../../../components/atoms/image-upload';
import LabeledAddressAutoComplete from '../../../../components/atoms/labeled-auto-compelete';
import {
  editStudentByAdmin,
  getStudentAccountDetails,
  updateSiblingInfo,
  updateStudentInfo,
} from '../../../../store/actions/getStudent';
import Loader from '../../../../components/atoms/loader';
import MapContainer from '../../../../components/atoms/google-map';
import {
  getDistanceBetweenTwoPoint,
} from '../../../../utils/methods';
import useStudent from '../../../../custom-hooks/useStudent';
import { PerformantTextField } from '../../../../components/atoms';
import { getStudentValues, getStudentValuesForEnroll } from './helper';
import { commonFields, reqFieldsForAdmin, reqFieldsForStudent } from './constants';

function EditDialogFooter({
  classes, setDialogOpen, t, viewLogs, onSubmit,
}) {
  return (
    <Grid container className={classes.dialogButtons}>
      {viewLogs && (
        <Grid
          item
          xs={5}
          className={classes.viewLogs}
        >
          <FindInPageOutlinedIcon style={{ height: 16 }} />
          <div onClick={() => viewLogs(setDialogOpen)}>{t('VIEW_LOGS')}</div>
        </Grid>
      )}
      <Grid item xs={7} className={classes.gridButtonsFooter}>
        <ButtonAtom
          name={t('CANCEL')}
          onClick={() => setDialogOpen(false)}
          btntype={Buttons.SECONDARY}
        />
        <ButtonAtom
          name={t('SAVE_STUDENT_INFORMATION')}
          onClick={onSubmit}
          btntype={Buttons.PRIMARY}
          className={classes.activeButton}
        />
      </Grid>
    </Grid>
  );
}

function EditDialogFooterForStudent({
  classes,
  onCancel,
  t,
  onSubmit,
}) {
  return (
    <Grid container className={classes.saveCancelContainer}>
      <Grid container justifyContent="flex-end">
        <ButtonAtom
          name={t('CANCEL')}
          onClick={onCancel}
          btntype={Buttons.SECONDARY}
        />
        <ButtonAtom
          name={t('SAVE')}
          onClick={onSubmit}
          btntype={Buttons.PRIMARY}
          className={classes.activeButton}
        />
      </Grid>
    </Grid>
  );
}
function displayValue(key, value) {
  const classes = useStyles(styles)();
  return (
    <Grid container item xs={12} spacing={0} className={classes.dataPadding}>
      <Grid item xs={4} className={classes.label}>
        {key}
      </Grid>
      <Grid item xs={8} className={classes.value}>
        <span> : </span>
        <span className={classes.previewValue}>{`${value}`}</span>
      </Grid>
    </Grid>
  );
}

export default function EditStudent({
  viewLogs,
  setDialogOpen,
  isStudent,
  isSibling,
  studentInfo,
  parentInfo,
  isEnrollStudent,
  setStudentData,
  setEditSibling,
  setEditStudent,
  siblingId,
  setSiblingData,
  editStudentClasses,
  setStudentState,
  setFormikControl,
  enrollCourseList,
  refreshStudentsData,
}) {
  const { t } = useTranslation();
  const selectedStudentData = useStudent();

  const [loading, setLoading] = useState(false);
  const [imageUpload, setImageUpload] = useState();
  const dispatch = useDispatch();
  const tShirtOptions = selectedStudentData?.tshirts;
  const gradeOptions = selectedStudentData?.academicGrades.map((gopt) => ({
    ...gopt,
    id: gopt.name,
  }));
  const extracurricularOptions = selectedStudentData?.extraCurricularActivites;
  const [mapOptions, setMapOptions] = useState(selectedStudentData?.locations);
  const classLevelOption = isEnrollStudent ? enrollCourseList : selectedStudentData?.courses;
  const academicOptions = {
    name: '2022-2023',
    id: '2022-2023',
  };
  const classes = useStyles(styles)();
  const registerClasses = editStudentClasses || useStyles(style)();
  const [address, setAddress] = useState(null);
  const commonSchema = Yup.object({
    profileImage: Yup.string(t('PROFILEIMAGE_REQUIRED')).required(
      t('PROFILEIMAGE_REQUIRED'),
    ),
    firstName: Yup.string(t('FIRSTNAME_REQUIRED'))
      .matches(/^[aA-zZ\s]+$/, t('NOT_SPECIAL_CHAR'))
      .min(2, t('FIRSTNAME_MIN'))
      .required(t('FIRSTNAME_REQUIRED')),
    lastName: Yup.string(t('LASTNAME_REQUIRED'))
      .matches(/^[aA-zZ\s]+$/, t('NOT_SPECIAL_CHAR'))
      .min(2, t('LASTNAME_MIN'))
      .required(t('LASTNAME_REQUIRED')),

    dateOfBirth: Yup.date()
      .max(new Date(), t('FUTURE_DATE_NOT_ALLOWED'))
      .typeError(t('INVALID_DATE'))
      .required(t('DOB_REQUIRED'))
      .test('isValidDate', t('INVALID_DATE'), (value) => {
        const currentYear = new Date().getFullYear();
        const validYear = (value.getFullYear() >= 1900 && currentYear >= value.getFullYear())
          || false;
        return validYear;
      }),

    gender: Yup.string(t('GENDER_REQUIRED')).required(t('GENDER_REQUIRED')),
    tShirt: Yup.string(t('TSHIRT_REQUIRED')).required(t('TSHIRT_REQUIRED')),
    grade: Yup.string(t('GRADE_REQUIRED')).required(t('GRADE_REQUIRED')),
    academicSchool: Yup.string(t('SEARCHSCHOOL_REQUIRED')).required(
      t('SEARCHSCHOOL_REQUIRED'),
    ),
    extraCurricularActivities: Yup.array()
      .min(1, t('EXTRACURRICULARACTIVITIES_REQUIRED'))
      .required(t('EXTRACURRICULARACTIVITIES_REQUIRED')),
  });

  const studentSchema = Yup.object({
    academicYear: Yup.string(t('ACADEMIC_YEAR_REQUIRED')).required(
      t('ACADEMIC_YEAR_REQUIRED'),
    ),
    classLevel: Yup.string(t('CLASSLEVEL_REQUIRED')).required(
      t('CLASSLEVEL_REQUIRED'),
    ),
    manabadiLocation: Yup.string(t('SORTEDNEAREST_REQUIRED')).required(
      t('SORTEDNEAREST_REQUIRED'),
    ),
  });

  const adminSchema = Yup.object({
    changeLogs: Yup.string(t('CHANGE_LOG_REQUIRED')).required(
      t('CHANGE_LOG_REQUIRED'),
    ),
  });
  const isStudentOrSibling = isStudent || isSibling;
  const validationSchema = isStudentOrSibling || isEnrollStudent
    ? commonSchema.concat(studentSchema)
    : commonSchema.concat(adminSchema);
  const formikData = isStudentOrSibling || isEnrollStudent ? studentInfo : studentInfo?.s1;
  const formik = useFormik({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: formikData?.dateOfBirth || new Date(),
      gender: '',
      tShirt: '',
      grade: '',
      academicSchool: formikData?.academicSchool,
      extraCurricularActivities: [],
      profileImage: formikData.profileImage,
      changeLogs: '',
      latitude: '',
      longitude: '',
      academicYear: formikData?.academicYear,
      classLevel: formikData?.selectedClassLevel,
      manabadiLocation: [],
    },
    validationSchema,
    onSubmit: (values) => {
      if (isEnrollStudent) {
        return;
      }
      setLoading(true);
      const tShirtSize = tShirtOptions?.find(
        (shirt) => shirt.id === values?.tShirt,
      );
      const grade = gradeOptions?.find((g) => g.name == values?.grade);
      const ac = extracurricularOptions?.filter((op) => values?.extraCurricularActivities?.some(
        (value) => op?.id === value,
      ));
      const selectedAc = ac?.map((c) => c.name);
      const payload = {
        dateOfBirth: values.dateOfBirth,
        // firstName: values.firstName,
        // lastName: values.lastName,
        // middleName: values.middleName,
        gender: values.gender,
        academicGrade: grade?.name,
        academicSchool: {
          address: values?.academicSchool,
          aptSuite: '',
          latitude: Number(values?.latitude),
          longitude: Number(values?.longitude),
        },
        extraCurricularActivities: selectedAc,
        tShirtSize: tShirtSize?.name,
        // logMessage: values.changeLogs,
        image: imageUpload.target.value,
      };
      if (!isStudentOrSibling) {
        payload.firstName = values.firstName;
        payload.lastName = values.lastName;
        payload.middleName = values.middleName;
        payload.logMessage = values.changeLogs;
      }

      if (formik?.values?.profileImage === payload.image) {
        payload.image = '';
      }
      if (isStudent) {
        setLoading(true);

        const refreshList = () => {
          const loadRefreshData = () => {
            setEditStudent(false);
            setLoading(false);
          };
          dispatch(getStudentAccountDetails(loadRefreshData, setStudentState));
        };
        dispatch(updateStudentInfo(payload, refreshList, setLoading));
      } else if (isSibling) {
        setLoading(true);
        const refreshList = () => {
          const loadRefreshData = () => {
            setEditSibling(false);
            setLoading(false);
          };
          dispatch(
            getStudentAccountDetails(
              loadRefreshData,
              setStudentState,
              setSiblingData,
            ),
          );
        };
        dispatch(
          updateSiblingInfo(payload, siblingId, refreshList, setLoading),
        );
      } else {
        const studentData = isStudentOrSibling || isEnrollStudent ? studentInfo : studentInfo?.s1;
        dispatch(
          editStudentByAdmin(studentData?.studentId, payload, setLoading),
        ).then(() => {
          if (refreshStudentsData) {
            refreshStudentsData();
          }
          setDialogOpen(false);
        });
      }
    },
  });
  useEffect(() => {
    const info = getStudentValuesForEnroll(
      formik.values,
      studentInfo,
      isStudentOrSibling,
      extracurricularOptions,
      tShirtOptions,
      classLevelOption,
    );
    if (isEnrollStudent && Object.keys(formik.touched).length > 0) {
      setStudentData(info);
    }
  }, [formik.touched, formik.values.classLevel]);
  useEffect(() => {
    if (setFormikControl) {
      setFormikControl(formik);
    }
  }, [formik.errors]);
  useEffect(() => {
    formik.validateField('dateOfBirth');
  }, [formik.values.dateOfBirth]);
  const student = isStudentOrSibling || isEnrollStudent ? studentInfo : studentInfo?.s1;
  useEffect(() => {
    const selectedTshirt = tShirtOptions?.find(
      (shirt) => shirt.name === student?.tShirt,
    );
    const selectedGrade = gradeOptions?.find((g) => g.name == student?.grade);
    const results = extracurricularOptions?.filter((op) => student?.extraCurricularActivities?.some(
      (value) => op?.name === value,
    ));
    const selectedEC = results?.map((c) => c.id);
    const values = getStudentValues(student, isStudentOrSibling, isEnrollStudent, selectedTshirt, selectedGrade, selectedEC);
    formik.setValues(values);
    formik.setFieldValue(
      'extraCurricularActivities',
      selectedEC,
    );
  }, [student?.academicYear, student?.selectedClassLevel, selectedStudentData, studentInfo, formik.values.profileImage]);
  const getErrorText = (key, errorText) => (formik.touched[key] && formik.errors[key] ? (
    <span data-testid={key} className={classes.errorText}>
      {formik.errors[key]}
    </span>
  ) : errorText ? (
    <span className={classes.errorText}>{errorText}</span>
  ) : null);

  const getDestinationLatLng = (nearestValue) => {
    if (!nearestValue) {
      return { lat: '', lng: '' };
    }
    const selectedAdd = _.find(mapOptions, (opt) => opt.id === nearestValue);
    return selectedAdd;
  };

  const getCoordinatorDetail = (locObj) => {
    const locCoor = locObj?.location_coordinators || [];
    return locCoor.find((o) => o?.isPrimary);
  };
  const getFormatTime = (time) => moment(time, 'hh:mm a').format('hh:mm a');

  const setPreviousFieldTouch = (key) => {
    const allFields = isStudentOrSibling
      ? commonFields.concat(reqFieldsForStudent)
      : commonFields.concat(reqFieldsForAdmin);

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

  useEffect(() => {
    if (address) {
      const obj = {
        target: {
          name: 'academicSchool',
          value: address?.formatted_address,
        },
      };
      const latObj = {
        target: {
          name: 'latitude',
          value: address?.geometry?.location?.lat(),
        },
      };
      const lonObj = {
        target: {
          name: 'longitude',
          value: address?.geometry?.location?.lng(),
        },
      };
      formik.handleChange(obj);
      formik.handleChange(latObj);
      formik.handleChange(lonObj);
      if (isEnrollStudent) {
        formik.setFieldValue('latitude', address?.geometry?.location?.lat());
        formik.setFieldValue('longitude', address?.geometry?.location?.lng());
      }

      setPreviousFieldTouch('academicSchool');
    }
  }, [address]);
  useEffect(() => { }, [studentInfo]);
  useEffect(() => {
    let distanceMapOptions = mapOptions?.map((opt) => {
      const res = getDistanceBetweenTwoPoint(parentInfo?.homeAddressInfo, {
        lat: opt?.locationAddress?.latitude,
        lng: opt?.locationAddress?.longitude,
      });
      const miles = res ? res / 1609.34 : 0;
      return { ...opt, distance: miles ? miles.toFixed(2) : 0 };
    });
    distanceMapOptions = distanceMapOptions?.sort(
      (a, b) => a?.distance - b?.distance,
    );
    setMapOptions(
      distanceMapOptions && distanceMapOptions?.length
        ? distanceMapOptions
        : mapOptions,
    );
  }, [selectedStudentData?.locations]);

  return (
    <Box className={registerClasses.gridContainer}>
      <Grid container className={classes.mainContainer}>
        <FormikProvider value={formik}>
          <form
            name="student-info"
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2} flexDirection="row">
              <Grid item xs={12} sm={2} md={2} lg={2} className={classes.imageAlign}>
                <ImageUpload
                  id="profileImage"
                  name="profileImage"
                  isEditForm
                  imageUploaded={formik.values.profileImage}
                  setImageUpload={setImageUpload}
                />
                {getErrorText('profileImage')}
              </Grid>
              <Grid item xs={12} sm={10} md={10} lg={10}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} lg={6} className={classes.alignGrid}>
                    <PerformantTextField
                      label={`${t('FIRST_NAME')}`}
                      id="firstName"
                      required
                      name="firstName"
                      type="text"
                      disabled={isStudentOrSibling}
                      value={formik.values.firstName}
                      onBlur={() => setPreviousFieldTouch('firstName')}
                      error={getErrorText('firstName')}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} className={classes.alignGrid}>
                    <PerformantTextField
                      // label={t('MIDDLE_NAME')}
                      disabled={isStudentOrSibling}
                      label={`${t('MIDDLE_NAME')}`}
                      id="middleName"
                      required={false}
                      name="middleName"
                      type="text"
                      value={formik.values.middleName}
                      onBlur={() => setPreviousFieldTouch('middleName')}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} className={classes.alignGrid}>
                    <PerformantTextField
                      label={`${t('LAST_NAME')} `}
                      disabled={isStudentOrSibling}
                      id="lastName"
                      required
                      name="lastName"
                      type="text"
                      value={formik.values.lastName}
                      onBlur={() => setPreviousFieldTouch('lastName')}
                      error={getErrorText('lastName')}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} className={classes.alignGrid}>
                    <DatePickerAtom
                      wrapperClassName={classes.datePicker}
                      label={`${t('DOB')}*`}
                      minWidth="100%"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formik.values.dateOfBirth}
                      onBlur={() => setPreviousFieldTouch('dateOfBirth')}
                      onChange={(newDate) => {
                        const obj = {
                          target: {
                            name: 'dateOfBirth',
                            value: newDate,
                          },
                        };
                        return formik.handleChange(obj);
                      }}
                      error={getErrorText('dateOfBirth')}
                      maxDate={new Date()}
                    />
                    {getErrorText('dateOfBirth')}
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} className={classes.alignGrid}>
                    <Dropdown
                      minWidth="100%"
                      label={`${t('GENDER')}*`}
                      id="gender"
                      name="gender"
                      value={formik.values.gender}
                      onBlur={() => setPreviousFieldTouch('gender')}
                      error={getErrorText('gender')}
                      handleChange={formik.handleChange}
                      options={genderOptions}
                      required
                      labelId="gender"
                    />
                    {getErrorText('gender')}
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} className={classes.alignGrid}>
                    <Dropdown
                      minWidth="100%"
                      label={`${t('TSHIRT')}*`}
                      id="tShirt"
                      name="tShirt"
                      value={formik.values.tShirt}
                      onBlur={() => setPreviousFieldTouch('tShirt')}
                      error={getErrorText('tShirt')}
                      handleChange={formik.handleChange}
                      options={tShirtOptions}
                      required
                      labelId="tShirt"
                    />
                    {getErrorText('tShirt')}
                  </Grid>
                  {isStudentOrSibling ? (
                    <Grid item xs={12} md={6} lg={4} className={classes.alignGrid}>
                      <PerformantTextField
                        minWidth="100%"
                        label={`${t('ACADEMICYEAR')}`}
                        id="academicYear"
                        name="academicYear"
                        disabled={isStudentOrSibling}
                        value={academicOptions?.id}
                        error={getErrorText('academicYear')}
                        required
                        labelId="academicYear"
                      />
                    </Grid>
                  ) : isEnrollStudent ? (
                    <Grid item xs={12} md={6} lg={4} className={classes.alignGrid}>
                      <Dropdown
                        minWidth="100%"
                        label={`${t('ACADEMICYEAR')}*`}
                        id="academicYear"
                        name="academicYear"
                        value={formik.values.academicYear}
                        onBlur={() => setPreviousFieldTouch('academicYear')}
                        error={getErrorText('academicYear')}
                        handleChange={formik.handleChange}
                        options={[academicOptions]}
                        required
                        labelId="academicYear"
                        disabled={isEnrollStudent}
                      />
                      {getErrorText('academicYear')}
                    </Grid>
                  ) : null}
                  <Grid item xs={12} md={6} lg={6} className={classes.alignGrid}>
                    <Dropdown
                      minWidth="100%"
                      label={`${t('GRADE')}*`}
                      id="grade"
                      name="grade"
                      value={formik.values.grade}
                      onBlur={() => setPreviousFieldTouch('grade')}
                      error={getErrorText('grade')}
                      handleChange={formik.handleChange}
                      options={gradeOptions}
                      required
                      labelId="grade"
                    />
                    {getErrorText('grade')}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={isStudentOrSibling ? 6 : 6}
                    lg={isStudentOrSibling ? 6 : 6}
                    className={classes.alignGrid}
                  >
                    <LabeledAddressAutoComplete
                      label={`${t('ACADEMIC_SCHOOL')} *`}
                      id="academicSchool"
                      required
                      name="academicSchool"
                      value={formik.values.academicSchool}
                      error={getErrorText('academicSchool')}
                      onPlaceSelected={(e) => {
                        setAddress(e);
                      }}
                      onChange={(e) => {
                        e.target.name = 'academicSchool';
                        formik.handleChange(e);
                      }}
                    />
                    {getErrorText('academicSchool')}
                  </Grid>

                  {isStudentOrSibling ? (
                    <Grid item xs={12} md={6} lg={4} className={classes.alignGrid}>
                      <PerformantTextField
                        minWidth="100%"
                        label={`${t('MANABADI_LOCATION')}`}
                        id="manabadiLocation"
                        name="manabadiLocation"
                        disabled={isStudentOrSibling}
                        value={formik.values.manabadiLocation}
                        error={getErrorText('manabadiLocation')}
                        required
                        labelId="manabadiLocation"
                      />
                      {getErrorText('manabadiLocation')}
                    </Grid>
                  ) : isEnrollStudent ? (
                    <Grid item xs={12} md={6} lg={4} className={classes.alignGrid}>
                      <Dropdown
                        minWidth="100%"
                        label={`${t('MANABADI_LOCATION')}*`}
                        id="manabadiLocation"
                        name="manabadiLocation"
                        disable={isStudentOrSibling}
                        value={formik.values.manabadiLocation}
                        onBlur={() => setPreviousFieldTouch('manabadiLocation')}
                        error={getErrorText('manabadiLocation')}
                        handleChange={formik.handleChange}
                        options={mapOptions}
                        required
                        labelId="manabadiLocation"
                      />
                      {getErrorText('manabadiLocation')}
                    </Grid>
                  ) : null}

                  {isStudentOrSibling ? (
                    <Grid item xs={12} md={6} lg={4} className={classes.alignGrid}>
                      <PerformantTextField
                        minWidth="100%"
                        label={`${t('CLASSLEVEL')}`}
                        id="classLevel"
                        name="classLevel"
                        disabled={isStudentOrSibling}
                        value={formik.values.classLevel}
                        error={getErrorText('classLevel')}
                        required
                        labelId="classLevel"
                      />
                    </Grid>
                  ) : isEnrollStudent ? (
                    <Grid item xs={12} md={6} lg={4} className={classes.alignGrid}>
                      <Dropdown
                        minWidth="100%"
                        label={`${t('CLASSLEVEL')}*`}
                        id="classLevel"
                        name="classLevel"
                        value={formik.values.classLevel}
                        onBlur={() => setPreviousFieldTouch('classLevel')}
                        error={getErrorText('classLevel')}
                        handleChange={formik.handleChange}
                        options={classLevelOption}
                        required
                        labelId="classLevel"
                      />
                      {getErrorText('classLevel')}
                    </Grid>
                  )
                    : (
                      <Grid
                        item
                        xs={12}
                        // md={12}
                        // lg={12}
                        md={isStudentOrSibling ? 6 : 12}
                        lg={isStudentOrSibling ? 6 : 12}
                        className={classes.alignGrid}
                      >
                        <LabeledMultiSelect
                          minWidth="100%"
                          labelId="grade"
                          label={`${t('EXTRA_ACTIVITIES')}*`}
                          options={extracurricularOptions}
                          id="extraCurricularActivities"
                          name="extraCurricularActivities"
                          onBlur={() => setPreviousFieldTouch('extraCurricularActivities')}
                          error={getErrorText('extraCurricularActivities')}
                          handleChange={formik.handleChange}
                          value={formik.values.extraCurricularActivities}
                          required
                        />
                        {getErrorText('extraCurricularActivities')}
                      </Grid>
                    )}
                  {isStudentOrSibling || isEnrollStudent ? (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={6}
                      // md={isStudentOrSibling ? 6 : 12}
                      // lg={isStudentOrSibling ? 6 : 12}
                      className={classes.alignGrid}
                    >
                      <LabeledMultiSelect
                        minWidth="100%"
                        labelId="grade"
                        label={`${t('EXTRA_ACTIVITIES')}*`}
                        options={extracurricularOptions}
                        id="extraCurricularActivities"
                        name="extraCurricularActivities"
                        onBlur={() => setPreviousFieldTouch('extraCurricularActivities')}
                        error={getErrorText('extraCurricularActivities')}
                        handleChange={formik.handleChange}
                        value={formik.values.extraCurricularActivities}
                        required
                      />
                      {getErrorText('extraCurricularActivities')}
                    </Grid>
                  ) : (
                    <Grid
                      item
                      xs={12}
                      md={12}
                      lg={12}
                      className={classes.alignGrid}
                    >
                      <PerformantTextField
                        label={`${t('CHANGE_LOG')}`}
                        id="changeLogs"
                        name="changeLogs"
                        type="text"
                        value={formik.values.changeLogs}
                        onBlur={() => setPreviousFieldTouch('changeLogs')}
                        error={getErrorText('changeLogs')}
                        onChange={formik.handleChange}
                        required
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </form>
        </FormikProvider>
        {isEnrollStudent
          && (
            <Grid
              container
              item
              spacing={4}
              flexDirection="row"
              mt={1}
            >
              <Grid item xs={12} md={12} lg={6} className={classes.mapContainerGrid}>
                <MapContainer
                  originLatLng={parentInfo?.homeAddressInfo || { lat: 0, lng: 0 }}
                  destinationLatLng={{
                    lat: getDestinationLatLng(
                      formik?.values?.manabadiLocation,
                    )?.locationAddress?.latitude || 0,
                    lng: getDestinationLatLng(
                      formik?.values?.manabadiLocation,
                    )?.locationAddress?.longitude || 0,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={6} className={classes.mapContainerDescGrid}>
                <div className={classes.locationHeader}>
                  {getDestinationLatLng(formik?.values?.manabadiLocation)?.name || ''}
                </div>

                <div className={classes.borderBottom} />
                {formik?.values?.manabadiLocation ? (
                  <>
                    {displayValue(t('LOCATION_ADDRESS'), `${getDestinationLatLng(formik?.values?.manabadiLocation)?.locationAddress?.address}`, classes)}
                    {displayValue(t('COORDINATOR'), `${getCoordinatorDetail(getDestinationLatLng(formik?.values?.manabadiLocation))?.user?.firstName || ''} ${getCoordinatorDetail(getDestinationLatLng(formik?.values?.manabadiLocation))?.user?.middleName || ''} ${getCoordinatorDetail(getDestinationLatLng(formik?.values?.manabadiLocation))?.user?.lastName || ''}`, classes)}
                    {displayValue(t('COORDINATOREMAIL'), `${getCoordinatorDetail(getDestinationLatLng(formik?.values?.manabadiLocation))?.user?.manabadiEmail || ''}`, classes)}
                    {displayValue(t('CONTACT_NO'), `${getCoordinatorDetail(getDestinationLatLng(formik?.values?.manabadiLocation))?.user?.contactNumber || ''}`, classes)}
                    {displayValue(t('CLASS_TIMINGS'), `${getDestinationLatLng(formik?.values?.manabadiLocation)?.classTiming || ''} - 
                    ${getFormatTime(getDestinationLatLng(formik?.values?.manabadiLocation)?.startTime) || ''} to
                    ${getFormatTime(getDestinationLatLng(formik?.values?.manabadiLocation)?.endTime) || ''}`, classes)}
                    {displayValue(t('DISTANCEFROMHOME'), `${getDestinationLatLng(formik?.values?.manabadiLocation)?.distance || ''} miles`, classes)}
                  </>
                ) : ''}
              </Grid>
            </Grid>
          )}
      </Grid>
      {
        !isEnrollStudent ? (
          <div>
            <br />
            {isStudentOrSibling ? (
              <EditDialogFooterForStudent
                registerClasses={registerClasses}
                classes={classes}
                setDialogOpen={setDialogOpen}
                onSubmit={formik.handleSubmit}
                isStudent={isStudent}
                isSibling={isSibling}
                onCancel={() => (isStudent ? setEditStudent(false) : setEditSibling(false))}
                t={t}
              />
            ) : (
              <EditDialogFooter
                registerClasses={registerClasses}
                classes={classes}
                setDialogOpen={setDialogOpen}
                viewLogs={viewLogs}
                onSubmit={formik.handleSubmit}
                t={t}
              />
            )}
          </div>
        ) : null
      }
      {
        loading && (
          <Grid>
            <Loader message={t('LOADING')} />
          </Grid>
        )
      }
    </Box>
  );
}
