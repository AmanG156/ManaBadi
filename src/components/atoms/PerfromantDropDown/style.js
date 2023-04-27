import makeStyles from '@mui/styles/makeStyles';
import { colors, fonts } from '../../../theme';

const style = makeStyles((theme) => ({
  formControl: {
    '@media (min-width: 1200px)': {
      margin: '0.8vw',
    },
    width: '100%',
    '& span': {
      '&:nth-child(2)': {
        position: 'relative',
        zIndex: 1,
        '& .MuiInputBase-root': {
          background: 'rgb(255 255 255 / 0%)',
        },
      },
    },
    '& .MuiInputLabel-root': {
      fontFamily: fonts.fontType.roboto,
      color: `${colors.placeHolderColor} !important`,
      '@media (max-width: 1199px)': {
        background: '#fff',
        padding: '0 5px',
      },
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
        padding: '0.7vw !important',
        transform: 'translate(0.3vw, 0.5vw) scale(1)',
      },
      letterSpacing: 1,
      [theme.breakpoints.down('md')]: {
        // fontSize: 10,
      },
      '&.MuiFormLabel-filled + span, &.Mui-focused + span': {
        '& .MuiOutlinedInput-root': {
          '& .MuiOutlinedInput-notchedOutline': {
            '& legend': {
              '& span': {
                display: 'none',
              },
            },
          },
        },
      },
    },
    '& .MuiSelect-select.MuiSelect-select': {
      fontFamily: fonts.fontType.roboto,
      color: `${colors.black} !important`,
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
        padding: '0.7vw !important',
        minHeight: '0.5em !important',
      },
      // [theme.breakpoints.down('md')]: {
      //   fontSize: 12,
      // },
    },
    '& .MuiOutlinedInput-root': {
      background: 'white',
      '@media (min-width: 1200px)': {
        height: '2.7vw !important',
        lineHeight: '1vw',
        borderRadius: '0.4vw',
      },
      // borderBottom: 'solid 1px #104F96',
      outline: 'none',
      width: '100%',
      '& .MuiOutlinedInput-notchedOutline': {
        // border: `0.1vw solid ${colors.primary}`,
        borderColor: `${colors.formBorder}`,
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
      '& .MuiSvgIcon-root.MuiSelect-icon': {
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw',
          width: '1vw',
          height: '1vw',
          right: '0.5vw',
        },
        // [theme.breakpoints.down('md')]: {
        //   fontSize: 12,
        // },
      },
    },
    '& input': {
      padding: '0.7vw 1vw 0.7vw 0.7vw',
      boxSizing: 'border-box',
      fontSize: '0.9vw',
      fontFamily: fonts.fontType.roboto,
      color: '#696969 !important',

      [theme.breakpoints.down('md')]: {
        fontSize: 12,
      },
      '&::placeholder': {
        textTransform: 'uppercase',
        color: `${colors.placeHolderColor} !important`,

        opacity: 1,
        letterSpacing: 2,
        padding: '0.7vw 1vw 0.7vw 0.7vw',
        fontFamily: fonts.fontType.roboto,
        fontWeight: '300',
      },
    },
  },
  menuItem: {
    borderBottom: '0.1vw solid #eee !important',
    padding: '0.5vw !important',
    maxWidth: 500,
    minWidth: '100%',
    whiteSpace: 'break-spaces',
    justifyContent: 'start !important',
    display: 'block !important',
    fontFamily: fonts.fontType.roboto,
    fontSize: '0.9vw',
    [theme.breakpoints.down('md')]: {
      fontSize: 12,
    },
    '&:last-child': {
      borderBottom: 'none !important',
    },
  },
  defaultMenu: {
    fontSize: '0.9vw',
    padding: '0.7vw !important',
    [theme.breakpoints.down('md')]: {
      fontSize: 12,
    },
  },
  errorText: {
    color: colors.errorText,
    fontSize: '0.9vw',
    bottom: -20,
    position: 'absolute',
    fontFamily: fonts.fontType.roboto,
    display: 'block',
    [theme.breakpoints.down('md')]: {
      fontSize: 12,
    },
  },
  dropDownSelect: {
    width: '50%',
    '& .MuiInputLabel-root:not(Mui-focused)': {
      // transform: 'translate(0, 6px) scale(1)',
    },
    '& img': {
      position: 'absolute',
      top: 9,
      left: 0,
      '& + .MuiInput-root': {
        '& .MuiSelect-select': {
          paddingLeft: 25,
        },
      },
    },
    '& .MuiInputBase-formControl': {
      width: '100%',
      '& .MuiSelect-select': {
        padding: '7px 25px 10px 0',
      },
    },
  },
  withLeftIcon: {
    '& .MuiInputLabel-root:not(Mui-focused)': {
      transform: 'translate(25px, 6px) scale(1)',
    },
  },
}));

export default style;
