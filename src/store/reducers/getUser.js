import Constant from '../constant';

const initialState = {
  users: [],
  userRoles: [],
  userFilters: [],
};

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case Constant.GET_ALL_USER:
      return {
        ...state,
        users: action.payload,
      };

    case Constant.GET_PAGINATED_USERS:
      return {
        ...state,
        users: state.users?.concat(action.payload),
      };
    case Constant.GET_ALL_USER_FILTERS:
      return {
        ...state,
        userFilters: action.payload,
      };

    case Constant.GET_ALL_USER_ROLES:
      return {
        ...state,
        userRoles: action.payload,
      };
    default:
      return state;
  }
};

export default auth;
