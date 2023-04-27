import { ApiRoutes } from '../../constant';
import { APIROUTES } from '../../constant/routes';
import request from '../../utils/request';
// Login services
export const getLoginTokenService = (body) => request.post(`${ApiRoutes.GET_TOKEN_FOR_LOGIN}`, body);
export const postForgotPasswordService = (body) => request.post(`${ApiRoutes.POST_FORGOT_PASSWORD}`, body);
export const resetPasswordService = (body) => request.post(`${ApiRoutes.POST_RESET_PASSWORD}`, body);

// parent services
export const getEmailAvailabilityService = (email) => request.get(`${ApiRoutes.GET_EMAIL_AVAILABILITY}/?email=${email}`);
export const getVolunteerService = () => request.get(`${ApiRoutes.GET_VALUE_BY_TYPE}${ApiRoutes.GET_VOLUNTEERS}`);
export const getHearAboutUsService = () => request.get(`${ApiRoutes.GET_VALUE_BY_TYPE}${ApiRoutes.HEAR_ABOUTS_US}`);
export const editParentService = (studentId, payload) => request.post(`${ApiRoutes.EDIT_PARENT}/${studentId}`, payload);
export const updateParentInfoByStudentService = (body) => request.put(`${ApiRoutes.UPDATE_PARENT_INFO}`, body);

// student services
export const getTShirtService = () => request.get(`${ApiRoutes.GET_VALUE_BY_TYPE}/tshirt`);
export const getAllCourseService = () => request.get(`${ApiRoutes.GET_ALL_COURSES}`);
export const getCourseByAgeLocationService = (body) => request.post(`${ApiRoutes.GET_COURSES_AGE_LOCATION}`, body);
export const getCourseLocationService = (body) => request.post(`${ApiRoutes.GET_LOCATION_COURSE}`, body);
export const getAdminPaginatedStudentsService = (pageNumber, pageLimit, body) => request.post(
  `${ApiRoutes.GET_ALL_STUDENTS}?pageNo=${pageNumber}&&pageLimit=${pageLimit}`,
  body,
);

export const getAcademicGradesService = () => request.get(`${ApiRoutes.GET_VALUE_BY_TYPE}${ApiRoutes.GET_ACADEMIC_GRADES}`);
export const editStudentByAdminService = (studentId, body) => request.post(`${ApiRoutes.EDIT_STUDENT}/${studentId}`, body);
export const updateStudentInfoService = (body) => request.patch(`${ApiRoutes.UPDATE_STUDENT_INFO}`, body);
export const updateSiblingInfoService = (body, siblingId) => request.patch(`${ApiRoutes.UPDATE_SIBLING_INFO}/${siblingId}`, body);

export const getExtraCurricularActivitiesService = () => request.get(
  `${ApiRoutes.GET_VALUE_BY_TYPE}${ApiRoutes.GET_EXTRA_CURRICULAR_ACTIVITIES}`,
);
export const getLocationService = () => request.get(`${ApiRoutes.GET_LOCATIONS}`);
export const getAllLocationsByCourseService = (id) => request.get(`${ApiRoutes.GET_LOCATIONS}/?courseId=${id}`);
export const getStudentsByAdminService = (body) => request.post(`${ApiRoutes.GET_ALL_STUDENTS}`, body);
export const getStudentsByRegionService = (pageNumber, pageLimit, body) => request.post(`${ApiRoutes.GET_STUDENTS_BY_REGION}?pageNo=${pageNumber}&&pageLimit=${pageLimit}`, body);
export const getStudentLogDetailService = (logId) => request.get(`${ApiRoutes.GET_STUDENT_LOG_DETAIL}/${logId}`);
export const getStudentLogsService = (studentId) => request.get(`${ApiRoutes.GET_STUDENT_LOGS}/${studentId}`);
export const moveStudentService = (body) => request.post(`${ApiRoutes.MOVE_STUDENT}`, body);
export const getStudentSectionsService = (payload) => request.get(
  `${ApiRoutes.GET_STUDENT_SECTIONS}/${payload.locationId}/${payload.courseId}`,
);
export const getStudentAccountDetailService = () => request.get(`${ApiRoutes.GET_STUDENT_ACCOUNT_DETAILS}`);
export const addSiblingService = (body) => request.post(`${ApiRoutes.ADD_SIBLING}`, body);
export const addFilterViewService = (body) => request.post(`${ApiRoutes.ADD_FILTER_VIEW}`, body);
export const getAllFilterViewService = () => request.get(`${ApiRoutes.GET_FILTER_VIEWS}`);
export const getAllFilterService = (body) => request.get(`${ApiRoutes.GET_ALL_FILTERS}`, body);
export const getAllFilterServiceRegion = (body) => request.get(`${ApiRoutes.GET_ALL_FILTERS_REGION}`, body);
export const getLocationsByCourseId = (courseId) => request.get(`${ApiRoutes.GET_LOCATIONS_BY_COURSE}/${courseId}`);
export const getLocationsByRegionService = () => request.get(`${ApiRoutes.GET_LOCATIONS_BY_REGION}`);
export const getNextEnrollCourseService = () => request.get(`${ApiRoutes.GET_NEXT_ENROLL_COURSE}`);
export const getStudentMarksService = (studentId) => request.get(`${ApiRoutes.GET_STUDENT_MARKS}/${studentId}`);
export const getStudentEnrollmentService = (payload) => request.post(`${ApiRoutes.GET_ENROLLMENT_HISTORY}`, payload);
// payment services
export const getDonationService = () => request.get(`${ApiRoutes.GET_VALUE_BY_TYPE}${ApiRoutes.GET_DONATIONS}`);
export const postRegisterService = (body) => request.post(`${ApiRoutes.POST_REGISTER}`, body);
export const postFeeStructureService = (body) => request.post(`${ApiRoutes.POST_FEE_STRUCTURE}`, body);
export const createLinkService = (body) => request.post(`${ApiRoutes.CREATE_ORDER}`, body);
export const donationService = (body) => request.post(`${ApiRoutes.CREATE_DONATION_ORDER}`, body);

export const captureOrderService = (body) => request.post(`${ApiRoutes.CAPTURE_ORDER}`, body);
export const captureDonationService = (body) => request.post(`${ApiRoutes.CAPTURE_DONATION}`, body);

export const getStudentPaymentInfoService = (id) => request.get(`${ApiRoutes.GET_STUDENT_PAYMENT_INFO}/${id}`);

export const getFeeStructureForEnrollService = (body) => request.post(`${ApiRoutes.GET_FEE_FOR_ENROLL}`, body);

// location coordinator services
export const getClassroomsService = (body) => request.post(`${ApiRoutes.GET_CLASSROOMS}`, body);
export const addTeacherService = (body) => request.post(`${ApiRoutes.ADD_TEACHER}`, body);
export const getAcademicYearsService = () => request.get(`${ApiRoutes.GET_ACADEMIC_YEARS}`);
export const getAssignedLocationsService = () => request.get(`${ApiRoutes.GET_ASSIGNED_LOCATIONS}`);
export const getAllTeachersService = () => request.get(`${ApiRoutes.GET_ALL_TEACHERS}`);
export const getAssignedYearsDetailsService = (body) => request.post(`${ApiRoutes.GET_ACADEMIC_INFO}`, body);
export const postAcademicInfoService = (body) => request.post(`${ApiRoutes.POST_ACADEMIC_INFO}`, body);
export const updateAcademicInfoService = (body) => request.post(`${ApiRoutes.UPDATE_ACADEMIC_INFO}`, body);
export const getStudentsByLocationService = (body) => request.post(`${ApiRoutes.GET_STUDENTS_BY_LOCATION}`, body);
export const getAllLocationCourseService = (body) => request.post(`${ApiRoutes.GET_ALL_LOCATION_COURSE}`, body);
export const getTeacherResourceService = (body) => request.post(`${ApiRoutes.GET_TEACHER_RESOURCE}`, body);
export const getStudentResourceWRTCourseService = (body) => request.post(`${ApiRoutes.GET_STUDENT_RESOURCE_WRTCOURCE}`, body);
export const updateMarksService = (body) => request.put(`${ApiRoutes.UPDATE_STUDENT_MARKS}`, body);
export const updateHomeworkMarksService = (body) => request.put(`${ApiRoutes.UPDATE_HOMEWORK_MARKS}`, body);
export const getLocationDetailsService = (body) => request.post(`${ApiRoutes.GET_LOCATION_STUDENT_DASHBOARD}`, body);
export const getHelpVideosService = (userRole) => request.get(`${ApiRoutes.GET_HELP_VIDEOS}/?type=${userRole}`);
export const getTeachersService = (body) => request.post(`${ApiRoutes.GET_TEACHERS}`, body);

// User Manager Services
export const getAllUserService = () => request.post(`${ApiRoutes.GET_ALL_USER}`);
export const getAllUserServicePaginated = (pageNumber, pageLimit, body) => request.post(`${ApiRoutes.GET_ALL_USER}?pageNo=${pageNumber}&&pageLimit=${pageLimit}`, body);
export const getUserRolesService = () => request.get(`${ApiRoutes.GET_ALL_USER_ROLES}`);
export const addAddUserService = (body) => request.post(`${ApiRoutes.ADD_USER}`, body);
export const updateUserInfoService = (userId, body) => request.post(`${ApiRoutes.EDIT_USER}/${userId}`, body);
export const getAllFilterUserManagerService = (body) => request.get(`${ApiRoutes.GET_FILTER_LIST_USER_MANAGER}`, body);

export const getEmailTemplateService = () => request.get(`${ApiRoutes.EMAIL_TEMPLATE}`);
export const saveEmailTemplateService = (body) => request.post(`${ApiRoutes.EMAIL_TEMPLATE}`, body);
export const getSectionDetailsService = (body) => request.post(`${ApiRoutes.GET_SECTION_DETAILS}`, body);
export const getAnnouncementListService = (payload) => request.post(`${ApiRoutes.GET_ANNOUNCEMENT_LIST}`, payload);
export const getAnnouncementByIdService = (id) => request.get(`${ApiRoutes.GET_ANNOUNCEMENT_BY_ID}/${id}`);

// Admin Services
export const uploadVideoService = (body) => request.post(`${ApiRoutes.GET_UPLOADVIDEO}`, body);
export const uploadHelpVideoService = (body) => request.post(`${ApiRoutes.ADD_HELP_VIDEO}`, body);
export const uploadFileService = (body) => request.post(`${ApiRoutes.GET_UPLOADFILE}`, body);
export const sendAnnouncementService = (body) => request.post(`${ApiRoutes.SEND_ANNOUNCEMENT}`, body);
export const getEmailFilterService = () => request.get(`${ApiRoutes.GET_EMAIL_FILTERS}`);
export const getRecipientsByFilterService = (body) => request.post(`${APIROUTES.GET_RECIPIENTS_BY_FILTER}`, body);
export const createStudentResourceService = (body) => request.post(`${ApiRoutes.CREATE_STUDENT_RESOURCE}`, body);
export const cancelEnrollService = (body) => request.post(`${ApiRoutes.CANCEL_ENROLLMENT}`, body);
export const deactivateResourceService = (body) => request.post(`${ApiRoutes.DEACTIVATE_RESOURCE}`, body);
export const updateResourceService = (body) => request.post(`${ApiRoutes.UPDATE_RESOURCE}`, body);
export const impersonateUserService = (body) => request.post(`${ApiRoutes.IMPERSONATE_USER}`, body);
export const updateHelpVideoService = (body) => request.post(`${ApiRoutes.UPDATE_HELP_VIDEO}`, body);
export const deactivateHelpVideosService = (body) => request.post(`${ApiRoutes.DEACTIVATE_HELP_VIDEO}`, body);
export const getStudentResourceInFolderService = (body) => request.post(`${ApiRoutes.GET_STUDENT_RESOURCE_WRTCOURCE}`, body);
export const studentMarksByQuarter = (body) => request.post(`${ApiRoutes.POST_STUDENT_MARKS_BY_QUARTER}`, body);

// Substitution Tags
export const getSubstitutionTagsService = () => request.get(`${ApiRoutes.GET_SUBSTITUTION_TAGS}`);

// Role Manager Services
export const getAllRoleService = () => request.get(`${ApiRoutes.GET_ALL_ROLE}`);
export const getAllRolePermission = () => request.get(`${ApiRoutes.GET_ALL_ROLE_PERMISSIONS}`);
export const addRoleService = (payload) => request.post(`${ApiRoutes.GET_ALL_ROLE}`, payload);
export const updateRoleService = (roleId, payload) => request.put(`${ApiRoutes.GET_ALL_ROLE}/${roleId}`, payload);

// Region Manager Services
export const getAllRegionService = () => request.get(`${ApiRoutes.GET_ALL_REGION}`);
export const getCountriesService = () => request.get(`${ApiRoutes.GET_COUNTRIES}`);
export const getRegionCordinatorsService = () => request.get(`${ApiRoutes.GET_REGION_COORDINATORS}`);
export const getGeoRegionService = (payload) => request.post(`${ApiRoutes.GET_GEO_REGION}`, payload);
export const addRegionService = (payload) => request.post(`${ApiRoutes.ADD_REGION_DATA}`, payload);
export const editRegionService = (regionId, payload) => request.put(`${ApiRoutes.EDIT_REGION_DATA}/${regionId}`, payload);

// Location Manager Services
export const getAllLocationsService = () => request.get(`${ApiRoutes.GET_ALL_LOCATIONS}`);
export const updateLocationService = (body) => request.put(`${ApiRoutes.ADD_UPDATE_LOCATION}`, body);
export const CreateLocationService = (body) => request.post(`${ApiRoutes.ADD_UPDATE_LOCATION}`, body);
export const getAllExamCentersService = () => request.get(`${ApiRoutes.GET_ALL_EXAM_CENTERS}`);
export const getAllLocationCoordinatorsService = () => request.get(`${ApiRoutes.GET_ALL_LOCATION_COORODINATORS}`);

// Teacher View Services
export const studentsByYearAndClassIdService = (body) => request.post(`${ApiRoutes.STUDENTS_BY_YEAR_AND_CLASSID}`, body);
export const classesTimingsService = (body) => request.post(`${ApiRoutes.CLASSES_TIMINGS}`, body);
export const classesByAcademicYear = (body) => request.post(`${ApiRoutes.CLASSES_BY_ACADEMIC_YEAR}`, body);
export const getTeachetPanelStudentsService = (body) => request.post(`${ApiRoutes.GET_TEACHER_PANEL_STUDENTS}`, body);
export const markStudentAttendanceService = (body) => request.post(`${ApiRoutes.MARK_STUDENT_ATTENDANCE}`, body);

// Course Manager Services
export const getAllCoursesForManagerService = () => request.get(`${ApiRoutes.GET_COURSES_MANAGER}`);
export const createCourseService = (body) => request.post(`${ApiRoutes.POST_CREATE_COURSE}`, body);
export const editCourseService = (body) => request.post(`${ApiRoutes.POST_EDIT_COURSE}`, body);
