import { colors, fonts } from '../../../theme';

const adminDashboardStyle = (theme) => ({
  activeAcademicYear: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 10px',
    '& p': {
      fontSize: 12,
      margin: '0 4px',
      color: colors.primary,
    },
    '& span': {
      marginBottom: 0,
      color: colors.primary,
    },
    '& b': {
      fontSize: 13,
      marginLeft: 5,
    },
  },
  heading: {
    padding: 0,
    fontWeight: 600,
    color: colors.primaryBlueColor,
    paddingBottom: 20,
    fontSize: 18,
  },
  calenderDiv: {
    display: 'flex',
    padding: '30px 10px 0px 10px',
    alignItems: 'center',
  },
  centerAlign: {
    justifyContent: 'center !important',
    textAlign: 'center !important',
    display: 'flex !important',
  },
  alignGrid: {
    '&.MuiGrid-root.MuiGrid-item': {
      paddingTop: 0,
      flexBasis: '20%',
    },
    '& .MuiFormControl-root': {
      margin: '10px 0 !important',
      width: '100%',

      '& .MuiFormControl-root': {
        margin: '0 !important',
        width: '100%',
      },
    },
  },
  academicYear: {
    cursor: 'pointer',
  },
  studentText: {
    fontWeight: 'bold',
    marginLeft: '10px',
    marginTop: '20px',
  },
  rightIcons: {
    textAlign: 'right',
    paddingRight: '1%',
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
  },
  toggleButtonGrp: {
    border: '0.1vw solid #ccc',
    borderRadius: '0.4vw',
    maxHeight: '2.5vw',
    paddingRight: 1,
    [theme.breakpoints.down('md')]: {
      maxHeight: 'inherit',
      alignItems: 'baseline',
    },
  },
  toggleButtonCard: {
    borderRadius: '0.8vw 0vw 0vw 0.8vw',
    border: '0 !important',
    '&.MuiButtonBase-root.MuiToggleButton-root': {
      width: '4vw !important',
      padding: '0.5vw !important',
      [theme.breakpoints.down('md')]: {
        width: '35px !important',
        height: '35px !important',
        padding: '0 5px !important',
      },
      '&:hover': {
        background: colors.toggleButtonBG,
        borderRadius: '1vw 0.4vw 0.4vw 1vw',
        '& svg': {
          color: colors.white,
        },
      },
      '&.Mui-selected': {
        background: colors.toggleButtonBG,
        borderRadius: '1vw 0.4vw 0.4vw 1vw',
        '& svg': {
          color: colors.white,
        },
      },
    },
  },
  boxDiv: {
    borderRadius: 15,
    backgroundColor: colors.greyShade,
    padding: '15px 12px 12px 15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    border: `solid 1px ${colors.actionIconsColor}`,
    whiteSpace: 'nowrap',
  },
  titleRow: {
    justifyContent: 'space-between',
    color: colors.actionIconsColor,
  },
  headerTitle: {
    fontWeight: fonts.fontWeight.bold,
    fontSize: '1.5vw',
    padding: '10px 10px 10px 1px',
    [theme.breakpoints.down('md')]: {
      fontSize: 16,
    },
  },
  filterButton: {
    float: 'left',
    width: '100%',
    paddingLeft: '2%',
    '& .MuiFormControl-root.MuiFormControl-fullWidth': {
      // width: 'calc(100% - 125px)',
      // paddingLeft: '5px',
    },
    '& button.MuiButton-filterPrimary': {
      background: '#ededed',
      border: 'solid 2px #ccc',
      padding: '0 12px 0 0',
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
    '& .MuiOutlinedInput-root': {
      padding: '0 !important',
      '& .MuiButtonBase-root': {
        height: '2vw',
      },
    },
    '& .MuiInputLabel-root': {
      lineHeight: '0.9rem',
    },
  },
  enrollmentBar: {
    // display: 'flex',
    // flexDirection: 'row',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  enrolled: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 10px',
    '& p': {
      fontSize: 12,
      margin: '0 4px',
    },
    '& span': {
      marginBottom: 0,
    },
    '& b': {
      fontSize: 13,
      marginLeft: 5,
    },
  },
  headingColor: {
    color: colors.actionIconsColor,
    margin: 0,
  },
  mainContainer: {
    padding: 30,
  },
  headingStyle: {
    color: colors.primary,
    marginLeft: 20,
    marginBottom: 20,
  },
  yearHead: {
    fontSize: 40,
    marginBottom: 20,
    transform: 'rotate(-90deg)',
    color: colors.lightGrey,
  },
});

export default adminDashboardStyle;
