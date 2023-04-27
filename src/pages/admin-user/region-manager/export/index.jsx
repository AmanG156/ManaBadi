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
import { exportRegionColumns } from '../constant';

export default function RegionExportDialog(props) {
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
      exportRegionColumns.forEach((ci) => selectedCheck.push(ci.id));
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

  const exportRegionList = (e) => {
    e.preventDefault();
    const headers = [];
    const preheaders = [];
    selectedColumn.forEach((head) => {
      const selColumn = exportRegionColumns.find((col) => col?.id === head); // filter selected head from all headers
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
      if (selectedColumn.includes('region')) {
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'region')] = elem.name;
      }
      if (selectedColumn.includes('geoRegion')) {
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'geoRegion')] = elem.geoRegion;
      }
      if (selectedColumn.includes('country')) {
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'country')] = elem.country;
      }
      if (selectedColumn.includes('coordinator')) {
        const coData = elem?.regionCoordinator.map((res) => [`${res.firstName} ${res.lastName}`]);
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'coordinator')] = coData;
      }
      if (selectedColumn.includes('enrollStatus')) {
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'enrollStatus')] = elem.enrollmentStatus ? 'Active' : 'Inactive';
      }
      if (selectedColumn.includes('status')) {
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'status')] = elem.isActive ? 'Active' : 'Inactive';
      }
      if (selectedColumn.includes('course')) {
        const courseData = elem?.region_courses.map((res) => [`${res.course.name}`]);
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'course')] = courseData;
      }
      if (selectedColumn.includes('feeStructure')) {
        let feeString = '';
        elem?.region_courses.forEach((res) => {
          feeString += ` ${res.fee.fee} ,`;
        });
        temp[selectedColumn.findIndex((selectedColumnData) => selectedColumnData === 'feeStructure')] = feeString.substring(0, feeString.length - 1);
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
      customClass={classes.regionExportDialogAtom}
      secHandle={onCancel}
      content={(
        <Grid className={classes.regionBox}>
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
                {exportRegionColumns?.map((obj) => (
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
              onClick={(e) => { exportRegionList(e); }}
            />
            <CSVLink
              data={dataForDownload}
              filename="Region-List.csv"
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
