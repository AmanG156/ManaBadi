// styles
import { colors } from '../../theme';

const headerStyle = (() => ({
  HeaderWrapper: {
    boxShadow: 'none',
    left: '0',
    top: '0',
    padding: '0 1vw',
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
    margin: '1vw',
    textAlign: 'left',
  },
  headerLogo: {
    height: 'auto',
    width: '20vw',
    padding: '0vw 0vw 0vw 0vw',
    cursor: 'pointer',
  },
  logo: {
    '& img': {
      maxWidth: '220px',
      minWidth: '220px',
    },
  },
  modeIcon: {
  },
  profileIcon: {
    width: '3vw !important',
    height: '3vw !important',
    marginRight: '-0.7vw',
    borderRadius: '50%',
  },
  logOut: {
    display: 'inline-flex !important',
    fontSize: '1vw !important',
    '& .MuiMenu-list': {
      paddingTop: '0px !important',
      paddingBottom: '0px !important',
    },
  },
  iconsHeader: {
    paddingRight: '1vw',
  },
  iconsHoverHeader: {
    borderRadius: '0.4vw !important',
    position: 'relative',
    marginRight: '1vw',
    color: colors.black,
    '& svg': {
      width: '1.5vw',
      height: '1.5vw',
      color: colors.black,
      // marginLeft: '-0.5vw',
    },
    '&:hover': {
      backgroundColor: 'white !important',
      minHeight: '3px !important',
    },
    '& .MuiListItemText-primary': {
      fontWeight: 'bold',
      fontSize: '1.286vw',
    },
    '& .MuiListItemText-secondary': {
      fontWeight: 'bold',
      textAlign: 'left',
      fontSize: '0.857vw',
    },
  },
  keyboardDownIcon: {
    '& svg': {
      width: '1.5vw',
      height: '1.5vw',
      color: colors.black,
      marginLeft: '-1vw',
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
}));
export default headerStyle;
