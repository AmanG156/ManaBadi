import makeStyles from '@mui/styles/makeStyles';
import { colors, fonts } from '../../../../theme';

const style = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginLeft: '0px',
    width: '100%',
    '@media (max-width: 1199px)': {
      marginRight: 0,
    },
  },
  fileLabel: {
    width: '70%',
    marginRight: '2%',
    cursor: 'not-allowed',
  },
  container: {
    display: 'flex',
    '& label': {
      backgroundColor: '#9cc',
      color: '#fff',
      boxShadow: 'none',
      padding: '8px 24px',
      letterSpacing: 2,
      '& span': {
        fontFamily: fonts.fontType.roboto,
      },
      '&:hover': {
        backgroundColor: '#019491',
        boxShadow: 'none',
      },
    },
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
  select: {
    fontSize: '0.9vw',
    bottom: '20',
  },
  error: {
    border: `1px solid ${colors.errorText}`,
    '&:hover, &:focus, &:focus-visible': {
      border: `2px solid ${colors.errorText}`,
      outline: 'none',
    },
  },
  errorText: {
    color: colors.errorText,
    fontSize: '0.7vw',
  },
  phoneInput: {
    '& .PhoneInput': {
      width: 'initial',
    },
  },
  dropDownSelect: {
    '& .MuiInputLabel-root': {
      transform: 'translate(0.7vw, 0.7vw)',
      color: colors.placeHolderColor,
      '&.MuiInputLabel-shrink': {
        transform: 'translate(1vw, -0.7vw)',
        fontSize: '0.7vw',
        color: colors.primary,
      },
    },
    '& .MuiAutocomplete-root': {
      '& .MuiInputLabel-root': {
        transform: 'translate(0.7vw, 0.5vw)',
        color: colors.placeHolderColor,
        '&.MuiInputLabel-shrink': {
          transform: 'translate(1vw, -0.5vw)',
          fontSize: '0.7vw',
          color: colors.primary,
        },
      },
    },
  },
  timePicker: {
    '& .MuiOutlinedInput-root .MuiSvgIcon-root': {
      width: '1.5vw',
      height: '1.5vw',
      padding: 0,
    },
  },
}));

export default style;
