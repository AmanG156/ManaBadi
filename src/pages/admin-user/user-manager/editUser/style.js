import { colors, fonts } from '../../../../theme';
import listIcon from '../../../../assets/images/listIcon.png';

const editUserstyle = (() => ({
  viewLogs: {
    fontFamily: fonts.fontType.roboto,
    fontWeight: fonts.fontWeight.medium,
    display: 'flex',
    color: `${colors.actionIconsColor} !important`,
    textDecoration: 'underline',
    cursor: 'pointer',
    textAlign: 'right',
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
    },
    display: 'block',
    // marginTop: '0.3vw',
  },
  alignGrid: {
    '@media (min-width: 1200px)': {
      height: '5vw',
      padding: 0,
      maxWidth: '33.2%',
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
  imageAlign: {
    textAlign: 'center !important',
    '& > span': {
      marginLeft: '0px !important',
    },
  },
  inViewLogButton: {
    '&.MuiButton-textPrimary': {
      minWidth: '40% !important',
    },
  },
}));

export default editUserstyle;
