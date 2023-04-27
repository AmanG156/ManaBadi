import Constant from '../constant';

const initialState = {
  classrooms: [],
  assignedYears: [],
  assignedLocations: [],
  teachers: [],
  assignedYearsDetails: [],
  academicYears: [],
  students: [],
  sectionDetails: [],
  locationCourses: [],
  studentResourceWRT: [],
  teacherResources: [],
  uploadFile: [],
  uploadVideo: [],
  emailFilters: [],
  announcementDetails: {},
  locationDetails: {},
  helpVideos: [],
  notScoredStudentTeachers: [],
  marksByQuarter: {},
  studentsCsv: [],
};

const getLocationCoordinator = (state = initialState, action = {}) => {
  switch (action.type) {
    case Constant.GET_CLASSROOMS:
      return {
        ...state,
        classrooms: action.payload,
      };
    case Constant.GET_ASSIGNED_YEARS:
      return {
        ...state,
        assignedYears: action.payload,
      };
    case Constant.GET_ACADEMIC_YEARS:
      return {
        ...state,
        academicYears: action.payload,
      };

    case Constant.GET_ASSIGNED_LOCATIONS:
      return {
        ...state,
        assignedLocations: action.payload,
      };
    case Constant.GET_ALL_TEACHERS:
      return {
        ...state,
        teachers: action.payload,
      };
    case Constant.GET_LOCATION_DETAILS:
      return {
        ...state,
        locationDetails: {
          ...state.locationDetails,
          ...action.payload,
        },
      };
    case Constant.SET_STUDENTS:
      return {
        ...state,
        locationDetails: {
          ...state.locationDetails,
          students: action.payload,
        },
      };
    case Constant.GET_ASSIGNED_YEARS_DETAILS:
      return {
        ...state,
        assignedYearsDetails: action.payload,
      };
    case Constant.GET_STUDENTS_BY_LOCATION:
      return {
        ...state,
        students: action.payload,
      };
    case Constant.GET_STUDENTS_BY_LOCATION_CSV:
      return {
        ...state,
        studentsCsv: action.payload,
      };
    case Constant.GET_TEACHERS:
      return {
        ...state,
        notScoredStudentTeachers: action.payload,
      };
    case Constant.GET_EMAIL_TEMPLATES:
      return {
        ...state,
        emailTemplates: action.payload,
      };
    case Constant.SET_SECTION_DETAILS:
      return {
        ...state,
        sectionDetails: action.payload,
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
    case Constant.GET_ALL_LOCATION_COURCE:
      return {
        ...state,
        locationCourses: action.payload,
      };
    case Constant.GET_ALL_STUDENT_RECOURCES_WRT:
      return {
        ...state,
        studentResourceWRT: action.payload,
      };
    case Constant.GET_HELP_VIDEOS:
      return {
        ...state,
        helpVideos: action.payload,
      };
    case Constant.GET_ALL_TEACHER_RECOURCES:
      return {
        ...state,
        teacherResources: action.payload,
      };
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
    case Constant.GET_EMAIL_FILTERS:
      return {
        ...state,
        emailFilters: action.payload,
      };
    case Constant.GET_MARKS_BY_QUARTER:
      return {
        ...state,
        marksByQuarter: action.payload,
      };
    default:
      return state;
  }
};

export default getLocationCoordinator;
