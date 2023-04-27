import { colors, fonts } from '../../../theme';

const style = (() => ({
  formControl: {
    width: 'calc(100% - 0.8rem)',
    margin: '0.15vw',
    '@media (min-width: 1200px)': {
      marginLeft: '1rem',
      heigth: '100%',
    },
    '& .MuiInputLabel-root': {
      fontFamily: fonts.fontType.roboto,
      color: colors.placeHolderColor,
      transform: 'translate(0.7vw, 0.7vw)',
      '@media (max-width: 1200px)': {
        lineHeight: '2',
      },
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
      },
      '&.MuiInputLabel-shrink': {
        transform: 'translate(0.7vw, -0.5vw)',
        '@media (max-width: 1200px)': {
          fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
          transform: 'translate(14px, -9px) scale(0.75)',
          transition: 'color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
          lineHeight: 'inherit',
        },
        '@media (min-width: 1200px)': {
          fontSize: '0.7vw',
        },
        color: colors.primary,
      },
    },
    '& .MuiOutlinedInput-root': {
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
        padding: '0.15vw',
      },
      '& .MuiChip-label': {
        padding: '0 0.6vw',
      },
      '& .MuiSvgIcon-root': {
        '@media (min-width: 1200px)': {
          fontSize: '1vw',
        },
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: `0.1vw solid ${colors.primary}`,
      },
    },
    '& .MuiSelect-select': {
      textAlign: 'left',
    },
  },
  formControlStudentFilter: {
    width: 'calc(100% - 0.8rem)',
    '& .MuiInputLabel-root': {
      fontFamily: fonts.fontType.roboto,
      color: colors.placeHolderColor,
      transform: 'translate(0.7vw, 0.7vw)',
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
      },
      '&.MuiInputLabel-shrink': {
        display: 'none',
        transform: 'translate(0.7vw, -0.5vw)',
        '@media (max-width: 1200px)': {
          transform: 'translate(14px, -9px) scale(0.75)',
        },
        '@media (min-width: 1200px)': {
          fontSize: '0.7vw',
        },
        color: colors.primary,
      },
    },
    '& .MuiOutlinedInput-root': {
      overflow: 'auto',
      maxHeight: '15vw',
      border: `0.1vw solid ${colors.primary}`,
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
        padding: '0.07vw 5vw 0.07vw 1vw !important',
        justifyContent: 'space-between',
      },
      '& .MuiChip-label': {
        padding: '0 0.6vw',
        '@media (min-width: 1200px)': {
          fontSize: '.8vw',
        },
      },
      '& .MuiSvgIcon-root': {
        '@media (min-width: 1200px)': {
          fontSize: '1vw',
        },
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none !important',
      },
    },
    '& .MuiSelect-select': {
      textAlign: 'left',
    },
  },

}));
export default style;
