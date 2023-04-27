import { colors, fonts } from '../../../theme';

const parentInfoStyle = () => ({
  errorText: {
    color: colors.errorText,
    fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    '@media (min-width: 1200px)': {
      fontSize: '0.7vw',
    },
    display: 'block',
  },
  heading: {
    color: colors.footerBottomColor,
    padding: '0 0 0.5vw 0',
    fontWeight: 500,
    width: '97%',
    fontSize: '1.5vw',
    marginTop: '1.5vw',
    borderRadius: '0.4vw',
    marginLeft: '1vw',
    '@media (max-width: 1199px)': {
      fontSize: 'calc(14px + 6 * ((100vw - 320px) / 1199))',
    },
    '@media (max-width: 899px)': {
      marginTop: '20px',
    },
  },
  button: {
    justifyContent: 'flex-end',
    // margin: '10px 4px 3px 1px',
    width: '98%',
  },
  innerContainer: {
    fontFamily: fonts.fontType.roboto,
    margin: '0',
    '& .MuiGrid-item': {
      '@media (max-width: 899px)': {
      // padding: '0',
      },
    },
    '@media (min-width: 1200px)': {
      margin: '0.3vw 0.3vw',
      '& .MuiOutlinedInput-root': {
        '@media (min-width: 1200px)': {
          height: '2.692vw',
          borderRadius: '0.4vw',
          width: '100%',
          fontSize: '0.9vw',
          marginTop: '0.4vw',
        },
      },
    },
    '@media (max-width: 1023px), @media (min-width: 375px)': {
      // width: '97%',
      // margin: '0 0 0 10px',
      '& .MuiFormControl-root': {
        // margin: '10px 0 0 0',
      },
    },
  },
  alignGridTitle: {
    '@media (min-width: 1200px)': {
      '&.MuiGrid-root.MuiGrid-item': {
        width: '20%',
        flexBasis: '20%',
        padding: '0 0.2vw',
        maxWidth: 'initial',
      },
      '& .MuiFormControl-root': {
        margin: '0.6vw !important',
        marginLeft: '0px !important',
        width: '100%',
        marginRight: '0.8vw !important',
        marginBottom: '5px !important',
        outline: 'none',
        '& .MuiFormControl-root': {
          margin: '0 !important',
          width: '100%',
        },
        '& .MuiOutlinedInput-root': {
          // width: '13.5vw',
        },
      },
    },
  },
  checkboxColor: {
    color: `${colors.primary} !important`,
    '& .MuiSvgIcon-root': {
      color: `${colors.primary} !important`,
    },
  },
  alignGridFirstName: {
    width: '100%',
    '@media (min-width: 1200px)': {
      '&.MuiGrid-root.MuiGrid-item': {
        width: '30%',
        flexBasis: '30%',
        padding: '0 0.3vw',
        maxWidth: 'initial',
      },
      '& .MuiFormControl-root': {
        margin: '0.6vw 0 !important',
        width: '100%',
        '& .MuiFormControl-root': {
          margin: '0 0vw !important',
          width: '100%',
          padding: '0 0vw',
        },
      },
    },
  },

  alignGridMiddleName: {
    '@media (min-width: 1200px)': {
      '&.MuiGrid-root.MuiGrid-item': {
        width: '20%',
        flexBasis: '20%',
        padding: '0 0.2vw',
        maxWidth: 'initial',
      },
      '& .MuiFormControl-root': {
        margin: '0.6vw !important',
        marginLeft: '0vw !important',
        width: '100%',
        marginRight: '0px !important',
        '& .MuiFormControl-root': {
          margin: '0 !important',
          width: '100%',
        },
      },
    },
  },
  activeButton: {
    color: '#f3f8fe !important',
    borderRadius: '4px',
    '@media (min-width: 1200px)': {
      height: '2.5vw !important',
      padding: '0.8vw',
      minWidth: '13vw !important',
      marginLeft: '1.2vw',
      marginRight: '1vw',
      borderRadius: '0.4vw !important',
      fontSize: '1vw',
    },
    boxShadow: '0 4px 4px -2px hsl(0deg 0% 65% / 25%)',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    textTransform: 'none !important',
    background: `${colors.newBGColor} !important`,
  },
  secButton: {
    color: '#1976d2 !important',
    border: '0.1px solid #1976d2',
    borderRadius: '4px',
    '@media (min-width: 1200px)': {
      height: '2.5vw !important',
      padding: '0.8vw',
      minWidth: '13vw !important',
      marginLeft: '1.2vw',
      fontSize: '1vw',
      borderRadius: '0.4vw !important',
    },
    background: 'white',
    boxShadow: '0 2px 5px rgb(0 0 0 / 16%), 0 2px 10px rgb(0 0 0 / 12%) !important',
    boxSizing: 'border-box',
    fontFamily: 'Roboto, sans-serif',
    textTransform: 'none',
    '& .MuiSvgIcon-root': {
      width: '0.8vw',
      height: '0.8vw',
    },
  },
  footerBottom: {
    background: colors.footerBottomColor,
    marginTop: '-1vw',
    height: '0.2vw',
    display: 'block',
    width: '96%',
    marginLeft: '1.5vw',
  },
  alignGridLastName: {
    '@media (min-width: 1200px)': {
      '&.MuiGrid-root.MuiGrid-item': {
        width: '30%',
        padding: '0 0.4vw',
        flexBasis: '30%',
        maxWidth: 'initial',
      },
      '& .MuiFormControl-root': {
        margin: '0.6vw !important',
        marginLeft: '0vw !important',
        width: '100%',
        marginRight: '0px !important',
        '& .MuiFormControl-root': {
          margin: '0 !important',
          width: '100%',
        },
      },
    },
  },
  form: {
    marginTop: '0 !important',
  },
  speakTelugu: {
    marginLeft: '-1px !important',
  },
  readTelugu: {
    marginLeft: '-1px !important',
  },
  checkboxForStudent: {
    marginLeft: '-0.2% !important',
    '& .MuiFormControlLabel-root': {
      marginLeft: '2px !important',
    },
  },
  alignTextGrid: {
    '@media (min-width: 1200px)': {
      '&.MuiGrid-root.MuiGrid-item': {
        padding: '0 0.3vw',
      },
      '& .MuiFormControlLabel-root': {
        marginLeft: '-2px',
        '& span': {
          paddingLeft: '0',
        },
      },
      '& .MuiFormControlLabel-label': {
        marginLeft: '0vw !important',
        marginTop: '0.1vw',
      },
    },
    '& .MuiFormControlLabel-labelPlacementEnd': {
      width: 'max-content',
    },
    '& .MuiBox-root': {
      '@media (min-width: 1200px)': {
        height: '3vw',
      },
    },
    '& .PhoneInput': {
      '@media (min-width: 1200px)': {
        width: '99.58%',
        // height: '2.6vw !important',
        marginTop: '0.4vw !important',
      },
    },
    '& .MuiFormControl-root': {
      marginLeft: '0px !important',
      marginRight: '0px !important',
      '@media (min-width: 1200px)': {
        width: '100%',
        height: '2.692vw',
      },
      '@media (max-width: 899px)': {
        marginLeft: '0px !important',
        marginRight: '0px !important',
        marginTop: '0px !important',
      },
      '& .MuiInputLabel-root': {
        '@media (min-width: 1200px)': {
          marginTop: '0.4vw',
          paddingLeft: '0.9vw',
          transform: 'translate(0.3vw, 0.4vw) scale(1)',
        },
      },
      '& .MuiFormControl-root': {
        margin: '0 !important',
        width: '100%',
      },
      '& .MuiTextField-root .MuiOutlinedInput-root': {
        width: '100%',
        borderRadius: '0.4vw',
      },

      // '@media (max-width: 1199px), @media (min-width: 375px)': {
      //   '& .MuiFormControl-root': {
      //     width: '96.5%',
      //   },
      //   '& .MuiOutlinedInput-root': {
      //     width: '96%',
      //     borderRadius: 8,
      //   },
      // },
      '@media (max-width: 1455px)': {
        '& .MuiBox-root': {
          maxWidth: '88% !important',
        },
      },
    },
  },
  viewLogs: {
    display: 'flex',
    color: colors.actionIconsColor,
    textDecoration: 'underline',
    cursor: 'pointer',
    marginLeft: '-3.5vw',
    paddingTop: '1.8vw',
  },
  alignRight: {
    textAlign: 'right',
  },
  commonButtonNew: {
    minWidth: '2vw !important',
    height: '3vw !important',
    padding: '1vw 1vw 1.2vw 1.2vw !important',
    '@media (max-width: 1199px)': {
      height: 'auto !important',
      padding: '5px 8px !important',
      minWidth: 'auto !important',
      borderRadius: '12px !important',
    },
    '@media (max-width: 499px)': {
      height: 'auto !important',
      padding: '5px 8px !important',
      minWidth: 'auto !important',
    },
    '& svg': {
      '@media (max-width: 1199px)': {
        width: '16px !important',
        height: '16px !important',
      },
    },
  },
});

export default parentInfoStyle;
