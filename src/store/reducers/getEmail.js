import Constant from '../constant';

const initialState = {
  emailTemplates: [],
  announcements: [],
  emailFilters: [],
  announcementDetails: {},
  recipientOptions: [],
  emailList: [],
  emailParents: [],
  studentFilters: [],
  substitutionTags: [],
};

const getEmail = (state = initialState, action = {}) => {
  switch (action.type) {
    case Constant.GET_EMAIL_TEMPLATES:
      return {
        ...state,
        emailTemplates: action.payload,
      };
    case Constant.GET_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: action.payload,
      };
    case Constant.GET_ANNOUNCEMENT_BY_ID:
      return {
        ...state,
        announcementDetails: action.payload,
      };
    case Constant.GET_EMAIL_FILTERS:
      return {
        ...state,
        emailFilters: action.payload,
      };
    case Constant.STUDENT_FILTERS:
      return {
        ...state,
        studentFilters: action.payload,
      };
    case Constant.RECIPIENT_OPTIONS:
      return {
        ...state,
        recipientOptions: action.payload,
      };
    case Constant.RECIPIENTS:
      return {
        ...state,
        recipients: action?.payload,
      };
    case Constant.MAIL_FILTER:
      return {
        ...state,
        emailSetFilter: action?.payload,
      };
    case Constant.GET_SUBSTITUTION_TAGS:
      return {
        ...state,
        substitutionTags: action?.payload,
      };
    case Constant.EMAIL_LIST:
      return {
        ...state,
        emailList: action?.payload,
      };
    case Constant.MAIL_PARENTS:
      return {
        ...state,
        emailParents: action?.payload,
      };
    default:
      return state;
  }
};

export default getEmail;
