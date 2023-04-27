import makeStyles from '@mui/styles/makeStyles';
import { colors, fonts } from '../../../theme';

const style = makeStyles(() => ({
  customInput: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.primary,
    },
  },
  performTextField: {
    '& .Mui-error': {
      color: colors.errorText,
      fontFamily: 'inherit',
      letterSpacing: 'inherit',
      '@media (min-width: 1200px)': {
        fontSize: '0.7vw',
      },
      marginLeft: 0,
    },
    '& .MuiFormLabel-root.MuiInputLabel-root': {
      '@media (min-width: 1200px)': {
        transform: 'translate(0.7vw, 0.7vw)',
        fontSize: '0.9vw',
        backgroundColor: colors.white,
      },
    },
    '& .MuiFormLabel-root.MuiInputLabel-shrink.MuiInputLabel-root': {
      '@media (min-width: 1200px)': {
        transform: 'translate(0.9vw, -0.5vw)',
        fontSize: '0.7vw',
      },
      color: colors.primary,
    },
    '& .MuiOutlinedInput-root': {
      '& .MuiInputLabel-root': {
        fontFamily: `${fonts.fontType.roboto} !important`,
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw !important',
        },
        color: `${colors.placeHolderColor} !important`,
      },
      '&.MuiInputLabel-root.Mui-focused': {
        color: `${colors.placeHolderColor} !important`,
      },
      '& input': {
        paddingLeft: '1vw',
        paddingRight: '1vw',
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw',
          color: colors.black,
        },
        '&.Mui-disabled': {
          '@media (min-width: 1200px)': {
            padding: '0.65vw',
          },
          backgroundColor: colors.backgroundGrey,
          // padding: 2,
          color: colors.primary,
          WebkitTextFillColor: colors.primary,
        },
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
      },
      '& .MuiFormHelperText-root': {
        '@media (min-width: 1200px)': {
          fontSize: '0.7vw',
        },
        marginLeft: 0,
        fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
      },
    },

    '& fieldset': {
      '& legend span': {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  },
}));

export default style;
