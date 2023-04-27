import { colors, fonts } from '../../../theme';

const detailstyle = (theme) => ({
  dropdowns: {
    '@media (min-width: 1200px)': {
      maxHeight: '4vw',
    },
  },
  mapPinImg: {
    '@media (min-width: 1200px)': {
      width: '1vw',
      height: '1vw',
    },
    transform: 'translate(0.9vw, 0.1vw)',
  },
  year: {
    textAlign: 'start',
    '@media (min-width: 1200px)': {
      minWidth: '12vw',
    },
    '& button': {
      '@media (max-width: 600px)': {
        marginTop: '10px',
        float: 'right',
      },
    },
    '& .MuiFormControl-root': {
      // width: '90%',
      '& .MuiInputLabel-root': {
        fontFamily: fonts.fontType.roboto,
        color: `${colors.primary} !important`,
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw',
        },
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
        '@media (min-width: 1200px)': {
          height: '2.7vw !important',
          lineHeight: '1vw',
        },
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
        right: '0.5vw',
      },
      '& input': {
        padding: '0.7vw 1vw 0.7vw 0.7vw',
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw',
        },
        boxSizing: 'border-box',
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
    '& span': {
      display: 'flex',
      alignItems: 'center',
    },
    '& .MuiInputBase-root.MuiInput-root': {
      '@media (max-width: 1200px)': {
        maxWidth: '85%',
      },
      '@media (min-width: 1200px)': {
        minWidth: '40vw !important',
        maxWidth: '40vw !important',
      },
    },
    '& .MuiInputLabel-root': {
      fontFamily: fonts.fontType.roboto,
      color: `${colors.primary} !important`,
      '@media (min-width: 1200px)': {
        fontSize: '1.2vw',
        letterSpacing: 1,
      },
    },
    '& .MuiInput-root:before': {
      borderBottom: `0.1vw solid ${colors.actionIconsColor}`,
    },
    '& .MuiSelect-select.MuiSelect-select': {
      textAlign: 'left',
      '@media (min-width: 1200px)': {
        width: '40vw',
        padding: '0.7vw',
        fontSize: '0.9vw',
      },
      fontFamily: fonts.fontType.roboto,
      transform: 'translate(8px, 0px)',
      backgroundColor: 'inherit',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
      },
    },
    '& .MuiOutlinedInput-root': {
      background: 'white',
      '@media (min-width: 1200px)': {
        height: '2.7vw !important',
        lineHeight: '1vw',
      },
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
      right: '0.5vw',
    },
    '& input': {
      padding: '0.7vw 1vw 0.7vw 0.7vw',
      boxSizing: 'border-box',
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
        minWidth: 900,
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
  titleRow: {
    justifyContent: 'space-between',
  },

  gridContainer: {
    padding: '2vw 2vw 2vw 3vw !important',
    minHeight: '65vh',
  },
  headerTitle: {
    fontWeight: fonts.fontWeight.bold,
    '@media (min-width: 1200px)': {
      fontSize: '1.5vw',
    },
    padding: '10px 10px 10px 1px',
    [theme.breakpoints.down('md')]: {
      fontSize: 16,
    },
  },
  announcementsContainer: {
    color: colors.black,
    width: 'auto',
    fontFamily: fonts.fontType.roboto,
    marginTop: '2vw',
  },
  announcementsList: {
    textAlign: 'center',
    paddingBottom: 50,
  },
  tableView: {
    width: '100%',
  },
});

export default detailstyle;
