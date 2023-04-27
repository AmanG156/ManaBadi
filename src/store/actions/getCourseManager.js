/* eslint-disable no-console */
import Constant from '../constant/index';
import {
  createCourseService,
  editCourseService,
  getAllCoursesForManagerService,
} from '../services/auth';

export const getAllCoursesforManager = () => (dispatch) => {
  getAllCoursesForManagerService()
    .then((response) => {
      dispatch({
        type: Constant.GET_COURSES_MANAGER,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log('error :', error);
    });
};

export const createCourse = (payload, refreshList) => {
  createCourseService(payload)
    .then((response) => {
      console.log('response :', response);
      refreshList();
    })
    .then((error) => {
      console.log('error :', error);
    });
};

export const editCourse = (payload, refreshList) => {
  editCourseService(payload)
    .then((response) => {
      console.log('response :', response);
      refreshList();
    })
    .then((error) => {
      console.log('error :', error);
    });
};

export default {
  getAllCoursesforManager,
};
