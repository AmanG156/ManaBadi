import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { FindInPageOutlined } from '@material-ui/icons';
import {
  DialogAtom,
  PerformantTextField,
  PerformantDropdown,
  PerfromantMultiValueDropdown,
} from '../../../../components/atoms';
import { AntSwitch } from '../../../../utils/commonUiComponent';
import useStyles from '../../../../custom-hooks/useStyles';
import styles from './style';
import {
  getCountries,
  getGeoRegion,
  getRegionCordinators,
} from '../../../../store/actions/getRegion';
import ListOfCourses from './list-of-courses';
import MultiAutoComplete from '../add-coordinators';
import {
  getAllCourses,
} from '../../../../store/actions/getStudent';
import { addRegionService, editRegionService } from '../../../../store/services/auth';
import { GetSortOrder } from '../../../../components/atoms/tabel/utils';

export default function AddRegionDialog(props) {
  const {
    open, handleClose, selectedRegion, addRegion, loading, setLoading, viewLogs,
  } = props;

  const { t } = useTranslation();
  const classes = useStyles(styles)();
  const dispatch = useDispatch();
  const regionStore = useSelector((state) => state.getRegion);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [geoRegionOptions, setGeoRegionOptions] = useState([]);
  const [error, setError] = useState(false);
  const [enrollStatus, setEnrollStatus] = useState(selectedRegion?.enrollmentStatus || false);
  const [alreadyExistRegionError, setAreadyExistRegionError] = useState(false);
  const [status, setStatus] = useState(selectedRegion?.isActive || false);
  const reduxStudentStore = useSelector((state) => state?.getStudent);
  const assignedCourses = reduxStudentStore?.courses;
  const [courseDetails, setCourseDetails] = useState(() => selectedRegion?.region_courses?.map((rCourse) => ({
    info: rCourse?.course,
    details: {
      status: rCourse?.course?.isActive,
      values: {
        id: rCourse?.fee?.id || '',
        fee: rCourse?.fee?.fee || '0',
        examFee: rCourse?.fee?.examFee || '0',
        registrationFee: rCourse?.fee?.registrationFee || '0',
        repeatingDiscount: rCourse?.fee?.repeatingDiscount || '0',
        siblingDiscount: rCourse?.fee?.siblingDiscount || '0',
      },
      valid: true,
      errors: {},
    },
  })) || []);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getRegionCordinators());
    dispatch(getAllCourses());
  }, []);

  const handleStatusChange = (event) => {
    setStatus(event.target.checked);
  };

  const handleEnrollStatusChange = (event) => {
    setEnrollStatus(event.target.checked);
  };

  const validationSchema = Yup.object({
    regionCountry: Yup.string(t('REGION_COUNTRY_REQUIRED'))
      .required(t('REGION_COUNTRY_REQUIRED')),
    geoRegion: Yup.string(t('GEOREGION_REQUIRED'))
      .required(t('GEOREGION_REQUIRED')),
    regionName: Yup.string(t('REGION_NAME_REQUIRED'))
      .required(t('REGION_NAME_REQUIRED')),
    changeLogs: Yup.string(t('CHANGE_LOG_REQUIRED')).required(
      t('CHANGE_LOG_REQUIRED'),
    ),
  });
  const handleCourseDetails = (index, details) => {
    const tempCourseDetails = [...courseDetails];
    const fCourseIndex = courseDetails.findIndex((cDetail) => cDetail?.info?.id === details?.info?.id);
    if (fCourseIndex < 0) {
      tempCourseDetails.push(details);
    } else {
      tempCourseDetails[fCourseIndex] = details;
    }
    setCourseDetails([...tempCourseDetails]);
  };

  const getPayload = (values) => {
    const getCoordinaors = () => selectedOptions?.map((cor) => ({
      userId: cor?.id,
      isPrimary: cor?.isPrimary,
    }));

    const getCourseInfo = () => courseDetails.map((cDetail) => ({
      courseId: cDetail?.info?.id,
      isActive: cDetail?.details?.status || false,
      fee: {
        id: (cDetail?.details?.values?.id),
        fee: Number(cDetail?.details?.values?.fee),
        examFee: Number(cDetail?.details?.values?.examFee),
        registrationFee: Number(cDetail?.details?.values?.registrationFee),
        siblingDiscount: Number(cDetail?.details?.values?.siblingDiscount),
        repeatingDiscount: Number(cDetail?.details?.values?.repeatingDiscount),
      },
    }));

    return {
      name: values?.regionName,
      country: values?.regionCountry,
      geoRegion: values?.geoRegion,
      enrollmentStatus: enrollStatus,
      isActive: status,
      regionCoordinator: getCoordinaors(),
      courses: getCourseInfo(),
    };
  };

  const onAddRegion = (values, setLoader) => {
    addRegionService(getPayload(values)).then(() => {
      addRegion();
      setLoader(false);
    }).catch((err) => {
      const msgData = err?.errors?.length ? err?.errors[0] : false;

      if (!err?.status && msgData?.param === 'name') {
        setAreadyExistRegionError(msgData?.msg || false);
      }
      setLoader(false);
    });
  };
  const onEditRegion = (values, setLoader) => {
    editRegionService(selectedRegion?.id, getPayload(values)).then(() => {
      addRegion();
      setLoader(false);
    }).catch((err) => {
      if (!err?.status) {
        const msgData = err?.errors?.length ? err?.errors[0] : false;
        setAreadyExistRegionError(msgData?.msg || false);
      }
      setLoader(false);
    });
  };

  const getSelectedCourse = () => {
    const cIds = [];
    selectedRegion?.region_courses?.forEach((cId) => {
      cIds.push(cId.courseId);
    });
    return cIds;
  };

  const formik = useFormik({
    initialValues: {
      regionCountry: selectedRegion?.country || '',
      geoRegion: selectedRegion?.geoRegion || '',
      regionName: selectedRegion?.name || '',
      eligibleCourse: getSelectedCourse() || [],
      coordinators: selectedRegion?.region_coordinators?.map((i) => {
        const name = `${i?.user?.first_name} ${i?.user?.last_name}`;
        const id = i?.user?.id;
        return {
          isPrimary: i?.isPrimary,
          id,
          profilePhoto: i?.user?.profile_photo,
          firstName: i?.user?.first_name,
          middleName: i?.user?.middle_name,
          lastName: i?.user?.last_name,
          gender: i?.user?.gender,
          manabadiEmail: i?.user?.manabadi_email,
          personalEmail: i?.user?.personal_email,
          contactNumber: i?.user?.contact_number,
          name,
          value: i?.user?.id,
        };
      }) || [],
      changeLogs: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (!selectedOptions?.length) {
        return;
      }
      setLoading(true);

      if (open === 'add') onAddRegion(values, setLoading);
      if (open === 'edit') onEditRegion(values, setLoading);
    },
  });

  useEffect(() => {
    if ((formik?.isSubmitting && !selectedOptions?.length) || (formik?.touched?.changeLogs && !selectedOptions?.length)) {
      setError(t('COORDINATORS_REQUIRED'));
    }
    const isPrimary = selectedOptions?.findIndex(((obj) => obj?.isPrimary === true));
    if (formik?.isSubmitting && isPrimary < 0) {
      setError(t('PRIMARY_COORDINATORS_REQUIRED'));
    }
  }, [formik?.touched]);

  useEffect(() => {

  }, [geoRegionOptions]);
  useEffect(() => {
    if (formik?.values?.regionCountry) {
      dispatch(getGeoRegion({ country: formik?.values?.regionCountry }));
      setGeoRegionOptions(regionStore.geoRegions?.map((region) => ({
        id: region,
        name: region,
      })));
    }
    if (open === 'add') {
      formik.setFieldValue('geoRegion', '', true);
    }
  }, [formik?.values?.selectedRegion || selectedRegion]);

  const setPreviousFieldTouch = (key) => {
    const allFields = [
      'regionCountry',
      'geoRegion',
      'regionName',
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
    <span data-testid={key} className={classes.errorText}>
      {formik.errors[key]}
    </span>
  ) : errorText ? (
    <span className={classes.errorText}>{errorText}</span>
  ) : null);

  const getData = () => {
    const mapData = [];
    formik?.values?.eligibleCourse?.forEach((eligCourse) => {
      let selCourse = assignedCourses?.find((aCourse) => aCourse?.id === eligCourse);
      if (open === 'edit' && (selectedRegion?.region_courses || [])?.length) {
        const existingCourse = selectedRegion?.region_courses?.find((aCourse) => aCourse?.courseId === eligCourse);
        if (existingCourse && Object.keys(existingCourse).length) {
          selCourse = { ...existingCourse?.course, isActive: existingCourse?.isActive };
          selCourse.fee = existingCourse?.fee;
        }
      }
      mapData.push(selCourse);
    });
    mapData.sort(GetSortOrder('level'));
    return mapData;
  };

  const removeCourse = (selectedCourse) => {
    const cData = [];
    if (selectedCourse?.length) {
      selectedCourse?.forEach((sCourse) => {
        const fCourse = courseDetails.find((courseLine) => courseLine?.info?.id === sCourse);
        cData.push(fCourse);
      });
    }
    setCourseDetails(cData);
  };

  return (
    <DialogAtom
      isOpen={open}
      dialogHeading={t(open === 'add' ? 'ADD_REGION' : 'EDIT_REGION')}
      onClose={handleClose}
      dialogActions
      primaryButton={t('SAVE')}
      secButton={t('CANCEL')}
      {...{ loading }}
      content={(
        <FormikProvider value={formik}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container spacing={1}>

              <Grid item xs={12} md={6} lg={6} className={classes.alignGrid}>
                <PerformantDropdown
                  minWidth="100%"
                  label={t('REGION_COUNTRY')}
                  labelId={t('REGION_COUNTRY')}
                  id="regionCountry"
                  name="regionCountry"
                  value={formik.values.regionCountry}
                  onBlur={() => setPreviousFieldTouch('regionCountry')}
                  error={getErrorText('regionCountry')}
                  required
                  handleChange={formik.handleChange}
                  options={regionStore.countries.map((country) => ({
                    id: country,
                    name: country,
                  }))}
                />
                {getErrorText('regionCountry')}
              </Grid>

              <Grid item xs={12} md={6} lg={6} className={classes.alignGrid}>
                <PerformantDropdown
                  minWidth="100%"
                  label={t('GEO_REGION')}
                  labelId={t('GEO_REGION')}
                  id="geoRegion"
                  name="geoRegion"
                  value={formik.values.geoRegion}
                  onBlur={() => setPreviousFieldTouch('geoRegion')}
                  error={getErrorText('geoRegion')}
                  required
                  handleChange={formik.handleChange}
                  options={geoRegionOptions}
                />
                {getErrorText('geoRegion')}
              </Grid>

              <Grid item xs={12} md={12} lg={12} className={classes.alignGrid}>
                <PerformantTextField
                  placeholder={`${t('REGION_NAME')}*`}
                  id="regionName"
                  required
                  name="regionName"
                  type="text"
                  value={formik.values.regionName}
                  onBlur={() => setPreviousFieldTouch('regionName')}
                  error={alreadyExistRegionError ? getErrorText('', alreadyExistRegionError) : getErrorText('regionName')}
                  onChange={formik.handleChange}
                  labelId="regionName"
                />
              </Grid>

              <Grid item xs={12} md={6} lg={6} className={`${classes.alignGrid} ${classes.maxWidthAssign}`}>

                <PerfromantMultiValueDropdown
                  customClassSelect="changeLabelUi"
                  minWidth="100%"
                  label={t('ELIGIBLE_COURSE')}
                  labelId={t('ELIGIBLE_COURSE')}
                  id="eligibleCourse"
                  name="eligibleCourse"
                  value={formik.values.eligibleCourse}
                  onChange={(e) => {
                    if (e?.target?.value?.length < formik?.values?.eligibleCourse?.length) {
                      removeCourse(e.target.value);
                    }
                    formik.handleChange(e);
                  }}
                  onBlur={() => setPreviousFieldTouch('eligibleCourse')}
                  options={assignedCourses?.map((courses) => ({
                    id: courses?.id,
                    name: courses?.name,
                  }))}
                  error={getErrorText('eligibleCourse')}
                />
                {getErrorText('eligibleCourse')}
              </Grid>

              <Grid item xs={6} md={3} lg={3} className={classes.alignGrid} alignSelf="center">
                <Typography className={classes.switchHeading}>{t('ENROLLMENT_STATUS')}</Typography>
                <Stack className={classes.switchUi} direction="row" spacing={1} alignItems="center" justifyContent="center">
                  <Typography className={`${classes.switchText} ${!enrollStatus ? classes.inactiveText : null}`}>{t('INACTIVE_STATUS')}</Typography>
                  <AntSwitch
                    defaultChecked
                    checked={enrollStatus}
                    onChange={handleEnrollStatusChange}
                    inputProps={{ 'aria-label': 'ant design' }}
                  />
                  <Typography className={`${classes.switchText} ${enrollStatus ? classes.activeText : null}`}>{t('ACTIVE_STATUS')}</Typography>
                </Stack>
                {getErrorText('Status')}
              </Grid>
              <Grid item xs={6} md={3} lg={3} className={classes.alignGrid} alignSelf="center">
                <Typography className={classes.switchHeading}>{t('STATUS')}</Typography>
                <Stack className={classes.switchUi} direction="row" spacing={1} alignItems="center" justifyContent="center">
                  <Typography className={`${classes.switchText} ${!status ? classes.inactiveText : null}`}>{t('INACTIVE_STATUS')}</Typography>
                  <AntSwitch
                    defaultChecked
                    checked={status}
                    onChange={handleStatusChange}
                    inputProps={{ 'aria-label': 'ant design' }}
                  />
                  <Typography className={`${classes.switchText} ${status ? classes.activeText : null}`}>{t('ACTIVE_STATUS')}</Typography>
                </Stack>
                {getErrorText('Status')}
              </Grid>

              <Grid item xs={12} md={12} lg={12} className={classes.alignGrid}>
                <div className={classes.coordinatorHeading}>
                  Coordinators
                  <em>*</em>
                </div>
                <MultiAutoComplete
                  {... {
                    setError,
                    setSelectedOptions,
                    selectedOptions,
                    t,
                  }}
                  name="coordinators"
                  id="coordinators"
                  data={formik.values.coordinators}
                  label="coordinators"
                />
                {getErrorText('', error)}
              </Grid>
              <ListOfCourses
                data={getData()}
                updateCourseDetails={handleCourseDetails}
              />
              <Grid item xs={12} md={12} lg={12} className={classes.alignGrid}>
                <PerformantTextField
                  placeholder={`${t('CHANGE_LOG')}`}
                  id="changeLogs"
                  required
                  name="changeLogs"
                  type="text"
                  value={formik.values.changeLogs}
                  onBlur={() => setPreviousFieldTouch('changeLogs')}
                  error={getErrorText('changeLogs')}
                  onChange={formik.handleChange}
                  labelId="changeLogs"
                />
              </Grid>
              <Grid
                item
                xs={5}
                className={classes.viewLogs}
              >
                <FindInPageOutlined style={{ height: 16 }} />
                <div onClick={() => viewLogs(handleClose)}>{t('VIEW_LOGS')}</div>
              </Grid>
            </Grid>

          </Grid>
        </FormikProvider>
      )}
      primaryHandle={formik.handleSubmit}
      secHandle={handleClose}
    />
  );
}
