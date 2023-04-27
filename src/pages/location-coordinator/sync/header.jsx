import React, { useEffect, useState, useRef } from 'react';
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { CSVLink } from 'react-csv';
import { PerformantDropdown } from '../../../components/atoms';
import styles from './style';
import MapPin from '../../../assets/images/map-pin.png';
import useStyles from '../../../custom-hooks/useStyles';
import ButtonAtom from '../../../components/atoms/button';
import { Buttons } from '../../../constant';

function SyncHeader({
  formik,
  t,
  years,
  locations,
  rowData,
}) {
  const classes = useStyles(styles)();
  const csvLink = useRef();

  const [dataForDownload, setDataForDownload] = useState([]);
  const [bDownloadReady, setDownloadReady] = useState(false);

  useEffect(() => {
    if (csvLink && csvLink.current && bDownloadReady) {
      csvLink.current.link.click();
      setDownloadReady(false);
    }
  }, [bDownloadReady]);

  const handleAction = (actionType) => {
    if (actionType === 'DOWNLOAD') {
      // get data here
      const headers = ['Student_Info', 'Date_of_Birth', 'Parent_Info', 'Course_Name', 'Section'];
      const data1 = rowData.map((elem) => {
        const data = [elem.studentInfo, elem.date_of_birth, elem.parent1Info, elem.course_name, elem.section];
        return data;
      });
      const result = [headers, ...data1];

      setDataForDownload(result);
      setDownloadReady(true);
    }
  };

  return (
    <Grid container spacing={2} direction="row" display="flex" alignItems="center">
      <FormikProvider value={formik}>
        <Grid item xs={4} sm={2} md={2} lg={2}>
          <PerformantDropdown
            minWidth="100%"
            label={t('YEAR')}
            labelId={t('YEAR')}
            id="academicYear"
            name="academicYear"
            value={formik.values.academicYear}
            handleChange={formik.handleChange}
            options={years}
            customClass="studentDropdown"
            variant="standard"
          />
        </Grid>
        <Grid item xs={8} sm={5} md={3} lg={6} className={classes.location}>
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
        <Grid item xs={6} sm={4} md={2.5} lg={2}>
          <ButtonAtom
            btntype={Buttons.PRIMARY}
            className={classes.secButton}
            name={t('EXPORT_TO_SHEET')}
            onClick={() => handleAction('DOWNLOAD')}
          />
          <CSVLink
            data={dataForDownload}
            filename="data.csv"
            className="hidden"
            ref={csvLink}
            target="_blank"
          />
          <span className={classes.agoText}>{t('LAST_A_FEW_SECONDS_AGO')}</span>
        </Grid>
        <Grid item xs={6} md={2.5} lg={2}>
          <ButtonAtom
            btntype={Buttons.PRIMARY}
            className={classes.secButton}
            name={t('IMPORT_FROM_SHEET')}
          />
          <span className={classes.agoText}>{t('LAST_MONTHS_AGO')}</span>
        </Grid>
        <Grid className={classes.filterCSV}>
          <ul>
            <li>
              {t('SPREADSHEET')}
              :
              {' '}
              <span>Ashubam (2021 - 2022) Sync Sheet</span>
            </li>
            <li>
              {t('SHEET')}
              :
              {' '}
              <span>Section Sync</span>
            </li>
            <li>
              {t('CREATED_ON')}
              :
              {' '}
              <span>3 Months ago</span>
            </li>
          </ul>
        </Grid>
      </FormikProvider>
    </Grid>
  );
}

export default SyncHeader;
