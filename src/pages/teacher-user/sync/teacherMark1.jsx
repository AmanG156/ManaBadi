import React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';
import SyncTable from './sync-table/syncTable';

export default function TeacherMarks1() {
  const { t } = useTranslation();
  const classes = useStyles(styles)();
  return (
    <Grid mb={1}>
      <Grid className={classes.filterCSV} mb={3}>
        <ul>
          <li>
            {t('SPREADSHEET')}
            :
            {' '}
            <span>Ashubam Prakasam-C (2021 - 2022) Sync Sheet</span>
          </li>
          <li>
            {t('SHEET')}
            :
            {' '}
            <span>Marks Q1</span>
          </li>
          <li>
            {t('CREATED_ON')}
            :
            {' '}
            <span>an hour ago</span>
          </li>
        </ul>
      </Grid>
      <Grid xs={12} mt={5}>
        <SyncTable />
      </Grid>
    </Grid>
  );
}
