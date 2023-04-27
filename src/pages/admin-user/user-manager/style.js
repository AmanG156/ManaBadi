import { colors, fonts } from '../../../theme';

const UserManagerStyle = (theme) => ({
  userDialogAtom: {
    '& .MuiDialog-paper': {
      '@media (min-width: 1200px)': {
        minWidth: '55vw !important',
        maxWidth: '65vw !important',
      },
      overflowX: 'hidden !important',
    },
    '& .MuiDialogContent-root .MuiGrid-root': {
      '@media (min-width: 1200px)': {
        maxWidth: '65vw !important',
      },
    },
    '& .MuiBox-root': {
      padding: '0vw !important',
    },
    '& #datePickerDiv': {
      width: '19.1vw !important',
    },
    '& #academicSchool': {
      width: '95%',
    },
  },
  titleRow: {
    justifyContent: 'space-between',
  },
  passwordDialogAtom: {
    '& .MuiButton-root.MuiButton-textPrimary': {
      minWidth: '11vw !important',
      marginLeft: '1vw !important',
    },
  },
  filterSection: {
    position: 'relative',
    '& .MuiDrawer-docked .MuiDrawer-paper': {
      position: 'static',
    },
  },
  filterButton: {
    float: 'left',
    width: '100%',
    marginBottom: '2vw',
    '& .MuiFormControl-root.MuiFormControl-fullWidth': {
      // width: 'calc(100% - 125px)',
      // paddingLeft: '5px',
    },
    '& button.MuiButton-filterPrimary': {
      background: '#ededed',
      border: 'solid 0.1px #104F96',
      padding: '0 12px 0 0',
      '@media (min-width: 1200px)': {
        fontSize: '0.8vw',
      },
      [theme.breakpoints.down('md')]: {
        fontSize: 0,
      },
    },
    '& svg': {
      width: '1vw',
      height: '1vw',
      paddingTop: 0,
      margin: '0 5px',
      [theme.breakpoints.down('md')]: {
        width: 20,
        height: 24,
        margin: 0,
        padding: 4,
      },
    },
    '& .DownLeft': {
      background: ' #ffffff',
      float: 'left',
      padding: '5px',
      borderRight: 'solid 2px #ccc',
      marginRight: '6px',
    },
  },

  ChipSection: {
    '& .MuiFormControl-fullWidth': {
      height: '2.6vw',
    },
    '& .MuiOutlinedInput-root': {
      padding: '0 !important',
      '& .MuiButtonBase-root': {
        height: '2vw',
      },
    },
    '& .MuiInputLabel-root': {
      lineHeight: '0.9rem',
    },
    '@media (min-width: 520px)': {
      width: '100%',
    },
  },
  gridContainer: {
    padding: '2vw 2vw 2vw 3vw !important',
    minHeight: '65vh',
  },
  paddingRemove: {
    padding: '0 !important',
  },
  dialogButtons: {
    paddingRight: '1vw !important',
    textAlign: 'center',
  },
  emailIcon: {
    marginTop: '0.5vw',
  },
  bulkEmail: {
    textAlign: 'right',
    '& svg': {
      width: '1.5vw',
      height: '1.5vw',
      color: colors.black,
      [theme.breakpoints.down('md')]: {
        width: 16,
        height: 16,
      },
    },
  },
  iconsPanel: {
    marginTop: '2vw',
    '@media (max-width: 1200px)': {
      marginBottom: '10px',
    },
  },
  headerTitle: {
    fontWeight: fonts.fontWeight.bold,
    fontSize: '1.5vw',
    padding: '10px 10px 10px 1px',
    [theme.breakpoints.down('md')]: {
      fontSize: 16,
    },
  },
  userContainer: {
    color: colors.black,
    width: 'auto',
    fontFamily: fonts.fontType.roboto,
  },
  rightIcons: {
    textAlign: 'right',
    borderRadius: '0.4vw !important',
    position: 'relative',
    padding: '0.5vw',
    marginLeft: 'auto',
    '& svg': {
      width: '1.5vw',
      height: '1.5vw',
      color: colors.black,
      [theme.breakpoints.down('md')]: {
        width: 16,
        height: 16,
      },
    },
    '&:hover': {
      backgroundColor: 'white !important',
      minHeight: '3px !important',
    },
    '& .MuiButton-root': {
      '@media (min-width: 1200px)': {
        width: '9vw',
        padding: '0.5vw 1vw',
        fontSize: '0.9vw',
      },
    },
  },
  recoveryContent: {
    paddingBottom: '2vw',
    textAlign: 'center',
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
  },
  userListView: {
    textAlign: 'center',
    paddingBottom: 20,
  },
  dialogHeader: {
    '@media (min-width: 1200px)': {
      fontSize: '1.32vw',
    },
    margin: '0 0 0.9vw 0',
    fontWeight: 500,
  },
  dialogContent: {
    marginBottom: '1vw',
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
  },
  activeButton: {
    color: '#f3f8fe !important',
    '@media (min-width: 1200px)': {
      height: '2.5vw',
      fontSize: '1vw',
      padding: '0.8vw',
      borderRadius: '0.4vw !important',
    },
    fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    boxShadow: '0 4px 4px -2px hsl(0deg 0% 65% / 25%)',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    marginLeft: '1.2vw',
    marginRight: '1vw',
    textTransform: 'none !important',
    background: `${colors.newBGColor} !important`,
    '@media (max-width: 900px)': {
      height: 'auto !important',
    },
  },
  errorText: {
    color: colors.errorText,
    fontSize: '0.9vw',
  },
});

export default UserManagerStyle;
