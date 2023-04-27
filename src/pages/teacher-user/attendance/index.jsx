import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Grid, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';
import AttendanceFilters from './attendance-filter';
import AttendanceCard from './attendance-card/attendance-card';
import { Button } from '../../../components/atoms';
import commonStyle from '../../../utils/commonClasses';
import {
  getAssignedLocations,
} from '../../../store/actions/getLocationCoordinator';
import {
  getclassesTimings, getTeachetPanelStudents,
  classesByYear, markStudentAttendance,
} from '../../../store/actions/getTeacherView';
import { getClassDetails } from './helper';

export default function TeacherAttendanceView() {
  const classes = useStyles(styles)();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const commonClasses = useStyles(commonStyle)();
  const reduxStore = useSelector((state) => state?.getLocationCoordinator);
  const assignedYears = reduxStore?.assignedYears;
  const reduxClass = useSelector((state) => state?.getTeacherView);
  const assignedClass = reduxClass?.classesTimings;
  const assignedClassrooms = reduxClass?.classesByYear;
  const assignedTeacherPanelStudents = reduxClass?.assignedTeachetPanelStudents;
  const [absentStudentIds, setAbsentStudentIds] = useState([]);
  const [isAttendanceRecording, setIsAttendanceRecording] = useState(false);
  const [years, setYearsData] = useState([]);
  const [courses, setCoursesData] = useState([]);
  const [classWeek, setclassWeekData] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [googleClassRoomId, setGoogleClassRoomId] = useState('');
  const [homeworkPanelId, setHomeworkPanelId] = useState('');
  const [homeworkPanelMarksId, setHomeworkPanelMarksId] = useState('');
  const validationSchema = Yup.object({
  });
  const formik = useFormik({
    initialValues: {
      year: years[0]?.id,
      course: courses[0]?.id,
      classWeek: classWeek[0]?.id,
    },
    validationSchema,
    onSubmit: () => {
    },
  });
  useEffect(() => {
    dispatch(getAssignedLocations());
  }, []);

  useEffect(() => {
    setYearsData(assignedYears);
    const currentYear = new Date().getFullYear();
    const selectedYear = assignedYears.filter((opt) => opt?.id.substring(0, 4) === currentYear.toString());
    formik.setFieldValue('year', selectedYear[0]?.id);
  }, [assignedYears]);

  useEffect(() => {
    const payload = {
      academicYear: formik.values.year,
    };
    dispatch(classesByYear(payload));
  }, [formik.values.year]);

  useEffect(() => {
    setCoursesData(assignedClassrooms);
    formik.setFieldValue('course', assignedClassrooms[0]?.id);
  }, [assignedClassrooms]);

  useEffect(() => {
    if (formik.values.course && formik.values.year) {
      const courseItem = assignedClassrooms.find((item) => item.id === formik.values.course);
      if (courseItem?.courseId && courseItem?.locationId) {
        setCourseId(courseItem?.courseId);
        setLocationId(courseItem?.locationId);
        setGoogleClassRoomId(courseItem?.googleClassId);
      }
      const payload = {
        courseId: courseItem?.courseId,
        academicYear: formik.values.year,
      };
      dispatch(getclassesTimings(payload));
    }
  }, [formik.values.course, formik.values.year]);

  useEffect(() => {
    setclassWeekData(getClassDetails(assignedClass));
  }, [assignedClass]);

  useEffect(() => {
    formik.setFieldValue('classWeek', classWeek[0]?.id);
  }, [classWeek]);

  const refreshList = () => {
    const payload = {
      locationId,
      courseId,
      academicYear: formik.values.year,
      courseCompleted: false,
      isActive: true,
      googleClassId: googleClassRoomId,
    };
    dispatch(getTeachetPanelStudents(payload));
    setIsAttendanceRecording(false);
    setAbsentStudentIds([]);
  };

  useEffect(() => {
    const classWeekDetails = classWeek.filter((obj) => obj.id === formik.values.classWeek);
    setHomeworkPanelId(classWeekDetails?.[0]?.homeworkPanelId);
    setHomeworkPanelMarksId(classWeekDetails?.[0]?.id);
    if (formik.values.course && formik.values.year) {
      refreshList();
    }
  }, [formik.values.course, formik.values.year, formik.values.classWeek]);

  useEffect(() => {
    setStudentList(assignedTeacherPanelStudents);
  }, [assignedTeacherPanelStudents]);

  const onCancel = () => {
    setIsAttendanceRecording(false);
    setAbsentStudentIds([]);
  };

  const submitAttendance = () => {
    const payload = [];
    absentStudentIds?.forEach((studentId) => {
      payload.push({
        homeworkPanelId,
        homeworkPanelMarksId,
        studentId,
        isPresent: false,
      });
    });
    dispatch(markStudentAttendance(payload, refreshList));
    // console.log('submitted Attendance', absentStudentIds);
  };

  return (
    <Box className={classes.gridContainer}>
      <Grid container item className={classes.titleRow}>
        <Grid item>
          <Typography className={classes.headerTitle}>
            {t('ATTENDANCE')}
          </Typography>
        </Grid>
      </Grid>
      <AttendanceFilters
        formik={formik}
        classes={classes}
        courses={courses}
        years={years}
        classWeeks={classWeek}
        noOfAbsentStudents={absentStudentIds.length}
        isAttendanceRecording={isAttendanceRecording}
        setIsAttendanceRecording={setIsAttendanceRecording}
      />
      <Grid container item lg={12}>
        {studentList.map((student) => (
          <AttendanceCard
            isStudentAbsent={absentStudentIds.includes(student.studentId)}
            studentDetail={student}
            onCardClick={(studentDetail) => {
              if (!isAttendanceRecording) return;
              const localAbsentStudentIds = [...absentStudentIds];
              if (localAbsentStudentIds.includes(studentDetail.studentId)) {
                const index = localAbsentStudentIds.indexOf(studentDetail.studentId);
                if (index > -1) {
                  localAbsentStudentIds.splice(index, 1);
                }
              } else {
                localAbsentStudentIds.push(studentDetail.studentId);
              }
              setAbsentStudentIds([...localAbsentStudentIds]);
            }}
          />
        ))}
      </Grid>
      {isAttendanceRecording && (
        <Grid container>
          <Grid item xs={7} />
          <Grid item xs={5}>
            <div className={classes.buttons}>
              <Button
                id="cancel"
                className={commonClasses.secButton}
                onClick={onCancel}
                name={t('CANCEL')}
              />
              <Button
                id="submit"
                className={commonClasses.activeButton}
                onClick={() => submitAttendance()}
                name={t('SUBMIT')}
              />
            </div>
          </Grid>
        </Grid>
      )}

    </Box>
  );
}
