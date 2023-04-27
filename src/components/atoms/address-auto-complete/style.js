import { colors, fonts } from '../../../theme';

const style = ((theme) => ({
  addressAutoComplete: {
    // border: `0.1vw solid ${colors.primary}`,
    border: `0.1vw solid ${colors.formBorder}`,
    background: 'white',
    borderRadius: '0.4vw',
    padding: '0.8vw',
    [theme.breakpoints.down('md')]: {
      // fontSize: '1rem',
      borderRadius: '5px',
    },
    '@media (max-width: 1199px)': {
      padding: '16.5px 14px',
    },
    fontSize: 'calc(14px + 6 * ((100vw - 320px) / 1199))',
    '@media (min-width: 1200px)': {
      // width: '94.8%',
      padding: '0.7vw 1vw 0.7vw 0.7vw',
      fontSize: '0.9vw',
    },
    '&:hover': {
      border: `0.1vw solid ${colors.primary}`,
      outline: 'none',
    },
    '&:focus, &:focus-visible': {
      border: `0.2vw solid ${colors.primary}`,
      outline: 'none',
    },
    '&::placeholder': {
      fontFamily: `${fonts.fontType.roboto} !important`,
      // fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
      },
      color: `${colors.placeHolderColor}!important`,
      letterSpacing: 1,
    },
  },
  formControl: {
    width: '100%',
    marginLeft: '0',
    marginRight: '0',
    '& .MuiInputLabel-root': {
      fontFamily: fonts.fontType.roboto,
      color: colors.black,
    },
  },
  addressStyle: {
    '& input': {
      borderColor: colors.primary,
    },
  },
  error: {
    border: `1px solid ${colors.errorText}`,
    '&:hover, &:focus, &:focus-visible': {
      border: `2px solid ${colors.errorText}`,
      outline: 'none',
    },
  },
}));

export default style;
