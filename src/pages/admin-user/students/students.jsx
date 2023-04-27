/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
import React, { useState, memo, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import ClearIcon from '@mui/icons-material/Clear';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import StudentFilters from '../filters';
import {
  getAllCourses,
  getLocations,
  getTShirts,
  getAcademicGrades,
  getExtraCurricularActivities,
  addFilterView,
  getAllFilter,
  getAllFilterView,
  getAllStudentsByAdmin,
  getAllStudents,
} from '../../../store/actions/getStudent';
import {
  getHearAboutUs,
  getVolunteers,
  editParentAction,
} from '../../../store/actions/getParent';
import { getStudentPaymentInfo } from '../../../store/actions/getPayment';
import { Buttons, NavigateRoutes } from '../../../constant';
import ParentInfo from '../../register/parent-info/index';
import SwapCourseLocation from '../swap-course-location';
import CancelEnroll from '../cancel-enroll';
import EditStudent from './edit-student/edit';
// import EditExamDetails from './edit_Exam_Details/index';
import { getMaskedEmail } from '../../../utils/methods';
import { postForgotPassword } from '../../../store/actions/auth';
import {
  Loader,
} from '../../../components/atoms';
import ButtonAtom from '../../../components/atoms/button';
import {
  Main,
  AppBar,
  DrawerHeader,
  DrawerWidth,
  getStudentObj,
  getParentInfoObj,
  getParentPayload,
  parentInfoInitialValues,
  SwapCourseDialogFooter,
  getCancelEnrollStudentObj,
} from './helper';
import Header from './header/header';
import DisplayDialog from './dialogs/dialogs';
import useDispatchHook from '../../../custom-hooks/useDispatch';
import MainViewWithHeader from './main-view-with-header/mainViewWithHeader';
import useDataTableParams from '../../../custom-hooks/useDataTableParams';
import useStudent from '../../../custom-hooks/useStudent';
import { useStyles } from './student-style';
import userRoles from '../../../constant/userRoles';
import { getLocalStorage } from '../../../utils/localStorageMethod';
import AssignScore from './assign-score/index';

function Students() {
  const {
    pageNumber,
    pageLimit,
    nextPage,
    setIsFetching,
    isFetching,
    hasMore,
    handlePageNumberChange,
  } = useDataTableParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [parentLoading, setParentLoading] = useState(false);
  const [localFilterPayload, setLocalFilterPayload] = useState({});
  const [openMarksPopUp, setOpenMarksPopUp] = useState(false);
  const [dataAssignScore, setDataAssignScore] = useState({});
  const [assignLoading, setAssignLoading] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = React.useState(false);

  const { state } = useLocation();

  useDispatchHook([
    getAllFilterView, getVolunteers, getAllCourses, getHearAboutUs, getLocations, getTShirts, getAcademicGrades, getExtraCurricularActivities, getAllFilter,
  ]);

  React.useEffect(() => {
    setLoading(true);
    // dispatch(getAllStudentsByAdmin(1, 100, '', setLoading, localFilterPayload));
  }, []);

  const classes = useStyles();
  const { t } = useTranslation();
  const [studentInfo, setStudentInfo] = useState(0);
  const [studentFormError, setStudentFormError] = useState(0);
  const [customForm, setCustomForm] = useState('');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isEditExamDetailsOpen, setIsEditExamDetailsOpen] = useState(false);
  const [isRecoveryDialogOpen, setIsRecoveryDialogOpen] = useState(false);
  const [isCancelEnroll, setCancelEnroll] = useState(false);
  const [isCancelButtonDisable, setCancelButtonDisable] = useState(true);
  const [isParentDialogOpen, setIsParentDialogOpen] = useState(false);
  const [recoverPasswordSuccess, setRecoverPasswordSuccess] = useState(false);
  const [isEditStudentProfile, setEditStudentProfile] = useState(false);
  const [isSwapCourseDialog, setSwapCourseOrLocation] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [parentInfo, setParentInfo] = useState(parentInfoInitialValues);
  const [searchText, setSearchText] = useState([]);
  const hearOptions = useSelector((reduxState) => reduxState.getParent.hearAboutUs);
  const studentFilters = useSelector(
    (reduxState) => reduxState.getStudent.studentFilters,
  );
  const [filterOptions, setFilterOptions] = useState([]);

  const studentsData = useStudent()?.students || [];

  useEffect(() => {
  }, [pageNumber]);

  const getFilteredStudents = (filOpts) => {
    const filterPayload = { filters: {}, searchText: [] };
    filOpts.forEach((filterOption) => {
      if (!filterOption?.options?.every((opt) => opt?.checked === false)) {
        const selectedOption = [];
        filterOption?.options?.forEach((option) => {
          if (option.checked) selectedOption.push(option?.value);
        });
        filterPayload.filters[filterOption?.filter] = selectedOption;
      }
    });

    filterPayload.timePeriod = 'year'; // initial value for year dropdown

    // const text = getLocalStorage('searchText') || '';
    filterPayload.searchText.push(searchText);
    setLocalFilterPayload(filterPayload);
    setIsFetching(true);
    handlePageNumberChange(1);
    dispatch(getAllStudentsByAdmin(1, 100, nextPage, setLoading, studentsData.length, filterPayload));
  };

  const filterByYearDropDown = (yearOption) => {
    const payload = { filters: {}, searchText: [] };
    filterOptions.forEach((filterOption) => {
      if (!filterOption?.options?.every((opt) => opt?.checked === false)) {
        const selectedOption = [];
        filterOption?.options?.forEach((option) => {
          if (option.checked) selectedOption.push(option?.value);
        });
        payload.filters[filterOption?.filter] = selectedOption;
      }
    });

    payload.timePeriod = yearOption;
    // const text = getLocalStorage('searchText') || '';
    // payload.searchText.push(searchText);
    // setLocalFilterPayload(payload);
    // handlePageNumberChange(1);
    setIsFetching(true);

    dispatch(getAllStudentsByAdmin(1, 100, nextPage, setLoading, studentsData.length, payload));
  };

  const initialFilterPayload = (isRefresh) => {
    if (!isRefresh) {
      const currentYear = new Date().getFullYear();
      const nextYear = new Date().getFullYear() + 1;
      const selectedAcademicYear = { id: `${currentYear}-${nextYear}`, name: `${currentYear}-${nextYear}` };
      const fil = state?.previousFilters || studentFilters?.map((filterOpt) => {
        const options = filterOpt?.options?.map((op) => ({
          label: op[filterOpt.key],
          checked: !!(((filterOpt.filter === 'academic_year' && op[filterOpt.key] === selectedAcademicYear.id) || (filterOpt.filter === 'enrolled_status' && op[filterOpt.key] === true) || (filterOpt.filter === 'course_status' && op[filterOpt.key] === true))),
          value: op[filterOpt.key],
          filterKey: filterOpt.filter,
        }));
        return {
          ...filterOpt,
          expanded: false,
          options,
          value: filterOpt.label,
        };
      });
      setFilterOptions(fil);
      if (fil?.length > 0) {
        onSetFilterOptions(fil, true);
      }
    }
    if (isRefresh) {
      setFilterOptions(filterOptions);
      if (filterOptions?.length > 0) {
        onSetFilterOptions(filterOptions, true);
      }
    }
  };

  React.useEffect(() => {
    // const currentYear = new Date().getFullYear();
    // const nextYear = new Date().getFullYear() + 1;
    // const selectedAcademicYear = { id: `${currentYear}-${nextYear}`, name: `${currentYear}-${nextYear}` };
    // const fil = studentFilters?.map((filterOpt) => {
    //   const options = filterOpt?.options?.map((op) => ({
    //     label: op[filterOpt.key],
    //     checked: !!((filterOpt.filter === 'academic_year' && op[filterOpt.key] === selectedAcademicYear.id)),
    //     value: op[filterOpt.key],
    //     filterKey: filterOpt.filter,
    //   }));
    //   return {
    //     ...filterOpt,
    //     expanded: false,
    //     options,
    //     value: filterOpt.label,
    //   };
    // });
    // setFilterOptions(fil);
    // if (fil?.length > 0) {
    //   onSetFilterOptions(fil, true);
    // }
    initialFilterPayload();
  }, [studentFilters]);
  const [selectedRecord, setSelectedRecord] = useState({});
  const navigate = useNavigate();
  const [swapCourseLocationInfo, setCourseLocationInfo] = useState({
    studentId: '',
    studentName: '',
    academicYear: '',
    courseFrom: '',
    courseTo: '',
    locationFrom: '',
    locationTo: '',
    sectionFrom: '',
    sectionTo: '',
    changeLogs: '',
  });
  const [cancelEnrollInfo, setCancelEnrollInfo] = useState({
    studentId: '',
    studentName: '',
    academicYear: '',
    course: '',
    location: '',
    changeLogs: '',
  });
  const refreshList = () => {
    if (userRoles.SUPER_ADMIN === getLocalStorage('userRole')) {
      dispatch(getAllStudentsByAdmin(pageNumber, pageLimit, nextPage, setLoading, localFilterPayload));
    } else {
      dispatch(getAllStudents());
    }
  };

  const refreshStudentsData = () => {
    initialFilterPayload(true);
    // dispatch(getAllStudentsByAdmin(1, 100, '', setLoading, localFilterPayload));
  };

  const onUpdateParentProfile = (reqPayload) => {
    const hearOptSelected = [];
    reqPayload?.hearAboutUs?.forEach((opt) => {
      const temp = _.find(hearOptions, { name: opt });
      hearOptSelected.push(temp?.name);
    });
    const parentPayload = getParentPayload(reqPayload, hearOptSelected);
    const addressPayload = {
      addresses: {
        address: reqPayload?.homeAddress,
        aptSuite: reqPayload?.aptSuite,
        latitude: Number(reqPayload?.homeAddressInfo?.lat),
        longitude: Number(reqPayload?.homeAddressInfo?.lng),
      },
    };
    const payload = {
      parent1: parentPayload.parent1,
      address: addressPayload.addresses,
      logMessage: parentPayload?.changeLog,
    };
    const parent2 = Object.values(parentPayload?.parent2?.user);
    const result = parent2?.filter((i) => i !== undefined && i !== '');
    if (result?.length) {
      payload.parent2 = parentPayload.parent2;
    }
    setIsParentDialogOpen(false);
    dispatch(
      editParentAction(
        selectedRecord?.id,
        payload,
        setParentLoading,
        refreshStudentsData,
      ),
    );
  };

  const onSwapCourseOrLocation = (flag) => {
    setCourseLocationInfo({});
    setSwapCourseOrLocation(flag);
  };

  const renderRecoveryContent = () => (
    <Grid>
      <Grid item xs={12} className={classes.recoveryContent}>
        {t('SEND_RECOVERY')}
      </Grid>
      <Grid item xs={12} className={classes.dialogButtons}>
        <ButtonAtom
          name={t('CANCEL')}
          onClick={() => setIsRecoveryDialogOpen(false)}
          btntype={Buttons.SECONDARY}
        />
        <ButtonAtom
          name={t('CONFIRM')}
          onClick={() => setRecoverPasswordSuccess(true)}
          btntype={Buttons.PRIMARY}
        />
      </Grid>
    </Grid>
  );

  const handleRecoverDialog = () => {
    const initialValues = {
      email: selectedRecord?.studentInfo?.manabadiEmail,
    };
    dispatch(postForgotPassword(initialValues));
    setRecoverPasswordSuccess(false);
    setIsRecoveryDialogOpen(false);
  };

  const renderSuccessContent = () => (
    <Grid>
      <Grid item xs={10} className={classes.dialogContent}>
        <h1 className={classes.dialogHeader}>{t('RECOVER_PASSWORD_EMAIL')}</h1>
        {t('PASSWORD_RESET_LINK', {
          email: getMaskedEmail(selectedRecord?.parent1Info?.personalEmail),
        })}
      </Grid>
      <Grid container className={classes.content} justifyContent="flex-end">
        <ButtonAtom
          name={t('GOT_IT')}
          onClick={handleRecoverDialog}
          btntype={Buttons.SECONDARY}
        />
      </Grid>
    </Grid>
  );

  const onClickMenu = (student) => {
    const courses = student.enrolled_courses?.academicYear ? student.enrolled_courses : student.enrolled_courses[0];
    student.enrolled_courses = courses;
    const studentObj = getStudentObj(student);
    setCourseLocationInfo(studentObj);
    setSelectedRecord(student);
  };

  const onClickCancelEnrollMenu = (student) => {
    setCancelEnroll(true);
    const studentObj = getCancelEnrollStudentObj(student);
    const currentTime = new Date();
    const yearData = studentObj?.acedemicYear?.split('-');
    if (yearData?.length > 0 && Number(yearData[1]) <= Number(currentTime.getFullYear())) {
      setCancelButtonDisable(true);
    } else {
      setCancelButtonDisable(false);
    }
    setCancelEnrollInfo(studentObj);
    setSelectedRecord(student);
  };

  const onEditMenuClick = (student) => {
    const studentObj = getStudentObj(student);
    setStudentInfo({ s1: studentObj });
    setSelectedRecord(student);
  };

  const paymentDialogOpen = (rowInfo) => {
    dispatch(
      getStudentPaymentInfo(_.get(rowInfo, 'id', ''), setIsPaymentDialogOpen),
    );
  };

  const editExamDetailsOpen = () => {
    setIsEditExamDetailsOpen(true);
  };

  const onUpdateParentClick = (selectedRow) => {
    setSelectedRecord(selectedRow);
    setParentInfo(getParentInfoObj(selectedRow));
    setIsParentDialogOpen(true);
  };

  const handleMoveStudent = () => {
    customForm.handleSubmit();
  };

  const viewLogs = (onClose) => {
    onClose(false);
    navigate(NavigateRoutes.STUDENTS_LOGS, {
      state: { id: _.get(selectedRecord, 'userId', ''), lastRoute: NavigateRoutes.STUDENTS_VIEW },
    });
  };

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onAddView = (title, filters, setShowAddViewDialog) => {
    const queryArray = [];
    filters.forEach((fil) => {
      fil.options.forEach((filOp) => {
        if (filOp.checked) {
          queryArray.push({
            label: filOp.label,
            groupBy: fil.label,
            filterKey: fil.filter,
          });
        }
      });
    });
    dispatch(
      addFilterView(
        {
          queryData: JSON.stringify(queryArray),
          name: title,
        },
        setShowAddViewDialog,
      ),
    );
  };

  const onSetFilterOptions = (fil, refetchFilteredStudent) => {
    setFilterOptions(fil);
    const selectedFil = [];
    fil?.forEach((fi) => {
      fi?.options?.forEach((fiOpt) => {
        if (fiOpt.checked) {
          selectedFil.push({
            label: fiOpt.label.toString(),
            groupBy: fi.label,
            filterKey: fi.filter,
          });
        }
      });
    });
    if (refetchFilteredStudent) {
      getFilteredStudents(fil);
    }
    setSelectedFilter(selectedFil);
  };

  const parentInfoComponent = (
    <ParentInfo
      setParentInfo={setParentInfo}
      changeLog
      parentInfo={parentInfo}
      loading={parentLoading}
      setLoading={setParentLoading}
      source="editParent"
      primaryButton={t('SAVE_PARENT_INFO')}
      onCancel={() => setIsParentDialogOpen(false)}
      onFormSubmit={onUpdateParentProfile}
      onViewLogs={() => navigate(NavigateRoutes.STUDENTS_LOGS, {
        state: { id: _.get(selectedRecord, 'userId', ''), lastRoute: NavigateRoutes.STUDENTS_VIEW },
      })}
    />
  );

  const swapCourseDialogFooter = (
    <SwapCourseDialogFooter
      classes={classes}
      t={t}
      primaryHandle={handleMoveStudent}
      secHandle={() => onSwapCourseOrLocation(false)}
      viewLogs={viewLogs}
    />
  );

  const swapCourseLocation = (
    <SwapCourseLocation
      refreshStudentsData={refreshStudentsData}
      {...{
        setCourseLocationInfo,
        swapCourseLocationInfo,
        setCustomForm,
        setSwapCourseOrLocation,
      }}
    />
  );

  const cancelEnrollFooter = (
    <SwapCourseDialogFooter
      isCancelEnroll
      {...{
        customForm,
      }}
      classes={classes}
      t={t}
      disable={isCancelButtonDisable}
      primaryHandle={handleMoveStudent}
      secHandle={() => setCancelEnroll(false)}
      viewLogs={viewLogs}
    />
  );
  const cancelEnrollContent = (
    <CancelEnroll
      {...{
        refreshList,
        isCancelButtonDisable,
        setCustomForm,
        setCancelEnrollInfo,
        cancelEnrollInfo,
        setCancelEnroll,
      }}
    />
  );
  const editStudentContent = (
    <EditStudent
      setDialogOpen={setEditStudentProfile}
      refreshStudentsData={refreshStudentsData}
      {...{
        classes,
        viewLogs,
        studentInfo,
        setStudentInfo,
        studentFormError,
        setStudentFormError,
        setEditStudentProfile,
        selectedRecord,
      }}
    />
  );

  return (
    <Box className={`${classes.gridContainer} ${classes.paddingRemove}`}>
      {!loading && (
        <Grid container>
          <Grid item lg={0.2} />
          <Grid item xs={12} lg={12} className={classes.filterSection}>
            <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <AppBar position="fixed" open={open} />
              <Drawer
                sx={{
                  width: DrawerWidth,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: DrawerWidth,
                    boxSizing: 'border-box',
                  },
                }}
                variant="persistent"
                anchor="left"
                open={open}
              >
                <DrawerHeader>
                  <div>
                    <TuneOutlinedIcon className={classes.filterIcon} />
                    <span style={{
                      verticalAlign: 'top',
                      marginLeft: '0.8vw',
                    }}
                    >
                      {t('SEARCH_BY_FILTERS')}
                    </span>
                    <ClearIcon
                      onClick={handleDrawerClose}
                      style={{
                        marginLeft: '2.5vw',
                      }}
                      className={classes.clearIcon}
                    />
                  </div>
                </DrawerHeader>
                <StudentFilters
                  filterOptions={filterOptions}
                  setFilterOptions={onSetFilterOptions}
                  onAddView={onAddView}
                />
              </Drawer>
              <Main open={open} className={classes.mainSection}>
                <Header
                  setFilterOptions={(opts) => {
                    setFilterOptions(opts);
                    getFilteredStudents(opts);
                  }}
                  {...{
                    handleDrawerOpen,
                    selectedFilter,
                    setSelectedFilter,
                    filterOptions,
                    setSearchText,
                    searchText,
                  }}
                />
                <MainViewWithHeader
                  setFilterOptions={(opts) => {
                    setFilterOptions(opts);
                    getFilteredStudents(opts);
                  }}
                  {...{
                    filterByYearDropDown,
                    setSelectedFilter,
                    pageNumber,
                    pageLimit,
                    nextPage,
                    setIsFetching,
                    isFetching,
                    hasMore,
                    filterOptions,
                    onUpdateParentClick,
                    paymentDialogOpen,
                    editExamDetailsOpen,
                    onClickMenu,
                    onClickCancelEnrollMenu,
                    onEditMenuClick,
                    setEditStudentProfile,
                    setSwapCourseOrLocation,
                    setSelectedRecord,
                    setIsRecoveryDialogOpen,
                    setCancelEnroll,
                    setLoading,
                    localFilterPayload,
                    selectedFilter,
                    setOpenMarksPopUp,
                    setDataAssignScore,
                    setAssignLoading,
                    setLoadingSpinner,
                    loadingSpinner,
                  }}
                />
              </Main>
            </Box>
          </Grid>
        </Grid>
      )}
      <DisplayDialog
        {...{
          isSwapCourseDialog,
          onSwapCourseOrLocation,
          swapCourseDialogFooter,
          cancelEnrollFooter,
          cancelEnrollContent,
          setCancelEnroll,
          swapCourseLocation,
          isPaymentDialogOpen,
          setIsPaymentDialogOpen,
          isEditExamDetailsOpen,
          setIsEditExamDetailsOpen,
          isRecoveryDialogOpen,
          isCancelEnroll,
          isParentDialogOpen,
          setEditStudentProfile,
          parentInfoComponent,
          isEditStudentProfile,
          editStudentContent,
          recoverPasswordSuccess,
          renderSuccessContent,
          renderRecoveryContent,
          setIsRecoveryDialogOpen,
          setIsParentDialogOpen,
        }}
      />
      <AssignScore openMarksPopUp={openMarksPopUp} setOpenMarksPopUp={setOpenMarksPopUp} dataAssignScore={dataAssignScore} assignLoading={assignLoading} setLoadingSpinner={setLoadingSpinner} />
      {loading && (
        <Grid>
          <Loader message={t('LOADING')} />
        </Grid>
      )}
    </Box>
  );
}

export default memo(Students);
