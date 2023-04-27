// styles
import { colors, fonts } from '../../theme';

const headerStyle = (() => ({
  studentDashboard: {
    background: colors.white,
    minHeight: '50vw',
    '& header': {
      boxShadow: 'none',
      borderBottom: `0.1vw solid ${colors.borderBottomNewColor}`,
      '@media (max-width: 1200px)': {
        backgroundColor: '#ffffff',
        height: '80px',
        overflow: 'hidden',
      },
    },
    '@media (max-width: 500px)': {
      '& form':
      {
        display: 'block',
        width: '100%',
        maxWidth: '95%',
      },
    },
  },
  HeaderWrapper: {
    boxShadow: 'none',
    left: '0',
    top: '0',
    padding: '0 1vw',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: colors.white,
    fontFamily: fonts.fontType.roboto,
  },
  listItem: {
    '@media (min-width: 1200px)': {
      height: '6vw',
      padding: '0',
    },
    paddingTop: '0.3vw',
    color: colors.white,
    flexDirection: 'column',
    borderBottom: `0.1vw solid ${colors.white}`,
    '& span': {
      fontSize: '1.1vw',
    },
    '& svg': {
      color: 'white !important',
    },
    '&:hover': {
      backgroundColor: 'white !important',
      color: colors.primary,
      '& svg': {
        color: `${colors.primary}  !important`,
      },
    },
  },
  listItemText: {
    '@media (max-width: 899px)': {
      display: 'none',
    },
    '@media (min-width: 1200px)': {
      fontSize: '1vw !important',
      '& .MuiTypography-root': {
        fontSize: '1vw !important',
      },
    },
  },
  listMenuBarItem: {
    '@media (min-width: 1200px)': {
      height: '5vw',
      borderBottom: `0.1vw solid ${colors.white}`,
    },
    borderBottom: `2px solid ${colors.white}`,
    color: colors.white,
    flexDirection: 'column',
    '& span': {
      '@media (min-width: 1200px)': {
        fontSize: '1.1vw',
      },
    },
    '& svg': {
      color: 'white !important',
      '@media (max-width: 1200px)': {
        height: '30px !important',
      },
    },
    '@media (max-width: 1199px)': {
      padding: '0',
    },
  },
  listMeterItem: {
    '@media (min-width: 1200px)': {
      height: '6vw',
    },
    color: colors.white,
    flexDirection: 'column',
    borderBottom: `0.1vw solid ${colors.white}`,
    '& svg': {
      color: 'white !important',
    },
    '&:hover': {
      backgroundColor: 'white !important',
      color: colors.primary,
      '& svg': {
        color: `${colors.primary}  !important`,
        fill: `${colors.primary}  !important`,
      },
    },
  },
  headingName: {
    fontWeight: fonts.fontWeight.semi,
    color: colors.black,
    textAlign: 'center',
    fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    '@media (min-width: 1200px)': {
      fontSize: '1.5vw',
    },
    '@media (max-width: 1200px)': {
      marginLeft: '3vw',
    },
  },
  divWrapper: {
    marginTop: '8vw !important',
    marginBottom: '1.9vw !important',
    padding: '0vw !important',
  },
  userText: {
    fontWeight: 'bold',
    margin: '1vw',
  },
  headerLogo: {
    cursor: 'pointer',
    '@media (max-width: 1199px)': {
      width: '100%',
      maxWidth: '275px',
    },
    '@media (max-width: 499px)': {
      width: '100%',
      maxWidth: '250px',
    },
    '@media (min-width: 1200px)': {
      width: '20vw',
    },
  },
  profileWrapper: {
    zIndex: '9999 !important',
  },
  logoutIcon: {
    cursor: 'pointer',
    padding: '0px !important',
    textAlign: 'right',
    '& p': {
      display: 'inline-flex',
      alignItems: 'center',
      color: colors.actionIconsColor,
      fontWeight: '500',
      fontSize: '1.1vw',
      '@media (max-width: 1199px)': {
        fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
      },
    },
    '& svg': {
      '@media (min-width: 1200px)': {
        width: '1.7vw',
        height: '1.2vw',
      },
      '@media (max-width: 1199px)': {
        width: '15px',
        height: '15px',
      },
    },
  },
  profileIcon: {
    fontSize: 84,
  },
  buttonActive: {
    backgroundColor: colors.white,
    color: `${colors.primary}  !important`,
    '& svg': {
      color: `${colors.primary}  !important`,
    },
  },
  buttonMeterActive: {
    backgroundColor: colors.white,
    color: `${colors.primary}  !important`,
    '& span': {
      fontSize: '1.1vw',
    },
    '& svg': {
      color: `${colors.primary}  !important`,
      fill: `${colors.primary}  !important`,
    },
    '@media (max-width: 499px)': {
      padding: '0',
    },
  },
  actionBtn: {
    '@media (max-width: 767px)': {
      paddingLeft: '0',
      paddingRight: '0',
      minWidth: '85px',
      marginRight: '20px',
    },
    '@media (max-width: 500px)': {
      paddingLeft: '0',
      paddingRight: '0',
      minWidth: '72px',
    },
    '@media (max-width: 400px)': {
      minWidth: '67px',
    },
    '@media (min-width: 768px)': {
      minWidth: '150px',
    },
    marginRight: '10px',
    '@media (max-width: 1200px)': {
      borderRadius: '8px',
    },
    '@media (min-width: 1200px)': {
      minWidth: '13.021vw !important',
      fontSize: '0.9vw',
    },
  },
  donateActionBtn: {
    '@media (max-width: 500px)': {
      paddingLeft: '0',
      paddingRight: '0',
    },
    '@media (min-width: 768px)': {
      minWidth: '150px',
    },
    '@media (min-width: 1200px)': {
      minWidth: '13.021vw !important',
      fontSize: '0.9vw',
    },
    background: `${colors.donateColor} !important`,
  },
  menuIconBar: {
    marginLeft: '1.5vw !important',
    '& svg': {
      '@media (min-width: 1200px)': {
        width: '3vw !important',
        height: '3vw !important',
      },
    },
  },
  sideMenuIcon: {
    marginTop: '0.5vw',
    justifyContent: 'center',
    '& svg': {
      '@media (min-width: 1200px)': {
        width: '2.5vw !important',
        height: '2.5vw !important',
      },
      width: '25px',
      height: '25px !important',
    },
  },
  donateDialogAtom: {
    '& .MuiDialog-paper': {
      '@media (min-width: 1200px)': {
        maxWidth: '50vw !important',
        minWidth: '35vw !important',
      },
      overflowX: 'hidden !important',
    },
    '& .MuiDialogContent-root .MuiGrid-root': {
      '@media (min-width: 1200px)': {
        maxWidth: '50vw !important',
      },
    },
    '& .MuiBox-root': {
      padding: '0 !important',
    },
    '& #donationNotes': {
      minHeight: '150px !important',
      '@media (min-width: 1200px)': {
        height: '5vw !important',
        fontSize: '1vw',
      },
      width: '100%',
      padding: '0.5vw',
    },
    '& #donationFor, #donationCause, #donationAmount': {
      '@media (min-width: 1200px)': {
        fontSize: '1vw',
      },
    },
  },
  appBar: {
    '&.MuiPaper-root-MuiAppBar-root': {
      backgroundColor: 'white !important',
      boxShadow: 'none !important',
      borderBottom: '1px solid #C4C4C4',
    },
  },
  menuBar: {
    width: '8vw !important',
    '& .MuiDrawer-paper': {
      background: 'linear-gradient(to right, #104F96, #015EEA)',
      width: '8vw !important',
      marginTop: '6.4vw !important',
      '@media (max-width: 1199px)': {
        marginTop: '0 !important',
        top: '80px',
      },
      '& ul': {
        '@media (max-width: 499px)': {
          padding: '0',
        },
      },
    },
  },
  header: {
    background: colors.newBGColor,
    padding: '1vw',
    '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
      color: 'white',
    },
    marginTop: 0,
  },
  switchOptions: {
    position: 'absolute',
    opacity: '0',
    width: '100%',
    height: '100%',
    '& label': {
      height: '100%',
      width: '100%',
      margin: 0,
    },
  },
  accountIcon: {
    borderRadius: '50%',
    '@media (max-width: 1200px)': {
      maxWidth: '40px',
      width: '100%',
      margin: '0 auto',
    },
    '@media (max-width: 500px)': {
      maxWidth: '25px',
    },
    '@media (min-width: 1200px)': {
      width: '4.2vw',
      height: '4.2vw',
      margin: '0.5vw',
    },
  },
  inOneRow: {
    whiteSpace: 'nowrap',
    '@media (max-width: 1199px)': {
      fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    },
    // paddingTop: '0.5vw',
    color: colors.userProfleName,
    '@media (min-width: 1200px)': {
      fontSize: '1.2vw',
    },
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  roleName: {
    // color="text.primary"
    color: colors.rolename,
    '@media (max-width: 1199px)': {
      fontSize: 'calc(10px + 6 * ((100vw - 320px) / 1199))',
    },
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
    textAlign: 'right',
  },
  addSpaceAround: {
    padding: '2vw',
    '@media (max-width: 899px)': {
      marginTop: '35px',
    },
    '@media (max-width: 500px)': {
      marginTop: '8vh',
      marginLeft: '0',
    },
  },
  drawerArrow: {
    '@media (min-width: 1200px)': {
      height: '3vw',
      width: '2vw',
    },
    position: 'fixed',
    background: colors.newBGColor,
    borderRadius: '0 4vw 4vw 0',
    color: colors.white,
    padding: '1vw 1vw 1vw 0.7vw',
    marginTop: '1vw',
    '& svg': {
      '@media (min-width: 1200px)': {
        width: '2vw',
        height: '2vw',
      },
    },
  },
  openDrawerArrow: {
    margin: '7.5vw 0 0',
    '@media (max-width: 1200px)': {
      margin: '0',
      top: '12.2%',
      zIndex: '2',
    },
  },
  closeDrawerArrow: {
    left: '8vw',
  },
  headerViewingDiv: {
    position: 'relative',
    '& div': {
      display: 'flex',
      justifyContent: 'end',
      alignItems: 'center',
      backgroundColor: 'rgb(0, 0, 0, .5)',
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      height: '75px',
      '& p': {
        padding: '0 8px',
        '& span': {
          padding: '0 8px',
          color: '#5c94e9',
          textDecoration: 'unset',
        },
      },
      '& button': {
        backgroundColor: '#ff3333',
        color: '#fff',
        fontSize: '14px',
        margin: '0 30px',
        height: '2.7vw',
        padding: '0.8vw',
        minWidth: '8.5vw',
        fontFamily: 'inherit',
        borderRadius: '5px !important',
        '& svg': {
          padding: '0 5px',
          height: '19px',
        },
        '&:hover': {
          backgroundColor: '#ff3333',
        },
      },
    },
  },
}));
export default headerStyle;
