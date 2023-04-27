import { colors, fonts } from '../../../theme';

const studentListStyle = (theme) => ({
  dropdowns: {
    '@media (min-width: 1200px)': {
      maxHeight: '4vw',
    },
  },
  header: {
    cursor: 'pointer',
    '@media (min-width: 1200px)': {
      maxHeight: '4vw',
    },
    color: colors.primary,
    '& svg': {
      '@media (min-width: 1200px)': {
        width: '1.5vw !important',
        height: '1.5vw !important',
      },
      color: colors.primary,
    },
  },
  columnSelectionIcon: {
    cursor: 'pointer',
    width: '15px',
    '@media (min-width: 1200px)': {
      maxHeight: '1.2vw',
    },
    color: colors.primary,
  },
  noData: {
    width: '100%',
    textAlign: 'center',
    marginTop: '13vw',
  },
  mapPinImg: {
    '@media (min-width: 1200px)': {
      width: '1vw',
      height: '1vw',
    },
    transform: 'translate(0.9vw, 0.1vw)',
  },
  button: {
    '& .MuiButtonBase-root.MuiButton-root': {
      minWidth: '10vw !important',
    },
  },
  staricon: {
    padding: '2px  3px 0px 1px',
    '& .MuiSvgIcon-root': {
      color: colors.primary,
    },
  },
  '& .makeStyles-addressAutoComplete-1513': {
    border: 'none',
  },
  addressAutoCompleteClass: {
    height: '2vw',
    fontWeight: 400,
    // borderBottom: `0.1vw solid  ${colors.primary}`,
    border: 'none',
    background: 'white',
    minHeight: '2.347vw',
    borderRadius: '0.4vw',
    paddingLeft: '0.7vw',
    width: '94.8%',
    fontSize: 'calc(8px + 6 * ((100vw - 320px) / 680))',
    '&:focus, &:focus-visible': {
      // border: `0.2vw solid ${colors.primary}`,
      outline: 'none',
    },
    '&::placeholder': {
      fontFamily: `${fonts.fontType.roboto} !important`,
      fontSize: 'calc(8px + 6 * ((100vw - 320px) / 680))',
      fontWeight: 400,
      color: `${colors.placeHolderColor}!important`,
      letterSpacing: 1,
    },
  },
  year: {
    textAlign: 'start',
    minWidth: '5vw',
    '@media (min-width: 1200px)': {
      marginLeft: '8px',
    },
    '&.MuiFormControl-root': {
      width: '100% !important',
      '& span': {
        width: '100% !important',
      },
      '& .MuiInputLabel-root': {
        fontFamily: fonts.fontType.roboto,
        color: `${colors.primary} !important`,
        fontSize: '1vw',
        letterSpacing: 1,
      },
      '& .MuiSelect-select.MuiSelect-select': {
        fontFamily: fonts.fontType.roboto,
        color: `${colors.primary} !important`,
        '@media (min-width: 1200px)': {
          fontSize: '1vw',
          padding: '0.7vw !important',
          width: '8vw !important',
        },
      },
      '& .MuiOutlinedInput-root': {
        background: 'white',
        // height: '2.7vw !important',
        // lineHeight: '1vw',
        // borderRadius: '0.4vw',
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
      },
      '& .MuiSvgIcon-root': {
        fontSize: '0.9vw',
        width: '1vw',
        // height: '1vw',
        // right: '0.5vw',
      },
      '& input': {
        marginTop: '2vw',
        // padding: '0.7vw 1vw 0.7vw 0.7vw',
        boxSizing: 'border-box',
        fontSize: '0.9vw',
        fontFamily: fonts.fontType.roboto,
        color: '#696969 !important',
        '&::placeholder': {
          textTransform: 'uppercase',
          color: `${colors.placeHolderColor} !important`,
          opacity: 1,
          letterSpacing: 2,
          // padding: '0.7vw 1vw 0.7vw 0.7vw',
          fontFamily: fonts.fontType.roboto,
          fontWeight: 400,
        },
      },
    },

  },
  locationDropdown: {
    textAlign: 'start',
    '@media (min-width: 1200px)': {
      minWidth: '40vw',
    },
    '& .MuiInputBase-root.MuiInput-root': {
      '@media (min-width: 1200px)': {
        minWidth: '35vw !important',
        maxWidth: '35vw !important',
      },
      '@media (max-width: 1200px)': {
        width: '100%',
        paddingLeft: '15px',
      },
    },
    '& .MuiFormControl-root': {
      // width: '90%',
      '& .MuiInputLabel-root': {
        fontFamily: fonts.fontType.roboto,
        color: `${colors.primary} !important`,
        fontSize: '1vw',
        letterSpacing: 1,
      },
      '& .MuiInput-root:before': {
        borderBottom: `0.1vw solid ${colors.actionIconsColor}`,
      },
      '& .MuiSelect-select.MuiSelect-select': {
        fontFamily: fonts.fontType.roboto,
        color: `${colors.black} !important`,
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw',
          padding: '0.7vw 0.7vw 0.7vw 1.2vw !important',
        },
        // width: '6vw !important',
        backgroundColor: 'inherit',
        [theme.breakpoints.down('md')]: {
          fontSize: 12,
        },
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
      },
      '& .MuiSvgIcon-root': {
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw',
          width: '1vw',
          height: '1vw',
        },
      },
      '& input': {
        padding: '0.7vw 1vw 0.7vw 0.7vw',
        boxSizing: 'border-box',
        fontSize: '0.9vw',
        fontFamily: fonts.fontType.roboto,
        color: '#696969 !important',
        '&::placeholder': {
          textTransform: 'uppercase',
          color: `${colors.placeHolderColor} !important`,
          opacity: 1,
          letterSpacing: 2,
          padding: '0.7vw 1vw 0.7vw 0.7vw',
          fontFamily: fonts.fontType.roboto,
          fontWeight: 400,
        },
      },
    },

  },
  location: {
    '@media (min-width: 1200px)': {
      minWidth: '40vw',
    },
    '& .MuiInputBase-root.MuiInput-root': {
      '@media (min-width: 1200px)': {
        minWidth: '35vw !important',
      },
    },
    '& .MuiInputLabel-root': {
      fontFamily: fonts.fontType.roboto,
      color: `${colors.primary} !important`,
      fontSize: '1.2vw',
      letterSpacing: 1,
    },
    '& .MuiSelect-select.MuiSelect-select': {
      textAlign: 'left',
      padding: '0.7vw',
      fontFamily: fonts.fontType.roboto,
      color: `${colors.primary} !important`,
      '@media (min-width: 1200px)': {
        fontSize: '1vw',
      },
      transform: 'translate(8px, 0px)',
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
    },
    '& .MuiSvgIcon-root': {
      fontSize: '0.9vw',
      width: '1vw',
      height: '1vw',
      right: '0.5vw',
    },
    '& input': {
      padding: '0.7vw 1vw 0.7vw 0.7vw',
      boxSizing: 'border-box',
      fontSize: '0.9vw',
      minWidth: 900,
      fontFamily: fonts.fontType.roboto,
      color: '#696969 !important',
      '&::placeholder': {
        textTransform: 'uppercase',
        color: `${colors.placeHolderColor} !important`,
        opacity: 1,
        letterSpacing: 2,
        padding: '0.7vw 1vw 0.7vw 0.7vw',
        fontFamily: fonts.fontType.roboto,
        fontWeight: 400,
      },
    },

  },
  question: {
    textTransform: 'none !important',
    color: '#f3f8fe !important',
    boxShadow: '0 4px 4px -2px hsl(0deg 0% 65% / 25%)',
    boxSizing: 'border-box',
    height: '2.7vw',
    minWidth: '2.7vw',
    fontFamily: 'inherit',
    padding: '0.8vw',
    borderRadius: '0.5vw !important',
    background: colors.lightGreen,
    fontSize: '0.8vw !important',
    cursor: 'pointer',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      height: 30,
    },
  },
  primaryTeacher: {
    color: colors.primary,
    fontWeight: fonts.fontWeight.low,
  },
  nonPrimaryTeacher: {
    color: colors.black,
    display: 'block',
    fontWeight: fonts.fontWeight.low,
    transform: 'translate(-60px, 18px)',

  },
  gridContainer: {
    padding: '2vw 2vw 2vw 3vw !important',
    minHeight: '65vh',
  },
  '.MuiSvgIcon-root': {
    width: '1.5vw',
    height: '1.5vw',
  },
  alignGrid: {
    paddingBottom: 25,
    maxWidth: '20%',
    '&.MuiGrid-root.MuiGrid-item': {
      paddingTop: 0,
      paddingLeft: 0,
    },
    '& .MuiFormControl-root': {
      margin: '10px !important',
      marginLeft: '0px !important',
      width: '99%',
      marginRight: '0px !important',

      '& .MuiFormControl-root': {
        margin: '0 !important',
        width: '100%',
      },
    },
  },
  courseName: {
    fontWeight: fonts.fontWeight.bold,
    color: colors.black,
    textAlign: 'center',
    fontSize: '1vw',
  },
  exportButton: {
    float: 'right',
    textAlign: 'center',
    textTransform: 'none',
    color: '#f3f8fe !important',
    boxShadow: '0 4px 4px -2px hsl(0deg 0% 65% / 25%)',
    boxSizing: 'border-box',
    height: '2.7vw !important',
    marginLeft: '1.3vw',
    minWidth: '10.5vw',
    fontFamily: 'inherit',
    padding: '0.8vw',
    borderRadius: '0.5vw !important',
    background: colors.newBGColor,
    fontSize: '0.9vw',
    textDecoration: 'none',
    marginBottom: '3vw',
    [theme.breakpoints.down('md')]: {
      fontSize: 12,
      height: '24px !important',
      marginTop: 5,
      padding: '5px 10px',
      lineHeight: '15px',
    },
  },
  marksModal: {
    position: 'absolute',
    top: -20,
    zIndex: 1,
    cursor: 'pointer',
  },
  studentHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  gridActions: {
    textAlign: 'right',
    '@media (max-width: 1200px)': {
      maxWidth: 'fit-content',
    },
  },
  errorText: {
    fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    '@media (max-width: 1200px)': {
      marginTop: '25px',
      marginLeft: '15px',
    },
    '@media (min-width: 1200px)': {
      marginTop: '3vw',
      marginLeft: '1vw',
      fontSize: '0.9vw',
    },
    color: colors.errorText,
  },
  studentsList: {
    marginTop: '1vw',
  },
});

export default studentListStyle;
