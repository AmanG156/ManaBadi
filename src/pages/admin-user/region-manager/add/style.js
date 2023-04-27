import { colors, fonts } from '../../../../theme';

const addRegionStyle = ((theme) => ({
  viewLogs: {
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
      position: 'absolute',
      bottom: 25,
    },
    fontFamily: fonts.fontType.roboto,
    fontWeight: fonts.fontWeight.medium,
    display: 'flex',
    color: colors.actionIconsColor,
    paddingLeft: '3.5vw',
    textDecoration: 'underline',
    cursor: 'pointer',
    paddingTop: '1vw',
  },
  switchText: {
    fontSize: '0.9vw !important',
    textAlign: 'center',
    color: colors.blackShade,
    [theme.breakpoints.down('lg')]: {
      fontSize: '12px !important',
    },
  },
  inactiveText: {
    color: colors.redShade,
  },
  activeText: {
    color: colors.greenShade,
  },
  switchHeading: {
    fontSize: '1vw !important',
    fontWeight: fonts.fontWeight.bold,
    textAlign: 'center',
    paddingBottom: 5,
    [theme.breakpoints.down('lg')]: {
      fontSize: '13px !important',
    },
  },
  switchUi: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    '& p': {
      margin: '0 8px !important',
      fontSize: '0.9vw',
    },
    '& span': {
      marginTop: '0 !important',
      fontSize: '0.9vw',
      marginLeft: '0 !important',
    },
    '& .MuiSwitch-switchBase': {
      padding: 3,
      '&.Mui-checked+.MuiSwitch-track': {
        background: colors.greenShade,
      },
    },
    '& .MuiSwitch-thumb': {
      width: 10,
      height: 10,
    },
  },
  title: {
    color: colors.primary,
    padding: '.75vw 1vw .75vw 2vw',
    marginBottom: 8,
    fontFamily: fonts.fontType.roboto,
    backgroundColor: colors.secondary,
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
    fontWeight: 600,
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
    // height: '5vw',
    padding: 0,
    position: 'relative',
    // maxWidth: '33.2%',
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
    '& .MuiInputBase-root.MuiAutocomplete-inputRoot': {
      paddingRight: 0,
    },
    '& .MuiInput-input': {
      fontSize: '0.9vw',
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
    '& .MuiOutlinedInput-root.MuiInputBase-root': {
      marginTop: 0,
      borderRadius: '0.4vw',
      width: '100%',
      [theme.breakpoints.up('lg')]: {
        height: '2.7vw',
      },
    },
    '& .MuiOutlinedInput-input': {
      fontSize: '1vw',
      [theme.breakpoints.down('lg')]: {
        padding: '7px 14px',
        fontSize: 14,
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.9vw',
      padding: '0.7vw !important',
      transform: 'translate(0.3vw, 0.1vw) scale(1)',
      cursor: 'pointer',
      [theme.breakpoints.down('lg')]: {
        fontSize: 14,
        transform: 'translate(14px, 10px) scale(1)',
      },
      '&.MuiFormLabel-filled, &.Mui-focused': {
        // transform: 'translate(14px, -9px) scale(0.7)',
        // background: colors.white,
        // padding: '0 8px',
        // color: `${colors.primary} !important`,
        // letterSpacing: 1,
      },
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
  maxWidthAssign: {
    maxWidth: '50% !important',
  },
  coordinatorHeading: {
    color: colors.primary,
    fontSize: 11,
    padding: '0 5px',
    backgroundColor: colors.white,
    position: 'absolute',
    left: 20,
    top: 0,
  },
}));

export default addRegionStyle;
