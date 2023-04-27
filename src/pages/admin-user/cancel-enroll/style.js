import { colors, fonts } from '../../../theme';

const cancelenrollstyle = (theme) => ({
  errorText: {
    color: colors.errorText,
    fontSize: '0.7vw',
    display: 'block',
    marginTop: '0.3vw',
    marginLeft: '0.2vw',
    [theme.breakpoints.down('lg')]: {
      fontSize: 12,
    },
  },
  button: {
    justifyContent: 'flex-end',
    margin: '10px 4px 3px 1px',
    width: '98%',
  },
  innerContainer: {
    margin: '0.3vw 0.6vw',
    fontFamily: fonts.fontType.roboto,
    '@media (max-width: 1023px), @media (min-width: 375px)': {
      width: '97%',
      margin: '0 0 0 10px',
      '& .MuiFormControl-root': {
        margin: '10px 0 0 0',
      },
    },
    '& .MuiOutlinedInput-root': {
      height: '2.692vw',
      borderRadius: '0.4vw',
      width: '100%',
      '& .MuiSelect-select': {
        minHeight: '0vw !important',
      },
    },
    '& .MuiFormControl-root .MuiInputLabel-root': {
      lineHeight: '0.9vw !important',
      fontSize: '0.9vw',
      color: `${colors.primary} !important`,
      paddingLeft: '0.4vw',
      paddingRight: '0.4vw',
      letterSpacing: 1,
      transform: 'translate(0.5vw, 0.9vw)',
      '&.MuiInputLabel-shrink': {
        transform: 'translate(0.4vw, -0.5vw)',
        fontSize: '0.7vw',
      },
    },
  },
  changeLogs: {
    '& .MuiFormControl-root .MuiInputLabel-root': {
      lineHeight: '1vw !important',
      fontSize: '0.9vw',
      color: `${colors.primary} !important`,
      paddingLeft: '0.4vw',
      paddingBottom: '0.4vw',
      paddingRight: '0.4vw',
      letterSpacing: 1,
      background: 'white',
      transform: 'translate(0.5vw, 0.9vw)',
      '&.MuiInputLabel-shrink': {
        transform: 'translate(0.4vw, -0.5vw)',
        fontSize: '0.7vw',
      },
    },
  },
  form: {
    marginTop: '0 !important',
  },
  previousYear: {
    justifyContent: 'flex-start',
    display: 'flex',
    marginLeft: '22px',
  },
  activeLabelP: {
    color: '#979797',
    fontFamily: 'Roboto, sans-serif',
    marginLeft: '0.7vw !important',
    position: 'absolute',
    left: 55,
    top: 10,
  },
  activeLabel: {
    position: 'relative',
    '& .MuiBox-root': {
      '& .MuiFormControlLabel-root': {
        width: 'fit-content',
      },
    },
  },

});

export default cancelenrollstyle;
