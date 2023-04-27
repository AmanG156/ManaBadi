// styles
import { colors } from '../../../theme';

const studentdashboardstyle = (() => ({
  main: {
    overflowY: 'auto',
    border: 'none !important',
    borderRadius: '1vw',
    boxShadow: 'none',
  },
  mainStudentCard: {
    overflowY: 'auto',
    boxShadow: 'none',
    borderRadius: '1vw',
  },
  mainReportCard: {
    overflowY: 'auto',
    boxShadow: 'none !important',
    borderRadius: '1vw',
    '& .MuiPaper-root': {
      boxShadow: 'none',
    },
  },
  addBorderAround: {
    border: '0.1vw solid #C8C7C7',
    borderRadius: '1vw',
    marginBottom: '2vw',
  },
  verticalLine: {
    height: '27.5vw',
    marginTop: '1vw',
    marginRight: -1,
    position: 'relative',
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
  },
  listItem: {
    height: '7vw',
  },
  divWrapper: {
    marginTop: '6vw !important',
  },
  userText: {
    fontWeight: 'bold',
    margin: '1vw',
  },
  headerLogo: {
    height: 'auto',
    width: '20vw',
    padding: '0vw 0vw 0vw 0vw',
    cursor: 'pointer',
  },
  logo: {
    // margin: '7px -7px 0',
    '& img': {
      maxWidth: '220px',
      minWidth: '220px',
    },
  },
  profileWrapper: {
    zIndex: '9999 !important',
  },
  modeIcon: {
    // transform: 'rotate(-10deg)',
  },
  profileIcon: {
    width: '3vw !important',
    height: '3vw !important',
  },
  iconsHoverHeader: {
    borderRadius: '0.4vw !important',
    textAlign: 'right !important',
    position: 'relative',
    padding: '0vw',
    '& svg': {
      width: '1.5vw',
      height: '1.5vw',
      color: colors.black,
      marginRight: '0.8vw',
    },
    '&:hover': {
      backgroundColor: 'white !important',
      minHeight: '3px !important',
    },
    '& .MuiListItemText-primary': {
      fontWeight: 'bold',
      fontSize: '1vw',
    },
    '& .MuiListItemText-secondary': {
      fontWeight: 'bold',
      textAlign: 'left',
      fontSize: '1vw',
    },
  },
  menuBar: {
    '& .MuiDrawer-paper': {
      background: 'linear-gradient(to right, #104F96, #015EEA)',
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
export default studentdashboardstyle;
