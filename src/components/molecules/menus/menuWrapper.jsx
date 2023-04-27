/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Menu from './menu';
import icons from '../../../assets/icons';

/**
 * Custom menu, this decides what to show and what not dynamically.
 * this will render menu dyanmically bases on name matching  of menu.icon and export from index in icons folder.
 * menu should show label only when we side bar open or it is submenu.
 * @param props
 * @returns {*}
 * @constructor
 */
function CMenu(props) {
  const { menu, isSubMenu, setCloseMenu } = props;
  const { t } = useTranslation('translation');
  const dispatch = useDispatch();
  let IconComponent;
  if (menu.icon && icons[menu.icon]) {
    IconComponent = icons[menu.icon];
  }

  function toggleSidebar() {
    dispatch({ type: 'MOBILE_MENU' });
  }

  return (
    <Menu
      to={menu.path}
      isSubMenu={isSubMenu}
      setCloseMenu={setCloseMenu}
      toggleSidebar={toggleSidebar}
    >
      {IconComponent ? <IconComponent /> : ''}
      <>
        <span className="menuList">{t(menu.title)}</span>
      </>
    </Menu>
  );
}

export default CMenu;
