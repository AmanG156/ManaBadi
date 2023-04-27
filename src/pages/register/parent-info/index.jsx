import React, { useEffect, useState, memo } from 'react';
import {
  Box, Grid,
} from '@mui/material';
import _ from 'lodash';
import { useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { isValidPhoneNumber } from 'react-phone-number-input';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTranslation } from 'react-i18next';
import Tooltip from '@mui/material/Tooltip';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import {
  Button,
  Checkbox,
  AddressAutoComplete,
  PhoneInput,
} from '../../../components/atoms';
import { Buttons } from '../../../constant';
import useStyles from '../../../custom-hooks/useStyles';
// eslint-disable-next-line import/no-named-as-default
import styles from './style';
// import style, { customCss } from '../style';
import style from '../style';
import commonStyle from '../../../utils/commonClasses';
import { titleOptions } from './constant';
import { getPlaceInformation } from '../../../utils/mapMethod';
import { getEmailAvailabilityService } from '../../../store/services/auth';
import { removeSpecialChar } from '../../../utils/methods';
import Loader from '../../../components/atoms/loader';
import PerformantTextField from '../../../components/atoms/PerformantTextField';
import useParent from '../../../custom-hooks/useParent';
import PerfromantDropdown from '../../../components/atoms/PerfromantDropDown';
import PerfromantMultiValueDropdown from '../../../components/atoms/PerfromantMultiValueDropDown';

function ParentInfo({
  primaryButton,
  isStudent,
  changeLog,
  loading,
  setLoading,
  handleStepper,
  setParentInfo,
  parentInfo,
  source = 'register',
  onCancel,
  onFormSubmit,
  onViewLogs,
  editParentClasses,
  isEnrollStudent,
  setParentValid,
  setParentFormik,
}) {
  const { t } = useTranslation();
  const selectedParentData = useParent();

  const volunteerOptions = selectedParentData?.volunteers.map((i) => ({
    name: i.name,
    id: i.name,
  }));

  const hearAboutOptions = selectedParentData?.hearAboutUs.map((op) => ({
    ...op,
    id: op.name,
  }));
  const commonClasses = useStyles(commonStyle)();
  const {
    parentOneContact,
    parentTwoContact,
    parentTwoTitle,
    parentTwoEmail,
    parentTwoFirstName,
    parentTwoMiddleName,
    parentTwoLastName,
    parentTwoProfession,
    parentTwoCompany,
  } = parentInfo;
  const registerClasses = editParentClasses || useStyles(style)();
  const [parentOneCellphone, setParentOneCellphone] = useState(parentOneContact);
  const [parentTwoCellphone, setParentTwoCellphone] = useState(
    parentTwoContact || '',
  );
  const [parentTwoInfo, setParentTwoInfo] = useState({
    parentTwoTitle: parentTwoTitle || '',
    parentTwoEmail: parentTwoEmail || '',
    parentTwoFirstName: parentTwoFirstName || '',
    parentTwoMiddleName: parentTwoMiddleName || '',
    parentTwoLastName: parentTwoLastName || '',
    parentTwoContact: parentTwoContact || '',
    parentTwoProfession: parentTwoProfession || '',
    parentTwoCompany: parentTwoCompany || '',
  });
  const [parentOneEmailAlreadyExist, setParentOneEmailAlreadyExist] = useState(false);
  const [parentTwoEmailAlreadyExist, setParentTwoEmailAlreadyExist] = useState(false);
  const [homeAddressInfo, setHomeAddressInfo] = useState(
    parentInfo?.homeAddressInfo || {},
  );
  const [parentOneDefaultCountry, setParentOneDefaultCountry] = useState(
    parentInfo?.parentOneDefaultCountry || 'US',
  );
  const [parentTwoDefaultCountry, setParentTwoDefaultCountry] = useState(
    parentInfo?.parentTwoDefaultCountry || 'US',
  );

  const isParentTwoFilled = () => {
    const isAnyKeyHasValue = Object.keys(parentTwoInfo).some(
      (k) => parentTwoInfo[k],
    );
    return isAnyKeyHasValue;
  };
  const [readTelugu, setReadTeulgu] = useState(parentInfo?.readTelugu || false);
  const [speakTelugu, setSpeakTeulgu] = useState(
    parentInfo?.speakTelugu || false,
  );
  const textField = (
    label,
    id,
    type,
    handleChange,
    onBlur,
    value,
    error,
    required = true,
    allowSpecialCharacter = true,
  ) => (
    <PerformantTextField
      placeholder={`${label} ${required ? '*' : ''}`}
      id={id}
      required={required}
      name={id}
      type={type}
      value={value}
      onBlur={onBlur}
      error={error}
      onChange={(e) => {
        handleChange(e);
        if (Object.keys(parentTwoInfo).includes(id)) {
          setParentTwoInfo({ ...parentTwoInfo, [id]: e.target.value });
        }
      }}
      allowSpecialCharacter={allowSpecialCharacter}
    />
  );
  const phoneInput = (
    label,
    id,
    handleChange,
    onBlur,
    onCountryChange,
    defaultCountry,
    value,
    error,
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
    />
  );

  const classes = useStyles(styles)();
  const setTitle = (title) => (
    <Grid container className={classes.heading}>
      <Grid item xs={12}>
        {title}
      </Grid>
    </Grid>
  );
  const parentValidations = {
    title: Yup.string(t('TITLE_REQUIRED'))
      .min(2, t('TITLE_REQUIRED'))
      .required(t('TITLE_REQUIRED')),
    email: Yup.string(t('EMAIL_REQUIRED'))
      .email(t('EMAIL_INVALID'))
      .required(t('EMAIL_REQUIRED')),
    firstName: Yup.string(t('FIRSTNAME_REQUIRED'))
      .matches(/^[aA-zZ\s]+$/, t('NOT_SPECIAL_CHAR'))
      .min(2, t('FIRSTNAME_MIN'))
      .required(t('FIRSTNAME_REQUIRED')),
    lastName: Yup.string(t('LASTNAME_REQUIRED'))
      .matches(/^[aA-zZ\s]+$/, t('NOT_SPECIAL_CHAR'))
      .min(2, t('LASTNAME_MIN'))
      .required(t('LASTNAME_REQUIRED')),
    contact: Yup.string(t('CONTACTNO_REQUIRED'))
      .required(t('CONTACTNO_REQUIRED'))
      .test('isValidPhoneNumber', t('INVALID_PHONE'), (value) => (value ? isValidPhoneNumber(value) : false)),
    profession: Yup.string(t('PROFESSION_REQUIRED')).required(
      t('PROFESSION_REQUIRED'),
    ),
    company: Yup.string(t('NAMEOFCOMPANY_REQUIRED')).required(
      t('NAMEOFCOMPANY_REQUIRED'),
    ),
  };
  const parentOneValidations = Yup.object({
    parentOneTitle: parentValidations?.title,
    parentOneEmail: parentValidations?.email,
    parentOneFirstName: parentValidations?.firstName,
    parentOneLastName: parentValidations?.lastName,
    parentOneContact: parentValidations?.contact,
    parentOneProfession: parentValidations?.profession,
    parentOneCompany: parentValidations?.company,
    homeAddress: Yup.string(t('HOMEADDRESS_REQUIRED'))
      .required(t('HOMEADDRESS_REQUIRED'))
      .test('isValidAddress', t('INVALID_ADDRESS'), (value) => (value ? value === homeAddressInfo?.add : false)),
    volunteer: Yup.array()
      .min(1, t('VOLUNTEER_REQUIRED'))
      .required(t('VOLUNTEER_REQUIRED')),

    hearAboutUs: Yup.array()
      .min(1, t('HEARABOUT_REQUIRED'))
      .required(t('HEARABOUT_REQUIRED')),
  });

  const parentTwoValidations = Yup.object({
    parentTwoTitle: parentValidations?.title,
    parentTwoEmail: parentValidations?.email,
    parentTwoFirstName: parentValidations?.firstName,
    parentTwoLastName: parentValidations?.lastName,
    parentTwoContact: parentValidations?.contact,
    parentTwoProfession: parentValidations?.profession,
    parentTwoCompany: parentValidations?.company,
  });
  const adminValidations = Yup.object({
    changeLog: Yup.string(t('CHANGE_LOG_REQUIRED')).required(
      t('CHANGE_LOG_REQUIRED'),
    ),
  });

  const concatenatedSchema = parentOneValidations.concat(parentTwoValidations);
  const reqConcatSchema = source === 'editParent' && changeLog
    ? concatenatedSchema.concat(adminValidations)
    : concatenatedSchema;
  const reqParentOneSchema = source === 'editParent' && changeLog
    ? parentOneValidations.concat(adminValidations)
    : parentOneValidations;

  const validationSchema = isParentTwoFilled()
    ? reqConcatSchema
    : reqParentOneSchema;
  const formik = useFormik({
    initialValues: parentInfo || {
      parentOneTitle: '',
      parentOneFirstName: '',
      parentOneMiddleName: '',
      parentOneLastName: '',
      parentOneEmail: '',
      parentOneProfession: '',
      parentOneContact: '',
      parentOneCompany: '',
      parentTwoTitle: '',
      parentTwoFirstName: '',
      parentTwoLastName: '',
      parentTwoMiddleName: '',
      parentTwoEmail: '',
      parentTwoProfession: '',
      parentTwoContact: '',
      parentTwoCompany: '',
      homeAddress: '',
      aptSuite: '',
      volunteer: [],
      hearAboutUs: [],
      changeLog: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const selectedHearAboutOptions = [];
      values?.hearAboutUs?.forEach((selectedVal) => {
        const selectedHearAbout = _.find(
          hearAboutOptions,
          (ha) => ha.id === selectedVal,
        );
        selectedHearAboutOptions.push(selectedHearAbout);
      });
      const info = {
        ...values,
        homeAddressInfo,
        selectedHearAboutOptions,
        speakTelugu,
        readTelugu,
        parentOneDefaultCountry,
        parentTwoDefaultCountry,
      };

      if (source === 'editParent') {
        // used for edit operation not for new registration
        setParentInfo(info);
        if (onFormSubmit) {
          onFormSubmit(info);
        }
        return;
      }
      setLoading(true);
      getEmailAvailabilityService(values?.parentOneEmail)
        .then((parentOneResponse) => {
          if (parentOneResponse?.email_found) {
            setParentOneEmailAlreadyExist(t('EMAIL_ALREADY_EXIST'));
            setLoading(false);
            if (isParentTwoFilled()) {
              getEmailAvailabilityService(values?.parentTwoEmail)
                .then((parentTwoResponse) => {
                  if (parentTwoResponse?.email_found) {
                    setParentTwoEmailAlreadyExist(t('EMAIL_ALREADY_EXIST'));
                    setLoading(false);
                  }
                })
                .catch(() => {
                  setLoading(false);
                });
            }
          } else if (isStudent) {
            onFormSubmit(info, setLoading);
          } else {
            setParentInfo({
              ...info,
            });
            setLoading(false);
            handleStepper(1);
          }
        })
        .catch(() => { });
    },
  });

  const setPreviousFieldTouch = (key, isFormFor) => {
    let allFields = [
      'parentOneTitle',
      'parentOneFirstName',
      'parentOneMiddleName',
      'parentOneLastName',
      'parentOneEmail',
      'parentOneContact',
      'parentOneProfession',
      'parentOneCompany',
    ];
    if (isFormFor === 'parentTwo' || (isFormFor === 'parentOne' && isParentTwoFilled())) {
      allFields = allFields.concat([
        'parentTwoTitle',
        'parentTwoFirstName',
        'parentTwoMiddleName',
        'parentTwoLastName',
        'parentTwoEmail',
        'parentTwoContact',
        'parentTwoProfession',
        'parentTwoCompany',
      ]);
    }
    allFields = allFields.concat([
      'homeAddress',
      'aptSuite',
      'volunteer',
      'hearAboutUs',
    ]);
    if (changeLog) {
      allFields = allFields.concat(['changeLog']);
    }
    const index = allFields.indexOf(key);
    if (index > -1) {
      const obj = {};
      for (let i = 0; i <= index; i += 1) {
        const element = allFields[i];
        obj[element] = true;
      }
      formik.setTouched({ ...formik.touched, ...obj }, true);
    }
  };
  const handleParentOneCellphone = (phone) => {
    setParentOneCellphone(phone);
    formik.setFieldValue('parentOneContact', phone || '');
  };
  const handleParentTwoCellphone = (phone) => {
    setParentTwoInfo({ ...parentTwoInfo, parentTwoContact: phone });
    setParentTwoCellphone(phone);
    formik.setFieldValue('parentTwoContact', phone || '');
  };
  const handleParentOneDefaultCountry = (value) => {
    setParentOneDefaultCountry(value);
  };
  const handleParentTwoDefaultCountry = (value) => {
    setParentTwoDefaultCountry(value);
  };
  const setHeaderTitle = () => (
    <Grid container spacing={0} justifyContent="space-between">
      <Grid item xs={11}>
        <div className={registerClasses.headerTitle}>
          {t('PARENT_INFORMATION')}
        </div>
      </Grid>
      <Grid item justifyContent="flex-end" xs={1} className={classes.alignRight}>
        <Button
          btntype={Buttons.SECONDARY}
          icon={<ArrowForwardIosIcon />}
          // customCss={customCss}
          // className={commonclasses.secButton}
          className={classes.commonButtonNew}
          onClick={() => handleStepper(0, formik.handleSubmit)}
        />
      </Grid>
      {/* <div className={commonClasses.borderBottom} /> */}
    </Grid>
  );
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
  const setReadCheckBox = () => {
    setReadTeulgu(!readTelugu);
  };
  const setSpeakCheckBox = () => {
    setSpeakTeulgu(!speakTelugu);
  };
  const readTeluguClass = () => {
    if (source === 'editParent' && !isStudent) return `${classes.readTelugu} ${classes.alignTextGrid}  ${classes.checkboxColor}`;
    if (isStudent) { return ` ${classes.checkboxForStudent} ${classes.alignTextGrid} ${classes.checkboxColor}`; }
    return ` ${classes.alignTextGrid} ${classes.checkboxColor}`;
  };

  const speakTeluguClass = () => {
    if (source === 'editParent' && !isStudent) return (` ${classes.speakTelugu} ${classes.alignTextGrid} ${classes.checkboxColor}`);
    if (isStudent) {
      return ` ${classes.checkboxForStudent} ${classes.alignTextGrid} ${classes.checkboxColor}`;
    }

    return ` ${classes.alignTextGrid} ${classes.checkboxColor}`;
  };

  useEffect(() => {
    if (isEnrollStudent) {
      setParentFormik(formik);
      if (Object.keys(formik?.errors).length) {
        setParentValid(false);
      } else {
        setParentValid(true);
      }
      const values = formik?.values;
      const selectedHearAboutOptions = [];
      values?.hearAboutUs?.forEach((selectedVal) => {
        const selectedHearAbout = _.find(
          hearAboutOptions,
          (ha) => ha.id === selectedVal,
        );
        selectedHearAboutOptions.push(selectedHearAbout);
      });
      const info = {
        ...values,
        homeAddressInfo,
        selectedHearAboutOptions,
        speakTelugu,
        readTelugu,
        parentOneDefaultCountry,
        parentTwoDefaultCountry,
      };
      setParentInfo(info);
    }
  }, [
    formik?.errors,
    formik?.values,
    formik?.touched,
    speakTelugu,
    readTelugu,
    parentOneDefaultCountry,
    parentTwoDefaultCountry,
  ]);
  useEffect(() => {
    formik.validateField('homeAddress');
  }, [homeAddressInfo]);
  return (
    <Box className={registerClasses.parentGridContainer}>
      {source === 'register' ? (
        <Grid
          container
          className={registerClasses.headerContainer}
          xs={12}
          justifyContent="space-between"
        >
          {setHeaderTitle()}
        </Grid>
      ) : (
        ''
      )}
      <FormikProvider value={formik}>
        <form
          name="tenantUserForm"
          noValidate
          autoComplete="off"
          className={`${registerClasses.form} ${classes.form}`}
        >
          <Grid container className={registerClasses.mainContainer}>
            {setTitle(t('PARENT_ONE'))}
            <div className={commonClasses.borderBottom} />
            <Grid container spacing={2} className={classes.innerContainer}>
              <Grid item xs={12} md={6} lg={3} className={classes.alignGridTitle}>
                <PerfromantDropdown
                  minWidth="100%"
                  label={t('TITLE')}
                  labelId={t('TITLE')}
                  id="parentOneTitle"
                  name="parentOneTitle"
                  value={formik.values.parentOneTitle}
                  onBlur={() => setPreviousFieldTouch('parentOneTitle', 'parentOne')}
                  error={getErrorText('parentOneTitle')}
                  required
                  handleChange={formik.handleChange}
                  options={titleOptions}
                  className={classes.dropdownText}
                />
                {getErrorText('parentOneTitle')}
              </Grid>
              <Tooltip
                title={t('HOVER_FIRSTNAME')}
                placement="bottom-end"
                arrow
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={3}
                  className={classes.alignGridFirstName}
                >
                  {textField(
                    t('FIRST_NAME'),
                    'parentOneFirstName',
                    'text',
                    formik.handleChange,
                    () => setPreviousFieldTouch('parentOneFirstName', 'parentOne'),
                    removeSpecialChar(formik.values.parentOneFirstName),
                    getErrorText('parentOneFirstName'),
                    true,
                    false,
                  )}
                </Grid>
              </Tooltip>
              <Tooltip title={t('HOVER_MIDDLENAME')} placement="bottom" arrow>
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={3}
                  className={classes.alignGridMiddleName}
                >
                  {textField(
                    t('MIDDLE_NAME'),
                    'parentOneMiddleName',
                    'text',
                    formik.handleChange,
                    () => setPreviousFieldTouch('parentOneMiddleName', 'parentOne'),
                    formik.values.parentOneMiddleName,
                    false,
                    false,
                  )}
                </Grid>
              </Tooltip>
              <Tooltip title={t('HOVER_LASTNAME')} placement="bottom-end" arrow>
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={3}
                  className={classes.alignGridLastName}
                >
                  {textField(
                    t('LAST_NAME'),
                    'parentOneLastName',
                    'text',
                    formik.handleChange,
                    () => setPreviousFieldTouch('parentOneLastName', 'parentOne'),
                    removeSpecialChar(formik.values.parentOneLastName),
                    getErrorText('parentOneLastName'),
                    true,
                    false,
                  )}
                </Grid>
              </Tooltip>
            </Grid>

            <Grid
              container
              item
              xs={12}
              spacing={2}
              className={classes.innerContainer}
            >
              <Grid
                item
                xs={12}
                sm={6}
                className={classes.alignTextGrid}

              >
                {textField(
                  t('EMAIL'),
                  'parentOneEmail',
                  'email',
                  formik.handleChange,
                  () => setPreviousFieldTouch('parentOneEmail', 'parentOne'),
                  formik.values.parentOneEmail,
                  parentOneEmailAlreadyExist || getErrorText('parentOneEmail'),
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                className={classes.alignTextGrid}
              >
                {phoneInput(
                  `${t('CONTACT_NO')} *`,
                  'parentOneContact',
                  handleParentOneCellphone,
                  () => {
                    formik.setTouched(
                      { ...formik.touched, parentOneContact: true },
                      true,
                    );
                    setPreviousFieldTouch('parentOneContact', 'parentOne');
                  },
                  handleParentOneDefaultCountry,
                  parentOneDefaultCountry,
                  parentOneCellphone,
                  getErrorText('parentOneContact')
                || (formik?.touched?.parentOneContact
                  && formik?.values?.parentOneContact
                  && !isValidPhoneNumber(formik?.values?.parentOneContact)
                  && getErrorText(null, t('INVALID_PHONE'))),
                )}
                {showPhoneError(formik?.touched?.parentOneContact, formik?.values.parentOneContact, 'parentOneContact')}
              </Grid>

            </Grid>

            <Grid container spacing={2} className={classes.innerContainer}>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                className={classes.alignTextGrid}
              >
                {textField(
                  t('PROFESSION'),
                  'parentOneProfession',
                  'text',
                  formik.handleChange,
                  () => setPreviousFieldTouch('parentOneProfession', 'parentOne'),
                  formik.values.parentOneProfession,
                  getErrorText('parentOneProfession'),
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                className={classes.alignTextGrid}
              >
                {textField(
                  t('NAME_OF_COMPANY'),
                  'parentOneCompany',
                  'text',
                  formik.handleChange,
                  () => setPreviousFieldTouch('parentOneCompany', 'parentOne'),
                  formik.values.parentOneCompany,
                  getErrorText('parentOneCompany'),
                )}
              </Grid>
            </Grid>

            {/* Parent 2 */}
            {setTitle(t('PARENT_TWO'))}
            <div className={commonClasses.borderBottom} />
            <Grid container spacing={2} className={classes.innerContainer}>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={3}
                className={classes.alignGridTitle}
              >
                <PerfromantDropdown
                  minWidth="100%"
                  label={t('TITLE')}
                  showLabel
                  id="parentTwoTitle"
                  name="parentTwoTitle"
                  value={formik.values.parentTwoTitle}
                  onBlur={() => setPreviousFieldTouch('parentTwoTitle', 'parentTwo')}
                  error={getErrorText('parentTwoTitle')}
                  required={isParentTwoFilled()}
                  handleChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldValue('parentTwoTitle', e.target.value);
                    setParentTwoInfo({
                      ...parentTwoInfo,
                      parentTwoTitle: e.target.value,
                    });
                  }}
                  options={titleOptions}
                />
                {getErrorText('parentTwoTitle')}
              </Grid>
              <Tooltip
                title={t('HOVER_FIRSTNAME')}
                placement="bottom-end"
                arrow
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={3}
                  className={classes.alignGridFirstName}
                >
                  {textField(
                    t('FIRST_NAME'),
                    'parentTwoFirstName',
                    'text',
                    formik.handleChange,
                    () => setPreviousFieldTouch('parentTwoFirstName', 'parentTwo'),
                    removeSpecialChar(formik.values.parentTwoFirstName),
                    getErrorText('parentTwoFirstName'),
                    isParentTwoFilled(),
                    false,
                  )}
                </Grid>
              </Tooltip>
              <Tooltip title={t('HOVER_MIDDLENAME')} placement="bottom" arrow>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={3}
                  className={classes.alignGridMiddleName}
                >
                  {textField(
                    t('MIDDLE_NAME'),
                    'parentTwoMiddleName',
                    'text',
                    formik.handleChange,
                    () => setPreviousFieldTouch('parentTwoMiddleName', 'parentTwo'),
                    formik.values.parentTwoMiddleName,
                    false,
                    false,
                  )}
                </Grid>
              </Tooltip>
              <Tooltip title={t('HOVER_LASTNAME')} placement="bottom-end" arrow>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={3}
                  className={classes.alignGridLastName}
                >
                  {textField(
                    t('LAST_NAME'),
                    'parentTwoLastName',
                    'text',
                    formik.handleChange,
                    () => setPreviousFieldTouch('parentTwoLastName', 'parentTwo'),
                    removeSpecialChar(formik.values.parentTwoLastName),
                    getErrorText('parentTwoLastName'),
                    isParentTwoFilled(),
                    false,
                  )}
                </Grid>
              </Tooltip>
            </Grid>

            <Grid container spacing={2} className={classes.innerContainer}>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                className={classes.alignTextGrid}
              >
                {textField(
                  t('EMAIL'),
                  'parentTwoEmail',
                  'email',
                  formik.handleChange,
                  () => setPreviousFieldTouch('parentTwoEmail', 'parentTwo'),
                  formik.values.parentTwoEmail,
                  parentTwoEmailAlreadyExist || getErrorText('parentTwoEmail'),
                  isParentTwoFilled(),
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                className={classes.alignTextGrid}
              >
                {phoneInput(
                  `${t('CONTACT_NO')} ${isParentTwoFilled() ? '*' : ''}`,
                  'parentTwoContact',
                  handleParentTwoCellphone,
                  () => {
                    formik.setTouched(
                      { ...formik.touched, parentTwoContact: true },
                      true,
                    );
                    setPreviousFieldTouch('parentTwoContact', 'parentTwo');
                  },
                  handleParentTwoDefaultCountry,
                  parentTwoDefaultCountry,
                  parentTwoCellphone,
                  isParentTwoFilled()
                && formik?.touched?.parentTwoContact
                && (getErrorText('parentTwoContact')
                  || (formik?.values?.parentTwoContact
                    && !isValidPhoneNumber(formik?.values?.parentTwoContact)
                    && getErrorText(null, t('INVALID_PHONE')))),
                  isParentTwoFilled(),
                )}
                {isParentTwoFilled()
                && showPhoneError(formik?.touched?.parentTwoContact, formik?.values.parentTwoContact, 'parentTwoContact')}
              </Grid>
            </Grid>

            <Grid container spacing={2} className={classes.innerContainer}>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                className={classes.alignTextGrid}
              >
                {textField(
                  t('PROFESSION'),
                  'parentTwoProfession',
                  'text',
                  formik.handleChange,
                  () => setPreviousFieldTouch('parentTwoProfession', 'parentTwo'),
                  formik.values.parentTwoProfession,
                  getErrorText('parentTwoProfession'),
                  isParentTwoFilled(),
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                className={classes.alignTextGrid}
              >
                {textField(
                  t('NAME_OF_COMPANY'),
                  'parentTwoCompany',
                  'text',
                  formik.handleChange,
                  () => setPreviousFieldTouch('parentTwoCompany', 'parentTwo'),
                  formik.values.parentTwoCompany,
                  getErrorText('parentTwoCompany'),
                  isParentTwoFilled(),
                )}
              </Grid>
            </Grid>
            {/*
          Additional Info */}
            {setTitle(t('ADDITIONAL_INFO'))}
            <div className={commonClasses.borderBottom} />
            <Grid container spacing={2} className={classes.innerContainer}>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                className={classes.alignTextGrid}
              >
                <AddressAutoComplete
                  label={`${t('HOMEADDRESS')} *`}
                  id="homeAddress"
                  required
                  name="homeAddress"
                  value={formik.values.homeAddress}
                  error={getErrorText('homeAddress')}
                  onPlaceSelected={async (e) => {
                    const res = await getPlaceInformation(e.formatted_address);
                    formik.setFieldValue(
                      'homeAddress',
                      e.formatted_address,
                      true,
                    );
                    setHomeAddressInfo({ ...res, add: e.formatted_address });
                  }}
                  onChange={(e) => {
                    formik.setFieldValue('homeAddress', e.target.value);
                  }}
                  onBlur={() => setPreviousFieldTouch('homeAddress', 'parentOne')}
                />
                {getErrorText('homeAddress')}
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                className={classes.alignTextGrid}
              >
                {textField(
                  t('APISUITE'),
                  'aptSuite',
                  'text',
                  formik.handleChange,
                  () => setPreviousFieldTouch('aptSuite', 'parentOne'),
                  formik.values.aptSuite,
                  false,
                  '',
                  true,
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2} className={classes.innerContainer}>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                className={classes.alignTextGrid}
              >
                <PerfromantMultiValueDropdown
                  label="VOLUNTEER"
                  options={volunteerOptions}
                  id="volunteer"
                  name="volunteer"
                  handleChange={formik.handleChange}
                  onBlur={() => setPreviousFieldTouch('volunteer', 'parentOne')}
                  value={formik.values.volunteer}
                  error={getErrorText('volunteer')}
                  required
                  customClassSelect="changeLabelUi"
                />
                {getErrorText('volunteer')}
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                className={classes.alignTextGrid}
              >
                <PerfromantMultiValueDropdown
                  label="HEARABOUT"
                  options={hearAboutOptions}
                  id="hearAboutUs"
                  name="hearAboutUs"
                  handleChange={formik.handleChange}
                  onBlur={() => setPreviousFieldTouch('hearAboutUs', 'parentOne')}
                  value={formik.values.hearAboutUs}
                  error={getErrorText('hearAboutUs')}
                  required
                  customClassSelect="changeLabelUi"
                />
                {getErrorText('hearAboutUs')}
              </Grid>
            </Grid>
            <Grid container spacing={2} className={classes.innerContainer}>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                className={
                speakTeluguClass()
              }
              >
                <Checkbox
                  label={t('SPEAK_TELGU')}
                  checked={speakTelugu}
                  handleChange={setSpeakCheckBox}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                className={
                readTeluguClass()
              }
              >
                <Checkbox
                  label={t('READ_TELGU')}
                  checked={readTelugu}
                  handleChange={setReadCheckBox}
                />
              </Grid>
            </Grid>
            {source === 'editParent' && changeLog ? (
              <Grid container className={classes.innerContainer}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  className={classes.alignTextGrid}
                >
                  {textField(
                    t('CHANGE_LOG'),
                    'changeLog',
                    'text',
                    formik.handleChange,
                    () => setPreviousFieldTouch('parentTwoCompany', 'parentTwo'),
                    formik.values.changeLog,
                    getErrorText('changeLog'),
                    true,
                  )}
                </Grid>
              </Grid>
            ) : (
              <Grid
                container
                className={classes.innerContainer}
                item
                xs={12}
                md={12}
                lg={12}
              >
                <Grid
                  className={classes.innerContainer}
                  item
                  xs={12}
                  md={12}
                  lg={12}
                />
              </Grid>
            )}
            <Grid container className={classes.button}>
              {source === 'editParent' && onViewLogs && (
              <Grid item xs={2} justifyContent="flex-start">
                <div className={classes.viewLogs} onClick={onViewLogs}>
                  <FindInPageOutlinedIcon style={{ height: 16 }} />
                  <div>{t('VIEW_LOGS')}</div>
                </div>
              </Grid>
              )}
              {isEnrollStudent ? null : (
                <Grid container xs={9} className={classes.button}>
                  {source === 'editParent' && (
                  <Grid item>
                    <Button
                      btntype={Buttons.SECONDARY}
                      className={classes.secButton}
                      onClick={onCancel}
                      name={t('CANCEL')}
                    />
                  </Grid>
                  )}

                  <Grid>
                    <Button
                      id="submit"
                      className={
                      source === 'editParent'
                        ? classes.activeButton
                        : commonClasses.activeButton
                    }
                      onClick={formik.handleSubmit}
                      name={primaryButton || t('SAVE_CONTINUE')}
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
            {loading && (
            <Grid>
              <Loader message={t('LOADING')} />
            </Grid>
            )}
          </Grid>
        </form>
      </FormikProvider>
    </Box>
  );
}

export default memo(ParentInfo);
