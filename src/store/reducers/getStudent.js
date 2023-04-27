import Constant from '../constant';

const initialState = {
  tshirts: [],
  courses: [],
  academicGrades: [],
  extraCurricularActivites: [],
  locations: [],
  students: [],
  movedStudent: [],
  studentLogs: [],
  studentAccountDetails: {},
  siblingData: {},
  studentFilterViews: [],
  studentFilters: [],
  enrollCourseList: [],
  enrollmentDetails: [],
  totalCount: 0,
};

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case Constant.GET_TSHIRTS:
      return {
        ...state,
        tshirts: action.payload,
      };

    case Constant.GET_STUDENT_LOGS:
      return {
        ...state,
        studentLogs: action.payload,
      };
    case Constant.GET_ALL_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case Constant.GET_ACADEMIC_GRADES:
      return {
        ...state,
        academicGrades: action.payload,
      };

    case Constant.GET_EXTRA_CURRICULAR_ACTIVITIES:
      return {
        ...state,
        extraCurricularActivites: action.payload,
      };
    case Constant.GET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };
    case Constant.GET_ALL_STUDENTS:
      return {
        ...state,
        students: action.payload,
      };
    case Constant.TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.payload,
      };
    case Constant.GET_PAGINATED_STUDENTS:
      return {
        ...state,
        students: state.students?.concat(action.payload),
      };
    case Constant.MOVE_STUDENT:
      return {
        ...state,
        movedStudent: action.payload,
      };
    case Constant.GET_STUDENT_ACCOUNT_DETAILS:
      return {
        ...state,
        studentAccountDetails: action.payload,
      };
    case Constant.ADD_SIBLING_DATA:
      return {
        ...state,
        siblingData: action.payload,
      };
    case Constant.SET_FILTER_VIEWS:
      return {
        ...state,
        studentFilterViews: action.payload,
      };
    case Constant.SET_FILTERS:
      return {
        ...state,
        studentFilters: action.payload,
      };
    case Constant.SET_NEXT_ENROLL_COURSE:
      return {
        ...state,
        enrollCourseList: action.payload,
      };
    case Constant.SET_STUDENT_ENROLLMENT_DETAILS:
      return {
        ...state,
        enrollmentDetails: action.payload,
      };
    case Constant.CLEAN_STUDENT_ENROLLMENT_DETAILS:
      return {
        ...state,
        enrollmentDetails: {},
      };
    default:
      return state;
  }
};

export default auth;
