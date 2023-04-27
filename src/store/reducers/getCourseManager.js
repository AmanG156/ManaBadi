import Constant from '../constant';

const initialState = {
  coursesData: [],
};

const getCourseManager = (state = initialState, action = {}) => {
  switch (action.type) {
    case Constant.GET_COURSES_MANAGER:
      return {
        ...state,
        coursesData: action.payload,
      };
    default:
      return state;
  }
};

export default getCourseManager;
