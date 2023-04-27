import Constant from '../constant';
import {
  cancelEnrollService, impersonateUserService,
} from '../services/auth';
import { setLocalStorage } from '../../utils/localStorageMethod';

export const setGraphOption = (body) => (dispatch) => {
  dispatch({
    type: Constant.SET_GRAPH_OPTIONS,
    payload: body,
  });
};

export const setEnrollGraphOption = (body) => (dispatch) => {
  dispatch({
    type: Constant.SET_ENROLL_GRAPH_OPTIONS,
    payload: body,
  });
};

export const cancelEnroll = (body, callback) => async () => {
  try {
    const res = await cancelEnrollService(body);
    await callback();
    return Promise.resolve(res);
  } catch (err) {
    callback();
    return Promise.reject(err);
  }
};

export const impersonateUser = (body) => (dispatch) => {
  impersonateUserService(body)
    .then((response) => {
      setLocalStorage('impersonateToken', response.tokenResponse.JWT);
      dispatch({
        type: Constant.IMPERSONATE_USER,
        payload: response,
      });
    })
    .catch(() => {
    });
};

export default {
  cancelEnroll,
  impersonateUser,
  setGraphOption,
  setEnrollGraphOption,
};
