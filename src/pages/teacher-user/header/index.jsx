import * as React from 'react';
import {
  ListItemText, Menu, MenuItem,
  IconButton, Box, Grid,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/ImportContactsTwoTone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/fontawesome-free-solid';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { NavigateRoutes } from '../../../constant';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';
import FileTextIcon from '../../../assets/svg/fileText';
import UsersIcon from '../../../assets/svg/users';
import UserIcon from '../../../assets/svg/userIcon';
// import BarChartIcon from '../../../assets/svg/barChartSVG';

export default function TeacherHeader() {
  const classes = useStyles(styles)();
  const { t } = useTranslation();
  const location = useLocation();
  const [anchorEl] = React.useState(null);
  const [anchorElSync, setAnchorElSync] = React.useState(null);
  // const [anchorElResource, setAnchorElResource] = React.useState(null);
  // const openResource = Boolean(anchorElResource);
  const openSync = Boolean(anchorElSync);

  const handleClickSync = (event) => {
    setAnchorElSync(event.currentTarget);
  };
  const handleSyncClose = () => {
    setAnchorElSync(null);
  };

  // const handleClickResources = (event) => {
  //   setAnchorElResource(event.currentTarget);
  // };
  // const handleCloseResource = () => {
  //   setAnchorElResource(null);
  // };

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
          <Stack direction="row" spacing={1} justifyContent="space-between !important">
            <Link to="/" className={classes.menuLink} style={{ textDecoration: 'none' }}>
              <IconButton
                className={`${classes.homeIcon} ${(location.pathname === '') ? classes.buttonActive : ''}`}
              >
                <HomeIcon className={classes.menuItemIcon} />
                {' '}
                <ListItemText primary={t('HOME')} className={`${classes.menuItem} ${(location.pathname === '') ? classes.buttonActive : ''}`} />
              </IconButton>
            </Link>
            <Link to={NavigateRoutes.MY_CLASS} className={classes.menuLink} style={{ textDecoration: 'none' }}>
              <IconButton
                className={`${classes.iconsHoverHeader} ${(location.pathname === NavigateRoutes.MY_CLASS) ? classes.buttonActive : ''}`}
              >
                <UsersIcon className={classes.menuItemIcon} />
                {' '}
                <ListItemText primary={t('MY_CLASS')} className={`${classes.menuItem} ${(location.pathname === NavigateRoutes.MY_CLASS) ? classes.buttonActive : ''}`} />
              </IconButton>
            </Link>
            <Link to={NavigateRoutes.TEACHER_VIEW} className={classes.menuLink} style={{ textDecoration: 'none' }}>
              <IconButton
                className={`${classes.iconsHoverHeader} ${(location.pathname === '') ? classes.buttonActive : ''}`}
                aria-owns={anchorEl ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
              // onClick={handleClickResources}
              >
                {/* <BarChartIcon className={classes.menuItemIcon} /> */}
                <FileTextIcon className={classes.menuItemIcon} />
                {' '}
                <ListItemText primary={t('RESOURCES')} className={`${classes.menuItem} ${(location.pathname === '') ? classes.buttonActive : ''}`} />
                <KeyboardArrowDownIcon className={classes.keyDownArrow} />
              </IconButton>
              {/* <Menu
                id="demo-customized-menu"
                anchorEl={anchorElResource}
                open={openResource}
                onClose={handleCloseResource}
                onMouseLeave={handleCloseResource}
                className={classes.menuItemLink}
              >
                <MenuItem onClick={handleCloseResource}>
                  <Link to={NavigateRoutes.STUDENTS_RESOURCES} className={classes.menuLink} style={{ textDecoration: 'none' }}>
                    <ListItemText primary={t('STUDENT_RESOURCES')} className={classes.menuItem} />
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseResource}>
                  <Link to={NavigateRoutes.TEACHERS_RESOURCES} className={classes.menuLink} style={{ textDecoration: 'none' }}>
                    <ListItemText primary={t('TEACHER_RESOURCES')} className={classes.menuItem} />
                  </Link>
                </MenuItem>
              </Menu> */}
            </Link>
            <Link to={NavigateRoutes.TEACHER_VIEW} className={classes.menuLink} style={{ textDecoration: 'none' }}>
              <IconButton
                className={`${classes.iconsHoverHeader} ${(location.pathname === '') ? classes.buttonActive : ''}`}
              >
                {/* <BarChartIcon className={classes.menuItemIcon} /> */}
                <FontAwesomeIcon icon={faBook} />
                {' '}
                <ListItemText primary={t('ASSIGNMENTS')} className={`${classes.menuItem} ${(location.pathname === '') ? classes.buttonActive : ''}`} />
              </IconButton>
            </Link>
            <Link to={NavigateRoutes.TEACHER_ATTECNDANCE_VIEW} className={classes.menuLink} style={{ textDecoration: 'none' }}>
              <IconButton
                className={`${classes.userItemIcon} ${(location.pathname === NavigateRoutes.TEACHER_ATTECNDANCE_VIEW) ? classes.buttonActive : ''}`}
              >
                <UserIcon className={classes.userItemIcon} />
                {' '}
                <ListItemText primary={t('ATTENDANCE')} className={`${classes.menuItem} ${(location.pathname === '') ? classes.buttonActive : NavigateRoutes.TEACHER_ATTECNDANCE_VIEW}`} />
              </IconButton>
            </Link>
            <Link to={NavigateRoutes.TEACHER_VIEW} className={classes.menuLink} style={{ textDecoration: 'none' }}>
              <IconButton
                className={`${classes.iconsHoverHeader} ${(location.pathname === '') ? classes.buttonActive : ''}`}
              >
                <BookmarksOutlinedIcon className={classes.menuItemIcon} />
                {' '}
                <ListItemText primary={t('CLASSROOM')} className={`${classes.menuItem} ${(location.pathname === '') ? classes.buttonActive : ''}`} />
              </IconButton>
            </Link>
            <div>
              <IconButton
                className={`${classes.iconsHoverHeader} ${(location.pathname === '') ? classes.buttonActive : ''} ${(location.pathname === '') ? classes.buttonActive : ''}`}
                aria-owns={anchorEl ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClickSync}
              >
                <FileTextIcon className={classes.menuItemIcon} />
                <ListItemText primary={t('SYNC')} className={classes.menuItem} />
                <KeyboardArrowDownIcon className={classes.keyDownArrow} />
              </IconButton>
              <Menu
                id="demo-customized-menu"
                anchorEl={anchorElSync}
                open={openSync}
                onClose={handleSyncClose}
                onMouseLeave={handleSyncClose}
                className={classes.menuItemLink}
              >
                <MenuItem onClick={handleSyncClose}>
                  <Link to={NavigateRoutes.TEACHER_SYNC_VIEW} className={classes.menuLink} style={{ textDecoration: 'none' }}>
                    <ListItemText primary={t('SYNC_ONE')} className={classes.menuItem} />
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
