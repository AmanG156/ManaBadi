import * as React from 'react';
import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import StudentCard from '../student-detail-card';
import ReportCard from '../report-card';
import useStyles from '../../../custom-hooks/useStyles';
import style from './style';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: '4%',
  textAlign: 'left',
  overflowY: 'auto',
  boxShadow: 'none',
  color: theme.palette.text.secondary,
}));

export default function StudentDashboard({ studentAccountDetails }) {
  const { t } = useTranslation();
  const validationSchema = Yup.object({
    academicYear: Yup.string(t('ACADEMIC_YEAR_REQUIRED')).required(
      t('ACADEMIC_YEAR_REQUIRED'),
    ),
  });
  const formik = useFormik({
    initialValues: {
      academicYear: '',
    },
    validationSchema,
    onSubmit: () => {
    },
  });
  const classes = useStyles(style)();

  const getSort = (stuData = []) => {
    if (!stuData.length) return [];
    const res = [];
    res.push(stuData?.find((ta) => ta.primaryStudent) || []);
    const p = stuData?.filter((tt) => !tt.primaryStudent) || [];
    return [...res, ...p];
  };

  return (
    <Card className={classes.main}>
      <CardContent sx={{ padding: 0 }}>
        {getSort(studentAccountDetails?.studentData || [])?.map((studentDetials) => (
          <Grid container className={classes.addBorderAround} key={studentDetials}>
            <Grid item xs={12} md={5} lg={4.99} className={classes.mainStudentCard}>
              <Item>
                <StudentCard
                  studentDetials={studentDetials}
                  addressData={studentAccountDetails.addressData}
                />

              </Item>
            </Grid>
            <Divider orientation="vertical" className={classes.verticalLine} flexItem variant="middle" />
            <Grid item xs={12} md={7} lg={6.99} className={classes.mainReportCard}>
              <Item>
                <ReportCard
                  formik={formik}
                  studentId={studentDetials.id}
                  courseId={studentDetials?.enrolled_courses?.courseId}
                  courseName={studentDetials?.enrolled_courses?.courseName}
                  academicYear={studentDetials?.enrolled_courses?.academicYear}
                  quarter={studentDetials.id}
                />
              </Item>
            </Grid>
          </Grid>
        ))}
      </CardContent>
    </Card>
  );
}
