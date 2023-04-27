import React, { useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FormikProvider } from 'formik';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';
import { PerformantDropdown } from '../../../components/atoms';
import ButtonAtom from '../../../components/atoms/button';
import { Buttons } from '../../../constant';
import TeacherMarks1 from './teacherMark1';
import TeacherMarks2 from './teacherMark2';
import TeacherMarks3 from './teacherMark3';
// import SyncTable from './sync-table/syncTable';
// import commonStyle from '../../../utils/commonClasses';

export default function SyncFilters({
  formik,
  // classes,
  years = [],
  //   courses = [],
  classWeeks = [],
  //   noOfAbsentStudents,
  //   isAttendanceRecording,
  // setIsAttendanceRecording,
}) {
  const { t } = useTranslation();
  // const commonClasses = useStyles(commonStyle)();
  const classes = useStyles(styles)();
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <FormikProvider value={formik}>
      <Grid container direction="row" className={classes.dropdowns}>
        <Grid item xs={2} className={classes.year}>
          <PerformantDropdown
            minWidth="100%"
            label={t('YEAR')}
            labelId={t('YEAR')}
            id="year"
            name="year"
            value={formik.values.year}
            handleChange={formik.handleChange}
            options={years}
            customClass={classes?.year}
            variant="standard"
          />
        </Grid>
        <Grid item xs={2} className={classes.year}>
          <PerformantDropdown
            minWidth="100%"
            label={t('LOCATION')}
            id="locationId"
            name="locationId"
            value={formik.values.locationId}
            handleChange={formik.handleChange}
            // options={locations}
            customClass="locationDropdown"
            variant="standard"
            // icon={<img src={MapPin} alt="" style={{ marginRight: '10px' }} className={classes.mapPinImg} />}
          />
        </Grid>
        <Grid item xs={6} className={classes.year}>
          <PerformantDropdown
            maxWidth="50%"
            label={t('CLASS_WEEK')}
            labelId={t('CLASS_WEEK')}
            id="classWeek"
            name="classWeek"
            value={formik?.values?.classWeek}
            handleChange={formik?.handleChange}
            options={classWeeks}
            customClass={classes?.year}
            variant="standard"
          />
        </Grid>
        <Grid item xs={2} className={classes.year}>
          <ButtonAtom
            btntype={Buttons.PRIMARY}
            className={classes.secButton}
            name={t('EXPORT_TO_SHEET')}
          />
          <Typography
            variant="caption"
            style={{ marginLeft: '40px', color: 'blue' }}
          >
            Last a few seconds ago
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.year}>
          <Box className={classes.direction}>
            <Grid mt={1} xs={12}>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Marks Q1" value="1" />
                      <Tab label="Marks Q2" value="2" />
                      <Tab label="Marks Q3" value="3" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <TeacherMarks1 />
                  </TabPanel>
                  <TabPanel value="2">
                    <TeacherMarks2 />
                  </TabPanel>
                  <TabPanel value="3">
                    <TeacherMarks3 />
                  </TabPanel>
                </TabContext>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </FormikProvider>
  );
}
