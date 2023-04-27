import makeStyles from '@mui/styles/makeStyles';
import { fonts, colors } from '../../../theme';

export const useStyles = makeStyles((theme) => ({
  roleRoot: {
    marginInline: '2vw',
  },
  dFlex: {
    display: 'flex',
    '& svg': {
      width: '2vw',
      height: '1.4vw',
      [theme.breakpoints.down('lg')]: {
        width: 16,
        height: 16,
      },
    },
  },
  titleRow: {
    justifyContent: 'space-between',
    marginTop: '10px',
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
  roleManagerContainer: {
    color: colors.black,
    width: 'auto',
    fontFamily: fonts.fontType.roboto,
    marginTop: '2vw',
  },
  roleManagerList: {
    textAlign: 'center',
    paddingBottom: 50,
  },
  tableView: {
    width: '100%',
  },
  marginTop: {
    marginTop: '1vw',
  },
}));

export default {
  useStyles,
};
