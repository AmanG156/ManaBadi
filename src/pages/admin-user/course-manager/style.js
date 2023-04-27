import makeStyles from '@mui/styles/makeStyles';
import { fonts, colors } from '../../../theme';

export const useStyles = makeStyles((theme) => ({
  roleRoot: {
    marginInline: '3vw',
  },
  dFlex: {
    display: 'flex',
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
  addCourseDialogAtom: {
    '& .MuiDialogContent-root .MuiGrid-root': {
      minWidth: '0vw !important',
      width: '60vw !important',
    },
    '& .MuiButton-root.MuiButton-textPrimary': {
      minWidth: '11vw !important',
      marginLeft: '1vw !important',
    },
    '& .MuiOutlinedInput-root': {
      height: '2.7vw',
      borderRadius: '0.4vw',
    },
    '& .MuiFormControl-root': {
      margin: 0,
    },
  },
  deactiveCheckbox: {
    height: '1vw',
    '& .MuiFormControl-root:first-child': {
      margin: '1vw',
      minWidth: '3vw',
      marginRight: '-3.5vw',
      '& .MuiFormControlLabel-labelPlacementEnd': {
        marginBottom: '-3vw',
      },
    },
    textAlign: 'right',
  },
  viewInactive: {
    marginRight: '2vw',
  },
}));

export default {
  useStyles,
};
