import { colors, fonts } from '../../theme';

const registerstyle = ((theme) => ({
  errorText: {
    color: colors.errorText,
    '@media (min-width: 1200px)': {
      fontSize: '0.7vw',
    },
    marginLeft: 10,
    display: 'block',
  },
  form: {
    width: '100%',
    marginTop: '2vw',
  },
  nextButton: {
    marginLeft: 0,
  },
  // logo: {
  //   background: colors.white,
  // },
  divWrapper: {
    background: colors.white,
    margin: 'auto',
    '@media (min-width: 1200px)': {
      width: '80%',
      padding: 0,
    },
    '@media (max-width: 1199px)': {
      width: '90%',
      padding: 0,
    },
    '@media (max-width: 499px)': {
      width: '98%',
    },
    padding: 45,
  },
  gridContainer: {
    padding: '2vw 3vw !important',
  },
  parentGridContainer: {
    padding: '2vw 2vw !important',
  },
  headerContainer: {
    maxWidth: '98%',
    '& .secButton': {
      minwidth: '1vw',
    },
  },
  // headerLogo: {
  //   height: 'auto',
  //   width: '20vw',
  //   padding: '0vw 4vw 0vw 2vw',
  //   cursor: 'pointer',
  // },
  headerLogo: {
    cursor: 'pointer',
    '@media (max-width: 499px)': {
      width: '100%',
      maxWidth: '380px',
    },
    '@media (min-width: 1200px)': {
      width: '20vw',
    },
  },
  header: {
    background: colors.newBGColor,
    '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
      color: 'white',
      fontSize: '1vw',
      marginTop: '1vw',
      '@media (max-width: 1199px)': {
        fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
      },
      '@media (max-width: 499px)': {
        marginTop: '10px',
      },
    },
    '& .MuiStepLabel-iconContainer': {
      '& div': {
        '@media (min-width: 1200px)': {
          width: '4vw',
          height: '4vw',
        },
      },
      '& img': {
        '@media (min-width: 1200px)': {
          width: '3.5vw',
          height: '3vw',
        },
      },
    },
    '& .MuiStepConnector-line': {
      height: '0.01vw',
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: '0.1vw',
      marginTop: '1.5vw',
      '@media (max-width: 1199px)': {
        height: '1px',
        marginTop: '0',
      },
    },
    marginTop: 0,
    '@media (max-width: 1199px)': {
      padding: '15px',
    },
    '@media (max-width: 499px)': {
      padding: '10px 0',
    },
    '@media (min-width: 1200px)': {
      padding: '1vw 3vw 1vw 2vw',
    },
  },
  headerTitle: {
    fontWeight: fonts.fontWeight.bold,
    textAlign: 'left',
    color: colors.primary,
    paddingLeft: '1vw',
    [theme.breakpoints.down('md')]: {
      fontSize: 16,
    },
    '@media (max-width: 1199px)': {
      fontSize: 'calc(18px + 6 * ((100vw - 320px) / 1199))',
    },
    '@media (max-width: 499px)': {
      // fontSize: '2vw',
    },
    '@media (min-width: 1200px)': {
      fontSize: '2vw',
    },
  },
  studentTitle: {
    fontWeight: fonts.fontWeight.bold,
    fontSize: '2vw',
    textAlign: 'left',
    color: colors.primary,
    marginLeft: '10px',
    [theme.breakpoints.down('md')]: {
      fontSize: 16,
    },
  },
  '.MuiSvgIcon-root': {
    fontSize: '0.5vw',
  },
}));

export default registerstyle;

export const customCss = {
  minWidth: '2vw',
  height: '3vw',
  padding: '1vw 1vw 1.2vw 1.2vw',
  borderRadius: '0.4vw !important',
  '& .MuiButtonRoot': {
    minWidth: '2vw !important',
  },
  // '@media (max-width:1199px)': {
  //   display: 'none',
  // },

  // },

};
