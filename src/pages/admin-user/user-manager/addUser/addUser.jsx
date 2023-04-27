import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { Box, Grid, Stack } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import { Buttons } from '../../../../constant';
import useStyles from '../../../../custom-hooks/useStyles';
import styles from './style';
import profilePic from '../../../../assets/images/profileUpload.png';
import { getPlaceInformation } from '../../../../utils/mapMethod';
import { AntSwitch, getList } from '../helperComponent';
import {
  genderOptions,
} from './constants';
import ButtonAtom from '../../../../components/atoms/button';
import {
  Dropdown,
  AddressAutoComplete,
  PerformantTextField,
  Loader, PhoneInput, ImageUpload, PerfromantMultiValueDropdown,
} from '../../../../components/atoms';
import {
  getUsers,
  addUser,
} from '../../../../store/actions/getUser';
import useUser from '../../../../custom-hooks/useUser';

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

export default function AddUser({
  setDialogOpen,
  userInfo,
  setUserInfo,
  setUserState,
  setFormikControl,
}) {
  const { t } = useTranslation();
  const selectedUserData = useUser();
  const roleOptions = selectedUserData?.userRoles;
  const [isUserStatus, setUserStatus] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles(styles)();
  const [emailExistError, setEmailExistError] = useState('');
  const [userDefaultCountry, setUserDefaultCountry] = useState(
    userInfo?.userDefaultCountry || 'US',
  );
  const [addressInfo, setAddressInfo] = useState(
    userInfo?.address || {},
  );
  const validationSchema = Yup.object({
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
    email: Yup.string(t('EMAIL_REQUIRED'))
      .email(t('EMAIL_INVALID'))
      .required(t('EMAIL_REQUIRED')),
    contactNo: Yup.string(t('CONTACTNO_REQUIRED'))
      .required(t('CONTACTNO_REQUIRED'))
      .test('isValidPhoneNumber', t('INVALID_PHONE'), (value) => (value ? isValidPhoneNumber(value) : false)),
    gender: Yup.string(t('GENDER_REQUIRED')).required(t('GENDER_REQUIRED')),
    roleType: Yup.array()
      .min(1, t('ROLETYPE_REQUIRED'))
      .required(t('ROLETYPE_REQUIRED')),
    address: Yup.string(t('ADDRESS_REQUIRED'))
      .required(t('ADDRESS_REQUIRED'))
      .test('isValidAddress', t('INVALID_ADDRESS'), (value) => (value ? value === addressInfo?.add : false)),
  });

  const formikData = userInfo;
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      manabadiEmail: '',
      contactNo: '',
      userStatus: isUserStatus,
      profileImage: formikData?.profileImage,
      changeLogs: '',
      roleType: [],
      address: '',
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      const selectedRoleOptions = [];
      values?.roleType?.forEach((selectedVal) => {
        const selectedRole = roleOptions.find((ro) => ro.id === selectedVal);
        selectedRoleOptions.push(selectedRole.id);
      });
      const payload = {
        userDetails: {
          firstName: values.firstName,
          middleName: '',
          lastName: values.lastName,
          gender: values.gender,
          isActive: isUserStatus,
          contactNumber: values.contactNo,
          personalEmail: values.email,
          image: values.profileImage,
        },
        addressDetails: {
          address: values?.address,
          latitude: addressInfo?.lat,
          longitude: addressInfo?.lng,
        },
        roleArray: selectedRoleOptions,
      };
      if (formik?.values?.profileImage === payload.image) {
        payload.image = '';
      }
      const refreshList = () => {
        const loadRefreshData = () => {
          setLoading(false);
        };
        dispatch(getUsers(loadRefreshData, setUserState));
      };
      dispatch(
        addUser(payload, refreshList, setLoading),
      ).then(() => {
        setDialogOpen(false);
      }).catch((err) => {
        setEmailExistError(err.errors[0].msg);
      });
    },
  });
  useEffect(() => {
    const {
      firstName,
      lastName,
      gender,
      manabadiEmail,
      email,
      contactNo,
      userStatus,
      profileImage,
      changeLogs,
      roleType,
      address,
    } = formik.values;

    const info = {
      userId: userInfo?.userId,
      firstName,
      lastName,
      gender,
      manabadiEmail,
      email,
      contactNo,
      userStatus,
      profileImage,
      changeLogs,
      roleType,
      userName: `${firstName} ${lastName}`,
      addressInfo: address,
      userDefaultCountry,
    };
    if (Object.keys(formik.touched).length > 0) {
      setUserInfo(info);
    }
  }, [
    formik?.errors,
    formik?.values,
    formik?.touched,
    userDefaultCountry,
  ]);
  useEffect(() => {
    if (setFormikControl) {
      setFormikControl(formik);
    }
  }, [formik?.errors]);

  // eslint-disable-next-line no-nested-ternary
  const getErrorText = (key, errorText) => (formik.touched[key] && formik.errors[key] ? (
    <span data-testid={key} className={classes.errorText}>
      {formik.errors[key]}
    </span>
  ) : errorText ? (
    <span className={classes.errorText}>{errorText}</span>
  ) : null);

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

  const handleStatusChange = (event) => {
    setUserStatus(event.target.checked);
  };

  const handleCellphone = (phone) => {
    formik.setFieldValue('contactNo', phone || '');
  };

  const setPreviousFieldTouch = (key) => {
    const allFields = [
      'profileImage',
      'firstName',
      'lastName',
      'manabadiEmail',
      'email',
      'contactNo',
      'gender',
      'userStatus',
      'address',
      'roleType',
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

  useEffect(() => {
    formik.validateField('address');
  }, [addressInfo]);

  return (
    <Box className={classes.gridContainer}>
      <Grid container className={classes.mainContainer}>
        <FormikProvider value={formik}>
          <form
            name="user-info"
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2} flexDirection="row">
              <Grid item xs={12} sm={12} md={5} lg={5} className={classes.imageAlign}>
                <ImageUpload
                  id="profileImage"
                  name="profileImage"
                  isEditForm
                  imageUploaded={profilePic}
                  setImageUpload={(e) => formik.handleChange(e)}
                />
                {getErrorText('profileImage')}
                {getList(classes.list, t)}
              </Grid>
              <Grid item xs={12} sm={12} md={7} lg={7}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6} lg={6} className={classes.alignGrid}>
                    <PerformantTextField
                      label={`${t('FIRST_NAME')}`}
                      id="firstName"
                      required
                      name="firstName"
                      type="text"
                      disabled={false}
                      value={formik.values.firstName}
                      onBlur={() => setPreviousFieldTouch('firstName')}
                      error={getErrorText('firstName')}
                      onChange={formik.handleChange}
                      labelId="firstName"
                      customClass="customInput"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} className={classes.alignGrid}>
                    <PerformantTextField
                      label={`${t('LAST_NAME')} `}
                      disabled={false}
                      id="lastName"
                      required
                      name="lastName"
                      type="text"
                      value={formik.values.lastName}
                      onBlur={() => setPreviousFieldTouch('lastName')}
                      error={getErrorText('lastName')}
                      onChange={formik.handleChange}
                      labelId="lastName"
                      customClass="customInput"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} className={classes.alignGrid}>
                    <PerformantTextField
                      disabled={false}
                      label={`${t('EMAIL')}`}
                      id="email"
                      required
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onBlur={() => setPreviousFieldTouch('email')}
                      onChange={formik.handleChange}
                      labelId="email"
                      error={getErrorText('email')}
                      allowSpecialCharacter
                      customClass="customInput"
                    />
                    <span className={classes.errorText}>{emailExistError}</span>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} className={classes.alignGrid}>
                    {phoneInput(
                      `${t('CONTACT_NUMBER')} *`,
                      'contactNo',
                      handleCellphone,
                      () => setPreviousFieldTouch('contactNo'),
                      handleUserDefaultCountry,
                      userDefaultCountry,
                      formik?.values?.contactNo,
                      getErrorText('contactNo')
                      || (formik?.touched?.contactNo
                        && formik?.values?.contactNo
                        && !isValidPhoneNumber(formik?.values?.contactNo)
                        && getErrorText(null, t('INVALID_PHONE'))),
                    )}
                    {showPhoneError(formik?.touched?.contactNo, formik?.values.contactNo, 'contactNo')}
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} className={classes.alignGrid}>
                    <Dropdown
                      minWidth="100%"
                      label={`${t('GENDER')}`}
                      id="gender"
                      name="gender"
                      value={formik.values.gender}
                      onBlur={() => setPreviousFieldTouch('gender')}
                      error={getErrorText('gender')}
                      handleChange={formik.handleChange}
                      options={genderOptions}
                      required
                      labelId="gender"
                      customClass="selectStyle"
                    />
                    {getErrorText('gender')}
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} className={classes.alignGrid} alignSelf="center">
                    <Typography className={classes.switchHeading}>{t('STATUS')}</Typography>
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                      <Typography className={classes.switchText}>{t('INACTIVE_STATUS')}</Typography>
                      <AntSwitch
                        defaultChecked
                        checked={isUserStatus}
                        onChange={handleStatusChange}
                        inputProps={{ 'aria-label': 'ant design' }}
                      />
                      <Typography className={classes.switchText}>{t('ACTIVE_STATUS')}</Typography>
                    </Stack>
                    {getErrorText('Status')}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={classes.alignGrid}
                  >
                    <AddressAutoComplete
                      label={`${t('ADDRESS')} *`}
                      id="address"
                      required
                      name="address"
                      value={formik.values.address}
                      error={getErrorText('address')}
                      onPlaceSelected={async (e) => {
                        const res = await getPlaceInformation(e.formatted_address);
                        formik.setFieldValue(
                          'address',
                          e.formatted_address,
                          true,
                        );
                        setAddressInfo({ ...res, add: e.formatted_address });
                        setPreviousFieldTouch('address');
                      }}
                      onChange={(e) => {
                        formik.setFieldValue('address', e.target.value);
                      }}
                      onBlur={() => setPreviousFieldTouch('address')}
                      customClass="addressStyle"
                    />
                    {getErrorText('address')}
                  </Grid>
                  <Grid item xs={12} md={12} lg={12} className={classes.alignGrid}>
                    <PerfromantMultiValueDropdown
                      minWidth="100%"
                      label={`${t('ROLE_TYPE')}`}
                      id="roleType"
                      name="roleType"
                      value={formik.values.roleType}
                      onBlur={() => setPreviousFieldTouch('roleType')}
                      error={getErrorText('roleType')}
                      handleChange={formik.handleChange}
                      options={roleOptions}
                      required
                      labelId="roleType"
                      customClassSelect="changeLabelUi"
                    />
                    {getErrorText('roleType')}
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Grid container>
                      <Grid item xs={12} justifyContent="flex-end" display="flex">
                        <ButtonAtom
                          name={t('CANCEL')}
                          onClick={() => setDialogOpen(false)}
                          btntype={Buttons.SECONDARY}
                          className={classes.inViewLogButton}
                        />
                        <ButtonAtom
                          name={t('SAVE')}
                          onClick={formik.handleSubmit}
                          btntype={Buttons.PRIMARY}
                          className={classes.inViewLogButton}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </FormikProvider>
      </Grid>
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
