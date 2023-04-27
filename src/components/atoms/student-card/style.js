import { colors, fonts } from '../../../theme';

const studentCardStyle = () => ({
  studentCard: {
    fontFamily: fonts.fontType.roboto,
    textAlign: 'center',
    borderRadius: '10px',
    '&.MuiPaper-root.MuiCard-root': {
      margin: '15px',
    },
    '&.MuiCardMedia-root': {
      width: '47% !important',
      textAlign: 'center',
      display: 'inline',
    },
    '&:hover': {
      background: colors.cardBackgroundColor,
      boxShadow: '6px 6px 7px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    },
    '&.MuiCardHeader-action': {
      marginRight: '-40px',
    },
  },
  studentCardMenu: {
    background: colors.cardMenuBG,
    borderRadius: '0px 10px 0px 10px',
    height: 'min-content',
    color: colors.primary,
    width: 55,
    padding: 5,
  },
  studentCardMenuIcon: {
    color: colors.primary,
    '&.MuiButtonBase-root.MuiIconButton-root': {
      padding: '1px 8px !important',
    },
  },
  studentCardHeader: {
    '&.MuiCardHeader-root': {
      padding: '0px !important',
      marginLeft: 10,
    },
  },
  studentCardImage: {
    width: 'auto',
    textAlign: 'center !important',
    display: 'inline',
  },
  studentName: {
    fontWeight: fonts.fontWeight.bold,
    color: colors.black,
    textAlign: 'center',
  },
  studentDetails: {
    textAlign: 'center',
  },
  studentKeys: {
    fontWeight: fonts.fontWeight.bold,
    color: colors.primary,
    textAlign: 'left',
    '& .MuiFormControlLabel-label': {
      '@media (min-width: 1200px)': {
        fontSize: '1.37vw',
      },
    },
  },
});

export default studentCardStyle;
