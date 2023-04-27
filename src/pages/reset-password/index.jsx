/* eslint-disable prefer-regex-literals */
import React, { useState } from 'react';
import {
  Grid, Paper, Typography, Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import {
  useNavigate, useLocation,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import Loader from '../../components/atoms/loader';
import useStyles from '../../custom-hooks/useStyles';
import styles from './style';
import ButtonAtom from '../../components/atoms/button';
import { Buttons } from '../../constant';
import TextFieldAtom from '../../components/atoms/textfield';
import commonStyles from '../../utils/commonClasses';
import logo from '../../assets/images/logo.png';
import forgotPasword from '../../assets/images/Boy.png';
import DialogAtom from '../../components/atoms/dialog';
import { postResetPassword } from '../../store/actions/auth';
import ResetSuccess from '../../assets/images/resetSuccess.png';
import girlBg from '../../assets/images/girlBg.png';
import emailIcon from '../../assets/images/email-icon.png';
import callIcon from '../../assets/images/call-icon.png';

function DialogContent({ data, classes }) {
  return (
    <Grid item xs={10} className={classes.content}>
      {data}
    </Grid>
  );
}
function DialogFooter({
  classes, handleDialog, t,
}) {
  return (
    <Grid container className={classes.content} justifyContent="flex-end">
      <ButtonAtom
        name={t('OK')}
        onClick={handleDialog}
        btntype={Buttons.PRIMARY}
      />
    </Grid>
  );
}
export default function ResetPassword() {
  const [showLoader, setShowLoader] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, showDialogTitle] = useState(null);
  const [showMessage] = useState('');
  const [apiStatus, setApiStatus] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showReConfirm, setShowReConfirm] = useState(false);

  const [message, setMessage] = useState(null);
  const { t } = useTranslation();
  const classes = useStyles(styles)();
  const commonClasses = useStyles(commonStyles)();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required(t('PASSWORD_REQUIRED')),
    confirmPassword: Yup.string()
      .required(t('CONFIRM_PASSWORD_REQUIRED'))
      .oneOf([Yup.ref('newPassword')], t('PASSWORD_MUST_MATCH')),
  });

  const hasLowerCase = (val) => new RegExp('(?=.*[a-z])').test(val);
  const hasUpperCase = (val) => new RegExp('(?=.*[A-Z])').test(val);
  const hasNumericCase = (val) => new RegExp('(?=.*\\d)').test(val);
  const hasSpecialCase = (val) => new RegExp('(?=.*[-+_!@#$%^&*., ?])').test(val);
  const hasEmailAddress = (val) => (val ? new URLSearchParams(location.search).get('email')
    && val.indexOf(new URLSearchParams(location.search).get('email')) !== -1 : true);

  async function saveData(values, setSubmitting) {
    const vl = values.newPassword;
    if (!(hasLowerCase(vl) && hasUpperCase(vl) && hasNumericCase(vl)
      && hasSpecialCase(vl) && !hasEmailAddress(vl))) {
      return;
    }
    const token = new URLSearchParams(location.search).get('token');
    const email = new URLSearchParams(location.search).get('email');
    const body = {
      email,
      oneTimeKey: token,
      newPassword: values.newPassword,
    };
    dispatch(postResetPassword(body)).then((res) => {
      const data = res?.resetPasswordResponse;
      setApiStatus(data.status);
      if (data.status) {
        if (setSubmitting) setSubmitting(true);
        setShowLoader(false);
        setResetPasswordSuccess(true);
        setTimeout(() => {
          setResetPasswordSuccess(false);
          navigate('/');
        }, 5000);
        showDialogTitle(t('RESET_PASSWORD'));
      } else {
        setShowLoader(false);
        setDialogOpen(true);
        setMessage(data?.message);
        showDialogTitle(t('RESET_PASSWORD_FAILED'));
      }
    });
    if (setSubmitting) setSubmitting(true);
    setShowLoader(true);
  }
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      saveData(values);
    },
  });
  const resetPassword = () => {
    formik.handleSubmit();
  };

  const renderSuccessPage = () => (
    <Grid container xs={12} className={classes.passwordGrid}>
      <Grid
        item
        xs={12}
        lg={12}
        className={classes.keyImage}
      />
      <Grid container justifyContent="flex-end" className={classes.cardRightOuter}>
        <Grid item xs={12} className={classes.girlBG}>
          <img
            src={girlBg}
            width={642}
            alt="ManaBadi SiliconAndhra"
            className={classes.girlBgImg}
          />
        </Grid>
        <Grid container item xs={12} className={classes.cardRight}>
          <Grid container xs={12} md={12} lg={12} className={classes.topContainer}>
            <Grid item xs={12} lg={12} className={classes.resetYourPassword}>
              <h1>
                {t('RESET_YOUR_PASSWORD')}
              </h1>
            </Grid>
          </Grid>
          <Grid container item xs={12} className={classes.cardRightAll}>
            <Grid container item xs={12} justifyContent="space-between">
              <Grid justifyContent="center" xs={12}>
                <img src={ResetSuccess} alt="" className={classes.resetImgSize} />
              </Grid>
              <Grid item justifyContent="center" xs={12} md={12} lg={12} className={classes.successContent}>
                <Typography mb={2} className={classes.successText}>
                  {t('PASSWORD_RESET_SUCCESS_TEXT')}
                </Typography>
                <Typography
                  mb={4}
                  xs={3}
                  md={3}
                  lg={3}
                  className={classes.successSubtext}
                >
                  {t('PASSWORD_RESET_SUCCESS_SUB_TEXT')}
                  {' '}
                  <a href="/">{t('CLICK_HERE')}</a>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  );
  const renderResetPassword = () => (
    <Grid container xs={12} className={classes.passwordGrid}>
      <Grid
        item
        xs={12}
        lg={12}
        className={classes.keyImage}
      />
      <Grid container justifyContent="flex-end" className={classes.cardRightOuter}>
        <Grid item xs={12} className={classes.girlBG}>
          <img
            src={girlBg}
            width={642}
            alt="ManaBadi SiliconAndhra"
            className={classes.girlBgImg}
          />
        </Grid>
        <Grid container item xs={12} className={classes.cardRight}>
          <Grid container xs={12} md={12} lg={12} className={classes.topContainer}>
            <Grid item xs={12} lg={12} className={classes.resetYourPassword}>
              <h1>
                {t('RESET_YOUR_PASSWORD')}
              </h1>
            </Grid>
          </Grid>
          <Grid container item xs={12} className={classes.cardRightAll}>
            <Grid container item xs={12} justifyContent="space-between">
              <Grid item xs={12} className={classes.pleaseEnter}>
                {t('PLEASE_ENTER_NEW_PASSWORD')}
              </Grid>
              <Grid container xs={11} md={10} xl={9} sx={{ mx: 'auto' }} className={classes.formContainer}>
                <Grid item xs={12} className={classes.passwordsText}>
                  {t('NEW_PASSWORD')}
                </Grid>

                <Grid item xs={11} className={clsx(classes.iconField, classes.displayFlex)} ml={12}>
                  <TextFieldAtom
                    placeholder="New Password"
                    id="newPassword"
                    name="newPassword"
                    className={classes.textFieldNew}
                    type={!showConfirm ? 'password' : 'text'}
                    value={formik?.values?.newPassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />

                  <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                    {!showConfirm ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                  </IconButton>
                </Grid>
                {formik?.values?.newPassword ? (
                  <Grid className={classes.passwordRules}>
                    <Grid
                      item
                      className={clsx(
                        classes.displayFlex,
                        formik?.values?.newPassword.length <= 7 ? classes.unmatch : classes.match,
                      )}
                    >
                      {formik?.values?.newPassword.length <= 7
                        ? <CloseIcon className={classes.fontSize} />
                        : <DoneIcon className={classes.fontSize} />}
                      <div>{t('ATLEAST_8_CHARACTER')}</div>
                    </Grid>
                    <Grid
                      item
                      className={clsx(
                        classes.displayFlex,
                        !hasLowerCase(formik?.values?.newPassword)
                          || !hasUpperCase(formik?.values?.newPassword)
                          ? classes.unmatch : classes.match,
                      )}
                    >
                      {!hasLowerCase(formik?.values?.newPassword)
                        || !hasUpperCase(formik?.values?.newPassword)
                        ? <CloseIcon className={classes.fontSize} />
                        : <DoneIcon className={classes.fontSize} />}
                      <div>{t('HAS_LOWER_UPPER_CASE')}</div>
                    </Grid>
                    <Grid
                      item
                      className={clsx(
                        classes.displayFlex,
                        !hasNumericCase(formik?.values?.newPassword)
                          || !hasSpecialCase(formik?.values?.newPassword)
                          ? classes.unmatch : classes.match,
                      )}
                    >
                      {!hasNumericCase(formik?.values?.newPassword)
                        || !hasSpecialCase(formik?.values?.newPassword)
                        ? <CloseIcon className={classes.fontSize} />
                        : <DoneIcon className={classes.fontSize} />}
                      <div>{t('HAS_NUMERIC_SPECIAL_CASE')}</div>
                    </Grid>
                    <Grid
                      item
                      className={clsx(
                        classes.displayFlex,
                        hasEmailAddress(formik?.values?.newPassword)
                          ? classes.unmatch : classes.match,
                      )}
                    >
                      {hasEmailAddress(formik?.values?.newPassword)
                        ? <CloseIcon className={classes.fontSize} />
                        : <DoneIcon className={classes.fontSize} />}
                      <div>{t('DOES_NOT_CONTAIN_EMAIL_ADDRESS')}</div>
                    </Grid>
                  </Grid>
                ) : ''}
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <Grid className={classes.errorGrid} justify="flex-start" item xs={12}>
                    <div className={classes.errorText}>{formik.errors.newPassword}</div>
                  </Grid>

                ) : null}
                <Grid item xs={12} className={classes.passwordsText}>
                  {t('CONFIRM_PASSWORD')}
                </Grid>
                <Grid item xs={11} className={clsx(classes.iconField, classes.displayFlex)} ml={12}>
                  <TextFieldAtom
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    type={!showReConfirm ? 'password' : 'text'}
                    value={formik?.values?.confirmPassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <IconButton onClick={() => setShowReConfirm(!showReConfirm)}>
                    {!showReConfirm ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                  </IconButton>
                </Grid>
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <Grid className={classes.errorGrid} justify="flex-start" item xs={12}>
                    <div className={classes.errorText}>{formik.errors.confirmPassword}</div>
                  </Grid>
                ) : null}
                <Grid container justifyContent="flex-end" xs={12} md={12} lg={12} className={classes.BtnGroup} mt={3}>
                  <Grid item>
                    <ButtonAtom
                      btntype={Buttons.SECONDARY}
                      name={t('CANCEL')}
                    />
                    <ButtonAtom
                      btntype={Buttons.PRIMARY}
                      name={t('UPDATE_PASSWORD')}
                      onClick={resetPassword}
                      className={classes.activeButtonNew}
                    />
                  </Grid>

                  <Grid item xs={12} mt={4}>
                    <Grid container>
                      <Grid item xs={3} />
                      <Grid item xs={3} align="left">
                        <Typography className={commonClasses.contactUsLinks} variant="body2" gutterBottom mt={1}>{t('FORGOT_CONTACT_TEXT')}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className={classes.alignContactText}>
                          <img alt="" src={callIcon} className={classes.imgSize} />
                          <Typography className={classes.contactUsDes}>
                            <a className={commonClasses.contactUsLinks} href="tel:+18446262334">1 (844) 626-BADI (2234)</a>
                          </Typography>
                        </Box>
                        <Box className={classes.alignContactText}>
                          <img alt="" src={emailIcon} className={classes.imgSize} />
                          <Typography className={classes.contactUsDes}>
                            <a className={commonClasses.contactUsLinks} href="mailto:support@manabadi.siliconandhra.org">support@manabadi.siliconandhra.org</a>
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>
                {/* <Grid container className={classes.textMargin}>
                  <Grid lg={2.5} />
                  <Grid item xs={12} lg={3}>
                    <Box display="flex" className={classes.helpText} />

                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <Box display="flex" direction="row" alignItems="center" className={classes.contactUsMargin}>
                      <Typography className={classes.contactUsDes} />
                    </Box>

                    <Box display="flex" direction="row" alignItems="center" className={classes.contactUsMargin} />

                  </Grid>
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const handleDialog = () => {
    setDialogOpen(false);
    if (apiStatus) {
      setResetPasswordSuccess(true);
    }
  };
  return (
    <Paper className={classes.root}>
      <Grid container>
        <img
          src={logo}
          width={441}
          alt="Italian Trulli"
          className={classes.headerLogo}
          onClick={() => navigate('/')}
        />
      </Grid>
      <Grid container className={classes.headerContainer}>
        <Grid item xs={2} className={classes.imageCard}>
          <img
            component="img"
            width="100%"
            src={forgotPasword}
            alt="forgot password"
            className={classes.passwordImg}
          />
        </Grid>
        <Grid item xs={10} className={classes.passwordCard}>
          <form
            onSubmit={formik.handleSubmit}
            name="student-info"
            noValidate
            autoComplete="off"
          >
            {resetPasswordSuccess ? renderSuccessPage() : renderResetPassword()}
          </form>
        </Grid>
      </Grid>
      {
        showLoader && (
          <Grid>
            <Loader message={showMessage} dialogTitle={showDialogTitle} />
          </Grid>
        )
      }

      <DialogAtom
        customClass={classes.dialogAtom}
        isOpen={isDialogOpen}
        dialogHeading={dialogTitle}
        secHandle={() => setDialogOpen(false)}
        content={<DialogContent data={message} classes={classes} t={t} />}
        footer={(
          <DialogFooter
            classes={classes}
            handleDialog={handleDialog}
            navigate={navigate}
            t={t}
          />
        )}
      />
    </Paper>
  );
}
