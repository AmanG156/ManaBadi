import { fonts, colors } from '../../../theme';

const checkboxstyle = (theme) => ({
  formControl: {
    '& .MuiFormControlLabel-root .MuiFormControlLabel-label': {
      fontSize: '0.9vw',
      color: colors.placeHolderColor,
      marginLeft: '0.7vw !important',
      fontFamily: fonts.fontType.roboto,
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
      },
      '@media (max-width: 1199px)': {
        fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
      },
      // '@media (max-width: 1068px)': {
      //   fontSize: 'calc(10px + 6 * ((100vw - 320px) / 1199))',
      // },
    },
    '& .MuiSvgIcon-root': {
      '@media (min-width: 1200px)': {
        width: '1.1vw',
        height: '1.1vw',
      },
      [theme.breakpoints.down('md')]: {
        width: 14,
        height: 14,
      },
    },
  },
  columnCheckBox: {
    fontSize: 20,
    margin: 0,
    background: 'url(../../../assets/images/check-icon.png) 0 0 no-repeat',
    '& .MuiFormControlLabel-root .MuiFormControlLabel-label': {
      fontSize: '0.9vw !important',
      marginTop: '0.3vw !important',
      color: colors.textPrimary,
      [theme.breakpoints.down('md')]: {
        fontSize: '12px !important',
      },
    },
    '& .MuiSvgIcon-root': {
      width: '1.5vw',
      height: '1.5vw',
      [theme.breakpoints.down('lg')]: {
        width: 14,
        height: 14,
      },
    },
    '& .MuiCheckbox-root': {
      '&.Mui-checked': {
        position: 'relative',
        '&::after': {
          position: 'absolute',
          top: '0.8vw',
          left: '0.8vw',
          content: '""',
          border: `solid 2px ${colors.primary}`,
          zIndex: 99999,
          width: '0.9vw',
          height: '0.9vw',
          borderRadius: 3,
          background: colors.white,
          [theme.breakpoints.down('lg')]: {
            top: 8,
            left: 8,
            width: 12,
            height: 12,
          },
        },
        '&::before': {
          position: 'absolute',
          top: '0.9vw',
          left: '1.1vw',
          content: '""',
          width: '0.8vw',
          height: '0.3vw',
          color: colors.primary,
          borderBottom: `solid 2px ${colors.primary}`,
          borderLeft: `solid 2px ${colors.primary}`,
          transform: 'rotate(-45deg)',
          zIndex: 111111,
          background: colors.white,
          boxShadow: `3px 4px 2px ${colors.white}`,
          [theme.breakpoints.down('lg')]: {
            top: 10,
            left: 14,
            color: '#104F96',
            width: 9,
            height: 4,
          },
        },
      },
      '&.Mui-checked.Mui-disabled': {
        position: 'relative',
        '&::after': {
          position: 'absolute',
          top: '0.8vw',
          left: '0.8vw',
          content: '""',
          border: `solid 2px ${colors.primary}`,
          zIndex: 99999,
          width: '0.9vw',
          height: '0.9vw',
          borderRadius: 3,
          background: colors.backgroundGrey,
          [theme.breakpoints.down('lg')]: {
            top: 8,
            left: 8,
            width: 12,
            height: 12,
          },
        },
        '&::before': {
          position: 'absolute',
          top: '0.9vw',
          left: '1.1vw',
          content: '""',
          width: '0.8vw',
          height: '0.3vw',
          color: colors.primary,
          borderBottom: `solid 2px ${colors.primary}`,
          borderLeft: `solid 2px ${colors.primary}`,
          transform: 'rotate(-45deg)',
          zIndex: 111111,
          background: colors.backgroundGrey,
          boxShadow: `3px 4px 2px ${colors.white}`,
          [theme.breakpoints.down('lg')]: {
            top: 10,
            left: 14,
            color: '#104F96',
            width: 9,
            height: 4,
          },
        },
      },
    },
    '& .MuiTypography-root': {
      marginLeft: 0,
    },
  },
});

export default checkboxstyle;
