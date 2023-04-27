import { fonts, colors } from '../../../theme';

const timePickerStyle = (theme) => ({
  wrapper: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      '@media (min-width: 1200px)': {
        marginTop: '0.4vw',
        fontSize: '0.9vw',
        '&.MuiInputBase-root': {
        // height: '3.08vw',
          lineHeight: '1',
        },
      },
      '@media (max-width: 1199px)': {
        borderRadius: 3,
      },
      fontFamily: fonts.fontType.roboto,
      borderRadius: '0.4vw',
      outline: 'none',
      '& input': {
        // padding: '8.5px 14px',
      },
      '& .MuiOutlinedInput-notchedOutline': {
      // border: `0.1vw solid ${colors.primary}`,
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
      '& .MuiSvgIcon-root': {
        '@media (min-width: 1200px)': {
          width: '2vw',
          height: '2vw',
        },
      },
    },
    '& .MuiFormControl-root.MuiTextField-root': {
      '@media (min-width: 1200px)': {
        width: '100% !important',
      },
      // marginTop: '0.15vw',
    },
    '& .MuiInputLabel-root': {
      '@media (min-width: 1200px)': {
        fontSize: '0.7vw',
        transform: 'translate(1.5vw, -0.6vw) scale(1)',
        marginLeft: '-0.459vw',
      },
      fontFamily: fonts.fontType.roboto,
      color: colors.primary,
      [theme.breakpoints.down('md')]: {
        // fontSize: 10,
        // transform: 'translate(17px, -9px) scale(0.75)',
      },
      '& .Mui-error': {
        '@media (min-width: 1200px)': {
          fontSize: '0.7vw',
        },
        fontFamily: fonts.fontType.roboto,
      },
    },
    '& .MuiOutlinedInput-notchedOutline legend': {
      display: 'inline-table',

    },
    '& .MuiFormControl-root': {
      '& .MuiOutlinedInput-root': {
        '& .MuiOutlinedInput-input': {
          '&::placeholder': {
            fontFamily: `${fonts.fontType.roboto} !important`,
            fontSize: '0.9vw !important',
            color: `${colors.placeHolderColor}!important`,
            letterSpacing: 1,
          },
        },
      },
    },
  },

});

export default timePickerStyle;
