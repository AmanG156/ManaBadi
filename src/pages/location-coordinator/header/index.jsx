import * as React from 'react';
import {
  ListItemText, IconButton, Box, Grid, Menu, MenuItem,
} from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NavigateRoutes } from '../../../constant';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';
import FileTextIcon from '../../../assets/svg/fileText';
import UsersIcon from '../../../assets/svg/users';
import AdminstrationIcon from '../../../assets/svg/administration';
import BarChartIcon from '../../../assets/svg/barChartSVG';

export default function CoordinatorDashboardHeader({ selectedTab, changeView }) {
  const classes = useStyles(styles)();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const handleClick = (event) => {
    changeView(4);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Grid container flexDirection="row" display="flex" className={classes.divWrapper}>
        <Grid item xs={12} lg={12} md={12} className={classes.HeaderWrapper}>
          <Box>
            <IconButton className={classes.iconsHoverHeader}>
              <MenuIcon className={classes.menuIcon} />
            </IconButton>
          </Box>
          <Stack direction="row" spacing={1} className={classes.menuWrapper}>
            <IconButton
              className={`${classes.iconsHoverHeader} ${(location.pathname === NavigateRoutes.LOCATION_COORDINATOR_STUDENTS_DASHBOARD) ? classes.buttonActive : ''}`}
              onClick={() => {
                changeView(0);
                navigate(NavigateRoutes.LOCATION_COORDINATOR_STUDENTS_DASHBOARD);
              }}
            >
              <BarChartIcon className={classes.menuItemIcon} />
              {' '}
              <ListItemText
                primary={t('DASHBOARD')}
                className={`${classes.menuItem} ${(location.pathname === NavigateRoutes.LOCATION_COORDINATOR_STUDENTS_DASHBOARD) ? classes.buttonActive : ''}`}
              />
            </IconButton>
            <Link
              to={NavigateRoutes.LC_STUDENTS}
              className={classes.menuLink}
              style={{ textDecoration: 'none' }}
            >
              <IconButton
                onClick={() => {
                  changeView(1);
                  navigate(NavigateRoutes.LC_STUDENTS);
                }}
                className={`${classes.iconsHoverHeader} ${location.pathname === NavigateRoutes.LC_STUDENTS
                  ? classes.buttonActive
                  : ''
                }`}
              >
                <UsersIcon className={classes.menuItemIcon} />
                {' '}
                <ListItemText
                  primary={t('STUDENTS')}
                  className={`${classes.menuItem} ${selectedTab === 1
                    ? classes.buttonActive
                    : ''
                  }`}
                />
              </IconButton>
            </Link>
            <Link
              to={NavigateRoutes.LC_CLASSES}
              className={classes.menuLink}
              style={{ textDecoration: 'none' }}
            >
              <IconButton
                onClick={() => {
                  changeView(2);
                  navigate(NavigateRoutes.LC_CLASSES);
                }}
                className={`${classes.iconsHoverHeader} ${(location.pathname === NavigateRoutes.LC_CLASSES) ? classes.buttonActive : ''}`}
              >
                <UsersIcon className={classes.menuItemIcon} />
                {' '}
                <ListItemText primary={t('CLASSES')} className={`${classes.menuItem} ${selectedTab === 2 ? classes.buttonActive : ''}`} />
              </IconButton>
            </Link>
            <Link
              to={NavigateRoutes.LC_ANNOUNCEMENTS}
              className={classes.menuLink}
              style={{ textDecoration: 'none' }}
            >
              <IconButton
                onClick={() => {
                  changeView(3);
                  navigate(NavigateRoutes.LC_ANNOUNCEMENTS);
                }}
                className={`${classes.iconsHoverHeader} ${location.pathname === NavigateRoutes.LC_ANNOUNCEMENTS
                  ? classes.buttonActive
                  : ''
                }`}
              >
                <AdminstrationIcon className={classes.menuItemIcon} />
                <ListItemText
                  primary={t('ANNOUNCEMENTS')}
                  className={`${classes.menuItem} ${(selectedTab === 3) ? classes.buttonActive : ''}`}
                />
              </IconButton>
            </Link>
            <div>
              <IconButton
                className={`${classes.iconsHoverHeader} ${(location.pathname === NavigateRoutes.LOCATION_COORDINATOR_STUDENTS_RESOURCES) ? classes.buttonActive : ''} ${(location.pathname === NavigateRoutes.LOCATION_COORDINATOR_TEACHERS_RESOURCES) ? classes.buttonActive : ''}`}
                aria-owns={anchorEl ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              // onMouseOver={handleClickResources}
              >
                <FileTextIcon className={classes.menuItemIcon} />
                <ListItemText
                  primary={t('RESOURCES')}
                  className={classes.menuItem}
                />
                <KeyboardArrowDownIcon />
              </IconButton>
              <Menu
                id="demo-customized-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onMouseLeave={handleClose}
                className={classes.menuItemLink}
              >
                <MenuItem onClick={handleClose}>
                  <Link to={NavigateRoutes.LOCATION_COORDINATOR_STUDENTS_RESOURCES} className={classes.menuLink} style={{ textDecoration: 'none' }}>
                    <ListItemText primary={t('STUDNT_RESOURCES')} className={classes.menuItem} />
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to={NavigateRoutes.LOCATION_COORDINATOR_TEACHERS_RESOURCES} className={classes.menuLink} style={{ textDecoration: 'none' }}>
                    <ListItemText primary={t('TEACHER_RESOURCES')} className={classes.menuItem} />
                  </Link>
                </MenuItem>
              </Menu>
            </div>
            <IconButton className={classes.iconsHoverHeader}>
              <FileTextIcon className={classes.menuItemIcon} />
              <ListItemText
                primary={t('ACADEMIC_PANEL')}
                className={classes.menuItem}
              />
              <KeyboardArrowDownIcon className={classes.keyDownArrow} />
            </IconButton>
            <IconButton
              onClick={() => {
                changeView(7);
                navigate(NavigateRoutes.LC_SECTION_SYNC);
              }}
              className={`${classes.iconsHoverHeader} ${(location.pathname === NavigateRoutes.LC_SECTION_SYNC) ? classes.buttonActive : ''}`}
            >
              <FileTextIcon className={classes.menuItemIcon} />
              <ListItemText
                primary={t('SYNC')}
                className={`${classes.menuItem} ${(selectedTab === 7) ? classes.buttonActive : ''}`}
              />
              <KeyboardArrowDownIcon className={classes.keyDownArrow} />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
