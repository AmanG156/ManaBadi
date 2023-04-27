import { colors, fonts } from '../../../theme';

const style = (theme) => ({
  columnSettingDialog: {
    '& .MuiDialog-paper': {
      '@media (min-width: 1200px)': {
        minWidth: '55vw !important',
        maxWidth: '65vw !important',
      },
      overflowX: 'hidden !important',
    },
    '& .MuiDialogContent-root': {
      overflow: 'hidden',
    },
    '& .MuiDialogContent-root .MuiGrid-root': {
      '@media (min-width: 1200px)': {
        maxWidth: '65vw !important',
      },
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
    },
    '& .MuiBox-root': {
      padding: '0vw !important',
    },
    '& #datePickerDiv': {
      '@media (min-width: 1200px)': {
        width: '18vw !important',
      },
    },
    '& #addressAutoComplete': {
      '@media (min-width: 1200px)': {
        width: '46.2vw',
      },
    },
  },
  titleRow: {
    justifyContent: 'space-between',
  },
  cancelButton: {
    color: '#104F96 !important',
    border: '1px solid  #104F96',
  },
  gridContainer: {
    padding: '2vw 2vw 2vw 3vw !important',
    minHeight: '65vh',
  },
  dialogButtons: {
    paddingRight: '1vw !important',
    textAlign: 'center',
  },
  emailIcon: {
    marginRight: 30,
  },
  headerTitle: {
    fontWeight: fonts.fontWeight.bold,
    fontSize: '1.5vw',
    padding: '10px 10px 10px 1px',
    [theme.breakpoints.down('md')]: {
      fontSize: 16,
    },
  },
  studentContainer: {
    color: colors.black,
    width: 'auto',
    fontFamily: fonts.fontType.roboto,
    '& .locationDropdown': {
      '& img': {
        '@media (min-width: 1200px)': {
          width: '1vw',
          height: '1vw',
        },
        transform: 'translate(1vw, 0.1vw)',
      },
      '& .MuiInput-underline': {
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw',
        },
      },
      textAlign: 'start',
      width: '100%',
      '@media (min-width: 1200px)': {
        minWidth: '40vw',
      },
      '& span': {
        display: 'flex',
        alignItems: 'center',
      },
      '& .MuiInputBase-root.MuiInput-root': {
        '@media (min-width: 1200px)': {
          minWidth: '35vw !important',
          maxWidth: '35vw !important',
        },
      },
      '& .MuiInput-root:before': {
        borderBottom: `0.15vw solid ${colors.primary} !important`,
      },
      '& .MuiFormControl-root': {
        // width: '90%',
        '& .MuiInputLabel-root': {
          fontFamily: fonts.fontType.roboto,
          color: `${colors.primary} !important`,
          '@media (min-width: 1200px)': {
            fontSize: '1vw',
          },
          letterSpacing: 1,
        },
        '& .MuiSelect-select.MuiSelect-select': {
          fontFamily: fonts.fontType.roboto,
          color: `${colors.black} !important`,
          fontSize: '1vw',
          padding: '0.7vw 0.7vw 0.7vw 1.2vw !important',
          // width: '6vw !important',
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
          '@media (min-width: 1200px)': {
            fontSize: '0.9vw',
            width: '1vw',
            height: '1vw',
          },
        },
        '& input': {
          padding: '0.7vw 1vw 0.7vw 0.7vw',
          boxSizing: 'border-box',
          '@media (min-width: 1200px)': {
            fontSize: '0.9vw',
          },
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
    },
    '& .yearDropdown, & .courseDropdown': {
      textAlign: 'start',
      minWidth: '5vw',
      '&.MuiFormControl-root': {
        width: '100% !important',
        '& span': {
          width: '100% !important',
        },
        '& .MuiInputLabel-root': {
          fontFamily: fonts.fontType.roboto,
          color: `${colors.primary} !important`,
          '@media (min-width: 1200px)': {
            fontSize: '1vw',
          },
          letterSpacing: 1,
        },
        '& .MuiSelect-select.MuiSelect-select': {
          fontFamily: fonts.fontType.roboto,
          '@media (min-width: 1200px)': {
            fontSize: '0.9vw',
            padding: '0.7vw !important',
            width: '8vw !important',
          },
        },
        '& .MuiInput-root:before': {
          borderBottom: `0.15vw solid ${colors.primary}`,
        },
        '& .MuiSvgIcon-root': {
          '@media (min-width: 1200px)': {
            fontSize: '0.9vw',
            width: '1vw',
          },
          // height: '1vw',
          // right: '0.5vw',
        },
        '& input': {
          marginTop: '2vw',
          // padding: '0.7vw 1vw 0.7vw 0.7vw',
          boxSizing: 'border-box',
          '@media (min-width: 1200px)': {
            fontSize: '0.9vw',
          },
          fontFamily: fonts.fontType.roboto,
          color: '#696969 !important',
          '&::placeholder': {
            textTransform: 'uppercase',
            color: `${colors.placeHolderColor} !important`,
            opacity: 1,
            letterSpacing: 2,
            // padding: '0.7vw 1vw 0.7vw 0.7vw',
            fontFamily: fonts.fontType.roboto,
            fontWeight: 400,
          },
        },
      },
    },
  },
  rightIcons: {
    textAlign: 'right',
    borderRadius: '0.4vw !important',
    position: 'relative',
    padding: '0.5vw',
    marginLeft: '-1.5vw',
    '& svg': {
      '@media (min-width: 1200px)': {
        width: '1.5vw',
        height: '1.5vw',
      },
      color: colors.black,
    },
    '&:hover': {
      backgroundColor: 'white !important',
      minHeight: '3px !important',
    },
  },
  alignGrid: {
    paddingBottom: 25,
    maxWidth: '20%',
    '&.MuiGrid-root.MuiGrid-item': {
      paddingTop: 0,
      paddingLeft: 0,
    },
    '& .MuiFormControl-root': {
      margin: '10px !important',
      marginLeft: '0px !important',
      width: '99%',
      marginRight: '0px !important',

      '& .MuiFormControl-root': {
        margin: '0 !important',
        width: '100%',
      },
    },
  },
});

export default style;
