import { colors, fonts } from '../../../theme';

const studentinfostyle = (() => ({
  testContain: {
    width: '100%',
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
  form: {
    width: '100%',
    marginTop: '2vw',
  },
  dialogButtons: {
    position: 'absolute',
    padding: 0,
    bottom: 5,
    height: '50px',
  },
  dialogAtom: {
    '& .MuiDialog-paper': {
      // width: '95% !important',
    },
    '& .MuiDialogContent-root': {
      padding: '1vw !important',
    },
    '& .MuiDialogContent-root .MuiGrid-root': {
      maxWidth: '99% !important',
      '@media (max-width: 1199px)': {
        alignItems: 'center',
      },
    },
  },
  btnGroup: {
    margin: '1.1vw 1% 1% 0.9vw',
    '& .MuiButton-root': {
      '@media (min-width: 1200px)': {
        margin: '1%',
        minWidth: '11vw !important',
        height: '2.7vw',
        fontSize: '0.8vw',
        borderRadius: '0.4vw !important',
        '& .MuiSvgIcon-root': {
          fontSize: '0.8vw',
        },
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
    marginTop: '0.3vw',
    '@media (max-width: 1199px)': {
      fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    },
  },
  heading: {
    color: colors.footerBottomColor,
    fontWeight: 500,
    width: '100%',
    fontSize: '1.5vw',
    marginTop: '1vw',
    borderRadius: '0.4vw',
    '@media (max-width: 1199px)': {
      fontSize: 'calc(14px + 6 * ((100vw - 320px) / 1199))',
    },
  },
  accTitle: {
    display: 'inline-block',
    width: '100%',
    '& .MuiAccordion-root': {
      border: `0 solid ${colors.primary}`,
      boxShadow: 'none',
    },
    '& .MuiAccordion-root .MuiButtonBase-root.MuiAccordionSummary-root': {
      width: '100%',
      // borderBottom: `0.1vw dotted ${colors.primary}`,
      borderRadius: '0.5vw',
      background: colors.secondary,
    },
    '& .MuiAccordionSummary-content': {
      margin: '1vw 0vw !important',
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
      '& svg': {
        '@media (min-width: 1200px)': {
          width: '2vw',
          height: '2vw',
          marginRight: '0.7vw',
        },
      },
    },
  },
  studentTitle: {
    '@media (min-width: 1200px)': {
      fontSize: '1.8vw',
    },
    color: colors.primary,
    float: 'left !important',
    paddingLeft: '1vw',
    fontWeight: 500,
    // marginLeft: '10px',
  },
  removeTitle: {
    float: 'right !important',
    color: colors.errorText,
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
    padding: '0vw 0.6vw 0vw 0vw',
  },
  buttonCircle: {
    border: '3px solid',
    borderRadius: '50%',
    marginLeft: 15,
    height: '50%',
    width: '4%',
    marginTop: 5,
  },
  accordianHeader: {
    display: 'flex',
  },
  mapContainerGrid: {
    maxWidth: '97%',
    marginTop: '10px',
    marginLeft: 'auto',
    '@media (min-width: 1200px)': {
      margin: '1.5vw 0vw 1.5vw 0.5vw',
      maxWidth: '33vw',
    },
    '& #example-map': {
      borderRadius: '1vw',
      height: '23vw !important',
    },
  },
  mapContainerDescGrid: {
    marginBottom: '15px',
    padding: '0.5vw 0.5vw 2vw 0.7vw',

  },
  footerBottom: {
    background: colors.footerBottomColor,
    height: '0.1vw',
    display: 'block',
    width: '100%',
    marginTop: '2vw',
    marginLeft: '1.5vw',
  },
  alignGrid: {
    // height: '5vw',
    padding: 0,
    '@media (min-width: 1200px)': {
      maxWidth: '33.2%',
      height: '5vw',
    },
    '& #extraCurricularActivities': {
      color: `${colors.placeHolderColor} !important`,
      padding: '0.4vw',
      fontSize: '0.9vw',
      transform: 'translate(0.3vw, 0.4vw) scale(1)',
      '@media (max-width: 1199px)': {
        fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
        left: '15px',
      },
      fontFamily: fonts.fontType.roboto,
      letterSpacing: '0.1vw',
    },
    '& .MuiOutlinedInput-root .MuiSelect-select': {
      transform: 'translate(0vw, 0.1vw)',
    },
    '& .MuiOutlinedInput-root .MuiSelect-select.MuiSelect-multiple': {
      transform: 'translate(0vw, 0vw)',
    },
    '& #addressAutoComplete': {
      '@media (min-width: 1200px)': {
        width: '89.98%',
      },
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
      margin: '0.5vw 0',
      '& .MuiFormControl-root': {
        margin: 0,
        // '@media (min-width: 1200px)': {
        width: '100% !important',
        // },
        // '@media (max-width: 1199px)': {
        //   width: '98%',
        // },
      },
    },
    '& .MuiTextField-root': {
      '@media (min-width: 1200px)': {
        width: '98% !important',
      },
    },
    '& .MuiOutlinedInput-root.MuiInputBase-root': {
      '@media (min-width: 1200px)': {
        marginTop: 0,
        height: '2.7vw',
        borderRadius: '0.4vw',
        width: '100%',
      },
    },
  },
  '.MuiDialogActions-root': {
    minWidth: '100px !important',
  },
  headerTitle: {
    paddingLeft: '0vw !important',
  },
  datePickerGrid: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: `0.1vw solid ${colors.primary}`,
    },
    '& .MuiOutlinedInput-root:hover, & .MuiOutlinedInput-root:focus': {
      '& .MuiOutlinedInput-notchedOutline': {
        border: `0.1vw solid ${colors.primary}`,
      },
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: `0.2vw solid ${colors.primary}`,
    },
    '&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: `0.2vw solid ${colors.errorText}`,
    },
  },
  locationHeading: {
    display: 'flex',
    padding: '0.5vw 0',
    fontSize: '1vw',
  },
  locationValue: {
    paddingLeft: '1%',
    color: 'gray',
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
    },
  },
  headerContainer: {
    '@media (min-width: 1200px)': {
      height: '6vw',
    },
  },
  borderBottom: {
    width: '105%',
    height: 5,
    display: 'block',
    background: colors.secondary,
  },
  label: {
    display: 'flex',
    fontWeight: fonts.fontWeight.medium,
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
    color: colors.black,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    hyphens: 'manual',
  },
  collon: {
    marginLeft: '-0.5vw !important',
  },
  value: {
    display: 'flex',
    fontWeight: fonts.fontWeight.low,
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
    color: 'gray',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    hyphens: 'manual',
  },
  previewValue: {
    marginLeft: '0.3vw !important',
  },
  dataPadding: {
    paddingTop: '0.2vw',
    paddingBottom: '0.2vw',
    display: 'flex',
    flexDirection: 'row',
  },
  commonButtonNew: {
    minWidth: '2vw !important',
    height: '3vw !important',
    padding: '1vw 1vw 1.2vw 1.2vw !important',
    '@media (max-width: 1199px)': {
      height: 'auto !important',
      padding: '5px 8px !important',
      minWidth: 'auto !important',
      borderRadius: '6px !important',
      marginLeft: '15px',
    },
    '@media (max-width: 499px)': {
      height: 'auto !important',
      padding: '5px 8px !important',
      minWidth: 'auto !important',
    },
    '& svg': {
      '@media (max-width: 1199px)': {
        width: '16px !important',
        height: '16px !important',
      },
    },
  },
  alignRight: {
    textAlign: 'right',
  },
}));

export default studentinfostyle;
