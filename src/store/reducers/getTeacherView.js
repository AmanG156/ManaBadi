import Constant from '../constant';

const initialState = {
  studentsByYearAndClassId: [],
  classesTimings: [],
  classesByYear: [],
  assignedTeachetPanelStudents: [],
};

const getTeacherView = (state = initialState, action = {}) => {
  switch (action.type) {
    case Constant.STUDENTS_BY_YEAR_AND_CLASSID:
      return {
        ...state,
        studentsByYearAndClassId: action.payload,
      };
    case Constant.CLASSES_TIMINGS:
      return {
        ...state,
        classesTimings: action.payload,
      };
    case Constant.CLASSES_BY_YEAR:
      return {
        ...state,
        classesByYear: action.payload,
      };
    case Constant.GET_TEACHER_PANEL_STUDENTS:
      return {
        ...state,
        assignedTeachetPanelStudents: action.payload,
      };
    default:
      return state;
  }
};

export default getTeacherView;
