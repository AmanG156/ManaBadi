import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Grid, Paper, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useStyles from '../../custom-hooks/useStyles';
import styles from './style';
import logo from '../../assets/images/logo.png';
import failierBoy from '../../assets/images/paymentFailed.png';

function Cancel() {
  const { t } = useTranslation();
  const classes = useStyles(styles)();
  const navigate = useNavigate();
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
              src={failierBoy}
              alt="Success"
              width={409}
              className={classes.successBackgroundImg}
            />
          </Grid>
          <Grid item justifyContent="center" xs={12} md={12} lg={12} className={classes.failedContent}>
            <Typography mb={2} className={classes.failedText}>
              {t('PAYMENT_FAILED_TEXT')}
            </Typography>
            <Typography
              mb={4}
              xs={3}
              md={3}
              lg={3}
              className={classes.successSubtext}
            >
              {t('PAYMENT_TRY_AGAIN')}
              {' '}
              <a href="/">{t('CLICK_HERE')}</a>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Cancel;
