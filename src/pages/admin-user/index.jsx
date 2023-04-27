import React, { useState } from 'react';
import {
  useNavigate,
  Outlet,
} from 'react-router-dom';
import {
  Box,
  ListItemText,
  IconButton, Grid,
  Menu, MenuItem,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Tooltip from '@mui/material/Tooltip';
import { ThemeProvider } from '@mui/material/styles';
import style from './style';
import LogoutIcon from '../../assets/svg/logoutIcon';
import useStyles from '../../custom-hooks/useStyles';
import logo from '../../assets/images/logo.png';
import { NavigateRoutes } from '../../constant';
import RegisterHeader from './header';
import { toolTipTheme } from '../../utils/commonUiComponent';
import { DialogAtom } from '../../components/atoms';
import PSTUFAQs from './PSTU-FAQs';
import { logout, getLocalStorage } from '../../utils/localStorageMethod';

import userRoles from '../../constant/userRoles';

export default function AdminDashboard() {
  const classes = useStyles(style)();
  const navigate = useNavigate();
  const { t } = useTranslation('translation');
  const [anchorEl, setAnchorEl] = useState(null);
  const [helpAnchorEl, sethelpAnchorEl] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [logoutAnchorEl, setLogoutAnchorEl] = useState(null);
  const logoutOpen = Boolean(logoutAnchorEl);
  const userRole = getLocalStorage('userRole');
  React.useEffect(() => {
    localStorage.removeItem('impersonateToken');
  }, []);
  const handleLogoutClick = (event) => {
    setLogoutAnchorEl(event.currentTarget);
  };
  const handleLogoutClose = () => {
    setLogoutAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const helpOpen = Boolean(helpAnchorEl);
  const handleHelpClick = (event) => {
    sethelpAnchorEl(event.currentTarget);
  };
  const handleHelpClose = () => {
    sethelpAnchorEl(null);
  };

  const handleClick = (event) => {
    if (userRole === userRoles.SUPER_ADMIN) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Grid className={classes.divWrapper}>
        <Grid className={classes.HeaderWrapper}>
          <Box>
            <img
              src={logo}
              width={380}
              alt="ManaBadi SiliconAndhra Logo"
              className={classes.headerLogo}
              onClick={() => navigate('/')}
            />
          </Box>
          <Stack direction="row" spacing={1} className={classes.iconsHeader} justifyContent="space-between !important">
            <ThemeProvider theme={toolTipTheme}>
              <Box>
                <Tooltip title={t('HELP')}>
                  <IconButton
                    className={classes.iconsHoverHeader}
                    onClick={handleHelpClick}
                    aria-controls={helpOpen ? 'help-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={helpOpen ? 'true' : undefined}
                  >

                    <HelpOutlineIcon className={classes.modeIcon} />

                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={helpAnchorEl}
                  id="help-menu"
                  open={helpOpen}
                  onClose={handleHelpClose}
                  onClick={handleHelpClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 1px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiMenuItem-root': {
                        borderBottom: '0.1vw solid #d0d0d0',
                        padding: '1vw',
                        fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
                        '@media (min-width: 1200px)': {
                          fontSize: '0.9vw',
                        },
                        borderRadius: '0vw',
                        display: 'list-item',
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={() => setIsDialogOpen(true)}>{t('PSTU FAQs')}</MenuItem>
                  <MenuItem onClick={() => navigate(NavigateRoutes.HELP_SITE)}>{t('HELP-SITE')}</MenuItem>
                </Menu>
                <DialogAtom
                  isOpen={isDialogOpen}
                  dialogHeading={t('PSTU FAQs')}
                  secHandle={() => setIsDialogOpen(false)}
                  content={<PSTUFAQs />}
                />
                <Tooltip title={t('SETTINGS')}>
                  <IconButton
                    className={classes.iconsHoverHeader}
                    onClick={handleClick}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <SettingsOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('NOTIFICATIONS')}>
                  <IconButton
                    className={classes.iconsHoverHeader}
                  >
                    <NotificationsNoneIcon className={classes.modeIcon} />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 1px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiMenuItem-root': {
                        borderBottom: '0.1vw solid #d0d0d0',
                        padding: '1vw',
                        fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
                        '@media (min-width: 1200px)': {
                          fontSize: '0.9vw',
                        },
                        borderRadius: '0vw',
                        display: 'list-item',
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={() => navigate(NavigateRoutes.REGISTRATION_DATES)}>{t('REGISTRATION_DATES')}</MenuItem>
                  <MenuItem onClick={() => navigate(NavigateRoutes.GRADING)}>{t('GRADING')}</MenuItem>
                </Menu>
                <Menu
                  anchorEl={logoutAnchorEl}
                  id="account-menu"
                  open={logoutOpen}
                  className={classes.logOut}
                  onClose={handleLogoutClose}
                  onClick={handleLogoutClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 1px rgba(0,0,0,0.32))',
                      '& .MuiMenuItem-root': {
                        fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
                        '@media (min-width: 1200px)': {
                          fontSize: '0.9vw',
                        },
                        display: 'list-item',
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={logout} className={classes.logOut}>
                    <LogoutIcon />
                    {t('LOGOUT')}
                  </MenuItem>
                </Menu>
                <IconButton
                  className={`${classes.iconsHoverHeader} ${classes.keyboardDownIcon}`}
                  onClick={handleLogoutClick}
                  aria-controls={logoutOpen ? 'help-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={logoutOpen ? 'true' : undefined}
                >
                  {localStorage.getItem('profilePhoto') ? (<img src={localStorage.getItem('profilePhoto')} alt="profilePic" className={classes.profileIcon} />)
                    : <AccountCircleIcon className={classes.profileIcon} />}
                  <ListItemText primary={localStorage.getItem('username')} secondary={localStorage.getItem('userRole')} className={classes.userText} />
                  <KeyboardArrowDownIcon />
                </IconButton>
              </Box>
            </ThemeProvider>
          </Stack>
        </Grid>
        <Box className={classes.header} mt={2}>
          <RegisterHeader />
        </Box>
        <Box>
          <Outlet />
        </Box>

      </Grid>
    </Stack>
  );
}
