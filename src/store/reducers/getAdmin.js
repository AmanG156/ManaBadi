import Constant from '../constant';

const initialState = {
  graphOption: false,
  enrollGraphOption: '',
  uploadFile: [],
  uploadVideo: [],
  createStudentResource: [],
  createStudentResourceError: {},
  impersonateUserEmail: [],
  studentResourcesByFolder: [],
  folderDetails: [],
};

const getAdmin = (state = initialState, action = {}) => {
  switch (action.type) {
    case Constant.UPLOAD_FILE:
      return {
        ...state,
        uploadFile: action.payload,
      };
    case Constant.UPLOAD_VIDEO:
      return {
        ...state,
        uploadVideo: action.payload,
      };
    case Constant.CREATE_STUDENT_RESOURCE:
      return {
        ...state,
        createStudentResource: action.payload,
      };
    case Constant.CREATE_STUDENT_RESOURCE_ERROR:
      return {
        ...state,
        createStudentResourceError: action.payload,
      };
    case Constant.IMPERSONATE_USER:
      return {
        ...state,
        impersonateUserEmail: action.payload,
      };
    case Constant.SET_GRAPH_OPTIONS:
      return {
        ...state,
        graphOption: action.payload,
      };
    case Constant.SET_ENROLL_GRAPH_OPTIONS:
      return {
        ...state,
        enrollGraphOption: action.payload,
      };
    case Constant.GET_STUDENT_RESOURCE_IN_FOLDER:
      return {
        ...state,
        studentResourcesByFolder: action.payload,
      };
    case Constant.GET_FOLDER_DETAILS:
      return {
        ...state,
        folderDetails: action.payload,
      };
    default:
      return state;
  }
};

export default getAdmin;
