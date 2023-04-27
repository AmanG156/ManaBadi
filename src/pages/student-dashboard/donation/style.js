import { colors, fonts } from '../../../theme';

const donationstyle = (() => ({
  rowWrapper: {
    // alignItems: 'center',
    flexWrap: 'nowrap',
    marginTop: '-1vw',
    marginBottom: '1.3vw',

  },
  rowWrapperAmount: {
    // alignItems: 'center',
    flexWrap: 'nowrap',
    marginTop: '-0.8vw',
    marginBottom: '1.3vw',
  },
  dropdownWrapper: {
    minWidth: '20vw',
    justifyContent: 'flex-end',
    '& .MuiInputBase-root': {
      width: '-webkit-fill-available',
    },
  },
  studentName: {
    paddingTop: '2vw',
    display: 'block',
  },
  errorText: {
    color: colors.errorText,
    fontSize: 'calc(9px + 6 * ((100vw - 320px) / 1199))',
    '@media (min-width: 1200px)': {
      fontSize: '0.7vw',
      paddingBottom: '5%',
    },
    display: 'block',
    textAlign: 'right',
  },
  notesErrorText: {
    color: colors.errorText,
    fontSize: 'calc(9px + 6 * ((100vw - 320px) / 1199))',
    width: '100%',
    '@media (min-width: 1200px)': {
      fontSize: '0.7vw',
    },
    display: 'block',
    textAlign: 'left',
    paddingBottom: '5%',
    marginTop: '0vw',
  },
  donationNotesLength: {
    '@media (min-width: 1200px)': {
      fontSize: '0.8vw',
    },
    color: colors.textTertiary,
  },
  dropdown: {
    minWidth: '20vw !important',
    marginTop: '0 !important',
    maxWidth: '20vw',
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
  },
  labelWrapper: {
    marginTop: '1vw',
    // flexBasis: '22%',
    width: '100%',
    maxWidth: '180px',
    '@media (min-width: 1200px)': {
      flexBasis: '10vw !important',
    },
    // alignSelf: 'flex-end',
  },
  textStyle: {
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
    minWidth: '12vw',
    fontFamily: fonts.fontType.roboto,
    fontWeight: fonts.fontWeight.medium,
    color: colors.black,
  },
  donationAmount: {
    minWidth: '20vw',
  },
  donationAmountGrid: {
    marginTop: '-1.5vw',
  },
  buttonWrapper: {
    marginTop: '1vw',
    justifyContent: 'flex-end',
  },
  notesWrapper: {
    marginTop: '1.5vw',
    color: colors.black,

  },
  textField: {
    minWidth: '20vw',
    color: colors.black,

  },
  selectClass: {
    maxWidth: '23vw',
  },
}));

export default donationstyle;
