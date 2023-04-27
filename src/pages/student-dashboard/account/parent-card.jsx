import React from 'react';
import { Divider, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import useStyles from '../../../custom-hooks/useStyles';
import style from './style';

function ParentCard(
  heading,
  title,
  firstName,
  middleName,
  lastName,
  email,
  contactNo,
  profession,
  company,
  setData,
) {
  const classes = useStyles(style)();

  const setTitle = (header) => (
    <Grid
      item
      container
      justifyContent="flex-start"
    >
      <Grid item xs={12} className={classes.titleContainer}>
        {header}
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
  const { t } = useTranslation();
  return (
    <Grid container justifyContent="flex-start" direction="row">
      {setTitle(heading, 11)}
      <Grid item xs={12} className={classes.parentName}>
        {`${title || ''}. ${firstName || ''}  ${middleName || ''} ${lastName || ''}`}
      </Grid>
      <Grid item xs={12}>
        {setData(t('EMAIL_ID'), email || '')}
      </Grid>
      <Grid item xs={12}>
        {setData(t('CONTACT_HASH'), formatPhoneNumberIntl(contactNo) || '')}
      </Grid>
      <Grid item xs={12}>
        {setData(t('PROFESSION'), profession || '')}
      </Grid>
      <Grid item xs={12}>
        {setData(t('NAME_OF_COMPANY'), company || '')}
      </Grid>
    </Grid>
  );
}

export default ParentCard;
