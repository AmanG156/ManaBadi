import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import moment from 'moment';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';
import SyncHeader from './header';
import { getFormattedDate } from '../../../utils/methods';
import DataGridProTable from '../../../components/atoms/data-grid-pro';
import {
  getAssignedLocations, getSectionDetails,
} from '../../../store/actions/getLocationCoordinator';

export default function Classes() {
  const classes = useStyles(styles)();
  const { t } = useTranslation();

  const validationSchema = Yup.object({});
  const reduxStore = useSelector((state) => state?.getLocationCoordinator);
  const assignedLocations = reduxStore?.assignedLocations;
  const assignedYears = reduxStore?.assignedYears;
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [locations, setLocationData] = useState([]);
  const [years, setYearsData] = useState([]);
  const [fileName, setFileName] = useState(false);
  const [rowData, setRowData] = useState([]);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      academicYear: years[0]?.id,
      locationId: locations[0]?.id,
    },
    validationSchema,
    onSubmit: () => {
    },
  });

  useEffect(() => {
    setSelectedRows([]);
    dispatch(getAssignedLocations());
  }, []);

  useEffect(() => {
    setLocationData(assignedLocations);
    setYearsData(assignedYears);
    formik.setFieldValue('locationId', assignedLocations[0]?.id);
    formik.setFieldValue('academicYear', assignedYears[0]?.id);
  }, [assignedLocations, assignedYears]);

  useEffect(() => {
    if (formik.values.locationId && formik.values.academicYear) {
      dispatch(getSectionDetails({
        locationId: formik.values.locationId,
        year: formik.values.academicYear,
      }));
    }
  }, [formik.values.academicYear, formik.values.locationId]);

  useEffect(() => {
    const locData = assignedLocations?.filter(
      (i) => i?.id === formik.values.locationId,
    );
    const date = getFormattedDate(new Date());

    const file = `${locData[0]?.name}-${formik.values.academicYear}-${date}`;
    setFileName(file);
  }, [
    formik?.values?.locationId,
    formik?.values?.academicYear,
    formik?.values?.courseId,
  ]);

  useEffect(() => {
    let sectionDetails = reduxStore?.sectionDetails;
    sectionDetails = sectionDetails.map((section, index) => ({
      ...section.google_class,
      date_of_birth: moment(section.student.date_of_birth).format('YYYY-MM-DD'),
      course_name: section.course_name,
      studentInfo: section.student.studentInfo.first_name,
      parent1Info: section.student.parent1Info.first_name,
      id: index,
    }));
    setRowData(sectionDetails);
  }, [reduxStore?.sectionDetails]);

  const [columns, setColumns] = useState();

  useEffect(() => {
    const columnsData = [
      {
        field: 'studentInfo',
        headerName: t('STUDENT_NAME'),
        align: 'left',
        headerClassName: 'commonHeader',
        cellClassName: 'commonCell',
      },
      {
        field: 'date_of_birth',
        headerName: t('STUDENT_DOB'),
        align: 'left',
        headerClassName: 'commonHeader',
        cellClassName: 'commonCell',
      },
      {
        field: 'parent1Info',
        headerName: t('PARENT_NAME'),
        align: 'left',
        headerClassName: 'commonHeader',
        cellClassName: 'commonCell',
      },
      {
        field: 'course_name',
        headerName: t('COURSE'),
        align: 'left',
        headerClassName: 'commonHeader',
        cellClassName: 'commonCell',
      },
      {
        field: 'section',
        headerName: t('SECTION'),
        align: 'left',
        headerClassName: 'commonHeader',
        cellClassName: 'commonCell',
      },
    ];
    setColumns(columnsData);
  }, []);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Box className={classes.gridContainer}>
      <Grid container item className={classes.titleRow}>
        <Grid item>
          <Typography className={classes.headerTitle}>
            {t('SECTION_SYNC')}
          </Typography>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <SyncHeader
          {...{
            formik,
            locations,
            years,
            t,
            fileName,
            selectedRows,
            rowData,
          }}
        />
      </Grid>
      <Grid xs={12} mt={5}>
        { rowData.length ? (
          <DataGridProTable
            data={rowData}
            columns={columns}
            autoHeight
            hideFooter
            disableColumnFilter
            disableColumnSelector
            disableColumnMenu
            disableSelectionOnClick
            ColumnUnsorted
            ColumnSortedAscending
            ColumnSortedDescending
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedData = rowData.filter((row) => selectedIDs.has(row.id));
              setSelectedRows(selectedData);
            }}
          />
        ) : <div> No Data</div>}
      </Grid>
    </Box>
  );
}
