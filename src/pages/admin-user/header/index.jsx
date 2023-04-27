import * as React from 'react';
import {
  ListItemText, Menu, MenuItem,
  IconButton, Box, Grid,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { NavigateRoutes } from '../../../constant';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';
import FileTextIcon from '../../../assets/svg/fileText';
import UsersIcon from '../../../assets/svg/users';
import AdminstrationIcon from '../../../assets/svg/administration';
import BarChartIcon from '../../../assets/svg/barChartSVG';
import { getLocalStorage } from '../../../utils/localStorageMethod';
import userRoles from '../../../constant/userRoles';

export default function Header() {
  const classes = useStyles(styles)();
  const { t } = useTranslation();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElResource, setAnchorElResource] = React.useState(null);
  const open = Boolean(anchorEl);
  const openResource = Boolean(anchorElResource);
  const userRole = getLocalStorage('userRole');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickResources = (event) => {
    setAnchorElResource(event.currentTarget);
  };
  const handleCloseResource = () => {
    setAnchorElResource(null);
  };
  //   const navigate = useNavigate();
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Grid container flexDirection="row" display="flex" className={classes.divWrapper}>
        <Grid item className={classes.HeaderWrapper}>
          <Box>
            <IconButton
              className={classes.iconsHoverHeader}
            >
              <MenuIcon className={classes.menuIcon} />
            </IconButton>
          </Box>
          <Stack direction="row" spacing={1} className={classes.menuWrapper}>
            <Link to={NavigateRoutes.ADMIN_DASHBOARD} className={classes.menuLink} style={{ textDecoration: 'none' }}>
              <IconButton
                className={`${classes.iconsHoverHeader} ${(location.pathname === NavigateRoutes.ADMIN_DASHBOARD) ? classes.buttonActive : ''}`}
              >
                <BarChartIcon className={classes.menuItemIcon} />
                {' '}
                <ListItemText primary={t('DASHBOARD')} className={`${classes.menuItem} ${(location.pathname === NavigateRoutes.ADMIN_DASHBOARD) ? classes.buttonActive : ''}`} />
              </IconButton>
            </Link>
            <Link to={NavigateRoutes.STUDENTS_VIEW} className={classes.menuLink} style={{ textDecoration: 'none' }}>
              <IconButton
                className={`${classes.iconsHoverHeader} ${(location.pathname === NavigateRoutes.STUDENTS_VIEW) ? classes.buttonActive : ''}`}
              >
                <UsersIcon className={classes.menuItemIcon} />
                {' '}
                <ListItemText primary={t('STUDENTS')} className={`${classes.menuItem} ${(location.pathname === NavigateRoutes.STUDENTS_VIEW) ? classes.buttonActive : ''}`} />
              </IconButton>
            </Link>
            <div>
              <IconButton
                className={`${classes.iconsHoverHeader} ${classes.adminIcon} ${(location.pathname === NavigateRoutes.USER_MANAGER_VIEW || location.pathname === NavigateRoutes.ROLE_MANAGER_VIEW || location.pathname === NavigateRoutes.REGION_MANAGER_VIEW) ? classes.buttonActive : ''}`}
                aria-owns={anchorEl ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <AdminstrationIcon className={classes.menuItemIcon} />
                <ListItemText primary={t('ADMINISTRATION')} className={classes.menuItem} />
                <KeyboardArrowDownIcon className={classes.keyDownArrow} />
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
                  <Link to={NavigateRoutes.USER_MANAGER_VIEW} className={classes.menuLink} style={{ textDecoration: 'none' }}>
                    <ListItemText primary={t('USERMANAGER')} className={classes.menuItem} />
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to={NavigateRoutes.ROLE_MANAGER_VIEW} className={classes.menuLink} style={{ textDecoration: 'none' }}>
                    <ListItemText primary={t('ROLE_MANAGER')} className={classes.menuItem} />
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to={NavigateRoutes.REGION_MANAGER_VIEW} className={classes.menuLink} style={{ textDecoration: 'none' }}>
                    <ListItemText primary={t('REGION_MANAGER')} className={classes.menuItem} />
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to={NavigateRoutes.LOCATION_MANAGER_VIEW} className={classes.menuLink} style={{ textDecoration: 'none' }}>
                    <ListItemText primary={t('LOCATION_MANAGER')} className={classes.menuItem} />
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to={NavigateRoutes.COURSE_MANAGER_VIEW} className={classes.menuLink} style={{ textDecoration: 'none' }}>
                    <ListItemText primary={t('COURSE_MANAGER')} className={classes.menuItem} />
                  </Link>
                </MenuItem>
                {/* <MenuItem onClick={handleClose}>
                  <Link to={NavigateRoutes.EXAM_CENTER_MANAGER_VIEW} className={classes.menuLink} style={{ textDecoration: 'none' }}>
                    <ListItemText primary={t('EXAM_CENTER_MANAGER')} className={classes.menuItem} />
                  </Link>
                </MenuItem> */}
              </Menu>
            </div>
            <div>
              <IconButton
                className={`${classes.iconsHoverHeader} ${(location.pathname === NavigateRoutes.STUDENTS_RESOURCES) ? classes.buttonActive : ''} ${(location.pathname === NavigateRoutes.TEACHERS_RESOURCES) ? classes.buttonActive : ''}`}
                aria-owns={anchorEl ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClickResources}
              // onMouseOver={handleClickResources}
              >
                <FileTextIcon className={classes.menuItemIcon} />
                <ListItemText primary={t('RESOURCES')} className={classes.menuItem} />
                <KeyboardArrowDownIcon className={classes.keyDownArrow} />
              </IconButton>
              {(userRole === userRoles.SUPER_ADMIN) ? (
                <Menu
                  id="demo-customized-menu"
                  anchorEl={anchorElResource}
                  open={openResource}
                  onClose={handleCloseResource}
                  onMouseLeave={handleCloseResource}
                  className={classes.menuItemLink}
                >
                  <MenuItem onClick={handleCloseResource}>
                    <Link to={NavigateRoutes.STUDENTS_RESOURCES} className={classes.menuLink} style={{ textDecoration: 'none' }}>
                      <ListItemText primary={t('STUDNT_RESOURCES')} className={classes.menuItem} />
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseResource}>
                    <Link to={NavigateRoutes.TEACHERS_RESOURCES} className={classes.menuLink} style={{ textDecoration: 'none' }}>
                      <ListItemText primary={t('TEACHER_RESOURCES')} className={classes.menuItem} />
                    </Link>
                  </MenuItem>
                </Menu>
              ) : ''}
            </div>
            <Link to={NavigateRoutes.ADMIN_DASHBOARD} className={classes.menuLink} style={{ textDecoration: 'none' }}>
              <IconButton
                className={classes.iconsHoverHeader}
              >
                <FileTextIcon className={classes.menuItemIcon} />
                <ListItemText primary={t('ACADEMIC_PANEL')} className={classes.menuItem} />
                <KeyboardArrowDownIcon className={classes.keyDownArrow} />
              </IconButton>
            </Link>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
