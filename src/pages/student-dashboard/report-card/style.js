/* eslint-disable import/prefer-default-export */

import { colors, fonts } from '../../../theme';

// eslint-disable-next-line no-undef
const reportcardstyle = (theme) => ({
  scoreProgress: {
    '& .MuiLinearProgress-colorPrimary': {
      backgroundColor: colors.white,
    },
    '& .MuiLinearProgress-barColorPrimary': {
      backgroundColor: colors.scoreProgressBar,
    },
  },
  failColor: {
    '& .MuiLinearProgress-colorPrimary': {
      backgroundColor: colors.white,
    },
    '& .MuiLinearProgress-barColorPrimary': {
      backgroundColor: colors.failColor,
    },
  },
  averageColor: {
    '& .MuiLinearProgress-colorPrimary': {
      backgroundColor: colors.white,
    },
    '& .MuiLinearProgress-barColorPrimary': {
      backgroundColor: colors.averageColor,
    },
  },
  passColor: {
    '& .MuiLinearProgress-colorPrimary': {
      backgroundColor: colors.white,
    },
    '& .MuiLinearProgress-barColorPrimary': {
      backgroundColor: colors.passColor,
    },
  },
  hwProgress: {
    '& .MuiLinearProgress-colorPrimary': {
      backgroundColor: colors.white,
    },
    '& .MuiLinearProgress-barColorPrimary': {
      backgroundColor: colors.homeWorkProgressBar,
    },
  },
  attendanceProgress: {
    '& .MuiLinearProgress-colorPrimary': {
      backgroundColor: colors.white,
    },
    '& .MuiLinearProgress-barColorPrimary': {
      backgroundColor: colors.attendanceProgressBar,
    },
  },
  alignGridYear: {
    '& .MuiFormControl-root': {
      width: '100%',
      '& .MuiInputLabel-root': {
        marginLeft: '-1vw',
      },
    },
  },
  errorText: {
    color: colors.errorText,
    '@media (min-width: 1200px)': {
      fontSize: '0.7vw',
    },
    display: 'block',
  },
  hallTicketNum: {
    color: colors.actionIconsColor,
    fontWeight: fonts.fontWeight.bold,
    textDecoration: 'underline',
  },
  container: {
    marginTop: '0.5vw',
  },
  hallTic: {
    textAlign: 'right',
  },
  Detailscontainer: {
    marginTop: '0.5vw',
    paddingLeft: '1vw',
  },
  dividerLine: {
    margin: '1vw 0vw',
  },
  label: {
    fontWeight: 400,
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
    fontFamily: fonts.fontType.roboto,
    color: colors.black,
  },
  certGrid: {
    paddingTop: '0.8vw !important',
    textAlign: 'center',
    // marginLeft: '1vw',
  },
  profileImg: {
    width: '40px',
    height: '40px',
    margin: '0 auto',
    '@media (min-width: 1200px)': {
      width: '5vw',
      height: '5vw',
      marginLeft: '1.4vw',
    },

  },
  prasunamName: {
    color: '#FF1111',
    fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    '@media (min-width: 1200px)': {
      fontSize: '1.2vw',
    },
  },
  certificateFont: {
    color: colors.black,
    marginTop: '-0.6vw',
    fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
    cursor: 'pointer',
  },
  cursorPointer: {
    cursor: 'pointer',
  },
  value: {
    fontWeight: 700,
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
    color: colors.black,
    fontFamily: fonts.fontType.roboto,
  },
  reportCardLabel: {
    fontWeight: 500,
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
    color: colors.black,
    fontFamily: fonts.fontType.roboto,
    paddingTop: '2vw',
  },
  downloadIcon: {
    verticalAlign: 'top',
  },
  reportCardLabelHeader: {
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
    fontWeight: 700,
    color: colors.black,
    fontFamily: fonts.fontType.roboto,
  },
  progressBar: {
    '& .MuiLinearProgress-root': {
      border: '1px solid #BCB7B7',
      borderRadius: 20,
      minHeight: '0.6vw',
      minWidth: '8.5vw',
      float: 'left',
      marginTop: '2%',
      marginRight: '0.3vw',
      '@media (max-width: 1199px)': {
        marginTop: '3.5%',
      },
      '@media (min-width: 900px) , @media (max-width: 1199px)': {
        minWidth: '55px',
      },

      '@media (max-width: 900px)': {
        marginTop: '8px',
      },
      '@media (max-width: 600px)': {
        display: 'none',
      },
    },
    '& span': {
      textAlign: 'right',
    },
  },
  academicYearDropDown: {
    minWidth: 90,
    lineHeight: 'normal',
    [theme.breakpoints.down('lg')]: {
      minWidth: '100px',
    },
    '& svg': {
      '@media (min-width: 1200px)': {
        fontSize: '1.5vw',
        width: '1.2vw',
        height: '1.2vw',
      },
    },
    '& .MuiInputLabel-root': {
      fontFamily: fonts.fontType.roboto,
      color: `${colors.placeHolderColor} !important`,
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
      },
      letterSpacing: 1,
      padding: '0.4vw',
      // transform: 'translate(0.3vw, 0.4vw) scale(1)',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        padding: 0,
        lineHeight: 'inherit !important',
      },
    },
    '& .MuiSelect-select.MuiSelect-select': {
      fontFamily: fonts.fontType.roboto,
      color: `${colors.black} !important`,
      padding: 0,
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
        paddingRight: '1.2vw',
        boxSizing: 'border-box',
      },
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'inherit',
    },
    '& .MuiOutlinedInput-root': {
      background: 'white',
      height: '2.7vw !important',
      lineHeight: '1vw',
      borderRadius: '0.4vw',
      outline: 'none',
      '& .MuiOutlinedInput-notchedOutline': {
        border: `0.1vw solid ${colors.primary}`,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: `0.2vw solid ${colors.primary}`,
      },
      '&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: `0.2vw solid ${colors.errorText}`,
      },
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        border: `0.1vw solid ${colors.errorText}`,
      },
      '& .MuiSvgIcon-root.MuiSelect-icon': {
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw',
        },
        width: '1vw',
        height: '1vw',
        // right: '0.5vw',
      },
    },
    '& .MuiInput-root:before': {
      borderBottom: `0.1vw solid ${colors.primary}`,
    },
    '& input': {
      // padding: '0.7vw 1vw 0.7vw 0.7vw',
      boxSizing: 'border-box',
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
      },
      fontFamily: fonts.fontType.roboto,
      color: '#696969 !important',
      '&::placeholder': {
        textTransform: 'uppercase',
        color: `${colors.placeHolderColor} !important`,
        opacity: 1,
        letterSpacing: 2,
        // padding: '0.7vw 1vw 0.7vw 0.7vw',
        fontFamily: fonts.fontType.roboto,
        fontWeight: '300',
      },
    },
  },
  reportDialog: {
    '& .MuiPaper-root': {
      '@media (min-width: 1200px)': {
        minWidth: '75vw',
        maxWidth: '75vw',
      },
    },
    '& .MuiGrid-root.MuiGrid-container': {
      // width: '100%',
      // maxWidth: 'inherit',
    },
  },
  studentNameReportCard: {
    color: '#015EEA',
    fontSize: 'calc(14px + 6 * ((100vw - 320px) / 1199))',
    '@media (min-width: 1200px)': {
      fontSize: '1.3vw',
    },
    fontWeight: 600,
    marginBottom: 0,
  },
  tableView: {
    width: '100%',
    maxWidth: 'inherit !important',
    border: 'solid 1px #104F96',
    borderRadius: '0.9vw',
    marginTop: '1.3vw',
    '& .MuiTableCell-root': {
      padding: '0.4vw',
      borderRight: 'solid 1px #aaa',
    },
    '& tr': {
      '& td, & th': {
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw',
        },
        lineHieght: '1.5vw',
        '&:last-child': {
          borderRight: 0,
        },
      },
    },
  },
  bonusDiv: {
    paddingLeft: '1vw',
  },
  tableheadColor: {
    '& th': {
      color: '#104F96',
      fontWeight: '600',
      '@media (min-width: 1200px)': {
        fontSize: '1vw !important',
      },
      '& small': {
        '@media (min-width: 1200px)': {
          fontSize: '1vw !important',
        },
      },
    },
  },
  tableheadBg: {
    background: '#e4f5fd',
    '& th': {
      fontWeight: '600',
    },
  },
  courseText: {
    display: 'flex',
    '& .MuiTypography-root': {
      '@media (min-width: 1200px)': {
        fontSize: '1vw',
      },
    },
  },
  printText: {
    textAlign: 'right',
    '& .MuiTypography-root': {
      '@media (min-width: 1200px)': {
        fontSize: '1vw',
      },
      marginBottom: 0,
    },
    '& svg': {
      '@media (min-width: 1200px)': {
        width: '1.7vw',
        height: '1.7vw',
      },
    },
  },
  printSec: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '-0.6vw',
    marginBottom: '1.2vw',
    cursor: 'pointer',
  },
  imageSec: {
    background: colors.secondary,

  },
  rightIcons: {
    textAlign: 'right',
    borderRadius: '0.4vw !important',
    position: 'relative',
    display: 'initial',
    padding: '0.5vw',
    '& svg': {
      '@media (min-width: 1200px)': {
        width: '1.5vw',
        height: '1.5vw',
      },
      color: colors.black,
      display: 'initial',

    },
    '&:hover': {
      minHeight: '3px !important',
    },
  },
  imageModal: {
    '& .MuiDialog-paper': {
      paddingBottom: 0,
    },
    '& .MuiDialogActions-root': {
      margin: 0,
    },
    '& .MuiDialogContent-root': {
      padding: 0,
    },
    '& h2': {
      display: 'none',
    },
    '& img': {
      width: '100%',
      height: 'auto',
    },
  },
});
export default reportcardstyle;
