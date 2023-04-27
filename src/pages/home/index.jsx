import * as React from 'react';
import Card from '@mui/material/Card';
import { useTranslation } from 'react-i18next';
import CardContent from '@mui/material/CardContent';
import { GoogleLogin } from 'react-google-login';
import { Box, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import constant from '../../constant/config';
import userRoles from '../../constant/userRoles';
import Button from '../../components/atoms/button';
import Loader from '../../components/atoms/loader';
import { NavigateRoutes } from '../../constant';
import useStyles from '../../custom-hooks/useStyles';
import Divider from '../../components/atoms/divider';
import styles from './style';
import logo from '../../assets/images/logo.png';
import commonStyle from '../../utils/commonClasses';
import DialogAtom from '../../components/atoms/dialog';
import { getLoginTokenService } from '../../store/services/auth';
import emailIcon from '../../assets/images/email-icon.png';
import callIcon from '../../assets/images/call-icon.png';
import videoIcon from '../../assets/images/video-icon.png';
import { setLocalStorage } from '../../utils/localStorageMethod';

export const axiosApiCall = (url, method, body = {}) => axios({
  method,
  url: `${constant.API_BASE_QA}${url}`,
  data: body,
});
function DialogContent() {
  const { t } = useTranslation('translation');
  return (
    <Grid container justifyContent="center">
      {t('VALID_CREDS')}
    </Grid>
  );
}
function DialogFooter({
  classes, handleDialog, t,
}) {
  const commonclasses1 = useStyles(commonStyle)();
  return (
    <Grid container className={classes.content} justifyContent="center">
      <Button
        name={t('OK')}
        onClick={handleDialog}
        btntype={commonclasses1.PRIMARY}
      />
    </Grid>
  );
}
function HomePage() {
  const { t } = useTranslation();
  const classes = useStyles(styles)();
  const commonclasses = useStyles(commonStyle)();
  const navigate = useNavigate();
  const [isLoginfailed, setFailureDialog] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onGoogleFailure = () => {
    navigate('/');
    setLoading(false);
  };

  const onGoogleSuccess = (response) => {
    const { accessToken } = response;
    setLoading(true);
    if (accessToken) {
      setLocalStorage('accessToken', JSON.stringify(response?.tokenObj));
      setFailureDialog(false);
      getLoginTokenService({ accessToken }).then((res) => {
        if (res?.tokenResponse?.status) {
          setLocalStorage('collapseListStudent', false);
          setLocalStorage('token', res.tokenResponse.JWT);
          setLocalStorage('username', `${res?.tokenResponse?.userInfo?.firstName} ${res?.tokenResponse?.userInfo?.lastName}`);
          setLocalStorage('profilePhoto', res?.tokenResponse?.userInfo?.profilePhoto);
          setLocalStorage('userEmailId', res?.tokenResponse?.userInfo?.manabadiEmail);
          setLocalStorage('userId', res?.tokenResponse.userInfo.id);
          setLocalStorage('adminBulkEmailUsers', '');
          const roles = res?.tokenResponse?.userInfo?.roles;
          if (roles.find((role) => role.name === userRoles.SUPER_ADMIN)) {
            setLocalStorage('userRole', userRoles.SUPER_ADMIN);
            navigate(NavigateRoutes.ADMIN_DASHBOARD);
            setLoading(false);
          } else if (roles.find((role) => role.name === userRoles.STUDENT)) {
            setLocalStorage('userRole', userRoles.STUDENT);
            navigate(NavigateRoutes.STUDENT_DASHBOARD);
            setLoading(false);
          } else if (roles.find((role) => role.name === userRoles.LOCATION_COORDINATOR)) {
            setLocalStorage('userRole', userRoles.LOCATION_COORDINATOR);
            navigate(NavigateRoutes.LOCATION_COORDINATOR_STUDENTS_DASHBOARD);
            setLoading(false);
          } else if (roles.find((role) => role.name === userRoles.REGION_COORDINATOR)) {
            setLocalStorage('userRole', userRoles.REGION_COORDINATOR);
            navigate(NavigateRoutes.DASHBOARD);
            setLoading(false);
          } else if (roles.find((role) => role.name === userRoles.TEACHER)) {
            setLocalStorage('userRole', userRoles.TEACHER);
            navigate(NavigateRoutes.TEACHER_VIEW);
            setLoading(false);
          } else {
            navigate(NavigateRoutes.LOGIN);
            setLoading(false);
          }
        } else {
          setFailureDialog(true);
          setLoading(false);
        }
      }).catch(() => {
        setLoading(false);
      });
    }
  };

  const handleDialog = () => {
    setFailureDialog(false);
    navigate('/');
  };
  return (
    <Box className={classes.mainHomeBox}>
      <Box>
        <img
          src={logo}
          alt="Manabadi"
          className={classes.headerLogo}
        />
      </Box>

      <Grid container display="flex" className={classes.wrapper}>
        { }
        <Grid
          item
          xs={12}
          md={7}
          lg={7}
          className={classes.cardLeft}
        />
        <Grid
          item
          xs={12}
          md={5}
          lg={5}
        >
          <Card className={classes.cardRight}>
            <CardContent>
              <Box style={{ marginTop: 5 }}>
                <span className={classes.returnText}>{t('RETURN')}</span>
              </Box>

              <Box
                className={classes.textMargin}
              >
                <GoogleLogin
                  clientId={constant.REACT_APP_GOOGLE_CLIENT_ID}
                  scope={constant.REACT_APP_GOOGLE_DRIVE_SCOPE}
                  buttonText={t('SIGN_IN_WITH_MANABADI_ID')}
                  onSuccess={onGoogleSuccess}
                  onFailure={onGoogleFailure}
                  className={classes.googleButton}
                  icon={false}
                  // isSignedIn
                  cookiePolicy="single_host_origin"
                  disabledStyle
                />
              </Box>
              <Box
                className={classes.smallTextMargin}
                onClick={() => navigate(NavigateRoutes.FORGOT_PASSWORD)}
              >
                <span className={classes.recoverPassword}>
                  {t('RECOVER_PASS')}
                </span>
              </Box>
              <Box
                className={classes.divider}
              >
                <Divider>or</Divider>
              </Box>
              <Box className={classes.googleButton}>
                <Button
                  name={t('NEW_REGISTER')}
                  onClick={() => navigate(NavigateRoutes.REGISTER)}
                />
              </Box>
              <Box className={classes.smallTextMargin}>
                <Grid container display="flex" className={classes.helpBox}>
                  <Grid
                    item
                    xs={12}
                    md={3}
                    lg={3}
                    className={classes.helpText}
                  >
                    <Typography>
                      {' '}
                      {t('NEED_HELP')}
                      {' '}
                    </Typography>
                    <Typography>
                      <a className={commonclasses.contactUsLinks} href="https://manabadi.siliconandhra.org/contact/" target="_blank" rel="noreferrer">Contact Us</a>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={9}
                    lg={9}
                    className={classes.contactUsBox}
                  >
                    <Box display="flex" direction="row" alignItems="center" className={classes.contactUsMargin}>
                      <img alt="" src={videoIcon} className={classes.helpImg} />
                      <Typography className={classes.contactUs}>
                        {t('REGISTER_VIDEOS')}
                      </Typography>
                    </Box>

                    <Box display="flex" direction="row" alignItems="center" className={classes.contactUsMargin}>
                      <img alt="" src={callIcon} className={classes.helpImg} />
                      <Typography className={classes.contactUsDes}>
                        { }
                        <a className={commonclasses.contactUsLinks} href="tel:+18446262334">1 (844) 626-BADI (2234)</a>
                      </Typography>
                    </Box>

                    <Box display="flex" direction="row" alignItems="center" className={classes.contactUsMargin}>
                      <img alt="" src={emailIcon} className={classes.helpImg} />
                      <Typography className={classes.contactUsDes}>
                        <a className={commonclasses.contactUsLinks} href="mailto:support@manabadi.siliconandhra.org">support@manabadi.siliconandhra.org</a>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          lg={1}
        />
      </Grid>
      <DialogAtom
        isOpen={isLoginfailed}
        dialogHeading={t('LOGIN_FAILED')}
        content={(<DialogContent />)}
        footer={(
          <DialogFooter
            classes={classes}
            handleDialog={handleDialog}
            navigate={navigate}
            t={t}
          />
        )}
      />
      {loading && (
        <Grid>
          <Loader message={t('LOADING')} />
        </Grid>
      )}
    </Box>
  );
}

export default HomePage;
