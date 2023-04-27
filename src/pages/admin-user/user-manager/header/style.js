import makeStyles from '@mui/styles/makeStyles';
import { colors, fonts } from '../../../../theme';

export const useStyles = makeStyles((theme) => ({
  titleRow: {
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
  filterButton: {
    float: 'left',
    width: '100%',
    '& button.MuiButton-filterPrimary': {
      background: colors.backgroundGrey,
      border: `solid 0.1vw ${colors.primary}`,
      padding: '0 12px 0 0',
      borderRadius: '0.4vw 0.4vw 0.4vw 0.4vw',
      '@media (min-width: 1200px)': {
        fontSize: '0.8vw',
        padding: '0 0.5vw 0 0',
      },
      [theme.breakpoints.down('md')]: {
        fontSize: 0,
      },
    },
    '& svg': {
      width: '1vw',
      height: '1vw',
      paddingTop: 0,
      margin: '0 0.4vw',
      [theme.breakpoints.down('md')]: {
        width: 20,
        height: 24,
        margin: 0,
        padding: 4,
      },
    },
    '& .DownLeft': {
      float: 'left',
      padding: '0.5vw 0.1vw',
      borderRight: `solid 0.1vw ${colors.primary}`,
      marginRight: '0.5vw',
      borderRadius: '0.4vw 0vw 0vw 0.4vw',
      background: colors.white,
      '& svg': {
        color: colors.white,
      },
    },
  },
  ChipSection: {
    '& .MuiOutlinedInput-root': {
      padding: '0 !important',
      '& .MuiButtonBase-root': {
        '@media (min-width: 1200px)': {
          height: '2vw',
        },
      },
    },
    '& .MuiInputLabel-root': {
      // lineHeight: '0.9rem',
    },
  },

  filterIcon: {
    color: colors.black,
  },
  searchHeader: {
    width: '100%',
    verticalAlign: 'top',
  },
  clearIcon: {
    marginLeft: '3vw',
  },
  autoMate: {
    height: '2.7vw',
  },
}));

export default {
  useStyles,
};
