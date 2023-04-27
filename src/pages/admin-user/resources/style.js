import { colors, fonts } from '../../../theme';

const resourcesStyle = ((theme) => ({
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
    // justifyContent: 'space-between',
  },
  courseData: {
    padding: '1.5vw 2vw 1vw 0vw',
  },
  slash: {
    marginRight: '1vw',
  },
  toggleButtonGrp: {
    border: '0.1vw solid #ccc',
    borderRadius: '0.4vw',
    maxHeight: '2.5vw',
    paddingRight: 1,
    [theme.breakpoints.down('md')]: {
      maxHeight: 'inherit',
    },
  },
  resourceName: {
    backgroundColor: colors.resourceNameBG,
    padding: '0.5vw !important',
    '& .MuiCardContent-root:last-child': {
      padding: '0.5vw !important',
      fontSize: '0.9vw',
    },
    minHeight: '1vw',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  fileViewer: {
    '& .pg-viewer-wrapper': {
      overflowY: 'hidden',
    },
  },
  dataGrid: {
    '.MuiDataGrid-root': {
      outline: 'none !important',
      border: 'none !important',
    },
    '& .MuiDataGrid-iconButtonContainer': {
      visibility: 'visible',
      width: '0 !important',
    },
    '& .MuiDataGrid-columnHeaders': {
      borderBottom: '1px solid #025EE6 !important',
      borderTop: 'none',
      fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
      fontStyle: 'bold',
      fontSize: '1vw',
      lineHeight: '131.19%',
      color: '#025EE6',
      minHeight: '3vw !important',
      maxHeight: '3vw !important',
    },
    '& .MuiDataGrid-virtualScroller': {
      marginTop: '3vw !important',
    },
    '& .MuiDataGrid-iconSeparator': {
      visibility: 'hidden',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 'bold',
      fontSize: '1vw',
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
    },
    '& .MuiDataGrid-cell:focus-within': {
      outline: 'none',
      outlineOffset: 0,
    },
    '& .actionCell': {
      paddingLeft: '2vw',
    },
  },
  toggleButtonList: {
    paddingLeft: 52,
    borderRadius: '0.8vw 0vw 0vw 0.8vw',
    border: '0 !important',
    '&.MuiButtonBase-root.MuiToggleButton-root': {
      width: '4vw !important',
      lineHeight: 'normal',
      padding: '0.9vw 0.5vw 0.5vw 0.5vw',
      [theme.breakpoints.down('md')]: {
        width: '35px !important',
        height: '35px !important',
        padding: '0 5px !important',
        // lineHeight: '35px !important',
      },
      '&:hover': {
        background: colors.toggleButtonBG,
        borderRadius: '0.4vw 1vw 1vw 0.4vw',
        '& svg': {
          color: colors.white,
        },
      },
      '&.Mui-selected': {
        background: colors.toggleButtonBG,
        borderRadius: '0.4vw 1vw 1vw 0.4vw',
        '& svg': {
          color: colors.white,
        },
      },
    },
  },
  '.MuiSvgIcon-root': {
    width: '1.5vw',
    height: '1.5vw',
  },
  toggleButtonGrid: {
    borderRadius: '0.8vw 0vw 0vw 0.8vw',
    border: '0 !important',
    '&.MuiButtonBase-root.MuiToggleButton-root': {
      lineHeight: 'normal',
      width: '4vw !important',
      padding: '0.5vw !important',
      [theme.breakpoints.down('md')]: {
        width: '35px !important',
        height: '35px !important',
        padding: '0 5px !important',
      },
      '&:hover': {
        background: colors.toggleButtonBG,
        borderRadius: '1vw 0.4vw 0.4vw 1vw',
        '& svg': {
          color: colors.white,
        },
      },
      '&.Mui-selected': {
        background: colors.toggleButtonBG,
        borderRadius: '1vw 0.4vw 0.4vw 1vw',
        '& svg': {
          color: colors.white,
        },
      },
    },
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
  addbutton: {
    minWidth: '7.5vw  !important',
  },
  gridPadding: {
    padding: '24px',
    minHeight: 'calc(67vh)',
  },
  divstule: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  studentcourse: {
    display: 'contents',
    '& .MuiSelect-select.MuiSelect-select': {
      padding: '0.7vw 1.5vw !important',
      '@media (min-width: 1200px)': {
        width: '9vw',
      },
      '@media (max-width: 1200px)': {
        width: '100px',
      },
    },
  },
  popupTextField: {
    margin: '15px 0 !important',
    width: '100% !important',
  },
  popupButton: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: '2vw',
    '& .MuiButtonBase-root.MuiButton-root': {
      '@media (min-width: 1200px)': {
        height: '3vw !important',
        minWidth: '9vw !important',
      },
      marginRight: '15px',
      borderRadius: '4px',
    },
  },
  uploadBtn: {
    marginleft: '1vw',
    borderRadius: '0.5vw',
  },
  deactiveCheckbox: {
    '& .MuiFormControl-root': {
      margin: '1vw',
      minWidth: '3vw',
      '& .MuiFormControlLabel-labelPlacementEnd': {
        marginBottom: '-3vw',
      },
    },
  },
  dropdownWrap: {
    display: 'flex',
    width: '100%',
    '& .MuiFormControl-root': {
      width: 'unset !important',
    },
    '& .MuiInputBase-root.MuiInput-root:before': {
      borderBottom: `0.15vw solid ${colors.primary}`,
    },
    '& svg:first-child': {
      margin: '0 0 -7px 0',
      color: colors.primary,
    },
    '& .MuiSelect-select.MuiInputBase-input.MuiInput-input:focus': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      borderRadius: '0',
    },
  },
  uploadVideoBtn: {
    color: 'black',
    background: 'transparent',
    boxShadow: 'unset',
    borderRadius: 'unset !important',
    padding: 'unset',
    fontSize: '0.9vw',
    justifyContent: 'flex-start',
    textTransform: 'capitalize',
    '&:hover': {
      background: 'transparent',
      boxShadow: 'unset',
    },
  },
  dialogfooter: {
    paddingRight: '1.8vw',
    margin: '-1vw 0 0 0',
    color: `${colors.black} !important`,
    fontSize: 'calc(8px + 6 * ((100vw - 320px) / 1199)) !important',
  },
  alertprimary: {
    height: '2vw',
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
    color: colors.green,
  },
  errorPrimary: {
    height: '2vw',
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
    color: colors.red,
  },
  errorText: {
    color: colors.errorText,
    '@media (min-width: 1200px)': {
      fontSize: '0.7vw',
    },
    marginLeft: '0.6vw',
  },
  DialogAtom: {
    '& .MuiDialogContent-root': {
      overflow: 'hidden',
    },
    '& .MuiDialog-paper': {
      minWidth: '38vw !important',
      maxWidth: '50vw !important',
      overflowX: 'hidden !important',
      paddingBottom: '0',
      '@media (max-width: 1560px)': {
        minHeight: '17vw !important',
        maxHeight: '30vw !important',
      },
      '@media (max-width: 991px)': {
        minHeight: '32vw !important',
      },
      minHeight: '21.5vw !important',
      maxHeight: '23vw !important',
    },
    '& .MuiDialogContent-root .MuiGrid-root': {
      maxWidth: '65vw !important',
    },
    '& .MuiFormControlLabel-root .MuiFormControlLabel-label': {
      fontSize: '0.9vw',
      color: colors.placeHolderColor,
      marginLeft: '0vw !important',
      fontFamily: fonts.fontType.roboto,
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
      },
      '@media (max-width: 1199px)': {
        fontSize: 'calc(10px + 6 * ((100vw - 320px) / 1199))',
      },
    },
    '& .MuiFormControl-root': {
      margin: '0 !important',
    },
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .MuiFormControlLabel-label': {
      color: `${colors.black} !important`,
      fontSize: 'calc(8px + 6 * ((100vw - 320px) / 1199)) !important',
    },
    '& .MuiTypography-root': {
      margin: '1vw 0vw 0.9vw 0vw',
    },
  },
  Menubox: {
    '& .MuiList-root.MuiMenu-list': {
      paddingTop: 'unset',
      paddingBottom: 'unset',
      '& .MuiMenuItem-gutters': {
        display: 'flex',
        '& .MuiSvgIcon-fontSizeMedium': {
          margin: '0.2VW 0.3VW',
        },
      },
    },
    '& ul': {
      '& svg': {
        '@media (min-width: 1200px)': {
          width: '1.2vw',
          height: '1.2vw',
        },
      },
      '& label:first-child': {
        '& svg': {
          transform: 'rotate(90deg)',
        },
      },
    },
  },
  popupBtnDisable: {
    opacity: '.6',
    '& button': {
      cursor: 'not-allowed',
    },
  },
  helpSite: {
    width: '100%',
  },
}));

export default resourcesStyle;
