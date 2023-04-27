import Constant from '../constant';
import {
  getAllRoleService,
  getAllRolePermission,
} from '../services/auth';

export const getRoles = () => (dispatch) => {
  getAllRoleService()
    .then((response) => {
      dispatch({
        type: Constant.SET_ALL_ROLE,
        payload: response?.data,
      });
    })
    .catch(() => {
      // console.log('error :', error);
    });
};

export const getRolePermisstion = () => (dispatch) => {
  getAllRolePermission()
    .then((response) => {
      dispatch({
        type: Constant.SET_ALL_ROLE_PERMISSIONS,
        payload: response?.data,
      });
    })
    .catch(() => {
      // console.log('error :', error);
    });
};

export default {
  getRoles,
  getRolePermisstion,
};
