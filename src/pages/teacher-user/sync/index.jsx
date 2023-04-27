import React from 'react';
import {
  Box, Grid, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';
// import { Button } from '../../../components/atoms';
// import commonStyle from '../../../utils/commonClasses';
import SyncFilters from './sync-filter';
// import SyncTable from './sync-table/syncTable';

export default function TeacherSyncView() {
  const classes = useStyles(styles)();
  const { t } = useTranslation();
  //   const commonClasses = useStyles(commonStyle)();

  //   const [absentStudentIds, setAbsentStudentIds] = useState([]);
  //   const [isAttendanceRecording, setIsAttendanceRecording] = useState(false);
  const validationSchema = Yup.object({
  });
  const formik = useFormik({
    initialValues: {
      year: '',
      course: '',
      classWeek: '',
    },
    validationSchema,
    onSubmit: () => {
    },
  });

  //   const onCancel = () => {
  //     setIsAttendanceRecording(false);
  //     setAbsentStudentIds([]);
  //   };

  return (
    <Box className={classes.gridContainer}>
      <Grid container item className={classes.titleRow}>
        <Grid item>
          <Typography className={classes.headerTitle}>
            {t('MARKS_SYNC')}
          </Typography>
        </Grid>
      </Grid>
      <Grid className={classes.direction}>
        <Grid xs={12}>
          <SyncFilters
            formik={formik}
        // classes={classes}
            courses={[]}
            years={[]}
            classWeeks={[]}
          />
        </Grid>

        {/* <Grid xs={12} mt={25}>
          <SyncTable />
        </Grid> */}
      </Grid>
      {/* <Grid container item lg={12}>
        {studentList.map((student) => (
          <AttendanceCard
            isStudentAbsent={absentStudentIds.includes(student.id)}
            studentDetail={student}
            onCardClick={(studentDetail) => {
              if (!isAttendanceRecording) return;
              const localAbsentStudentIds = [...absentStudentIds];
              if (localAbsentStudentIds.includes(studentDetail.id)) {
                const index = localAbsentStudentIds.indexOf(studentDetail.id);
                if (index > -1) {
                  localAbsentStudentIds.splice(index, 1);
                }
              } else {
                localAbsentStudentIds.push(studentDetail.id);
              }
              setAbsentStudentIds([...localAbsentStudentIds]);
            }}
          />
        ))}
      </Grid> */}

    </Box>
  );
}
