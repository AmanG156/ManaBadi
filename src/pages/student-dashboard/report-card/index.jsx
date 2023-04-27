/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import {
  Divider,
  Grid,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import PrintIcon from '@mui/icons-material/LocalPrintshopOutlined';
import CloseIcon from '@mui/icons-material/Close';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useTranslation } from 'react-i18next';
import CardMedia from '@mui/material/CardMedia';
import DialogContent from '@mui/material/DialogContent';
import DialogAtom from '../../../components/atoms/dialog';
import LinearProgressBar from '../../../components/atoms/progress-bar';
import useStyles from '../../../custom-hooks/useStyles';
import style from './style';
import Dropdown from '../../../components/atoms/dropdown';
import Cert from '../../../assets/images/cert.png';
import ButtonAtom from '../../../components/atoms/button';
import { Buttons } from '../../../constant';
import CertificateImage from '../../../assets/images/certificateImg.png';
import HallTicketImage from '../../../assets/images/hallTicketImg.png';
import { getStudentEnrollmentHistory } from '../../../store/actions/getStudent';
import {
  getAcademicYears,
} from '../../../store/actions/getLocationCoordinator';
import { toolTipTheme } from '../../../utils/commonUiComponent';

function createData(
  name,
  class1,
  class2,
  class3,
  class4,
  class5,
  class6,
  class7,
  class8,
  class9,
  class10,
) {
  return {
    name, class1, class2, class3, class4, class5, class6, class7, class8, class9, class10,
  };
}

function createAttendence(
  name,
  class1,
  class2,
  class3,
  class4,
  class5,
  class6,
  class7,
  class8,
  class9,
  class10,
) {
  return {
    name, class1, class2, class3, class4, class5, class6, class7, class8, class9, class10,
  };
}

const rows = [
  createData('Marks in HW', 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0, 159, 6.0),
  createAttendence('Attendance', <span className="attendencePass">true</span>, <span className="attendencePass">true</span>, <span className="attendencePass">true</span>, <span className="attendencePass">true</span>, <span className="attendencePass">true</span>, <span className="attendencePass">true</span>, <span className="attendenceFail">false</span>, <span className="attendencePass">true</span>, <span className="attendenceFail">false</span>, <span className="attendencePass">true</span>),
];

function getBarColor(marks, classes) {
  if (marks < 30) {
    return classes.failColor;
  }
  if (marks > 30 && marks < 65) {
    return classes.averageColor;
  }
  return classes.passColor;
}

function ProgressWithTitle(title, enrollDetails) {
  const classes = useStyles(style)();
  return (
    <Grid container className={classes.container} spacing="2">
      <Grid item xs={3} sm={2}>{title}</Grid>
      <Grid
        className={clsx(getBarColor((enrollDetails?.Q1Marks ? enrollDetails?.Q1Marks : enrollDetails.Q1HWMarks || 0), classes), classes.progressBar)}
        item
        xs={3}
        sm={3.4}
      >
        <LinearProgressBar value={enrollDetails?.Q1Marks || enrollDetails?.Q1HWMarks || 0} totalPercent maximumMarks={enrollDetails?.Q1MaxMarks || enrollDetails?.Q1MaxHWMarks || 0} />
      </Grid>

      <Grid
        className={clsx(getBarColor((enrollDetails?.Q2Marks || enrollDetails?.Q2HWMarks || 0), classes), classes.progressBar)}
        item
        xs={3}
        sm={3.4}
      >
        <LinearProgressBar value={enrollDetails?.Q2Marks || enrollDetails?.Q2HWMarks || 0} totalPercent maximumMarks={enrollDetails?.Q2MaxMarks || enrollDetails?.Q2MaxHWMarks || 0} />
      </Grid>

      <Grid
        item
        xs={3}
        sm={3.2}
        className={clsx(getBarColor((enrollDetails?.Q3Marks || enrollDetails?.Q3HWMarks || 0), classes), classes.progressBar)}
      >
        <LinearProgressBar value={enrollDetails?.Q2Marks || enrollDetails?.Q2HWMarks || 0} totalPercent maximumMarks={enrollDetails?.Q2MaxMarks || enrollDetails?.Q2MaxHWMarks || 0} />

      </Grid>
    </Grid>
  );
}

function gradeBanner(key, value) {
  const classes = useStyles(style)();
  return (
    <Grid container spacing="2" xs={12} className={classes.container}>
      <Grid item xs={5.8} className={classes.label}>
        {key}
      </Grid>
      <Grid item xs={6} className={classes.value}>
        :
        &nbsp;
        &nbsp;
        {value}
      </Grid>
    </Grid>
  );
}
export default function ReportCard({
  formik,
  studentId,
  courseId,
  courseName,
}) {
  const { t } = useTranslation();
  const classes = useStyles(style)();
  const [assignedYears, setAssignedYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);
  const [isYearSelected, setIsYearSelected] = useState(false);
  const { locationCoordinator } = useSelector((state) => ({
    locationCoordinator: state?.getLocationCoordinator,
  }));
  const getErrorText = (key, errorText) => (formik.touched[key] && formik.errors[key] ? (
    <span data-testid={key} className={classes.errorText}>
      {formik.errors[key]}
    </span>
  ) : errorText ? (
    <span className={classes.errorText}>
      {errorText}
    </span>
  ) : null);

  const dispatch = useDispatch();

  React.useEffect(() => {
    const payload = {
      studentId,
      courseId,
      academicYear: selectedYear,
    };
    dispatch(getStudentEnrollmentHistory(payload));
  }, [selectedYear]);

  const enrollDetails = useSelector((state) => state?.getStudent?.enrollmentDetails);

  const [isShowCertificate, setIsShowCertificate] = useState(true);

  const studentEnrollDetails = (details) => {
    const history = details;
    let marks = 0;
    history?.marks?.forEach((detail) => {
      detail?.studentDetailMarks?.forEach((obj) => {
        marks += obj.obtainedMarks;
      });
      if (detail.academicPanel.quarter === 'Q1') {
        history.Q1Marks = marks;
        history.Q1MaxMarks = detail.academicPanel.maximumMarks;
      } else if (detail.academicPanel.quarter === 'Q2') {
        history.Q2Marks = marks;
        history.Q2MaxMarks = detail.academicPanel.maximumMarks;
      } else if (detail.academicPanel.quarter === 'Q3') {
        history.Q3Marks = marks;
        history.Q3MaxMarks = detail.academicPanel.maximumMarks;
      }
    });
    history?.homeworkMarks?.forEach((detail) => {
      detail?.studentHomeworkMarksDetail?.forEach((obj) => {
        marks += obj.obtainedMarks;
      });
      if (detail.homeworkPanel.quarter === 'Q1') {
        history.Q1HWMarks = marks;
        history.Q1MaxHWMarks = detail.homeworkPanel.maximumMarks;
      } else if (detail.homeworkPanel.quarter === 'Q2') {
        history.Q2HWMarks = marks;
        history.Q2MaxHWMarks = detail.homeworkPanel.maximumMarks;
      } else if (detail.homeworkPanel.quarter === 'Q3') {
        history.Q3HWMarks = marks;
        history.Q3MaxHWMarks = detail.homeworkPanel.maximumMarks;
      }
    });
    return history;
  };

  React.useEffect(() => {
    if (!isYearSelected) {
      dispatch(getAcademicYears(false));
      if ((locationCoordinator?.academicYears || []).length > 0) {
        let years = locationCoordinator?.academicYears.map(
          (year) => ({ id: year, name: year }),
        );
        years = years.sort((a, b) => {
          const year1 = a.id.split('-')[0];
          const year2 = b.id.split('-')[0];
          return parseInt(year1, 10) - parseInt(year2, 10);
        });
        const currentYear = new Date().getFullYear();
        years = years.filter((opt) => parseInt(opt?.id.substring(0, 4), 10) <= currentYear);
        const defaultYear = years.filter((opt) => parseInt(opt?.id.substring(0, 4), 10) === currentYear);
        setAssignedYears(years);
        setSelectedYear(defaultYear[0]?.id);
      } else {
        const currentYear = new Date().getFullYear();
        const prevYear = new Date().getFullYear() - 1;
        const obj = { id: `${prevYear}-${currentYear}`, name: `${prevYear}-${currentYear}` };
        setAssignedYears([obj]);
      }
    }

    studentEnrollDetails(enrollDetails);

    if (courseName === 'BalaBadi - I' || courseName === 'BalaBadi - II' || courseName === 'Pravesam') {
      setIsShowCertificate(true);
    }
  }, [enrollDetails]);

  const componentRefReportCard = useRef();
  const componentRefCertificate = useRef();
  const componentRefHallTicket = useRef();

  const handlePrintReportCard = useReactToPrint({ content: () => componentRefReportCard.current });
  const handlePrintCertificate = useReactToPrint({
    content: () => componentRefCertificate.current,
  });
  const handlePrintHallTicket = useReactToPrint({
    content: () => componentRefHallTicket.current,
  });
  const [open, setOpen] = React.useState(false);
  const [openCertificate, setOpenCertificate] = React.useState(false);
  const [openHallTicket, setopenHallTicket] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenCertificate = () => {
    setOpenCertificate(true);
  };

  const handleClickOpenHallTicket = () => {
    setopenHallTicket(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeYear = (year) => {
    setSelectedYear(year);
    setIsYearSelected(true);
  };

  const download = (e) => {
    fetch(e.target.href, {
      method: 'GET',
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then((buffer) => {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement('FileDownloadOutlinedIcon');
          link.href = url;
          link.setAttribute('download', 'image.png'); // or any other extension
          document.body.appendChild(link);
          link.click();
        });
      });
  };
  return (
    <form
      noValidate
      autoComplete="off"
    >
      <Grid container spacing="2">
        <Grid container item xs={8} sm={7} md={9}>
          {isShowCertificate ? (
            <Grid item xs={4} sm={4} md={2.5} className={classes.certGrid}>
              <CardMedia
                className={classes.profileImg}
                component="img"
                width="15vw"
                image={Cert}
                alt="profile-img"
              />
              <Typography gutterBottom variant="h6" component="div" className={classes.prasunamName}>
                Prasunam
              </Typography>
              <Typography gutterBottom variant="body" component="div" className={classes.certificateFont} onClick={handleClickOpenCertificate}>
                Certificate
              </Typography>
            </Grid>
          ) : <div> </div>}
          <Grid item xs={8} sm={8} className={classes.bonusDiv}>
            {gradeBanner(t('BONUS'), enrollDetails.bonus)}
            {gradeBanner(t('GRADES'), enrollDetails.grade)}
            {gradeBanner(t('GPA'), enrollDetails.gpa)}
            {gradeBanner(t('ANNUAL_SCORE'), `${parseInt(enrollDetails.annualScore, 10)}%`)}
            {gradeBanner(t('RESULT'), t('PASS'))}
          </Grid>
        </Grid>
        <Grid
          item
          className={classes.container}
          xs={4}
          sm={5}
          md={3}
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
        >
          <Grid item xs={12} className={classes.alignGridYear}>
            <Dropdown
              id="academicYear"
              variant="standard"
              name="academicYear"
              placeholder={t('YEAR')}
              value={selectedYear}
              // options={academicYears.map((value) => ({
              //   id: value,
              //   name: value,
              // }))}
              options={assignedYears}
              customClass={classes.academicYearDropDown}
              customSelectClass={classes.academicYearDropDown}
              changeCss
              className={classes.academicYearDropDown}
              customFormControlCss={{ width: '100%' }}
              labelId="year"
              handleChange={(e) => handleChangeYear(e.target.value)}
            />
            {getErrorText('academicYear')}
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={12} />
          <Grid
            item
            xs={12}
            className={`${classes.reportCardLabel} ${classes.hallTic} ${classes.cursorPointer}`}
            onClick={handleClickOpenHallTicket}
          >
            {t('HALL_TICKET')}
            {' '}
            <span className={classes.hallTicketNum}>PROO28828</span>
          </Grid>
        </Grid>
      </Grid>

      <Divider className={classes.dividerLine} />
      <Grid container className={classes.Detailscontainer} direction="row" spacing="2">
        <Grid item xs={2} className={classes.reportCardLabelHeader}>
          {t('DETAILS')}
        </Grid>
        <Grid item xs={3.333} className={classes.reportCardLabelHeader}>
          {t('Q1')}
        </Grid>
        <Grid item xs={3.333} className={classes.reportCardLabelHeader}>
          {t('Q2')}
        </Grid>
        <Grid item xs={3.333} className={classes.reportCardLabelHeader}>
          {t('Q3')}
        </Grid>
        <Grid item xs={12} className={classes.reportCardLabel}>
          {
            ProgressWithTitle(
              t('SCORE'),
              enrollDetails,
            )
          }
          {
            ProgressWithTitle(
              t('HOMEWORK'),
              enrollDetails,
            )
          }
          {
            ProgressWithTitle(
              t('ATTENDENCE'),
              enrollDetails,
            )
          }
        </Grid>
      </Grid>
      <Grid item sx={{ textAlign: 'center', marginTop: '1vw' }}>
        <ButtonAtom
          btntype={Buttons.PRIMARY}
          name={t('REPORT_CARD')}
          onClick={handleClickOpen}
        // onClick={onClick}
        />
      </Grid>
      <DialogAtom
        isOpen={open}
        dialogHeading={t('REPORT_CARD')}
        secHandle={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        maxWidth="lg"
        customClass={classes.reportDialog}
        content={(
          <DialogContent
            p={0}
            ref={componentRefReportCard}
          >
            <Grid container>
              <Grid item xs={8} sm={6}>
                <Box>
                  <Typography variant="h5" gutterBottom component="div" className={classes.studentNameReportCard}>
                    Ananya Saileela Priayaga
                  </Typography>
                  <Box className={classes.courseText}>
                    <Typography mr={1} variant="body2" gutterBottom component="div">
                      Course (Section)  :
                    </Typography>
                    <Typography fontWeight="bold" variant="subtitle2" gutterBottom component="div">
                      Prakasam (A)
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4} sm={6}>
                <Box className={classes.printText}>
                  <Box className={classes.printSec} onClick={handlePrintReportCard}>
                    <Typography mr={1} variant="content" gutterBottom component="div">
                      {t('PRINT')}
                    </Typography>
                    <PrintIcon />
                  </Box>
                  <Typography variant="content" gutterBottom component="div" className={classes.hallTicket}>
                    {t('HALLTICKET#')}
                    {' '}
                    PR0028828
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <hr />
            <Grid container>
              <Grid item xs={12} md={3}>
                {gradeBanner(t('BONUS'), enrollDetails.bonus)}
                {gradeBanner(t('GRADES'), enrollDetails.grade)}
                {gradeBanner(t('GPA'), enrollDetails.gpa)}
                {gradeBanner(t('ANNUAL_SCORE'), `${parseInt(enrollDetails.annualScore, 10)}%`)}
                {gradeBanner(t('RESULT'), t('PASS'))}
              </Grid>
              <Grid container item xs={12} md={9} className={classes.container} direction="row" spacing="2">
                <Grid item xs={2} className={classes.reportCardLabelHeader}>
                  {t('DETAILS')}
                </Grid>
                <Grid item xs={3.4} className={classes.reportCardLabelHeader}>
                  {t('Q1')}
                </Grid>
                <Grid item xs={3.4} className={classes.reportCardLabelHeader}>
                  {t('Q2')}
                </Grid>
                <Grid item xs={2.5} className={classes.reportCardLabelHeader}>
                  {t('Q3')}
                </Grid>
                <Grid item xs={12} className={classes.reportCardLabel}>
                  {
                    ProgressWithTitle(
                      t('SCORE'),
                      enrollDetails,
                    )
                  }
                  {
                    ProgressWithTitle(
                      t('HOMEWORK'),
                      enrollDetails,
                    )
                  }
                  {
                    ProgressWithTitle(
                      t('ATTENDENCE'),
                      enrollDetails,
                    )
                  }
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.tableView}>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead className={classes.tableheadColor}>
                    <TableRow>
                      <TableCell colSpan={11}>
                        {t('QUARTER1')}
                        <small> - Score 80</small>
                      </TableCell>
                      <TableCell align="center">{t('TOTAL')}</TableCell>
                      <TableCell align="center">{t('TOTAL%')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableHead className={classes.tableheadBg}>
                    <TableRow>
                      <TableCell>{t('WEEK')}</TableCell>
                      <TableCell align="center">1</TableCell>
                      <TableCell align="center">2</TableCell>
                      <TableCell align="center">3</TableCell>
                      <TableCell align="center">4</TableCell>
                      <TableCell align="center">5</TableCell>
                      <TableCell align="center">6</TableCell>
                      <TableCell align="center">7</TableCell>
                      <TableCell align="center">8</TableCell>
                      <TableCell align="center">9</TableCell>
                      <TableCell align="center">10</TableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { borderBottom: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.class1}</TableCell>
                        <TableCell align="center">{row.class2}</TableCell>
                        <TableCell align="center">{row.class3}</TableCell>
                        <TableCell align="center">{row.class4}</TableCell>
                        <TableCell align="center">{row.class5}</TableCell>
                        <TableCell align="center">{row.class6}</TableCell>
                        <TableCell align="center">{row.class7}</TableCell>
                        <TableCell align="center">{row.class8}</TableCell>
                        <TableCell align="center">{row.class9}</TableCell>
                        <TableCell align="center">{row.class10}</TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <b>78</b>
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <b>45%</b>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid className={classes.tableView}>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead className={classes.tableheadColor}>
                    <TableRow>
                      <TableCell colSpan={11}>
                        {t('QUARTER2')}
                        <small> - Score 50</small>
                      </TableCell>
                      <TableCell align="center">{t('TOTAL')}</TableCell>
                      <TableCell align="center">{t('TOTAL%')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableHead className={classes.tableheadBg}>
                    <TableRow>
                      <TableCell>{t('WEEK')}</TableCell>
                      <TableCell align="center">1</TableCell>
                      <TableCell align="center">2</TableCell>
                      <TableCell align="center">3</TableCell>
                      <TableCell align="center">4</TableCell>
                      <TableCell align="center">5</TableCell>
                      <TableCell align="center">6</TableCell>
                      <TableCell align="center">7</TableCell>
                      <TableCell align="center">8</TableCell>
                      <TableCell align="center">9</TableCell>
                      <TableCell align="center">10</TableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { borderBottom: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.class1}</TableCell>
                        <TableCell align="center">{row.class2}</TableCell>
                        <TableCell align="center">{row.class3}</TableCell>
                        <TableCell align="center">{row.class4}</TableCell>
                        <TableCell align="center">{row.class5}</TableCell>
                        <TableCell align="center">{row.class6}</TableCell>
                        <TableCell align="center">{row.class7}</TableCell>
                        <TableCell align="center">{row.class8}</TableCell>
                        <TableCell align="center">{row.class9}</TableCell>
                        <TableCell align="center">{row.class10}</TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <b>78</b>
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <b>30%</b>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid className={classes.tableView}>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead className={classes.tableheadColor}>
                    <TableRow>
                      <TableCell colSpan={11}>
                        {t('QUARTER3')}
                        <small> - Score 10</small>
                      </TableCell>
                      <TableCell align="center">{t('TOTAL')}</TableCell>
                      <TableCell align="center">{t('TOTAL%')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableHead className={classes.tableheadBg}>
                    <TableRow>
                      <TableCell>{t('WEEK')}</TableCell>
                      <TableCell align="center">1</TableCell>
                      <TableCell align="center">2</TableCell>
                      <TableCell align="center">3</TableCell>
                      <TableCell align="center">4</TableCell>
                      <TableCell align="center">5</TableCell>
                      <TableCell align="center">6</TableCell>
                      <TableCell align="center">7</TableCell>
                      <TableCell align="center">8</TableCell>
                      <TableCell align="center">9</TableCell>
                      <TableCell align="center">10</TableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { borderBottom: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.class1}</TableCell>
                        <TableCell align="center">{row.class2}</TableCell>
                        <TableCell align="center">{row.class3}</TableCell>
                        <TableCell align="center">{row.class4}</TableCell>
                        <TableCell align="center">{row.class5}</TableCell>
                        <TableCell align="center">{row.class6}</TableCell>
                        <TableCell align="center">{row.class7}</TableCell>
                        <TableCell align="center">{row.class8}</TableCell>
                        <TableCell align="center">{row.class9}</TableCell>
                        <TableCell align="center">{row.class10}</TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <b>78</b>
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <b>40%</b>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </DialogContent>
        )}
      />

      <DialogAtom
        isOpen={openCertificate}
        maxWidth="lg"
        customClass={classes.imageModal}
        closeOnBlur={() => setOpenCertificate(false)}
        content={(
          <DialogContent
            p={0}
          >
            <Grid container className={classes.imageSec}>
              <Grid item xs={12} className={classes.rightIcons} display="flex" alignItems="center" justifyContent="flex-end">
                <ThemeProvider theme={toolTipTheme}>
                  <Tooltip title={t('PRINT')}>
                    <IconButton onClick={handlePrintCertificate}>
                      <PrintIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('DOWNLOAD')}>
                    <IconButton className={classes.downloadIcon} onClick={(e) => download(e)}>
                      <a
                        href={CertificateImage}
                        download
                      >
                        <FileDownloadOutlinedIcon />

                      </a>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('CLOSE')}>
                    <IconButton
                      className={classes.emailIcon}
                      onClick={() => setOpenCertificate(false)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                </ThemeProvider>
              </Grid>
              <CardMedia
                ref={componentRefCertificate}
                component="img"
                image={CertificateImage}
                alt="certificate"
              />
            </Grid>
          </DialogContent>
        )}
      />

      <DialogAtom
        isOpen={openHallTicket}
        maxWidth="lg"
        customClass={classes.imageModal}
        closeOnBlur={() => setopenHallTicket(false)}
        content={(
          <DialogContent
            p={0}
          >
            <Grid container className={classes.imageSec}>
              <Grid item xs={12} className={classes.rightIcons} display="flex" alignItems="center" justifyContent="flex-end">
                <ThemeProvider theme={toolTipTheme}>
                  <Tooltip title={t('PRINT')}>
                    <IconButton onClick={handlePrintHallTicket}>
                      <PrintIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('DOWNLOAD')}>
                    <IconButton className={classes.downloadIcon} onClick={(e) => download(e)}>
                      <a
                        href={HallTicketImage}
                        download
                      >
                        <FileDownloadOutlinedIcon />
                      </a>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('CLOSE')}>
                    <IconButton
                      className={classes.emailIcon}
                      onClick={() => setopenHallTicket(false)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                </ThemeProvider>
              </Grid>
              <CardMedia
                ref={componentRefHallTicket}
                // className={classes.profileImg}
                component="img"
                image={HallTicketImage}
                alt="certificate"
              />
            </Grid>
          </DialogContent>
        )}
      />
    </form>
  );
}
