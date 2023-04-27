import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import { CSVLink } from 'react-csv';
import * as Yup from 'yup';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { isValidPhoneNumber } from 'react-phone-number-input';
import ButtonAtom from '../../../components/atoms/button';
import { useStyles } from './style';
import { Buttons } from '../../../constant';
import CheckboxAtom from '../../../components/atoms/checkbox/index';
import LocationManagerTable from './location-manager-table';
import { DialogAtom } from '../../../components/atoms';
import AddEditLocation from './add/index';
import { getAllCourses } from '../../../store/actions/getStudent';
import {
  createLocation, getAllExamCenters,
  getAllLocationCoordinators, getAllLocations, updateLocation,
} from '../../../store/actions/getLocations';
import { getRegions } from '../../../store/actions/getRegion';
import TextFieldAtom from '../../../components/atoms/textfield';
import LocationExportDialog from './export';

export default function LocationManager() {
  const { t } = useTranslation();
  const classes = useStyles();
  const [dataForDownload] = useState([]);
  const [bDownloadReady, setDownloadReady] = useState(false);
  const csvLink = useRef();
  const [isDeactivateChecked, setStatus] = useState(false);
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const reduxStore = useSelector((state) => state.getStudent);
  const locationStore = useSelector((state) => state.getLocations);
  const regionState = useSelector((state) => state.getRegion);
  const [dialogHeader, setDialogHeader] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [locationAddressInfo, setLocationAddressInfo] = useState('');
  const [shippingAddressInfo, setShippingAddressInfo] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [locationAddressId, setLocationAddressId] = useState('');
  const [shippingAddressId, setShippingAddressId] = useState('');
  const dispatch = useDispatch();
  const [showExportDialog, setExportDialog] = useState(false);

  const refreshList = () => {
    dispatch(getAllLocations());
  };

  useEffect(() => {
    if (csvLink && csvLink.current && bDownloadReady) {
      csvLink.current.link.click();
      setDownloadReady(false);
    }
  }, [bDownloadReady]);

  const getLocationTableData = () => {
    let tableData = locationStore?.locations?.map((location) => {
      const coOrd = (location?.location_coordinators || []).find((coordinator) => coordinator.isPrimary === true);
      const activeCoursesObj = (location?.location_courses || []).find((activecourses) => activecourses.isActive === true);
      return {
        name: location.name,
        locationCoordinator: `${coOrd?.user?.first_name} ${coOrd?.user?.last_name}`,
        city: location?.locationAddress?.city,
        address: location?.locationAddress?.address,
        locationAddressAptSuite: location?.locationAddress?.aptSuite,
        shippingAddress: location?.shippingAddress?.address,
        shippingAddressAptSuite: location?.shippingAddress?.aptSuite,
        isActive: location?.isActive,
        examCenter: location?.exam_center?.id,
        isActiveExamCenter: location?.exam_center?.isActive,
        classTiming: location?.classTiming,
        startTime: location?.startTime,
        endTime: location?.endTime,
        region: location?.region?.id,
        coordinator: location?.location_coordinators,
        contactNumber: coOrd?.user?.contact_number,
        activeCourses: activeCoursesObj?.courseId,
        id: location?.id,
        addressId: location?.locationAddress?.id,
        shippingAddressId: location?.shippingAddress?.id,
      };
    });
    if (isDeactivateChecked) {
      tableData = tableData?.filter((rowData) => rowData.isActive === false);
    }
    return tableData;
  };

  const handleEdit = () => {

  };

  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getAllExamCenters());
    dispatch(getAllLocationCoordinators());
    dispatch(getRegions());
    dispatch(getAllLocations());
  }, []);

  const formik = useFormik({
    initialValues: {
      locationName: '',
      status: '',
      locationAddress: '',
      locationAddressAptSuite: '',
      shippingAddress: '',
      shippingAddressAptSuite: '',
      examCenter: '',
      region: '',
      coOrdinator: [],
      contactNumber: '',
      activeCourses: '',
      changeLog: '',
      day: '',
      startTime: '',
      endTime: '',
    },
    validationSchema:
      Yup.object({
        locationName: Yup.string(t('LOCATION_NAME_REQUIRED'))
          .required(t('LOCATION_NAME_REQUIRED'))
          .typeError(t('LOCATION_NAME_REQUIRED')),
        locationAddress: Yup.string(t('LOCATION_ADDRESS_REQUIRED'))
          .required(t('LOCATION_ADDRESS_REQUIRED'))
          .typeError(t('LOCATION_ADDRESS_REQUIRED')),
        shippingAddress: Yup.string(t('SHIPPING_ADDRESS_REQUIRED'))
          .required(t('SHIPPING_ADDRESS_REQUIRED'))
          .typeError(t('SHIPPING_ADDRESS_REQUIRED')),
        examCenter: Yup.string(t('EXAM_CENTER_REQUIRED'))
          .required(t('EXAM_CENTER_REQUIRED')).typeError(t('EXAM_CENTER_REQUIRED')),
        region: Yup.string(t('REGION_REQUIRED'))
          .required(t('REGION_REQUIRED')).typeError(t('REGION_REQUIRED')),
        coOrdinator: Yup.array()
          .min(1, t('COORDINATORS_REQUIRED'))
          .required(t('COORDINATORS_REQUIRED')).typeError(t('COORDINATORS_REQUIRED')),
        contactNumber: Yup.string(t('CONTACTNO_REQUIRED'))
          .required(t('CONTACTNO_REQUIRED'))
          .test('isValidPhoneNumber', t('INVALID_PHONE'), (value) => (value ? isValidPhoneNumber(value) : false)),
        classTiming: Yup.string(t('DAY_REQUIRED'))
          .required(t('DAY_REQUIRED')).typeError(t('DAY_REQUIRED')),
        startTime: Yup.string(t('START_TIME_REQUIRED'))
          .required(t('START_TIME_REQUIRED')).typeError(t('START_TIME_REQUIRED')),
        endTime: Yup.string(t('END_TIME_REQUIRED'))
          .required(t('END_TIME_REQUIRED')).typeError(t('END_TIME_REQUIRED')),
        activeCourses: Yup.array()
          .min(1, t('ACTIVE_COURSES_REQUIRED'))
          .required(t('ACTIVE_COURSES_REQUIRED')),
      }),
    onSubmit: (values) => {
      const payload = {
        location: {
          name: values?.locationName,
          isActive: values?.isActive,
          defaultCenter: false,
          examCenterStatus: values?.isActiveExamCenter,
          startTime: moment(values?.startTime).format('HH:mm:ss'),
          endTime: moment(values?.endTime).format('HH:mm:ss'),
          classTiming: values?.classTiming,
          examCenterId: values?.examCenter,
          regionId: values?.region,
        },
        locationAddress: {
          address: values?.locationAddress,
          aptSuite: values?.locationAddressAptSuite,
          latitude: locationAddressInfo?.lat,
          longitude: locationAddressInfo?.lng,
        },
        shippingAddress: {
          address: values?.shippingAddress,
          aptSuite: values?.shippingAddressAptSuite,
          latitude: shippingAddressInfo?.lat,
          longitude: shippingAddressInfo?.lng,
        },
        courseIds: values?.activeCourses,
        coordinators: values?.coOrdinator?.map((obj) => ({
          id: obj?.id,
          isPrimary: obj?.isPrimary,
        })),
      };
      if (isEdit) {
        payload.location.id = selectedRow?.[0]?.id;
        payload.locationAddress.id = locationAddressId;
        payload.shippingAddress.id = shippingAddressId;
        dispatch(updateLocation(payload, refreshList));
        setShowLocationDialog(!showLocationDialog);
      } else {
        dispatch(createLocation(payload, refreshList));
        setShowLocationDialog(!showLocationDialog);
      }
    },
  });

  useEffect(() => {
    formik.setTouched({}, false);
    formik.values.coOrdinator = [];
    formik.values.activeCourses = [];
    if (selectedRow !== undefined) {
      const row = selectedRow?.[0];
      formik.values.locationName = row?.name;
      formik.values.locationAddress = row?.address;
      formik.values.locationAddressAptSuite = row?.locationAddressAptSuite;
      formik.values.shippingAddress = row?.shippingAddress;
      formik.values.shippingAddressAptSuite = row?.shippingAddressAptSuite;
      formik.values.isActive = row?.isActive;
      formik.values.isActiveExamCenter = row?.isActiveExamCenter;
      formik.values.classTiming = row?.classTiming;
      formik.values.startTime = moment(row?.startTime, 'HH:mm:ss');
      formik.values.endTime = moment(row?.endTime, 'HH:mm:ss');
      formik.values.examCenter = row?.examCenter;
      formik.values.region = row?.region;
      row?.coordinator?.forEach((obj) => {
        formik.values.coOrdinator.push({
          ...obj?.user,
          firstName: obj?.user?.first_name,
          lastName: obj?.user?.last_name,
          manabadiEmail: obj?.user?.manabadi_email,
          isPrimary: obj.isPrimary,
        });
      });
      row?.activeCourses?.forEach((obj) => {
        formik.values.activeCourses.push(obj?.courseId);
      });
      formik.values.contactNumber = row?.contactNumber;
      setLocationAddressId(row?.addressId);
      setShippingAddressId(row?.shippingAddressId);
    }
  }, [selectedRow]);

  // eslint-disable-next-line no-nested-ternary
  const getErrorText = (key, errorText) => (formik.touched[key] && formik.errors[key] ? (
    <span data-testid={key} className={classes.errorText}>
      {formik.errors[key]}
    </span>
  ) : errorText ? (
    <span className={classes.errorText}>{errorText}</span>
  ) : null);

  return (
    <>
      <Grid className={classes.locationRoot}>
        <Grid container item className={classes.titleRow}>
          <Grid item>
            <Typography className={classes.headerTitle}>
              {t('LOCATION_MANAGER')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextFieldAtom
              id="locationSearch"
              customFormControlCss={{ margin: '0.8vw 0' }}
              name="locationSearch"
              type="text"
              minWidth="80%"
              placeholder={t('SEARCH')}
              disabled={false}
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
          </Grid>
        </Grid>
        <Grid className={classes.dFlex}>
          <div>
            <ButtonAtom
              className={classes.addbutton}
              name={t('EXPORT_TO_CSV')}
              btntype={Buttons.PRIMARY}
              type={Buttons.PRIMARY}
              onClick={() => setExportDialog(true)}
            />
            <CSVLink
              data={dataForDownload}
              filename="location-list.csv"
              className="hidden"
              ref={csvLink}
              target="_blank"
            />
          </div>
          <ButtonAtom
            className={classes.addbutton}
            name={t('ADD')}
            btntype={Buttons.PRIMARY}
            type={Buttons.PRIMARY}
            onClick={() => {
              formik.setTouched({}, false);
              setSelectedRow([]);
              setDialogHeader(t('ADD_LOCATION'));
              setIsEdit(false);
              formik.values = formik.initialValues;
              setShowLocationDialog(!showLocationDialog);
            }}
            icon={<AddIcon className={classes.addIconSize} />}
          />
        </Grid>
        {/* <Grid container item justifyContent="end">
        </Grid> */}
        <div className={classes.deactiveCheckbox}>
          <CheckboxAtom
            label={t('VIEW_INACTIVE')}
            id="acceptCheckbox"
            handleChange={() => {
              setStatus(!isDeactivateChecked);
            }}
            checked={isDeactivateChecked}
          />
        </div>
        <Grid className={classes.locationManagerContainer}>
          <LocationManagerTable
            handleEdit={handleEdit}
            openEditLocation={setShowLocationDialog}
            setSelectedRow={setSelectedRow}
            setDialogHeader={setDialogHeader}
            setIsEdit={setIsEdit}
            searchValue={searchValue}
            locationStore={locationStore}
            deactivatedStatus={isDeactivateChecked}
            tableData={getLocationTableData()}
          />
        </Grid>
        <LocationExportDialog
          show={showExportDialog}
          setShow={() => setExportDialog(false)}
          data={getLocationTableData()}
        />
      </Grid>
      <DialogAtom
        isOpen={showLocationDialog}
        dialogHeading={dialogHeader}
        customClass={classes.addCourseDialogAtom}
        content={(
          <AddEditLocation
            setShowLocationDialog={setShowLocationDialog}
            showLocationDialog={showLocationDialog}
            selectedRow={selectedRow}
            getErrorText={getErrorText}
            formik={formik}
            state={reduxStore}
            locationState={locationStore}
            regionState={regionState}
            setLocationAddressInfo={setLocationAddressInfo}
            setShippingAddressInfo={setShippingAddressInfo}
          />
        )}
        secHandle={() => setShowLocationDialog(false)}
      />
    </>
  );
}
