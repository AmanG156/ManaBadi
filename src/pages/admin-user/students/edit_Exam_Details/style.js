import { colors, fonts } from '../../../../theme';

const editExamDetails = ((theme) => ({
  activeButton: {
    color: '#f3f8fe !important',
    '@media (min-width: 1200px)': {
      height: '2.5vw',
      fontSize: '1vw',
      padding: '0.8vw',
      // minWidth: '15vw',
      borderRadius: '0.4vw !important',
    },
    fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    boxShadow: '0 4px 4px -2px hsl(0deg 0% 65% / 25%)',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    marginLeft: '1.2vw',
    marginRight: '1vw',
    textTransform: 'none !important',
    background: `${colors.newBGColor} !important`,
    '@media (max-width: 900px)': {
      height: 'auto !important',
    },
  },
  alignGrid: {
    marginTop: '10px',
  },
  submit: {
    alignItem: 'flex-end',
    display: 'flex',
    flexDirection: 'row',

    justifyContent: 'flex-end',
  },
  cogent: {
    margin: '5%',
    display: 'flex',
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'space-between',
  },
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
  textFieldSize: {
    height: '40px',
  },
  performTextField: {
    '& .Mui-error': {
      color: colors.errorText,
      '@media (min-width: 1200px)': {
        fontSize: '0.7vw',
      },
      marginLeft: 0,
    },
    '& .MuiFormLabel-root.MuiInputLabel-root': {
      '@media (min-width: 1200px)': {
        transform: 'translate(0.7vw, 0.7vw)',
        fontSize: '0.9vw',
      },
    },
    '& .MuiFormLabel-root.MuiInputLabel-shrink.MuiInputLabel-root': {
      '@media (min-width: 1200px)': {
        transform: 'translate(0.9vw, -0.5vw)',
        fontSize: '0.7vw',
      },
      color: colors.primary,
    },
    '& .MuiOutlinedInput-root': {
      '& .MuiInputLabel-root': {
        fontFamily: `${fonts.fontType.roboto} !important`,
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw !important',
        },
        color: `${colors.placeHolderColor} !important`,
      },
      '&.MuiInputLabel-root.Mui-focused': {
        color: `${colors.placeHolderColor} !important`,
      },
      '& input': {
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw',
          color: colors.black,
        },
        '&.Mui-disabled': {
          '@media (min-width: 1200px)': {
            padding: '0.65vw',
          },
          backgroundColor: colors.backgroundGrey,
          color: colors.primary,
          WebkitTextFillColor: colors.primary,
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: `0.1vw solid ${colors.primary}`,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: `0.2vw solid ${colors.primary}`,
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          border: `0.1vw solid ${colors.errorText}`,
        },
        '&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: `0.2vw solid ${colors.errorText}`,
        },
      },
      '& .MuiFormHelperText-root': {
        '@media (min-width: 1200px)': {
          fontSize: '0.7vw',
        },
        marginLeft: 0,
        fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
      },
    },
  },
}));

export default editExamDetails;
