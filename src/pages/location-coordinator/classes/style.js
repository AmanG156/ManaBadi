import { colors, fonts } from '../../../theme';

const detailstyle = (theme) => ({
  addTeacherDialog: {
    '& .MuiDialog-paper': {
      '@media (min-width: 1200px)': {
        minWidth: '55vw !important',
        maxWidth: '65vw !important',
      },
      overflowX: 'hidden !important',
    },
    '& .MuiAutocomplete-root': {
      marginTop: '-2vw',
    },
    '& .MuiDialogContent-root .MuiGrid-root': {
      '@media (min-width: 1200px)': {
        maxWidth: '65vw !important',
      },
      fontFamily: fonts.roboto,
    },
    '& .MuiBox-root': {
      padding: '0vw !important',
    },
    '& #datePickerDiv': {
      '@media (min-width: 1200px)': {
        width: '18vw !important',
      },
    },
    '& #addressAutoComplete': {
      '@media (min-width: 1200px)': {
        width: '46.2vw',
      },
    },
  },

  titleRow: {
    justifyContent: 'space-between',
  },

  gridContainer: {
    padding: '2vw 2vw 2vw 3vw !important',
    minHeight: '65vh',
    '@media (max-width: 600px)': {
      padding: '15px',
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
  classRoomContainer: {
    color: colors.black,
    width: 'auto',
    fontFamily: fonts.fontType.roboto,
  },
  toggleButtonGrp: {
    border: '0.1vw solid #ccc',
    '@media (min-width: 1200px)': {
      borderRadius: '0.9vw',
      maxHeight: '2.5vw',
    },
  },
  alignGrid: {
    paddingBottom: 25,
    maxWidth: '20%',
    '&.MuiGrid-root.MuiGrid-item': {
      paddingTop: 0,
      paddingLeft: 0,
    },
    '& .MuiFormControl-root': {
      '@media (min-width: 1200px)': {
        margin: '10px !important',
        marginLeft: '0px !important',
        width: '99%',
        marginRight: '0px !important',
      },
      '& .MuiFormControl-root': {
        margin: '0 !important',
        width: '100%',
      },
    },
  },

  classRoomList: {
    textAlign: 'center',
    paddingBottom: 50,
  },
});

export default detailstyle;
