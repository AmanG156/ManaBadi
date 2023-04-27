import React, { useEffect, useState } from 'react';
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
import { GetAllLocations, GetOnlyActiveLocations } from '../helper';

export default function LocationManagerTable(props) {
  const {
    openEditLocation,
    setSelectedRow,
    setDialogHeader,
    setIsEdit,
    locationStore,
    searchValue,
    deactivatedStatus,
  } = props;
  const { t } = useTranslation();
  const classes = useStyles(styles)();
  const assignedLocations = locationStore.locations;
  const [locationsData, setLocationsData] = useState([]);

  useEffect(() => {
    let locations = locationsData;
    if (deactivatedStatus) {
      locations = new GetAllLocations(assignedLocations);
    } else {
      locations = new GetOnlyActiveLocations(assignedLocations);
    }
    if (searchValue) {
      locations = locations.filter((location) => location.name?.toLowerCase().includes(searchValue.toLowerCase())
        || location.locationCoordinator?.toLowerCase().includes(searchValue.toLowerCase())
        || location.city?.toLowerCase().includes(searchValue.toLowerCase())
        || location.address?.toLowerCase().includes(searchValue.toLowerCase()));
    }
    setLocationsData(locations);
  }, [searchValue]);

  useEffect(() => {
    if (deactivatedStatus) {
      const locations = new GetAllLocations(assignedLocations);
      setLocationsData(locations);
    } else {
      const locations = new GetOnlyActiveLocations(assignedLocations);
      setLocationsData(locations);
    }
  }, [assignedLocations, deactivatedStatus]);

  const onEdit = (row) => {
    const selectedRow = [];
    selectedRow.push(row);
    setSelectedRow(selectedRow);
    setDialogHeader(t('EDIT_LOCATION'));
    setIsEdit(true);
    openEditLocation(true);
  };

  return (
    <TableContainer>
      <Table sx={12} aria-label="simple table">
        <TableHead className={classes.locationManagerTable}>
          <TableRow>
            <TableCell align="left" width="20%">{t('LOCATION_NAME')}</TableCell>
            <TableCell align="left" width="20%">{t('CO_ORDINATOR')}</TableCell>
            <TableCell align="left" width="10%">{t('CITY')}</TableCell>
            <TableCell align="left" width="25%">{t('ADDRESS')}</TableCell>
            <TableCell align="left" width="10%">{t('STATUS')}</TableCell>
            <TableCell align="center" width="10%">{t('ACTION')}</TableCell>
          </TableRow>
        </TableHead>
        {locationsData?.length > 0
          ? (
            <TableBody className={classes.locationManagerTable}>
              {locationsData.map((row, index) => (
                <TableRow
                  key={`${row?.name}-${index}`}
                  sx={{
                    '&:last-child td, &:last-child th': { borderBottom: 0 },
                  }}
                >
                  <TableCell align="left" component="th" scope="row">
                    {row?.name}
                  </TableCell>
                  <TableCell align="left">{row?.locationCoordinator}</TableCell>
                  <TableCell align="left">{row?.city || '--'}</TableCell>
                  <TableCell align="left">{row?.address}</TableCell>
                  <TableCell align="left">{`${row?.isActive ? t('ACTIVE_STATUS') : t('INACTIVE_STATUS')}`}</TableCell>
                  <TableCell align="center">
                    <EditIcon
                      className={classes.cursorPointer}
                      onClick={() => {
                        onEdit(row);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            ' '
          )}

        {' '}
      </Table>
    </TableContainer>
  );
}
