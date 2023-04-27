/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MenuList from '@material-ui/core/MenuList/MenuList';
import MenuChildren from './menuChildren';
import CMenu from './menuWrapper';

const useStyles = makeStyles({
  sidebarMenus: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    outline: 0,
    borderBottom: '2px solid  #80808061',
  },
});

function CMenuList() {
  const classes = useStyles();
  const menuList = [];

  const [openMenu, setOpenMenu] = useState(true);

  // set open menu
  function setOpenMenuItem(id) {
    setOpenMenu(id);
  }

  function setCloseMenu() {
    setOpenMenu(false);
  }

  const memoizedList = React.useMemo(() => {
    const filteredList = [];
    menuList.forEach((menu) => {
      if (menu.children && menu.children.length) {
        const allowedSubMenu = menu.children.filter((subMenu) => subMenu.module);
        if (allowedSubMenu && allowedSubMenu.length) {
          menu.children = allowedSubMenu;
          filteredList.push(menu);
        }
      } else { // if (permissionInstance.canRead(menu.module)) {
        filteredList.push(menu);
      }
    });
    return filteredList;
  }, [menuList]);

  return (
    <MenuList className={classes.sidebarMenus}>
      {memoizedList.map((menu, index) => (menu.children ? (
        <MenuChildren
          menu={menu}
          openMenu={openMenu}
          setOpenMenuItem={setOpenMenuItem}
          key={index}
        />
      ) : (
        <CMenu
          isSubMenu={false}
          setCloseMenu={setCloseMenu}
          menu={menu}
          key={index}
        />
      )))}
    </MenuList>
  );
}

export default CMenuList;
