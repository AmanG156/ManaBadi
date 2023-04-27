/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import Constant from '../constant';
import {
  getTShirtService,
  getAllCourseService,
  getAcademicGradesService,
  getExtraCurricularActivitiesService,
  getLocationService,
  moveStudentService,
  getStudentLogsService,
  getStudentLogDetailService,
  editStudentByAdminService,
  getStudentAccountDetailService,
  updateStudentInfoService,
  addSiblingService,
  updateSiblingInfoService,
  addFilterViewService,
  getAllFilterViewService,
  getAllFilterService,
  getAllFilterServiceRegion,
  getNextEnrollCourseService,
  getStudentsByRegionService,
  getStudentMarksService,
  getStudentEnrollmentService,
  getAdminPaginatedStudentsService,
  getStudentsByLocationService,
  studentMarksByQuarter,
  updateMarksService,
} from '../services/auth';
import { getLocalStorage } from '../../utils/localStorageMethod';
import userRoles from '../../constant/userRoles';

export const getTShirts = () => (dispatch) => {
  getTShirtService()
    .then((response) => {
      dispatch({
        type: Constant.GET_TSHIRTS,
        payload: response?.data,
      });
    })
    .catch((error) => {
      console.log('error :', error);
    });
};

export const getAllCourses = () => (dispatch) => {
  getAllCourseService()
    .then((response) => {
      dispatch({
        type: Constant.GET_ALL_COURSES,
        payload: response?.data,
      });
    })
    .catch((error) => {
      console.log('error :', error);
    });
};

export const editStudentByAdmin = (studentId, payload, setLoading) => async () => {
  try {
    const res = await editStudentByAdminService(studentId, payload);
    setLoading(false);
    return Promise.resolve(res);
  } catch (err) {
    setLoading(false);
    return Promise.reject(err);
  }
};
export const updateStudentInfo = (payload, refreshList, setLoading) => async () => {
  try {
    const res = await updateStudentInfoService(payload);
    refreshList();
    return Promise.resolve(res);
  } catch (err) {
    setLoading(false);
    return Promise.reject(err);
  }
};
export const updateSiblingInfo = (payload, siblingId, refreshList, setLoading) => async () => {
  try {
    const res = await updateSiblingInfoService(payload, siblingId);
    refreshList();
    return Promise.resolve(res);
  } catch (err) {
    setLoading(false);
    return Promise.reject(err);
  }
};
export const getStudentLogs = (studentId) => (dispatch) => {
  getStudentLogsService(studentId)
    .then((response) => {
      dispatch({
        type: Constant.GET_STUDENT_LOGS,
        payload: response?.data,
      });
    });
};

export const getStudentLogDetail = (logId) => async (dispatch) => {
  try {
    const res = await getStudentLogDetailService(logId);
    dispatch({
      type: Constant.GET_STUDENT_LOG_DETAIL,
      payload: res?.data,
    });
    return Promise.resolve(res);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getAcademicGrades = () => (dispatch) => {
  getAcademicGradesService()
    .then((response) => {
      dispatch({
        type: Constant.GET_ACADEMIC_GRADES,
        payload: response?.data,
      });
    })
    .catch((error) => {
      console.log('error :', error);
    });
};

export const getExtraCurricularActivities = () => (dispatch) => {
  getExtraCurricularActivitiesService()
    .then((response) => {
      dispatch({
        type: Constant.GET_EXTRA_CURRICULAR_ACTIVITIES,
        payload: response?.data,
      });
    })
    .catch((error) => {
      console.log('error :', error);
    });
};
export const getLocations = () => (dispatch) => {
  getLocationService()
    .then((response) => {
      dispatch({
        type: Constant.GET_LOCATIONS,
        payload: response?.data,
      });
    })
    .catch((error) => {
      console.log('error :', error);
    });
};

export const getAllStudents = (setLoading) => (dispatch) => {
  const userRole = getLocalStorage('userRole');
  if (userRole === userRoles.REGION_COORDINATOR) {
    getStudentsByRegionService()
      .then((response) => {
        dispatch({
          type: Constant.GET_ALL_STUDENTS,
          payload: response?.data,
        });
        if (setLoading) {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log('error :', error);
        if (setLoading) {
          setLoading(false);
        }
      });
  }
};

export const getAllStudentsByAdmin = (pageNumber, pageLimit, nextPage, setLoading, students, body = {}) => (dispatch) => {
  const userRole = getLocalStorage('userRole');
  if (userRole === userRoles.REGION_COORDINATOR) {
    getStudentsByRegionService(pageNumber, pageLimit, body)
      .then((response) => {
        setLoading ? setLoading(false) : null;
        nextPage ? nextPage(response, pageNumber === 1 ? 100 : students + response.data.length) : null;
        if (pageNumber === 1) {
          dispatch({
            type: Constant.GET_ALL_STUDENTS,
            payload: response?.data,
          });
          if (setLoading) {
            setLoading(false);
          }
          dispatch({
            type: Constant.TOTAL_COUNT,
            payload: response?.count,
          });
        } else {
          dispatch({
            type: Constant.GET_PAGINATED_STUDENTS,
            payload: response?.data,
          });
          dispatch({
            type: Constant.TOTAL_COUNT,
            payload: response?.count,
          });
        }
      })
      .catch((error) => {
        console.log('error :', error);
        if (setLoading) {
          setLoading(false);
        }
      });
    return;
  }

  getAdminPaginatedStudentsService(pageNumber, pageLimit, body)
    .then((res) => {
      setLoading ? setLoading(false) : null;
      nextPage ? nextPage(res, pageNumber === 1 ? 100 : students + Number(res?.data?.length)) : null;
      if (pageNumber === 1) {
        dispatch({
          type: Constant.GET_ALL_STUDENTS,
          payload: res?.data,
        });
        dispatch({
          type: Constant.TOTAL_COUNT,
          payload: res?.count,
        });
      } else {
        dispatch({
          type: Constant.GET_PAGINATED_STUDENTS,
          payload: res?.data,
        });
        dispatch({
          type: Constant.TOTAL_COUNT,
          payload: res?.count,
        });
      }
    })
    .catch((error) => {
      console.log('error :', error);
      if (setLoading) {
        setLoading(false);
      }
    });
};

export const moveStudent = (payload, callback) => (dispatch) => {
  moveStudentService(payload)
    .then((student) => {
      dispatch({
        type: Constant.MOVE_STUDENT,
        payload: student?.data,
      });
      callback();
    })
    .catch((error) => {
      console.log('error', error);
      // handle error
      dispatch({
        type: Constant.MOVE_STUDENT,
        payload: [],
      });
    });
};

export const getStudentAccountDetails = (
  loadRefreshData,
  setStudentState,
  setSiblingData,
) => (dispatch) => {
  getStudentAccountDetailService()
    .then((response) => {
      setSiblingData
        ? setSiblingData(response?.data?.studentData?.filter((stu) => !stu.primaryStudent)) : null;
      setStudentState
        ? setStudentState(response?.data?.data) : null;
      dispatch({
        type: Constant.GET_STUDENT_ACCOUNT_DETAILS,
        payload: response?.data,
      });
      loadRefreshData ? loadRefreshData() : null;
    });
};

export const addSibling = (data) => (dispatch) => {
  addSiblingService(data)
    .then((response) => {
      dispatch({
        type: Constant.ADD_SIBLING_DATA,
        payload: response.data,
      });
    });
};

export const getAllFilter = (data) => (dispatch) => {
  const handleFilterResponse = (response) => {
    const yearsFilter = response.data[0].options;
    yearsFilter.sort((a, b) => new Date(b.academic_year.substr(-4)) - new Date(a.academic_year.substr(-4)));
    response.data[0].options = yearsFilter;
    const regionFilter = response.data[3].options.filter((item) => item.name !== null);
    response.data[3].options = regionFilter;
    dispatch({
      type: Constant.SET_FILTERS,
      payload: response.data,
    });
  };

  const userRole = getLocalStorage('userRole');

  if (userRole === userRoles.REGION_COORDINATOR) {
    // using the same handler as for the admin - handleFilterResponse
    getAllFilterServiceRegion(data).then(handleFilterResponse);
    return;
  }

  getAllFilterService(data)
    .then(handleFilterResponse);
};

export const getAllFilterView = () => (dispatch) => {
  getAllFilterViewService()
    .then((response) => {
      dispatch({
        type: Constant.SET_FILTER_VIEWS,
        payload: response.data,
      });
    });
};

export const addFilterView = (data, setShowAddViewDialog) => (dispatch) => {
  addFilterViewService(data)
    .then(() => {
      dispatch(getAllFilterView());
      setShowAddViewDialog(false);
    });
};

export const getNextEnrollCourse = () => (dispatch) => {
  getNextEnrollCourseService()
    .then((response) => {
      dispatch({
        type: Constant.SET_NEXT_ENROLL_COURSE,
        payload: response.data,
      });
    });
};

export const getStudentMarks = (studentId) => () => {
  getStudentMarksService(studentId)
    .then(() => {
    }).catch((err) => {
      console.log('err', err);
    });
};

export const getStudentEnrollmentHistory = (payload) => (dispatch) => {
  dispatch({
    type: Constant.CLEAN_STUDENT_ENROLLMENT_DETAILS,
    payload: {},
  });
  getStudentEnrollmentService(payload)
    .then((response) => {
      dispatch({
        type: Constant.SET_STUDENT_ENROLLMENT_DETAILS,
        payload: response.data,
      });
    }).catch((err) => {
      console.log('err', err);
    });
};

export const getMarksDetails = (payload, setLoadingSpinner) => (dispatch) => {
  getStudentsByLocationService(payload)
    .then((response) => {
      const getMarks = response.data.filter((item) => `${item.studentInfo.firstName} ${item.studentInfo.lastName}` === payload.studentName);
      dispatch({
        type: Constant.GET_STUDENTS_BY_LOCATION,
        payload: getMarks,
      });
      setLoadingSpinner(false);
    }).catch((err) => {
      console.log('err', err);
    });
};

export const postStudentMarksByQuarter = (payload, setAssignLoading) => (dispatch) => {
  studentMarksByQuarter(payload)
    .then((response) => {
      dispatch({
        type: Constant.GET_MARKS_BY_QUARTER,
        payload: response.data,
      });
      setAssignLoading(false);
    }).catch((err) => {
      console.log('err', err);
    });
};

export const putStudentMarksByQuarter = (payload, setLoadingSpinner, setOpenMarksPopUp) => (dispatch) => {
  updateMarksService(payload)
    .then(() => {
      getStudentsByLocationService(payload)
        .then((response) => {
          const getMarks = response.data.filter((item) => `${item.studentInfo.firstName} ${item.studentInfo.lastName}` === payload.studentName);
          dispatch({
            type: Constant.GET_STUDENTS_BY_LOCATION,
            payload: getMarks,
          });
          setLoadingSpinner(false);
          setOpenMarksPopUp(false);
        }).catch((err) => {
          console.log('err', err);
        });
    }).catch((err) => {
      console.log('err', err);
    });
};

export const getMarksDetailsbyStudents = (payload, handleExportToCsv) => async () => {
  const dataStudents = [];
  for (let index = 0; index < payload.length; index++) {
    const response = await getStudentsByLocationService(payload[index]);
    const getMarks = response.data.filter((item) => `${item.studentInfo.firstName} ${item.studentInfo.lastName}` === payload[index].studentName);
    dataStudents.push(...getMarks);
  }
  handleExportToCsv(dataStudents);
};

export default {
  getTShirts,
  getAllCourses,
  getAcademicGrades,
  getExtraCurricularActivities,
  getLocations,
  getAllStudents,
  moveStudent,
  getStudentAccountDetails,
  updateStudentInfo,
  addSibling,
  editStudentByAdmin,
  addFilterView,
  getAllFilter,
  getNextEnrollCourse,
  getStudentMarks,
  getStudentEnrollmentHistory,
  getMarksDetails,
  postStudentMarksByQuarter,
  putStudentMarksByQuarter,
  getMarksDetailsbyStudents,
};
