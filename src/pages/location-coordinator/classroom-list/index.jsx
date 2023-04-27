/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';
import { useFormik } from 'formik';
import MapPin from '../../../assets/images/map-pin.png';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';
import Dropdown from '../../../components/atoms/dropdown';
import { getFormattedDate } from '../../../utils/methods';
import {
  CustomUnsortedIcon,
  CustomAscendingIcon,
  CustomDescendingIcon,
} from '../../../utils/commonUiComponent';
import getClassroomsData from './data';

function CustomToolbar({
  fileHeaders, rowData, t, fileName,
}) {
  const classes = useStyles(styles)();
  return (
    <div>
      {rowData?.length ? (
        <CSVLink
          className={classes.exportButton}
          headers={fileHeaders}
          data={rowData}
          filename={`${fileName}.csv`}
          target="_blank"
        >
          {t('EXPORT_TO_CSV')}
        </CSVLink>
      ) : null}
    </div>
  );
}

function Filters({
  formik,
  classes,
  t,
  fileHeaders,
  rowData,
  years,
  locations,
  fileName,
}) {
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
      <Grid item xs={6} lg={8.8} className={classes.locationDropdown}>
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
          icon={<img src={MapPin} alt="" className={classes.mapPinImg} />}
        />
      </Grid>
      <Grid>
        <CustomToolbar
          rowData={rowData}
          fileHeaders={fileHeaders}
          t={t}
          fileName={fileName}
        />
      </Grid>
    </Grid>
  );
}

export default function ClassroomList({
  setAddTeacher,
  onAddTeacherClick,
  setLoading,
  loading,
  refreshList,
  setClassroomListPayload,
}) {
  const classes = useStyles(styles)();
  const { t } = useTranslation();
  const displayPrimaryTeacher = (teacher) => (
    <span>
      <span className={classes.starIcon}>
        <StarRateIcon />
      </span>
      <span className={classes.primaryTeacher}>
        {`${teacher?.first_name} ${teacher?.last_name}`}
      </span>
      <br />
    </span>
  );
  const displayNonPrimaryTeacher = (teacher) => (
    <span className={classes.nonPrimaryTeacher}>
      {`${teacher?.first_name} ${teacher?.last_name}`}
    </span>
  );
  const validationSchema = Yup.object({});

  const locationCoordinatorData = useSelector(
    (state) => state?.getLocationCoordinator,
  );
  const classrooms = locationCoordinatorData?.classrooms;
  const assignedLocations = locationCoordinatorData?.assignedLocations;
  const assignedYears = locationCoordinatorData?.assignedYears;

  const [courseData, setCourseData] = useState(false);
  const [locations, setLocationData] = useState([]);
  const [years, setYearsData] = useState([]);
  const [fileName, setFileName] = useState(false);

  const [rowData, setRowData] = useState([]);
  const [fileHeaders] = useState([
    { label: 'Teacher name ', key: 'teachersName' },
    { label: 'Course Name', key: 'courseName' },
    { label: 'Section', key: 'section' },
    { label: 'Students', key: 'numberOfStudents' },
    { label: 'Classroom Link', key: 'classroomLink' },
  ]);

  const formik = useFormik({
    initialValues: {
      year: years ? years[0]?.id : [],
      location: locations ? locations[0]?.id : [],
    },
    validationSchema,
    onSubmit: () => {
      setLoading(true);
    },
  });

  useEffect(() => {
    setLocationData(assignedLocations);
    setYearsData(assignedYears);
    formik.setFieldValue('location', assignedLocations[0]?.id);
    const currentYear = new Date().getFullYear();
    const selectedYear = assignedYears.filter(
      (opt) => opt?.id.substring(0, 4) === currentYear.toString(),
    );
    formik.setFieldValue('year', selectedYear[0]?.id);
  }, [assignedLocations, assignedYears]);

  useEffect(() => {
    setCourseData(classrooms);
  }, [classrooms]);

  useEffect(() => {
    const locData = assignedLocations?.filter(
      (i) => i?.id === formik.values.location,
    );
    const date = getFormattedDate(new Date(), 'MMDDYYYY');

    const file = `${locData[0]?.name}-${formik.values.year}-${date}`;
    setFileName(file);
    const payload = {
      locationId: formik?.values?.location,
      year: formik?.values?.year,
    };
    if (payload?.locationId && payload?.year && setClassroomListPayload) {
      refreshList(payload);
      setClassroomListPayload(payload);
    }
  }, [formik?.values?.location, formik?.values?.year]);

  useEffect(() => {
    const rows = courseData ? getClassroomsData(courseData) : 0;
    // eslint-disable-next-line no-debugger
    if (rows) {
      const rowsToCSV = rows.map((element) => {
        if (element.class_teachers.includes(undefined)) {
          // eslint-disable-next-line no-param-reassign
          element.class_teachers = null;
          // eslint-disable-next-line no-param-reassign
          element.teachersName = '';
        }
        return element;
      });
      setRowData(rowsToCSV);
    }
  }, [courseData]);

  const columns = [
    {
      field: 'courseName',
      headerName: t('COURSE'),
      sortable: false,
      align: 'left',
      class: 'courseNameField',
      headerClassName: 'courseNameHeader',
      cellClassName: 'courseNameCell',
    },
    {
      field: 'section',
      headerName: t('SECTION'),
      sortable: false,
      align: 'left',
      class: 'courseNameField',
      headerClassName: 'centerHeader',
      cellClassName: 'centerCell',
    },
    {
      field: 'teachers',
      headerName: t('TEACHERS'),
      sortable: false,
      align: '',
      headerClassName: 'parentHeader',
      cellClassName: 'parentNameCell',
      renderCell: (rowCell) => rowCell?.row?.class_teachers?.length > 0
        && rowCell?.row?.class_teachers?.map((teacher) => {
          if (teacher?.user) {
            if (teacher?.is_primary) {
              return displayPrimaryTeacher(teacher?.user);
            }
            if (!teacher?.is_primary) {
              return displayNonPrimaryTeacher(teacher?.user);
            }
          }
          return true;
        }),
    },
    {
      field: 'numberOfStudents',
      headerName: t('STUDENTS'),
      sortable: false,
      align: 'left',
      headerAlign: 'left',
      headerClassName: 'centerHeader',
      cellClassName: 'centerCell',
    },
    {
      field: 'classroomLink',
      headerName: t('CLASSROOM'),
      sortable: false,
      align: 'left',
      headerAlign: 'left',
      headerClassName: 'centerHeader',
      cellClassName: 'classroomLink',

      renderCell: (cellValues) => (
        <a
          className={classes.classroomLink}
          target="_blank"
          href={cellValues.row.classroomLink}
          rel="noreferrer"
        >
          {t('GOOGLE_CLASSROOM')}
        </a>
      ),
    },
    {
      field: 'actions',
      headerName: t('ADD_TEACHER'),
      sortable: false,
      headerAlign: 'center',
      align: 'left',
      headerClassName: 'actionHeader',
      cellClassName: 'actionCell',
      renderCell: (rowInfo) => (
        <span
          className={classes.addIcon}
          onClick={() => {
            onAddTeacherClick(rowInfo?.row);
            setAddTeacher();
          }}
        >
          <AddIcon />
        </span>
      ),
    },
  ];
  return (
    <Grid container className={classes.studentDetails}>
      <Grid item xs={12}>
        <Filters
          {...{
            formik,
            classes,
            locations,
            years,
            t,
            rowData,
            fileHeaders,
            fileName,
          }}
        />
      </Grid>
      {courseData.length > 0 ? (
        <Grid item xs={11.8} md={11.8} className={classes.courseGrid}>
          <DataGrid
            rows={rowData}
            columns={columns}
            autoHeight
            hideFooter
            disableColumnFilter
            disableColumnSelector
            checkboxSelection={false}
            disableColumnMenu
            disableSelectionOnClick
            className={classes.dataGrid}
            components={{
              ColumnUnsortedIcon: CustomUnsortedIcon,
              ColumnSortedAscendingIcon: CustomAscendingIcon,
              ColumnSortedDescendingIcon: CustomDescendingIcon,
            }}
          />
        </Grid>
      ) : (courseData.length === 0) && !loading ? (
        <Grid container className={classes.noData}>
          <Grid item xs={12}>
            <DoNotDisturbIcon />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('NO_DATA')}
            </Typography>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
}
