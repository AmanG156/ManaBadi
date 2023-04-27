import makeStyles from '@mui/styles/makeStyles';
import { colors, fonts } from '../../../theme';

const style = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    margin: '8px',
    '@media (min-width: 1200px)': {
      margin: '0.8vw',
    },
    '@media (max-width: 1199px)': {
      marginLeft: 0,
      marginTop: 0,
    },
    // '& div': {
    //   width: '100%',
    // },
    '& .MuiInputLabel-root': {
      fontFamily: fonts.fontType.roboto,
      color: `${colors.placeHolderColor} !important`,
      fontSize: 'calc(14px + 6 * ((100vw - 320px) / 1199))',
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw !important',
        letterSpacing: 1,
        padding: '0.4vw',
        transform: 'translate(0.3vw, 0.4vw) scale(1)',
      },
      // [theme.breakpoints.down('md')]: {
      //   fontSize: 10,
      // },
    },
    '& .MuiSelect-select.MuiSelect-select': {
      fontFamily: fonts.fontType.roboto,
      color: `${colors.black} !important`,
      fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw !important',
        padding: '0.7vw 1.2vw !important',
        minHeight: '0.5em !important',
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
      width: '100%',
      '& .MuiOutlinedInput-notchedOutline': {
      // border: `0.1vw solid ${colors.primary}`,
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
        // fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw !important',
          width: '1vw',
          height: '1vw',
        },
        right: '0.5vw',
        // [theme.breakpoints.down('md')]: {
        //   fontSize: 12,
        // },
      },
    },
    '& input': {
      padding: '0.7vw 1vw 0.7vw 0.7vw',
      boxSizing: 'border-box',
      fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw !important',
      },
      fontFamily: fonts.fontType.roboto,
      color: '#696969 !important',
      // [theme.breakpoints.down('md')]: {
      //   fontSize: 12,
      // },
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
    fontFamily: fonts.fontType.roboto,
    // [theme.breakpoints.down('md')]: {
    //   fontSize: 12,
    // },
    fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    '@media (min-width: 1200px)': {
      display: 'block !important',
      fontSize: '0.9vw !important',
    },
    '&:last-child': {
      borderBottom: 'none !important',
    },
  },
  defaultMenu: {
    fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw !important',
    },
    padding: '0.7vw !important',
    // [theme.breakpoints.down('md')]: {
    //   fontSize: 12,
    // },
  },
  selectStyle: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.primary,
    },
  },
  errorText: {
    color: colors.errorText,
    fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw !important',
    },
    bottom: -20,
    position: 'absolute',
    fontFamily: fonts.fontType.roboto,
    display: 'block',
    [theme.breakpoints.down('md')]: {
      // fontSize: 12,
    },
  },
}));

export default style;
