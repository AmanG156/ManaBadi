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
import EditIcon from '@mui/icons-material/Edit';
import useStyles from '../../../../custom-hooks/useStyles';
import styles from './style';
import userRoles from '../../../../constant/userRoles';

export default function RoleManagerTable({ tableData, onEdit }) {
  const { t } = useTranslation();
  const classes = useStyles(styles)();

  const getPermisstionsValue = (permissions) => {
    let label = '';
    permissions.forEach((permission, index) => {
      label += `${permission.key}${index === permissions.length - 1 ? '' : ', '}`;
    });
    return label;
  };

  return (
    <TableContainer>
      <Table sx={12} aria-label="simple table">
        <TableHead className={classes.roleManagerTable}>
          <TableRow>
            <TableCell width="20%">{t('ROLE_NAME')}</TableCell>
            <TableCell align="left" width="15%">{t('STATUS')}</TableCell>
            <TableCell align="left" width="55%">{t('ROLE_PERMISSIONS')}</TableCell>
            <TableCell align="center" width="20%">{t('Actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.roleManagerTable}>
          {tableData?.map((row) => (
            <TableRow
              key={row?.name}
              sx={{
                '&:last-child td, &:last-child th': { borderBottom: 0 },
              }}
            >
              <TableCell component="th" scope="row" className={classes.oneLineRowName} width="20%">
                {row?.name}
              </TableCell>
              <TableCell align="left" width="15%">
                {`${row?.isActive ? 'Active' : 'Inactive'}`}
              </TableCell>
              <TableCell align="left" width="55%">
                {getPermisstionsValue(row?.permissions)}
              </TableCell>
              <TableCell align="center" width="20%">
                <EditIcon
                  className={classes.cursorPointer}
                  onClick={() => (row?.name !== userRoles.SUPER_ADMIN ? onEdit(row) : {})}
                  color={row?.name === userRoles.SUPER_ADMIN ? 'disabled' : ''}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {' '}
      </Table>
    </TableContainer>
  );
}
