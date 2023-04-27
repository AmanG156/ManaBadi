import { colors, fonts } from '../../../theme';

const addTeacherStyle = (() => ({
  gridContainer: {
    minHeight: '40vh',
  },
  alignGrid: {
    marginTop: '1vw',
    marginLeft: '0px',
    paddingLeft: '0px !important',
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
    color: colors.black,
    fontWeight: fonts.fontWeight.low,

  },
  label: {
    color: colors.black,
    fontWeight: 600,
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
    fontFamily: fonts.fontType.roboto,
  },
  value: {
    '@media (min-width: 1200px)': {
      marginLeft: '2vw',
      fontSize: '0.9vw',
    },
    fontFamily: fonts.fontType.roboto,
  },
  multiSelect: {
    '& .MuiAutocomplete-root': {
      marginLeft: '2vw',
    },
  },

  dialogButtons: {
    // position: 'absolute',
    // bottom: 20,
    // right: 7,
    height: '42px !important',
    '& .MuiButton-root': {
      '@media (min-width: 1200px)': {
        minWidth: '10vw !important',
        height: '2.7vw !important',
        fontSize: '0.8vw',
      },
      '@media (max-width: 1200px)': {
        padding: '0 15px',
      },
    },
  },
  saveCancelContainer: {
    paddingTop: '5vw',
  },

  errorText: {
    color: colors.errorText,
    fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    '@media (min-width: 1200px)': {
      fontSize: '0.7vw',
    },
    display: 'block',
  },
  borderBottom: {
    width: '100%',
    height: 5,
    display: 'block',
    background: colors.secondary,
  },
}));

export default addTeacherStyle;
