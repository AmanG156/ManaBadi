import Constant from '../constant';

const initialState = {
  isLoading: false,
};

const getLoading = (state = initialState, action = {}) => {
  switch (action.type) {
    case Constant.SHOW_LOADER:
      return {
        ...state,
        isLoading: true,
      };
    case Constant.HIDE_LOADER:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default getLoading;
