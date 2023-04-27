/* eslint-disable arrow-spacing */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import Constant from '../constant/index';
import {
  getTeacherResourceService,
  getStudentResourceWRTCourseService,
  getHelpVideosService,
  uploadFileService,
  deactivateResourceService,
  updateResourceService,
  updateHelpVideoService,
  uploadVideoService,
  uploadHelpVideoService,
  deactivateHelpVideosService,
  createStudentResourceService,
  getStudentResourceInFolderService,
} from '../services/auth';

export const getStudentResourceWRTCourse = (body) => (dispatch) => {
  getStudentResourceWRTCourseService(body)
    .then((response) => {
      dispatch({
        type: Constant.GET_ALL_STUDENT_RECOURCES_WRT,
        payload: response?.data,
      });
    })
    .catch((error) => {
      console.log('error :', error);
    });
};

export const getHelpVideos = (body) => (dispatch) => {
  getHelpVideosService(body.userRole)
    .then((response) => {
      dispatch({
        type: Constant.GET_HELP_VIDEOS,
        payload: response?.data,
      });
    })
    .catch((error) => {
      console.log('error :', error);
    });
};

export const getTeacherResource = (body) => (dispatch) => {
  getTeacherResourceService(body)
    .then((response) => {
      dispatch({
        type: Constant.GET_ALL_TEACHER_RECOURCES,
        payload: response?.data,
      });
    })
    .catch((error) => {
      console.log('error :', error);
    });
};

export const deactivateResource = (body) => () => {
  deactivateResourceService(body)
    .then(() => {
    })
    .catch(() => {
    });
};

export const updateResource = (body, typeResources) => (dispatch) => {
  updateResourceService(body)
    .then(() => {
      if (typeResources === 'teacher') {
        getTeacherResourceService({ courseId: body.courseId })
          .then((response) => {
            dispatch({
              type: Constant.GET_ALL_TEACHER_RECOURCES,
              payload: response?.data,
            });
          })
          .catch(() => {
          });
      } else if (typeResources === 'student') {
        getStudentResourceWRTCourseService({ courseId: body.courseId })
          .then((response) => {
            dispatch({
              type: Constant.GET_ALL_STUDENT_RECOURCES_WRT,
              payload: response?.data,
            });
          })
          .catch(() => {
          });
      }
    })
    .catch(() => {
    });
};

export const updateHelpVideo = (body, callback) => async () => {
  try {
    const res = await updateHelpVideoService(body);
    await callback();
    return Promise.resolve(res);
  } catch (err) {
    callback();
    return Promise.reject(err);
  }
};

export const uploadVideo = (body) => (dispatch) => {
  uploadVideoService(body)
    .then((response) => {
      dispatch({
        type: Constant.UPLOAD_VIDEO,
        payload: response,
      });
    })
    .catch(() => {
    });
};

export const uploadHelpVideo = (body) => (dispatch) => {
  uploadHelpVideoService(body)
    .then((response) => {
      dispatch({
        type: Constant.UPLOAD_HELP_VIDEO,
        payload: response,
      });
    })
    .catch(() => {
    });
};

export const deactivateHelpVideos = (body, callback) => async () => {
  try {
    const res = await deactivateHelpVideosService(body);
    await callback();
    return Promise.resolve(res);
  } catch (err) {
    callback();
    return Promise.reject(err);
  }
};

export const createStudentResource = (body) => (dispatch) => {
  createStudentResourceService(body)
    .then((response) => {
      dispatch({
        type: Constant.CREATE_STUDENT_RESOURCE,
        payload: response,
      });
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: Constant.CREATE_STUDENT_RESOURCE_ERROR,
        payload: e?.errors?.length ? e?.errors[0] : {},
      });
    });
};

export const getStudentResourceInFolder = (body) => (dispatch) => {
  getStudentResourceInFolderService(body)
    .then((response) => {
      dispatch({
        type: Constant.GET_STUDENT_RESOURCE_IN_FOLDER,
        payload: response,
      });
    })
    .catch(() => {
    });
};

export const uploadFile = (body) => (dispatch) => {
  uploadFileService(body)
    .then((response) => {
      dispatch({
        type: Constant.UPLOAD_FILE,
        payload: response,
      });
    })
    .catch(() => {
    });
};

export const getFolderDetails = (obj) => (dispatch) => {
  dispatch({
    type: Constant.GET_FOLDER_DETAILS,
    payload: obj,
  });
};

export default {
  getStudentResourceWRTCourse,
  getTeacherResource,
  getHelpVideos,
  createStudentResource,
  deactivateResource,
  updateResource,
  uploadFile,
  uploadVideo,
  updateHelpVideo,
  deactivateHelpVideos,
  getStudentResourceInFolder,
  getFolderDetails,
};
