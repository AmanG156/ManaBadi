/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useMemo } from 'react';
import {
  Grid, IconButton, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch } from 'react-redux';
import {
  useNavigate,
} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { Buttons, NavigateRoutes } from '../../../../constant';
import Constant from '../../../../store/constant';
import { getMarksDetails, postStudentMarksByQuarter } from '../../../../store/actions/getStudent';
import MailIcon from '../../../../assets/svg/mailIcon';
import UserIcon from '../../../../assets/svg/userIcon';
import Loader from '../../../../components/atoms/loader';
import useStudent from '../../../../custom-hooks/useStudent';
import Menu from '../helpers/menu';
import { Button } from '../../../../components/atoms';
import { useStyles } from './style';
import { useRegionStyles } from './region-style';
import { getLocalStorage, setLocalStorage } from '../../../../utils/localStorageMethod';
import userRoles from '../../../../constant/userRoles';
import CommonProfileImage from '../../../../components/molecules/common/CommonProfileImage';
import { impersonateUser } from '../../../../store/actions/getAdmin';
import StudentContext from '../../../../contexts/StudentProvider';
import useLocationCoordinator from '../../../../custom-hooks/useLocationCoordinator';

function Row(props) {
  const {
    row,
    handleCheck,
    isSelected,
    index,
    handleImpersonate,
    selectedFilter,
    onUpdateParentClick,
    recoveryDialogOpen,
    paymentDialogOpen,
    editExamDetailsOpen,
    setSwapCourseOrLocation,
    setEditStudentProfile,
    showStudentLogs,
    onClickMenu,
    onEditMenuClick,
    onClickCancelEnrollMenu,
    setOpenMarksPopUp,
    setDataAssignScore,
    setAssignLoading,
    setLoadingSpinner,
    loadingSpinner,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userRole = getLocalStorage('userRole');
  const [open, setOpen] = React.useState(false);
  const coordinatorInfo = useLocationCoordinator();
  const studentsByLocation = coordinatorInfo?.students;

  const isItemSelected = isSelected(row.studentName);
  const labelId = `enhanced-table-checkbox-${index}`;

  const MarksDetailsOpen = (rowInfo) => {
    const vCollapse = localStorage.getItem('collapseListStudent');
    setOpen(!JSON.parse(vCollapse));
    localStorage.setItem('collapseListStudent', !JSON.parse(vCollapse));
    setLoadingSpinner(true);
    dispatch(getMarksDetails({
      academicYear: rowInfo.enrolled_courses.academicYear,
      locationId: rowInfo.enrolled_courses.location.id,
      courseId: rowInfo.enrolled_courses.course.id,
      studentId: rowInfo.userId,
      studentName: rowInfo.studentName,
    }, setLoadingSpinner));
  };
  const openAssign = (fullName, courseName, quarterName, rowData, quarterValue) => {
    setOpenMarksPopUp(true);
    setAssignLoading(true);
    const aCourseName = studentsByLocation.map((item) => item.enrolled_courses[0].courseName);
    const aQuarter = ['Q1', 'Q2', 'Q3'];
    setDataAssignScore({
      fullName,
      courseName,
      quarterName,
      rowData,
      quarterValue,
      aCourseName,
      aQuarter,
      setAssignLoading,
    });
    dispatch(postStudentMarksByQuarter({
      studentId: rowData.id,
      locationId: rowData.enrolled_courses.location.id,
      courseId: rowData.enrolled_courses.course.id,
      academicYear: rowData.enrolled_courses.academicYear,
      quarter: quarterValue,
    }, setAssignLoading));
  };
  return (
    <>
      <TableRow
        onClick={() => handleCheck(row)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.studentName}
        selected={isItemSelected}
      >
        <TableCell padding="checkbox" className={classes.tableCellCheck}>
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              'aria-labelledby': labelId,
            }}
          />
        </TableCell>
        <TableCell
          className={classes.tableCellPictures}
          component="th"
          id={labelId}
          scope="row"
          padding="none"
        >
          <CommonProfileImage key={row.id} src={row.pictures} />
        </TableCell>
        <TableCell className={classes.tableCellStudent}>
          {row.studentName}
        </TableCell>
        <TableCell className={classes.tableCellParent}>
          {row.parentName}
        </TableCell>
        <TableCell className={classes.tableCellCenter}>
          {row.centerInfo}
        </TableCell>
        <TableCell className={classes.tableCellClass}>
          {row.classLevel}
        </TableCell>
        <TableCell className={classes.tableCellSection}>
          {row.section}
        </TableCell>
        <TableCell className={classes.tableCellDate}>
          {row.regDate}
        </TableCell>
        <TableCell className={classes.tableCellAction}>
          <Grid item xs={12} display="flex" alignItems="center">
            {userRole === userRoles.SUPER_ADMIN ? (
              <>
                <Tooltip title={t('SEND_EMAIL')}>
                  <IconButton
                    size="large"
                    color="inherit"
                    onClick={(event) => {
                      event.stopPropagation();
                      const emailStudents = [];
                      const emailParents = [];
                      emailParents.push(row.parent1Info?.personalEmail?.toString());
                      emailParents.push(row.parent2Info?.personalEmail?.toString());
                      emailStudents.push(row.studentInfo?.manabadiEmail?.toString());
                      const filtersList = [];
                      selectedFilter?.forEach((obj) => {
                        filtersList.push(obj);
                      });
                      setLocalStorage('showSelectAllinEmail', false);
                      dispatch({ type: Constant.RECIPIENTS, payload: emailStudents });
                      dispatch({ type: Constant.STUDENT_FILTERS, payload: filtersList });
                      dispatch({ type: Constant.MAIL_FILTER, payload: 'Student' });
                      dispatch({ type: Constant.MAIL_PARENTS, payload: emailParents });
                      navigate(NavigateRoutes.ADMIN_EMAIL);
                    }}
                  >
                    <MailIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('IMPERSONATE')}>
                  <IconButton
                    size="large"
                    color="inherit"
                    onClick={(event) => {
                      handleImpersonate(row);
                      event.stopPropagation();
                    }}
                  >
                    <UserIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Grid xs={4} />
            )}
            <Tooltip title={t('HELP')}>
              <Menu
                key={row?.id}
                t={t}
                rowInfo={row}
                {...{
                  onClickCancelEnrollMenu,
                  MarksDetailsOpen,
                  setOpen,
                  paymentDialogOpen,
                  editExamDetailsOpen,
                  onClickMenu,
                  setSwapCourseOrLocation,
                  recoveryDialogOpen,
                  onEditMenuClick,
                  onUpdateParentClick,
                  setEditStudentProfile,
                  showStudentLogs,
                }}
              />
            </Tooltip>
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottom: 'none' }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases" sx={{ minWidth: 500 }}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableMarksCourse} />
                    <TableCell className={classes.tableMarksCourse} />
                    <TableCell className={classes.tableMarksCourse} />
                    <TableCell className={classes.tableMarksHeaderMarks}>{t('MARKS')}</TableCell>
                    <TableCell className={classes.tableMarksCourse} />
                    <TableCell className={classes.tableMarksCourse} />
                    <TableCell className={classes.tableMarksHeaderHw} colSpan={9}>{t('HOMEWORK')}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell rowSpan={5} />
                    <TableCell className={classes.tableMarksCourse}>{t('COURSE')}</TableCell>
                    <TableCell className={classes.tableMarksQ}>{t('Q1')}</TableCell>
                    <TableCell className={classes.tableMarksQ}>{t('Q2')}</TableCell>
                    <TableCell className={classes.tableMarksQ}>{t('Q3')}</TableCell>
                    <TableCell className={classes.tableMarksQ}>{t('Q1')}</TableCell>
                    <TableCell className={classes.tableMarksQ}>{t('Q2')}</TableCell>
                    <TableCell className={classes.tableMarksQ}>{t('Q3')}</TableCell>
                    <TableCell className={classes.tableMarks}>{t('BONUS_MARKS')}</TableCell>
                    <TableCell className={classes.tableMarks}>{t('GRADE')}</TableCell>
                    <TableCell className={classes.tableMarks}>{t('GPA')}</TableCell>
                    <TableCell className={classes.tableMarks}>{t('ANNUAL_SCORE')}</TableCell>
                  </TableRow>
                </TableHead>
                {
                  loadingSpinner && (
                    <Box sx={{ display: 'flex', position: 'absolute', paddingLeft: '45%' }}>
                      <CircularProgress />
                    </Box>
                  )
                }
                {
                  !loadingSpinner && (
                    <TableBody>
                      {
                        studentsByLocation.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className={classes.tableMarksCourseR} />
                            <TableCell className={classes.tableMarksCourseR}>{item.enrolled_courses[0].courseName}</TableCell>
                            <TableCell className={classes.tablesMarksQR}>
                              <Box
                                component="span"
                                sx={{
                                  backgroundColor: 'yellowgreen', padding: '4px', borderRadius: '5px', cursor: 'pointer',
                                }}
                                onClick={() => openAssign(row.studentName, item.enrolled_courses[0].courseName, item.marks.Q1.obtainedMarks, row, 'Q1')}
                              >
                                {item.marks.Q1.obtainedMarks}
                              </Box>
                            </TableCell>
                            <TableCell className={classes.tablesMarksQR}>
                              <Box
                                component="span"
                                sx={{
                                  backgroundColor: 'yellowgreen', padding: '4px', borderRadius: '5px', cursor: 'pointer',
                                }}
                                onClick={() => openAssign(row.studentName, item.enrolled_courses[0].courseName, item.marks.Q2.obtainedMarks, row, 'Q2')}
                              >
                                {item.marks.Q2.obtainedMarks}
                              </Box>
                            </TableCell>
                            <TableCell className={classes.tablesMarksQR}>
                              <Box
                                component="span"
                                sx={{
                                  backgroundColor: 'yellowgreen', padding: '4px', borderRadius: '5px', cursor: 'pointer',
                                }}
                                onClick={() => openAssign(row.studentName, item.enrolled_courses[0].courseName, item.marks.Q3.obtainedMarks, row, 'Q3')}
                              >
                                {item.marks.Q3.obtainedMarks}
                              </Box>
                            </TableCell>
                            <TableCell className={classes.tablesMarksQR}>
                              <Box
                                component="span"
                                sx={{
                                  backgroundColor: 'yellowgreen', padding: '4px', borderRadius: '5px', cursor: 'pointer',
                                }}
                                // onClick={() => openAssign(row.studentName, item.enrolled_courses[0].courseName, item.homeworkMarks.Q1.obtainedMarks, row, 'Q1')}
                              >
                                {item.homeworkMarks.Q1.obtainedMarks}
                              </Box>
                            </TableCell>
                            <TableCell className={classes.tablesMarksQR}>
                              <Box
                                component="span"
                                sx={{
                                  backgroundColor: 'yellowgreen', padding: '4px', borderRadius: '5px', cursor: 'pointer',
                                }}
                                // onClick={() => openAssign(row.studentName, item.enrolled_courses[0].courseName, item.homeworkMarks.Q2.obtainedMarks, row, 'Q2')}
                              >
                                {item.homeworkMarks.Q2.obtainedMarks}
                              </Box>
                            </TableCell>
                            <TableCell className={classes.tablesMarksQR}>
                              <Box
                                component="span"
                                sx={{
                                  backgroundColor: 'yellowgreen', padding: '4px', borderRadius: '5px', cursor: 'pointer',
                                }}
                                // onClick={() => openAssign(row.studentName, item.enrolled_courses[0].courseName, item.homeworkMarks.Q3.obtainedMarks, row, 'Q3')}
                              >
                                {item.homeworkMarks.Q3.obtainedMarks}
                              </Box>
                            </TableCell>
                            <TableCell className={classes.tablesMarksQR}>
                              <Box
                                component="span"
                                sx={{
                                  backgroundColor: 'yellowgreen', padding: '4px', borderRadius: '5px', cursor: 'pointer',
                                }}
                              >
                                {item.bonus}
                              </Box>
                            </TableCell>
                            <TableCell className={classes.tablesMarksQ}>{item.grade}</TableCell>
                            <TableCell className={classes.tablesMarksQ}>{item.gpa}</TableCell>
                            <TableCell className={classes.tablesMarksQ}>{item.annualScore}</TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  )
                }
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function ListView({
  onUpdateParentClick,
  recoveryDialogOpen,
  paymentDialogOpen,
  editExamDetailsOpen,
  setSwapCourseOrLocation,
  setEditStudentProfile,
  showStudentLogs,
  onClickMenu,
  onEditMenuClick,
  onClickCancelEnrollMenu,
  isFetching,
  hasMore,
  loadMoreItems,
  selectedFilter,
  setOpenMarksPopUp,
  setDataAssignScore,
  setAssignLoading,
  setLoadingSpinner,
  loadingSpinner,
  filterOptions,
}) {
  let classes = useStyles();
  const { t } = useTranslation();
  const studentsData = useStudent()?.students || [];
  const studentCount = useStudent()?.totalCount || 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const userRole = getLocalStorage('userRole');
  const { onCheckboxChange } = useContext(StudentContext);
  const [selected, setSelected] = React.useState([]);
  const [sortOrder, setSortOrder] = React.useState({
    studentN: 'asc',
    parentN: 'asc',
    centerI: 'asc',
    classL: 'asc',
    sectionN: 'asc',
    regDateN: 'asc',
  });

  if (userRole === userRoles.REGION_COORDINATOR) {
    classes = useRegionStyles();
  }

  useEffect(() => {
    const emailList = [];
    const recipientList = [];
    emailList.push(selectedRows.map((student) => student?.parent1Info?.personalEmail));
    recipientList.push(selectedRows.map((student) => student?.studentInfo?.manabadiEmail));
    emailList.push(selectedRows.map((student) => student?.parent2Info?.personalEmail));
    setLocalStorage('adminBulkEmailStudents', emailList);
    setLocalStorage('adminBulkEmailStudents', emailList);
    setLocalStorage('adminBulkRecipientList', recipientList);
    onCheckboxChange(selectedRows);
  }, [selectedRows]);

  const handleImpersonate = (row) => {
    dispatch(impersonateUser({
      email: row?.studentInfo?.manabadiEmail,
    }));
    localStorage.setItem('impersonateUser', JSON.stringify({ state: { showView: true, email: row?.studentInfo?.manabadiEmail } }));
    setLocalStorage('myView', 'listView');

    navigate(NavigateRoutes.STUDENT_DASHBOARD, { state: { showView: true, email: row?.studentInfo?.manabadiEmail, filterOptions } });
  };

  let studentObj = {};
  const rowStudentData = useMemo(() => {
    if (!studentsData?.length) return [];
    const rows = [];
    studentsData?.forEach((student, index) => {
      studentObj = {
        ...student,
        id: student?.id,
        // id: index,
        key: index,
        pictures: student?.studentInfo?.profilePhoto,
        studentName: `${student?.studentInfo?.firstName} ${student?.studentInfo?.lastName}`,
        parentName: `${student?.parent1Info?.firstName} ${student?.parent1Info?.lastName}`,
        centerInfo: student?.enrolled_courses?.location?.name ? student?.enrolled_courses?.location?.name : student?.enrolled_courses[0]?.location?.name,
        classLevel: student?.enrolled_courses?.courseName ? student?.enrolled_courses?.courseName : student?.enrolled_courses[0]?.courseName,
        section: (student?.enrolled_courses?.google_class?.section ? student?.enrolled_courses?.google_class?.section : student?.enrolled_courses[0]?.google_class?.section) || '',
        regDate: new Date(student?.enrolled_courses?.createdAt)?.toLocaleDateString(),
        actions: 'popup',
      };
      rows.push(studentObj);
    });
    rows.sort((a, b) => a.studentName.localeCompare(b.studentName));
    return rows;
  }, [studentsData]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rowStudentData.map((n) => n.studentName);
      setSelectedRows(rowStudentData);
      setSelected(newSelecteds);
      return;
    }
    setSelectedRows([]);
    setSelected([]);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleCheck = (rowData) => {
    const selectedIndex = selected.indexOf(rowData.studentName);
    let newSelected = [];
    let aNewSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, rowData.studentName);
      aNewSelected = aNewSelected.concat(selectedRows, rowData);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      aNewSelected = aNewSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      aNewSelected = aNewSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
      aNewSelected = aNewSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1),
      );
    }

    setSelectedRows(aNewSelected);
    setSelected(newSelected);
  };

  const changeSortOrder = (filter, status) => {
    if (sortOrder[status] === 'desc') {
      setSortOrder((prevState) => ({
        ...prevState,
        [status]: 'asc',
      }));
      rowStudentData.sort((a, b) => a[filter].localeCompare(b[filter]));
    } else if (sortOrder[status] === 'asc') {
      rowStudentData.sort((a, b) => b[filter].localeCompare(a[filter]));
      setSortOrder((prevState) => ({
        ...prevState,
        [status]: 'desc',
      }));
    }
  };
  return (
    <Grid container className={`${classes.studentDetails} ${classes.withoutScroll}`}>
      {rowStudentData?.length > 0
        ? (
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" className={classes.check}>
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < rowStudentData.length}
                    checked={rowStudentData.length > 0 && selected.length === rowStudentData.length}
                    onChange={handleSelectAllClick}
                    inputProps={{
                      'aria-label': 'select all desserts',
                    }}
                  />
                </TableCell>
                <TableCell className={classes.picture}>{t('PICTURES')}</TableCell>
                <TableCell className={classes.studentName}>
                  <TableSortLabel
                    active
                    onClick={() => changeSortOrder('studentName', 'studentN')}
                    IconComponent={sortOrder.studentN === 'asc' ? ArrowDropDownIcon : ArrowDropUpIcon}
                    className={classes.studentNameLabel}
                  >
                    {t('STUDENT_NAME')}
                  </TableSortLabel>
                </TableCell>
                <TableCell className={classes.parentName}>
                  <TableSortLabel
                    active
                    onClick={() => changeSortOrder('parentName', 'parentN')}
                    IconComponent={sortOrder.parentN === 'asc' ? ArrowDropDownIcon : ArrowDropUpIcon}
                    className={classes.studentNameLabel}
                  >
                    {t('PARENT_NAME')}
                  </TableSortLabel>
                </TableCell>
                <TableCell className={classes.centerInfo}>
                  <TableSortLabel
                    active
                    onClick={() => changeSortOrder('centerInfo', 'centerI')}
                    IconComponent={sortOrder.centerI === 'asc' ? ArrowDropDownIcon : ArrowDropUpIcon}
                    className={classes.studentNameLabel}
                  >
                    {t('CENTER_INFO')}
                  </TableSortLabel>
                </TableCell>
                <TableCell className={classes.classLevel}>
                  <TableSortLabel
                    active
                    onClick={() => changeSortOrder('classLevel', 'classL')}
                    IconComponent={sortOrder.classL === 'asc' ? ArrowDropDownIcon : ArrowDropUpIcon}
                    className={classes.studentNameLabel}
                  >
                    {t('CLASS_LEVEL')}
                  </TableSortLabel>
                </TableCell>
                <TableCell className={classes.section}>
                  <TableSortLabel
                    active
                    onClick={() => changeSortOrder('section', 'sectionN')}
                    IconComponent={sortOrder.sectionN === 'asc' ? ArrowDropDownIcon : ArrowDropUpIcon}
                    className={classes.studentNameLabel}
                  >
                    {t('SECTION')}
                  </TableSortLabel>
                </TableCell>
                <TableCell className={classes.regDate}>
                  <TableSortLabel
                    active
                    onClick={() => changeSortOrder('regDate', 'regDateN')}
                    IconComponent={sortOrder.regDateN === 'asc' ? ArrowDropDownIcon : ArrowDropUpIcon}
                    className={classes.studentNameLabel}
                  >
                    {t('REG_DATE')}
                  </TableSortLabel>
                </TableCell>
                <TableCell className={classes.actions}>{t('ACTIONS')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                rowStudentData.map((row, index) => (
                  <Row
                    row={row}
                    handleCheck={handleCheck}
                    isSelected={isSelected}
                    index={index}
                    handleImpersonate={handleImpersonate}
                    selectedFilter={selectedFilter}
                    onUpdateParentClick={onUpdateParentClick}
                    recoveryDialogOpen={recoveryDialogOpen}
                    paymentDialogOpen={paymentDialogOpen}
                    editExamDetailsOpen={editExamDetailsOpen}
                    setSwapCourseOrLocation={setSwapCourseOrLocation}
                    setEditStudentProfile={setEditStudentProfile}
                    showStudentLogs={showStudentLogs}
                    onClickMenu={onClickMenu}
                    onEditMenuClick={onEditMenuClick}
                    onClickCancelEnrollMenu={onClickCancelEnrollMenu}
                    setOpenMarksPopUp={setOpenMarksPopUp}
                    setDataAssignScore={setDataAssignScore}
                    setAssignLoading={setAssignLoading}
                    setLoadingSpinner={setLoadingSpinner}
                    loadingSpinner={loadingSpinner}
                  />
                ))
              }
              <TableRow>
                <TableCell className={classes.totalRowCount} colSpan={10}>
                  <span>
                    Total Rows
                    {' '}
                    {rowStudentData?.length}
                    {' '}
                    of
                    {' '}
                    {studentCount}
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.loadMore} colSpan={10}>
                  {isFetching && <p>{t('FETCHING_STUDENTS')}</p>}
                  {!isFetching && hasMore && (
                    <Button
                      name={t('LOAD_MORE')}
                      btntype={Buttons.PRIMARY}
                      onClick={() => loadMoreItems(rowStudentData?.length)}
                    />
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : rowStudentData.length === 0 ? (
          <Grid container className={classes.noData}>
            <Grid item xs={12}>
              <DoNotDisturbIcon />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                {t('NO_DATA')}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Grid>
            <Loader message={t('LOADING')} />
          </Grid>
        )}
      {/* {rowStudentData?.length > 0
        ? (
          <>
            <Grid xs={12} className={classes.totalRowCount}>
              <span>
                Total Rows
                {' '}
                {rowStudentData?.length}
                {' '}
                of
                {' '}
                {studentCount}
              </span>
            </Grid>
            <Grid xs={12} className={classes.loadMore}>
              {isFetching && <p>{t('FETCHING_STUDENTS')}</p>}
              {!isFetching && hasMore && (
                <Button
                  name={t('LOAD_MORE')}
                  btntype={Buttons.PRIMARY}
                  onClick={() => loadMoreItems(rowStudentData?.length)}
                />
              )}
            </Grid>
          </>
        ) : null} */}
    </Grid>
  );
}
