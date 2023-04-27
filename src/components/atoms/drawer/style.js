/* eslint-disable quotes */
import makeStyles from '@mui/styles/makeStyles';
import { colors, fonts } from '../../../theme/index';

const drawerWidth = 200;

const style = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // menuButton: {
  //   // display: 'none',
  //   '& .MuiSvgIcon-root': {
  //     fontSize: 20,
  //   },
  // },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: colors.drawerBackground,
    height: 'calc(100% - 64px)',
    top: 64,
    // display: 'none',
  },
  headerLogo: {
    display: 'flex',
    width: 81,
    alignItems: 'center',
    '& img': {
      height: 65,
      '@media (max-width: 767px)': {
        height: 38,
      },
    },
  },
  links: {
    '& ul': {
      display: 'flex',
      alignItems: 'center',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      '& li': {
        paddingRight: 66,
        '&:last-child': {
          paddingRight: 0,
        },
        '@media (min-width:768px) and (max-width: 1024px)': {
          paddingRight: 10,
        },
        '@media (min-width:1025px) and (max-width: 1179px)': {
          paddingRight: 25,
        },
        '@media (min-width:1180px) and (max-width: 1400px)': {
          paddingRight: '30px !important',
        },
        '@media (min-width:1401px) and (max-width: 1649px)': {
          paddingRight: '40px !important',
        },
        '& a': {
          textTransform: 'uppercase',
          color: '#fff',
          fontSize: 25,
          textDecoration: 'none',
          letterSpacing: 2,
          fontFamily: fonts.fontType.roboto,
          '@media (max-width: 767px)': {
            fontSize: 16,
          },
          '@media (min-width:768px) and (max-width: 1024px)': {
            fontSize: 12,
            letterSpacing: 1,
          },
          '@media (min-width:1025px) and (max-width: 1179px)': {
            fontSize: 14,
          },
          '@media (min-width:1180px) and (max-width: 1365px)': {
            fontSize: 16,
          },
          '@media (min-width:1366px) and (max-width: 1599px)': {
            fontSize: 20,
          },
          '&:hover': {
            textDecoration: 'none',
          },
        },
        '&.loginButton': {
          paddingRight: 66,
          '@media (min-width:768px) and (max-width: 1024px)': {
            paddingRight: 10,
          },
          '@media (min-width:1025px) and (max-width: 1179px)': {
            paddingRight: 25,
          },
          '& a': {
            color: '#fff',
            padding: '6px 8px',
            display: 'flex',
            fontSize: 25,
            alignItems: 'center',
            borderRadius: 4,
            background: '#009490',
            '@media (max-width: 767px)': {
              fontSize: 16,
            },
            '@media (min-width:768px) and (max-width: 1199px)': {
              fontSize: 11,
              padding: '6px 6px',
            },
            '@media (min-width:1180px) and (max-width: 1365px)': {
              fontSize: 16,
            },
            '@media (min-width:1366px) and (max-width: 1599px)': {
              fontSize: 20,
            },
            '& svg': {
              width: 28,
              height: 28,
              marginRight: 10,
              '@media (max-width: 1199px)': {
                width: 16,
                height: 16,
              },
            },
          },
        },
      },
    },
    '@media (max-width: 767px)': {
      left: 0,
      overflow: 'auto',
      bottom: 0,
      position: 'fixed',
      background: '#7cc4a3',
      transition: '0.3s all linear',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      width: '100%',
      transform: 'translate(0,100%)',
      '& ul': {
        padding: '30px 20px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: 'relative',
        '&::before': {
          content: `''`,
          position: 'absolute',
          background: '#d8ede3',
          width: 50,
          height: 3,
          top: 15,
          left: '50%',
          marginLeft: -25,
        },
        '& li': {
          paddingRight: '0 !important',
          width: '100%',
          padding: '12px 0px',
          boxSizing: 'border-box',
          borderBottom: '1px solid #d8ede32e',
          '&:last-child': {
            borderBottom: 0,
          },
        },
      },
    },
  },
  mobileDrawer: {
    '@media (max-width: 767px)': {
      transform: 'translate(0)',
    },
  },
  // appBarShift: {
  //   left: 0,
  //   top: 0,
  //   transition: theme.transitions.create(['width', 'margin'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  appBar: {
    left: 0,
    top: 0,
    padding: '22px 0',
    zIndex: theme.zIndex.drawer + 1,
    background: colors.appBar,
    boxShadow: 'none',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    '@media (max-width: 767px)': {
      padding: 0,
    },
  },
  toolbar: {
    paddingLeft: 25,
    paddingRight: 25,
    minHeight: 65,
    justifyContent: 'space-between',
    '& $menuDropdownGroup': {
      display: 'flex',
    },
    '@media (max-width: 1024px)': {
      paddingLeft: 10,
      paddingRight: 10,
    },
  },
  menuDropdownGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '@media (max-width: 767px)': {
      justifyContent: 'flex-end',
      '& > div': {
        marginRight: '0 !important',
      },
    },
  },
  content: {
    flexGrow: 1,
    marginTop: 119,
    overflowY: 'hidden',
    overflowX: 'hidden',
    position: 'relative',
    boxSizing: 'border-box',
    paddingBottom: 75,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    '@media (max-width: 767px)': {
      marginTop: 65,
      paddingBottom: 84,
    },
  },
  chidren: {
  },
  drawerToggle: {
    display: 'none',
    '@media (max-width: 767px)': {
      display: 'flex',
      marginRight: 15,
      '& svg': {
        width: 24,
        height: 24,
        fill: '#fff',
      },
    },
  },
  crossIcon: {
    display: 'none',
    '@media (max-width: 767px)': {
      display: 'flex',
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 9,
      background: '#fff',
      padding: 2,
      borderRadius: '50%',
      '& svg': {
        fill: '#009490',
        width: 16,
        height: 16,
      },
    },
  },
}));

export default style;
