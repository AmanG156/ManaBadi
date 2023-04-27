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
import RegionTableCell from './region-table-cell';
import { GetSortOrder } from '../../../../components/atoms/tabel/utils';

export default function RegionManagerTable(props) {
  const { tableData, onEdit } = props;
  const { t } = useTranslation();
  const classes = useStyles(styles)();

  const getRow = (row) => {
    row?.region_courses?.forEach((res) => {
      (res.level = res?.course?.level);
    });
    row?.region_courses?.sort(GetSortOrder('level'));
    return row;
  };

  return (
    <TableContainer>
      <Table sx={12} aria-label="simple table">
        <TableHead className={classes.regionManagerTable}>
          <TableRow>
            <TableCell align="left" width="15%">{t('REGION')}</TableCell>
            <TableCell align="left" width="15%">{t('GEO_REGION')}</TableCell>
            <TableCell align="left" width="10%">{t('COUNTRY')}</TableCell>
            <TableCell align="left" width="22%">{t('CO_ORDINATOR')}</TableCell>
            <TableCell align="left" width="9%">{t('ENROLL_STATUS')}</TableCell>
            <TableCell align="left" width="9%">{t('STATUS')}</TableCell>
            <TableCell align="left" width="14%">{t('COURSES')}</TableCell>
            <TableCell align="center" width="15%">{t('ACTIONS')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.regionManagerTable}>
          {tableData?.map((row) => (
            <TableRow
              key={row?.name}
              sx={{
                '&:last-child td, &:last-child th': { borderBottom: 0 },
              }}
            >
              <TableCell align="left" component="th" scope="row" width="15%">
                {row?.name}
              </TableCell>
              <TableCell align="left" component="th" scope="row" width="15%">
                {row?.geoRegion}
              </TableCell>
              <TableCell align="left" width="10%">{`${row?.country}`}</TableCell>
              <TableCell align="left" width="22%">
                {row?.region_coordinators?.map((ele, i) => (`${ele?.user?.first_name} ${ele.user?.last_name}${i !== row.region_coordinators.length - 1 ? ', ' : ''}`))}
              </TableCell>
              <TableCell align="left" width="9%">{row?.enrollmentStatus ? 'Active' : 'Inactive'}</TableCell>
              <TableCell align="left" width="9%">{row?.isActive ? 'Active' : 'Inactive'}</TableCell>
              <RegionTableCell
                rowData={getRow(row)}
                onEdit={onEdit}
                upButtonClass={classes.upbutton}
              />
            </TableRow>
          ))}
        </TableBody>
        {' '}
      </Table>
    </TableContainer>
  );
}
