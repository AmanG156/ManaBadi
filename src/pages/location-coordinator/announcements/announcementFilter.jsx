import React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FormikProvider } from 'formik';

import useStyles from '../../../custom-hooks/useStyles';
import MapPin from '../../../assets/images/map-pin.png';
import { Button, PerformantDropdown } from '../../../components/atoms';
import commonStyle from '../../../utils/commonClasses';

export default function AnnouncementFilters({
  formik,
  classes,
  years = [],
  locations = [],
  onNewAnnouncement,
}) {
  const { t } = useTranslation();
  const commonClasses = useStyles(commonStyle)();

  return (
    <FormikProvider value={formik}>

      <Grid container direction="row" className={classes?.dropdowns}>
        <Grid item xs={4} sm={3} md={3} lg={2} className={classes?.year}>
          <PerformantDropdown
            minWidth="100%"
            label={t('YEAR')}
            labelId={t('YEAR')}
            id="year"
            name="year"
            value={formik.values.year}
            handleChange={formik.handleChange}
            options={years}
            customClass={classes?.year}
            variant="standard"
          />
        </Grid>
        <Grid item xs={8} sm={5} md={6} lg={8} className={classes?.location}>
          <PerformantDropdown
            maxWidth="50%"
            label={t('LOCATION')}
            labelId={t('LOCATION')}
            id="location"
            name="location"
            value={formik?.values?.location}
            handleChange={formik?.handleChange}
            options={locations}
            customClass={classes?.location}
            variant="standard"
            icon={<img src={MapPin} alt="" className={classes?.mapPinImg} />}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={2} className={classes?.year}>
          <Button
            id="submit"
            className={commonClasses.activeButton}
            onClick={onNewAnnouncement}
            name={t('NEW_ANNOUNEMENT')}
          />
        </Grid>
      </Grid>
    </FormikProvider>
  );
}
