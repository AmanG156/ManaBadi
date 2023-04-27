/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Loader from '../../../components/atoms/loader';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';
import DialogAtom from '../../../components/atoms/dialog';
import ClassroomList from '../classroom-list';
import AddTeacher from '../add-teacher';
import {
  getAllTeachers,
  getAssignedLocations,
  getClassrooms,
} from '../../../store/actions/getLocationCoordinator';
import { getAllCourses } from '../../../store/actions/getStudent';

export default function Classes() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [classroomListPayload, setClassroomListPayload] = useState(false);

  const classes = useStyles(styles)();

  const { t } = useTranslation();
  const [addTeacherInfo, setAddTeacherInfo] = useState(0);
  const [isAddTeacher, setAddTeacher] = useState(false);

  useEffect(() => {
    dispatch(getAssignedLocations());
    dispatch(getAllTeachers());
    dispatch(getAllCourses());
  }, []);
  const refreshList = (payload) => {
    setLoading(true);
    const loadRefreshData = () => {
      setLoading(false);
    };
    dispatch(getClassrooms(payload, loadRefreshData));
  };

  const onAddTeacherClick = (courseData) => {
    const {
      class_teachers,
      course, section, googleClassId,
      classRoomId,
    } = courseData;
    const teachers = class_teachers;
    const formattedTeachers = teachers?.map((i) => ({
      checked: i?.is_primary || false,
      value: i?.user?.first_name ? `${i?.user?.first_name} ${i?.user?.last_name} ` : '',
      email: i?.user?.manabadi_email || '',
      key: i?.user?.id || '',
      id: i?.user?.id || '',
    }));
    const classObj = {
      // id: courseData?.id,
      teachers: formattedTeachers,
      course: course?.name,
      googleClassId,
      classRoomId,
      section,
    };
    setAddTeacherInfo(classObj);
  };

  return (
    <Box className={classes.gridContainer}>
      <Grid container item className={classes.titleRow}>
        <Grid item>
          <Typography className={classes.headerTitle}>
            {t('CLASSES')}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.classRoomContainer}>
        <Grid container className={classes.classRoomList}>
          <ClassroomList
            setAddTeacher={() => setAddTeacher(true)}
            onAddTeacherClick={onAddTeacherClick}
            refreshList={refreshList}
            setClassroomListPayload={setClassroomListPayload}
            setLoading={setLoading}
            loading={loading}
          />
        </Grid>
      </Grid>

      <DialogAtom
        customClass={classes.addTeacherDialog}
        isOpen={isAddTeacher}
        dialogHeading={t('ADD_TEACHER')}
        content={(
          <AddTeacher
            classes={classes}
            addTeacherInfo={addTeacherInfo}
            setAddTeacherInfo={setAddTeacherInfo}
            setDialogOpen={setAddTeacher}
            classroomListPayload={classroomListPayload}
          />
        )}
        secHandle={() => setAddTeacher(false)}
      />
      {loading && (
        <Grid>
          <Loader message={t('LOADING')} />
        </Grid>
      )}
    </Box>
  );
}
