import makeStyles from '@mui/styles/makeStyles';
import { colors, fonts } from '../../../theme';

const style = makeStyles((theme) => ({
  formControl: {
    margin: '0.8vw',
    width: '100%',
    '@media (max-width: 1200px)': {
      maxWidth: '100%',
    },
    '& .MuiInputLabel-root': {
      fontFamily: fonts.fontType.roboto,
      color: `${colors.placeHolderColor} !important`,
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
        padding: '0.3vw !important',
        transform: 'translate(0.3vw, 0.4vw) scale(1)',
      },
      letterSpacing: 1,
      [theme.breakpoints.down('md')]: {
        // fontSize: 10,
      },
    },
    '& .MuiSelect-select.MuiSelect-select': {
      fontFamily: fonts.fontType.roboto,
      color: `${colors.black} !important`,
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
        padding: '0.7vw !important',
        minHeight: '0.5em !important',
      },
      [theme.breakpoints.down('md')]: {
        // fontSize: 12,
      },
    },
    '& .MuiOutlinedInput-root': {
      background: 'white',
      '@media (min-width: 1200px)': {
        height: '2.7vw !important',
        borderRadius: '0.4vw',
      },
      // lineHeight: '1vw',
      // borderBottom: 'solid 1px #104F96',
      outline: 'none',
      width: '100%',
      '& .MuiOutlinedInput-notchedOutline': {
        border: '0.1vw solid',
        borderColor: `${colors.formBorder}`,
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
        [theme.breakpoints.down('md')]: {
          // fontSize: 12,
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
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
      },
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
  dropdownStyle: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: `${colors.primary} !important`,
    },
  },
  menuItem: {
    borderBottom: '0.1vw solid #eee !important',
    padding: '0.5vw !important',
    maxWidth: 500,
    minWidth: '100%',
    whiteSpace: 'break-spaces',
    justifyContent: 'start !important',
    fontFamily: fonts.fontType.roboto,
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw !important',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 12,
    },
    '&:last-child': {
      borderBottom: 'none !important',
    },
    '& span': {
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
      },
    },
  },
  m0: {
    margin: 0,
    height: '30px',
  },
}));

export default style;
