import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Grid, Paper, Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { captureDonation, captureOrder } from '../../store/actions/getPayment';
import useStyles from '../../custom-hooks/useStyles';
import styles from './style';
import logo from '../../assets/images/logo.png';
import successBoy from '../../assets/images/successCheckout.png';
import { getLocalStorage } from '../../utils/localStorageMethod';
import { NavigateRoutes } from '../../constant';
import { getStudentAccountDetails } from '../../store/actions/getStudent';

function Success() {
  const registrationId = getLocalStorage('registrationId');
  const orderId = getLocalStorage('orderId');
  const isDonation = getLocalStorage('isDonation');

  const paymentFor = getLocalStorage('paymentFor');
  const donationPayload = {
    registrationId,
    orderId,
    isNewRegistration: paymentFor !== 'donation',
  };
  const payload = {
    registrationId,
    orderId,
    isNewRegistration: paymentFor !== 'sibling',
  };

  const enrollPayload = {
    registrationId,
    orderId,
    isNewEnrollment: true,
  };

  const { t } = useTranslation();
  const classes = useStyles(styles)();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onCaptureOrderSuccess = () => {
    if (paymentFor === 'sibling') {
      dispatch(getStudentAccountDetails());
    }
  };

  useEffect(() => {
    if (isDonation) {
      dispatch(captureDonation({ orderId: donationPayload?.orderId }));
    } else if (paymentFor === 'enroll') {
      dispatch(captureOrder(enrollPayload, onCaptureOrderSuccess));
    } else {
      dispatch(captureOrder(payload, onCaptureOrderSuccess));
    }
    setTimeout(() => {
      switch (paymentFor) {
        case 'sibling':
          navigate(NavigateRoutes.STUDENT_DASHBOARD);
          break;
        case 'donation':
          navigate(NavigateRoutes.STUDENT_DASHBOARD);
          break;
        case 'enroll':
          navigate(NavigateRoutes.STUDENT_DASHBOARD);
          break;
        default:
          navigate('/');
      }
    }, 5000);
  }, []);
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
      <Grid container justifyContent="space-between" className={classes.mainContainer}>
        <Grid item xs={11} lg={8} md={10} justifyContent="center" className={classes.cardRight}>
          <Grid container justifyContent="center">
            <img
              src={successBoy}
              alt="Success"
              width={409}
              className={classes.successBackgroundImg}
            />
          </Grid>
          <Grid item justifyContent="center" xs={12} md={12} lg={12} className={classes.successContent}>
            {paymentFor === 'donation' ? (
              <Grid>
                <Typography mb={2} className={classes.successText}>
                  {t('DONATION_SUCCESS_TEXT')}
                </Typography>
                <Typography mb={2} className={classes.successSubtextMail}>
                  {t('REDIRECT_STU_DASHBOARD')}
                  {' '}
                  <a href={NavigateRoutes.STUDENT_DASHBOARD}>{t('CLICK_HERE')}</a>
                </Typography>
              </Grid>
            )
              : (
                <Grid>
                  <Typography mb={2} className={classes.successText}>
                    {t('PAYMENT_SUCCESS_TEXT')}
                  </Typography>
                  <Typography mb={2} className={classes.successSubtextMail}>
                    {t('CHECK_MAIL')}
                  </Typography>
                  <Typography
                    mb={4}
                    xs={3}
                    md={3}
                    lg={3}
                    className={classes.successSubtext}
                  >
                    {t('PAYMENT_SUCCESS_REDIRECT')}
                    {' '}
                    <a href={NavigateRoutes.STUDENT_DASHBOARD}>{t('CLICK_HERE')}</a>
                  </Typography>
                </Grid>
              )}

          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Success;
