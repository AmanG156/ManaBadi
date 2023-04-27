import makeStyles from '@mui/styles/makeStyles';
import { colors, fonts } from '../../../theme';

const style = makeStyles((theme) => ({
  formControl: {
    // '@media (min-width: 1200px)': {
    //   margin: '0.8vw',
    // },
    width: '100%',
    '& .MuiInputLabel-root': {
      fontFamily: fonts.fontType.roboto,
      color: `${colors.primary} !important`,
      fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
        lineHeight: '0.7vw !important',
      },
      letterSpacing: 1,
      padding: '0.4vw',
      paddingTop: '0.5px !important',
      // transform: 'translate(0.3vw, 0.4vw) scale(1)',
      [theme.breakpoints.down('md')]: {
        // fontSize: 12,
        padding: 0,
        lineHeight: 'inherit !important',
      },
    },
    '& .MuiOutlinedInput-root.Mui-disabled': {
      background: `${colors.disabledField} !important`,
    },
    '& .MuiSelect-select.MuiSelect-select': {
      fontFamily: fonts.fontType.roboto,
      color: `${colors.black} !important`,
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
        padding: '0.7vw !important',
      },
      '&.Mui-disabled': {
        color: `${colors.primary} !important`,
        '-webkit-text-fill-color': `${colors.primary} !important`,
      },
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
      },
    },
    '& .MuiOutlinedInput-root': {
      background: 'white',
      '@media (min-width: 1200px)': {
        height: '2.7vw !important',
        lineHeight: '1.2vw',
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
      '& .MuiSvgIcon-root.MuiSelect-icon': {
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw',
          width: '1vw',
          height: '1vw',
          right: '0.5vw',
        },
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
        fontWeight: '300',
      },
    },
  },
  menuItem: {
    borderBottom: '0.1vw solid #eee !important',
    padding: '0.5vw !important',
    maxWidth: 500,
    minWidth: '100%',
    whiteSpace: 'break-spaces',
    justifyContent: 'start !important',
    display: 'block !important',
    fontFamily: fonts.fontType.roboto,
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
    '&:last-child': {
      borderBottom: 'none !important',
    },
  },
  defaultMenu: {
    fontSize: '0.9vw',
    padding: '0.7vw !important',
  },
  dropdownUi: {
    marginLeft: 0,
    '& .MuiSelect-select.MuiSelect-select': {
      padding: 14,
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
      },
    },
  },
  errorText: {
    color: colors.errorText,
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
    bottom: -20,
    position: 'absolute',
    fontFamily: fonts.fontType.roboto,
    display: 'block',
  },
}));

export default style;
