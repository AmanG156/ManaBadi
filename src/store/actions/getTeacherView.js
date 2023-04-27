import Constant from '../constant';
import {
  studentsByYearAndClassIdService,
  classesTimingsService,
  classesByAcademicYear,
  getTeachetPanelStudentsService,
  markStudentAttendanceService,
} from '../services/auth';

export const studentsByYearAndClassId = (body) => (dispatch) => {
  studentsByYearAndClassIdService(body)
    .then((response) => {
      dispatch({
        type: Constant.STUDENTS_BY_YEAR_AND_CLASSID,
        payload: response.data,
      });
    })
    .catch(() => {
    });
};

export const classesByYear = (body) => (dispatch) => {
  classesByAcademicYear(body)
    .then((response) => {
      const classesOfAcademicYear = response?.data.map((i) => ({
        id: i?.id,
        googleClassId: i?.googleClassId,
        userId: i?.userId,
        classRoomId: i?.google_class?.classRoomId,
        courseId: i?.google_class?.courseId,
        locationId: i?.google_class?.locationId,
        locationName: i?.google_class?.location?.name,
        courseName: i?.google_class?.course?.name,
        name: i?.google_class?.course?.name,
        sectionName: i?.google_class?.section,
      }));
      dispatch({
        type: Constant.CLASSES_BY_YEAR,
        payload: classesOfAcademicYear,
      });
    })
    .catch(() => {
    });
};

export const getclassesTimings = (body) => (dispatch) => {
  classesTimingsService(body)
    .then((response) => {
      dispatch({
        type: Constant.CLASSES_TIMINGS,
        payload: response.data,
      });
    })
    .catch(() => {
    });
};

export const getTeachetPanelStudents = (body) => (dispatch) => {
  getTeachetPanelStudentsService(body)
    .then((response) => {
      dispatch({
        type: Constant.GET_TEACHER_PANEL_STUDENTS,
        payload: response?.data,
      });
    })
    .catch(() => {
    });
};

export const markStudentAttendance = (body, refreshList) => () => {
  markStudentAttendanceService(body)
    .then((response) => {
      // eslint-disable-next-line no-console
      console.log(response);
      refreshList();
    })
    .catch(() => {
      refreshList();
    });
};

export default {
  studentsByYearAndClassId,
  getclassesTimings,
  classesByYear,
  getTeachetPanelStudents,
  markStudentAttendance,
};
