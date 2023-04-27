import Constant from '../constant';

const initialState = {
  roles: [],
  permissions: [],
};

const role = (state = initialState, action = {}) => {
  switch (action.type) {
    case Constant.SET_ALL_ROLE:
      return {
        ...state,
        roles: action.payload,
      };
    case Constant.SET_ALL_ROLE_PERMISSIONS:
      return {
        ...state,
        permissions: action.payload,
      };
    default:
      return state;
  }
};

export default role;
