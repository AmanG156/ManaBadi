import { colors, fonts } from '../../../../theme';

const listStyle = (theme) => ({
  year: {
    textAlign: 'start',
    minWidth: '8vw',
    '& .MuiFormControl-root': {
      // width: '90%',
      '& .MuiInputLabel-root': {
        fontFamily: fonts.fontType.roboto,
        color: `${colors.primary} !important`,
        fontSize: '1vw',
        letterSpacing: 1,
      },
      '& .MuiInput-root': {
        width: '90%',
      },
      '& .MuiInput-root:before': {
        borderBottom: `0.1vw solid ${colors.actionIconsColor}`,
      },
      '& .MuiSelect-select.MuiSelect-select': {
        fontFamily: fonts.fontType.roboto,
        color: `${colors.black} !important`,
        padding: '0.7vw !important',
        '@media (min-width: 1200px)': {
          width: '6vw !important',
          fontSize: '1vw',
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
  locationDropdown: {
    textAlign: 'start',
    '@media (min-width: 1200px)': {
      minWidth: '40vw',
    },
    '& .MuiInputBase-root.MuiInput-root': {
      minWidth: '35vw !important',
      maxWidth: '35vw !important',
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
          fontSize: '1vw',
          padding: '0.7vw !important',
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
          padding: '0.7vw 1vw 0.7vw 0.7vw',
          fontFamily: fonts.fontType.roboto,
          fontWeight: 400,
        },
      },
    },

  },
  location: {
    minWidth: '40vw',
    '& .MuiInputBase-root.MuiInput-root': {
      minWidth: '35vw !important',
      maxWidth: '35vw !important',
    },
    '& .MuiInputLabel-root': {
      fontFamily: fonts.fontType.roboto,
      color: `${colors.primary} !important`,
      fontSize: '1.2vw',
      letterSpacing: 1,
    },
    '& .MuiInput-root:before': {
      borderBottom: `0.1vw solid ${colors.actionIconsColor}`,
    },
    '& .MuiSelect-select.MuiSelect-select': {
      textAlign: 'left',
      padding: '0.3vw 1vw 1vw 1vw',
      fontFamily: fonts.fontType.roboto,
      // color: `${colors.black} !important`,
      fontSize: '1vw',
      transform: 'translate(8px, 0px)',
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
      right: '-0.5vw',
    },
    '& input': {
      padding: '0.7vw 1vw 0.7vw 0.7vw',
      boxSizing: 'border-box',
      fontSize: '0.9vw',
      // minWidth: 900,
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
});

export default listStyle;
