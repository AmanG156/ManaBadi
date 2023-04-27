import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import CollapsibleMenu from './collapsibleMenu';
import icons from '../../../assets/svg';
import MenuWrapper from './menuWrapper';

const useStyles = makeStyles((theme) => ({
  activeDropdown: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: 'none',
    height: '100%',
    padding: '6px 6px 6px 16px',
    borderLeft: '0 !important',
    '&:hover': {
      backgroundColor: 'transparent !important',
      borderLeft: 0,
    },
    '& svg': {
      fill: `${theme.palette.sidebarText.color}!important`,
    },
    '& span': {
      color: theme.palette.sidebarText.color,
      fontWeight: 'normal',
    },
    '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)':
      {
        display: 'inline-block',
        '& span': {
          paddingTop: 8,
          float: 'left',
        },
      },
  },
  activeMenuButton: {
    background: theme.palette.activeMenu.color,
    borderLeft: '3px solid #0065f7 !important',
    '& svg': {
      fill: '#0065f7 !important',
    },
    '& span': {
      color: theme.palette.modalTextColor.color,
      fontWeight: 'bold',
    },
    '&:hover': {
      background: theme.palette.activeMenu.color,
      borderLeft: '3px solid #0065f7',
      '&:before': {
        backgroundColor: '#0065f7',
      },
      '&:after': {
        backgroundColor: theme.palette.activeMenu.color,
      },
    },
  },
}));

function MenuChildren(props) {
  const classes = useStyles();
  const location = useLocation();
  const path = location.pathname;
  const { t } = useTranslation('translation');
  const {
    openMenu, setOpenMenuItem, menu, isSubMenu,
  } = props;
  const [selected, setSelected] = useState();
  const { ArrowDropDownIcon } = icons;
  let IconComponent;
  if (menu.icon && icons[menu.icon]) {
    IconComponent = icons[menu.icon];
  }
  // set open on first load.
  useEffect(() => {
    if (path === '/') {
      setOpenMenuItem(false);
      return;
    }
    if (path.split('/')[1] === '/review') {
      setSelected('REVIEW');
      return;
    }
    if (path.split('/')[1] === 'add-comment') {
      setOpenMenuItem('REVIEW_REPORTS');
      return;
    }
    if (path.split('/')[1] === menu.path.split('/')[1]) {
      setOpenMenuItem(menu.title);
      return;
    }
    setSelected(path.split('/')[1] === menu.path.split('/')[1]);
  }, [path]);

  return (
    <CollapsibleMenu
      openMenu={openMenu}
      isSubMenu={isSubMenu}
      name={menu.title}
      path={menu.path}
      selected={selected}
      setOpenMenuItem={setOpenMenuItem}
      title={(
        <div className={`${classes.activeDropdown}`}>
          {IconComponent ? <IconComponent /> : ''}
          <span className="menuList">{t(menu.title)}</span>
          <span className="leftAuto">
            <ArrowDropDownIcon />
          </span>
        </div>
      )}
    >
      {menu.children.map((subMenu, index) => <MenuWrapper menu={subMenu} isSubMenu key={index} />)}
    </CollapsibleMenu>
  );
}

export default MenuChildren;
