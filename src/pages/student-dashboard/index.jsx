/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  useNavigate,
  useLocation,
} from 'react-router-dom';
import {
  Box, IconButton,
  ListItemText, Grid, Typography, Link,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { useTranslation } from 'react-i18next';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExitToApp from '@mui/icons-material/ExitToApp';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { useDispatch, useSelector } from 'react-redux';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DialogAtom from '../../components/atoms/dialog';
import style from './style';
import useStyles from '../../custom-hooks/useStyles';
import logo from '../../assets/images/logo.png';
import StudentDashboard from './dashboard';
import UserIcon from '../../assets/svg/userIcon';
import MeterIcon from '../../assets/svg/meterDashboardIcon';
import LogoutIcon from '../../assets/svg/logoutIcon';
import ButtonAtom from '../../components/atoms/button';
import { Buttons, NavigateRoutes } from '../../constant';
import AccountDetail from './account';
import Enroll from './enroll';
import MenuBarIconSVG from '../../assets/svg/menuBarSVG';
import {
  getAcademicGrades,
  getAllCourses,
  getExtraCurricularActivities,
  getLocations,
  getTShirts,
  getStudentAccountDetails,
} from '../../store/actions/getStudent';
import Donation from './donation';
import Loader from '../../components/atoms/loader';
import { logout } from '../../utils/localStorageMethod';
import {
  getHearAboutUs,
  getVolunteers,
} from '../../store/actions/getParent';

const drawerWidth = '8vw';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 10,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px - 10px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function ReturningFrame() {
  const classes = useStyles(style)();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxStore = useSelector((state) => state?.getAdmin);
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [showAddSibling, setShowAddSibling] = useState(false);
  const [isDonateOpen, setIsDonationDialogOpen] = useState(false);

  const changeView = (tab) => {
    setSelectedTab(tab);
  };
  React.useEffect(() => {
    setLoading(true);
    dispatch(getVolunteers());
    dispatch(getAllCourses());
    dispatch(getHearAboutUs());
    dispatch(getLocations());
    dispatch(getTShirts());
    dispatch(getAcademicGrades());
    dispatch(getExtraCurricularActivities());
  }, []);
  React.useEffect(() => {
    dispatch(getStudentAccountDetails(setLoading));
  }, [reduxStore?.impersonateUserEmail]);
  const studentStateData = useSelector((state1) => state1.getStudent);
  const [studentState, setStudentState] = useState(studentStateData);
  React.useEffect(() => {
    if ((selectedTab !== 1) && showAddSibling) {
      setShowAddSibling(false);
    }
  }, [selectedTab]);

  React.useEffect(() => {
    setStudentState(studentStateData);
  }, [studentStateData]);

  const getPrimaryStudent = () => studentState?.studentAccountDetails?.studentData?.find((stu) => stu.primaryStudent);

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }} className={classes.studentDashboard}>
      <AppBar position="fixed" className={classes.appBar}>
        {
          JSON.parse(localStorage.getItem('impersonateUser'))
          && (
            <Grid className={classes.headerViewingDiv}>
              <div className={classes.headerViewing}>
                <p>Viewing as</p>
                <p><span>{state?.email ? state?.email : JSON.parse(localStorage.getItem('impersonateUser')).state.email}</span></p>
                <ButtonAtom
                  className={classes.exitBtn}
                  onClick={() => {
                    localStorage.removeItem('impersonateToken');
                    localStorage.removeItem('impersonateUser');
                    navigate(NavigateRoutes.STUDENTS_VIEW, { state: { previousFilters: state.filterOptions } });
                  }}
                  name={t('EXIT')}
                  icon={<ExitToApp />}
                />
              </div>
            </Grid>
          )
        }
        <Grid className={classes.HeaderWrapper} anchor="top">
          <Box>
            <img
              src={logo}
              width={380}
              alt="ManaBadi SiliconAndhra Logo"
              className={classes.headerLogo}
              onClick={() => navigate('/')}
            />
          </Box>
          <Stack direction="row" spacing={1} justifyContent="space-between !important" alignItems="center">
            <ListItemText
              className={classes.commonProfile}
              primary={(
                <Typography
                  component="div"
                  className={classes.inOneRow}
                >
                  {getPrimaryStudent()?.studentInfo?.firstName}
                  {' '}
                  {getPrimaryStudent()?.studentInfo?.lastName}
                </Typography>
              )}
              secondary={(
                <>
                  <Typography
                    component="div"
                    className={classes.roleName}
                  >
                    Student
                  </Typography>
                  <div
                    className={classes.logoutIcon}
                    onClick={logout}
                  >
                    {/* <IconButton /> */}
                    <Typography>
                      <LogoutIcon />
                      Logout
                    </Typography>
                  </div>
                </>
              )}
            />
            <ListItemIcon>
              <CardMedia
                className={classes.accountIcon}
                component="img"
                image={getPrimaryStudent()?.studentInfo?.profilePhoto}
                alt="profile-img"
              />
            </ListItemIcon>
          </Stack>
        </Grid>
      </AppBar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ mr: 2, ...(open && { display: 'none' }) }}
        className={`${classes.openDrawerArrow} ${classes.drawerArrow}`}
      >
        <ChevronRightIcon />
      </IconButton>
      <Drawer
        className={classes.menuBar}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop: '6.3vw',
            height: 'calc(100% - 6.3vw)',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box>
          <IconButton onClick={handleDrawerClose} className={`${classes.closeDrawerArrow} ${classes.drawerArrow}`}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <List>
            <ListItem className={classes.listMenuBarItem}>
              <ListItemIcon className={classes.menuIconBar}>
                <MenuBarIconSVG />
              </ListItemIcon>
            </ListItem>
            <ListItem
              onClick={() => changeView(0)}
              button
              className={`${classes.listMeterItem} ${(selectedTab === 0) ? classes.buttonMeterActive : ''}`}
            >
              <ListItemIcon className={classes.sideMenuIcon}>
                <MeterIcon />
              </ListItemIcon>
              <ListItemText className={classes.listItemText} primary={t('DASHBOARD')} />
            </ListItem>
            <ListItem
              className={`${classes.listItem} ${selectedTab === 1 ? classes.buttonActive : ''}`}
              onClick={() => changeView(1)}
              button
            >
              <ListItemIcon className={classes.sideMenuIcon}>
                <UserIcon />
              </ListItemIcon>
              <ListItemText className={classes.listItemText} primary={t('ACCOUNT')} />
            </ListItem>
            <ListItem
              button
              className={`${classes.listItem} ${selectedTab === 2 ? classes.buttonActive : ''}`}
              onClick={() => changeView(2)}
            >
              <ListItemIcon className={classes.sideMenuIcon}>
                <CalendarTodayOutlinedIcon />
              </ListItemIcon>
              <ListItemText className={classes.listItemText} primary={t('CALENDER')} />
            </ListItem>
            <ListItem
              button
              className={`${classes.listItem} ${selectedTab === 3 ? classes.buttonActive : ''}`}
              onClick={() => changeView(3)}
            >
              <ListItemIcon className={classes.sideMenuIcon}>
                <UserIcon />
              </ListItemIcon>
              <ListItemText className={classes.listItemText} primary={t('ENROLL')} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Main open={open} className={classes.addSpaceAround} component="main" sx={{ flexGrow: 1 }}>
        <Grid className={`${classes.HeaderWrapper} ${classes.divWrapper}`}>
          <Typography gutterBottom className={classes.headingName}>
            {t('MY_DASHBOARD')}
          </Typography>
          <Stack direction="row" justifyContent="space-between !important">
            <Box>
              <Grid container>
                <Grid item xs={4} className={classes.btn}>
                  <Link to="/enroll">
                    <ButtonAtom
                      btntype={Buttons.PRIMARY}
                      className={classes.actionBtn}
                      name={t('ENROLL')}
                      onClick={() => {
                        if (selectedTab !== 3) {
                          setSelectedTab(3);
                        }
                      }}
                    />
                  </Link>
                </Grid>
                <Grid item xs={4} className={classes.btn}>
                  <ButtonAtom
                    btntype={Buttons.PRIMARY}
                    className={classes.actionBtn}
                    name={t('ADD_SIBLING')}
                    onClick={() => {
                      setShowAddSibling(true);
                      if (selectedTab === 3) {
                        return;
                      }
                      if (selectedTab !== 1) {
                        setSelectedTab(1);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <ButtonAtom
                    btntype={Buttons.PRIMARY}
                    className={classes.donateActionBtn}
                    onClick={() => setIsDonationDialogOpen(true)}
                    name={t('DONATE')}
                  />
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Grid>
        <Grid>
          {selectedTab === 0
            ? (
              <StudentDashboard
                studentAccountDetails={studentState?.studentAccountDetails}
              />
            )
            : selectedTab === 1 ? (
              <AccountDetail
                showAddSibling={showAddSibling}
                setShowAddSibling={setShowAddSibling}
                studentAccountDetails={studentState?.studentAccountDetails}
                setStudentState={setStudentState}
              />
            ) : selectedTab === 3 ? (
              <Enroll
                showAddSibling={showAddSibling}
                setShowAddSibling={setShowAddSibling}
                studentAccountDetails={studentState?.studentAccountDetails}
                setStudentState={setStudentState}
              />
            ) : null}
        </Grid>
        <DialogAtom
          isOpen={isDonateOpen}
          dialogHeading={t('DONATION')}
          secHandle={() => setIsDonationDialogOpen(false)}
          customClass={classes.donateDialogAtom}
          content={(
            <Donation studentAccountDetails={studentState?.studentAccountDetails} />
          )}

        />
        {loading && (
          <Grid>
            <Loader message={t('LOADING')} />
          </Grid>
        )}
      </Main>
    </Box>
  );
}
