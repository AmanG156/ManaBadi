import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import useStyles from '../../../../custom-hooks/useStyles';
import styles from './style';

export default function ExamCenterManagerTable() {
  const { t } = useTranslation();
  const classes = useStyles(styles)();
  return (
    <TableContainer>
      <Table sx={12} aria-label="simple table">
        <TableHead className={classes.roleManagerTable}>
          <TableRow>
            <TableCell>{t('EXAM_LOCATION_NAME')}</TableCell>
            <TableCell align="left">{t('ADDRESS')}</TableCell>
            <TableCell align="center">{t('CITY')}</TableCell>
            <TableCell align="right">{t('STATUS')}</TableCell>
            <TableCell align="right">{t('Actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.roleManagerTable} />
      </Table>
    </TableContainer>
  );
}
