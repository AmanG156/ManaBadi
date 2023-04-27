import { colors } from '../../../theme';

const dataGridStyle = (theme) => ({
  studentDetails: {
    textAlign: 'left',
    paddingTop: '0.2vw',
    '& .MuiDataGrid-virtualScrollerRenderZone': {
      paddingLeft: '7.5vw',
    },
    '& .MuiDataGrid-row': {
      alignItems: 'center',
    },
    '& .MuiDataGrid-columnHeadersInner': {
      paddingLeft: '7.5vw',
    },
    '& svg': {
      '@media (min-width: 1200px)': {
        width: '1vw !important',
        height: '1vw !important',
      },
      [theme.breakpoints.down('md')]: {
        width: '20px !important',
        height: '20px !important',
      },
    },
    '& .MuiDataGrid-virtualScroller': {
      overflowY: 'scroll !important',
    },
    '& .MuiDataGrid-cell': {
      border: 'none',
    },
    '& .MuiDataGrid-cell:focus-within': {
      outline: 'none',
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
    '& .MuiDataGrid-columnHeader[data-role="courseName"]': {
      width: '5vw',
    },
  },
  dataGrid: {
    '& .MuiDataGrid-row': {
      '@media (min-width: 1200px)': {
        minHeight: '4vw !important',
        maxHeight: '4vw !important',
      },
    },
    '& .MuiDataGrid-root': {
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
      fontWeight: 'bold',
      fontSize: '1vw',
      minHeight: '4vw !important',
      maxHeight: '4vw !important',
      lineHeight: '4vw !important',
      color: '#025EE6',
    },
    '& .MuiDataGrid-iconSeparator': {
      visibility: 'hidden',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 'bold',
      fontSize: '1vw',
      justifyContent: 'space-evenly',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
      },
    },
    '& .MuiDataGrid-virtualScroller': {
      '@media (min-width: 1200px)': {
        height: 'inherit !important',
        overflowY: 'hidden !important',
      },
      overflowX: 'scroll !important',
      marginTop: '4vw !important',
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

    '& .marksHeader, .marksCell': {
      '@media (min-width: 1200px)': {
        width: '7vw !important',
        minWidth: '7vw !important',
        maxWidth: '7vw !important',
        fontSize: '1vw',
        minHeight: '4vw !important',
        maxHeight: '10vw !important',
      },
    },
    '& .marksGreenCell': {
      '& span': {
        textTransform: 'none !important',
        color: '#f3f8fe !important',
        boxShadow: '0 4px 4px -2px hsl(0deg 0% 65% / 25%)',
        boxSizing: 'border-box',
        height: '2.7vw',
        minWidth: '3.1vw',
        maxWidth: '3.1vw',
        fontFamily: 'inherit',
        padding: '0.8vw',
        borderRadius: '0.5vw !important',
        background: colors.lightGreen,
        fontSize: '0.9vw',
        cursor: 'pointer',
        [theme.breakpoints.down('md')]: {
          height: 30,
        },
      },
    },
    '& .marksYellowCell': {
      '& span': {
        textTransform: 'none !important',
        color: '#f3f8fe !important',
        boxShadow: '0 4px 4px -2px hsl(0deg 0% 65% / 25%)',
        boxSizing: 'border-box',
        height: '2.7vw',
        minWidth: '3.1vw',
        maxWidth: '3.1vw',
        fontFamily: 'inherit',
        padding: '0.8vw',
        borderRadius: '0.5vw !important',
        background: colors.yellow,
        fontSize: '0.9vw',
        cursor: 'pointer',
        [theme.breakpoints.down('md')]: {
          height: 30,
        },
      },
    },
    '& .marksRedCell': {
      '& span': {
        textTransform: 'none !important',
        color: '#f3f8fe !important',
        boxShadow: '0 4px 4px -2px hsl(0deg 0% 65% / 25%)',
        boxSizing: 'border-box',
        height: '2.7vw',
        minWidth: '3.1vw',
        maxWidth: '3.1vw',
        fontFamily: 'inherit',
        padding: '0.8vw',
        borderRadius: '0.5vw !important',
        background: colors.red,
        fontSize: '0.9vw',
        cursor: 'pointer',
        [theme.breakpoints.down('md')]: {
          height: 30,
        },
      },
    },
    '& .marksHeaderSpan': {
      '& span': {
        position: 'absolute',
        top: -20,
        zIndex: 1,
        cursor: 'pointer',
        left: 0,
      },
    },
    '& .pictureHeader, .pictureCell': {
      '@media (min-width: 1200px)': {
        width: '8vw !important',
        minWidth: '8vw !important',
        maxWidth: '8vw !important',
        borderRadius: '50%',
        fontSize: '0.9vw',
      },
      '& img': {
        '@media (min-width: 1200px)': {
          width: '3vw',
          height: '3vw',
        },
        '@media (max-width: 1200px)': {
          width: '50%',
          height: '50%',
        },
        borderRadius: '50%',
      },
    },
    '& .commonHeader, .commonCell': {
      '@media (min-width: 1200px)': {
        width: '12vw !important',
        minWidth: '12vw !important',
        maxWidth: '12vw !important',
        borderRadius: '50%',
        fontSize: '0.9vw',
        minHeight: '3vw !important',
      },
    },
    '& .numberHeader, .numberCell': {
      '@media (min-width: 1200px)': {
        width: '5vw !important',
        minWidth: '5vw !important',
        maxWidth: '5vw !important',
        fontSize: '0.9vw',
        minHeight: '3vw !important',
        maxHeight: '3vw !important',
      },
    },

    '& .actionCell': {
      '@media (min-width: 1200px)': {
        width: '10vw !important',
        minWidth: '10vw !important',
        maxWidth: '10vw !important',
        fontSize: '0.9vw',
        minHeight: '3vw !important',
      },
      '& svg': {
        '@media (min-width: 1200px)': {
          width: '1.5vw !important',
          height: '1.4vw !important',
        },
        [theme.breakpoints.down('md')]: {
          width: '20px !important',
          height: '20px !important',
        },
      },
      // '&:last-child': {
      //   justifyContent: 'flex-start',
      // },
    },
  },
});

export default dataGridStyle;
