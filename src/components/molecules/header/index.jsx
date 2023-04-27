import React from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import clsx from 'clsx';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';
import useSideBarOpen from '../../../custom-hooks/useSideBarOpen';
import useUserLanguage from '../../../custom-hooks/useUserLanguage';

function Header() {
  const isSideBarOpen = useSideBarOpen();
  const { setUserLanguage } = useUserLanguage();

  const dispatch = useDispatch();
  const classes = useStyles(styles)();

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  const languageChange = () => {
    setUserLanguage('ar');
  };

  return (
    <div
      className={clsx(
        classes.header,
        isSideBarOpen ? '' : classes.shrinkHeaderBar,
      )}
    >
      <Typography className={`${classes.moveSideBar}`} onClick={toggleSidebar}>
        <MenuSharpIcon />
      </Typography>
      <div className="notificationBell">
        <NotificationsIcon onClick={languageChange} />
      </div>
      <div className="profileContainer">
        <AccountCircleIcon />
      </div>
    </div>
  );
}

export default React.memo(Header);
