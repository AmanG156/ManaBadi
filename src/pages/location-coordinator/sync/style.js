import { colors, fonts } from '../../../theme';

const style = (theme) => ({
  gridContainer: {
    padding: '2vw 2vw 2vw 3vw !important',
    minHeight: '65vh',
  },
  location: {
    minWidth: '40vw',
    '& .MuiInputBase-root.MuiInput-root': {
      minWidth: '35vw !important',
      maxWidth: '35vw !important',
    },
    '& .MuiInputLabel-root': {
      fontFamily: fonts.fontType.roboto,
      color: `${colors.primary} !important`,
      fontSize: '1.2vw',
      letterSpacing: 1,
    },
    '& .MuiInput-root:before': {
      borderBottom: `0.1vw solid ${colors.actionIconsColor}`,
    },
    '& .MuiSelect-select.MuiSelect-select': {
      textAlign: 'left',
      padding: '0.3vw 1vw 1vw 1vw',
      fontFamily: fonts.fontType.roboto,
      // color: `${colors.black} !important`,
      transform: 'translate(8px, 0px)',
      backgroundColor: 'inherit',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
      },
    },
    '& .MuiOutlinedInput-root': {
      background: 'white',
      height: '2.7vw !important',
      lineHeight: '1vw',
      borderRadius: '0.4vw',
      outline: 'none',
      '& .MuiOutlinedInput-notchedOutline': {
        border: `0.1vw solid ${colors.primary}`,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: `0.2vw solid ${colors.primary}`,
      },
      '&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: `0.2vw solid ${colors.errorText}`,
      },
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        border: `0.1vw solid ${colors.errorText}`,
      },
    },
    '& .MuiSvgIcon-root': {
      fontSize: '0.9vw',
      width: '1vw',
      height: '1vw',
      right: '-0.5vw',
    },
    '& input': {
      padding: '0.7vw 1vw 0.7vw 0.7vw',
      boxSizing: 'border-box',
      fontSize: '0.9vw',
      // minWidth: 900,
      fontFamily: fonts.fontType.roboto,
      color: '#696969 !important',
      '&::placeholder': {
        textTransform: 'uppercase',
        color: `${colors.placeHolderColor} !important`,
        opacity: 1,
        letterSpacing: 2,
        padding: '0.7vw 1vw 0.7vw 0.7vw',
        fontFamily: fonts.fontType.roboto,
        fontWeight: 400,
      },
    },

  },
  titleRow: {
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontWeight: fonts.fontWeight.bold,
    fontSize: '1.5vw',
    padding: '10px 10px 10px 1px',
    [theme.breakpoints.down('md')]: {
      fontSize: 16,
    },
  },
  agoText: {
    justifyContent: 'center',
    fontSize: 14,
    color: colors.primary,
    display: 'flex',
    marginLeft: '1.3vw',
    width: '100%',
    marginTop: 10,
    [theme.breakpoints.down('lg')]: {
      justifyContent: 'left',
    },
  },
  filterCSV: {
    '& ul': {
      padding: 0,
      marginTop: 50,
    },
    '& li': {
      listStyle: 'none',
      display: 'inline-block',
      padding: '5px 16px',
      color: colors.primary,
      fontSize: 18,
      fontWeight: '500',
      borderRight: `solid 1px ${colors.borderColor}`,
      '& span': {
        color: colors.black,
      },
    },
  },
});

export default style;
