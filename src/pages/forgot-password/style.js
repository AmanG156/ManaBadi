import { colors, fonts } from '../../theme';
import Key from '../../assets/images/keyIcon.png';

const forgotpasswordstyle = () => ({
  dialogAtom: {
    '& .MuiDialogContent-root': {
      '& .MuiGrid-root': {
        '@media (min-width: 1200px)': {
          lineHeight: '1.5vw',
        },
      },
    },
  },
  activeButtonNew: {
    color: '#f3f8fe !important',
    padding: '0.8vw',
    minWidth: '15vw',
    boxShadow: '0 4px 4px -2px hsl(0deg 0% 65% / 25%)',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    marginLeft: '1.2vw',
    marginRight: '1vw',
    borderRadius: '0.4vw',
    textTransform: 'none !important',
    background: `${colors.newBGColor} !important`,
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
      height: '2.5vw',
    },
    '@media (max-width: 1199px)': {
      fontSize: 'calc(12px + 6 * ((100vw - 320px) / 680))',
      width: '100%',
      maxWidth: '15vw',
      borderRadius: '8px',
      height: '40px',
    },
    '@media (max-width: 899px)': {
      maxWidth: '20vw',
    },
  },
  secButtonNew: {
    color: '#1976d2 !important',
    border: '0.1px solid #1976d2',
    padding: '0.8vw',
    minWidth: '15vw',
    background: 'white',
    boxShadow: '0 2px 5px rgb(0 0 0 / 16%), 0 2px 10px rgb(0 0 0 / 12%) !important',
    boxSizing: 'border-box',
    fontFamily: 'Roboto, sans-serif',
    marginLeft: '1.2vw',
    borderRadius: '0.4vw',
    textTransform: 'none',
    fontSize: 'calc(18px + 6 * ((100vw - 320px) / 680))',
    '& .MuiSvgIcon-root': {
      width: '0.8vw',
      height: '0.8vw',
    },
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
      height: '2.5vw',
    },
    '@media (max-width: 1199px)': {
      fontSize: 'calc(12px + 6 * ((100vw - 320px) / 680))',
      width: '100%',
      maxWidth: '15vw',
      borderRadius: '8px',
      height: '40px',
    },
    '@media (max-width: 899px)': {
      maxWidth: '20vw',
    },
  },
  mainContainer: {
    justifyContent: 'center',
  },
  topContainer: {
    justifyContent: 'center',
  },
  keyImage: {
    backgroundImage: `url(${Key})`,
    backgroundRepeat: 'no-repeat',
    minHeight: '85px',
    maxWidth: '80%',
    marginLeft: 'auto',
    '@media (min-width: 1200px)': {
      minHeight: '7.3vw !important',
    },
    backgroundSize: 'contain',
    backgroundPosition: 'center',
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
  additionalHelp: {
    margin: '2vw 0',
    fontSize: 18,
    '& .MuiSvgIcon-root': {
      fill: colors.black,
    },
  },
  helpText: {
    textAlign: 'left',
    marginBottom: 10,
    fontSize: '1vw',
    lineHeight: '1.3vw',
    '@media (max-width: 1199px)': {
      justifyContent: 'center',
    },
  },
  passwordImg: {
  },
  imageCard: {
    zIndex: 999,
    alignSelf: 'flex-end',
    '@media (max-width: 900px), @media (min-width: 375px)': {
      display: 'none',
    },
  },
  passwordGrid: {
    fontFamily: fonts.fontType.roboto,
  },
  passwordCard: {
    maxWidth: '100%',
    margin: '0 auto',
  },
  BtnGroup: {
    '& .MuiButton-root': {
      fontSize: 'calc(14px + 6 * ((100vw - 320px) / 680))',
      '@media (min-width: 1200px)': {
        fontSize: '1vw',
        height: '2.5vw',
      },
    },
  },
  girlBG: {
    position: 'absolute',
    maxWidth: '230px',
    left: '0px',
    zIndex: '2',
    marginTop: '2.28%',
    '@media (max-width: 900px)': {
      marginTop: '1.85%',
    },
    '@media (max-width: 499px)': {
      display: 'none',
    },
    '@media (min-width: 6699px)': {
      display: 'none',
    },
  },
  cardRightOuter: {
    position: 'relative',
    width: '100%',
  },
  cardRight: {
    maxWidth: 'calc(100% - 22.1%)',
    zIndex: 1,
    '@media (max-width: 900px)': {
      maxWidth: 'calc(100% - 17.6%)',
    },
    '@media (max-width: 499px)': {
      maxWidth: '100%',
    },
  },
  girlBgImg: {
    width: '19.2vw',
  },
  cardRightAll: {
    background: '#fff',
    boxShadow: '4px 4px 20px 12px rgba(240, 240, 240, 0.25)',
    padding: '6vh 0vw',
    textAlign: 'center',
    '@media (min-width: 1500px)': {
      minHeight: 'calc(100vh - 52vh)',
    },
  },
  EnterStudentText: {
    fontSize: 'calc(18px + 6 * ((100vw - 320px) / 680))',
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: '3vh',
    '@media (min-width: 1200px)': {
      fontSize: '1.32vw',
    },
  },
  forgotYourPassword: {
    fontSize: '1.67vw',
    fontWeight: fonts.fontWeight.bold,
    textAlign: 'center',
    color: colors.red,
    '& h1': {
      marginTop: '0',
    },
  },
  emailNew: {
    marginBottom: '3vh',
    '& .MuiFormControl-root': {
      margin: '0 !important',
    },
    '& .MuiTextField-root': {
      maxWidth: '80%',
      margin: '0 auto !important',
      width: '100%',
      '& .MuiOutlinedInput-root': {
        height: 'auto',
        paddingLeft: '1vw',
        '& .MuiInputAdornment-root': {
          gap: '0 .3vw',
          alignItems: 'center',
          lineHeight: '0',
        },
        '& b': {
          '@media (max-width: 1199px)': {
            fontSize: '12px !important',
            paddingLeft: '4px',
          },
        },
        '& input': {
          '@media (max-width: 1199px)': {
            fontSize: '12px !important',
            padding: '16.5px 1vw',
          },
        },
      },
    },
  },
  footer: {
    marginLeft: '0 !important',
    width: '100%',
    padding: 10,
    fontSize: '1vw',
    textAlign: 'center',
    color: colors.black,
    overflowWrap: 'break-word',
  },
  contactUsDes: {
    fontSize: '1.04vw',
    fontWeight: 500,
    textAlign: 'left',
    justifyContent: 'center',
    paddingLeft: '0.5vw',
    color: colors.black,
  },
  smallTextMargin: {
    display: 'flex',
    '& .MuiSvgIcon-root': {
      fill: colors.black,
      height: 'auto',
    },
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
  errorText: {
    color: colors.errorText,
    fontSize: 'calc(12px + 6 * ((100vw - 320px) / 680))',
    fontWeight: fonts.fontWeight.low,
    fontFamily: `${fonts.fontType.roboto} !important`,
    display: 'block',
    textAlign: 'left',
    maxWidth: '80%',
    margin: '5px auto 0',
    paddingLeft: '25px',
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
  },
  dialogHeader: {
    fontWeight: 500,
  },
  contactUsMargin: {
    '@media (max-width: 1199px)': {
      justifyContent: 'center',
    },
    '& .MuiSvgIcon-root': {
      fill: colors.black,
      height: 'auto',
    },
    '& .MuiTypography-root': {
      fontFamily: fonts.fontType.roboto,
    },
  },
  imgSize: {
    width: '1vw',
    height: '1vw',
  },
  '@media (max-width: 1024px)': {
    keyImage: {
      minHeight: '60px !important',
    },
    helpText: {
      fontSize: 12,
      marginTop: 10,

    },
    imgSize: {
      width: '15px !important',
      height: '15px !important',
    },
  },
  '@media (max-width: 499px)': {
    keyImage: {
      maxWidth: '100%',
    },
    forgotYourPassword: {
      fontSize: 14,
    },
  },
});

export default forgotpasswordstyle;

export const customBtnCss = {
  '&.MuiButtonRoot': {
    minWidth: 20,
  },
};
