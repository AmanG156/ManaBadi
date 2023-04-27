/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FormikProvider } from 'formik';
import { isValidPhoneNumber } from 'react-phone-number-input';
import TimePickerAtom from '../../../../components/atoms/timePicker';
import ButtonAtom from '../../../../components/atoms/button';
import { Buttons } from '../../../../constant';
import { AntSwitch } from '../../user-manager/helperComponent';
import style from './style';
import {
  PerformantTextField,
  PerformantDropdown,
  PerfromantMultiValueDropdown,
  AddressAutoComplete,
  MultiAutoComplete,
  PhoneInput,
} from '../../../../components/atoms';
import { getWeekDays } from '../helper';
import { getPlaceInformation } from '../../../../utils/mapMethod';

function AddEditLocation({
  formik, setShowLocationDialog, showLocationDialog,
  getErrorText, state, locationState, regionState, setLocationAddressInfo, setShippingAddressInfo,
}) {
  const { t } = useTranslation();
  const classes = style();
  const activeCourses = state.courses;
  const activeExamCenters = locationState.examCenters;
  const [userDefaultCountry, setUserDefaultCountry] = useState('US');
  const activeLocationCoordinators = locationState.locationCoordinators?.map((loc) => ({
    ...loc,
    firstName: loc.first_name,
    lastName: loc.last_name,
    manabadiEmail: loc.manabadi_email,
    id: loc?.id,
  }));
  const activeRegions = regionState.regions?.map((region) => ({
    id: region.id,
    name: region.name,
  }));
  const onSelection = (event, val) => {
    formik.setFieldValue('coOrdinator', val);
  };
  const handleCheck = (opt, ischecked) => {
    opt.isPrimary = ischecked;
  };

  const [locationActive, setLocationActive] = useState(false);
  const [examCenterActive, setExamCenterActive] = useState(false);
  const handleActiveStatus = () => {
    formik.values.isActive = locationActive;
  };
  const handleExamCenterStatus = () => {
    formik.values.isActiveExamCenter = examCenterActive;
  };
  const phoneInput = (
    label,
    id,
    handleChange,
    onBlur,
    onCountryChange,
    defaultCountry,
    value,
    error,
    customClass,
    required = true,
  ) => (
    <PhoneInput
      label={label}
      id={id}
      required={required}
      name={id}
      value={value}
      onBlur={onBlur}
      onCountryChange={onCountryChange}
      defaultCountry={defaultCountry}
      error={error && Object.keys(error).length}
      onChange={(e) => {
        handleChange(e);
      }}
      customClass="inputStyle"
    />
  );
  const handleCellphone = (phone) => {
    formik.setFieldValue('contactNumber', phone || '');
  };
  const handleUserDefaultCountry = (value) => {
    setUserDefaultCountry(value);
  };
  function showPhoneError(touched, values, flag) {
    if (touched && !values) {
      return getErrorText(flag);
    } if (values && isValidPhoneNumber(values)) {
      return true;
    } if (touched) {
      return getErrorText(null, t('INVALID_PHONE'));
    }
    return true;
  }
  const locationAddressBlur = (e) => {
    formik.handleBlur(e);
    formik.setTouched({ ...formik.touched, locationAddress: true }, true);
  };
  const shippingAddressBlur = (e) => {
    formik.handleBlur(e);
    formik.setTouched({ ...formik.touched, shippingAddress: true }, true);
  };

  const startTimeBlur = (e) => {
    formik.handleBlur(e);
    formik.setTouched({ ...formik.touched, startTime: true }, true);
  };

  const endTimeBlur = (e) => {
    formik.handleBlur(e);
    formik.setTouched({ ...formik.touched, endTime: true }, true);
  };

  const coOrdinatorBlur = (e) => {
    formik.handleBlur(e);
    formik.setTouched({ ...formik.touched, coOrdinator: true }, true);
  };

  return (
    <Box className={classes.gridContainer}>
      <FormikProvider value={formik}>
        <Grid container spacing={3} justifyContent="flex-end">
          <Grid item xs={6}>
            <PerformantTextField
              label={t('LOCATION_NAME')}
              id="locationName"
              required
              name="locationName"
              type="text"
              disabled={false}
              value={formik.values.locationName}
              onBlur={formik.handleBlur}
              error={getErrorText('locationName')}
              onChange={formik.handleChange}
              labelId="locationName"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.switchHeading}>{t('STATUS')}</Typography>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
              <Typography className={classes.switchText}>{t('INACTIVE_STATUS')}</Typography>
              <AntSwitch
                defaultChecked
                checked={formik.values.isActive}
                onChange={() => {
                  setLocationActive(!locationActive);
                  handleActiveStatus();
                }}
                inputProps={{ 'aria-label': 'ant design' }}
              />
              <Typography className={classes.switchText}>{t('ACTIVE_STATUS')}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <AddressAutoComplete
              label={`${t('LOCATION_ADDRESS')} *`}
              id="locationAddress"
              required
              name="locationAddress"
              value={formik.values.locationAddress}
              error={getErrorText('locationAddress')}
              onPlaceSelected={async (e) => {
                const res = await getPlaceInformation(e.formatted_address);
                formik.setFieldValue(
                  'locationAddress',
                  e.formatted_address,
                  true,
                );
                setLocationAddressInfo({ ...res, add: e.formatted_address });
                // setPreviousFieldTouch('address');
              }}
              onChange={(e) => {
                formik.setFieldValue('locationAddress', e.target.value);
              }}
              onBlur={locationAddressBlur}
              customClass="addressStyle"
            />
            <span className={classes.errorText}>{getErrorText('locationAddress')}</span>
          </Grid>
          <Grid item xs={6}>
            <PerformantTextField
              label={t('APISUITE')}
              id="locationAddressAptSuite"
              name="locationAddressAptSuite"
              type="text"
              disabled={false}
              value={formik.values.locationAddressAptSuite}
              onBlur={formik.handleBlur}
              error={getErrorText('locationAddressAptSuite')}
              onChange={formik.handleChange}
              labelId="locationAddressAptSuite"
            />
          </Grid>
          <Grid item xs={6}>
            <AddressAutoComplete
              label={`${t('SHIPPING_ADDRESS')} *`}
              id="shippingAddress"
              required
              name="shippingAddress"
              value={formik.values.shippingAddress}
              error={getErrorText('shippingAddress')}
              onPlaceSelected={async (e) => {
                const res = await getPlaceInformation(e.formatted_address);
                formik.setFieldValue(
                  'shippingAddress',
                  e.formatted_address,
                  true,
                );
                setShippingAddressInfo({ ...res, add: e.formatted_address });
                // setPreviousFieldTouch('address');
              }}
              onChange={formik.handleChange}
              onBlur={shippingAddressBlur}
              customClass="addressStyle"
            />
            <span className={classes.errorText}>{getErrorText('shippingAddress')}</span>
          </Grid>
          <Grid item xs={6}>
            <PerformantTextField
              label={t('APISUITE')}
              id="shippingAddressAptSuite"
              name="shippingAddressAptSuite"
              type="text"
              disabled={false}
              value={formik.values.shippingAddressAptSuite}
              onBlur={formik.handleBlur}
              error={getErrorText('shippingAddressAptSuite')}
              onChange={formik.handleChange}
              labelId="shippingAddressAptSuite"
            />
          </Grid>
          <Grid item xs={6} className={classes.dropDownSelect}>
            <PerformantDropdown
              label={t('EXAM_CENTER')}
              id="examCenter"
              maxWidth="50%"
              customSelectClass={classes.select}
              shrink
              name="examCenter"
              type="text"
              disabled={false}
              value={formik.values.examCenter}
              onBlur={formik.handleBlur}
              error={getErrorText('examCenter')}
              onChange={formik.handleChange}
              labelId="examCenter"
              options={activeExamCenters}
            />
            <span className={classes.errorText}>{getErrorText('examCenter')}</span>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.switchHeading}>{t('EXAM_CENTER')}</Typography>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
              <Typography className={classes.switchText}>{t('DEACTIVATE')}</Typography>
              <AntSwitch
                defaultChecked
                checked={formik.values.isActiveExamCenter}
                onChange={() => {
                  setExamCenterActive(!examCenterActive);
                  handleExamCenterStatus();
                }}
                inputProps={{ 'aria-label': 'ant design' }}
              />
              <Typography className={classes.switchText}>{t('ACTIVATE')}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} className={classes.dropDownSelect}>
            <PerformantDropdown
              label={t('REGION')}
              id="region"
              minWidth="50%"
              customSelectClass={classes.select}
              name="region"
              shrink
              type="text"
              required
              disabled={false}
              value={formik.values.region}
              onBlur={formik.handleBlur}
              error={getErrorText('region')}
              onChange={formik.handleChange}
              labelId="region"
              options={activeRegions}
            />
            <span className={classes.errorText}>{getErrorText('region')}</span>
          </Grid>
          <Grid item xs={12} className={classes.dropDownSelect}>
            <MultiAutoComplete
              required
              lable={t('CO_ORDINATORS')}
              options={activeLocationCoordinators || []}
              placeholders="Coordinators*"
              // placeholder="search Coordinators"
              id="coOrdinator"
              name="coOrdinator"
              error={getErrorText('coOrdinator')}
              onChange={onSelection}
              value={formik.values.coOrdinator}
              handleCheck={handleCheck}
              onBlur={coOrdinatorBlur}
            />
            <span className={classes.errorText}>{getErrorText('coOrdinator')}</span>
          </Grid>
          <Grid item xs={6} className={classes.phoneInput}>
            {phoneInput(
              `${t('CONTACT_NUMBER')} *`,
              'contactNumber',
              handleCellphone,
              formik.handleBlur,
              handleUserDefaultCountry,
              userDefaultCountry,
              formik?.values?.contactNumber,
              getErrorText('contactNumber')
              || (formik?.touched?.contactNumber
                && formik?.values?.contactNumber
                && !isValidPhoneNumber(formik?.values?.contactNumber)
                && getErrorText(null, t('INVALID_PHONE'))),
            )}
            {showPhoneError(formik?.touched?.contactNumber, formik?.values.contactNumber, 'contactNumber')}
          </Grid>
          <Grid item xs={6}>
            <PerformantDropdown
              label={t('DAY')}
              id="classTiming"
              minWidth="50%"
              customSelectClass={classes.select}
              name="classTiming"
              shrink
              type="text"
              required
              disabled={false}
              value={formik.values.classTiming}
              onBlur={formik.handleBlur}
              error={getErrorText('classTiming')}
              onChange={formik.handleChange}
              labelId="classTiming"
              options={getWeekDays()}
            />
            <span className={classes.errorText}>{getErrorText('classTiming')}</span>
          </Grid>
          <Grid item xs={6} className={classes.timePicker}>
            <TimePickerAtom
              wrapperClassName={classes.datePicker}
              label={`${t('START_TIME')}*`}
              minWidth="100%"
              id="startTime"
              name="startTime"
              value={formik.values.startTime}
              type="date"
              error={getErrorText('startTime')}
              onBlur={startTimeBlur}
              onChange={(e) => formik.setFieldValue('startTime', e)}
            />
            <span className={classes.errorText}>{getErrorText('startTime')}</span>
          </Grid>
          <Grid item xs={6} className={classes.timePicker}>
            <TimePickerAtom
              wrapperClassName={classes.datePicker}
              label={`${t('END_TIME')}*`}
              minWidth="100%"
              id="endTime"
              name="endTime"
              value={formik.values.endTime}
              type="date"
              error={getErrorText('endTime')}
              onBlur={endTimeBlur}
              onChange={(e) => formik.setFieldValue('endTime', e)}
            />
            <span className={classes.errorText}>{getErrorText('endTime')}</span>
          </Grid>
          <Grid item xs={12}>
            <PerfromantMultiValueDropdown
              label={t('ACTIVE_COURSES')}
              id="activeCourses"
              minWidth="50%"
              customSelectClass={classes.select}
              name="activeCourses"
              shrink
              type="text"
              required
              disabled={false}
              value={formik.values.activeCourses}
              onBlur={formik.handleBlur}
              error={getErrorText('activeCourses')}
              onChange={formik.handleChange}
              labelId="activeCourses"
              options={activeCourses}
            />
            <span className={classes.errorText}>{getErrorText('activeCourses')}</span>
          </Grid>
          <Grid container justifyContent="flex-end" item xs={12}>
            <Grid xs={3}>
              <ButtonAtom
                xs={3}
                name={t('CANCEL')}
                onClick={() => setShowLocationDialog(!showLocationDialog)}
                btntype={Buttons.SECONDARY}
                className={classes.inViewLogButton}
              />
            </Grid>
            <Grid xs={3}>
              <ButtonAtom
                xs={3}
                name={t('SAVE')}
                onClick={() => formik.handleSubmit()}
                btntype={Buttons.PRIMARY}
                className={classes.inViewLogButton}
              />
            </Grid>
          </Grid>
        </Grid>
      </FormikProvider>
    </Box>

  );
}
export default AddEditLocation;
