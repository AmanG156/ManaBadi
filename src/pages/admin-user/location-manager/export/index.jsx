/* eslint-disable no-shadow */
import React, { useState, useRef, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CSVLink } from 'react-csv';

import { DialogAtom } from '../../../../components/atoms';
import ButtonAtom from '../../../../components/atoms/button';
import { Buttons } from '../../../../constant';
import { useStyles } from './style';
import CheckboxAtom from '../../../../components/atoms/checkbox';
import { exportLocationColumns } from '../constant';

export default function LocationExportDialog(props) {
  const { show, setShow, data } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState([]);
  const [dataForDownload, setDataForDownload] = useState([]);
  const [bDownloadReady, setDownloadReady] = useState(false);
  const csvLink = useRef();
  useEffect(() => {
    if (csvLink && csvLink.current && bDownloadReady) {
      csvLink.current.link.click();
      setDownloadReady(false);
    }
  }, [bDownloadReady]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const selectedCheck = [];
      exportLocationColumns.forEach((ci) => selectedCheck.push(ci.id));
      setSelectedColumn(selectedCheck);
    } else {
      setSelectedColumn([]);
    }
    setIsCheckAll(e.target.checked);
  };

  const handleCheck = (event, item) => {
    const { checked } = event.target;
    if (event.target.checked) {
      setSelectedColumn([...selectedColumn, item.id]);
    }
    if (!checked) {
      setSelectedColumn(selectedColumn.filter((value) => value !== item.id));
    }
  };

  const exportLocationList = (e) => {
    e.preventDefault();
    const headers = [];
    const preheaders = [];
    selectedColumn.forEach((head) => {
      const selColumn = exportLocationColumns.find((col) => col?.id === head); // filter selected head from all headers
      preheaders.push(selColumn.label);
    });
    preheaders.reverse().forEach((headersData) => {
      if (preheaders.includes(headersData)) {
        headers.unshift(headersData);
      }
    });

    const bodyData = [];
    data?.forEach((elem) => {
      const temp = [];
      if (selectedColumn.includes('location')) {
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'location')] = elem.name;
      }
      if (selectedColumn.includes('coordinator')) {
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'coordinator')] = elem.locationCoordinator;
      }
      if (selectedColumn.includes('city')) {
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'city')] = elem.city;
      }
      if (selectedColumn.includes('locationaddress')) {
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'locationaddress')] = elem.address;
      }
      if (selectedColumn.includes('shippingaddress')) {
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'shippingaddress')] = elem.shippingAddress;
      }
      if (selectedColumn.includes('examcenter')) {
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'examcenter')] = elem.examCenter;
      }
      if (selectedColumn.includes('region')) {
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'region')] = elem.region;
      }
      if (selectedColumn.includes('contactnumber')) {
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'contactnumber')] = elem.contactNumber;
      }
      if (selectedColumn.includes('starttime')) {
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'starttime')] = elem.startTime;
      }
      if (selectedColumn.includes('endtime')) {
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'endtime')] = elem.endTime;
      }
      if (selectedColumn.includes('activecourses')) {
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'activecourses')] = elem.activeCourses;
      }
      if (selectedColumn.includes('dayofclass')) {
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'dayofclass')] = elem.classTiming;
      }
      if (selectedColumn.includes('status')) {
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'status')] = elem.isActive ? 'Active' : 'Inactive';
      }
      if (selectedColumn.includes('examcenterstatus')) {
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'examcenterstatus')] = elem.isActiveExamCenter ? 'Active' : 'Inactive';
      }
      bodyData.push(temp);
    });
    setDataForDownload([headers, ...bodyData]);
    setDownloadReady(true);
    setSelectedColumn([]);
    setIsCheckAll(false);
    setShow();
  };

  const onCancel = () => {
    setIsCheckAll(false);
    setSelectedColumn([]);
    setShow();
  };

  return (
    <DialogAtom
      isOpen={show}
      dialogHeading={t('EXPORT_CSV')}
      customClass={classes.locationExportDialogAtom}
      secHandle={onCancel}
      content={(
        <Grid className={classes.locationBox}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <Grid container className={classes.selectAll}>
              <Grid item>
                <CheckboxAtom
                  label={t('SELECT_ALL')}
                  id="acceptCheckbox"
                  checked={isCheckAll}
                  handleChange={handleSelectAll}
                  customClasses="columnCheckBox"
                />
              </Grid>
              <div>&nbsp;</div>
            </Grid>
            <Grid className={classes.checkbox}>
              <Grid container className={classes.checkboxContent}>
                {exportLocationColumns?.map((obj) => (
                  <Grid item xs={6} md={2.4}>
                    <CheckboxAtom
                      customClasses="columnCheckBox"
                      checked={selectedColumn.includes(obj.id)}
                      value={obj.id}
                      label={obj.label}
                      handleChange={(e) => handleCheck(e, obj)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={12} className={`${classes.dialogButtons} ${classes.popupButton}`}>
            <ButtonAtom
              className={classes.popupBtn}
              name={t('CANCEL')}
              onClick={onCancel}
              btntype={Buttons.SECONDARY}
            />
            <ButtonAtom
              className={classes.popupBtn}
              name={t('EXPORT_TO_NEW_SHEET')}
              btntype={Buttons.PRIMARY}
              onClick={(e) => { exportLocationList(e); }}
            />
            <CSVLink
              data={dataForDownload}
              filename="Location-List.csv"
              className="hidden"
              ref={csvLink}
              target="_blank"
            />
          </Grid>
        </Grid>
)}
    />
  );
}
