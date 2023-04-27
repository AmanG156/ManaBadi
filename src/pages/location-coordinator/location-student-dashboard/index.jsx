import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Switch, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../../../custom-hooks/useStyles';
import styles from './style';
import Dropdown from '../../../components/atoms/dropdown';
import MapPin from '../../../assets/images/map-pin.png';
import {
  getAssignedLocations,
  getLocationDetails,
} from '../../../store/actions/getLocationCoordinator';
import CoursesReport from './courses-report';
import TeachersReportWrapper from './teachers-report';
import BarChartEnrollmentBreakdown from './bar-chart-enrollment-breakdown';
import DonutChartEnrollmentBreakDown from './donut-chart-enrollment-breakdown';

export default function LocationDashboard() {
  const classes = useStyles(styles)();
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setLoading] = useState(false);
  const [locations, setLocationData] = useState([]);
  const [years, setYearsData] = useState([]);

  const [selectedLocation, setLocation] = useState('');
  const [year, setYear] = useState('');

  const locationCoordinatorData = useSelector((state) => state?.getLocationCoordinator);
  const assignedLocations = locationCoordinatorData?.assignedLocations;
  const assignedYears = locationCoordinatorData?.assignedYears;
  const locationDetails = locationCoordinatorData?.locationDetails;
  const dispatch = useDispatch();
  const [mailChecked, setMailChecked] = React.useState(true);

  const handleChange = (event) => {
    setMailChecked(event.target.checked);
  };

  useEffect(() => {
    setLocationData(assignedLocations);
    setYearsData(assignedYears);
    setLocation(assignedLocations[0]?.id);
    const currentYear = new Date().getFullYear();
    const selectedYear = assignedYears.filter((opt) => opt?.id.substring(0, 4) === currentYear.toString());
    setYear(selectedYear[0]?.id);
  }, [assignedLocations, assignedYears]);

  useEffect(() => {
    if (selectedLocation && year) {
      dispatch(getLocationDetails({ locationId: selectedLocation, year }));
    }
  }, [selectedLocation, year]);

  useEffect(() => {
    const loadFalse = () => setLoading(false);
    dispatch(getAssignedLocations(loadFalse));
  }, []);
  return (
    <Box className={classes.gridContainer}>
      <Grid container item className={classes.titleRow}>
        <Grid item>
          <Typography className={classes.headerTitle}>
            {t('LOCATION_DASHBOARD')}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.dropdowns}>
        <Grid xs={4} md={2} item className={classes.year}>
          <Dropdown
            minWidth="100%"
            label={t('YEAR')}
            labelId={t('YEAR')}
            id="year"
            name="year"
            value={year}
            handleChange={(e) => setYear(e.target.value)}
            options={years}
            customClass={classes.year}
            variant="standard"
          />
        </Grid>
        <Grid xs={8} md={4} className={classes.locationDropdown}>
          <Dropdown
            minWidth="100%"
            label={t('LOCATION')}
            id="location"
            name="location"
            value={selectedLocation}
            handleChange={(e) => setLocation(e.target.value)}
            options={locations}
            customClass={classes.locationDropdown}
            variant="standard"
            icon={<img src={MapPin} alt="" className={classes.mapPinImg} />}
          />
        </Grid>
        <Grid xs={3} md={3} className={classes.switchGrid}>
          <Typography className={classes.mailTag}>
            {t('Mails')}
          </Typography>
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item style={{ color: '#666' }}>Inactive</Grid>
            <Grid item>
              <Switch checked={mailChecked} onChange={handleChange} className={classes.switchButton} />
            </Grid>
            <Grid item style={{ color: mailChecked ? 'green' : 'black' }}>Active</Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box border={1} className={classes.locationDetailBox}>
        <Grid container item>
          <Grid xs={12} sm={6} md={2} lg={3} item className={classes.card}>
            <div className={classes.title}>
              {t('LOCATION')}
            </div>
            <p className={classes.cardContent}>{locationDetails.locationName}</p>
            <p className={classes.cardSubContent}>{locationDetails.locationAddress}</p>
          </Grid>
          <Grid className={classes.verticalDivider} />
          <Grid xs={5} sm={2.9} md={2} item className={classes.card}>
            <div className={classes.title}>
              {t('STUDENTS')}
            </div>
            <p className={classes.cardContent}>{locationDetails?.students || '--'}</p>

          </Grid>
          <Grid className={classes.verticalDivider} />
          <Grid xs={6} sm={2.9} md={2} item className={classes.card}>
            <div className={classes.title}>
              {t('Teachers')}
            </div>
            <p className={classes.cardContent}>{locationDetails.teacher}</p>
          </Grid>
          <Grid className={classes.verticalDivider} />
          <Grid xs={12} sm={4} md={2} item className={classes.card}>
            <div className={classes.title}>
              {t('Hours')}
            </div>
            <p className={classes.cardContent}>{locationDetails.scheduledHours}</p>
            <p className={classes.cardSubContent}>{locationDetails.scheduledDay}</p>
          </Grid>
          <Grid className={classes.verticalDivider} />
          <Grid xs={12} sm={6} md={2} item className={classes.cardLast}>
            <div className={classes.title}>
              {t('COORDINATOR_NAME')}
            </div>
            <p className={classes.cardContent}>{locationDetails.coordinatorName}</p>
            <p className={classes.cardSubContent}>{locationDetails.coordinatorEmail}</p>
            <p className={classes.cardSubContent}>{locationDetails.coordinatorPhoneNo}</p>
          </Grid>
        </Grid>
      </Box>
      <Grid container item justifyContent="space-between">
        <Grid xs={12} md={6} item className={classes.gridBorder}>
          <BarChartEnrollmentBreakdown location={selectedLocation} year={year} />
        </Grid>
        <Grid xs={12} md={5.8} item className={classes.gridBorder}>
          <DonutChartEnrollmentBreakDown location={selectedLocation} year={year} />
        </Grid>
      </Grid>

      <Grid container item justifyContent="space-between">
        <Grid xs={12} md={6} item className={classes.gridBorder}>
          <CoursesReport location={selectedLocation} year={year} />
        </Grid>
        <Grid xs={12} md={5.8} item className={classes.gridBorder}>
          <TeachersReportWrapper location={selectedLocation} year={year} />
        </Grid>
      </Grid>
    </Box>
  );
}
