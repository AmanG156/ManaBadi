import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  IconButton,
  Stack, Typography,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useNavigate } from 'react-router-dom';
import styles from './style';
import ListView from '../list-view';
import {
  getAssignedLocations,
  updateStudentHomeworkMarks,
  updateStudentMarks,
} from '../../../store/actions/getLocationCoordinator';
import { getAllCourses, getStudentEnrollmentHistory } from '../../../store/actions/getStudent';
import useStyles from '../../../custom-hooks/useStyles';
import Dropdown from '../../../components/atoms/dropdown';
import DialogAtom from '../../../components/atoms/dialog';
import UpdateMarks from '../update-marks';
import { NavigateRoutes } from '../../../constant';
import Constant from '../../../store/constant';
import { setLocalStorage } from '../../../utils/localStorageMethod';
import { classesByYear, studentsByYearAndClassId } from '../../../store/actions/getTeacherView';
import { StudentList } from './helper';

export default function MyClassData() {
  const { t } = useTranslation();
  const classes = useStyles(styles)();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxStore = useSelector((state) => state?.getLocationCoordinator);
  const assignedYears = reduxStore?.assignedYears;
  const studentState = useSelector((state) => state?.getStudent);
  const assignedCourses = studentState?.courses;
  const teacherPanel = useSelector((state) => state?.getTeacherView);
  const [assignedClassrooms, setAssignedClassRooms] = useState([]);
  const tableData = teacherPanel?.studentsByYearAndClassId;
  const [isselectedYear, setSelectYear] = useState();
  const [isSelectedClassRoom, setSelectedClassRoom] = useState('');
  const [isMarks, setIsMarks] = useState(false);
  const [updateMarksContent, setUpdateMarksContent] = useState();
  const [courseData, setCourseData] = useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [loading, setLoading] = useState(false);
  // const [courseId, setCourseId] = useState('');
  // const [locationId, setLocationId] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedLocationId, setSelectedLocationId] = useState('');

  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    const students = new StudentList(tableData);
    setStudentsData(students);
    setLoading(false);
  }, [tableData]);

  useEffect(() => {
    const classRooms = teacherPanel.classesByYear?.map((obj) => ({
      id: obj?.googleClassId,
      name: `${obj?.name}(${obj?.sectionName}) - ${obj?.locationName}`,
      courseId: obj?.courseId,
      locationId: obj?.locationId,
    }));
    setAssignedClassRooms(classRooms);
  }, [teacherPanel.classesByYear]);

  useEffect(() => {
    const loadFalse = () => setLoading(false);
    dispatch(getAssignedLocations(loadFalse));
    dispatch(getAllCourses());
  }, []);

  const getEnrollDetails = async (studentData) => {
    const payload = {
      studentId: studentData?.studentId,
      courseId: selectedCourseId,
      academicYear: isselectedYear,
      quarter: studentData?.selectedQuarter,
    };
    dispatch(getStudentEnrollmentHistory(payload));
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const pastYear = new Date().getFullYear() + 1;
    const currentAcademicYear = `${currentYear}-${pastYear}`;
    const index = assignedYears.findIndex((cur) => cur.name === currentAcademicYear);
    if (index >= 0) {
      setSelectYear(assignedYears[index]?.id);
    }
  }, [assignedYears]);

  useEffect(() => {
    setSelectedClassRoom(assignedClassrooms?.[0]?.id);
    setSelectedCourseId(assignedClassrooms?.[0]?.courseId);
    setSelectedLocationId(assignedClassrooms?.[0]?.locationId);
  }, [assignedClassrooms]);

  useEffect(() => {
    setStudentsData([]);
    setAssignedClassRooms([]);
    const payload = {
      academicYear: isselectedYear,
    };
    dispatch(classesByYear(payload));
  }, [isselectedYear]);

  useEffect(() => {
    if (assignedClassrooms.length) {
      setSelectedClassRoom(assignedClassrooms[0]?.id);
    }
  }, [assignedClassrooms]);

  const refreshList = () => {
    setLoading(true);
    setStudentsData([]);
    const listPayload = {
      academicYear: isselectedYear,
      googleClassId: isSelectedClassRoom,
    };
    if (listPayload) {
      dispatch(studentsByYearAndClassId(listPayload));
    }
  };

  useEffect(() => {
    if (isselectedYear && isSelectedClassRoom) {
      refreshList();
    }
  }, [isselectedYear, isSelectedClassRoom]);

  const handleAssignyear = (event) => {
    setSelectYear(event.target.value);
    setSelectedClassRoom('');
  };

  const marksOpen = async (data, updateType, quarter) => {
    const quarterKeys = (Object.keys(data?.row?.marks));
    const quarterOptions = quarterKeys?.map((i) => ({
      id: i,
      name: i,
    }));
    const courses = assignedCourses.map((e) => ({
      id: e?.id,
      name: e?.name,
    }));
    const studentInfo = {
      firstName: data?.row?.studentInfo?.firstName,
      courseTo: selectedCourseId,
      studentId: data?.row?.studentId,
      academicYear: isselectedYear,
      selectedQuarter: quarter,
      location: selectedLocationId,
      courses,
      quarterOptions,
      updateType,
    };
    await getEnrollDetails(studentInfo).finally(() => {
      setUpdateMarksContent(studentInfo);
      setIsMarks(true);
    });
  };

  const checkboxChanged = (selectedCheckoxes) => {
    setSelectedRows(selectedCheckoxes);
  };

  const marksClose = () => {
    setIsMarks(false);
  };

  const updateMarks = (payload) => {
    setStudentsData([]);
    const loadFalse = () => {
      refreshList();
    };
    if (payload.updateType === 'marks') {
      setIsMarks(false);
      setLoading(true);
      dispatch(updateStudentMarks(payload, loadFalse));
    } else {
      dispatch(updateStudentHomeworkMarks(payload, loadFalse));
    }
  };

  const sendBulkEmail = () => {
    if (selectedRows.length > 0) {
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
      setLocalStorage('selectedYear', isselectedYear);
      setLocalStorage('showSelectAllinEmail', false);

      if (selectedRows.length > 0) {
        setLocalStorage('showLocationFilterRecipients', false);
        setLocalStorage('showLocationAnnouncementsRecipients', false);
      } else {
        setLocalStorage('showLocationFilterRecipients', false);
        setLocalStorage('showLocationAnnouncementsRecipients', false);
      }
      navigate(NavigateRoutes.TEACHER_VIEW_EMAIL);
    }
  };

  return (
    <div className={classes.gridPadding}>
      <div className={classes.divAlignment}>
        <Stack sx={{ width: '100%' }} spacing={4}>
          <Grid container flexDirection="row" display="flex" className={`${classes.divWrapper}`}>
            <Grid container>
              <Grid container item className={classes.titleRow}>
                <Grid item>
                  <Typography className={classes.headerTitle}>
                    {t('MY_CLASS')}
                  </Typography>
                </Grid>
                <Grid item className={classes.HeaderWrapper}>
                  <div className={classes.dropdownWrap}>
                    <div className={classes.assignyear}>
                      <Dropdown
                        minWidth="100%"
                        id="myClass"
                        variant="standard"
                        options={assignedYears}
                        value={isselectedYear}
                        customClass={classes.dropdown}
                        changeCss
                        customFormControlCss={{ width: '100%' }}
                        labelId="myClass"
                        handleChange={handleAssignyear}
                      />
                    </div>
                    <div className={classes.googleClasses}>
                      <Dropdown
                        minWidth="100%"
                        id="googleClass"
                        variant="standard"
                        options={assignedClassrooms}
                        value={isSelectedClassRoom}
                        customClass={classes.dropdown}
                        changeCss
                        customFormControlCss={{ width: '100%' }}
                        labelId="myClass"
                        handleChange={(e) => {
                          setSelectedClassRoom(e.target.value);
                          const classRoom = assignedClassrooms.filter((obj) => obj.id === e.target.value);
                          setSelectedCourseId(classRoom?.[0]?.courseId);
                        }}
                      />
                    </div>
                  </div>
                  <div className={classes.dropdownWrap}>
                    <div className={classes.rightIcons}>
                      <Tooltip title={t('SEND_EMAIL')}>
                        <IconButton
                          onClick={sendBulkEmail}
                          className={selectedRows.length > 0 ? classes.emailIcon : classes.emailIconDisable}
                        >
                          <EmailOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container className={classes.resourceContainer}>
            <Grid container className={classes.resourcesListView}>
              <ListView
                {...{
                  refreshList,
                  studentsData,
                  marksOpen,
                  setCourseData,
                  courseData,
                  checkboxChanged,
                  loading,
                }}
              />
            </Grid>
          </Grid>
          <DialogAtom
            isOpen={isMarks}
            secHandle={() => marksClose(false)}
            dialogHeading={t('ASSIGN_SCORE')}
            customClass={classes.marksDialog}
            className={classes.pinkal}
            content={(
              <UpdateMarks
                {...{ updateMarks, courseData }}
                studentData={updateMarksContent}
                handleClose={() => marksClose(false)}
              />
            )}
          // footer={renderMarksFooter()}
          />
        </Stack>
      </div>
    </div>
  );
}
