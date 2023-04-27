import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';
import DialogAtom from '../../../components/atoms/dialog';
import StudentsList from '../students-list';
import SelectColumns from '../select-columns';
import {
  getAssignedLocations,
  getStudentsByLocation,
  updateStudentHomeworkMarks,
  updateStudentMarks,
} from '../../../store/actions/getLocationCoordinator';
import UpdateMarks from '../update-marks';
import { getStudentEnrollmentHistory } from '../../../store/actions/getStudent';

export default function Classes() {
  const [isMarks, setIsMarks] = useState(false);
  const [listPayload, setListPayload] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [updateMarksContent, setUpdateMarksContent] = useState();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const classes = useStyles(styles)();
  const { t } = useTranslation();
  const [isColumnSelectOpen, setDialogOpen] = useState(false);
  const ALL_FIELDS = [t('PICTURES'), t('STUDENT_NAME'), t('PARENT_NAME'),
    t('CONTACT_NO'), t('COURSE'), t('SECTION'), t('NEW_RETURNING'), t('MARKS'), t('HOMEWORK'),
    t('BONUS_MARKS'), t('GRADE'), t('GPA'), t('ANNUAL_SCORE'), t('ACTIONS'),
  ];

  const CSV_HEADERS = [
    { name: ALL_FIELDS[1], label: ALL_FIELDS[1], key: 'studentName' },
    { name: ALL_FIELDS[2], label: ALL_FIELDS[2], key: 'parentName' },
    { name: ALL_FIELDS[3], label: ALL_FIELDS[3], key: 'phoneNumber' },
    { name: ALL_FIELDS[4], label: ALL_FIELDS[4], key: 'course' },
    { name: ALL_FIELDS[5], label: ALL_FIELDS[5], key: 'section' },
    { name: ALL_FIELDS[6], label: ALL_FIELDS[6], key: 'newReturning' },
    { name: ALL_FIELDS[7], label: 'Marks-Q1', key: 'marksQ1' },
    { name: ALL_FIELDS[7], label: 'Marks-Q2', key: 'marksQ2' },
    { name: ALL_FIELDS[7], label: 'Marks-Q3', key: 'marksQ3' },
    { name: ALL_FIELDS[8], label: 'Homework-Q1', key: 'homeworkQ1' },
    { name: ALL_FIELDS[8], label: 'Homework-Q2', key: 'homeworkQ2' },
    { name: ALL_FIELDS[8], label: 'Homework-Q3', key: 'homeworkQ3' },
    { name: ALL_FIELDS[9], label: ALL_FIELDS[9], key: 'bonus' },
    { name: ALL_FIELDS[10], label: ALL_FIELDS[10], key: 'grade' },
    { name: ALL_FIELDS[11], label: ALL_FIELDS[11], key: 'gpa' },
    { name: ALL_FIELDS[12], label: ALL_FIELDS[12], key: 'annualScore' },
  ];
  const [visibleFields, setVisibleFields] = useState([]);
  const [fileHeaders, setFileHeaders] = useState(CSV_HEADERS);
  const getEnrollDetails = async (studentData) => {
    const payload = {
      studentId: studentData?.studentId,
      courseId: studentData?.courseTo,
      academicYear: studentData?.academicYear,
      quarter: studentData?.selectedQuarter,
    };
    dispatch(getStudentEnrollmentHistory(payload));
  };

  const marksOpen = async (data, updateType, quarter) => {
    const quarterKeys = (Object.keys(data?.row?.marks));
    const quarterOptions = quarterKeys?.map((i) => ({
      id: i,
      name: i,
    }));
    const studentInfo = {
      firstName: data?.row?.studentInfo?.firstName,
      courseTo: data?.row?.enrolled_courses[0]?.courseId,
      studentId: data?.row?.id,
      academicYear: data?.row?.enrolled_courses[0].academicYear,
      selectedQuarter: quarter,
      location: data?.row?.enrolled_courses[0]?.location?.id,
      quarterOptions,
      updateType,
    };
    await getEnrollDetails(studentInfo).finally(() => {
      setUpdateMarksContent(studentInfo);
      setIsMarks(true);
    });
  };
  const marksClose = () => {
    setIsMarks(false);
    setUpdateMarksContent('');
  };

  useEffect(() => {
    const loadFalse = () => setLoading(false);
    dispatch(getAssignedLocations(loadFalse));
    setVisibleFields(ALL_FIELDS);
  }, []);

  const refreshList = (payload) => {
    if (!loading) {
      setLoading(true);
    }
    setListPayload(payload);
    dispatch(getStudentsByLocation(payload, setLoading));
  };
  const updateMarks = (payload) => {
    const loadFalse = () => {
      refreshList(listPayload);
      // setIsMarks(false);
      // setLoading(false);
    };
    if (payload.updateType === 'marks') {
      setLoading(true);
      dispatch(updateStudentMarks(payload, loadFalse));
      setIsMarks(false);
    } else {
      dispatch(updateStudentHomeworkMarks(payload, loadFalse));
      setIsMarks(false);
    }
  };

  return (
    <Box className={classes.gridContainer}>
      <Grid container item className={classes.titleRow}>
        <Grid item>
          <Typography className={classes.headerTitle}>
            {t('STUDENTS')}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} lg={2} className={classes.alignGrid} />
        <Grid item xs={12} lg={7} />
      </Grid>
      <Grid container className={classes.studentContainer}>
        <Grid container className={classes.studentListView}>
          <StudentsList
            setDialogOpen={() => setDialogOpen(true)}
            {...{
              refreshList,
              setLoading,
              loading,
              visibleFields,
              fileHeaders,
              setCourseData,
              courseData,
              marksOpen,
            }}
          />
        </Grid>
      </Grid>

      <DialogAtom
        customClass={classes.columnSettingDialog}
        isOpen={isColumnSelectOpen}
        dialogHeading={t('COLUMN_SETTINGS')}
        content={(
          <SelectColumns
            {...{
              classes,
              setDialogOpen,
              visibleFields,
              setVisibleFields,
              fileHeaders,
              setFileHeaders,
            }}
            allFields={ALL_FIELDS}
            csvHeaders={CSV_HEADERS}
          />
        )}
        secHandle={() => setDialogOpen(false)}
      />
      <DialogAtom
        isOpen={isMarks}
        secHandle={() => marksClose(false)}
        dialogHeading={t('ASSIGN_SCORE')}
        customClass={classes.marksDialog}
        content={(
          <UpdateMarks
            {...{ updateMarks, courseData }}
            studentData={updateMarksContent}
            handleClose={() => marksClose(false)}
          />
        )}
      />
    </Box>
  );
}
