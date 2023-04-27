// styles
import { colors } from '../../theme';

const headerStyle = (() => ({
  HeaderWrapper: {
    boxShadow: 'none',
    left: '0',
    top: '0',
    '@media (min-width: 1200px)': {
      padding: '0 1vw',
    },
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divWrapper: {
    background: 'white',
    width: '100% !important',
  },
  userText: {
    fontWeight: 'bold',
    textAlign: 'right',
    '@media (min-width: 1200px)': {
      margin: '1vw',
      textAlign: 'left',
    },
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
  modeIcon: {
    // transform: 'rotate(-10deg)',
  },
  profileIcon: {
    '@media (min-width: 1200px)': {
      width: '3vw !important',
      height: '3vw !important',
      marginRight: '-0.7vw',
    },
    '@media (max-width: 1199px)': {
      paddingRight: '5px',
      width: '100%',
      maxWidth: '40px',
    },
    '@media (max-width: 499px)': { maxWidth: '30px' },
    borderRadius: '50%',
  },
  logOut: {
    display: 'inline-flex !important',
    '@media (min-width: 1200px)': {
      fontSize: '1vw !important',
    },
    '& .MuiMenu-list': {
      paddingTop: '0px !important',
      paddingBottom: '0px !important',
    },
  },
  iconsHeader: {
    paddingRight: '1vw',
    '@media (max-width: 724px)': {
      '& div': {
        textAlign: 'right',
      },
    },
  },
  iconsHoverHeader: {
    borderRadius: '0.4vw !important',
    position: 'relative',
    marginRight: '1vw',
    color: colors.black,
    '@media (max-width: 724px)': {
      padding: '0',
    },
    '& svg': {
      '@media (min-width: 1200px)': {
        width: '1.5vw',
        height: '1.5vw',
      },
      '@media (max-width: 724px)': {
        width: '15px',
        height: '15px',
      },
      color: colors.black,
      // marginLeft: '-0.5vw',
    },
    '&:hover': {
      backgroundColor: 'white !important',
      minHeight: '3px !important',
    },
    '& .MuiListItemText-primary': {
      fontWeight: 'bold',
      fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
      '@media (min-width: 1200px)': {
        fontSize: '1.286vw',
      },
    },
    '& .MuiListItemText-secondary': {
      fontWeight: 'bold',
      fontSize: 'calc(10px + 6 * ((100vw - 320px) / 1199))',
      '@media (min-width: 1200px)': {
        textAlign: 'left',
        fontSize: '0.857vw',
      },
    },
  },
  keyboardDownIcon: {
    '& svg': {
      '@media (min-width: 1200px)': {
        width: '1.5vw',
        height: '1.5vw',
        marginLeft: '-1vw',
      },
      color: colors.black,
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
}));
export default headerStyle;
