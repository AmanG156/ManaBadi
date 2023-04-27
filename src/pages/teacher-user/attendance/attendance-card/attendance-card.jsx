import React from 'react';
import {
  Grid, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import clsx from 'clsx';

import { useStyles } from './style';

function AttendanceCard({
  isStudentAbsent,
  studentDetail,
  onCardClick,
}) {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Grid
      item
      lg={2}
      xs={3}
      md={2}
      className={clsx(classes.alignGrid, classes.cursorPointer)}
      onClick={() => onCardClick(studentDetail)}
    >
      <Card className={classes.studentCard}>
        <Grid container>
          <Grid item xs={7} />
          {isStudentAbsent
            ? <Grid item xs={5} className={classes.absentText}>{t('ABSENT')}</Grid>
            : <Grid item xs={5} className={classes.absentHeight} />}
        </Grid>
        <Grid container className={classes.studentDetails}>
          <Grid item xs={3} />
          <Grid item xs={6} className={classes.imageGrid}>
            <CardMedia
              component="img"
              height="2vw"
              image={studentDetail?.student?.studentInfo?.profilePhoto}
              alt={t('PICTURE')}
              className={classes.studentCardImage}
            />
          </Grid>
        </Grid>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="div" className={classes.studentName}>
            {`${studentDetail?.student?.studentInfo?.firstName} ${''} ${studentDetail?.student?.studentInfo?.lastName}`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default AttendanceCard;
