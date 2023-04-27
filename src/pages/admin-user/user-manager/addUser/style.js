import { colors, fonts } from '../../../../theme';
import listIcon from '../../../../assets/images/listIcon.png';

const addUserstyle = (() => ({
  viewLogs: {
    fontFamily: fonts.fontType.roboto,
    fontWeight: fonts.fontWeight.medium,
    display: 'flex',
    color: `${colors.actionIconsColor} !important`,
    textDecoration: 'underline',
    cursor: 'pointer',
    alignItems: 'center',
  },
  list: {
    listStyleImage: `url(${listIcon})`,
    paddingLeft: '4%',
    marginBottom: '3px',
    lineHeight: '1.5em',
    color: colors.placeHolderColor,
    fontFamily: 'inherit !important',
    '& li': {
      paddingLeft: '0.7em',
    },
    textAlign: 'start',
  },
  switchText: {
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw !important',
    },
    textAlign: 'center',
  },
  switchHeading: {
    '@media (min-width: 1200px)': {
      fontSize: '1vw !important',
    },
    fontWeight: fonts.fontWeight.bold,
    textAlign: 'center',
  },
  errorText: {
    color: colors.errorText,
    fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    '@media (min-width: 1200px)': {
      fontSize: '0.7vw',
      marginTop: '0.3vw',
    },
    display: 'block',
  },
  alignGrid: {
    '@media (min-width: 1200px)': {
      height: '5vw',
      padding: 0,
      maxWidth: '33.2%',
    },
    '& #extraCurricularActivities': {
      color: `${colors.placeHolderColor} !important`,
      padding: '0.4vw',
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
      },
      transform: 'translate(0.3vw, 0.4vw) scale(1)',
      fontFamily: fonts.fontType.roboto,
      letterSpacing: '0.1vw',
    },
    '& #addressAutoComplete': {
      width: '100%',
      // marginTop: '9px',
    },
    '& .PhoneInput': {
      '@media (min-width: 1200px)': {
        width: '97%',
      },
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
        margin: 0,
      },
    },
    '& .MuiOutlinedInput-root.MuiInputBase-root': {
      marginTop: 0,
      '@media (min-width: 1200px)': {
        height: '2.7vw',
      },
      borderRadius: '0.4vw',
      width: '100%',
    },
  },
  '.MuiDialogActions-root': {
    minWidth: '100px !important',
  },
  '& .MuiOutlinedInput-root': {
    '& .MuiOutlinedInput-input': {
      fontFamily: `${fonts.fontType.roboto} !important`,
      border: `${colors.blue}!important`,
      '&::placeholder': {
        fontFamily: `${fonts.fontType.roboto} !important`,
        fontSize: '12px !important',
        color: `${colors.placeHolderColor}!important`,
        letterSpacing: 1,
      },
    },
  },
  imageAlign: {
    textAlign: 'center !important',
    '& > span': {
      marginLeft: '0px !important',
    },
  },
  userDialogAtom: {
    '&.MuiButton-textPrimary': {
      minWidth: '10vw !important',
    },
  },
  inViewLogButton: {
    '&.MuiButton-textPrimary': {
      minWidth: '40% !important',
    },
  },
}));

export default addUserstyle;
