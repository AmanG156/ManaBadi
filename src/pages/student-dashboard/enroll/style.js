import { colors, fonts } from '../../../theme';

const enrollStudentStyle = ((theme) => ({
  tableView: {
    width: '100%',
    maxWidth: 'inherit !important',
    border: `solid 1px ${colors.primary}`,
    borderRadius: '0.5vw',
    marginTop: '2vw',
    marginBottom: '2vw',
    overflow: 'hidden',
    '& .MuiTableCell-root': {
      padding: '0.8vw',
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
      },
    },
    '& tr': {
      '& td, & th': {
        '@media (min-width: 1200px)': {
          fontSize: '1.1vw',
          lineHieght: '1.5vw',
        },
        '&:last-child': {
          borderRight: 0,
        },
      },
    },
    '& .MuiOutlinedInput-root': {
      '& input': {
        fontWeight: '600',
        paddingLeft: '2vw !important',
        // marginRight: '1vw',
        textAlign: 'right',
        borderRadius: '0.2vw',
      },
      '& .MuiInputLabel-root': {
        fontsize: '0.9vw !important',
      },
    },
    '& .MuiSelect-select.MuiSelect-select': {
      textAlign: 'left !important',
    },
  },
  tableheadBg: {
    background: '#e4f5fd',
    borderRadius: '10px 10px 0 0',
    '& th': {
      fontWeight: '600',
    },
  },
  paymentStudent: {
    '& .MuiButtonBase-root.MuiButton-root': {
      position: 'absolute',
      right: '3vw',
    },
  },
  paymentDialogAtom: {
    '& .MuiDialog-paper': {
      '@media (min-width: 1200px)': {
        maxWidth: '70vw !important',
      },
    },
    '& #contributionCause': {
      paddingRight: '1.5vw !important',
    },
  },
  confirmCheck: {
    paddingLeft: '16px',
    '@media (min-width: 1200px)': {
      margin: '0.3vw 0.6vw',
      padding: '0 0.6vw',
      '& label': {
        margin: '0 0 0 -2px',
      },
    },
    '& fieldset': {
      margin: '0 !important',
    },
  },
  accordin: {
    fontFamily: fonts.fontType.roboto,
    '& .MuiAccordionSummary-root': {
      background: colors.accordionBarColor,
      marginTop: '1vw',
      borderRadius: '0.5vw',
    },
    '& .MuiGrid-root .MuiAccordionSummary-content': {
      margin: '0 !important',
      minHeight: '1vw !important',
      fontSize: '1vw !important',
    },
    '& .MuiIconButton-root': {
      padding: '0.7vw',
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
      minHeight: '1vw',
      margin: '1vw 0 !important',
    },
    '& .MuiAccordionSummary-root.Mui-expanded': {
      minHeight: '3.5vw',
    },
    '& .MuiAccordion-root': {
      boxShadow: 'none',
      border: 'none !important',
    },
    '& .MuiAccordion-root:before': {
      backgroundColor: colors.white,
    },
    '& .MuiAccordionDetails-root': {
      padding: '0px 1vw 1vw',
    },
    '& svg': {
      color: colors.actionIconsColor,
      [theme.breakpoints.down('md')]: {
        // width: '12px !important',
        // height: '12px !important',
      },
    },
  },
  headerTitle: {
    fontWeight: fonts.fontWeight.bold,
    '@media (min-width: 1200px)': {
      fontSize: '1.2vw',
    },
    textAlign: 'left',
    color: colors.primary,
    [theme.breakpoints.down('md')]: {
      fontSize: 16,
    },
  },
  removeTitle: {
    float: 'right',
    color: colors.errorText,
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
    paddingTop: '0.5vw',
  },
  siblingTitle: {
    width: '80%',
    float: 'left',
  },
  headerContainer: {
    padding: 0,
  },
  editParentBlock: {
    // marginLeft: '-1vw',
  },
  editParentCheckbox: {
    '@media (min-width: 1200px)': {
      paddingLeft: '0.5vw',
    },
    '& .MuiFormControl-root': {
      margin: '0',
      padding: '16px',
    },
  },
  editStudentBlock: {
    padding: '2vw 0 1vw 0',
    width: '101%',
    '& form': {
      paddingBottom: '1vw',
    },
    '& input#academicSchool': {
      '@media (min-width: 1200px)': {
        width: '95%',
      },
    },
  },
  primaryStudentConscentError: {
    marginbottom: -2,
    display: 'block',
  },
  errorText: {
    color: colors.errorText,
    '@media (min-width: 1200px)': {
      fontSize: '0.8vw',
      marginLeft: 10,
      padding: 10,
      marginTop: 10,
    },
    fontFamily: fonts.fontType.roboto,
    display: 'block',
    marginTop: '0',
    textAlign: 'right',
  },
  moreRightSpace: {
    '@media (min-width: 1200px)': {
      marginLeft: 37,
      marginTop: -15,
    },
  },
  errorCheckBox: {
    marginTop: -50,
  },
  totalPaymentRow: {
    backgroundColor: colors.backgroundColor,
  },
  discount: {
    color: colors.green,
  },
}));

export default enrollStudentStyle;

export const customCss = {
  minWidth: '2vw',
  height: '3vw',
  padding: '1vw 1vw 1.2vw 1.2vw',
  borderRadius: '0.4vw !important',
  '& .MuiButtonRoot': {
    minWidth: '2vw !important',
  },
};
