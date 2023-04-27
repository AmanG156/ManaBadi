import { colors, fonts } from '../../../../../theme';

const addUserstyle = ((theme) => ({
  regionManagerTable: {
    '&.MuiTableHead-root': {
      // borderBottom: `0.15vw solid ${colors.actionIconsColor}`,
    },
    '& .MuiTableCell-head': {
      fontSize: '1vw',
      padding: '0.8vw 0.5vw',
      color: colors.actionIconsColor,
      fontWeight: 600,
      borderBottom: 0,
      [theme.breakpoints.down('lg')]: {
        fontSize: 13,
      },
    },
    '& .MuiTableCell-body': {
      fontSize: '1vw',
      padding: '0.8vw 0.5vw 1.3vw',
      borderBottom: 0,
      '& .MuiSvgIcon-root': {
        width: '1.5vw',
        height: '1.5vw',
        cursor: 'pointer',
      },
      '& p': {
        margin: 0,
      },
      [theme.breakpoints.down('md')]: {
        fontSize: 10,
      },
      [theme.breakpoints.down('lg')]: {
        fontSize: 12,
      },
      [theme.breakpoints.down('md')]: {
        fontSize: 10,
      },
      [theme.breakpoints.down('lg')]: {
        fontSize: 12,
      },
    },
  },
  feeStructure: {
    display: 'flex',
    justifyContent: 'center',
  },
  arrowIcon: {
    marginTop: '13px',
    cursor: 'pointer',
  },
  switchText: {
    fontSize: '0.9vw !important',
    textAlign: 'center',
    [theme.breakpoints.down('lg')]: {
      fontSize: '12px !important',
    },
  },
  switchHeading: {
    fontSize: '1vw !important',
    fontWeight: fonts.fontWeight.bold,
    textAlign: 'center',
    [theme.breakpoints.down('lg')]: {
      fontSize: '13px !important',
    },
  },
  title: {
    color: colors.primary,
    marginBottom: 8,
    fontFamily: fonts.fontType.roboto,
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
    fontWeight: 600,
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
      border: '0.1vw solid #1976d2',
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
  errorText: {
    color: colors.errorText,
    fontSize: '0.7vw',
    display: 'block',
    marginTop: '0.3vw',
    [theme.breakpoints.down('lg')]: {
      fontSize: 12,
    },
  },
  alignGrid: {
    height: '5vw',
    padding: 0,
    maxWidth: '33.2%',
    '& #extraCurricularActivities': {
      color: `${colors.placeHolderColor} !important`,
      padding: '0.4vw',
      fontSize: '0.9vw',
      transform: 'translate(0.3vw, 0.4vw) scale(1)',
      fontFamily: fonts.fontType.roboto,
      letterSpacing: '0.1vw',
    },
    '& #addressAutoComplete': {
      width: '100%',
      marginTop: '9px',
    },
    '& .PhoneInput': {
      width: '97%',
    },
    '@media (max-width: 1023px), @media (min-width: 375px)': {
      '& .MuiFormControl-root': {
        margin: 'auto',
        width: '98%',
      },
      '& div': {
        margin: 0,
      },
    },
    '& .MuiFormControl-root': {
      margin: '0.5vw 0',
      '& .MuiFormControl-root': {
        margin: 0,
        width: '100% !important',
      },
    },
    '& .MuiTextField-root': {
      '@media (min-width: 1200px)': {
        width: '98% !important',
      },
    },
    '& .MuiOutlinedInput-root.MuiInputBase-root': {
      marginTop: 0,
      height: '2.7vw',
      // borderRadius: '0.4vw',
      width: '100%',
    },
  },
  '.MuiDialogActions-root': {
    minWidth: '100px !important',
  },
  '& .MuiOutlinedInput-root': {
    '& .MuiOutlinedInput-input': {
      fontFamily: `${fonts.fontType.roboto} !important`,
      // border: `${colors.blue}!important`,
      '&::placeholder': {
        fontFamily: `${fonts.fontType.roboto} !important`,
        fontSize: '12px !important',
        color: `${colors.placeHolderColor}!important`,
        letterSpacing: 1,
      },
    },
  },
}));

export default addUserstyle;
