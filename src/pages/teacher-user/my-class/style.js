import { colors, fonts } from '../../../theme';

const StudentClassStyle = ((theme) => ({
  divWrapper: {
    width: '100% !important',
  },
  HeaderWrapper: {
    boxShadow: 'none',
    left: '0',
    top: '0',
    padding: '0 1vw',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontWeight: fonts.fontWeight.bold,
    fontSize: '1.5vw',
    padding: '10px 10px 10px 1px',
    [theme.breakpoints.down('md')]: {
      fontSize: 16,
    },
  },
  titleRow: {
    justifyContent: 'space-between',
    padding: '0 1vw',
  },
  gridPadding: {
    padding: '24px',
  },
  divAlignment: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  dropdownWrap: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    '& .MuiFormControl-root': {
      width: 'unset !important',
    },
    '& .MuiInputBase-root.MuiInput-root:before': {
      borderBottom: `0.15vw solid ${colors.primary}`,
    },
    '& .MuiSelect-select.MuiInputBase-input.MuiInput-input:focus': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      borderRadius: '0',
    },
  },
  location: {
    display: 'contents',
    '& img': {
      width: '1vw',
      height: '1vw',
      transform: 'translate(0.9vw, 0.1vw)',
      marginRight: '0.2vw',
    },
    '& .MuiSelect-select': {
      width: '30vw',
    },
  },
  googleClasses: {
    display: 'contents',
    '& .MuiSelect-select': {
      width: '25vh',
    },
  },
  assignyear: {
    display: 'contents',
    '& .MuiSelect-select': {
      width: '150px',
    },
  },
  emailIcon: {
  },
  emailIconDisable: {
    opacity: '.6',
    cursor: 'not-allowed',
  },
  rightIcons: {
    textAlign: 'right',
    borderRadius: '0.4vw !important',
    position: 'relative',
    padding: '0.5vw',
    marginLeft: 'auto',
    '& svg': {
      width: '1.5vw',
      height: '1.5vw',
      color: colors.black,
      [theme.breakpoints.down('md')]: {
        width: 16,
        height: 16,
      },
    },
    '&:hover': {
      backgroundColor: 'white !important',
      minHeight: '3px !important',
    },
  },
  dataGridMyClass: {
    border: 'unset',
    '.MuiDataGrid-root': {
      outline: 'none !important',
      border: 'none !important',
    },
    '& .MuiDataGrid-virtualScroller': {
      overflowY: 'auto !important',
      overflowX: 'hidden !important',
    },
    '& .MuiDialogContent-root': {
      overflow: 'hidden',
    },
    '& .MuiDataGrid-row': {
      maxHeight: '4.5vw !important',
      minHeight: '4.5vw !important',
      alignItems: 'center',
    },
    '& .MuiDataGrid-iconButtonContainer': {
      visibility: 'visible',
      width: '0 !important',
    },
    '& .MuiDataGrid-columnHeaders': {
      borderBottom: '4px solid #025EE6 !important',
      borderTop: 'none',
      fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
      fontStyle: 'bold',
      fontSize: '0.9vw',
      lineHeight: '131.19%',
      color: colors.actionIconsColor,
      minHeight: '3vw !important',
      maxHeight: '3vw !important',
      zIndex: '111 !important',
      backgroundColor: '#fff  !important',
    },
    '& .MuiDataGrid-iconSeparator': {
      visibility: 'hidden',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 'bold',
      fontSize: '0.9vw',
      textAlign: 'left',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
      },
    },
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeaderTitle:focus': {
      outline: 'none',
    },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within': {
      outline: 'none !important',
    },
    '& .MuiDataGrid-cell': {
      textAlign: 'left',
      border: 'none !important',
    },
    '& .parentHeader, .parentNameCell': {
      width: '12vw !important',
      minWidth: '10vw !important',
      maxWidth: '10vw !important',
      fontSize: '0.9vw',
      minHeight: '3vw !important',
      maxHeight: '3vw !important',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
      },
    },
    '& .marksTableHeader, .marksTableCell': {
      width: '10vw !important',
      minWidth: '10vw !important',
      maxWidth: '10vw !important',
      fontSize: '0.9vw',
      minHeight: '3vw !important',
      maxHeight: '3vw !important',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
      },
      '& .MuiFormControl-root': {
        width: '45%',
      },
      '& .MuiOutlinedInput-input': {
        padding: '12px 10px',
      },
      '& div:first-child': {
        display: 'flex',
        alignItems: 'center',
        '& span': {
          padding: '0 10px',
        },
      },
    },
    '& .MuiDataGrid-cellCheckbox, .MuiDataGrid-columnHeaderCheckbox': {
      minHeight: '3vw !important',
      maxHeight: '3vw !important',
      minWidth: '5vw !important',
      maxWidth: '5vw !important',
    },
    '& .studentNameHeader, .studentNameCell': {
      width: '11vw !important',
      minWidth: '11vw !important',
      maxWidth: '11vw !important',
      fontSize: '0.9vw',
      minHeight: '3vw !important',
      maxHeight: '3vw !important',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
      },
    },
    '& .studentEmailHeader, .studentEmailCell': {
      width: '20vw !important',
      minWidth: '16vw !important',
      maxWidth: '16vw !important',
      fontSize: '0.9vw',
      minHeight: '3vw !important',
      maxHeight: '3vw !important',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
      },
    },
    '& .marksHeader, .marksCell': {
      width: '3vw !important',
      minWidth: '4vw !important',
      maxWidth: '4vw !important',
      fontSize: '0.9vw',
      minHeight: '3vw !important',
      maxHeight: '3vw !important',
      justifyContent: 'space-around',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
      },
      '& .MuiDataGrid-columnHeaderDraggableContainer': {
        '& span': {
          top: '-18px',
          left: '5px',
          cursor: 'pointer',
          zIndex: '1',
          position: 'absolute',
        },
      },
      '& .MuiDataGrid-columnHeaderTitleContainer': {
        justifyContent: 'center',
      },
    },
    '& .bonusHeader, .bonusCell': {
      width: '6vw !important',
      minWidth: '6vw !important',
      maxWidth: '6vw !important',
      fontSize: '0.9vw',
      minHeight: '3vw !important',
      maxHeight: '3vw !important',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
      },
      '& .MuiDataGrid-cellContent': {
        color: '#fff',
        backgroundColor: '#9cc962',
        borderRadius: '0.3vw',
        textAlign: 'center',
        padding: '0.5vw',
        fontSize: '0.9vw',
        width: '1.5vw',
        height: '1.5vw',
        '@media (max-width: 1199px)': {
          padding: '3px 5px',
          fontSize: '12px',
        },
      },
    },
    '& .annualHeader, .annualCell': {
      width: '9vw !important',
      minWidth: '9vw !important',
      maxWidth: '9vw !important',
      fontSize: '0.9vw',
      minHeight: '3vw !important',
      maxHeight: '3vw !important',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
      },
    },
    '& .gradeHeader, .gradeCell': {
      width: '4vw !important',
      minWidth: '4vw !important',
      maxWidth: '4vw !important',
      fontSize: '0.9vw',
      minHeight: '3vw !important',
      maxHeight: '3vw !important',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
      },
    },
    '& .gpaHeader, .gpaCell': {
      width: '5vw !important',
      minWidth: '5vw !important',
      maxWidth: '5vw !important',
      fontSize: '0.9vw',
      minHeight: '3vw !important',
      maxHeight: '3vw !important',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
      },
    },
    '& .actionHeader, .actionCell': {
      width: '12vw !important',
      minWidth: '12vw !important',
      maxWidth: '12vw !important',
      fontSize: '0.9vw',
      minHeight: '3vw !important',
      maxHeight: '3vw !important',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
      },
    },
    '& .MuiDataGrid-cell:focus-within': {
      outline: 'none',
      outlineOffset: 0,
    },
    '& .MuiTablePagination-root': {
      '& .MuiTablePagination-selectLabel, .MuiInputBase-root': {
        display: 'none',
      },
      '& svg': {
        [theme.breakpoints.down('md')]: {
          width: '20px !important',
          height: '20px !important',
        },
      },
      '& .MuiTablePagination-displayedRows': {
        fontSize: '1vw !important',
        [theme.breakpoints.down('md')]: {
          fontSize: '12px !important',
        },
      },
    },
  },
  emailIconColor: {
    borderRadius: '0.4vw !important',
    position: 'relative',
    padding: '0.5vw',
    '& svg': {
      width: '1.5vw',
      height: '1.5vw',
      color: colors.blue,
      [theme.breakpoints.down('md')]: {
        width: 16,
        height: 16,
      },
    },
    '&:hover': {
      backgroundColor: 'white !important',
      minHeight: '3px !important',
    },
  },
  marksBlock: {
    display: 'flex !important',
  },
  marksRed: {
    color: '#fff',
    backgroundColor: '#f55c4c',
    borderRadius: '0.3vw',
    textAlign: 'center',
    padding: '10px 5px',
    fontSize: '0.9vw',
    width: '55px',
    height: '30px',
    '@media (max-width: 1199px)': {
      padding: '3px 5px',
      fontSize: '12px',
    },
  },
  marksGreen: {
    color: '#fff',
    backgroundColor: '#9cc962',
    borderRadius: '0.3vw',
    textAlign: 'center',
    padding: '10px 5px',
    fontSize: '0.9vw',
    width: '55px',
    height: '30px',
    '@media (max-width: 1199px)': {
      padding: '3px 5px',
      fontSize: '12px',
    },
  },
  marksYellow: {
    color: '#fff',
    backgroundColor: '#ffeb3c',
    borderRadius: '0.3vw',
    textAlign: 'center',
    padding: '10px 5px',
    fontSize: '0.9vw',
    width: '55px',
    height: '30px',
    '@media (max-width: 1199px)': {
      padding: '3px 5px',
      fontSize: '12px',
    },
  },
  button: {
    justifyContent: 'flex-end',
    margin: '10px 4px 3px 1px',
    width: '98%',
  },
  setGreen: {
    color: colors.lightGreen,
  },
  innerContainer: {
    margin: '0.3vw 0.6vw',
    fontFamily: fonts.fontType.roboto,
    '@media (max-width: 1023px), @media (min-width: 375px)': {
      width: '97%',
      margin: '0 0 0 10px',
      '& .MuiFormControl-root': {
        margin: '10px 0 0 0',
      },
    },
    '& .MuiOutlinedInput-root': {
      '@media (min-width: 1200px)': {
        height: '2.692vw',
        borderRadius: '0.4vw',
        width: '100%',
      },
      '& .MuiSelect-select': {
        minHeight: '0vw !important',
      },
    },
    '& .MuiFormControl-root .MuiInputLabel-root': {
      lineHeight: '0.9vw !important',
      fontSize: '0.9vw',
      color: `${colors.primary} !important`,
    },
  },
  form: {
    marginTop: '0 !important',
  },
  changeGridLayout: {
    minWidth: '800px',
    '& .MuiFormControl-root': {
      width: '100%',
      '& .MuiInputLabel-root': {
        fontSize: '0.9vw',
        lineHeight: '1vw !important',
        transform: 'translate(0.7vw, 0.9vw)',
        '&.MuiInputLabel-shrink': {
          transform: 'translate(0.7vw, -0.5vw)',
          '@media (max-width: 1200px)': {
            transform: 'translate(14px, -9px) scale(0.75)',
          },
          fontSize: '0.7vw',
          color: '#104F96',
        },
      },
    },
    '& .MuiGrid-root.MuiGrid-container': {
      maxWidth: 'inherit !important',
      paddingLeft: '1vw',
    },
    '& .MuiGrid-root.MuiGrid-grid-md-3, & .MuiGrid-root.MuiGrid-grid-xs-3': {
      maxWidth: '25% !important',
      '& .MuiOutlinedInput-input': {
        width: '100%',
        height: '1.2vw',
        fontSize: '0.9vw',
        padding: '0.7vw',
        transform: 'translate(0vw, -0.1vw)',
      },
    },
  },
  switchSection: {
    textAlign: 'center',
    '& .MuiTypography-h5': {
      fontSize: '0.9vw',
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
  marksDropDown: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiFormControl-root': {
      width: '100px !important',
      marginRight: '10px !important',
    },
  },
  addStyleHead: {
    // borderBottom: '4px solid #0758cb !important',
    '& p': {
      // color: colors.primary,
      color: 'hsl(212deg 81% 33%)',
      fontSize: '0.9vw',
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
  secButtonNew: {
    marginRight: '20px',
    marginTop: '10px',
  },
  marksTotal: {
    display: 'flex',
    '& span': {
      width: '11.5vw !important',
      fontSize: '0.9vw',
      maxWidth: '13vw !important',
      minWidth: '13vw !important',
      marginRight: '1.8vw',
      paddingTop: '1vw',
      paddingLeft: '2vw',
    },
    '& .MuiInputBase-formControl': {
      width: '47% !important',
      '& input': {
        padding: '0.7vw',
      },
    },
  },
  wrappingCell: {
    width: '16vw',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));

export default StudentClassStyle;
