import { colors, fonts } from '../../../../theme';

const editstudentstyle = (() => ({
  label: {
    display: 'flex',
    fontWeight: fonts.fontWeight.medium,
    fontSize: '1vw',
    color: colors.black,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    hyphens: 'manual',
  },
  value: {
    display: 'flex',
    fontWeight: fonts.fontWeight.low,
    fontSize: '1vw',
    color: 'gray',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    hyphens: 'manual',
  },
  viewLogs: {
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
    fontFamily: fonts.fontType.roboto,
    fontWeight: fonts.fontWeight.medium,
    display: 'flex',
    color: `${colors.actionIconsColor} !important`,
    textDecoration: 'underline',
    cursor: 'pointer',
    paddingTop: '1vw',
  },
  saveCancelContainer: {
    paddingTop: '5vw',
  },
  dialogButtons: {
    // position: 'absolute',
    // padding: 0,
    // bottom: 5,
    // height: '3vw',
  },
  gridButtonsFooter: {
    paddingLeft: '3%',
  },
  middleNameAndChangeLogs: {
    '& .MuiOutlinedInput-root': {
      '@media (min-width: 1200px)': {
        width: '102% !important',
      },
    },
  },
  datePicker: {
    marginTop: '1%',
    width: '90%',
  },
  errorText: {
    color: colors.errorText,
    '@media (min-width: 1200px)': {
      fontSize: '0.7vw',
    },
    display: 'block',
  },
  mapContainerGrid: {
    '@media (min-width: 1200px)': {
      margin: '1.5vw 0vw 1.5vw 0.5vw',
      maxWidth: '35vw',
    },
    '& #example-map': {
      borderRadius: '1vw',
      height: '23vw !important',
    },
  },
  mapContainerDescGrid: {
    marginBottom: '15px',
    padding: '0.5vw 1vw 2vw 1vw',
    '& div': {
      '& div': {
        fontSize: 14,
        marginTop: 10,
        fontWeight: '500',
        '@media (max-width: 1199px)': {
          wordBreak: 'break-all',
        },
      },
    },
  },
  alignGrid: {
    padding: 0,
    '@media (min-width: 1200px)': {
      maxWidth: '33.2%',
    // paddingTop: '2vw !important',
    },
    '& #extraCurricularActivities': {
      // padding: '0.4vw',
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
      },
      fontFamily: fonts.fontType.roboto,
      // paddingLeft: '0.7vw',
      width: '100%',
      color: colors.placeHolderColor,
    },
    '& #changeLogs': {
      width: '100%',
    },
    '@media (max-width: 1023px), @media (min-width: 375px)': {
      '& .MuiFormControl-root': {
        margin: 'auto',
        // width: '98%',
      },
      '& div': {
        margin: 0,
      },
    },
    '& .MuiFormControl-root': {
      '@media (min-width: 1200px)': {
        margin: '0.5vw 0',
      },
      '& .MuiFormControl-root': {
        margin: 0,
        width: '100% !important',
      },
    },
    '& .MuiTextField-root': {
      '@media (min-width: 1200px)': {
        // width: '98% !important',
      },
    },
    '& .MuiOutlinedInput-root.MuiInputBase-root': {
      marginTop: 0,
      '@media (min-width: 1200px)': {
        height: '2.7vw',
        borderRadius: '0.4vw',
      },
      width: '100%',
    },
  },
  '.MuiDialogActions-root': {
    minWidth: '100px !important',
  },
  locationHeader: {
    '@media (min-width: 1200px)': {
      padding: '1vw 0',
      fontSize: '1.5vw',
    },
  },
  '& .MuiOutlinedInput-root': {
    '& .MuiOutlinedInput-input': {
      fontFamily: `${fonts.fontType.roboto} !important`,
      '&::placeholder': {
        fontFamily: `${fonts.fontType.roboto} !important`,
        fontSize: '12px !important',
        color: `${colors.placeHolderColor}!important`,
        letterSpacing: 1,
      },
    },
  },
  imageAlign: {
    textAlign: 'center !important',
    '& > span': {
      marginLeft: '0px !important',
      display: 'none',
    },
  },
  borderBottom: {
    width: '100%',
    height: 5,
    display: 'block',
    background: colors.secondary,
  },
  mainContainer: {
    width: '100%',
    '& form': {
      width: '100%',
    },
  },
  activeButton: {
    color: '#f3f8fe !important',
    '@media (min-width: 1200px)': {
      height: '2.5vw',
      fontSize: '1vw',
      padding: '0.8vw',
      minWidth: '15vw',
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
}));

export default editstudentstyle;
