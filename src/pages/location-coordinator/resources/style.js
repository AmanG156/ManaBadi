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
    justifyContent: 'space-between',
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
      '@media (min-width: 1200px)': {
        fontSize: '1vw',
      },
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
  helpSite: {
    width: '100%',
  },
  toggleList: {
    paddingLeft: 52,
    borderRadius: '0.8vw 0vw 0vw 0.8vw',
    border: '0 !important',
    '&.MuiButtonBase-root.MuiToggleButton-root': {
      lineHeight: 'normal',
      width: '4vw !important',
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
    '@media (min-width: 1200px)': {
      width: '1.5vw',
      height: '1.5vw',
    },
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
    '@media (min-width: 1200px)': {
      fontSize: '1.5vw',
    },
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
    '@media (min-width: 1200px)': {
      minWidth: '7.5vw  !important',
    },
  },
  gridPadding: {
    '@media (min-width: 1200px)': {
      padding: '24px',
    },
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
      '@media (min-width: 1200px)': {
        width: '10vw',
        padding: '0.7vw 1.5vw 0.7vw 10px !important',
      },
      '@media (max-width: 900px)': {
        width: '70vw',
        paddingLeft: '20px',
      },
    },
    '& span': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  location: {
    minWidth: '40vw',
    '& .MuiInputBase-root.MuiInput-root': {
      '@media (max-width: 1200px)': {
        minWidth: '35vw !important',
        maxWidth: '250px !important',
      },
    },
    '& .MuiSelect-select.MuiSelect-select': {
      '@media (min-width: 1200px)': {
        width: '30vw',
      },
      '@media (max-width: 1200px)': {
        width: '95%',
      },
    },
    '& span': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  assignyear: {
    display: 'contents',
    '& .MuiSelect-select': {
      '@media (min-width: 1200px)': {
        width: '150px',
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
    marginTop: '20px',
    '& .MuiButtonBase-root.MuiButton-root': {
      '@media (min-width: 1200px)': {
        height: '3vw !important',
        minWidth: '9vw !important',
      },
    },
  },
  mapPinImg: {
    '@media (min-width: 1200px)': {
      width: '1vw',
      height: '1vw',
      transform: 'translate(0.9vw, 0.1vw)',
    },
    marginRight: '0.2vw',
  },
  dropdownWrap: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    '@media (max-width: 900px)': {
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    '& .MuiFormControl-root': {
      '@media (max-width: 900px)': {
        width: 'unset !important',
      },
    },
    '& .MuiInputBase-root.MuiInput-root:before': {
      borderBottom: `0.15vw solid ${colors.primary}`,
    },
    '& svg:first-child': {
      margin: '0',
      color: colors.primary,
    },
    '& .MuiInput-root': {
      '@media (max-width: 900px)': {
        width: '250px',
      },
    },
    '& .MuiSelect-select.MuiInputBase-input.MuiInput-input:focus': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      borderRadius: '0',
    },
  },
  homeIcon: {
    width: '20px',
  },
}));

export default resourcesStyle;
