import React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ReactTooltip from 'react-tooltip';
import styles from '../style';
import useStyles from '../../../../custom-hooks/useStyles';
import './calendarStyle.css';
import GoogleCalendarChart from './googleCalendarChart';

function EnrollmentBreakdownAcrossYear({ data }) {
  const chartData = data?.filter((obj) => obj.year === 2023 || obj.year === 2022 || obj.year === 2021 || obj.year === 2020);
  const classes = useStyles(styles)();
  const { t } = useTranslation();
  return (
    <Grid container>
      <div className={classes.heading}>
        {t('ENROLLMENT_BREAKDOWN1')}
      </div>
      <Grid container>
        <Grid xs={12} className={classes.calenderDiv}>
          <GoogleCalendarChart data={chartData} />
          <ReactTooltip />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default EnrollmentBreakdownAcrossYear;
