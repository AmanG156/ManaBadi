import { colors, fonts } from '../../../theme';

const labeledTextFieldStyle = ((theme) => ({
  formControl: {
    margin: '0.8vw',
    width: '100%',
    '@media (max-width: 1199px)': {
      marginRight: 0,
    },
    '& .MuiOutlinedInput-input.Mui-disabled': {
      background: `${colors.disabledField} !important`,
      '-webkit-text-fill-color': `${colors.black} !important`,
    },
    '& .MuiInputLabel-root': {
      fontFamily: `${fonts.fontType.roboto} !important`,
      fontSize: '0.9vw !important',
      color: `${colors.primary} !important`,
      [theme.breakpoints.down('md')]: {
        fontSize: '12px !important',
      },
    },
    '& .MuiInputAdornment-root': {
      marginRight: '0.7vw',
    },
    '& .MuiOutlinedInput-root': {
      background: '#fff',
      borderRadius: '0.4vw',
      color: colors.placeHolderColor,
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
        height: '2.7vw',
      },
      outline: 'none',
      '& .MuiOutlinedInput-notchedOutline': {
        border: `0.1vw solid ${colors.primary}`,
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
        '@media (min-width: 1200px) and (max-width: 1599px)': {
          padding: '0.7vw',
          fontSize: '0.9vw !important',
        },
        fontFamily: `${fonts.fontType.roboto} !important`,
        color: `${colors.black}!important`,
        textOverflow: 'ellipsis',
        [theme.breakpoints.down('md')]: {
          fontSize: '12px !important',
        },
      },
    },
    '& .MuiFormHelperText-contained': {
      margin: 0,
    },
  },
}));

export default labeledTextFieldStyle;
