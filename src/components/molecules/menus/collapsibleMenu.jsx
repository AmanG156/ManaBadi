/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button/Button';
import Popper from '@material-ui/core/Popper/Popper';
import Grow from '@material-ui/core/Grow/Grow';
import Paper from '@material-ui/core/Paper/Paper';
import MenuList from '@material-ui/core/MenuList/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router';
import ClickAwayListener from '@material-ui/core/ClickAwayListener/ClickAwayListener';
import Fade from '@material-ui/core/Fade';

import useSideBarOpen from '../../../custom-hooks/useSideBarOpen';

const useStyles = makeStyles((theme) => ({
  buttonBg: {
    position: 'relative',
    zIndex: 1,
    fontSize: 16,
    borderTopRightRadius: 33,
    borderBottomRightRadius: 33,
    '&:last-child': {
      // '& div[class*="-changeDropDownPosition-"]': {
      //   top: "inherit !important",
      //   bottom: 10,
      // },
      '& button': {
        '& + div': {
          top: 'inherit !important',
          bottom: 10,
        },
      },
    },
    '&:nth-last-child(2)': {
      // '& div[class*="-changeDropDownPosition-"]':{
      //     top:'inherit !important',
      //     bottom:10
      // }
      '& button': {
        '& + div': {
          top: 'inherit !important',
          bottom: 10,
        },
      },
    },
    '& button': {
      borderLeft: '3px solid transparent',
      width: '100%',
      justifyContent: 'flex-start',
      overflow: 'hidden',
      color: theme.palette.sidebarText.color,
      zIndex: '1101',
      padding: 0,
      fontSize: 16,
      fontWeight: '400',
      height: 50,
      display: 'flex',
      alignItems: 'center',
      textTransform: 'capitalize',
      borderRadius: 0,
      backgroundColor: 'transparent !important',
      '& span': {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      },
      '&:hover': {
        backgroundColor: 'transparent !important',
      },
      '& svg': {
        marginRight: 10,
        marginLeft: 12,
        width: 20,
        height: 20,
        fill: theme.palette.sidebarText.color,
        lineHeight: '33px',
        float: 'right',
        '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)':
          {
            float: 'left',
          },
      },
    },
  },
  removeBoxShadow: {
    transition: 'max-height 0.6s linear !important',
    width: '95%',
    float: 'left',
    maxHeight: 50,
    overflow: 'hidden',
    '&.dropdownVisible': {
      overflow: 'visible',
    },
    '& div': {
      '& div': {
        boxShadow: 'none',
        background: 'none',
        transition: 'all 0.6s linear !important',
        transform: 'scale(1) !important',
        visibility: 'visible !important',
        opacity: '1 !important',
        transformOrigin: 'unset !important',
      },
    },
    '&:hover': {
      backgroundColor: theme.palette.activeMenuBarBg.color,
    },
  },
  activeMenuBar: {
    background: 'none',
    maxHeight: 1000,
    '& button': {
      height: 50,
      backgroundColor: theme.palette.activeMenuBarButton.color,
      transition: 'unset',
      '& div': {
        padding: '0 0 0 16px',
        '&:hover': {
          background: theme.palette.activeMenuBarButton.color,
        },
      },
      '& span': {
        '& span': {
          '& svg': {
            transform: 'rotate(90deg)',
          },
        },
      },
      '&:hover': {
        backgroundColor: theme.palette.activeMenuBarButton.color,
        '&:before': {
          backgroundColor: '#0065f7',
        },
        '&:after': {
          backgroundColor: theme.palette.activeMenu.color,
        },
      },
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  activeMenubarBg: {
    borderBottom: 0,
    '& button': {
      background: theme.palette.activeMenuBarButton.color,
      '& span div': {
        //    background:theme.palette.activeMenuBarButton.color,
        padding: '3px 15px',
        boxSizing: 'border-box',
        '&:hover': {
          backgroundColor: theme.palette.activeMenuBarButton.color,
        },
      },
      '&:hover': {
        backgroundColor: theme.palette.activeMenuBarButton.color,
      },
    },
  },
  openDropDown: {
    position: 'static !important',
    transform: 'translate3d(0px, 0px, 0px) !important',
    transition: 'max-height 0.6s linear !important',
    outline: 0,
    '& ul': {
      outline: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: '10px',
      '& li': {
        borderBottom: '0 !important',
        '& span': {
          fontSize: '14px !important',
        },
        '& svg': {
          width: '17px !important',
          height: '17px !important',
        },
      },
    },
  },
  changeDropDownPosition: {
    left: '107% !important',
    top: '1px !important',
    outline: 0,
    position: 'absolute !important',
    background: theme.palette.openDropdownBg.color,
    zIndex: 9,
    '@media (min-width:1100px) and (max-width:1500px)': {
      maxHeight: 160,
      overflow: 'auto',
    },
    '& ul': {
      '& a': {
        '& li': {
          '& span': {
            whiteSpace: 'unset !important',
            fontSize: '12px !important',
            fontWeight: 300,
            opacity: '1 !important',
            position: 'static !important',
            minWidth: 'inherit !important',
          },
          '& svg': {
            minWidth: '24px !important',
          },
        },
      },
    },
  },
}));

function CollapsibleMenu(props) {
  const location = useLocation();
  const isSideBarOpen = useSideBarOpen();
  const anchorRef = React.useRef(null);
  const {
    openMenu, setOpenMenuItem, title, selected,
  } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const path = location.pathname;

  // decide if we want to open the menu first time or not.
  useEffect(() => {
    setOpen(openMenu === props.name);
  }, [openMenu, props.name]);

  // set open on first load.
  useEffect(() => {
    if (path && path.indexOf(props.path) !== -1 && isSideBarOpen) {
      setOpenMenuItem(props.name);
    }
  }, []);

  function toggleMenu() {
    if (!open) {
      // close all other menus.
      setOpenMenuItem(props.name);
    }
    setOpen(!open);
  }

  function clickAwayHandler() {
    if (!isSideBarOpen && open) {
      setOpen(false);
    }
  }

  return (
    <div
      className={`${classes.buttonBg} ${classes.removeBoxShadow} ${
        isSideBarOpen ? '' : 'dropdownVisible'
      } ${open ? classes.activeMenuBar : ''} ${
        selected ? classes.activeMenubarBg : ''
      }`}
    >
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={toggleMenu}
      >
        {title}
      </Button>
      <Popper
        className={`${classes.openDropDown} ${
          isSideBarOpen ? '' : classes.changeDropDownPosition
        }`}
        open={open}
        anchorEl={anchorRef.current}
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Fade {...TransitionProps} timeout={350}>
            <ClickAwayListener onClickAway={clickAwayHandler}>
              <Grow {...TransitionProps}>
                <Paper>
                  <MenuList
                    autoFocusItem={open}
                    onClick={clickAwayHandler}
                    id="menu-list-grow"
                  >
                    {props.children}
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Fade>
        )}
      </Popper>
    </div>
  );
}

export default CollapsibleMenu;
