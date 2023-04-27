import React from 'react';
import { CSVLink } from 'react-csv';
import { Grid, Tooltip } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PerformantDropdown } from '../../../components/atoms';
import styles from './style';
import MapPin from '../../../assets/images/map-pin.png';
import useStyles from '../../../custom-hooks/useStyles';
import { ColumnSelectIcon } from '../../../assets/svg';
import { NavigateRoutes } from '../../../constant';
import Constant from '../../../store/constant';
import { setLocalStorage } from '../../../utils/localStorageMethod';

function StudentHeader({
  formik,
  t,
  fileHeaders,
  years,
  locations,
  courseData,
  fileName,
  setDialogOpen,
  selectedRows,
  setError,
}) {
  const classes = useStyles(styles)();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  setLocalStorage('selectedLocation', '');
  setLocalStorage('selectedYear', '');

  const sendBulkEmail = () => {
    if (selectedRows.length > 0) {
      setError('');
      const emailList = [];
      const emailParents = [];
      selectedRows?.forEach((row) => {
        emailList.push(row?.studentInfo?.manabadiEmail);
        emailParents.push(row?.parent1Info?.personalEmail?.toString());
        emailParents.push(row?.parent2Info?.personalEmail?.toString());
      });
      dispatch({ type: Constant.RECIPIENTS, payload: emailList });
      dispatch({ type: Constant.MAIL_PARENTS, payload: emailParents });
      dispatch({ type: Constant.MAIL_FILTER, payload: 'Student' });
      setLocalStorage('selectedLocation', formik?.values?.locationId);
      setLocalStorage('selectedYear', formik?.values?.academicYear);
      setLocalStorage('showSelectAllinEmail', false);

      if (selectedRows.length > 0) {
        setLocalStorage('showLocationFilterRecipients', false);
        setLocalStorage('showLocationAnnouncementsRecipients', false);
      } else {
        setLocalStorage('showLocationFilterRecipients', false);
        setLocalStorage('showLocationAnnouncementsRecipients', false);
      }
      navigate(NavigateRoutes.LOCATION_COORDINATOR_EMAIL);
    } else {
      setError(t('SELECT_ATLEAST_ONE_STUDENT'));
    }
  };
  return (
    <Grid container spacing={2} direction="row" display="flex" alignItems="center">
      <FormikProvider value={formik}>
        <Grid item xs={4} sm={1.5} className={classes.year}>
          <PerformantDropdown
            minWidth="100%"
            label={t('YEAR')}
            labelId={t('YEAR')}
            id="academicYear"
            name="academicYear"
            value={formik.values.academicYear}
            handleChange={formik.handleChange}
            options={years}
            customClass="yearDropdown"
            variant="standard"
          />
        </Grid>
        <Grid item xs={8} sm={5} className={classes.locationDropdown}>
          <PerformantDropdown
            minWidth="100%"
            label={t('LOCATION')}
            id="locationId"
            name="locationId"
            value={formik.values.locationId}
            handleChange={formik.handleChange}
            options={locations}
            customClass="locationDropdown"
            variant="standard"
            icon={<img src={MapPin} alt="" className={classes.mapPinImg} />}
          />
        </Grid>
        <Grid item xs={3} className={classes.year}>
          <PerformantDropdown
            minWidth="100%"
            label={t('COURSE')}
            id="courseId"
            name="courseId"
            value={formik.values.academicYear}
            handleChange={formik.handleChange}
            options={courseData}
            customClass="courseDropdown"
            variant="standard"
          />
        </Grid>
        <Grid item md={0.8} />
        <Grid item xs={0.5} className={classes.gridActions}>
          {/* {selectedRows?.length ? ( */}
          <Tooltip title={t('DOWNLOAD')} placement="right">
            <div className={classes.header}>
              <CSVLink
                headers={fileHeaders}
                data={selectedRows}
                filename={`${fileName}.csv`}
                target="_blank"
              >
                <FileDownloadOutlinedIcon />

              </CSVLink>
            </div>
          </Tooltip>

          {/* ) : null} */}
        </Grid>
        <Grid item xs={0.5} className={classes.gridActions} onClick={sendBulkEmail}>
          <Tooltip title={t('SEND_EMAIL')} placement="right">
            <div className={classes.header}>
              <EmailOutlinedIcon className={classes.header} />
            </div>
          </Tooltip>
        </Grid>
        <Grid
          item
          xs={0.5}
          onClick={() => setDialogOpen(true)}
          className={classes.gridActions}
        >
          {' '}
          <Tooltip title={t('UPDATE_SETTINGS')} placement="right">
            <div>
              <ColumnSelectIcon
                customClass={classes.columnSelectionIcon}
                strokeColor="#104F96"
              />
            </div>
          </Tooltip>
        </Grid>
      </FormikProvider>
    </Grid>
  );
}

export default StudentHeader;
