import { colors, fonts } from '../../../theme';

const style = ((theme) => ({
  formControl: {
    width: '100%',
    '@media (min-width: 1200px)': {
      margin: '0.8vw',
    },
    '@media (max-width: 1199px)': {
      marginRight: 0,
      marginLeft: 0,
    },
    '& .MuiOutlinedInput-input.Mui-disabled': {
      background: `${colors.disabledField} !important`,
      '-webkit-text-fill-color': `${colors.black} !important`,
    },
    '& .MuiInputLabel-root': {
      fontFamily: `${fonts.fontType.roboto} !important`,
      fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw !important',
      },
      color: `${colors.placeHolderColor} !important`,
      [theme.breakpoints.down('md')]: {
        fontSize: '12px !important',
      },
    },
    '& .MuiInputAdornment-root': {
      marginRight: '0.7vw',
    },
    '& .MuiOutlinedInput-root': {
      background: '#fff',
      color: colors.placeHolderColor,
      fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw !important',
        height: '2.7vw',
        borderRadius: '0.4vw',
      },
      outline: 'none',
      [theme.breakpoints.down('md')]: {
        fontSize: '12px !important',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        // border: `0.1vw solid ${colors.primary}`,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: `0.2vw solid ${colors.primary}`,
      },
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        border: `0.1vw solid ${colors.errorText}`,
      },
      '&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: `0.2vw solid ${colors.errorText}`,
      },
      '& input': {
        fontFamily: `${fonts.fontType.roboto} !important`,
        fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199)) !important',
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw !important',
          padding: '0.7vw',
        },
        '@media (max-width: 499px)': {
          borderRadius: '3px',
        },
        color: `${colors.black}!important`,
        textOverflow: 'ellipsis',
        [theme.breakpoints.down('md')]: {

        },
      },
    },
    '& .MuiFormHelperText-contained': {
      margin: 0,
    },
  },
}));

export default style;
