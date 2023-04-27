import { colors, fonts } from '../../../../../theme';

const addUserstyle = ((theme) => ({
  status: {
    color: colors.black,
    fontSize: 14,
    fontWeight: 600,
  },
  accountMenu: {
    '& .MuiPaper-root': {
      maxWidth: '15vw',
      padding: '8px 15px',
      top: '50% !important',
      left: '50% !important',
      transform: 'translate(-50%, -50%) !important',
      '& .MuiButton-root': {
        marginTop: 8,
        marginLeft: '8px !important',
        minWidth: 'calc(100% - 8px) !important',
      },
    },
    '& .MuiBackdrop-root': {
      background: 'rgba(0,0,0,0.3)',
    },
  },
  regionManagerTable: {
    '& .MuiTableCell-head': {
      fontSize: '1vw',
      padding: '1.5vw 0.5vw',
      color: colors.actionIconsColor,
      fontWeight: 600,
      [theme.breakpoints.down('md')]: {
        fontSize: 13,
      },
    },
    '& .MuiTableCell-body': {
      fontSize: '1vw',
      padding: '1.5vw 0.5vw',
      '& .MuiSvgIcon-root': {
        width: '1.5vw',
        height: '1.5vw',
        cursor: 'pointer',
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
    justifyContent: 'flex-end',
    padding: '10px 4px',
    borderRadius: 5,
    border: `1px solid ${colors.primary}`,
    position: 'relative',
    alignItems: 'center',
    '& p': {
      fontSize: 16,
    },
    '& .label': {
      position: 'absolute',
      top: -9,
      left: 8,
      background: colors.white,
      padding: '0 4px',
      fontSize: 12,
      color: colors.primary,
    },
  },
  levelDropdown: {
    padding: '10px 11px',
    justifyContent: 'flex-start',
  },
  arrowIcon: {
    cursor: 'pointer',
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
    [theme.breakpoints.down('lg')]: {
      fontSize: '13px !important',
    },
  },
  title: {
    color: colors.primary,
    padding: '.75vw 1vw .75vw 2vw',
    marginBottom: 8,
    fontFamily: fonts.fontType.roboto,
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
  switchUi: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    position: 'relative',
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
  actionCancelButton: {
    color: '#1976d2 !important',
    background: 'white',
    boxShadow: '0 2px 5px rgb(0 0 0 / 16%), 0 2px 10px rgb(0 0 0 / 12%) !important',
    boxSizing: 'border-box',
    fontFamily: 'Roboto, sans-serif',
    borderRadius: '1.5% !important',
    textTransform: 'none',
    border: '1px solid',
  },
  traingleBlock: {
    fontWeight: '400',
  },
  textFieldSet: {
    '& .MuiOutlinedInput-root input': {
      padding: '11px 14px',
    },
  },
}));

export default addUserstyle;
