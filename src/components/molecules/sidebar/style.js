const drawerWidth = 250;
const sidebarstyle = (theme) => ({
  drawer: {
    width: drawerWidth,
    // backgroundColor:'red',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    '& > div': {
      top: 60,
      borderRight: 0,
      height: 'calc(100vh - 60px)',
      backgroundColor: '#e4f5fd',
    },
    '& .menuList': {
      fontSize: '14px',
      whiteSpace: 'normal',
      fontWeight: 400,
      textAlign: 'left',
    },
    '& .leftAuto': {
      marginLeft: 'auto',
      position: 'absolute',
      left: 0,
      transform: 'rotate(-90deg)',
      '& svg': {
        marginRight: '0 !important',
        width: 20,
        marginLeft: '0 !important',
      },
      '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)': {
        float: 'right',
        marginTop: -10,
      },
    },
    '@media (max-width:1024px)': {
      width: '250px',
      left: 0,
      right: 0,
      position: 'fixed',
      zIndex: 999,
      top: 60,
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    },
    '&::-webkit-scrollbar': {
      width: 5,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'red',
    },
    '& li': {
      minHeight: 50,
      width: '95%',
      display: 'inline-flex',
      alignItems: 'center',
      transition: 'max-height 0.6s linear !important',
      borderTopRightRadius: 33,
      borderBottomRightRadius: 33,
      borderLeft: '3px solid transparent',
      padding: '6px 25px 6px 20px',
      '&:hover': {
        borderLeft: '3px solid #0065f7',
      },
      '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)': {
        height: '61px',
      },
    },
    '& a': {
      color: 'black' + '!important',
      textDecoration: 'none !important',
      maxHeight: '50px',
      '& svg': {
        marginRight: 10,
        marginLeft: 7,
        minWidth: 20,
        height: 20,
        fill: 'black',
        float: 'right',
      },
    },
    '& div': {
      '& ul': {
        '& li': {
          color: 'black',
          textDecoration: 'none',
          borderTop: '2px solid  #80808061',
          // borderBottom:'2px solid',
          borderRadius: 0,
          padding: '0 15px 0 20px',
          minHeight: 45,
          // marginBottom: '10px',
          '& svg': {
            marginRight: 10,
            width: 20,
            height: 20,
            fill: 'red',
            float: 'right',
          },
          '& span': {
            whiteSpace: 'normal',
          },
        },
      },
    },
  },

  drawerOpen: {
    width: drawerWidth,
    // transition: theme.transitions.create('width', {
    //   easing: theme.transitions.easing.sharp,
    //   duration: 2,
    // }),
  },
  drawerClose: {
    width: 60,
    overflow: 'inherit',
    // transition: theme.transitions.create('width', {
    //   easing: theme.transitions.easing.sharp,
    //   duration: 2,
    // }),
    '& .menuList': {
      whiteSpace: 'unset',
      left: 57,
      position: 'absolute',
    },
    '& .leftAuto': {
      marginLeft: 'auto',
      position: 'absolute',
      right: 'inherit',
      '& svg': {
        marginRight: '0 !important',
        marginLeft: '0 !important',
      },
    },
    '@media (max-width:1024px)': {
      display: 'none',
    },
    '& svg': {
      marginRight: '2px !important',
      marginLeft: '2px !important',
      minWidth: 24,
      minHeight: 24,
      maxWidth: 24,
      maxHeight: 24,
    },
    '& button': {
      padding: '0 !important',
      justifyContent: 'center !important',
      minWidth: 60,
    },
    '& li': {
      padding: '6px 0 !important',
      justifyContent: 'center !important',
      display: 'flex',
      borderRadius: 0,
      width: '100%',
      marginBottom: '0 !important',
    },
    '& > ul': {
      '& ul': {
        '& li': {
          transition: 'max-height 0.6s linear !important',
          borderTopRightRadius: 33,
          borderBottomRightRadius: 33,
          minHeight: 40,
          height: 40,
          padding: '6px 16px !important',
          justifyContent: 'flex-start !important',
          '& svg': {
            marginRight: '10px !important',
          },
        },
      },
    },
    '& div': {
      '& ul': {
        '& li': {
          '& svg': {
            minWidth: 56,
          },
        },
      },
    },
  },

});

export default sidebarstyle;
