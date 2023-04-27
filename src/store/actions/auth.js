import Constant from '../constant';
import { getLoginTokenService, postForgotPasswordService, resetPasswordService } from '../services/auth';

export const getLoginToken = (accessToken) => (dispatch) => {
  function request(user) {
    return { type: Constant.GET_TOKEN_FOR_LOGIN, user };
  }

  function success(user) {
    return { type: Constant.GET_USER_SUCCESS, user };
  }

  function failure(error) {
    return { type: Constant.GET_USER_FAILURE, error };
  }
  dispatch(request({ loggedIn: true }));
  getLoginTokenService({ accessToken }).then((user) => {
    // handle success
    dispatch(success(user));
  })
    .catch((error) => {
      // handle error
      dispatch(failure(error.toString()));
    });
};

export const postForgotPassword = (body) => async (dispatch) => {
  try {
    const res = await postForgotPasswordService(body);
    dispatch({
      type: Constant.POST_FORGOT_PASSWORD,
      payload: res,
    });
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const postResetPassword = (body) => async (dispatch) => {
  try {
    const res = await resetPasswordService(body);
    dispatch({
      type: Constant.POST_RESET_PASSWORD,
      payload: res,
    });
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export default {
  getLoginToken,
  postForgotPassword,
  postResetPassword,
};
