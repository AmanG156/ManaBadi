import * as React from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useStyles from '../../custom-hooks/useStyles';
import styles from './style';
import logo from '../../assets/images/logo.png';

function Login() {
  const classes = useStyles(styles)();
  const { t } = useTranslation();
  return (
    <Box>
      <Box>
        <img
          src={logo}
          alt="Italian Trulli"
          className={classes.headerLogo}
        />
      </Box>
      <Grid container display="flex" className={classes.wrapper}>
        <Box
          className={classes.textMargin}
        >
          {t('LOGIN_SUCCESSFULLY')}
        </Box>
      </Grid>

    </Box>
  );
}

export default Login;
