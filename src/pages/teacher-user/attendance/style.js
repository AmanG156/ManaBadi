import { fonts, colors } from '../../../theme';

const teacherAttendanceStyle = (theme) => ({
  titleRow: {
    justifyContent: 'space-between',
  },

  gridContainer: {
    padding: '2vw 2vw 2vw 3vw !important',
    minHeight: '65vh',
  },
  headerTitle: {
    fontWeight: fonts.fontWeight.bold,
    fontSize: '1.5vw',
    padding: '10px 10px 10px 1px',
    [theme.breakpoints.down('md')]: {
      fontSize: 16,
    },
  },
  dropdowns: {
    '@media (min-width: 1200px)': {
      maxHeight: '4vw',
    },
  },
  year: {
    textAlign: 'start',
    minWidth: '12vw',
    '& .MuiFormControl-root': {
      // width: '90%',
      '& .MuiInputLabel-root': {
        fontFamily: fonts.fontType.roboto,
        color: `${colors.primary} !important`,
        fontSize: '0.9vw',
        letterSpacing: 1,
      },
      '& .MuiInput-root:before': {
        borderBottom: `0.1vw solid ${colors.actionIconsColor}`,
      },
      '& .MuiSelect-select.MuiSelect-select': {
        fontFamily: fonts.fontType.roboto,
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw',
          padding: '0.7vw !important',
          width: '8vw !important',
        },
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
        fontSize: '0.9vw',
        width: '1vw',
        height: '1vw',
        right: '0.5vw',
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
  loaction: {
    textAlign: 'start',
    minWidth: '12vw',
    '& .MuiFormControl-root': {
      // width: '90%',
      '& .MuiInputLabel-root': {
        fontFamily: fonts.fontType.roboto,
        color: `${colors.primary} !important`,
        fontSize: '0.9vw',
        letterSpacing: 1,
      },
      '& .MuiInput-root:before': {
        borderBottom: `0.1vw solid ${colors.actionIconsColor}`,
      },
      '& .MuiSelect-select.MuiSelect-select': {
        fontFamily: fonts.fontType.roboto,
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw',
          padding: '0.7vw !important',
          width: '15vw !important',
        },
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
        fontSize: '0.9vw',
        width: '1vw',
        height: '1vw',
        right: '0.5vw',
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
  buttons: {
    textAlign: 'end',
  },
});

export default teacherAttendanceStyle;
