import { alpha } from '@material-ui/core';
import { green } from '@mui/material/colors';
import { colors, fonts } from '../../../theme';

const detailstyle = (theme) => ({
  addTeacherDialog: {
    '& .MuiDialog-paper': {
      '@media (min-width: 1200px)': {
        minWidth: '55vw !important',
        maxWidth: '65vw !important',
      },
      overflowX: 'hidden !important',
    },
    '& .MuiAutocomplete-root': {
      marginTop: '-2vw',
    },
    '& .MuiDialogContent-root .MuiGrid-root': {
      '@media (min-width: 1200px)': {
        maxWidth: '65vw !important',
      },
      fontFamily: fonts.roboto,
    },
    '& .MuiBox-root': {
      padding: '0vw !important',
    },
    '& #datePickerDiv': {
      width: '18vw !important',
    },
    '& #addressAutoComplete': {
      width: '46.2vw',
    },
  },
  switchGrid: {
    right: '59px',
    position: 'absolute',
  },
  mailTag: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  switchButton: {
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: green[600],
      '&:hover': {
        backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: green[600],
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
    fontSize: '1.5vw',
    padding: '10px 10px 10px 1px',
    [theme.breakpoints.down('md')]: {
      fontSize: 16,
    },
  },
  year: {
    textAlign: 'start',
    minWidth: '8vw',
    '& .MuiFormControl-root': {
      '& .MuiInputLabel-root': {
        fontFamily: fonts.fontType.roboto,
        color: `${colors.primary} !important`,
        '@media (min-width: 1200px)': {
          fontSize: '1vw',
        },
        letterSpacing: 1,
      },
      '& .MuiInput-root': {
        '@media (max-width: 1200px)': {
          display: 'block',
        },
      },
      '& .MuiInput-root:before': {
        borderBottom: `0.1vw solid ${colors.actionIconsColor}`,
      },
      '& .MuiSelect-select.MuiSelect-select': {
        fontFamily: fonts.fontType.roboto,
        color: `${colors.black} !important`,
        fontSize: '1vw',
        padding: '0.7vw !important',
        width: '100%',
        '@media (min-width: 1200px)': {
          width: '6vw !important',
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
  locationDropdown: {
    textAlign: 'start',
    '@media (min-width: 1200px)': {
      minWidth: '40vw',
    },
    '& span': {
      display: 'flex',
      alignItems: 'center',
    },
    '& .MuiInputBase-root.MuiInput-root': {
      '@media (min-width: 1200px)': {
        minWidth: '35vw !important',
        maxWidth: '35vw !important',
      },
    },
    '& .MuiFormControl-root': {
      '& .MuiInputLabel-root': {
        fontFamily: fonts.fontType.roboto,
        color: `${colors.primary} !important`,
        '@media (min-width: 1200px)': {
          fontSize: '1vw',
          marginLeft: '1.3vw',
        },
        letterSpacing: 1,
      },
      '& .MuiInput-root': {
        '@media (max-width: 1200px)': {
          display: 'block',
          width: '85%',
          paddingRight: '15px',
          paddingLeft: '8px',
        },
      },
      '& .MuiInput-root:before': {
        borderBottom: `0.1vw solid ${colors.actionIconsColor}`,
      },
      '& .MuiSelect-select.MuiSelect-select': {
        fontFamily: fonts.fontType.roboto,
        color: `${colors.black} !important`,
        padding: '0.7vw !important',
        '@media (min-width: 1200px)': {
          fontSize: '1vw',
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
          borderRadius: '0.4vw',
        },
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
        '@media (min-width: 1200px)': {
          padding: '0.7vw 1vw 0.7vw 0.7vw',
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
  mapPinImg: {
    '@media (min-width: 1200px)': {
      width: '1vw',
      height: '1vw',
    },
    transform: 'translate(0.9vw, 0.1vw)',
    marginRight: '0.2vw',
  },
  dropdowns: {
    '@media (min-width: 1200px)': {
      maxHeight: '4vw',
    },
    alignItems: 'center',
  },
  locationDetailBox: {
    'margin-top': '20px',
    border: '1px solid #015EEA',
    padding: '10px',
    borderRadius: '0.4vw',
  },
  card: {
    padding: '15px',
    'padding-left': '20px',
  },
  verticalDivider: {
    width: '1px',
    margin: '20px 0',
    background: '#A5BDD8',
    '@media (max-width: 600px)': {
      width: '100%',
      height: '2px',
    },
  },
  cardLast: {
    padding: '15px',
    'padding-left': '20px',
  },
  title: {
    fontWeight: fonts.fontWeight.semi,
    fontFamily: fonts.fontType.roboto,
    color: '#055BD8',
    '@media (min-width: 1200px)': {
      fontSize: '1.2vw',
    },
  },
  cardContent: {
    fontFamily: fonts.fontType.roboto,
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
    fontWeight: fonts.fontWeight.low,
    margin: '0.7vw 0',
  },
  cardSubContent: {
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
      margin: '0.7vw 0',
    },
  },
  gridBorder: {
    border: '1px solid #015EEA',
    borderRadius: '0.4vw',
    marginTop: '2vw',
    '@media (max-width: 600px)': {
      marginTop: '15px',
    },
  },
});

export default detailstyle;
