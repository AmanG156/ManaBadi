import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, IconButton } from '@mui/material';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { NavigateRoutes } from '../../../constant';
import SwapCourseLocation from '../../admin-user/swap-course-location';
import { DialogAtom } from '../../../components/atoms';
import { getFormattedDate } from '../../../utils/methods';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';
import Loader from '../../../components/atoms/loader';
import DataGridProTable from '../../../components/atoms/data-grid-pro';
import { Student, SwapCourse } from './helper';
import StudentHeader from './header';
import { SwapCourseDialogFooter } from '../../admin-user/students/helper';
import { SwapIcon, MailIcon } from '../../../assets/svg';
import { getAllCourseService } from '../../../store/services/auth';
import Constant from '../../../store/constant';
import useLocationCoordinator from '../../../custom-hooks/useLocationCoordinator';
import { setLocalStorage } from '../../../utils/localStorageMethod';
import CommonProfileImage from '../../../components/molecules/common/CommonProfileImage';

export default function StudentList({
  setDialogOpen,
  setLoading,
  refreshList,
  loading,
  visibleFields,
  fileHeaders,
  marksOpen,
  setCourseData,
  courseData,
}) {
  const classes = useStyles(styles)();
  const { t } = useTranslation();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const validationSchema = Yup.object({});
  const coordinatorInfo = useLocationCoordinator();
  const students = coordinatorInfo?.students;
  const assignedLocations = coordinatorInfo?.assignedLocations;
  const assignedYears = coordinatorInfo?.assignedYears;
  const [rowData, setRowData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [gridLoading, setGridLoading] = useState(true);
  const [locations, setLocationData] = useState([]);
  const [years, setYearsData] = useState([]);
  const [fileName, setFileName] = useState(false);
  const [error, setError] = useState('');

  const [customForm, setCustomForm] = useState('');
  const [isSwapCourseDialog, setSwapCourseOrLocation] = useState(false);
  const [swapCourseLocationInfo, setCourseLocationInfo] = useState({
    studentId: '',
    studentName: '',
    acedemicYear: '',
    courseFrom: '',
    courseTo: '',
    locationFrom: '',
    locationTo: '',
    sectionFrom: '',
    sectionTo: '',
    changeLogs: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      academicYear: years[0]?.id,
      locationId: locations[0]?.id,
      courseId: '',
    },
    validationSchema,
    onSubmit: () => {
      setLoading(true);
    },
  });

  useEffect(() => {
    setStudentData(students);
    // setGridLoading(gridLoading);
  }, [students]);

  useEffect(() => {
    return () => {
      setStudentData([]);
      setRowData([]);
    };
  }, []);

  useEffect(() => {
    setLocationData(assignedLocations);
    setYearsData(assignedYears);
    formik.setFieldValue('locationId', assignedLocations[0]?.id);
    const currentYear = new Date().getFullYear();
    const selectedYear = assignedYears.filter((opt) => opt?.id.substring(0, 4) === currentYear.toString());
    formik.setFieldValue('academicYear', selectedYear[0]?.id);
  }, [assignedLocations, assignedYears]);

  const setSelectedCourse = (options) => {
    const isCourseExit = options?.some((course) => course?.id === formik.values?.courseId);
    if (!formik.values?.courseId && !isCourseExit) {
      formik.setFieldValue('courseId', options[0]?.id);
    }
  };
  // set Course Data as Location changes
  useEffect(() => {
    const payload = {
      locationId: formik?.values?.locationId || assignedYears[0]?.id,
    };
    if (payload?.locationId || assignedYears[0]?.id) {
      getAllCourseService(payload)
        .then((response) => {
          const options = [];
          response.data.forEach((option) => {
            options.push(option);
          });
          setSelectedCourse(options);
          setCourseData(options);
        })
        .catch(() => { });
    }
  }, [formik?.values?.locationId, assignedYears]);

  useEffect(() => {
    setError('');
    setGridLoading(true);
    setSelectedRows([]);
    const locData = assignedLocations?.filter(
      (i) => i?.id === formik.values.locationId,
    );
    const date = getFormattedDate(new Date());

    const file = `${locData[0]?.name}-${formik.values.academicYear}-${date}`;
    setFileName(file);
    const payload = {
      locationId: formik?.values?.locationId,
      academicYear: formik?.values?.academicYear,
      courseId: formik?.values?.courseId,
    };
    if (payload?.locationId && payload?.academicYear && payload?.courseId) {
      refreshList(payload);
    }
  }, [
    formik?.values?.locationId,
    formik?.values?.academicYear,
    formik?.values?.courseId,
  ]);

  useEffect(() => {
    const data = new Student(studentData);
    setRowData(data);
    setGridLoading(loading);
  }, [studentData]);

  const getMarksHeader = () => (
    <div>
      <span style={{ height: '5vh' }}>
        {t('MARKS')}
      </span>
      <div>{t('Q2')}</div>
    </div>
  );
  const getHomeworkHeader = () => (
    <div>
      <span style={{ height: '5vh', left: -14 }}>
        {t('HOMEWORK')}
      </span>
      <div>{t('Q2')}</div>
    </div>
  );
  const viewLogs = (onClose) => {
    onClose(false);
    navigate(NavigateRoutes.STUDENTS_LOGS);
  };

  const handleMoveStudent = () => {
    customForm.handleSubmit();
    setTimeout(() => {
      const payload = {
        locationId: formik?.values?.locationId,
        academicYear: formik?.values?.academicYear,
        courseId: formik?.values?.courseId,
      };
      refreshList(payload);
    }, 200);
  };

  const swapCourseDialogFooter = (
    <SwapCourseDialogFooter
      classes={classes}
      t={t}
      primaryHandle={handleMoveStudent}
      secHandle={() => setSwapCourseOrLocation(false)}
      viewLogs={viewLogs}
    />
  );
  const isChangeLogVisible = false;
  const swapCourseLocation = (
    <SwapCourseLocation
      {...{
        refreshList,
        setCourseLocationInfo,
        swapCourseLocationInfo,
        setCustomForm,
        setSwapCourseOrLocation,
        courseData,
        isChangeLogVisible,
      }}
    />
  );

  const [columns, setColumns] = useState();
  const getCellClass = (rowValue) => {
    if (Number(rowValue) < 0 || Number(rowValue) < 64) { return 'marksRedCell'; }
    if (Number(rowValue) < 65 || Number(rowValue) < 74) { return 'marksYellowCell'; }
    return 'marksGreenCell';
  };
  useEffect(() => {
    const columnsData = [
      {
        field: 'profilePhoto',
        headerName: t('PICTURES'),
        sortable: false,
        hide: !visibleFields?.includes(t('PICTURES')),
        renderCell: (rowInfo) => (
          // <img
          //   alt="avatar"
          //   className={classes.avatar}
          //   src={`${rowInfo?.row?.studentInfo?.profilePhoto}?${Date.now()}`}
          // />
          <CommonProfileImage
            key={rowInfo?.id}
            src={rowInfo?.row?.studentInfo?.profilePhoto}
          />
        ),
        headerClassName: 'pictureHeader',
        cellClassName: 'pictureCell',
      },
      {
        field: 'studentName',
        headerName: t('STUDENT_NAME'),
        hide: !visibleFields?.includes(t('STUDENT_NAME')),
        align: 'left',
        headerClassName: 'commonHeader',
        cellClassName: 'commonCell',
      },
      {
        field: 'parentName',
        headerName: t('PARENT_NAME'),
        hide: !visibleFields?.includes(t('PARENT_NAME')),
        align: 'left',
        headerClassName: 'commonHeader',
        cellClassName: 'commonCell',
      },
      {
        field: 'phoneNumber',
        hide: !visibleFields?.includes(t('CONTACT_NO')),
        headerName: t('CONTACT_NO'),
        align: 'left',
        headerClassName: 'commonHeader',
        cellClassName: 'commonCell',
      },
      {
        field: 'course',
        hide: !visibleFields?.includes(t('COURSE')),
        headerName: t('COURSE'),
        align: 'left',
        headerClassName: 'commonHeader',
        cellClassName: 'commonCell',
      },
      {
        field: 'section',
        hide: !visibleFields?.includes(t('SECTION')),
        headerName: t('SECTION'),
        align: 'left',
        headerClassName: 'commonHeader',
        cellClassName: 'commonCell',
      },
      {
        field: 'newReturning',
        hide: !visibleFields?.includes(t('NEW_RETURNING')),
        headerName: t('NEW_RETURNING'),
        align: 'left',
        headerClassName: 'commonHeader',
        cellClassName: 'commonCell',
      },
      {
        field: 'marksQ1',
        disableColumnResize: 'false',
        hide: !visibleFields?.includes(t('MARKS')),
        sortable: false,
        headerName: t('Q1'),
        align: 'left',
        headerClassName: 'marksHeader',
        cellClassName: (row) => getCellClass(row?.value),
        renderCell: (cellValues) => (
          <span className={classes.question} onClick={() => marksOpen(cellValues, 'marks', 'Q1')}>
            {cellValues?.value}
          </span>
        ),
      },
      {
        field: 'marksQ2',
        hide: !visibleFields?.includes(t('MARKS')),
        headerName: getMarksHeader(),
        disableColumnResize: 'false',
        align: 'left',
        headerClassName: 'marksHeaderSpan',
        cellClassName: (row) => getCellClass(row?.value),
        sortable: false,
        renderCell: (cellValues) => (
          <span className={classes.question} onClick={() => marksOpen(cellValues, 'marks', 'Q2')}>
            {cellValues?.row?.marksQ2}
          </span>
        ),
      },
      {
        field: 'marksQ3',
        hide: !visibleFields?.includes(t('MARKS')),
        headerName: t('Q3'),
        // headerClassName: 'marksHeader',
        cellClassName: (row) => getCellClass(row?.value),
        sortable: false,
        renderCell: (cellValues) => (
          <span className={classes.question} onClick={() => marksOpen(cellValues, 'marks', 'Q3')}>
            {cellValues?.row?.marksQ3}
          </span>
        ),
      },
      {
        field: 'homeworkQ1',
        hide: !visibleFields?.includes(t('HOMEWORK')),
        headerName: t('Q1'),
        // headerClassName: 'marksHeader',
        cellClassName: (row) => getCellClass(row?.value),
        sortable: false,
        renderCell: (cellValues) => (
          <span className={classes.question} onClick={() => marksOpen(cellValues, 'homework-marks', 'Q1')}>
            {cellValues?.row?.homeworkQ1}
          </span>
        ),
      },
      {
        field: 'homeworkQ2',
        hide: !visibleFields?.includes(t('HOMEWORK')),
        headerName: getHomeworkHeader(),
        headerClassName: 'marksHeaderSpan',
        cellClassName: (row) => getCellClass(row?.value),
        sortable: false,
        renderCell: (cellValues) => (
          <span className={classes.question} onClick={() => marksOpen(cellValues, 'homework-marks', 'Q2')}>
            {cellValues?.row?.homeworkQ2}
          </span>
        ),
      },
      {
        field: 'homeworkQ3',
        hide: !visibleFields?.includes(t('HOMEWORK')),
        sortable: false,
        headerName: t('Q3'),
        align: 'left',
        // headerClassName: 'marksHeader',
        cellClassName: (row) => getCellClass(row?.value),
        renderCell: (cellValues) => (
          <span className={classes.question} onClick={() => marksOpen(cellValues, 'homework-marks', 'Q3')}>
            {cellValues?.row?.homeworkQ3}
          </span>
        ),
      },
      {
        field: 'bonus',
        hide: !visibleFields?.includes(t('BONUS_MARKS')),
        sortable: false,
        headerName: t('BONUS_MARKS'),
        align: 'left',
        headerClassName: 'commonHeader',
        cellClassName: 'commonCell',
      },
      {
        field: 'grade',
        hide: !visibleFields?.includes(t('GRADE')),
        sortable: false,
        headerName: t('GRADE'),
        align: 'left',
        headerClassName: 'numberHeader',
        cellClassName: 'numberCell',
      },
      {
        field: 'gpa',
        hide: !visibleFields?.includes(t('GPA')),
        sortable: false,
        headerName: t('GPA'),
        align: 'left',
        headerClassName: 'numberHeader',
        cellClassName: 'numberCell',
      },
      {
        field: 'annualScore',
        hide: !visibleFields?.includes(t('ANNUAL_SCORE')),
        headerName: t('ANNUAL_SCORE'),
        align: 'left',
        headerClassName: 'commonHeader',
        cellClassName: 'commonCell',
      },
      {
        field: 'actions',
        hide: !visibleFields?.includes(t('ACTIONS')),
        headerName: t('ACTIONS'),
        sortable: false,
        headerAlign: 'left',
        align: 'left',
        headerClassName: 'commonHeader',
        cellClassName: 'actionCell',
        renderCell: (row) => (
          <span style={{ display: 'flex' }}>
            <span
              style={{ paddingRight: 5 }}
            >
              <IconButton onClick={() => {
                const data = new SwapCourse(row);
                setCourseLocationInfo(data);
                setSwapCourseOrLocation(true);
              }}
              >
                <SwapIcon />

              </IconButton>
            </span>
            <span>
              <IconButton
                onClick={() => {
                  const { manabadiEmail } = row.row.studentInfo;
                  const emailParents = [];
                  emailParents.push(row?.row?.parent1Info?.personalEmail?.toString());
                  emailParents.push(row?.row?.parent2Info?.personalEmail?.toString());
                  dispatch({ type: Constant.RECIPIENTS, payload: [manabadiEmail] });
                  dispatch({ type: Constant.MAIL_FILTER, payload: 'Student' });
                  dispatch({ type: Constant.MAIL_PARENTS, payload: emailParents });
                  setLocalStorage('selectedLocation', row.row.enrolled_courses[0].locationId);
                  setLocalStorage('selectedYear', row.row.enrolled_courses[0].academicYear);
                  setLocalStorage('showLocationFilterRecipients', false);
                  setLocalStorage('showLocationAnnouncementsRecipients', false);
                  setLocalStorage('showSelectAllinEmail', false);
                  navigate(NavigateRoutes.LOCATION_COORDINATOR_EMAIL);
                }}
              >
                <MailIcon />
              </IconButton>
            </span>
          </span>
        ),
      },
    ];
    setColumns(columnsData);
  }, [visibleFields]);
  const showDetail = () => {
    if (gridLoading || loading) {
      return (
        <Grid>
          <Loader message={t('LOADING')} />
        </Grid>
      );
    }
    if (studentData?.length > 0) {
      return (
        <Grid xs={12} md={12} mt={5} className={classes.studentsList}>
          <DataGridProTable
            data={rowData}
            columns={columns}
            autoHeight
            hideFooter
            disableColumnFilter
            disableColumnSelector
            checkboxSelection
            disableColumnMenu
            disableColumnResize
            disableSelectionOnClick
            ColumnUnsorted
            ColumnSortedAscending
            ColumnSortedDescending
            onSelectionModelChange={(ids) => {
              setError('');
              const selectedIDs = new Set(ids);
              const selectedData = rowData.filter((row) => selectedIDs.has(row.id));
              setSelectedRows(selectedData);
            }}
            loading={gridLoading}
          />
        </Grid>
      );
    }
    if (studentData?.length === 0) {
      return (
        <Grid container style={{ textAlign: 'center', height: '5vw', marginTop: '7vw' }} className={classes.noData}>
          <Grid item xs={12} justifyContent="center">
            <DoNotDisturbIcon />
          </Grid>
          <Grid item xs={12} justifyContent="center">
            <Typography variant="subtitle2" color="text.secondary">
              {t('NO_DATA')}
            </Typography>

          </Grid>
        </Grid>
      );
    }

    return null;
  };
  return (
    <Grid container>
      <Grid xs={12}>
        <StudentHeader
          {...{
            formik,
            locations,
            years,
            courseData,
            t,
            rowData,
            fileHeaders,
            fileName,
            setDialogOpen,
            selectedRows,
            setError,
          }}
        />
      </Grid>
      <Grid container spacing={2} direction="row" display="flex" alignItems="center">
        <span className={classes.errorText}>{error}</span>
      </Grid>
      {showDetail()}

      <DialogAtom
        secHandle={() => setSwapCourseOrLocation(false)}
        isOpen={isSwapCourseDialog}
        dialogHeading={t('SWAP_COURSE_LOCATION')}
        customClass={classes.swapCourseDialog}
        footer={swapCourseDialogFooter}
        content={swapCourseLocation}
      />
    </Grid>
  );
}
