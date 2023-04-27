import { colors, fonts } from '../../../theme';

const style = ((theme) => ({
  addressAutoComplete: {
    border: `0.1vw solid  ${colors.primary}`,
    background: 'white',
    borderRadius: '4px',
    fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    '@media (min-width: 1200px)': {
      minHeight: '2.7vw',
      borderRadius: '0.4vw',
      paddingLeft: '0.7vw',
      // width: '91%',
      fontSize: '0.9vw',
    },
    '@media (max-width: 1199px)': {
      minHeight: '52px',
      paddingLeft: '15px',
    },
    '@media (max-width: 900px)': {
      minHeight: '60px',
    },
    '@media (max-width: 600px)': {
      minHeight: '60px',
    },
    '&:focus, &:focus-visible': {
      border: `0.2vw solid ${colors.primary}`,
      outline: 'none',
    },
    '&::placeholder': {
      fontFamily: `${fonts.fontType.roboto} !important`,
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw !important',
      },
      color: `${colors.placeHolderColor}!important`,
      letterSpacing: 1,
    },
  },
  formControl: {
    '@media (min-width: 1200px)': {
      minWidth: '100%',
    },
    '& .MuiInputLabel-root': {
      fontFamily: fonts.fontType.roboto,
      color: colors.primary,
      background: 'white',
      minWidth: 120,
      display: 'inline-block',
      paddingLeft: 6,
      letterSpacing: 0.5,
      width: 'calc(100% - 80%) !important',
      fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
      '@media (min-width: 1200px)': {
        fontSize: '0.7vw !important',
      },
      transform: 'translate(11px, -7px) scale(1)',
      [theme.breakpoints.down('md')]: {
        // fontSize: '10px !important',
      },
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
