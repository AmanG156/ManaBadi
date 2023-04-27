import { colors, fonts } from '../../theme';

const paypalCheckoutStyle = () => ({
  mainContainer: {
    justifyContent: 'center',
  },
  root: {
    boxShadow: 'none !important',
    justifyContent: 'center',
    background: 'rgb(228, 245, 253)',
    paddingTop: 0,
    width: '80%',
    margin: 'auto',
    '@media (max-width: 900px)': {
      width: '100%',
    },
  },
  successContent: {
    margin: '0 0 0.654vw 0',
  },
  headerLogo: {
    cursor: 'pointer',
    '@media (max-width: 499px)': {
      width: '100%',
      maxWidth: '441px',
    },
    '@media (min-width: 1200px)': {
      width: '30vw',
    },
  },
  successText: {
    fontFamily: fonts.fontType.roboto,
    fontStyle: 'normal',
    fontSize: 'calc(18px + 6 * ((100vw - 320px) / 680))',
    color: `${colors.primary} !important`,
    background: 'none !important',
    '@media (min-width: 1200px)': {
      fontSize: '1.682vw',
      lineHeight: '2.778vw',
      marginBottom: '0.185vw !important',
      padding: '0.278vw',
    },
  },
  successSubtext: {
    fontFamily: fonts.fontType.roboto,
    '@media (min-width: 1200px)': {
      fontSize: '0.841vw',
      lineHeight: '0.981vw',
      padding: '0.140vw',
    },
    fontSize: 'calc(14px + 6 * ((100vw - 320px) / 1199))',
    textAlign: 'center',
    color: colors.black,
    opacity: 0.7,
  },
  successSubtextMail: {
    fontFamily: fonts.fontType.roboto,
    '@media (min-width: 1200px)': {
      fontSize: '0.841vw',
      lineHeight: '0.981vw',
      marginBottom: '0.467vw !important',
      padding: '0.140vw',
    },
    textAlign: 'center',
    color: colors.black,
    opacity: 0.7,
  },
  failedText: {
    fontFamily: fonts.fontType.roboto,
    fontStyle: 'normal',
    color: colors.red,
    padding: 3,
    '@media (min-width: 1200px)': {
      fontSize: '1.402vw',
      lineHeight: '1.402vw',
      marginBottom: '1.402vw !important',
    },
  },
  cardRight: {
    background: colors.white,
    textAlign: 'center',
    '@media (min-width: 1200px)': {
      width: '46.869vw',
      borderRadius: '0.467vw',
      marginTop: '6vh',
    },
    borderRadius: '12px',
    marginTop: '30px',
  },
  successBackgroundImg: {
    padding: '6vh 0 5vh 0',
    width: '20vw',
    '@media (max-width: 1199px)': {
      width: '100%',
      maxWidth: '309px',
      padding: '30px 0 20px 0',
    },
    '@media (max-width: 767px)': {
      width: '100%',
      maxWidth: '280px',
      padding: '20px 0',
    },
  },
});

export default paypalCheckoutStyle;
