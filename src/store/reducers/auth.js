import Constant from '../constant';

let user = {};
const initialState = user ? { loggedIn: true, user } : {};

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case Constant.GET_USER_SUCCESS:
      user = action.user;
      return action.user;
    case Constant.GET_USER_FAILURE:
      return {};
    case Constant.POST_FORGOT_PASSWORD:
      return {};
    case Constant.POST_RESET_PASSWORD:
      return {};
    default:
      return state;
  }
};

export default auth;
