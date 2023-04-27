import React, { useState } from 'react';
import {
  Grid, Paper, Typography, Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loader from '../../components/atoms/loader';
import EmailIconText from '../../assets/images/email.png';
import useStyles from '../../custom-hooks/useStyles';
import styles from './style';
import ButtonAtom from '../../components/atoms/button';
import { Buttons } from '../../constant';
import TextFieldAtom from '../../components/atoms/textfield';
import commonStyles from '../../utils/commonClasses';
import logo from '../../assets/images/logo.png';
import forgotPasword from '../../assets/images/Boy.png';
import girlBg from '../../assets/images/girlBg.png';
import DialogAtom from '../../components/atoms/dialog';
import { postForgotPassword } from '../../store/actions/auth';
import emailIcon from '../../assets/images/email-icon.png';
import callIcon from '../../assets/images/call-icon.png';

function DialogContent({ data, header, classes }) {
  return (
    <Grid item xs={10} className={classes.content}>
      <h1 className={classes.dialogHeader}>{header}</h1>
      {data}
    </Grid>
  );
}
function DialogFooter({
  classes, handleDialog, t,
}) {
  const commonClasses1 = useStyles(commonStyles)();

  return (
    <Grid container className={classes.content} justifyContent="flex-end">
      <ButtonAtom
        name={t('OK')}
        onClick={handleDialog}
        btntype={Buttons.PRIMARY}
        className={commonClasses1.activeButton}
      />
    </Grid>
  );
}
export default function ForgotPassword() {
  const [showLoader, setShowLoader] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [showMessage] = useState('');
  const [message, setMessage] = useState(null);
  const [dialogTitle, showDialogTitle] = useState(null);
  const [dialogHeader, showDialogHeader] = useState('');
  const [apiStatus, setApiStatus] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles(styles)();
  const commonClasses = useStyles(commonStyles)();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string(t('PROVIDE_VALID_EMAIL'))
      .email(t('PROVIDE_VALID_EMAIL'))
      .required(t('PROVIDE_VALID_EMAIL')),
  });
  function getMaskedEmail(msg) {
    const email = msg.split(':')[1];
    const output = email.replace(/(..)(.{1,3})(?=.*@)/g, (_, a, b) => a + '*'.repeat(b.length));
    return output;
  }
  async function saveData(values, setSubmitting) {
    dispatch(postForgotPassword(values)).then((res) => {
      const data = res?.sentEmailResponse;
      setApiStatus(data.status);
      if (!data.status) {
        setShowLoader(false);
        setDialogOpen(true);
        setMessage(data?.message);
        showDialogTitle(t('PASSWORD_RECOVERY_FAILED'));
      } else {
        if (setSubmitting) setSubmitting(true);
        setShowLoader(false);
        setDialogOpen(true);
        showDialogTitle(t('PASSWORD_RECOVERY'));
        showDialogHeader(t('RECOVER_PASSWORD_EMAIL'));
        setMessage(t('PASSWORD_RESET_LINK', { email: getMaskedEmail(data.message) }));
      }
    });
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      setShowLoader(true);
      saveData(values);
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    setDialogOpen(true);
    navigate('/');
  };
  const renderForgotPassword = () => (
    <Grid container className={classes.passwordGrid}>
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
            alt="ManaBadi SiliconAndhra Logo"
            className={classes.girlBgImg}
          />
        </Grid>
        <Grid item xs={12} className={classes.cardRight}>
          <Grid container className={classes.topContainer}>
            <Grid item xs={12} lg={12} className={classes.forgotYourPassword}>
              <h1>
                {t('FORGOT_YOUR_PASSWORD')}
              </h1>
            </Grid>
          </Grid>
          <Grid container className={classes.cardRightAll}>
            <Grid item xs={12} className={classes.EnterStudentText}>
              {t('PLEASE_ENTER_ID')}
            </Grid>
            <Grid item xs={12} lg={12} className={classes.emailNew}>
              <TextFieldAtom
                id="email"
                name="email"
                type="email"
                value={formik?.values?.email}
                className={classes.emailnputNew}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="firstname.lastname@manabadi.siliconandhra.org"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className={classes.textBox}>
                      <img src={EmailIconText} alt="" className={`${classes.textBoxIcon} ${classes.imgSize}`} />
                      <b>Email &nbsp;- </b>
                    </InputAdornment>
                  ),
                }}
              />
              {formik.touched.email && formik.errors.email ? (
                <span className={classes.errorText}>{formik.errors.email}</span>
              ) : null}
            </Grid>

            <Grid container justifyContent="center">
              <ButtonAtom
                name={t('CANCEL')}
                className={classes.secButtonNew}
                onClick={handleCancel}
              />
              <ButtonAtom
                name={t('RECOVER')}
                className={classes.activeButtonNew}
                onClick={formik.handleSubmit}
              />
            </Grid>
            <Grid container className={classes.additionalHelp}>
              <Grid lg={2} />
              <Grid item xs={12} lg={4}>
                <Box display="flex" className={classes.helpText}>
                  {t('IF_ADDITIONAL_HELP')}
                </Box>

              </Grid>
              <Grid item xs={12} lg={4}>
                <Box display="flex" direction="row" alignItems="center" className={classes.contactUsMargin}>
                  <img alt="" src={callIcon} className={classes.imgSize} />
                  <Typography className={classes.contactUsDes}>
                    <a className={commonClasses.contactUsLinks} href="tel:+18446262334">1 (844) 626-BADI (2234)</a>
                  </Typography>
                </Box>

                <Box display="flex" direction="row" alignItems="center" className={classes.contactUsMargin}>
                  <img alt="" src={emailIcon} className={classes.imgSize} />
                  <Typography className={classes.contactUsDes}>
                    <a className={commonClasses.contactUsLinks} href="mailto:support@manabadi.siliconandhra.org">support@manabadi.siliconandhra.org</a>
                  </Typography>
                </Box>

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
      navigate('/');
    }
  };
  return (
    <Paper className={classes.root}>
      <Grid container>
        <img
          src={logo}
          width={441}
          alt="ManaBadi SiliconAndhra Logo"
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
            {renderForgotPassword()}
          </form>
        </Grid>

      </Grid>

      {showLoader && (
        <Grid>
          <Loader
            message={showMessage}
            dialogTitle={showDialogTitle}
            dialogHeader={showDialogHeader}
          />
        </Grid>
      )}
      <DialogAtom
        customClass={classes.dialogAtom}
        isOpen={isDialogOpen}
        dialogHeading={dialogTitle}
        secHandle={() => setDialogOpen(false)}
        content={<DialogContent data={message} header={dialogHeader} classes={classes} t={t} />}
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
