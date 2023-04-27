import { colors, fonts } from '../../../theme';

const buttonStyle = (theme) => ({
  icon: {
    marginTop: '0.5vw',
    '@media (max-width: 1199px)': {
      lineHeight: 'initial',
    },
  },
  iconButton: {
    '&.MuiButtonBase-root.MuiButton-root': {
      fontFamily: fonts.fontType.roboto,
      textTransform: 'none !important',
      '@media (min-width: 1200px)': {
        height: '2.7vw',
        marginLeft: '15px',
        minWidth: 'max-content !important',
        fontSize: '1vw',
      },
      color: `${colors.actionIconsColor} !important`,
      background: 'none !important',
      display: 'flex  !important',
      textAlign: 'right  !important',
      justifyContent: 'end  !important',
      '& .MuiSvgIcon-root': {
        '@media (min-width: 1200px)': {
          width: '1vw',
          height: '0.8vw',
          paddingRight: 5,
        },
      },
      '&:hover': {
        background: colors.white,
      },
      '& .svg': {
        height: 5,
      },
    },
  },
  primaryButton: {
    '&.MuiButtonBase-root.MuiButton-root': {
      textTransform: 'none !important',
      color: '#f3f8fe !important',
      boxShadow: '0 4px 4px -2px hsl(0deg 0% 65% / 25%)',
      boxSizing: 'border-box',
      '@media (min-width: 1200px)': {
        height: '2.7vw',
        marginLeft: '1.3vw',
        minWidth: '14.5vw',
        padding: '0.8vw',
        borderRadius: '0.5vw !important',
        fontFamily: 'inherit',
        fontSize: '0.9vw',
      },
      borderRadius: '1.5% !important',
      '@media (max-width: 1200px)': {
        borderRadius: '8px !important',
        marginLeft: '0.5vw',
        maxHeight: 42,
        height: 'inherit',
      },
      background: colors.newBGColor,
      [theme.breakpoints.down('md')]: {
        // fontSize: 10,
        // height: '30px !important',
        borderRadius: '4px !important',
        fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
      },
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
  secButton: {
    '&.MuiButtonBase-root.MuiButton-root': {
      fontFamily: fonts.fontType.roboto,
      textTransform: 'none',
      background: 'white',
      boxShadow:
        '0 2px 5px rgb(0 0 0 / 16%), 0 2px 10px rgb(0 0 0 / 12%) !important',
      boxSizing: 'border-box',
      '@media (min-width: 1200px)': {
        height: '2.7vw',
        marginLeft: '15px',
        minWidth: '15vw',
        borderRadius: '0.4vw !important',
        padding: '0.8vw',
        fontSize: '1vw',
      },
      borderRadius: '1.5% !important',
      '@media (max-width: 1200px)': {
        borderRadius: '8px !important',
      },
      color: '#1976d2 !important',
      [theme.breakpoints.down('md')]: {
        // fontSize: 10,
        // height: '30px !important',
        borderRadius: '4px !important',
        fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
      },
      '& .MuiSvgIcon-root': {
        '@media (min-width: 1200px)': {
          width: '0.8vw',
          height: '0.8vw',
        },
      },
    },
  },
  disableButton: {
    '&.MuiButtonBase-root.MuiButton-root': {
      textTransform: 'none !important',
      color: '#f3f8fe !important',
      boxShadow: '0 4px 4px -2px hsl(0deg 0% 65% / 25%)',
      boxSizing: 'border-box',
      '@media (min-width: 1200px)': {
        height: '2.7vw',
        marginLeft: '1.3vw',
        marginRight: '1vw',
        minWidth: '14.5vw',
        fontSize: '0.9vw',
        padding: '0.8vw',
        opacity: '50%',
        borderRadius: '0.5vw !important',
      },
      fontFamily: 'inherit',
      background: colors.newBGColor,
      [theme.breakpoints.down('md')]: {
        // fontSize: 10,
        // height: '30px !important',
        borderRadius: '4px !important',
        fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
      },
    },
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
  customizeButton: {
    '&.MuiButtonBase-root.MuiButton-root': {
      textTransform: 'none',
      border: `0.1vw solid ${colors.primary} !important`,
      borderRadius: 0,
      boxShadow:
        '0 2px 5px rgb(0 0 0 / 16%), 0 2px 10px rgb(0 0 0 / 12%) !important',
      boxSizing: 'border-box',
      '@media (min-width: 1200px)': {
        height: '3vw',
        marginLeft: '1.3vw',
        minWidth: '7.5vw',
        fontSize: '0.9vw',
      },
      color: '#d300ff',
      [theme.breakpoints.down('md')]: {
        // fontSize: 10,
        // height: '30px !important',
        borderRadius: '4px !important',
        fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
      },
      '&:hover': {
        background: '#d300ff',
        color: '#fff',
      },
    },
  },
  '.MuiButtonBase-root.MuiButtonBase-root.MuiButton-root': {
    borderRadius: 'none',
  },
});

export default buttonStyle;
