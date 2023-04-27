import { colors, fonts } from '../../../theme';

const swapcoursestyle = () => ({
  errorText: {
    color: colors.errorText,
    fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    '@media (min-width: 1200px)': {
      fontSize: '0.7vw',
      marginTop: '0.3vw',
      marginLeft: '0.2vw',
    },
    display: 'block',
  },
  button: {
    justifyContent: 'flex-end',
    margin: '10px 4px 3px 1px',
    width: '98%',
  },
  innerContainer: {
    margin: '0.3vw 0.6vw',
    fontFamily: fonts.fontType.roboto,
    '@media (max-width: 1023px), @media (min-width: 375px)': {
      width: '97%',
      margin: '0',
      '& .MuiFormControl-root': {
        margin: '10px 0 0 0',
      },
    },
    '& .MuiOutlinedInput-root': {
      '@media (min-width: 1200px)': {
        height: '2.692vw',
      },
      borderRadius: '0.4vw',
      width: '100%',
      '& .MuiSelect-select': {
        minHeight: '0vw !important',
        // minWidth: '50vh',
        // width: '80vh',
      },
    },
    '& .MuiFormControl-root .MuiInputLabel-root': {
      '@media (min-width: 1200px)': {
        lineHeight: '0.9vw !important',
        fontSize: '0.9vw',
        paddingLeft: '0.4vw',
        letterSpacing: 1,
      },
      color: `${colors.primary} !important`,
      transform: 'translate(0.5vw, 0.9vw)',
      '&.MuiInputLabel-shrink': {
        transform: 'translate(0.4vw, -0.5vw)',
        fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
        '@media (min-width: 1200px)': {
          fontSize: '0.7vw',
        },
        '@media (max-width: 1200px)': {
          lineHeight: '0.8',
        },
      },
    },
  },
  form: {
    marginTop: '0 !important',
  },
  locationSwap: {
    '@media (min-width: 1200px)': {
      width: '50vw',
      minWidth: '24vw',
      maxWidth: '50vw',
    },
  },
  tenantUserWidth: {
    paddingLeft: '0 !important',
    paddingRight: 15,
  },
});

export default swapcoursestyle;
