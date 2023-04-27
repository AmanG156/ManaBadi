import { colors, fonts } from '../../../../theme';

const addUserstyle = ((theme) => ({
  switchText: {
    fontSize: '0.9vw !important',
    textAlign: 'center',
    [theme.breakpoints.down('lg')]: {
      fontSize: '13px !important',
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
    padding: 0,
    '& #extraCurricularActivities': {
      color: `${colors.placeHolderColor} !important`,
      padding: '0.4vw',
      fontSize: '0.3vw',
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
    '& .MuiInputLabel-root': {
      fontSize: '1vw',
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
      borderRadius: '0.4vw',
      width: '100%',
      [theme.breakpoints.down('lg')]: {
        height: 40,
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
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: '#158d38',
    },
  },
  addRoleManager: {
    '& .MuiDialog-paper': {
      minWidth: '65vw',
    },
    '& .MuiDialogContent-root': {
      '& .MuiGrid-root': {
        '@media (min-width: 1200px)': {
          maxWidth: '60vw',
        },
      },
    },
  },
  dialContact: {
    '& .MuiInputLabel-root': {
      fontSize: '0.9vw',
      [theme.breakpoints.down('lg')]: {
        fontSize: 14,
        transform: 'translate(14px, 10px) scale(1)',
      },
      '&.MuiFormLabel-filled, &.Mui-focused': {
        transform: 'translate(14px, -9px) scale(0.7)',
        background: colors.white,
        padding: '0 8px',
        color: `${colors.primary} !important`,
        letterSpacing: 1,
      },
    },
    '& .MuiOutlinedInput-input': {
      fontSize: '1vw',
      [theme.breakpoints.down('lg')]: {
        fontSize: 14,
      },
    },
  },
  maxWidthAssign: {
    maxWidth: '490px !important',
  },
  switchUi: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    '& p': {
      margin: '0 8px !important',
      fontSize: '0.9vw',
    },
    '& span': {
      marginTop: '0 !important',
      fontSize: '0.9vw',
    },
    '& .MuiSwitch-switchBase': {
      padding: 3,
      '&.Mui-checked+.MuiSwitch-track': {
        background: colors.lightGreen,
      },
    },
    '& .MuiSwitch-thumb': {
      width: 10,
      height: 10,
    },
  },
}));

export default addUserstyle;
