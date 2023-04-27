import { combineReducers } from 'redux';
import getStudent from './getStudent';
import getParent from './getParent';
import getPayment from './getPayment';
import getLocationCoordinator from './getLocationCoordinator';
import getUser from './getUser';
import getAdmin from './getAdmin';
import getEmail from './getEmail';
import getRole from './getRole';
import getRegion from './getRegion';
import getTeacherView from './getTeacherView';
import getLocations from './getLocations';
import getCourseManager from './getCourseManager';

const rootReducer = combineReducers({
  getStudent,
  getParent,
  getPayment,
  getLocationCoordinator,
  getUser,
  getAdmin,
  getEmail,
  getRole,
  getRegion,
  getTeacherView,
  getCourseManager,
  getLocations,
});

export default rootReducer;
