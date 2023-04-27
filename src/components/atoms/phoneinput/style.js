import { colors, fonts } from '../../../theme';

const style = ((theme) => ({
  phoneInput: {
    // border: `1px solid ${colors.primary}`,
    background: 'white',
    borderRadius: '4px',
    // margin: '8px',
    width: '100%',
    border: '0.1vw solid',
    borderColor: `${colors.formBorder}`,
    '@media (max-width: 1199px)': {
      marginLeft: 0,

    },
    '@media (max-width: 899px) ': {

    },
    '@media (min-width: 1200px)': {
      background: 'white',
      borderRadius: '0.4vw',
      marginBottom: '0.2vw',
      width: '45vw',
    },
    '&:focus, &.PhoneInput--focus, &:focus-within': {
      // border: `0.2vw solid ${colors.primary}`,
      borderColor: `${colors.primary}`,
      outline: 'none',
    },
    '& .PhoneInputInput': {
      borderRadius: '3px',
      padding: '0.8vw',
      width: '100%',
      color: `${colors.black} !important`,
      border: 'none',
      '@media (max-width: 1199px)': {
        padding: '20px 14px',
        fontSize: '1rem',
      },
      '@media (min-width: 1200px)': {
        padding: '0 0 0 0.8vw',
        borderRadius: '0.4vw',
        height: '2.5vw',
      },
      '&:hover, &:focus': {

        outline: 'none',
      },
      '&::placeholder': {
        fontFamily: `${fonts.fontType.roboto} !important`,
        // fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
        '@media (min-width: 1200px)': {
          fontSize: '0.7vw !important',
        },
        color: `${colors.placeHolderColor}!important`,
        letterSpacing: 1,
        // [theme.breakpoints.down('md')]: {
        //   fontSize: '12px !important',
        // },
      },
    },
    '& .PhoneInputCountry': {
      marginRight: 0,
      paddingLeft: 5,
      display: 'none',
    },
    '& .PhoneInputCountrySelect': {

    },
    '& .PhoneInputCountryIcon': {
      border: 4,
      marginLeft: 10,
    },
    '& input': {
      // fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw !important',
      },
      color: '#696969 !important',
      // [theme.breakpoints.down('md')]: {
      // },
      '&::placeholder': {
        fontFamily: `${fonts.fontType.roboto} !important`,
        fontSize: '14px !important',
        color: `${colors.placeHolderColor} !important`,
        letterSpacing: 1,
        [theme.breakpoints.down('md')]: {
          // fontSize: '12px !important',
        },
      },
    },
  },
  inputStyle: {
    borderColor: colors.primary,
  },
  errorBorder: {
    border: `0.1vw solid ${colors.errorText}`,
    '&:focus-within, &.PhoneInput--focus': {

    },
  },
}));

export default style;
