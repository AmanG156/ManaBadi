import makeStyles from '@mui/styles/makeStyles';
import {
  colors,
  fonts,
} from '../../../../theme';

const style = makeStyles((theme) => ({
  dialog: {
    '& .MuiDialog-paper': {
      '@media (min-width: 1200px)': {
        maxHeight: '90vh',
        maxWidth: '65vw',
        minWidth: '40vw',
        borderRadius: '20px',
      },
      '@media (max-width: 1199px)': {
        borderRadius: 8,
        width: '100%',
        maxWidth: '90%',
      },
      margin: 0,
      boxShadow: 'none',
      boxSizing: 'border-box',
      paddingBottom: 20,
      '& .MuiFormControl-root': {
        marginTop: '0',
        width: '100%',
      },
      '& .MuiOutlinedInput-input': {
        width: '100%',
        borderRadius: '0.5vw',
      },
    },
    '& .MuiDialogTitle-root': {
      color: colors.primary,
      padding: '.75vw 1vw .75vw 2vw',
      marginBottom: 8,
      fontFamily: fonts.fontType.roboto,
      backgroundColor: colors.secondary,
      '@media (min-width: 1200px)': {
        fontSize: '1vw',
      },
      fontWeight: 600,
      [theme.breakpoints.down('md')]: {
        fontSize: 16,
      },
    },
    '& .MuiDialogContent-root': {
      '@media (min-width: 1200px)': {
        padding: '1vw 2vw 10px',
        fontSize: '0.9vw',
        overflowX: 'hidden !important',
      },
      [theme.breakpoints.down('md')]: {
        paddingBottom: 40,
      },
      '@media (max-width: 499px)': {
        paddingLeft: '4px',
        paddingRight: '4px',
      },
      '& .MuiGrid-root': {
        '@media (min-width: 1200px)': {
          maxWidth: '60vw',
        },
      },
    },
    '& .MuiButton-textPrimary': {
      color: `${colors.white} !important`,
      '@media (min-width: 1200px)': {
        minWidth: '15vw !important',
        height: '2.7vw',
        borderRadius: '0.4vw !important',
        fontSize: '1vw',
      },
      background: `${colors.newBGColor} !important`,
    },
    '@global': {
      '*::-webkit-scrollbar': {
        width: '0.7vw',
      },
      '*::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: colors.scrollBarColor,
        borderRadius: '0.4vw',
      },
    },
  },
  closeImg: {
    cursor: 'pointer',
    float: 'right',
    color: colors.black,
    width: '1.5vw !important',
    height: '1.5vw !important',
    padding: '0 !important',
    [theme.breakpoints.down('md')]: {
      width: '18px !important',
      height: '18px !important',
    },
    '& .MuiSvgIcon-root': {
      width: '1vw',
      height: '1vw',
    },
  },
  swapCourseDialog: {
    '& .MuiDialog-paper': {
      '@media (min-width: 1200px)': {
        minWidth: '55vw !important',
        maxWidth: '65vw !important',
      },
      overflowX: 'hidden !important',
    },
    '& .MuiDialogContent-root .MuiGrid-root': {
      '@media (min-width: 1200px)': {
        width: '55vw',
      },
    },
    '& #acedemicYear': {
      '@media (min-width: 1200px)': {
        width: '22vw',
      },
    },
    '& #changeLogs': {
      '@media (min-width: 1200px)': {
        width: '47.2vw',
      },
    },
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
          // padding: 2,
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
  switchSection: {
    textAlign: 'center',
    '& .MuiTypography-h5': {
      fontSize: '1vw',
    },
  },
  switchUi: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    '& p': {
      margin: '0 8px !important',
      fontSize: '0.9vw',
    },
    '& span': {
      marginTop: '0 !important',
      fontSize: '0.9vw',
    },
    '& .MuiSwitch-switchBase': {
      padding: 3,
      '&.Mui-checked+.MuiSwitch-track': {
        background: colors.lightGreen,
      },
    },
    '& .MuiSwitch-thumb': {
      width: 10,
      height: 10,
    },
  },
  setGreen: {
    color: colors.lightGreen,
  },
  addStyleHead: {
    borderBottom: 'none',
    '& p': {
      color: 'hsl(212deg 81% 33%)',
      fontSize: '1vw',
      textAlign: 'left',
      fontWeight: 'bold',
    },
  },
  alignHorCenter: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    '& p': {
      marginBottom: 0,
      fontSize: '0.9vw',
    },
  },
  marksDropDown: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiFormControl-root': {
      width: '100px !important',
      marginRight: '10px !important',
    },
  },
  marksTotal: {
    display: 'flex',
    '& span': {
      width: '11.5vw !important',
      fontSize: '1vw',
      maxWidth: '11.5vw !important',
      minWidth: '11.5vw !important',
      marginRight: '77px',
    },
    '& .MuiInputBase-formControl': {
      width: '45% !important',
      '& input': {
        padding: '0.7vw',
      },
    },
  },
  secButtonNew: {
    marginRight: '20px',
    marginTop: '10px',
  },
  tableAssgin: {
    height: '200px !important',
  },
  categoryLabel: {
    paddingLeft: '10% !important',
  },
}));

export default style;
