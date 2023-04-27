import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LicenseInfo } from '@mui/x-license-pro';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import AuthProvider from './contexts/AuthProvider';
import Register from './pages/register';
import HomePage from './pages/home';
import ForgotPassword from './pages/forgot-password';
import ResetPassword from './pages/reset-password';
import Success from './pages/paypal-checkout/success';
import Cancel from './pages/paypal-checkout/cancel';
import store from './store/reduxstore';
import { NavigateRoutes } from './constant';
// import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Admin from './pages/admin-user';
import StudentsLogs from './pages/admin-user/student-logs';
import StudentsInfo from './pages/admin-user/students/students';
import StudentDashboard from './pages/student-dashboard';
import LocationCoordinatorDashboard from './pages/location-coordinator/dashboard';
import RegistrationDates from './pages/admin-user/registration-dates';
import TeacherResourcesInfo from './pages/admin-user/resources/teacher-resoureces';
import StudentResourcesInfo from './pages/admin-user/resources/student-resoureces';
import LocationStudentResource from './pages/location-coordinator/resources/student-resoureces';
import LocationTeacherResource from './pages/location-coordinator/resources/teacher-resoureces';
import BulkEmail from './pages/common/bulk-email';
import Classes from './pages/location-coordinator/classes';
import Students from './pages/location-coordinator/students';
import Announcements from './pages/location-coordinator/announcements';
import Sync from './pages/location-coordinator/sync';
// import LocationHelpSite from './pages/location-coordinator/help-site';
import HelpSite from './pages/admin-user/help-site';
import UserManager from './pages/admin-user/user-manager';
import RoleManager from './pages/admin-user/role-manager/index';
import CourseManager from './pages/admin-user/course-manager';
import ExamCenterManager from './pages/admin-user/exam-center-manger/index';
import AdminDashboard from './pages/admin-user/dashboard';
import AcademicPanel from './pages/admin-user/academic-panel';
import LocationStudentDashboard from './pages/location-coordinator/location-student-dashboard';

import TeacherUser from './pages/teacher-user/index';
import TeacherAttendanceView from './pages/teacher-user/attendance/index';
import MyClass from './pages/teacher-user/my-class/index';
import TeacherSyncView from './pages/teacher-user/sync/index';
import RegionManager from './pages/admin-user/region-manager';
import LocationManager from './pages/admin-user/location-manager';
import Grading from './pages/admin-user/Grading/index';

LicenseInfo.setLicenseKey(
  'cd62fd50b491064711bfa863865f7013Tz00Mzg0MSxFPTE2ODQzMzM5MTg5MTYsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=',
);

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        popper: {
          marginTop: '-0.8vw !important',
        },
        tooltip: {
          fontSize: '0.7vw !important',
          maxWidth: '100% !important',
        },
      },
    },
  },
});
function App() {
  const clientId = {
    'client-id':
      'AZQsHE-2a8oeGidH-G9jHtcEXkgexQU-lG0gBfnZO763Mi2lhS_cRTxEP7YfkLspzIsZCvekK5SNfqJD',
  };
  return (
    <Provider store={store}>
      <ToastContainer position="top-right" autoClose={5000} />
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <AuthProvider>
              <Box
                style={{
                  background: '#E4F5FD',
                  minHeight: 'calc(100vh)',
                  margin: 'auto',
                }}
              >
                <Routes>
                  <Route path="/" exact element={<HomePage />} />
                  <Route
                    path={NavigateRoutes.LOCATION_COORDINATOR_VIEW}
                    element={<LocationCoordinatorDashboard />}
                  >
                    <Route
                      path={NavigateRoutes.LOCATION_COORDINATOR_EMAIL}
                      element={<BulkEmail />}
                    />
                    <Route
                      path={NavigateRoutes.LC_CLASSES}
                      element={<Classes />}
                    />
                    <Route
                      path={NavigateRoutes.LC_STUDENTS}
                      element={<Students />}
                    />
                    <Route
                      path={NavigateRoutes.LC_ANNOUNCEMENTS}
                      element={<Announcements />}
                    />
                    <Route
                      path={NavigateRoutes.LC_SECTION_SYNC}
                      element={<Sync />}
                    />
                    <Route
                      path={NavigateRoutes.LOCATION_COORDINATOR_TEACHERS_RESOURCES}
                      element={<LocationTeacherResource />}
                    />
                    <Route
                      path={NavigateRoutes.LOCATION_COORDINATOR_STUDENTS_RESOURCES}
                      element={<LocationStudentResource />}
                    />
                    <Route
                      path={NavigateRoutes.LOCATION_COORDINATOR_STUDENTS_DASHBOARD}
                      element={<LocationStudentDashboard />}
                    />
                    <Route
                      path={NavigateRoutes.LOCATION_COORDINATOR_HELP_SITE}
                      exact
                      element={<HelpSite />}
                    />
                  </Route>
                  <Route path={NavigateRoutes.DASHBOARD} element={<Admin />}>
                    <Route
                      path={NavigateRoutes.STUDENTS_VIEW}
                      element={<StudentsInfo />}
                    />
                    <Route
                      path={NavigateRoutes.STUDENTS_LOGS}
                      element={<StudentsLogs />}
                    />
                    <Route
                      path={NavigateRoutes.ADMIN_EMAIL}
                      element={<BulkEmail />}
                    />
                    <Route
                      path={NavigateRoutes.REGISTRATION_DATES}
                      exact
                      element={<RegistrationDates />}
                    />
                    <Route
                      path={NavigateRoutes.GRADING}
                      exact
                      element={<Grading />}
                    />
                    <Route
                      path={NavigateRoutes.HELP_SITE}
                      exact
                      element={<HelpSite />}
                    />
                    <Route
                      path={NavigateRoutes.EMAIL}
                      exact
                      element={<BulkEmail />}
                    />
                    <Route
                      path={NavigateRoutes.USER_MANAGER_VIEW}
                      element={<UserManager />}
                    />
                    <Route
                      path={NavigateRoutes.LOCATION_MANAGER_VIEW}
                      element={<LocationManager />}
                    />
                    <Route
                      path={NavigateRoutes.ROLE_MANAGER_VIEW}
                      element={<RoleManager />}
                    />
                    <Route
                      path={NavigateRoutes.COURSE_MANAGER_VIEW}
                      element={<CourseManager />}
                    />
                    <Route
                      path={NavigateRoutes.EXAM_CENTER_MANAGER_VIEW}
                      element={<ExamCenterManager />}
                    />
                    <Route
                      path={NavigateRoutes.REGION_MANAGER_VIEW}
                      element={<RegionManager />}
                    />
                    <Route
                      path={NavigateRoutes.ACADEMIC_PANEL}
                      element={<AcademicPanel />}
                    />
                    <Route
                      path={NavigateRoutes.ADMIN_DASHBOARD}
                      element={<AdminDashboard />}
                    />
                  </Route>
                  <Route
                    path={NavigateRoutes.STUDENT_DASHBOARD}
                    exact
                    element={<StudentDashboard />}
                  />
                  <Route path={NavigateRoutes.DASHBOARD} element={<Admin />}>
                    <Route
                      path={NavigateRoutes.TEACHERS_RESOURCES}
                      element={<TeacherResourcesInfo />}
                    />
                  </Route>
                  <Route path={NavigateRoutes.DASHBOARD} element={<Admin />}>
                    <Route
                      path={NavigateRoutes.STUDENTS_RESOURCES}
                      element={<StudentResourcesInfo />}
                    />
                  </Route>

                  <Route path={NavigateRoutes.LOGIN} exact element={<Login />} />
                  <Route
                    path={NavigateRoutes.FORGOT_PASSWORD}
                    exact
                    element={<ForgotPassword />}
                  />
                  <Route
                    path={NavigateRoutes.RESET_PASSWORD}
                    exact
                    element={<ResetPassword />}
                  />
                  <Route
                    path={NavigateRoutes.PAYPAL_SUCCESS}
                    element={(
                      <PayPalScriptProvider
                        options={clientId}
                      >
                        <Success />
                      </PayPalScriptProvider>
                    )}
                    exact
                  />
                  <Route
                    path={NavigateRoutes.PAYPAL_CANCEL}
                    element={(
                      <PayPalScriptProvider
                        options={clientId}
                      >
                        <Cancel />
                      </PayPalScriptProvider>
                    )}
                    exact
                  />
                  <Route
                    path={NavigateRoutes.REGISTER}
                    exact
                    element={<Register />}
                  />

                  <Route path={NavigateRoutes.TEACHER_VIEW} element={<TeacherUser />}>
                    <Route path={NavigateRoutes.TEACHER_ATTECNDANCE_VIEW} element={<TeacherAttendanceView />} />
                    <Route path={NavigateRoutes.MY_CLASS} element={<MyClass />} />
                    <Route path={NavigateRoutes.TEACHER_SYNC_VIEW} element={<TeacherSyncView />} />
                    <Route
                      path={NavigateRoutes.TEACHER_VIEW_EMAIL}
                      element={<BulkEmail />}
                    />
                  </Route>
                </Routes>
              </Box>
            </AuthProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </Provider>
  );
}

export default App;
