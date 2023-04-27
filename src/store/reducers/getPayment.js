import Constant from '../constant';

const initialState = {
  donations: [],
  registerData: [],
  feeStructure: [],
  captureOrder: [],
  captureDonation: [],
  studentPaymentInfo: {},
  enrollStudentData: [],
};

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case Constant.GET_DONATIONS:
      return {
        ...state,
        donations: action.payload,
      };
    case Constant.POST_REGISTER:
      return {
        ...state,
        registerData: action.payload,
      };
    case Constant.POST_FEE_STRUCTURE:
      return {
        ...state,
        feeStructure: action.payload,
      };
    case Constant.CAPTURE_ORDER:
      return {
        ...state,
        captureOrder: action.payload,
      };
    case Constant.CAPTURE_DONATION:
      return {
        ...state,
        captureDonation: action.payload,
      };
    case Constant.SET_STUDENT_PAYMENT_INFO:
      return {
        ...state,
        studentPaymentInfo: action.payload,
      };
    case Constant.SET_FEE_STRUCTURE_FOR_ENROLL:
      return {
        ...state,
        enrollStudentData: action.payload,
      };
    default:
      return state;
  }
};

export default auth;
