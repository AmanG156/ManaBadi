const headerStyle = () => ({
  header: {
    width: 'calc(100% - 0px)',
    paddingTop: 20,
    float: 'right',
    zIndex: '999',
    display: 'flex',
    justifyContent: 'flex-end',
    boxSizing: 'border-box',
    height: 60,
    paddingRight: 15,
    position: 'fixed',
    background: '#e4f5fd',
    boxShadow: '0 0 2px rgba(0,0,0,.3)',
    '& .profileContainer': {
      cursor: 'pointer',
      marginLeft: 5,
      '& .MuiAvatar-circle': {
        '@media (max-width:767px)': {
          width: 30,
          height: 30,
        },
      },
    },
    '& .buttonContainer': {
      height: 30,
      minWidth: 22,
      background: 'none',
      display: 'flex',
      alignSelf: 'center',
      alignItems: 'center',
      marginLeft: 0,
      padding: '0 10px',
      borderRadius: 0,
      borderRight: 'rgba(163,163,175,.35) solid 1px',
      '&.themeSwitchBtn': {
        '& button': {
          '& svg': {
            transform: 'rotate(170deg)',
            '@media (max-width:767px)': {
              width: 22,
            },
          },
        },
      },
      '@media (max-width:767px)': {
        width: 30,
        height: 30,
        padding: 0,
        borderRight: 0,
      },
      '& button': {
        borderRadius: 5,
        height: 'auto',
        minWidth: 'inherit',
        minHeight: 'inherit',
        width: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        //   color: theme.palette.modalTextColor.color,
        padding: 0,
        '&:hover': {
          backgroundColor: 'transparent !important',
        },
        '& img': {
          width: 22,
        },
        '@media (max-width:767px)': {
          minWidth: 'inherit',
          '&  img': {
            width: 18,
            height: 18,
          },
          '& .MuiAvatar-circle': {
            width: 30,
            height: 30,
            '& img': {
              width: '100%',
              height: '100%',
            },
          },
        },
      },
    },
    '& .notificationBell': {
      //  color: theme.palette.modalTextColor.color,
      height: 30,
      paddingRight: 15,
      position: 'relative',
      '& svg': {
        fontSize: '30px',
        width: 26,
      },
      '&:hover': {
        cursor: 'pointer',
      },
      '@media (max-width:767px)': {
        height: 30,
        borderRight: 0,
        width: 30,
        '& svg': {
          width: 28,
        },
      },
    },
    '@media (max-width:767px)': {
      paddingRight: 0,
    },
  },
  shrinkHeaderBar: {
    width: 'calc(100% - 0px)',
    '@media (max-width:767px)': {
      paddingRight: 0,
    },
  },
  moveSideBar: {
    position: 'absolute',
    left: 0,
    // top: 0,
    marginRight: 'auto',
    // minHeight: 60,
    borderRadius: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // color: theme.palette.modalTextColor.color,
    cursor: 'pointer',
    flexDirection: 'column',
    minWidth: 60,
    '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)':
      {
        height: 60,
      },
    '& .icon-bar': {
      width: 17,
      borderRadius: 1,
      height: 1.69,
      display: 'block',
      // background:theme.palette.sidebarIconBg.color,
      '& + .icon-bar': {
        // marginTop: 2.5,
      },
    },
    '@media (max-width:767px)': {
      minWidth: 40,
      background: 'none',
    },
    '@media (min-width:768px) and (max-width:1024px)': {
      minWidth: 70,
      background: 'none',
    },
  },

  open: {
    boxShadow: 'none',
    '& ul': {
      maxHeight: 'calc(100% - 75px)',
      minHeight: 60,
      overflow: 'auto',
      height: 'calc(100% - 75px)',
    },
  },
});

export default headerStyle;
