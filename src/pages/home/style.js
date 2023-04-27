import loginTree from '../../assets/images/loginTree.png';
import { colors, fonts } from '../../theme';

const homepagestyle = () => ({
  googleButton: {
    textTransform: 'none !important',
    color: `${colors.white} !important`,
    boxShadow: '0 4px 4px -2px hsl(0deg 0% 65% / 25%)',
    boxSizing: 'border-box',
    height: '3vw',
    width: '25vw',
    fontSize: '0.9vw !important',
    fontFamily: fonts.fontType.roboto,
    padding: 8,
    textAlign: 'center',
    background: `${colors.newBGColor} !important`,
    display: 'block !important',
    borderRadius: '0.5vw !important',
    '& button': {
      width: 'calc(100% + 16px)',
      margin: '-8px -8px',
      padding: '0.9vw',
      color: colors.white,
      textTransform: 'inherit',
      fontSize: '0.9vw !important',
    },
    '&.MuiButton-root.MuiButton-textPrimary': {
      marginLeft: '0 !important',
      textTransform: 'none !important',
      color: `${colors.white} !important`,
      boxShadow: '0 4px 4px -2px hsl(0deg 0% 65% / 25%)',
      boxSizing: 'border-box',
      height: '3vw !important',
      width: '25vw',
      fontSize: '0.9vw !important',
      fontFamily: fonts.fontType.roboto,
      padding: 8,
      textAlign: 'center',
      background: `${colors.newBGColor} !important`,
      display: 'block !important',
      borderRadius: '0.5vw !important',
    },
  },
  '&:disabled': {
    cursor: 'not-allowed',
  },
  mainContainer: {
    width: 900,
    justifyContent: 'center',
  },
  textMargin: {
    marginTop: '1vw',
    '& .MuiSvgIcon-root': {
      fill: colors.black,
    },
    '& button': {
      fontFamily: `${fonts.fontType.roboto} !important`,
    },
  },
  wrapper: {
    justifyContent: 'center',
    width: '100%',
    // minHeight: 'calc(100vh)',
    margin: 'auto',
  },
  cardLeft: {
    backgroundImage: `url(${loginTree})`,
    borderRadius: 0,
    boxShadow: 'none',
    textAlign: 'left',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    '@media (max-width: 1024px)': {
      minHeight: 300,
    },
  },
  cardRight: {
    background: '#e4f5fd',
    borderRadius: 0,
    color: 'white',
    textAlign: 'left',
    boxShadow: 'none',
    margin: 'auto',
    fontFamily: fonts.fontType.roboto,
    minWidth: '65%',
    '& .MuiCardContent-root': {
      margin: '0vw 0vw 0vw 6vw',
      width: '25vw',
      padding: '4vw 0 0 0',
    },
  },
  contactUsDes: {
    fontSize: '0.9vw',
    fontWeight: 500,
    textAlign: 'left',
    paddingLeft: 5,
    color: `${colors.black} !important`,
  },
  contactUs: {
    fontSize: '0.9vw',
    fontWeight: fonts.fontWeight.low,
    textAlign: 'left',
    paddingLeft: 5,
    color: colors.black,
  },
  loginButtons: {
    marginLeft: '0px !important',
    width: '100%',
    color: colors.white,
    fontFamily: fonts.fontType.roboto,
  },
  returnText: {
    fontSize: '1.3vw',
    color: colors.black,
    fontFamily: fonts.fontType.roboto,
    fontWeight: 400,
  },
  signInText: {
    fontSize: 14,
    color: colors.blue,
    fontFamily: fonts.fontType.roboto,
    fontWeight: 400,
  },
  recoverPassword: {
    marginTop: '0.5vw',
    fontSize: '0.9vw',
    color: colors.red,
    fontFamily: fonts.fontType.roboto,
    fontWeight: 400,
    cursor: 'pointer',
  },
  headerLogo: {
    height: 'auto',
    width: '30vw',
    padding: '0vw 0vw 1vw 0vw',
    cursor: 'pointer',
    '@media (max-width: 499px)': {
      width: '100%',
      padding: '0',
    },
  },
  helpBox: {
    margin: '1vw 0 0 0',
    '& .MuiTypography-root': {
      margin: '0 0 0px 0',
    },
  },
  divider: {
    margin: '2vw 0',
    width: '25vw',
    '@media (max-width: 1024px)': {
      width: '100%',
    },
  },
  contactUsMargin: {
    '& .MuiSvgIcon-root': {
      fontSize: '1rem',
      fill: colors.black,
      height: 'auto',
    },
    '& .MuiTypography-root': {
      fontFamily: fonts.fontType.roboto,
    },
    marginBottom: '0.8vw',
    '@media (min-width: 900px)': {
      marginLeft: '0.2vw',
    },
  },
  contactUsBox: {
    paddingLeft: '2vw',
  },
  smallTextMargin: {
    width: 'max-content',
    margin: '0 0 0 0',
    display: 'flex',
    '& .MuiSvgIcon-root': {
      fontSize: '1rem',
      fill: colors.black,
      height: 'auto',
      padding: '0 0 0 4px',
    },
    '& .MuiTypography-root': {
      fontFamily: fonts.fontType.roboto,
    },
  },
  helpText: {
    fontWeight: 500,
    textAlign: 'left',
    color: '#373737',
    '& .MuiTypography-root': {
      fontFamily: fonts.fontType.roboto,
      fontSize: '0.9vw',
    },
    '@media (max-width: 900px)': {
      '& .MuiTypography-root': {
        marginBottom: 10,
        fontSize: 14,
        marginTop: 10,
      },
    },
  },
  '@media (max-width: 1024px)': {
    returnText: {
      fontSize: 15,
    },
    googleButton: {
      width: 300,
      height: '45px !important',
      fontSize: '14px !important',
      borderRadius: '8px !important',
      '& button': {
        width: 300,
        height: '45px !important',
        fontSize: '14px !important',
        borderRadius: '8px !important',
      },
      '&.MuiButton-root.MuiButton-textPrimary': {
        width: 300,
        height: '45px !important',
        fontSize: '14px !important',
        borderRadius: '8px !important',
      },
    },
    recoverPassword: {
      fontSize: '14px',
      marginTop: '10px',
    },
    cardRight: {
      '& .MuiCardContent-root': {
        margin: 'auto',
        width: 300,
      },
    },
    helpText: {
      fontSize: 14,
    },
    contactUs: {
      fontSize: 14,
    },
    helpImg: {
      width: '15px !important',
      height: '15px !important',
    },
  },
  mainHomeBox: {
    minHeight: 'calc(100vh)',
    margin: 'auto',
    width: '80%',
    '@media (max-width: 900px)': {
      width: '100%',
    },
  },
  helpImg: {
    width: '1.3vw',
    height: '1.3vw',
  },
});

export default homepagestyle;
