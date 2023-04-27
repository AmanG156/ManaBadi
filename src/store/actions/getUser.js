/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import Constant from '../constant';
import {
  getAllUserService,
  getUserRolesService,
  updateUserInfoService,
  addAddUserService,
  getAllUserServicePaginated,
  getAllFilterUserManagerService,
} from '../services/auth';

export const getUsers = (setLoading) => (dispatch) => {
  getAllUserService()
    .then((response) => {
      setLoading(false);
      dispatch({
        type: Constant.GET_ALL_USER,
        payload: response?.data,
      });
    })
    .catch((error) => {
      console.log('error :', error);
    });
};

export const addUser = (payload, refreshList, setLoading) => async () => {
  try {
    const res = await addAddUserService(payload);
    refreshList();
    return Promise.resolve(res);
  } catch (err) {
    setLoading(false);
    return Promise.reject(err);
  }
};

export const updateUserInfo = (userId, payload, refreshList, setLoading) => async () => {
  try {
    const res = await updateUserInfoService(userId, payload);
    refreshList();
    return Promise.resolve(res);
  } catch (err) {
    setLoading(false);
    return Promise.reject(err);
  }
};

export const getUserRoles = () => (dispatch) => {
  getUserRolesService()
    .then((response) => {
      dispatch({
        type: Constant.GET_ALL_USER_ROLES,
        payload: response?.data,
      });
    })
    .catch((error) => {
      console.log('error :', error);
    });
};

export const getAllFilteredUsers = (pageNumber, pageLimit, nextPage, setLoading, students, body = {}) => (dispatch) => {
  // const userRole = getLocalStorage('userRole');

  getAllUserServicePaginated(pageNumber, pageLimit, body)
    .then((response) => {
      setLoading ? setLoading(false) : null;
      nextPage ? nextPage(response, pageNumber === 1 ? 100 : students + response.data.length) : null;
      if (pageNumber === 1) {
        dispatch({
          type: Constant.GET_ALL_USER,
          payload: response?.data,
        });
        dispatch({
          type: Constant.TOTAL_COUNT,
          payload: response?.count,
        });
      } else {
        dispatch({
          type: Constant.GET_PAGINATED_USERS,
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
};

export const getAllFilterForUserManager = (data) => (dispatch) => {
  getAllFilterUserManagerService(data)
    .then((response) => {
      dispatch({
        type: Constant.GET_ALL_USER_FILTERS,
        payload: response.data,
      });
    });
};
export default {
  getUsers,
  getUserRoles,
  updateUserInfo,
  addUser,
};
