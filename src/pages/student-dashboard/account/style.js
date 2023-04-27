import { colors, fonts } from '../../../theme';

const accountdetailstyle = ((theme) => ({
  outerContainer: {

  },
  additionalInfoTitle: {
    marginTop: '2vw',
    paddingBottom: 10,
    color: colors.black,
    '@media (min-width: 1200px)': {
      fontSize: '1.3vw',
    },
    fontWeight: fonts.fontWeight.semi,
  },
  profileImg: {
    borderRadius: '50%',
    width: '10vw !important',
    height: '10vw !important',
    margin: '1vw 1vw',

  },
  parentName: {
    fontWeight: fonts.fontWeight.bold,
    '@media (min-width: 1200px)': {
      fontSize: '1.3vw',
    },
    textAlign: 'left',
    color: colors.actionIconsColor,
    paddingBottom: '0.5vw',
    paddingTop: '1vw',
  },
  dataPadding: {
    paddingTop: '0.5vw',
    paddingBottom: '0.5vw',
    display: 'flex',
    flexDirection: 'row',
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
      '@media (min-width: 1200px)': {
        fontSize: '1vw !important',
      },
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
        width: '12px !important',
        height: '12px !important',
      },
      [theme.breakpoints.down('sm')]: {
        width: '20px !important',
        height: '20px !important',
      },
    },
  },
  additionalContainer: {
    paddingBottom: '1vw',
  },
  innerContainer: {
    padding: '5px',
  },
  titleContainer: {
    paddingBottom: '0.5vw',
    color: colors.black,
    '@media (min-width: 1200px)': {
      fontSize: '1.2vw',
    },
    fontWeight: 600,
    paddingTop: '2vw',
  },
  label: {
    display: 'flex',
    fontWeight: fonts.fontWeight.low,
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
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
      fontSize: '0.9vw',
    },
    color: colors.black,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    hyphens: 'manual',
  },
  previewValue: {
    marginLeft: '0.3vw !important',
  },
  additionalInfo: {
    marginRight: '1.5vw',
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
  studentTitle: {
    fontWeight: fonts.fontWeight.bold,
    '@media (min-width: 1200px)': {
      fontSize: '2vw',
    },
    textAlign: 'left',
    color: colors.primary,
    marginLeft: '10px',
  },
  '.MuiSvgIcon-root': {
    '@media (min-width: 1200px)': {
      fontSize: '0.5vw',
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
  displayEdit: {
    float: 'right',
    marginTop: '1vw',
  },
  studentDetails: {
    padding: '1vw 0',
  },
  editParentBlock: {
    marginLeft: '-1vw',
  },
  form: {
    width: '101% !important',
    padding: '2vw 0 1vw 0',
  },
  editStudentBlock: {
    padding: '2vw 0 1vw 0',
    width: '101%',
    '& form': {
      paddingBottom: '1vw',
    },
    '& input#academicSchool': {
      // width: '95%',
      '@media (max-width: 1199px)': {
        // padding: '16.5px 14px',
      },
    },
  },
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
      fontSize: '0.9vw',
    },
    '& tr': {
      '& td, & th': {
        fontSize: '1.1vw',
        lineHieght: '1.5vw',
        '&:last-child': {
          borderRight: 0,
        },
      },
    },
    '& .MuiOutlinedInput-root input ': {
      width: '6.5vw !important',
      textAlign: 'right',
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
    textAlign: 'right',
    marginBottom: '1vw',
    marginRight: '1vw',
    '& .MuiButtonBase-root.MuiButton-root': {
      position: 'absolute',
      right: '3vw',
    },
  },
  errorText: {
    color: colors.errorText,
    '@media (min-width: 1200px)': {
      fontSize: '0.8vw',
      marginLeft: '1vw',
    },
    fontFamily: fonts.fontType.roboto,
    display: 'block',
    marginTop: '0',
    // textAlign: 'right',
  },
  contributionAmount: {
    '& .MuiFormControl-root': {
      width: '6.5vw !important',
      marginRight: '0.5vw',
    },
    '& .MuiOutlinedInput-input.Mui-disabled': {
      width: '100% !important',
      marginRight: '0',
    },
  },
  discount: {
    color: colors.green,
  },
  totalPaymentRow: {
    backgroundColor: colors.backgroundColor,
  },
}));

export default accountdetailstyle;

export const customCss = {
  minWidth: '2vw',
  height: '3vw',
  padding: '1vw 1vw 1.2vw 1.2vw',
  borderRadius: '0.4vw !important',
  '& .MuiButtonRoot': {
    minWidth: '2vw !important',
  },
};
