/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  useNavigate,
} from 'react-router-dom';

import Loader from '../../../components/atoms/loader';
import useStyles from '../../../custom-hooks/useStyles';
import styles from './style';
import AnnouncementFilters from './announcementFilter';
import {
  getAssignedLocations,
} from '../../../store/actions/getLocationCoordinator';
import {
  getAnnouncementList,
} from '../../../store/actions/getEmail';

import AnnouncementsTable from './announcements-table';
import AnnouncementDialog from './announcement-dialog/announcementDialog';
import { NavigateRoutes } from '../../../constant';
import Constant from '../../../store/constant';
import { setLocalStorage } from '../../../utils/localStorageMethod';

export default function Announcements() {
  const [loading, setLoading] = useState(false);
  const classes = useStyles(styles)();
  const dispatch = useDispatch();
  const locationCoordinatorData = useSelector((state) => state?.getLocationCoordinator);
  const assignedLocations = locationCoordinatorData?.assignedLocations;
  const assignedYears = locationCoordinatorData?.assignedYears;
  const announcements = locationCoordinatorData?.announcements;
  const [selectedLocationName, setSelectedLocationName] = useState('');
  const navigate = useNavigate();
  const [showAnnouncementDialog, setShowAnnouncementDialog] = useState(false);
  const { t } = useTranslation();
  const validationSchema = Yup.object({
  });
  useEffect(() => {
    const loadFalse = () => setLoading(false);
    dispatch(getAssignedLocations(loadFalse));
  }, []);

  const formik = useFormik({
    initialValues: {
      year: assignedYears && assignedYears.length ? assignedYears[0]?.id : '',
      location: assignedLocations && assignedLocations.length ? assignedLocations[0]?.id : '',
    },
    validationSchema,
    onSubmit: () => {
    },
  });

  useEffect(() => {
    formik.setFieldValue('location', assignedLocations[0]?.id);
    setSelectedLocationName(assignedLocations[0]?.shortName);
  }, [assignedLocations]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const selectedYear = assignedYears.filter((opt) => opt?.id.substring(0, 4) === currentYear.toString());
    formik.setFieldValue('year', selectedYear[0]?.id);
  }, [assignedYears]);

  useEffect(() => {
    if (formik && formik.values && formik.values.location && formik.values.year) {
      const selectedLocation = assignedLocations.filter((loc) => loc.id === formik?.values?.location);
      setSelectedLocationName(selectedLocation[0]?.shortName);
      const payload = {
        locationId: formik?.values?.location,
        academicYear: formik?.values?.year,
      };
      dispatch(getAnnouncementList(payload));
    }
  }, [formik?.values?.year, formik?.values?.location]);

  const [selectedAnnouncement, setSelectedAnnouncement] = useState();

  return (
    <Box className={classes.gridContainer}>
      <Grid container item className={classes.titleRow}>
        <Grid item>
          <Typography className={classes.headerTitle}>
            {t('ANNOUNCEMENTS')}
          </Typography>
        </Grid>
      </Grid>
      <AnnouncementFilters
        formik={formik}
        classes={classes}
        locations={assignedLocations}
        years={assignedYears}
        onNewAnnouncement={() => {
          dispatch({ type: Constant.RECIPIENTS, payload: [] });
          dispatch({ type: Constant.MAIL_FILTER, payload: 'Location' });
          setLocalStorage('selectedLocation', formik?.values?.location);
          setLocalStorage('selectedLocationName', selectedLocationName);
          setLocalStorage('selectedYear', formik?.values?.year);
          setLocalStorage('showLocationFilterRecipients', false);
          setLocalStorage('showLocationAnnouncementsRecipients', true);
          setLocalStorage('showSelectAllinEmail', false);
          navigate(NavigateRoutes.LOCATION_COORDINATOR_EMAIL);
        }}
      />
      <Grid container className={classes.announcementsContainer}>
        <Grid container className={classes.announcementsList}>
          <Grid className={classes.tableView}>
            <AnnouncementsTable
              key={announcements}
              tableData={announcements}
              onAnnouncementView={(row) => {
                setSelectedAnnouncement(row);
                setShowAnnouncementDialog(true);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <AnnouncementDialog
        isOpen={showAnnouncementDialog}
        onDialogClose={() => setShowAnnouncementDialog(false)}
        selectedAnnouncement={selectedAnnouncement}
      />
      {loading && (
        <Grid>
          <Loader message={t('LOADING')} />
        </Grid>
      )}
    </Box>
  );
}
