import { colors, fonts } from '../../../theme';

const paymentInfoStyle = (() => ({
  root: {
    background: colors.white,
    width: '100%',
    boxShadow: 'none !important',
  },
  content: {
    fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    '@media (min-width: 1200px)': {
      marginLeft: '2%',
      fontFamily: fonts.fontType.roboto,
      fontSize: '0.9vw',
      lineHeight: 1.5,
    },
  },
  totalPayment: {
    color: colors.black,
    padding: '1%',
    fontWeight: fonts.fontWeight.bold,
    background: colors.secondary,
    width: '100%',
    fontSize: '1.2vw',
    borderRadius: 5,
    marginBottom: '15px',
    '@media (max-width: 1199px)': {
      fontSize: 'calc(14px + 6 * ((100vw - 320px) / 1199))',
    },
  },
  payButton: {
    marginTop: 20,
  },
  heading: {
    color: colors.footerBottomColor,
    padding: '5px 5px 5px 0px',
    fontWeight: 500,
    // background: 'skyblue',
    width: '100%',
    fontSize: '1.5vw',
    marginTop: '20px',
    borderRadius: 5,
    '@media (max-width: 1199px)': {
      fontSize: 'calc(14px + 6 * ((100vw - 320px) / 1199))',
    },
  },
  summaryGrid: {
    display: 'inherit',
    border: '0.2vw solid #104F96',
    borderTop: 'none',
    fontSize: '1vw',
    fontWeight: 'bold',
    margin: '0vw 0 1vw 0vw',
    '@media (max-width: 1199px)': {
      fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    },
    '@media (min-width: 1200px)': {
      height: '4vw',
    },
  },
  mainContainer: {
    paddingTop: 20,
    '@media (min-width: 1021px)': {
      paddingRight: 8,
    },
    '@media (max-width: 1200px)': {
      justifyContent: 'flex-end',
    },
    '& .MuiDataGrid-root': {
      border: '0.2vw solid #104F96',
      borderBottom: '0.1vw solid #ccc',
      borderBottomLeftRadius: 'revert',
      borderBottomRightRadius: 'revert',
    },
    '& .MuiDataGrid-cell': {
      '@media (min-width: 1200px)': {
        minHeight: '3vw !important',
        maxHeight: '4vw !important',
      },
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontSize: '1vw',
      fontWeight: 'bold',
      '@media (max-width: 1199px)': {
        fontSize: 'calc(14px + 6 * ((100vw - 320px) / 1199))',
      },
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: colors.secondary,
    },
    '& .MuiDataGrid-cell--textLeft': {
      justifyContent: 'center',
    },
    '& .studentNameHeader, .studentNameCell': {
      '@media (min-width: 1200px)': {
        width: '13vw !important',
        minWidth: '13vw !important',
        maxWidth: '13vw !important',
        fontSize: '1vw',
      },
    },
    '& .studentNameCell, .classCell, .courseFeeCell, .registrationFeeCell, .pstuFeeCell, .totalFeeCell': {
      justifyContent: 'flex-end',
      paddingLeft: '2vw',
    },
    '& .classHeader, .classCell': {
      '@media (min-width: 1200px)': {
        width: '10vw !important',
        minWidth: '10vw !important',
        maxWidth: '10vw !important',
        fontSize: '1vw',
      },
    },
    '& .courseFeeHeader, .courseFeeCell': {
      '@media (min-width: 1200px)': {
        width: '9vw !important',
        minWidth: '9vw !important',
        maxWidth: '9vw !important',
        fontSize: '1vw',
      },
    },
    '@media (min-width: 1200px)': {
      '& .registrationFeeHeader, .registrationFeeCell': {
        width: '11vw !important',
        minWidth: '11vw !important',
        maxWidth: '11vw !important',
        fontSize: '1vw',
      },
      '& .pstuFeeHeader, .pstuFeeCell': {
        width: '9vw !important',
        minWidth: '9vw !important',
        maxWidth: '9vw !important',
        fontSize: '1vw',
      },
      '& .discountHeader, .discountCell': {
        width: '9vw !important',
        minWidth: '9vw !important',
        maxWidth: '9vw !important',
        fontSize: '1vw',
      },
      '& .discountCell': {
        justifyContent: 'flex-end',
        color: colors.green,
        paddingLeft: '2vw',
      },
      '& .totalFeeHeader, .totalFeeCell': {
        width: '11vw !important',
        minWidth: '10vw !important',
        maxWidth: '11vw !important',
        fontSize: '1vw',
      },
    },
  },
  dialogButtons: {
    paddingRight: 'inherit',
  },
  error: {
    marginLeft: '7% !important',
  },
  errorText: {
    marginRight: '1vw !important',
    marginBottom: '1vw',
  },
  termsText: {
    color: `${colors.primary} !important`,
    fontWeight: fonts.fontWeight.bold,
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
  },
  activeButton: {
    borderRadius: '0.4vw',
    minWidth: '10vw',
  },
  acceptCheckbox: {
    marginLeft: '1vw',
  },
  borderBottom: {
    width: '100%',
    height: 5,
    display: 'block',
    background: colors.secondary,
  },
  footerBottom: {
    background: colors.footerBottomColor,
    height: 3,
    display: 'block',
    width: '100%',
  },
  list: {
    paddingLeft: 0,
  },
  listItem: {
    marginBottom: 3,
  },
  headerContainer: {
    maxWidth: 'inherit',
  },
  textAlign: {
    textAlign: 'right',
  },
  paddingLeft: {
    '@media (min-width: 1200px)': {
      paddingRight: '0.6vw !important',
    },
    textAlign: 'right',
    '@media (max-width: 1199px)': {
      paddingRight: '8px',
      paddingBottom: '16px',
    },
  },
  contributionAmount: {
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
    '& .MuiFormControl-root': {
      '@media (max-width: 1199px)': {
        marginTop: '0px',
      },
      margin: '0.8vw 0vw 0vw 0vw',
    },
    '& .MuiFormControl-root.MuiTextField-root': {
      margin: 0,
    },
  },
  headerTitle: {
    paddingLeft: '0 !important',
  },
  contributionCause: {
    paddingLeft: '2vw !important',
    '& .MuiFormControl-root': {
      '@media (min-width: 1200px)': {
        width: '24vw',
        borderRadius: '1vw',
      },
    },
    '& .MuiOutlinedInput-root': {
      // borderRadius: '0.3vw !important',
      '@media (max-width: 1200px)': {
        lineHeight: 'normal',
      },
    },
  },
  commonButtonNew: {
    minWidth: '2vw !important',
    height: '3vw !important',
    padding: '1vw 1vw 1.2vw 1.2vw !important',
    '@media (max-width: 1199px)': {
      height: 'auto !important',
      padding: '5px 8px !important',
      minWidth: 'auto !important',
      borderRadius: '12px !important',
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
}));

export default paymentInfoStyle;
