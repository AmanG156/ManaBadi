import { colors, fonts } from '../../../theme';

const studentstyle = () => ({
  viewLogDialogAtom: {
    '& .MuiDialog-paper': {
      '@media (min-width: 1200px)': {
        minWidth: '55vw !important',
        maxWidth: '55vw !important',
      },
      overflowX: 'hidden !important',
    },
    '& .MuiDialogContent-root .MuiGrid-root': {
      '@media (min-width: 1200px)': {
        maxWidth: '65vw !important',
      },
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      '@media (min-width: 1200px)': {
        fontSize: '1vw',
      },
    },
  },
  icon: {
    height: 30,
    width: 40,
  },
  dialogOverviewWrapper: {
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    fontStyle: 'normal',
    fontWeight: '4000',
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
    padding: '1vw 2vw 0vw 2vw',
  },
  dialogFromColumn: {
    borderRight: '1px solid red',
  },
  item: {
    flex: '1 1 0',
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
  },
  dialogOverview: {
    fontFamily: fonts.fontType.roboto,
    fontStyle: 'normal',
    fontWeight: 'bold',
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
    color: '#025EE6',
  },
  changesMadeSection: {
    padding: '1vw 2vw 0vw 2vw',
    marginBottom: '-0.5vw',
  },
  vl: {
    borderLeft: '2px solid #CDC5C5',
    height: 'auto',
    margin: '0vw 1vw',
    // borderRadius: '2vw',
  },
  mainHeaderTitle: {
    fontWeight: fonts.fontWeight.bold,
    '@media (min-width: 1200px)': {
      fontSize: '1.5vw',
      padding: '20px 40px 50px 60px',
    },
    '@media (max-width: 1200px)': {
      padding: '25px 15px',
    },
    textAlign: 'left',
    color: colors.primary,
  },
  mainHeaderDesc: {
    textAlign: 'left',
    fontWeight: fonts.fontWeight.normal,
    fontSize: 20,
    color: colors.mainHeaderDescColor,
  },
  HeaderWrapper: {
    boxShadow: 'none',
    left: '0',
    minHeight: '50px',
    top: '0',
    padding: '0 11px 0 28px',
    width: '97%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  root: {
    border: '0px !important',
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeaderTitle:focus': {
      outline: 'none',
    },
    '& .viewLogHeader, .viewLogCell': {
      '@media (min-width: 1200px)': {
        width: '13.5vw !important',
        minWidth: '13.5vw !important',
        maxWidth: '13.5vw !important',
        fontSize: '1vw',
        marginRight: '1vw',
        minHeight: '3vw !important',
        maxHeight: '3vw !important',
      },
      // borderRight: '2px solid #CDC5C5',

    },
    '.MuiDataGrid-root': {
      outline: 'none !important',
      border: 'none !important',
    },
  },
  tableWrapper: {
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    fontStyle: 'normal',
    fontWeight: '4000',
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
      padding: '0px 110px 40px 60px',
    },
  },
  dialogButton: {
    width: '210px !important',
  },
  dialogTableWrapper: {
    padding: '0vw 0vw 0vw 1.5vw',
    '@media (max-width: 1200px)': {
      minHeight: '200px',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      '@media (min-width: 1200px)': {
        fontSize: '1vw',
      },
    },
  },
  wrapper: {
    width: '100%',
  },
  divWrapper: {
    width: '100% !important',
  },
  wrapperMenu: {
    justifyContent: 'flex-end !important',
    width: '100%',
  },
  content: {
    padding: '0vw 2vw 2vw 2vw',
  },
  backButton: {
    paddingTop: '2vw',
  },
  iconsHoverHeader: {
    minHeight: 50,
    color: 'white',
    borderRadius: '5px !important',
    position: 'relative',
    '& svg': {
      //   fill: theme.palette.secondary.main,
    },
    '&:hover': {
      backgroundColor: colors.white,
      color: `${colors.primary}  !important`,
      borderRadius: '5px !important',
    },
    '& .MuiListItemText-secondary': {
      fontSize: '12px',
      fontWeight: 'bold',
      textAlign: 'left',

    },
  },
  menuItemIcon: {
    paddingRight: '5px',
  },
  menuIcon: {
    border: 'solid',
    borderRadius: '100%',
  },
  '& .MuiListItemText-primary': {
    fontWeight: 'bold',
  },
  dataGrid: {
    border: '0px !important',
    '.MuiDataGrid-row': {
      minHeight: '75px !important',
      maxHeight: '75px !important',
    },
    '& .MuiDataGrid-renderingZone': {
      maxHeight: 'none !important',
    },
    '& .MuiDataGrid-cell': {
      lineHeight: 'unset !important',
      maxHeight: 'none !important',
      whiteSpace: 'normal',
      wordBreak: 'break-word',
    },
    '& .MuiDataGrid-virtualScroller': {
      // overflow: 'auto',
      '@media (max-width: 1200px)': {
        height: '100px !important',
      },
    },
    '& .MuiDataGrid-row': {
      maxHeight: 'none !important',
    },
    '.MuiDataGrid-root': {
      outline: 'none !important',
      border: 'none !important',
    },
    '& .MuiDataGrid-iconButtonContainer': {
      visibility: 'visible',
      width: '0 !important',
    },
    '& .MuiDataGrid-iconSeparator': {
      visibility: 'hidden',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 'bold',
      '@media (min-width: 1200px)': {
        fontSize: '1vw',
      },
    },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within': {
      outline: 'none !important',
    },
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeaderTitle:focus': {
      outline: 'none',
    },
    '& .itemHeader, .itemCell': {
      '@media (min-width: 1200px)': {
        width: '15vw !important',
        minWidth: '15vw !important',
        maxWidth: '15vw !important',
        fontSize: '1vw',
      },
      minHeight: '3vw !important',
      maxHeight: 'auto !important',
      marginRight: '1vw',
      // borderRight: '2px solid #CDC5C5',
    },
    '& .toHeader, .toCell': {
      display: 'flex !important',
      flexDirection: 'row !important',
      whiteSpace: 'break-spaces !important',
      marginLeft: '0.5vw',
      minWidth: '15vw !important',
      '@media (min-width: 1200px)': {
        maxWidth: '15vw !important',
        width: '15vw !important',
        fontSize: '1vw',
      },
      minHeight: '3vw !important',
      maxHeight: 'auto !important',
    },
    '& .fromHeader, .fromCell': {
      '@media (min-width: 1200px)': {
        width: '15vw !important',
        minWidth: '15vw !important',
        maxWidth: '15vw !important',
        fontSize: '1vw',
      },
      marginRight: '1vw',
      minHeight: '3vw !important',
      maxHeight: 'auto !important',
      // borderRight: '2px solid #CDC5C5',

    },
  },
});

export default studentstyle;
