import makeStyles from '@mui/styles/makeStyles';
import { fonts, colors } from '../../../theme';

export const useStyles = makeStyles((theme) => ({
  regionRoot: {
    marginInline: '2vw',
  },
  dFlex: {
    display: 'flex',
  },
  dFlexIcon: {
    display: 'flex',
    justifyContent: 'end',
    '& .MuiFormControl-root': {
      margin: 0,
    },
  },
  titleRow: {
    justifyContent: 'space-between',
    marginTop: '0.9vw',
  },
  headerTitle: {
    fontWeight: fonts.fontWeight.bold,
    fontSize: '1.5vw',
    padding: '10px 10px 10px 1px',
    [theme.breakpoints.down('md')]: {
      fontSize: 16,
    },
  },
  addbutton: {
    minWidth: '7.5vw  !important',
  },
  regionManagerContainer: {
    color: colors.black,
    width: 'auto',
    fontFamily: fonts.fontType.roboto,
    marginTop: '0.5vw',
  },
  regionManagerList: {
    textAlign: 'center',
    paddingBottom: 50,
  },
  tableView: {
    width: '100%',
  },
  addIconSize: {
    width: '2vw',
    height: '1.4vw',
    [theme.breakpoints.down('md')]: {
      width: 16,
      height: 16,
    },
  },
}));

export default {
  useStyles,
};
