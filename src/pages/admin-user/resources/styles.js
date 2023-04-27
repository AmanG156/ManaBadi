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
  resourceName: {
    background: colors.resourceNameBG,
    padding: '5px !important',
    '& .MuiCardContent-root:last-child': {
      padding: '5px !important',
    },
  },
  fileViewer: {
    '& .pg-viewer-wrapper': {
      overflowY: 'hidden',
    },
  },
  gridContainer: {
    padding: '2vw 2vw 2vw 3vw !important',
    minHeight: '65vh',
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
      fontSize: '0.9vw',
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
      fontSize: '0.9vw !important',
    },
    '& .fileNameHeader, .fileNameCell': {
      '@media (min-width: 1200px)': {
        width: '20vw !important',
        minWidth: '20vw !important',
        maxWidth: '20vw !important',
        fontSize: '1vw',
        minHeight: '2.7vw !important',
        maxHeight: '10vw !important',
      },
    },
    '& .fileNameCell': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingTop: '1vw',
    },
    '& .dateCreatedHeader, .dateCreatedCell': {
      '@media (min-width: 1200px)': {
        width: '13vw !important',
        minWidth: '13vw !important',
        maxWidth: '13vw !important',
        fontSize: '1vw',
        minHeight: '2.7vw !important',
        maxHeight: '10vw !important',
      },
    },
    '& .dateCreatedCell': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingTop: '1vw',
    },
    '& .createdByHeader, .createdByCell': {
      width: '10vw !important',
      minWidth: '10vw !important',
      maxWidth: '10vw !important',
      fontSize: '1vw',
      minHeight: '2.7vw !important',
      maxHeight: '10vw !important',
    },
    '& .createdByCell': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingTop: '1vw',
    },
    '& .dateModifiedHeader, .dateModifiedCell': {
      '@media (min-width: 1200px)': {
        width: '13vw !important',
        minWidth: '13vw !important',
        maxWidth: '13vw !important',
        fontSize: '1vw',
        minHeight: '2.7vw !important',
        maxHeight: '10vw !important',
      },
    },
    '& .dateModifiedCell': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingTop: '1vw',
    },
    '& .modifiedByHeader, .modifiedByCell': {
      '@media (min-width: 1200px)': {
        width: '10vw !important',
        minWidth: '10vw !important',
        maxWidth: '10vw !important',
        fontSize: '1vw',
        minHeight: '2.7vw !important',
        maxHeight: '10vw !important',
      },
    },
    '& .modifiedByCell': {
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '1vw',
    },
    '& .fileSizeHeader, .fileSizeCell': {
      '@media (min-width: 1200px)': {
        width: '10vw !important',
        minWidth: '10vw !important',
        maxWidth: '10vw !important',
        fontSize: '1vw',
        minHeight: '2.7vw !important',
        maxHeight: '10vw !important',
      },
    },
    '& .fileSizeCell': {
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '1vw',
    },
    '& .actionHeader, .actionCell': {
      '@media (min-width: 1200px)': {
        width: '10vw !important',
        minWidth: '10vw !important',
        maxWidth: '10vw !important',
        fontSize: '1vw',
        minHeight: '2.7vw !important',
        maxHeight: '10vw !important',
      },
    },
    '& .actionCell': {
      flexDirection: 'column',
      alignItems: 'center',
      // paddingTop: '1vw',
    },
    '& .MuiDataGrid-cell:focus-within': {
      outline: 'none',
      outlineOffset: 0,
    },
    // '& .actionCell': {
    //   paddingLeft: '2vw',
    // },
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
    fontSize: '0.5vw',
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
    '& .MuiSelect-select': {
      width: '105px',
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
}));

export default resourcesStyle;
