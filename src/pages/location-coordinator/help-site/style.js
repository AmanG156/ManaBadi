import { colors, fonts } from '../../../theme';

const resourcesStyle = ((theme) => ({
  divWrapper: {
    width: '100% !important',
  },
  gridPadding: {
    padding: '24px',
    minHeight: 'calc(67vh)',
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
  '.MuiSvgIcon-root': {
    width: '1.5vw',
    height: '1.5vw',
  },
  toggleButtonGrid: {
    borderRadius: '0.8vw 0vw 0vw 0.8vw',
    border: '0 !important',
    '&.MuiButtonBase-root.MuiToggleButton-root': {
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
}));

export default resourcesStyle;
