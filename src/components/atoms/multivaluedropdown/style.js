import makeStyles from '@mui/styles/makeStyles';
import { colors, fonts } from '../../../theme';

const style = makeStyles((theme) => ({
  multiSelct: {
    '& .MuiFormControl-root': {
      '@media (max-width: 1199px)': {
        maxWidth: '100%',
        marginLeft: '0',
        marginRight: '0',
      },
    },
  },
  formControl: {
    // margin: theme.spacing(1),
    width: '100%',
    margin: '0',
    '@media (min-width: 1200px)': {
      maxWidth: '100%',
    },
    '& .MuiInputLabel-root': {
      fontFamily: fonts.fontType.roboto,
      fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
      color: `${colors.placeHolderColor} !important`,
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
      },
      letterSpacing: 1,
      '@media (max-width: 1199px)': {
        top: '50%',
        transform: 'translateY(-50%) !important',
      },
    },
    '& .MuiSelect-select.MuiSelect-select': {
      fontFamily: fonts.fontType.roboto,
      color: `${colors.black} !important`,
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
        padding: '0.7vw',
      },
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
      },
      '@media (max-width: 1199px)': {
        fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
        // paddingLeft: '5px',
        // paddingTop: '5px',
        // paddingBottom: '5px',
      },
    },
    '& .MuiOutlinedInput-root': {
      background: 'white',
      '@media (min-width: 1200px)': {
        height: '2.5vw',
        borderRadius: '0.4vw',
      },
      outline: 'none',
      '& .MuiOutlinedInput-notchedOutline': {
        //  border: `0.1vw solid ${colors.primary}`,
      },
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        border: `0.1vw solid ${colors.errorText}`,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: `0.2vw solid ${colors.primary}`,
      },
      '&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: `0.2vw solid ${colors.errorText}`,
      },
      '& .MuiSvgIcon-root': {
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw',
          width: '1vw',
          height: '1vw',
          right: '0.5vw',
        },
      },
    },
    '& input': {
      '@media (min-width: 1200px)': {
        padding: '0.9vw',
        fontSize: '0.9vw',
      },
      boxSizing: 'border-box',
      fontFamily: fonts.fontType.roboto,
      color: '#696969 !important',
      '&::placeholder': {
        textTransform: 'uppercase',
        color: `${colors.placeHolderColor} !important`,
        opacity: 1,
        letterSpacing: 2,
        fontFamily: fonts.fontType.roboto,
        fontWeight: '300',
      },
    },
  },
  menuItem: {
    borderBottom: '0.1vw solid #eee !important',
    maxWidth: 500,
    minWidth: '100%',
    whiteSpace: 'break-spaces',
    justifyContent: 'start !important',
    fontFamily: fonts.fontType.roboto,
    padding: '0.5vw !important',
    '& .MuiListItemText-root': {
      fontFamily: fonts.fontType.roboto,
      '& .MuiTypography-root': {
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw',
          // padding: '0.7vw',
        },
      },
    },
    '& .MuiSvgIcon-root': {
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
        width: '1vw',
        height: '1vw',
        right: '0.5vw',
      },
    },
    '& .MuiCheckbox-root': {
      padding: '9px 9px 9px 0',
    },
  },
}));

export default style;
