/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import useScreenWidth from '../../../custom-hooks/useScreenWidth';

const useStyles = makeStyles(() => ({
  activeMenuButton: {
    // background: theme.palette.activeMenu.color,
    borderLeft: '3px solid #0065f7 !important',
    '& svg': {
      fill: '#0065f7 !important',
    },
    '& span': {
      // color: theme.palette.modalTextColor.color,
      fontWeight: 'bold',
    },
    '&:hover': {
      // background: theme.palette.activeMenu.color,
      borderLeft: '3px solid #0065f7',
      '&:before': {
        backgroundColor: '#0065f7',
      },
      '&:after': {
        // backgroundColor: theme.palette.activeMenu.color,
      },
    },
  },
}));

function Menu(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const path = location.pathname;
  const classes = useStyles();
  const screenWidth = useScreenWidth();
  const [selected, setSelected] = useState();
  const getAdvanceQuery = {}; // useSelector((state) => state.getAdvanceQuery.data);

  // set open on first load.
  useEffect(() => {
    const scrollId = location.search.split('*')[1];
    if (location.search && location.search.split('=')[1] && scrollId) {
      setSelected(location.search.split('=')[1].split('*')[0] === props.to);
    } else if (location.search && location.search.split('=')[1]) {
      // setSelected(location.search.split("=")[1] === props.to);
      if (
        path?.split('/')[2] === props?.to?.split('/')[2]
        && location.search.split('=')[0].includes('type')
      ) {
        setSelected(true);
      } else {
        setSelected(location?.search?.split('=')[1] === props?.to);
      }
    } else if (
      props.to.split('/')[2]
      && path.split('/')[2]
      && path.split('/')[2] === props.to.split('/')[2]
    ) {
      setSelected(true);
    } else {
      setSelected(path === props.to);
      if (
        getAdvanceQuery
        && getAdvanceQuery.route
        && getAdvanceQuery.route !== path
      ) {
        // dispatch({ type: "SET_ADVANCE_QUERY", data: {} });
      }
    }
  }, [path, location.search]);

  function closeMenuHandler() {
    props.setCloseMenu();
    dispatch({
      type: 'GET_ACTIVE_TABS',
      id: 0,
    });
    dispatch({ type: 'ACTIVE_SIDE_BAR', id: 0 });
    if (screenWidth && screenWidth < 1025) {
      props.toggleSidebar();
    }
  }

  function mobileMenuHandle() {
    props.toggleSidebar();
  }

  return (
    <Link
      to={props.to}
      onClick={
        !props.isSubMenu
          ? closeMenuHandler
          : screenWidth && screenWidth < 1025
            ? mobileMenuHandle
            : null
      }
    >
      <MenuItem className={selected ? classes.activeMenuButton : ''}>
        {props.children}
      </MenuItem>
    </Link>
  );
}
export default Menu;
