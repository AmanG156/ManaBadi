import { colors, fonts } from '../../../theme';

const style = ((theme) => ({
  formControl: {
    width: '100%',
    margin: '0.8vw',
    '& .MuiAutocomplete-root': {
      border: `solid 1px ${colors.borderBottomNewColor}`,
      borderRadius: '0.4vw',
      '&.Mui-focused, &.MuiAutocomplete-hasClearIcon': {
        '& .MuiInputLabel-root': {
          background: colors.white,
          padding: '0 0.5vw !important',
        },
      },
      '& .MuiInput-root': {
        marginTop: 8,
        paddingLeft: '1vw',
        '&.MuiInputBase-sizeSmall': {
          '& .MuiInput-input': {
            paddingLeft: '1vw',
          },
        },
        '& .MuiAutocomplete-endAdornment': {
          top: 'calc(50% - 18px)',
        },
        '&:after, &:before': {
          border: 0,
        },
      },
    },
    '& .MuiInputLabel-root': {
      fontFamily: fonts.fontType.roboto,
      color: colors.placeHolderColor,
      fontSize: '0.9vw',
      [theme.breakpoints.down('lg')]: {
        fontSize: '1rem !important',
      },
      '&.MuiInputLabel-shrink': {
        transform: 'translate(0.7vw, -0.5vw)',
        '@media (max-width: 1200px)': {
          transform: 'translate(14px, -9px) scale(0.75)',
        },
        fontSize: '0.7vw',
        color: colors.primary,
      },
    },
    '& .MuiOutlinedInput-root': {
      padding: '0.15vw',
      fontSize: '0.9vw',
      '& .MuiChip-label': {
        padding: '0 0.6vw',
      },
      '& .MuiSvgIcon-root': {
        fontSize: '1vw',
      },
    },
    '& .MuiSelect-select': {
      textAlign: 'left',
    },
  },
  unCheckChipInnnerDiv: {
    margin: '0 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    lineHeight: '13px',
    '& span': {
      paddingLeft: 0,
      // color: colors.primary,
      fontSize: '0.9vw',
    },
    '& p': {
      margin: 0,
      // color: colors.primary,
      fontSize: '0.9vw',
    },
    '& .MuiButtonBase-root': {
      border: 0,
      margin: '0.2vw 0 0.2vw 0',
      height: 'inherit',
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      '& svg': {
        position: 'absolute',
        color: colors.black,
        fontSize: 14,
        marginRight: 0,
        right: -39,
        top: 6,
      },
    },
  },
  checkChipInnnerDiv: {
    margin: '0 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    lineHeight: '13px',
    '& span': {
      paddingLeft: 0,
      color: colors.primary,
      fontSize: '0.9vw',
    },
    '& p': {
      margin: 0,
      color: colors.primary,
      fontSize: '0.9vw',
    },
    '& .MuiButtonBase-root': {
      border: 0,
      margin: '0.2vw 0 0.2vw 0',
      height: 'inherit',
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      '& svg': {
        position: 'absolute',
        color: colors.black,
        fontSize: 14,
        marginRight: 0,
        right: -39,
        top: 6,
      },
    },
  },
  chipMainDiv: {
    display: 'flex',
    borderRadius: '50vw',
    background: colors.darkGrey,
    padding: '0.4vw 1.4vw 0.4vw 0vw',
    marginBottom: '0.5vw',
    marginRight: 0,
    alignItems: 'center',
  },
  manabadiEmail: {
    fontSize: '12px',
    marginTop: '-6px',
  },
  icon: {
    marginLeft: '0.8vw',
    width: '1.5vw',
    height: '1.5vw',
  },
  starIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  checkedIcon: {
    color: colors.primary,
    cursor: 'pointer',
    '& svg': {
      width: '1vw',
      height: '1vw',
      color: colors.primary,
      marginTop: '0.5vw',
    },
  },
  unCheckedIcon: {
    color: colors.black,
    cursor: 'pointer',
    '& svg': {
      width: '1vw',
      height: '1vw',
      color: colors.black,
      marginTop: '0.5vw',
    },
  },
}));
export default style;
