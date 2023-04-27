import React, { useState } from 'react';
import {
  useNavigate,
  Outlet,
} from 'react-router-dom';
import {
  Box,
  ListItemText, Menu, MenuItem,
  IconButton, Grid,
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
import useStyles from '../../../custom-hooks/useStyles';
import logo from '../../../assets/images/logo.png';
import Header from '../header';
import LogoutIcon from '../../../assets/svg/logoutIcon';
import { toolTipTheme } from '../../../utils/commonUiComponent';
import { logout } from '../../../utils/localStorageMethod';
import { DialogAtom } from '../../../components/atoms';
import { NavigateRoutes } from '../../../constant';
import PSTUFAQs from '../../admin-user/PSTU-FAQs';

export default function CoordinatorDashboard() {
  const classes = useStyles(style)();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [logoutAnchorEl, setLogoutAnchorEl] = useState(null);
  const logoutOpen = Boolean(logoutAnchorEl);
  const handleLogoutClick = (event) => {
    setLogoutAnchorEl(event.currentTarget);
  };
  const handleLogoutClose = () => {
    setLogoutAnchorEl(null);
  };

  const changeView = (tab) => {
    setSelectedTab(tab);
  };

  const navigate = useNavigate();
  const { t } = useTranslation('translation');
  // const getSelectedTab = () => {
  //   if (selectedTab === 1) {
  //     return <Students />;
  //   } if (selectedTab === 2) {
  //     return <Classes />;
  //   } if (selectedTab === 3) {
  //     return <Announcements />;
  //   } if (selectedTab === 4) {
  //     return <Sync />;
  //   }
  //   return true;
  // };
  const [helpAnchorEl, sethelpAnchorEl] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleHelpClick = (event) => {
    sethelpAnchorEl(event.currentTarget);
  };
  const helpOpen = Boolean(helpAnchorEl);
  const handleHelpClose = () => {
    sethelpAnchorEl(null);
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
                        fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
                        '@media (min-width: 1200px)': {
                          padding: '1vw',
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
                  <MenuItem onClick={() => navigate(NavigateRoutes.LOCATION_COORDINATOR_HELP_SITE)}>{t('HELP-SITE')}</MenuItem>
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
                        fontSize: '0.9vw',
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
        <>
          <Box className={classes.header} mt={2}>
            <Header {...{ selectedTab, setSelectedTab, changeView }} />
          </Box>
          <Box>
            <Outlet />
          </Box>
        </>

      </Grid>
    </Stack>
  );
}
