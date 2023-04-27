import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
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
    '& .parentHeader, .parentNameCell': {
      width: '13vw !important',
      minWidth: '13vw !important',
      maxWidth: '13vw !important',
      fontSize: '1vw',
      minHeight: '3vw !important',
      maxHeight: '3vw !important',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
      },
    },
    '& .picturesHeader, .picturesCell': {
      width: '7vw !important',
      minWidth: '7vw !important',
      maxWidth: '7vw !important',
      fontSize: '1vw',
      '@media (min-width: 1200px)': {
        minHeight: '3vw !important',
        maxHeight: '3vw !important',
      },
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
    '& .studentNameHeader, .studentNameCell': {
      width: '13vw !important',
      minWidth: '13vw !important',
      maxWidth: '13vw !important',
      fontSize: '1vw',
      minHeight: '3vw !important',
      maxHeight: '3vw !important',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
      },
    },
    '& .centerHeader, .centerCell': {
      width: '20vw !important',
      minWidth: '20vw !important',
      maxWidth: '20vw !important',
      fontSize: '1vw',
      minHeight: '3vw !important',
      maxHeight: '3vw !important',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
      },
    },
    '& .classHeader, .classCell': {
      width: '9vw !important',
      minWidth: '9vw !important',
      maxWidth: '9vw !important',
      fontSize: '1vw',
      minHeight: '3vw !important',
      maxHeight: '3vw !important',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '120px !important',
        minWidth: '120px !important',
        maxWidth: '120px !important',
      },
    },
    '& .sectionHeader, .sectionCell': {
      width: '8vw !important',
      minWidth: '8vw !important',
      maxWidth: '8vw !important',
      fontSize: '1vw',
      minHeight: '3vw !important',
      maxHeight: '3vw !important',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
        width: '60px !important',
        minWidth: '60px !important',
        maxWidth: '60px !important',
      },
    },
    '& .dateHeader, .dateCell': {
      width: '9vw !important',
      minWidth: '9vw !important',
      maxWidth: '9vw !important',
      fontSize: '1vw',
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
      fontSize: '1vw',
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
    '& .actionCell': {
      paddingLeft: '2vw',
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
  withoutScroll: {
    fontSize: 0,
    '& .MuiDataGrid-virtualScroller': {
      overflowY: 'hidden !important',
      '& .MuiDataGrid-virtualScrollerContent': {
        height: 'auto !important',
        '& .MuiDataGrid-virtualScrollerRenderZone': {
          transform: 'inherit !important',
          position: 'static',
        },
      },
    },
  },
  userDetails: {
    textAlign: 'center',
    paddingTop: '0.2vw',
    '& .MuiDataGrid-row': {
      '@media (min-width: 1200px)': {
        minHeight: '5vw !important',
        maxHeight: '5vw !important',
      },
      alignItems: 'center',
    },
    '& svg': {
      width: '1vw !important',
      height: '1vw !important',
      [theme.breakpoints.down('md')]: {
        height: '15px !important',
        width: '15px !important',
      },
    },
    '& .MuiDataGrid-cell': {
      border: 'none',
    },
    '& .MuiDataGrid-root': {
      minHeight: '5vw !important',
      border: 'none',
    },
    '& .MuiDataGrid-footerContainer': {
      border: 'none',
    },
    '& .fa-sort-down': {
      marginBottom: '0.5vw',
    },
    '& .fa-sort-up': {
      marginTop: '0.5vw',
    },
    '& .MuiDataGrid-columnHeader[data-role="studentName"]': {
      width: '5vw',
    },
  },
}));
export default useStyles;
