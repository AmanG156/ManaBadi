import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  Autocomplete,
} from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import * as Yup from 'yup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';
import { FormikProvider, useFormik } from 'formik';
import { AntSwitch } from '../../../location-coordinator/update-marks/style';
import style from './style';
import useLocationCoordinator from '../../../../custom-hooks/useLocationCoordinator';
import { putStudentMarksByQuarter, postStudentMarksByQuarter } from '../../../../store/actions/getStudent';
import ButtonAtom from '../../../../components/atoms/button';
import { Buttons } from '../../../../constant';

function AssignScore({
  openMarksPopUp,
  setOpenMarksPopUp,
  dataAssignScore,
  assignLoading,
  setLoadingSpinner,
}) {
  const marksValidation = {};
  const marksInitial = {};
  const maxMarksValues = {};
  const classes = style();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isPresent, setIsPresent] = useState(false);
  const [isMarksTotal, setMarksTotal] = useState(0);
  const [sCourseName, setScourseName] = useState('');
  const [sQuarterName, setSquarterName] = useState('');
  const coordinatorInfo = useLocationCoordinator();
  const marksByQuarter = coordinatorInfo?.marksByQuarter;

  const formik = useFormik({
    initialValues: {
      fullName: '',
      courseName: '',
      quarterName: '',
      ...marksInitial,
    },
    onSubmit: (values) => {
      const aMarks = [];
      const aStudentDetailMarks = [];
      Object.keys(values).forEach((key) => {
        if (key.substr(-20, 10) === 'marksField') {
          aMarks.push(values[key]);
        }
      });
      marksByQuarter?.studentDetailMarks?.forEach((item, i) => {
        aStudentDetailMarks.push({
          id: item.id,
          obtainedMarks: aMarks[i],
          isActive: true,
        });
      });
      const payload = {
        studentId: dataAssignScore.rowData.id,
        locationId: dataAssignScore.rowData.enrolled_courses.location.id,
        courseId: dataAssignScore.rowData.enrolled_courses.course.id,
        academicYear: dataAssignScore.rowData.enrolled_courses.academicYear,
        quarter: sQuarterName,
        studentDetailMarks: aStudentDetailMarks,
        studentName: dataAssignScore.fullName,
      };
      setLoadingSpinner(true);
      dispatch(putStudentMarksByQuarter(payload, setLoadingSpinner, setOpenMarksPopUp));
    },
  });
  React.useEffect(() => {
    let marks = 0;
    marksByQuarter?.studentDetailMarks?.sort((a, b) => a.academicPanelMarks.category - b.academicPanelMarks.category);
    marksByQuarter?.studentDetailMarks?.forEach((elem, i) => {
      marksValidation[`marksField-${i}`] = Yup.number()
        .required('Required')
        .typeError('Required');
      marksInitial[`marksField-${i}`] = elem.obtainedMarks;
      formik.values[`marksField-${i}`] = elem.obtainedMarks;
      maxMarksValues[`marksField-${i}`] = elem?.academicPanelMarks?.marks;
      marks += elem.obtainedMarks;
    });
    setMarksTotal(marks);
    setIsPresent(marksByQuarter?.isAttended);
    setScourseName(sCourseName === '' || sCourseName === undefined ? dataAssignScore.courseName : sCourseName);
    setSquarterName(sQuarterName === '' || sQuarterName === undefined ? dataAssignScore.quarterValue : sQuarterName);
  }, [marksByQuarter?.studentDetailMarks]);
  const handlePresent = () => {
    setIsPresent(!isPresent);
  };
  const customMarkChange = (e) => {
    let marks = 0;
    marksByQuarter?.studentDetailMarks?.forEach((elem, i) => {
      if (`marksField-${i}` === e.target.id) {
        if (e.target.value <= elem.academicPanelMarks.marks) {
          marks += Number(e.target.value);
          formik.values[`marksField-${i}`] = Number(e.target.value);
        }
      } else {
        marks += elem.obtainedMarks;
      }
    });
    setMarksTotal(marks);
  };
  const changeCourse = (value) => {
    setScourseName(value);
    dataAssignScore.setAssignLoading(true);
    dispatch(postStudentMarksByQuarter({
      studentId: dataAssignScore.rowData.id,
      locationId: dataAssignScore.rowData.enrolled_courses.location.id,
      courseId: dataAssignScore.rowData.enrolled_courses.course.id,
      academicYear: dataAssignScore.rowData.enrolled_courses.academicYear,
      quarter: sQuarterName,
    }, dataAssignScore.setAssignLoading));
  };
  const changeQuarter = (value) => {
    setSquarterName(value);
    dataAssignScore.setAssignLoading(true);
    dispatch(postStudentMarksByQuarter({
      studentId: dataAssignScore.rowData.id,
      locationId: dataAssignScore.rowData.enrolled_courses.location.id,
      courseId: dataAssignScore.rowData.enrolled_courses.course.id,
      academicYear: dataAssignScore.rowData.enrolled_courses.academicYear,
      quarter: value,
    }, dataAssignScore.setAssignLoading));
  };
  return (
    <Dialog
      open={openMarksPopUp}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={clsx(classes.dialog, classes.swapCourseDialog)}
    >
      {
        assignLoading && (
          <Box sx={{
            display: 'flex', position: 'absolute', paddingLeft: '45%', paddingTop: '15%',
          }}
          >
            <CircularProgress />
          </Box>
        )
      }
      <DialogTitle id="alert-dialog-title">
        {t('ASSIGN_SCORE')}
        <CloseIcon
          onClick={() => {
            setOpenMarksPopUp(false);
            setScourseName('');
            setSquarterName('');
          }}
          className={classes.closeImg}
        />
      </DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <form className={assignLoading ? classes.tableAssgin : ''}>
            {
              !assignLoading && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      className={`${classes.performTextField} ${classes.performTextField}`}
                      label={t('FULL_NAME')}
                      id="fullName"
                      name="fullName"
                      autoComplete="fullName"
                      value={dataAssignScore.fullName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Autocomplete
                      disableClearable
                      id="courseName"
                      value={sCourseName}
                      options={dataAssignScore.aCourseName}
                      renderInput={(params) => <TextField {...params} label={t('COURSE')} />}
                      onChange={(e, val) => {
                        changeCourse(val);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Autocomplete
                      disableClearable
                      id="quarterName"
                      value={sQuarterName}
                      options={dataAssignScore.aQuarter}
                      renderInput={(params) => <TextField {...params} label={t('QUARTER')} />}
                      onChange={(e, val) => {
                        changeQuarter(val);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} className={classes.switchSection}>
                    <Typography variant="h5" gutterBottom component="div">
                      {t('ATTENDANCE')}
                    </Typography>
                    <Stack className={classes.switchUi} spacing={1}>
                      <Typography>{t('ABSENT')}</Typography>
                      <AntSwitch checked={isPresent} onChange={() => handlePresent()} inputProps={{ 'aria-label': 'ant design' }} />
                      <Typography className={isPresent ? classes.setGreen : ''}>{t('PRESENT')}</Typography>
                    </Stack>
                  </Grid>
                  <Grid container>
                    <Grid container spacing={2} mt={3} mb={2} className={classes.addStyleHead}>
                      <Grid item xs={3}>
                        <Typography variant="body1" gutterBottom>
                          {t('CATEGORY')}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="body1" gutterBottom>
                          {t('MARKS')}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="body1" gutterBottom>
                          {t('NOTES')}
                        </Typography>
                      </Grid>
                    </Grid>
                    {(
                          marksByQuarter?.studentDetailMarks?.sort((a, b) => a.academicPanelMarks.category - b.academicPanelMarks.category),
                          marksByQuarter?.studentDetailMarks?.map((e, i) => (
                            <Grid container spacing={2} className={classes.alignHorCenter}>
                              <Grid item xs={3}>
                                <Typography variant="body1" gutterBottom className={classes.categoryLabel}>
                                  {e.academicPanelMarks.category}
                                </Typography>
                              </Grid>
                              <Grid item xs={3} className={classes.marksDropDown}>
                                <TextField
                                  className={`${classes.performTextField}`}
                                  label={t('MARKS')}
                                  id={`marksField-${i}`}
                                  name={`marksField-${i}`}
                                  autoComplete={`marksField-${i}`}
                                  value={formik.values[`marksField-${i}`]}
                                  type="number"
                                  InputProps={{ inputProps: { min: 0, max: e.academicPanelMarks.marks } }}
                                  onChange={customMarkChange}
                                />
                                /
                                { e.academicPanelMarks.marks}
                              </Grid>
                              <Grid item xs={3}>
                                <Typography variant="body1" gutterBottom>
                                  {e?.academicPanelMarks?.notes}
                                </Typography>
                              </Grid>
                            </Grid>
                          ))
                        )}
                  </Grid>
                  <Grid container spacing={2} className={classes.alignHorCenter}>
                    <Grid item xs={3}>
                      <Typography variant="body1" gutterBottom>
                        Total Marks
                      </Typography>
                    </Grid>
                    <Grid item xs={3} className={classes.marksDropDown}>
                      <TextField
                        id="outlined-number"
                        label=" Marks"
                        value={isMarksTotal}
                        className={`${classes.performTextField} ${classes.performTextField}`}
                      />
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="flex-end">
                    <ButtonAtom
                      btntype={Buttons.SECONDARY}
                      name={t('CANCEL')}
                      className={classes.secButtonNew}
                      onClick={() => setOpenMarksPopUp(false)}
                    />
                    <ButtonAtom
                      btntype={Buttons.PRIMARY}
                      name={t('SAVE')}
                      onClick={formik.handleSubmit}
                      className={[classes.activeButtonNew, classes.secButtonNew]}
                    />
                  </Grid>
                </Grid>
              )
            }
          </form>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  );
}

export default AssignScore;
