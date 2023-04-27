import Constant from '../constant';

const initialState = {
  volunteers: [],
  hearAboutUs: [],
  recipients: [],
};

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case Constant.GET_VOLUNTEERS:
      return {
        ...state,
        volunteers: action.payload,
      };
    case Constant.HEAR_ABOUTS_US:
      return {
        ...state,
        hearAboutUs: action?.payload?.data,
      };
    default:
      return state;
  }
};

export default auth;
