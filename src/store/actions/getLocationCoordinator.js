/* eslint-disable arrow-spacing */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import moment from 'moment';
import Constant from '../constant/index';
import {
  addTeacherService,
  getAllTeachersService,
  getAssignedLocationsService,
  getClassroomsService,
  getAcademicYearsService,
  getAssignedYearsDetailsService,
  getStudentsByLocationService,
  getSectionDetailsService,
  updateMarksService,
  updateHomeworkMarksService,
  getAllLocationCourseService,
  getLocationDetailsService,
  getTeachersService,
} from '../services/auth';

export const addTeacher = (payload, refreshList) => async () => {
  try {
    const res = await addTeacherService(payload);
    refreshList();
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const getClassrooms = (payload, loadRefreshData) => (dispatch) => {
  getClassroomsService(payload)
    .then((response) => {
      dispatch({
        type: Constant.GET_CLASSROOMS,
        payload: response?.data,
      });
      loadRefreshData ? loadRefreshData() : null;
    })
    .catch((error) => {
      loadRefreshData ? loadRefreshData() : null;
      console.log('error :', error);
    });
};

export const getLocationDetails = (payload) => (dispatch) => {
  getLocationDetailsService(payload)
    .then((response) => {
      const { data } = response;
      const locationDetails = {
        locationName: `${data.locationData.name}`,
        locationAddress: `${data.locationData.locationAddress.address}`,
        teacher: `${data.teachers.length}`,
        scheduledHours: `${moment(data.locationData.start_time, 'hh:mm').format('LT')} - ${moment(data.locationData.end_time, 'hh:mm').format('LT')}`,
        scheduledDay: `${data.locationData.class_timing}`,
        coordinatorName: `${data.coordinatorData.firstName} ${data.coordinatorData.lastName}`,
        coordinatorEmail: `${data.coordinatorData.manabadiEmail}`,
        coordinatorPhoneNo: `${data.coordinatorData.contactNumber}`,
      };
      dispatch({
        type: Constant.GET_LOCATION_DETAILS,
        payload: locationDetails,
      });
    }).catch((error) => {
      console.log('error :', error);
    });
};

export const getAcademicYears = (setLoading) => (dispatch) => {
  getAcademicYearsService()
    .then((response) => {
      dispatch({
        type: Constant.GET_ACADEMIC_YEARS,
        payload: response.data,
      });
      setLoading && setLoading();
    }).catch((error) => {
      console.log('error :', error);
    });
};

export const getAssignedYearsDetails = (body, setLoading) => (dispatch) => {
  if (!body?.academicYear) {
    return;
  }
  // eslint-disable-next-line no-param-reassign
  body.academicYear = body?.academicYear.replace(/\s/g, '');
  getAssignedYearsDetailsService(body)
    .then((response) => {
      dispatch({
        type: Constant.GET_ASSIGNED_YEARS_DETAILS,
        payload: response.data,
      });
      setLoading();
    }).catch((error) => {
      console.log('error :', error);
    });
};

export const getAssignedLocations = (setLoading) => (dispatch) => {
  getAssignedLocationsService()
    .then((response) => {
      const locationData = response?.data?.locationData?.map((i) => ({
        id: i?.location_id,
        name: `${i?.location?.name} - ${i?.location?.locationAddress?.address}`,
        shortName: i?.location?.name,
      }));
      const yearData = response?.data?.yearData?.map((i) => ({
        id: i?.academic_year,
        name: i?.academic_year,
      }));
      const getVal = (str) => str.split('-')[0];
      const mainYearData = yearData.sort((a, b) => getVal(b?.name) - getVal(a?.name));
      dispatch({
        type: Constant.GET_ASSIGNED_LOCATIONS,
        payload: locationData,
      });
      dispatch({
        type: Constant.GET_ASSIGNED_YEARS,
        payload: mainYearData,
      });
      setLoading && setLoading();
    })
    .catch((error) => {
      setLoading();
      console.log('error :', error);
    });
};

export const getAllTeachers = (setLoading) => (dispatch) => {
  getAllTeachersService()
    .then((res) => {
      const teachersData = res?.data?.users?.map((i) => ({
        key: i?.id,
        id: i?.id,
        value: `${i?.firstName} ${i?.lastName} `,
        email: i?.manabadiEmail,
        checked: false,
      }));
      dispatch({
        type: Constant.GET_ALL_TEACHERS,
        payload: teachersData,
      });

      setLoading();
    })
    .catch((error) => {
      setLoading();
      console.log('error :', error);
    });
};

export const getStudentsByLocation = (body, setLoading) => (dispatch) => {
  getStudentsByLocationService(body)
    .then((response) => {
      dispatch({
        type: Constant.GET_STUDENTS_BY_LOCATION,
        payload: response.data,
      });
      setLoading(false);
    }).catch((error) => {
      console.log('error :', error);
    });
};

export const getSectionDetails = (payload) => (dispatch) => {
  getSectionDetailsService(payload)
    .then((res) => {
      dispatch({
        type: Constant.SET_SECTION_DETAILS,
        payload: res.data,
      });
    }).catch((error) => {
      console.log('error :', error);
    });
};

export const updateStudentMarks = (payload, refreshList) => {
  const {
    studentId, courseName, quarterName,
    studentDetailMarks,
    academicYear, isPresent, locationId,
  } = payload;
  const updateMarksPayload = {
    studentId,
    courseId: courseName,
    academicYear,
    quarter: quarterName,
    studentDetailMarks,
    locationId,
    isPresent,
  };
  updateMarksService(updateMarksPayload)
    .then(() => {
      refreshList();
    }).catch((error) => {
      console.log('error :', error);
    });
};
export const updateStudentMarksOld = (payload, refreshList) => async () => {
  try {
    const {
      studentId, courseName, quarterName,
      studentDetailMarks,
      academicYear, isPresent, locationId,
    } = payload;
    const updateMarksPayload = {
      studentId,
      courseId: courseName,
      academicYear,
      quarter: quarterName,
      studentDetailMarks,
      locationId,
      isPresent,
    };
    const res = await updateMarksService(updateMarksPayload);
    if (Promise.resolve(res)) {
      refreshList();
    }
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateStudentHomeworkMarks = (payload, refreshList) => async () => {
  try {
    console.log(payload);
    const {
      studentId, courseName, quarterName,
      academicYear, studentHomeworkMarksDetail, isPresent,
    } = payload;
    const homeworkPayload = {
      studentId,
      academicYear,
      courseId: courseName,
      quarter: quarterName,
      studentHomeworkMarksDetail,
      isPresent,
    };
    const res = await updateHomeworkMarksService(homeworkPayload);
    if (Promise.resolve(res)) {
      refreshList();
    }
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getTeachers = (body) => (dispatch) => {
  getTeachersService(body)
    .then((response) => {
      dispatch({
        type: Constant.GET_TEACHERS,
        payload: response?.data,
      });
    }).catch((error) => {
      console.log('error :', error);
    });
};

export const getAllLocationCourse = (body) => (dispatch) => {
  dispatch({
    type: Constant.GET_ALL_STUDENT_RECOURCES_WRT,
    payload: [],
  });
  dispatch({
    type: Constant.GET_ALL_TEACHER_RECOURCES,
    payload: [],
  });

  getAllLocationCourseService(body)
    .then((response) => {
      const locationCourseData = response?.data?.map((i) => ({
        id: i?.course?.id,
        name: `${i?.course?.name}`,
      }));
      dispatch({
        type: Constant.GET_ALL_LOCATION_COURCE,
        payload: locationCourseData,
      });
    })
    .catch((error) => {
      console.log('error :', error);
    });
};

export default {
  getClassrooms,
  addTeacher,
  getAssignedLocations,
  getAllTeachers,
  getAcademicYears,
  getAssignedYearsDetails,
  getStudentsByLocation,
  updateStudentMarks,
  getAllLocationCourse,
  updateStudentHomeworkMarks,
};
