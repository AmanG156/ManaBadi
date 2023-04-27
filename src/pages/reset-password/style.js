import { colors, fonts } from '../../theme';
import Key from '../../assets/images/keyIcon.png';

const resetpasswordstyle = () => ({
  mainContainer: {
    textAlign: 'center',
    padding: '2vw 0',
    justifyContent: 'center',
    maxHeight: '27vw',
    borderRadius: '1vw',
  },
  topContainer: {
    textAlign: 'center',
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
    '@media (max-width: 1024px)': {
      minHeight: '60px !important',
    },
    '@media (max-width: 499px)': {
      maxWidth: '100%',
    },
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },

  root: {
    boxShadow: 'none !important',
    justifyContent: 'center',
    background: 'rgb(228, 245, 253)',
    // height: '100vh',
    paddingTop: 0,
    margin: 'auto',
    width: '80%',
    '@media (max-width: 900px)': {
      width: '100%',
    },
  },
  textMargin: {
    margin: '2vw 0',
    '& .MuiSvgIcon-root': {
      fill: colors.black,
    },
  },
  helpText: {
    textAlign: 'left',
    marginBottom: '0.9vw',
    fontSize: '1vw',
    lineHeight: '1.3vw',
  },
  successContent: {
    margin: '0 auto 1.1vw auto',
    maxWidth: '660px',
    '@media (max-width: 499px)': {
      padding: '5%',
    },
  },
  successText: {
    fontFamily: fonts.fontType.roboto,
    fontStyle: 'normal',
    fontWeight: 400,
    '@media (min-width: 1200px)': {
      fontSize: '1.5vw',
      lineHeight: '1.6vw',
    },
    color: '#104F96',
  },
  successSubtext: {
    fontFamily: 'Roboto',
    fontFtyle: 'normal',
    fontWeight: 400,
    '@media (min-width: 1200px)': {
      fontSize: '1.32vw',
      lineHeight: '1.5vw',
    },
    textAlign: 'center',
    color: '#000000',
    opacity: 0.7,
  },
  passwordImg: {
  },
  imageCard: {
    zIndex: 999,
    alignSelf: 'center',
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
    paddingLeft: 50,
    paddingBottom: 100,
  },
  activeButtonNew: {
    color: '#f3f8fe !important',
    height: '40px',
    padding: '0.8vw',
    minWidth: '15vw',
    boxShadow: '0 4px 4px -2px hsl(0deg 0% 65% / 25%)',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    marginLeft: '1.2vw',
    marginRight: '1vw',
    borderRadius: '0.4vw !important',
    textTransform: 'none !important',
    background: `${colors.newBGColor} !important`,
    fontSize: 'calc(18px + 6 * ((100vw - 320px) / 680))',
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
      height: '2.5vw',
      margin: '0 2.35vw 0 0px',
      maxWidth: '215px',
    },
    '@media (max-width: 1199px)': {
      fontSize: '14px',
      margin: '0 calc(45px + 0.8vw) 0 0',
      borderRadius: '8px',
      padding: '0 30px 0px 30px',
    },
    '@media (max-width: 499px)': {
      fontSize: '12px',
    },
  },
  BtnGroup: {
    display: 'flex',
    // marginTop: '0.9vw',
    // marginRight: '2.9vw !important',
    // '& .MuiButton-root': {
    //   minWidth: '10vw',
    // },
    // '@media (max-width: 1200px), @media (min-width: 375px)': {
    //   '& .MuiButton-root': {
    //     marginLeft: '1% !important',
    //     minWidth: '150px !important',
    //     height: 40,
    //     fontSize: 12,
    //     borderRadius: '8px !important',
    //   },
    // },
    // '@media (max-width: 374px), @media (min-width: 260px)': {
    //   '& .MuiButton-root': {
    //     marginLeft: '1% !important',
    //     minWidth: '90px !important',
    //   },
    // },
  },
  // cardRight: {
  //   background: 'white',
  //   textAlign: 'center',
  //   width: '100%',
  //   '& label.MuiInputLabel-root': {
  //     marginTop: '-0.4vw',
  //     fontSize: '0.9vw !important',
  //   },
  // },
  iconField: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 40,
    '& button': {
      padding: '0',
      '@media (max-width: 1199px)': {
        padding: '12px',
      },

      '& svg': {
        '@media (min-width: 1200px)': {
          width: '1.6vw',
          height: '1.6vw',
        },
      },
    },
    '& .MuiFormControl-root': {
      marginLeft: '0',
      '& .MuiOutlinedInput-root': {

        '@media (min-width: 1200px)': {
          height: '2.7vw',
          outline: 'none',
          fontSize: '0.9vw',
        },
        '@media (max-width: 1199px)': {
          height: 'unset',
          outline: 'none',
          fontSize: '18px',
        },
        // '@media (max-width: 499px)': {
        //   fontSize: 12,
        // },

        '& input': {
          '@media (min-width: 1200px)': {
            fontSize: '0.9vw',
          },
          '@media (max-width: 1199px)': {
            fontSize: '18px !important',
            padding: '10px',
          },
          '@media (max-width: 499px)': {
            fontSize: '14px !important',
          },
        },
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
    maxWidth: 'calc(100% - 23.8%)',
    zIndex: 1,
    '@media (min-width: 1900px)': {
      maxWidth: 'calc(100% - 22.8%)',
    },
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
  errorText: {
    color: colors.errorText,
    textAlign: 'left',
    marginLeft: 40,
    '@media (min-width: 1200px)': {
      fontSize: '0.85vw',
    },
    '@media (max-width: 1199px)': {
      fontSize: 16,
    },
    '@media (max-width: 499px)': {
      fontSize: 12,
    },
    paddingBottom: 25,
    // display: 'block',
    // textAlign: 'left',
    // marginLeft: '0.3vw',
  },
  textBoxIcon: {
    paddingRight: '0.3vw',
  },
  textFieldNew: {
    display: 'none',
  },
  pleaseEnter: {
    fontSize: 'calc(18px + 6 * ((100vw - 320px) / 680))',
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: '3vh',
    '@media (min-width: 1200px)': {
      fontSize: '1.32vw',
    },
  },
  resetYourPassword: {
    fontSize: '1.67vw',
    fontWeight: fonts.fontWeight.bold,
    textAlign: 'center',
    color: colors.red,
    '& h1': {
      marginTop: '0',
    },
  },
  resetButton: {
    color: colors.primaryGradient,
  },
  footer: {
    marginLeft: '0 !important',
    width: '100%',
    // background: colors.primary,
    padding: '0.9vw',
    fontSize: '1vw',
    textAlign: 'center',
    color: colors.black,
    overflowWrap: 'break-word',
  },
  contactUsDes: {
    fontSize: '1vw',
    fontWeight: 500,
    textAlign: 'left',
    paddingLeft: '0.4vw',
    color: colors.black,
  },
  smallTextMargin: {
    margin: '0.9vw 0 0 0',
    display: 'flex',
    '& .MuiSvgIcon-root': {
      fill: colors.black,
      height: 'auto',
      padding: '0 0 0 0.4vw',
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
  dialogAtom: {
    '& .MuiDialogContent-root': {
    },
    '& .MuiGrid-root': {
      '@media (min-width: 1200px)': {
        fontSize: '1vw',
        lineHeight: '1.5vw',
      },
      '& .MuiButton-root': {
        marginRight: '1vw',
      },
    },
  },
  passwordsText: {
    fontSize: 'calc(14px + (18 - 14) * ((100vw - 300px) / (1600 - 300)))',
    textAlign: 'left',
    marginLeft: 40,
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
  },
  alignContactText: {
    display: 'flex',
    marginTop: 5,
  },
  // passwordsText: {
  //   fontSize: '0.9vw',
  //   display: 'flex',
  //   maxWidth: '100%',
  //   marginLeft: '4.5vw',
  //   '& .MuiFormControl-root': {
  //     width: '25vw',
  //     margin: '0.4vw 0.3vw 0.4vw 0.4vw',
  //   },
  //   '& .MuiSvgIcon-root': {
  //     width: '1.5vw',
  //     height: '1.5vw',
  //   },
  // },
  // displayFlex: {
  //   display: 'flex',
  //   maxWidth: '100%',
  //   marginLeft: '5.5vw',
  //   '& .MuiFormControl-root': {
  //     width: '25vw',
  //     margin: '0.4vw 0.3vw 0.4vw 0.4vw',
  //     '& .MuiFormControl-root': {
  //       width: '25vw',
  //       margin: '0',
  //     },
  //   },
  //   '& .MuiSvgIcon-root': {
  //     width: '1.5vw',
  //     height: '1.5vw',
  //   },
  // },
  match: {
    display: 'flex',
    color: colors.passwordGreen,
    marginBottom: '0.5vh',
    '@media (min-width: 1200px)': {
      fontSize: '0.85vw',
    },
    '@media (max-width: 1199px)': {
      fontSize: 16,
    },
    '@media (max-width: 499px)': {
      fontSize: 12,
    },
  },
  unmatch: {
    display: 'flex',
    color: colors.red,
    marginBottom: '0.5vh',
    '@media (min-width: 1200px)': {
      fontSize: '0.85vw',
    },
    '@media (max-width: 1199px)': {
      fontSize: 16,
    },
    '@media (max-width: 499px)': {
      fontSize: 12,
    },
  },
  errorGrid: {
    // height: '10px',
    // marginLeft: '6.5vw',
    // marginBottom: '1vw',
  },
  fontSize: {
    fontSize: '0.8vw',
  },
  contactUsMargin: {
    marginBottom: '0.4vw',
  },
  imgSize: {
    width: '1.5vw',
    height: '1.5vw',
  },
  resetImgSize: {
    '@media (min-width: 1200px)': {
      width: '11vw',
      height: '8vw',
    },
  },
  '& legend': {
    maxWidth: '100%',
  },
  iconClass: {
    padding: 0,
    '& .MuiSvgIcon-root': {
      width: '1.5vw',
      height: '1.5vw',
    },
  },
  passwordRules: {
    marginBottom: '1vw',
    width: '100%',
    marginLeft: 40,
    '& .MuiSvgIcon-root': {
      fontSize: '1.2em',
      // width: '1vw !important',
      // height: '1vw !important',
    },
  },
  '@media (max-width: 1024px)': {
    mainContainer: {
      padding: '5vw 2vw',
    },
    imgSize: {
      width: 15,
      height: 15,
    },
    // resetYourPassword: {
    //   fontSize: 24,
    // },
    // pleaseEnter: {
    //   fontSize: 16,
    // },
    helpText: {
      fontSize: 12,
      marginBottom: 10,
      marginTop: 10,
    },
    // unmatch: {
    //   fontSize: 11,
    // },
    // match: {
    //   fontSize: 11,
    // },
    // passwordRules: {
    //   width: '74%',
    // },
    iconClass: {
      '& .MuiSvgIcon-root': {
        width: '0.9em',
        height: '0.7em',
      },
    },
    fontSize: {
      fontSize: 11,
    },
    displayFlex: {
      maxWidth: '100%',
      '& div': {
        textAlign: 'left',
      },
    },
    textMargin: {
      width: '74%',
    },
    // errorText: {
    //   fontSize: 11,
    // },
  },
  '@media (max-width: 499px)': {
    keyImage: {
      maxWidth: '100%',
    },
    resetYourPassword: {
      fontSize: 14,
    },
  },
});

export default resetpasswordstyle;

export const customBtnCss = {
  minWidth: 100,
  height: 40,
  marginBottom: 10,
  '&.MuiButtonRoot': {
    minWidth: 20,
  },
};
