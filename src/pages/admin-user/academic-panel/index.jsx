import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import styles from './styles';
import useStyles from '../../../custom-hooks/useStyles';
import Scheme from './Scheme';

function AcademicPanel() {
  const classes = useStyles(styles)();

  // to toggle b/w showing schema/assignment
  const [showScheme, setShowScheme] = useState(true);

  const { t } = useTranslation();

  return (
    <Box>
      <Box padding={3}>
        <Grid container item className={classes.titleRow}>
          <Grid item>
            <Typography className={classes.headerTitle}>
              {t('ACADEMIC_PANEL')}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box class={classes.contentCont}>
        <Box class={classes.sidebar}>
          <Box
            onClick={() => setShowScheme(true)}
            m={3}
            class={`${classes.sectionTitleCont} ${
              showScheme ? classes.selectedSection : ''
            }`}
          >
            <Typography
              className={`${classes.sectionTitle} ${
                showScheme ? classes.selectedSectionTitle : ''
              }`}
            >
              {t('SCHEMA.SCHEMA')}
            </Typography>
          </Box>
          <Box
            onClick={() => setShowScheme(false)}
            m={3}
            class={`${classes.sectionTitleCont} ${
              !showScheme ? classes.selectedSection : ''
            }`}
          >
            <Typography
              className={`${classes.sectionTitle} ${
                !showScheme ? classes.selectedSectionTitle : ''
              }`}
            >
              {t('ASSIGNMENT')}
            </Typography>
          </Box>
        </Box>
        <Box>{showScheme ? <Scheme /> : <div />}</Box>
      </Box>
      {/* other content */}
    </Box>
  );
}

export default AcademicPanel;
