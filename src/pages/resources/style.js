import { colors, fonts } from '../../theme';

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
  fileIcon: {
    marginRight: '0.5vw',
  },
  errorText: {
    color: colors.errorText,
    '@media (min-width: 1200px)': {
      fontSize: '0.7vw',
    },
    marginLeft: '0.6vw',
  },
  editFileDialogAtom: {
    '& .MuiDialogContent-root': {
      overflow: 'hidden',
    },
    '& .MuiDialog-paper': {
      minWidth: '38vw !important',
      maxWidth: '50vw !important',
      overflowX: 'hidden !important',
      paddingBottom: '0',
      '@media (max-width: 1560px)': {
        minHeight: '19vw !important',
        maxHeight: '30vw !important',
      },
      '@media (max-width: 991px)': {
        minHeight: '32vw !important',
      },
      minHeight: '17.5vw !important',
      maxHeight: '20vw !important',
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
  resourceName: {
    background: colors.backgroundColor,
    padding: '0.7vw 0.5vw !important',
    '& .MuiCardContent-root:last-child': {
      padding: '0.5vw !important',
    },
    minHeight: '1vw',
    '@media (min-width: 900px)': {
      whiteSpace: 'nowrap',
    },
    display: 'flex',
    justifyContent: 'center',
    '& .MuiTypography-root': {
      textAlign: 'center',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      float: 'left',
      '@media (min-width: 1200px)': {
        width: '87%',
        fontSize: '0.9vw',
      },
    },
    '& .MuiSvgIcon-root': {
      '@media (min-width: 1200px)': {
        width: '1vw',
        height: '1vw',
      },
      cursor: 'pointer',
      color: colors.primary,
    },
  },
  fileViewer: {
    width: '80%',
    height: '80%',
    position: 'relative',
    '& .pg-viewer-wrapper': {
      overflowY: 'hidden',
    },
    '& img': {
      width: '80% !important',
      height: '100% !important',
    },
    '& .pg-viewer': {
      overflow: 'hidden',
    },
  },
  fileDownload: {
    height: '50px',
    position: 'absolute',
    top: '0',
    backgroundColor: 'rgb(0, 0, 0, .6)',
    padding: '5px',
    cursor: 'pointer',
    borderRadius: '15px',
    '& svg': {
      width: '50px',
      height: '50px',
    },
  },
  fileEmbed: {
    textAlign: 'center',
  },
  divVideo: {
    position: 'relative',
    paddingBottom: '52.25%',
    height: '0',
    marginLeft: '7%',
  },
  responsiveIframe: {
    position: 'absolute',
    top: '0',
    left: '0',
  },
  embedStyle: {
    backgroundColor: 'white',
    '@media (max-width: 899px)': {
      width: '100%',
    },
  },
  studentDetails: {
    padding: '0vw 1vw',
    '& .MuiDataGrid-root': {
      border: 'unset',
    },
  },
  resourceGrid: {
    padding: '0vw 2vw',
    width: '95vw',
    '@media (max-width: 899px)': {
      width: '95vw',
    },
    '& .MuiPaper-root-MuiCard-root': {
      border: `0.1vw solid  ${colors.backgroundGrey}`,
    },
    '& .MuiGrid-item': {
      '@media (min-width: 1200px)': {
        paddingLeft: '70px',
      },
      '& .MuiCard-root': {
        // boxShadow: 'unset',
        border: `0.1vw solid  ${colors.backgroundGrey}`,
      },
    },
  },
  resourceGridCard: {
    padding: '1.5vw',
  },
  resourcesCard: {
    border: '0.15vw solid #1000F2',
    borderRadius: '0.5vw',
    '@media (min-width: 1200px)': {
      height: '10vw',
    },
  },
  resourceGridCardImg: {
    display: 'grid',
    '@media (min-width: 1200px)': {
      height: '7.6vw',
    },
    '& svg': {
      '@media (min-width: 1200px)': {
        width: '2.5vw',
        height: '2.5vw',
      },
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
      borderBottom: '3px solid #025EE6 !important',
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
      '@media (min-width: 1200px)': {
        fontSize: '1vw',
      },
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
      border: 'unset',
      '& .MuiTypography-root, .MuiDataGrid-cellContent': {
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        },
      },
    },
    '& .MuiDataGrid-cell:focus-within': {
      outline: 'none',
      outlineOffset: 0,
    },
    '& .actionCell': {
      paddingLeft: '2vw',
    },
    '& .fileNameCell, .fileNameCellLC': {
      cursor: 'pointer',
      '& .MuiGrid-root': {
        overflow: 'hidden',
      },
    },
    '& .fileNameHeader, .fileNameCell': {
      '@media (min-width: 1200px)': {
        width: '20vw !important',
        minWidth: '16vw !important',
        maxWidth: '16vw !important',
        fontSize: '1vw',
        minHeight: '3vw !important',
        maxHeight: '3vw !important',
      },
      borderBottom: 'unset',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
      },
    },
    '& .fileNameHeaderLC, .fileNameCellLC': {
      width: '20vw !important',
      minWidth: '20vw !important',
      maxWidth: '20vw !important',
      fontSize: '1vw',
      minHeight: '3vw !important',
      maxHeight: '3vw !important',
      borderBottom: 'unset',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
      },
    },
    '& .dateCreatedHeader, .dateCreatedCell': {
      '@media (min-width: 1200px)': {
        width: '15vw !important',
        minWidth: '15vw !important',
        maxWidth: '15vw !important',
        fontSize: '1vw',
        minHeight: '3vw !important',
        maxHeight: '3vw !important',
      },
      borderBottom: 'unset',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '60px !important',
        minWidth: '60px !important',
        maxWidth: '60px !important',
      },
    },
    '& .MuiDataGrid-cellCheckbox, .MuiDataGrid-columnHeaderCheckbox': {
      '@media (min-width: 1200px)': {
        minHeight: '3vw !important',
        maxHeight: '3vw !important',
        minWidth: '3vw !important',
        maxWidth: '3vw !important',
      },
    },
    '& .createdByHeader, .createdByCell': {
      '@media (min-width: 1200px)': {
        width: '15vw !important',
        minWidth: '15vw !important',
        maxWidth: '15vw !important',
        fontSize: '1vw',
        minHeight: '3vw !important',
        maxHeight: '3vw !important',
      },
      borderBottom: 'unset',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
      },
    },
    '& .createdByHeaderLC, .createdByCellLC': {
      width: '15vw !important',
      minWidth: '16vw !important',
      maxWidth: '16vw !important',
      fontSize: '1vw',
      minHeight: '3vw !important',
      maxHeight: '3vw !important',
      borderBottom: 'unset',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
      },
    },
    '& .dateModifiedHeader, .dateModifiedCell': {
      '@media (min-width: 1200px)': {
        width: '15vw !important',
        minWidth: '15vw !important',
        maxWidth: '15vw !important',
        fontSize: '1vw',
        minHeight: '3vw !important',
        maxHeight: '3vw !important',
      },
      borderBottom: 'unset',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
      },
    },
    '& .modifiedByHeader, .modifiedByCell': {
      '@media (min-width: 1200px)': {
        width: '15vw !important',
        minWidth: '15vw !important',
        maxWidth: '15vw !important',
        fontSize: '1vw',
        minHeight: '3vw !important',
        maxHeight: '3vw !important',
      },
      borderBottom: 'unset',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
      },
    },
    '& .modifiedByHeaderLC, .modifiedByCellLC': {
      width: '15vw !important',
      minWidth: '16vw !important',
      maxWidth: '16vw !important',
      fontSize: '1vw',
      minHeight: '3vw !important',
      maxHeight: '3vw !important',
      borderBottom: 'unset',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
      },
    },
    '& .fileSizeHeader, .fileSizeCell': {
      '@media (min-width: 1200px)': {
        width: '10vw !important',
        minWidth: '10vw !important',
        maxWidth: '10vw !important',
        fontSize: '1vw',
        minHeight: '3vw !important',
        maxHeight: '3vw !important',
      },
      borderBottom: 'unset',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '60px !important',
        minWidth: '60px !important',
        maxWidth: '60px !important',
      },
    },
    '& .actionHeader, .actionCell': {
      '@media (min-width: 1200px)': {
        width: '10vw !important',
        minWidth: '10vw !important',
        maxWidth: '10vw !important',
        justifyContent: 'center !important',
        fontSize: '1vw',
        minHeight: '3vw !important',
        maxHeight: '3vw !important',
        paddingLeft: '0vw !important',
      },
      borderBottom: 'unset',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
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
      marginRight: '15px',
      borderRadius: '4px',
    },
  },
  uploadBtn: {
    marginleft: '21px',
    borderradius: '6px',
  },
  deactiveCheckbox: {
    '& .css-1vgzwi7-MuiFormControl-root': {
      margin: '0 24px',
      '& .MuiFormControlLabel-labelPlacementEnd': {
        marginLeft: '-100px',
        marginBottom: '-30px',
      },
    },

  },
}));

export default resourcesStyle;
