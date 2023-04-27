import React, { memo, useState } from 'react';
import {
  useNavigate,
} from 'react-router-dom';
import { Grid, IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import GridViewIcon from '@mui/icons-material/GridView';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import AutoRenewIcon from '@mui/icons-material/Autorenew';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useFormik } from 'formik';
import _ from 'lodash';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import ListViewIcon from '../../../../assets/svg/listViewIcon';
import ButtonAtom from '../../../../components/atoms/button';
import CheckboxAtom from '../../../../components/atoms/checkbox';
import { DialogAtom, Dropdown } from '../../../../components/atoms';
import { filterYearOptions } from '../constants';
import { colors } from '../../../../theme';
import {
  CenterInfo, CourseInfo, ExamDetails, ParentInfo, StudentInfo,
} from '../../../admin-dashboard/students/checkboxData';
import { getMarksDetailsbyStudents } from '../../../../store/actions/getStudent';
import { NavigateRoutes, Buttons } from '../../../../constant';
import Constant from '../../../../store/constant';
import { getLocalStorage, setLocalStorage } from '../../../../utils/localStorageMethod';
import MediaUploader from '../../../../utils/upload';
import constant from '../../../../constant/config';

const useStyles = makeStyles((theme) => ({
  alignGrid: {
    // paddingBottom: 25,
    // maxWidth: '25%',
    '&.MuiGrid-root.MuiGrid-item': {
      paddingTop: 0,
      paddingLeft: 0,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none !important',
      borderBottom: `0.1vw solid ${colors.primary} !important`,
      borderRadius: '0 !important',
    },
    '&.Mui-focused.MuiOutlinedInput-notchedOutline': {
      borderBottom: `0.2vw solid ${colors.primary}`,
    },
    '&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderBottom: `0.2vw solid ${colors.errorText}`,
    },
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderBottom: `0.1vw solid ${colors.errorText}`,
    },
    '& .MuiFormControl-root': {
      margin: '10px 0 !important',
      paddingRight: '20px',
      '@media (min-width: 1200px)': {
        width: '100%',
        maxWidth: '8vw',
      },
      '@media (max-width: 1200px)': {
        width: '100%',
        maxWidth: '300px',
      },
      '& .MuiFormControl-root': {
        margin: '0 !important',
        width: '100%',
      },
    },
  },
  rightIcons: {
    textAlign: 'right',
    borderRadius: '0.4vw !important',
    position: 'relative',
    padding: '1vw 0.5vw',
    marginLeft: 'auto',
    '& svg': {
      width: '1.5vw',
      height: '1.5vw',
      color: colors.black,
      [theme.breakpoints.down('md')]: {
        width: 16,
        height: 16,
      },
    },
    '&:hover': {
      backgroundColor: 'white !important',
      minHeight: '3px !important',
    },
  },
  emailIcon: {
    marginRight: 30,
  },
  toggleButtonGrp: {
    border: '0.1vw solid #ccc',
    borderRadius: '0.4vw',
    maxHeight: '2.5vw',
    paddingRight: 1,
    [theme.breakpoints.down('md')]: {
      maxHeight: 'inherit',
    },
  },
  toggleMainHeaderList: {
    paddingLeft: 52,
    borderRadius: '0.8vw 0vw 0vw 0.8vw',
    border: '0 !important',
    '&.MuiButtonBase-root.MuiToggleButton-root': {
      lineHeight: 'normal',
      width: '4vw !important',
      padding: '0.9vw 0.5vw 0.5vw 0.5vw',
      [theme.breakpoints.down('md')]: {
        width: '35px !important',
        height: '35px !important',
        padding: '0 5px !important',
        lineHeight: '35px !important',
      },
      '&:hover': {
        background: colors.toggleButtonBG,
        borderRadius: '0.4vw 1vw 1vw 0.4vw',
        '& svg': {
          color: colors.white,
        },
      },
      '&.Mui-selected': {
        background: colors.toggleButtonBG,
        borderRadius: '0.4vw 1vw 1vw 0.4vw',
        '& svg': {
          color: colors.white,
        },
      },
    },
  },
  toggleButtonCard: {
    borderRadius: '0.8vw 0vw 0vw 0.8vw',
    border: '0 !important',
    '&.MuiButtonBase-root.MuiToggleButton-root': {
      width: '4vw !important',
      padding: '0.5vw !important',
      [theme.breakpoints.down('md')]: {
        width: '35px !important',
        height: '35px !important',
        padding: '0 5px !important',
      },
      '&:hover': {
        background: colors.toggleButtonBG,
        borderRadius: '1vw 0.4vw 0.4vw 1vw',
        '& svg': {
          color: colors.white,
        },
      },
      '&.Mui-selected': {
        background: colors.toggleButtonBG,
        borderRadius: '1vw 0.4vw 0.4vw 1vw',
        '& svg': {
          color: colors.white,
        },
      },
    },
  },
  studentExportDialogAtom: {
    '& .MuiDialog-paper': {
      '@media (min-width: 1200px)': {
        minWidth: '80vw !important',
        maxWidth: '60vw !important',
      },
      '& .MuiFormControl-root': {
        margin: '0 !important',
        width: '0% !important',
      },
    },
  },
  studentBox: {
    maxWidth: 'unset !important',
    '& .MuiGrid-item': {
      maxWidth: 'unset !important',
      textAlign: 'right !important',
    },
  },
  selectAll: {
    marginLeft: '15%',
    display: 'flex !important',
    justifyContent: 'flex-start',
    '& .MuiFormControlLabel-label': {
      color: 'rgba(0, 0, 0, 0.87) !important',
      width: '120px !important',
    },
  },
  checkbox: {
    display: 'flex !important',
    marginBottom: '12px',
    // justifyContent: 'space-around',
    '& .MuiFormControlLabel-label': {
      color: 'rgba(0, 0, 0, 0.87) !important',
    },
    '& div>MuiBox-root:first-child': {
      width: '25%',
    },
  },
  checkboxHead: {
    display: 'flex',
    // justifyContent: 'space-around',
    margin: '5px 0 0px 0px !important',
    color: '#104F96',
    minWidth: '15%',
    position: 'relative',
    '& p': {
      margin: '0',
      '@media (max-width: 1200px)': {
        paddingRight: '15px',
      },
      '& span': {
        '@media (min-width: 1200px)': {
          position: 'absolute',
          right: '30px',
        },
      },
    },
  },
  checkboxContent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '75%',
    '& .MuiFormControlLabel-root': {
      minWidth: '230px',
    },
    '& css-1vgzwi7-MuiFormControl-root:last child': {
      width: '0% !important',
      margin: '0 !important',
    },
  },
  dialogCheckbox: {
    '& .MuiDialog-paper': {
      margin: '0 !important',
      width: '100% !important',
    },
  },
  errorText: {
    color: colors.errorText,
    fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
  },
  alertprimary: {
    height: '3vw',
    display: 'flex',
    color: colors.green,
  },
  downloadIconDisable: {
    opacity: '.6',
    cursor: 'not-allowed',
  },
  downloadIcon: {
    opacity: '.9',
    cursor: 'pointer',
  },
}));

function MainViewHeader(props) {
  const {
    view,
    studentFilterViews,
    filterOptions,
    refreshSort,
    handleView,
    getFilterViewOptions,
    setView,
    setSelectedFilter,
    setFilterOptions,
    filterByYearDropDown,
    setError,
    selectedFilter,
    isSelectedCheckbox,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const reduxStore = useSelector((state) => state?.getStudent?.students);
  const [loading, setLoading] = useState(false);
  const [issetopenCSVDialog, setOpenCSVDialog] = useState(false);
  const [issetOkOpenDialog, setOkOpenDialog] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const dispatch = useDispatch();
  const [checkMarks, setCheckMarks] = useState(false);

  const toggleList = () => {
    setError('');
    setView('listView');
    setLocalStorage('myView', 'listView');
  };
  const onGroupAutoCompleteSelection = (e, val) => {
    setError('');
    setSelectedFilter(val);
    const updatedFilOptions = [...filterOptions].map((fiOpt) => {
      const opts = fiOpt.options;
      const options = opts.map((op) => {
        const findIn = _.findIndex(val, {
          label: op.label,
          groupBy: fiOpt.label,
        });
        if (findIn !== -1) {
          return { ...op, checked: true };
        }
        return { ...op, checked: false };
      });
      return { ...fiOpt, options };
    });
    setFilterOptions(updatedFilOptions);
  };
  const toggleCard = () => {
    setError('');
    setView('cardView');
    setLocalStorage('myView', 'cardView');
  };
  const formik = useFormik({
    initialValues: {
      filterYear: '',
      filterView: '',
    },
  });
  const navigate = useNavigate();
  const handleCheck = (event, item) => {
    if (item === 'Q1Marks' || item === 'Q2Marks' || item === 'Q3Marks' || item === 'Q1Homework' || item === 'Q2Homework' || item === 'Q3Homework' || item === 'BonusMarks') {
      setCheckMarks(true);
    }
    const { checked } = event.target;
    if (event.target.checked) {
      setIsCheck([...isCheck, item]);
    }
    if (!checked) {
      setIsCheck(isCheck.filter((value) => value !== item));
    }
  };
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setCheckMarks(true);
      const allcheck = [];
      CenterInfo.map((ci) => allcheck.push(ci.id));
      CourseInfo.map((ci) => allcheck.push(ci.id));
      ExamDetails.map((ed) => allcheck.push(ed.id));
      ParentInfo.map((pi) => allcheck.push(pi.id));
      StudentInfo.map((si) => allcheck.push(si.id));
      setIsCheck(allcheck);
    } else {
      setIsCheck([]);
      setCheckMarks(false);
    }
    setIsCheckAll(e.target.checked);
  };

  const read = (obj, path) => {
    let o = obj;
    for (let p = 0; p < path.length; p += 1) {
      if (o && path[p] && o[path[p]]) {
        o = o[path[p]];
      } else {
        o = '';
      }
    }
    let data;
    if (checkMarks === true) {
      const oString = o.toString();
      data = oString.split(',').join('-');
    } else {
      data = o.split(',').join('-');
    }
    return data;
  };
  const handleFileSelect = (record) => {
    const files = record?.data;
    const fileName = record?.fileName;
    const gettoken = getLocalStorage('accessToken');
    const baseUrl = JSON.parse(gettoken);
    const uploader = new MediaUploader({
      file: files,
      filename: fileName,
      contentType: record?.fileType,
      baseUrl: constant.REACT_APP_GOOGLE_DRIVE_BASE_URL,
      token: baseUrl?.access_token,
      onComplete: () => {
        setOpenCSVDialog(false);
        setOkOpenDialog(true);
        setLoading(false);
      },
    });
    uploader.upload();
  };

  const handleExportToCsv = (dataStudents) => {
    setLoading(true);
    const heading = [];
    isCheck.forEach((item) => {
      heading.push(item.split('?.').join('/'));
    });
    const filterData = [];
    let column = [];
    const filterstudents = reduxStore.filter(
      (x) => isSelectedCheckbox.find((id) => id === x?.studentInfo?.id),
    );
    if (checkMarks === true) {
      for (let index = 0; index < filterstudents.length; index++) {
        const result = dataStudents.find((item) => item.id === filterstudents[index].id);
        filterstudents[index].Q1Marks = result.marks.Q1.obtainedMarks;
        filterstudents[index].Q2Marks = result.marks.Q2.obtainedMarks;
        filterstudents[index].Q3Marks = result.marks.Q3.obtainedMarks;
        filterstudents[index].Q1Homework = result.homeworkMarks.Q1.obtainedMarks;
        filterstudents[index].Q2Homework = result.homeworkMarks.Q2.obtainedMarks;
        filterstudents[index].Q3Homework = result.homeworkMarks.Q3.obtainedMarks;
        filterstudents[index].BonusMarks = result.bonus;
      }
    }
    filterstudents.forEach((item) => {
      const newItem = {};
      isCheck.forEach((key) => {
        const key1 = key.split('?.');
        const datas = read(item, key1);
        column = key.split('?.').join('/');
        if (datas) {
          newItem[column] = datas;
        } else {
          newItem[column] = '';
        }
      });
      filterData.push(newItem);
    });
    const studentCsv = filterData.reduce((acc, user) => {
      const fields = heading;
      acc.push([fields.map((f) => user[f])].join(','));
      return acc;
    }, []);
    const csvHeaders = heading.join(',');
    const date = new Date();
    handleFileSelect({
      data: [...[csvHeaders], ...studentCsv].join('\n'),
      fileName: `student-${date}.csv`,
      fileType: 'text/csv',
    });
  };

  const handleExportToCsvMarks = () => {
    if (checkMarks === true) {
      const filterstudents = reduxStore.filter(
        (x) => isSelectedCheckbox.find((id) => id === x?.studentInfo?.id),
      );
      const payload = filterstudents.map((item) => {
        return {
          academicYear: item.enrolled_courses.academicYear,
          courseId: item.enrolled_courses.course.id,
          locationId: item.enrolled_courses.location.id,
          studentId: item.userId,
          studentName: `${item.studentInfo.firstName} ${item.studentInfo.lastName}`,
        };
      });
      setLoading(true);
      dispatch(getMarksDetailsbyStudents(payload, handleExportToCsv));
    } else {
      handleExportToCsv([]);
      setCheckMarks(false);
    }
  };

  const handleOkDialog = () => {
    setOkOpenDialog(false);
  };

  const handleCSVDialog = () => {
    if (isSelectedCheckbox?.length > 0) {
      setOpenCSVDialog(true);
    } else {
      setOpenCSVDialog(false);
    }
  };
  const renderDownloadCSVFileContent = () => (
    <Grid className={classes.studentBox}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div className={classes.selectAll}>
          <div>
            <CheckboxAtom
              label={t('SELECT_ALL')}
              id="acceptCheckbox"
              checked={isCheckAll}
              handleChange={(e) => handleSelectAll(e)}
            />
          </div>
          <div>&nbsp;</div>
        </div>
        <div className={classes.checkbox}>
          <div className={classes.checkboxHead}>
            <p>
              {t('CENTER_INFO')}
              <span>:</span>
            </p>
          </div>
          <div className={classes.checkboxContent}>
            {CenterInfo.map((obj) => (
              <Grid xs={12} sm={6} lg={2.4}>
                <CheckboxAtom
                  checked={isCheck.includes(obj.id)}
                  customClasses="dialogCheckbox"
                  value={obj.id}
                  label={obj.lable}
                  handleChange={(e) => handleCheck(e, obj.id)}
                />
              </Grid>
            ))}
          </div>
        </div>
        <div className={classes.checkbox}>
          <div className={classes.checkboxHead}>
            <p>
              {t('COURSE_INFO')}
              <span>:</span>
            </p>
          </div>
          <div className={classes.checkboxContent}>
            {CourseInfo.map((obj) => (
              <Grid xs={12} sm={6} lg={2.4}>
                <CheckboxAtom
                  checked={isCheck.includes(obj.id)}
                  value={obj.id}
                  label={obj.lable}
                  handleChange={(e) => handleCheck(e, obj.id)}
                />
              </Grid>
            ))}
          </div>
        </div>
        <div className={classes.checkbox}>
          <div className={classes.checkboxHead}>
            <p>
              {t('EXAM_DETAILS')}
              <span>:</span>
            </p>
          </div>
          <div className={classes.checkboxContent}>
            {ExamDetails.map((obj) => (
              <Grid xs={12} sm={6} lg={2.4}>
                <CheckboxAtom
                  checked={isCheck.includes(obj.id)}
                  value={obj.id}
                  label={obj.lable}
                  handleChange={(e) => handleCheck(e, obj.id)}
                />
              </Grid>
            ))}
          </div>
        </div>
        <div className={classes.checkbox}>
          <div className={classes.checkboxHead}>
            <p>
              {t('PARENT_INFO')}
              <span>:</span>
            </p>
          </div>
          <div className={classes.checkboxContent}>
            {ParentInfo.map((obj) => (
              <Grid xs={12} sm={6} lg={2.4}>
                <CheckboxAtom
                  checked={isCheck.includes(obj.id)}
                  value={obj.id}
                  label={obj.lable}
                  handleChange={(e) => handleCheck(e, obj.id)}
                />
              </Grid>
            ))}
          </div>
        </div>
        <div className={classes.checkbox}>
          <div className={classes.checkboxHead}>
            <p>
              {t('STUDENT_INFO')}
              <span>:</span>
            </p>
          </div>
          <div className={classes.checkboxContent}>
            {StudentInfo.map((obj) => (
              <Grid xs={12} sm={6} lg={2.4}>
                <CheckboxAtom
                  checked={isCheck.includes(obj.id)}
                  value={obj.id}
                  label={obj.lable}
                  handleChange={(e) => handleCheck(e, obj.id)}
                />
              </Grid>
            ))}
          </div>
        </div>
      </Box>
      <Grid item xs={12} className={`${classes.dialogButtons} ${classes.popupButton}`}>
        <ButtonAtom
          className={classes.popupBtn}
          name={t('CANCEL')}
          onClick={() => setOpenCSVDialog(false)}
          btntype={Buttons.SECONDARY}
        />
        <ButtonAtom
          className={classes.popupBtn}
          name={t('EXPORT_TO_NEW_SHEET')}
          btntype={Buttons.PRIMARY}
          onClick={handleExportToCsvMarks}
        />
      </Grid>
    </Grid>
  );

  const renderOkContent = () => (
    <Grid className={classes.studentBox}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid>
          <div className={classes.alertprimary} role="alert">
            {t('STUDENT_CSV_EXPORTED_SUCCESSFULLY')}
          </div>
        </Grid>
      </Box>
      <Grid item xs={12} className={`${classes.dialogButtons} ${classes.popupButton}`}>
        <ButtonAtom
          className={classes.popupBtn}
          name={t('OK')}
          onClick={handleOkDialog}
          btntype={Buttons.PRIMARY}
        />
      </Grid>
    </Grid>
  );

  const sendBulkEmail = () => {
    const recipientList = getLocalStorage('adminBulkRecipientList')?.split(',');
    const emailList = getLocalStorage('adminBulkEmailStudents')?.split(',');
    const filtersList = [];
    selectedFilter?.forEach((obj) => {
      filtersList.push(obj);
    });
    let showSelectAll = false;
    if (recipientList?.length === 1 && recipientList?.[0] === '' && emailList?.length === 1 && emailList?.[0] === ''
      && filtersList?.length === 0) {
      showSelectAll = true;
    }
    setLocalStorage('showSelectAllinEmail', showSelectAll);
    dispatch({ type: Constant.RECIPIENTS, payload: recipientList });
    dispatch({ type: Constant.STUDENT_FILTERS, payload: filtersList });
    dispatch({ type: Constant.MAIL_PARENTS, payload: emailList });
    dispatch({ type: Constant.MAIL_FILTER, payload: 'Student' });
    navigate(NavigateRoutes.ADMIN_EMAIL);
  };

  return (
    <div>
      <Grid>
        <Grid container>
          <Grid item xs={5} sm={3} md={2} className={classes.alignGrid}>
            <Dropdown
              minWidth="100%"
              label={t('YEAR')}
              id="filterYear"
              name="filterYear"
              value={formik.values.filterYear}
              handleChange={(e) => {
                formik.handleChange(e);
                if (e.target.value === '') {
                  return;
                }

                filterByYearDropDown(e.target.value);
              }}
              options={filterYearOptions}
            />
          </Grid>
          {/* <Grid item xs={1} sm={0.5} /> */}
          <Grid item xs={7} sm={9} md={10} className={classes.alignGrid}>
            <Dropdown
              minWidth="100%"
              label={t('VIEWS')}
              id="filterView"
              name="filterView"
              isStudentsFilter
              className=""
              value={formik.values.filterView}
              handleChange={(e) => {
                formik.handleChange(e);
                if (e.target.value === '') {
                  onGroupAutoCompleteSelection({}, []);
                  return;
                }
                const vi = studentFilterViews.find(
                  (fi) => fi.id === e.target.value,
                );
                onGroupAutoCompleteSelection({}, JSON.parse(vi.queryData));
              }}
              options={getFilterViewOptions()}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            className={classes.rightIcons}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Tooltip title={t('REFRESH')}>
              <IconButton onClick={refreshSort}>
                <AutoRenewIcon />
              </IconButton>
            </Tooltip>
            <div className={isSelectedCheckbox?.length > 0 ? classes.downloadIcon : classes.downloadIconDisable}>
              <Tooltip title={t('DOWNLOAD')} onClick={handleCSVDialog}>
                <IconButton>
                  <FileDownloadOutlinedIcon />
                </IconButton>
              </Tooltip>
            </div>
            <DialogAtom
              isOpen={issetopenCSVDialog}
              dialogHeading={t('STUDENT_EXPORT')}
              customClass={classes.studentExportDialogAtom}
              content={renderDownloadCSVFileContent()}
              secHandle={() => setOpenCSVDialog(false)}
              loading={loading}
            />
            <DialogAtom
              isOpen={issetOkOpenDialog}
              dialogHeading={t('STUDENT_EXPORT')}
              customClass={classes.DialogAtom}
              content={renderOkContent()}
              secHandle={() => setOkOpenDialog(false)}
            />
            <Tooltip title={t('SEND_EMAIL')}>
              <IconButton
                className={classes.emailIcon}
                onClick={() => sendBulkEmail()}
              >
                <EmailOutlinedIcon />
              </IconButton>
            </Tooltip>
            <ToggleButtonGroup
              value={view}
              exclusive
              aria-label="text alignment"
              onChange={handleView}
              className={classes.toggleButtonGrp}
            >
              <ToggleButton
                value="listView"
                aria-label="listView"
                className={classes.toggleMainHeaderList}
                onClick={toggleList}
              >
                <ListViewIcon />
              </ToggleButton>
              <ToggleButton
                value="cardView"
                aria-label="cardView"
                className={classes.toggleButtonCard}
                onClick={toggleCard}
              >
                <GridViewIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        {/* <span className={classes.errorText}>{error}</span> */}
      </Grid>
    </div>
  );
}

export default memo(MainViewHeader);
