import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from '../../../../components/atoms';
import { getAssignedLocations } from '../../../../store/actions/getLocationCoordinator';
import useStyles from '../../../../custom-hooks/useStyles';
import styles from './style';
import { getLocalStorage, setLocalStorage } from '../../../../utils/localStorageMethod';

function Filters({
  formik,
  t,
}) {
  const [locations, setLocations] = useState([]);
  const [years, setYears] = useState([]);
  const locationCoordinatorData = useSelector((state) => state?.getLocationCoordinator);
  const assignedLocations = locationCoordinatorData?.assignedLocations;
  const assignedYears = locationCoordinatorData?.assignedYears;
  const dispatch = useDispatch();
  const selectedLocation = getLocalStorage('selectedLocation');
  const selectedYear = getLocalStorage('selectedYear');

  useEffect(() => {
    dispatch(getAssignedLocations(true));
  }, []);

  useEffect(() => {
    setLocations(assignedLocations);
    setYears(assignedYears);
    formik.setFieldValue('location', selectedLocation || assignedLocations[0]?.id);
    const currentYear = new Date().getFullYear();
    const defaultYear = assignedYears.filter((opt) => opt?.id.substring(0, 4) === currentYear.toString());
    formik.setFieldValue('year', selectedYear || defaultYear[0]?.id);
  }, [assignedLocations, assignedYears]);

  useEffect(() => {
    const location = assignedLocations.filter((loc) => loc.id === formik?.values?.location);
    setLocalStorage('selectedLocationName', location[0]?.shortName);
    setLocalStorage('selectedLocation', formik?.values?.location);
    setLocalStorage('selectedYear', formik?.values?.year);
  }, [formik?.values?.location, formik?.values?.year]);

  const classes = useStyles(styles)();

  return (
    <Grid container className={classes.dropdowns}>
      <Grid item xs={3} lg={1.2} className={classes.year}>
        <Dropdown
          minWidth="100%"
          label={t('YEAR')}
          labelId={t('YEAR')}
          id="year"
          name="year"
          value={formik.values.year}
          handleChange={formik.handleChange}
          options={years}
          customClass={classes.year}
          variant="standard"
        />
      </Grid>
      <Grid item xs={9} lg={8.8} className={classes.locationDropdown}>
        <Dropdown
          minWidth="100%"
          label={t('LOCATION')}
          id="location"
          name="location"
          value={formik.values.location}
          handleChange={formik.handleChange}
          options={locations}
          customClass={classes.locationDropdown}
          variant="standard"
        />
      </Grid>
    </Grid>
  );
}

export default Filters;
