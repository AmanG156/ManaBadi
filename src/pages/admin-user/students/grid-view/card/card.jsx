import React, { memo } from 'react';
import {
  Grid, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';

import Menu from '../../helpers/menu';
import { useStyles } from './style';

function getCreditLine({ label, value }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.studentKeys}>
      <Grid item className={classes.key} xs={6}>
        {label}
      </Grid>
      <Grid item className={classes.value} xs={6}>
        {value}
      </Grid>
    </Grid>
  );
}

const CreditLine = memo(getCreditLine, (prevProps, nextProps) => prevProps.label === nextProps.label && prevProps.value === nextProps.value);

function StudentGridCard({
  key,
  studentData, onUpdateParentClick, recoveryDialogOpen, paymentDialogOpen, cancelEnrollment,
  setSwapCourseOrLocation, setEditStudentProfile, showStudentLogs, onClickCancelEnrollMenu,
  onClickMenu, onEditMenuClick, onCheckBoxSelection, cardChecked, editExamDetailsOpen, selectedFilter,
  filterOptions,
}) {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Grid item lg={2.4} xs={12} sm={6} md={3} className={classes.alignGrid}>
      <Card className={classes.studentCard} key={key}>
        <Grid container className={classes.studentDetails}>
          <Grid item xs={3}>
            <Checkbox
              checked={cardChecked}
              onChange={(e) => {
                onCheckBoxSelection(e, studentData.userId);
              }}
            />
          </Grid>
          <Grid item xs={6} className={classes.imageGrid}>
            <CardMedia
              component="img"
              height="2vw"
              image={`${studentData?.studentInfo?.profilePhoto}?${Date.now()}`}
              alt={t('PICTURE')}
              className={classes.studentCardImage}
            />
          </Grid>
          <Grid item xs={2.6} justifyContent="flex-end">
            <CardHeader
              className={classes.studentCardHeader}
              action={(
                <Menu
                  {...{ cancelEnrollment, onClickCancelEnrollMenu }}
                  key={key}
                  menuViewType="grid"
                  t={t}
                  rowInfo={studentData}
                  onUpdateParentClick={onUpdateParentClick}
                  recoveryDialogOpen={recoveryDialogOpen}
                  paymentDialogOpen={paymentDialogOpen}
                  editExamDetailsOpen={editExamDetailsOpen}
                  setSwapCourseOrLocation={setSwapCourseOrLocation}
                  setEditStudentProfile={setEditStudentProfile}
                  showStudentLogs={showStudentLogs}
                  onClickMenu={onClickMenu}
                  onEditMenuClick={onEditMenuClick}
                  selectedFilter={selectedFilter}
                  filterOptions={filterOptions}
                />
              )}
            />
          </Grid>
        </Grid>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className={classes.studentName}>
            {`${studentData?.studentInfo?.firstName}
                  ${studentData?.studentInfo?.lastName}`}
          </Typography>
          <Grid container className={classes.studentDetails}>
            <CreditLine label={t('PARENT_NAME')} value={`${studentData.parent1Info?.firstName} ${studentData?.parent1Info?.lastName}`} />
            <CreditLine label={t('CENTER_INFO')} value={`${studentData?.enrolled_courses?.location?.name ? studentData?.enrolled_courses?.location?.name : studentData?.enrolled_courses[0]?.location?.name}`} />
            <CreditLine label={t('CLASS_LEVEL')} value={`${studentData?.enrolled_courses?.courseName ? studentData?.enrolled_courses?.courseName : studentData?.enrolled_courses[0]?.courseName}`} />
            <CreditLine label={t('SECTION')} value={`${studentData?.enrolled_courses?.google_class?.section ? studentData?.enrolled_courses?.google_class?.section : studentData?.enrolled_courses[0]?.google_class?.section}`} />
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  return prevProps.studentData === nextProps.studentData && prevProps.cardChecked === nextProps.cardChecked;
}
export default memo(StudentGridCard, areEqual);
