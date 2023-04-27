/* eslint-disable no-console */
import Constant from '../constant';
import {
  getVolunteerService,
  getHearAboutUsService,
  editParentService,
  updateParentInfoByStudentService,
} from '../services/auth';
import { getAllStudents } from './getStudent';

export const getVolunteers = () => (dispatch) => {
  getVolunteerService()
    .then((response) => {
      dispatch({
        type: Constant.GET_VOLUNTEERS,
        payload: response?.data,
      });
    })
    .catch((error) => {
      console.log('error :', error);
    });
};

export const getHearAboutUs = () => (dispatch) => {
  getHearAboutUsService()
    .then((payload) => {
      dispatch({
        type: Constant.HEAR_ABOUTS_US,
        payload,
      });
    })
    .catch((error) => {
      // handle error
      console.log('error :', error);
    });
};

export const editParentAction = (
  studentId,
  reqPayload,
  setParentLoading,
  refreshStudentsData,
) => (dispatch) => {
  editParentService(studentId, reqPayload)
    .then(() => {
      dispatch(getAllStudents());
      if (refreshStudentsData) {
        refreshStudentsData();
      }
      setParentLoading(false);
      return true;
    })
    .catch((error) => {
    // handle error
      console.log('error :', error);
      setParentLoading(false);
    });
};

export const updateParentInfoByStudent = (reqPayload, refreshList, setParentLoading) => () => {
  updateParentInfoByStudentService(reqPayload)
    .then(() => {
      refreshList();
      setParentLoading(false);
      return true;
    })
    .catch((error) => {
    // handle error
      setParentLoading(false);
      console.log('error :', error);
    });
};

export default {
  getVolunteers,
  getHearAboutUs,
  editParentAction,
  updateParentInfoByStudent,
};
