import React, {
  useState, useEffect, memo,
} from 'react';
import {
  Grid,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import _ from 'lodash';
import moment from 'moment';
import getCourseByAge from '../../../store/services/getCourseByAge';

import {
  containsSpecialChars, checkDateValid, hasNumericOrSpecialChar, getDistanceBetweenTwoPoint,
} from '../../../utils/methods';
import {
  TextField, Dropdown, Datepicker, ImageUpload, MapContainer, MultiSelectDropdown, AddressAutoComplete,
} from '../../../components/atoms';
import useStyles from '../../../custom-hooks/useStyles';
import styles from './style';
import {
  genderOptions, studentInitialValues, studentInitialErrors,
} from './constants';
import { getPlaceInformation } from '../../../utils/mapMethod';
import CommonInput from './common-input';
import getLocationByCourse from '../../../store/services/getLocationByCourse';
// import {
//   getLocationsByCourseId,
// } from '../../../store/services/auth';

function AddStudent({
  stuInfo, mainFormError, parentInfo, setMainForm, setMainFormError,
}) {
  const { t } = useTranslation();
  const studentInfoFromStore = useSelector((state) => state?.getStudent);
  const tShirtOptions = studentInfoFromStore?.tshirts;
  const gradeOptions = studentInfoFromStore?.academicGrades;
  const extracurricularOptions = studentInfoFromStore?.extraCurricularActivites;
  const classes = useStyles(styles)();
  // states
  const [classLevelOption, setClassLevelOption] = useState([]);
  const initialCourseList = studentInfoFromStore?.courses;
  const [address, setAddress] = useState(null);
  const [mapOptions, setMapOptions] = useState(studentInfoFromStore?.locations);
  const initialValues = { ...studentInitialValues };
  const initialErrors = { ...studentInitialErrors };
  const [studentError, setStudentError] = useState(mainFormError || initialErrors);
  const [studentForm, setStudentForm] = useState(stuInfo || initialValues);
  useEffect(() => {
    setStudentError(mainFormError);
  }, [mainFormError]);

  useEffect(() => {
    // setClassLevelOption(studentInfoFromStore?.courses);
  }, [studentInfoFromStore?.courses]);

  const getMapOptions = (options) => {
    if (fetch) {
      let distanceMapOptions = options?.map((opt) => {
        const res = getDistanceBetweenTwoPoint(parentInfo?.homeAddressInfo, {
          lat: opt?.locationAddress?.latitude,
          lng: opt?.locationAddress?.longitude,
        });
        const miles = res ? res / 1609.34 : 0;
        return { ...opt, distance: miles ? miles.toFixed(2) : 0 };
      });
      distanceMapOptions = distanceMapOptions?.sort((a, b) => a.distance - b.distance);
      setMapOptions(distanceMapOptions && distanceMapOptions?.length ? distanceMapOptions : options);
    }
  };

  const getClassLevelOptions = (dob, location) => {
    getCourseByAge(dob, location).then((options) => {
      setClassLevelOption(options);
    }).catch(() => {
      // console.log('err--', err);
    });
  };

  const getLocationsByCourse = (courseId) => {
    getLocationByCourse(courseId)
      .then((options) => {
        getMapOptions(options);
      })
      .catch(() => { });
  };

  useEffect(() => {
    if (studentForm?.classLevel !== '') {
      getLocationsByCourse(studentForm?.classLevel);
    }
  }, [studentForm.classLevel]);

  useEffect(() => {
    if (studentForm?.dateOfBirth !== '' && studentForm?.sortedNearest === '') {
      const diff = moment().diff(moment(studentForm?.dateOfBirth), 'years');

      if (diff < 4) {
        setClassLevelOption([]);
      } else if (diff >= 4 && diff <= 6) {
        const course = initialCourseList.filter((row) => row.level === 1);
        setClassLevelOption(course);
      } else if (diff >= 6 && diff <= 100) {
        const course = initialCourseList.filter((row) => row.level === 3);
        setClassLevelOption(course);
      }
    }
  }, [studentForm.dateOfBirth, studentForm.sortedNearest]);

  const onFieldBlur = async (fieldKey) => {
    const getUpdatedError = (errorObj, fiKey, errorMsg) => ({ ...errorObj, [fiKey]: errorMsg });

    if (fieldKey === 'searchSchool' && address) {
      const res = await getPlaceInformation(address);
      setStudentForm({
        ...studentForm,
        studentSchoolInfo: res,
        searchSchool: address,
      });
    }
    if (fieldKey === 'dateOfBirth') {
      const valid = checkDateValid(studentForm[fieldKey]);
      if (!valid) {
        setStudentError({ ...getUpdatedError(studentError, fieldKey, t('INVALID_DATE')) });
      }
    }
    if ((!studentForm[fieldKey] && studentForm[fieldKey]?.length === 0)
      || (fieldKey === 'extraCurricularActivities'
        && !studentForm[fieldKey]?.length)) {
      let allFields = ['profileImage', 'firstName', 'middleName', 'lastName', 'dateOfBirth', 'gender',
        'tShirt', 'academicYear', 'grade', 'searchSchool', 'sortedNearest',
        'classLevel', 'extraCurricularActivities',
      ];
      if (studentForm?.profileImage?.length > 1) {
        allFields = allFields.filter((value) => value !== 'profileImage');
      }
      if (studentForm?.firstName?.length > 1) {
        allFields = allFields.filter((value) => value !== 'firstName');
      }
      if (studentForm?.lastName?.length > 1) {
        allFields = allFields.filter((value) => value !== 'lastName');
      }
      if (studentForm.dateOfBirth && checkDateValid(studentForm.dateOfBirth)) {
        allFields = allFields.filter((value) => value !== 'dateOfBirth');
      }
      const tempFields = ['gender', 'tShirt', 'academicYear', 'grade', 'searchSchool', 'sortedNearest', 'classLevel'];
      tempFields.forEach((tempField) => {
        if (studentForm[tempField]) {
          allFields = allFields.filter((value) => value !== tempField);
        }
      });
      if (studentForm.extraCurricularActivities?.length) {
        allFields = allFields.filter((value) => value !== 'extraCurricularActivities');
      }
      const index = allFields.indexOf(fieldKey);
      if (index > -1) {
        const lcStudentError = { ...studentError };
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i <= index; i++) {
          const element = allFields[i];
          if (!studentForm[element] || !studentForm[fieldKey]?.length) {
            lcStudentError[element] = t(`${element.toUpperCase()}_REQUIRED`);
          }
        }
        setStudentError({ ...lcStudentError });
      }
    } else if (fieldKey === 'firstName'
      && (studentForm[fieldKey])?.length <= 1
    ) {
      setStudentError({ ...getUpdatedError(studentError, fieldKey, t('FIRSTNAME_MIN')) });
    } else if (fieldKey === 'lastName'
      && (studentForm[fieldKey])?.length <= 1
    ) {
      setStudentError({ ...getUpdatedError(studentError, fieldKey, t('LASTNAME_MIN')) });
    } else if ((fieldKey === 'firstName' || fieldKey === 'lastName') && containsSpecialChars(studentForm[fieldKey])) {
      setStudentError({ ...getUpdatedError(studentError, fieldKey, t('NOT_SPECIAL_CHAR')) });
    }
  };

  const getErrorText = (fKey) => (
    studentError[fKey] && (
      <span data-testid={`$${fKey}`} className={classes.errorText}>
        {studentError[fKey]}
      </span>
    )
  );

  const getDestinationLatLng = (nearestValue) => {
    if (!nearestValue) {
      return { lat: '', lng: '' };
    }
    return _.find(mapOptions, (opt) => opt.id === nearestValue);
  };

  const getMappingOfSelectedExtraCurricularActivities = (selectedActivity) => {
    const selectedExtraCurricularActivities = [];
    selectedActivity?.forEach((selectedVal) => {
      const selectedValueObj = _.find(extracurricularOptions, (ext) => ext.id === selectedVal);
      selectedExtraCurricularActivities.push(selectedValueObj);
    });
    return selectedExtraCurricularActivities;
  };

  const handleChange = (fKey, value) => {
    const stuForm = { ...studentForm };
    if (fKey === 'classLevel') {
      stuForm.selectedClassLevel = _.find(classLevelOption, (co) => co.id === value);
    }
    if (fKey === 'grade') {
      stuForm.selectedGrade = _.find(gradeOptions, (co) => co.id === value);
    }
    if (fKey === 'tShirt') {
      stuForm.selectedTshirtOption = _.find(tShirtOptions, (co) => co.id === value);
    }
    if (fKey === 'sortedNearest') {
      stuForm.selectedSortedNearestAddress = getDestinationLatLng(value)?.locationAddress?.address;
    }
    if (fKey === 'extraCurricularActivities') {
      stuForm.selectedExtraCurricularActivities = getMappingOfSelectedExtraCurricularActivities(value);
    }
    stuForm[fKey] = value;
    setStudentForm(stuForm);
    setStudentError({ ...studentError, [fKey]: value ? '' : studentError[fKey] });
    setMainForm({ ...stuForm, [fKey]: value });
    setMainFormError({ ...studentError, [fKey]: value ? '' : studentError[fKey] });
  };

  useEffect(() => {
    if (address) {
      handleChange('searchSchool', address);
      onFieldBlur('searchSchool');
    }
  }, [address]);

  useEffect(() => {
    if (studentForm?.dateOfBirth !== '' && studentForm?.sortedNearest !== '') {
      getClassLevelOptions(studentForm?.dateOfBirth, studentForm?.sortedNearest);
    }
  }, [studentForm?.dateOfBirth, studentForm?.sortedNearest]);

  useEffect(() => {
    getMapOptions(studentInfoFromStore?.locations);
  }, [studentInfoFromStore?.locations]);

  // useEffect(() => {
  //   if (studentForm?.classLevel !== '') {
  //     getLocationsByCourse(studentForm?.classLevel);
  //   }
  // }, [studentForm?.classLevel]);

  const getFormatTime = (time) => moment(time, 'hh:mm a').format('hh:mm a');

  function displayValue(key, value) {
    return (
      <Grid container spacing={0} className={classes.dataPadding}>
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

  const getCoordinatorDetail = (locObj) => {
    const locCoor = locObj?.location_coordinators || [];
    return locCoor.find((o) => o?.isPrimary);
  };
  return (
    <Grid container>
      <form
        name="student-info"
        noValidate
        autoComplete="off"
        className={classes.form}
      >
        <Grid container spacing={2} flexDirection="row">
          <Grid item xs={12} md={2} lg={2} className={classes.imageAlign}>
            <ImageUpload imageUploaded={studentForm.profileImage} setImageUpload={(e) => handleChange('profileImage', e)} />
            {getErrorText('profileImage')}
          </Grid>
          <Grid container item xs={12} md={10} lg={10} spacing={2}>
            <Tooltip title={t('HOVER_STU_FIRSTNAME')} placement="bottom-end" arrow>
              <Grid item xs={12} md={4} lg={4} className={classes.alignGrid}>
                <CommonInput
                  placeholder={`${t('FIRST_NAME')} *`}
                  id="firstName"
                  required
                  name="firstName"
                  type="text"
                  value={studentForm.firstName}
                  onBlur={() => onFieldBlur('firstName')}
                  error={studentError.firstName}
                  onChange={(e) => handleChange(
                    'firstName',
                    // eslint-disable-next-line no-nested-ternary
                    hasNumericOrSpecialChar(e.target.value) ? (e.target.value ? studentForm.firstName : '') : e.target.value,
                  )}
                />
              </Grid>
            </Tooltip>
            <Tooltip title={t('HOVER_STU_MIDDLENAME')} placement="bottom-end" arrow>
              <Grid item xs={12} md={4} lg={4} className={classes.alignGrid}>
                <CommonInput
                  placeholder={t('MIDDLE_NAME')}
                  id="middleName"
                  required={false}
                  name="middleName"
                  type="text"
                  shouldValidate={false}
                  value={studentForm.middleName}
                  onBlur={() => onFieldBlur('middleName')}
                  onChange={(e) => handleChange('middleName', e.target.value)}
                />
              </Grid>
            </Tooltip>
            <Tooltip title={t('HOVER_STU_LASTNAME')} placement="bottom-end" arrow>
              <Grid item xs={12} md={4} lg={4} className={classes.alignGrid}>
                <CommonInput
                  placeholder={`${t('LAST_NAME')} *`}
                  id="lastName"
                  required
                  name="lastName"
                  type="text"
                  value={studentForm.lastName}
                  onBlur={() => onFieldBlur('lastName')}
                  error={studentError.lastName}
                  onChange={(e) => handleChange(
                    'lastName',
                    // eslint-disable-next-line no-nested-ternary
                    hasNumericOrSpecialChar(e.target.value) ? (e.target.value ? studentForm.lastName : '') : e.target.value,
                  )}
                />
              </Grid>
            </Tooltip>
            <Grid item xs={12} md={4} lg={4} className={classes.alignGrid}>
              <Datepicker
                wrapperClassName={classes.datePicker}
                label={`${t('DOB')}*`}
                minWidth="100%"
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={studentForm.dateOfBirth}
                onBlur={() => onFieldBlur('dateOfBirth')}
                onChange={(newDate) => handleChange('dateOfBirth', newDate)}
                error={(studentError.dateOfBirth && !checkDateValid(studentError.dateOfBirth)) || studentError.dateOfBirth}
                maxDate={new Date()}
              />
              {getErrorText('dateOfBirth')}
            </Grid>
            <Grid item xs={12} md={4} lg={4} className={classes.alignGrid}>
              <Dropdown
                minWidth="100%"
                label={t('GENDER')}
                id="gender"
                name="gender"
                value={studentForm.gender}
                onBlur={() => onFieldBlur('gender')}
                error={studentError.gender}
                handleChange={(e) => handleChange('gender', e.target.value)}
                options={genderOptions}
                required
                labelId="gender"
              />
              {getErrorText('gender')}
            </Grid>
            <Grid item xs={12} md={4} lg={4} className={classes.alignGrid}>
              <Dropdown
                minWidth="100%"
                label={t('TSHIRT')}
                id="tShirt"
                name="tShirt"
                value={studentForm.tShirt}
                onBlur={() => onFieldBlur('tShirt')}
                error={studentError.tShirt}
                handleChange={(e) => handleChange('tShirt', e.target.value)}
                options={tShirtOptions}
                required
                labelId="tShirt"
              />
              {getErrorText('tShirt')}
            </Grid>
          </Grid>
          <Grid item xs={6} md={2} lg={2} />
          <Grid container item xs={12} md={10} lg={10} flexDirection="row" spacing={2}>
            <Grid item xs={12} md={4} lg={4} className={classes.alignGrid}>
              <TextField
                minWidth="100%"
                id="academicYear"
                name="academicYear"
                value={initialValues?.academicYear}
                required
                labelId="academicYear"
                disable
              />
              {/* {getErrorText(formRef, 'academicYear')} */}
            </Grid>
            <Grid item xs={12} md={4} lg={4} className={classes.alignGrid}>
              <Dropdown
                minWidth="100%"
                label={t('GRADE')}
                id="grade"
                name="grade"
                value={studentForm.grade}
                onBlur={() => onFieldBlur('grade')}
                error={studentError.grade}
                handleChange={(e) => handleChange('grade', e.target.value)}
                options={gradeOptions}
                required
                labelId="grade"
              />
              {getErrorText('grade')}
            </Grid>
            <Grid item xs={12} md={4} lg={4} className={classes.alignGrid}>
              <AddressAutoComplete
                label={`${t('ACADEMIC_SCHOOL')} *`}
                id="searchSchool"
                required
                name="searchSchool"
                value={studentForm.searchSchool}
                error={getErrorText('searchSchool')}
                onPlaceSelected={(e) => {
                  setAddress(e.formatted_address);
                }}
                onChange={(e) => {
                  handleChange('searchSchool', e.target.value);
                }}
                onBlur={() => onFieldBlur('searchSchool')}
              />
              {getErrorText('searchSchool')}
            </Grid>
          </Grid>
          <Grid item xs={6} md={2} lg={2} />
          <Grid container item xs={12} md={10} lg={10} spacing={2}>
            <Grid item xs={12} md={4} lg={4} className={classes.alignGrid}>
              <Dropdown
                minWidth="100%"
                label={t('CHOOSE_MANABADI_LOCATION')}
                id="sortedNearest"
                name="sortedNearest"
                value={studentForm.sortedNearest}
                onBlur={() => onFieldBlur('sortedNearest')}
                error={studentError.sortedNearest}
                handleChange={(e) => handleChange('sortedNearest', e.target.value)}
                options={mapOptions}
                required
                labelId="sortedNearest"
              />
              {getErrorText('sortedNearest')}
            </Grid>
            <Grid item xs={12} md={4} lg={4} className={classes.alignGrid}>
              <Dropdown
                minWidth="100%"
                label={t('CLASSLEVEL')}
                id="classLevel"
                name="classLevel"
                value={studentForm.classLevel}
                onBlur={() => onFieldBlur('classLevel')}
                error={studentError.classLevel}
                handleChange={(e) => handleChange('classLevel', e.target.value)}
                options={classLevelOption}
                required
                labelId="classLevel"
              />
              {getErrorText('classLevel')}

            </Grid>
            <Grid item xs={12} md={4} lg={4} className={classes.alignGrid}>
              <MultiSelectDropdown
                label="EXTRA_ACTIVITIES"
                options={extracurricularOptions}
                id="extraCurricularActivities"
                onBlur={() => onFieldBlur('extraCurricularActivities')}
                error={studentError.extraCurricularActivities}
                handleChange={(e) => handleChange('extraCurricularActivities', e.target.value)}
                value={studentForm.extraCurricularActivities}
                required
              />
              {getErrorText('extraCurricularActivities')}
            </Grid>
          </Grid>
          <Grid
            container
            className={classes.buttons}
          >
            <Grid item xs={12} md={6} lg={6} className={classes.mapContainerGrid}>
              <MapContainer
                originLatLng={parentInfo?.homeAddressInfo || { lat: 0, lng: 0 }}
                destinationLatLng={{
                  lat: getDestinationLatLng(studentForm.sortedNearest)?.locationAddress?.latitude || 0,
                  lng: getDestinationLatLng(studentForm.sortedNearest)?.locationAddress?.longitude || 0,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6} className={classes.mapContainerDescGrid}>
              <div className={classes.locationHeader}>
                {getDestinationLatLng(studentForm.sortedNearest)?.name || ''}
              </div>

              <div className={classes.borderBottom} />
              {studentForm.sortedNearest ? (
                <>
                  {displayValue(t('LOCATION_ADDRESS'), `${getDestinationLatLng(studentForm.sortedNearest)?.locationAddress?.address}`, classes)}
                  {displayValue(t('COORDINATOR'), `${getCoordinatorDetail(getDestinationLatLng(studentForm.sortedNearest))?.user?.firstName || ''} ${getCoordinatorDetail(getDestinationLatLng(studentForm.sortedNearest))?.user?.middleName || ''} ${getCoordinatorDetail(getDestinationLatLng(studentForm.sortedNearest))?.user?.lastName || ''}`, classes)}
                  {displayValue(t('COORDINATOREMAIL'), `${getCoordinatorDetail(getDestinationLatLng(studentForm.sortedNearest))?.user?.manabadiEmail || ''}`, classes)}
                  {displayValue(t('CONTACT_NO'), `${getCoordinatorDetail(getDestinationLatLng(studentForm.sortedNearest))?.user?.contactNumber || ''}`, classes)}
                  {displayValue(t('CLASS_TIMINGS'), `${getDestinationLatLng(studentForm.sortedNearest)?.classTiming || ''} - 
                    ${getFormatTime(getDestinationLatLng(studentForm.sortedNearest)?.startTime) || ''} to
                    ${getFormatTime(getDestinationLatLng(studentForm.sortedNearest)?.endTime) || ''}`, classes)}
                  {displayValue(t('DISTANCEFROMHOME'), `${getDestinationLatLng(studentForm.sortedNearest)?.distance || ''} miles`, classes)}
                </>
              ) : ''}
            </Grid>

          </Grid>
          <div className={classes.footerBottom} />
        </Grid>
      </form>
    </Grid>
  );
}
// function areEqual(preProps, nextProps) {
//   /*
//   return true if passing nextProps to render would return
//   the same result as passing prevProps to render,
//   otherwise return false
//   */
//   return preProps.mainFormError === nextProps.mainFormError;
// }
export default memo(AddStudent);
