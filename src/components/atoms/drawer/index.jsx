/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  AppBar,
  Box, Toolbar, Grid,
} from '@mui/material';

import { PersonOutline } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import style from './style';
import MenuAtom from '../../molecules/menus/menu';
import { languages } from '../../../utils/constant';
import colors from '../../../theme/colors';
import { AuthContext } from '../../../contexts/AuthProvider';
import { clearStorage } from '../../../utils/localStorageMethod';
import Loader from '../loader';
import Toaster from '../toaster';
import { handleSnackBar } from '../../../utils/methods';
import logo from '../../../assets/images/logo.png';

function DrawerAtom({ action, children }) {
  const classes = style();
  const { i18n, t } = useTranslation();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [language, setLanguage] = React.useState(i18n.language === 'en' ? 'english' : 'german');
  const {
    auth, login, loader, snackbarConfig, setSnackbarConfig,
  } = useContext(AuthContext);
  const userRole = auth && auth.role ? auth.role : '';
  const history = useHistory();
  const isMenuItemVisible = (rolesArray) => rolesArray.findIndex((role) => role.key === userRole);

  const getMenuItems = () => {
    const menus = [];
    _.each([], (menu) => {
      if (isMenuItemVisible(menu.roles) !== -1) {
        menus.push({ label: menu.label, value: menu.roles[isMenuItemVisible(menu.roles)].url });
      }
    });
    menus.push({ value: 'logout', label: i18n.t('LOGOUT') });
    return menus;
  };

  useEffect(() => {
    if (auth && auth.token && !localStorage.getItem('selectedMenu')) {
      const menus = getMenuItems() || [];
      localStorage.setItem('selectedMenu', JSON.stringify(menus[0]));
    }
  }, []);

  // eslint-disable-next-line no-unused-vars
  const getLabel = (selectedLanguage) => {
    const lang = languages.find((lng) => lng.value === selectedLanguage);
    return lang.value ? lang.label : '';
  };
  const onLanguageChange = (option) => {
    const selectedLanguageCode = option.code;
    if (selectedLanguageCode !== i18n.language) {
      setLanguage(option.value);
      i18n.changeLanguage(selectedLanguageCode);
    }
  };

  const onMenuItemClick = (role) => {
    if (role.value === 'logout') {
      login(null);
      clearStorage();
      history.push('login');
    } else {
      localStorage.setItem('selectedMenu', JSON.stringify(role));
      history.push(role.value);
    }
  };

  const selectedMenuItem = () => {
    if (localStorage.getItem('selectedMenu')) {
      return _.get(JSON.parse(localStorage.getItem('selectedMenu')), 'label', '');
    }
    return _.get(getMenuItems()[0], 'label', '');
  };

  const openMobileDrawer = () => {
    setOpenDrawer(true);
  };

  const closeMobileDrawer = () => {
    setOpenDrawer(false);
  };

  const onLogoClick = () => {
    if (auth?.token) {
      const menuItems = getMenuItems();
      onMenuItemClick(menuItems[0]);
    } else {
      window.location.href = 'https://projekt.compasan.de/';
    }
  };

  return (
    <Box className={classes.root}>
      <Loader open={loader} />
      <Toaster
        snackbarData={snackbarConfig}
        revertSnackBarData={() => {
          setSnackbarConfig(handleSnackBar('hide'));
        }}
      />
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <div className={classes.headerLogo}>
            {!action
              ? (
                <div className={classes.drawerToggle} onClick={openMobileDrawer}>
                  <MenuIcon />
                </div>
              ) : null}
            <img src={logo} alt="" style={{ cursor: 'pointer' }} onClick={onLogoClick} />
          </div>
          {!action && (
          <div className={`${classes.links} ${openDrawer ? classes.mobileDrawer : null}`}>
            <span className={classes.crossIcon} onClick={closeMobileDrawer}>
              <CloseIcon />
            </span>
            <ul>
              <li><a href="https://projekt.compasan.de/" rel="noreferrer">COMPASAN</a></li>
              <li><a href="https://projekt.compasan.de/uber-uns/" rel="noreferrer">ÜBER UNS</a></li>
              <li><a href="https://projekt.compasan.de/produkte-und-service/" rel="noreferrer">PRODUKTE UND SERVICE</a></li>
              <li><a href="https://projekt.compasan.de/shop/" rel="noreferrer">SHOP</a></li>
              <li className="loginButton">
                <a href="/">
                  <PersonOutline />
                  ANMELDEN
                </a>
              </li>
              <li><a href="/guest-patient-add-order">{t('GUEST_ORDER')}</a></li>
            </ul>
          </div>
          )}
          <div className={classes.menuDropdownGroup}>
            {action && (
              <Grid style={{ marginRight: '30px' }}>
                <MenuAtom
                  label={selectedMenuItem()}
                  options={getMenuItems()}
                  customButtonStyle={{ color: colors.grey }}
                  onItemSelection={onMenuItemClick}
                  menuDropdown
                />
              </Grid>
            )}
            <Grid>
              <MenuAtom
                label={getLabel(language)}
                options={languages}
                customButtonStyle={{ color: colors.grey }}
                onItemSelection={onLanguageChange}
                languageChange
              />
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
      <main
        className={classes.content}
      >
        <div className={classes.chidren}>
          {children}
        </div>
      </main>
      { action
        ? <div /> : null }
    </Box>
  );
}

DrawerAtom.propTypes = {
  action: PropTypes.bool,
  children: PropTypes.element,
};

DrawerAtom.defaultProps = {
  action: true,
  children: '',
};

export default DrawerAtom;
