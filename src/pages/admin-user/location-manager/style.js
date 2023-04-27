import makeStyles from '@mui/styles/makeStyles';
import { fonts, colors } from '../../../theme';

export const useStyles = makeStyles((theme) => ({
  locationRoot: {
    marginInline: '2vw',
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
  dFlex: {
    display: 'flex',
    justifyContent: 'end',
  },
  dFlexIcon: {
    display: 'flex',
    justifyContent: 'end',
    '& .MuiFormControl-root': {
      margin: 0,
    },
  },
  addbutton: {
    minWidth: '7.5vw  !important',
  },
  addIconSize: {
    width: '2vw',
    height: '1.4vw',
    [theme.breakpoints.down('md')]: {
      width: 16,
      height: 16,
    },
  },
  deactiveCheckbox: {
    height: '4vw',
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
  locationManagerContainer: {
    color: colors.black,
    width: 'auto',
    fontFamily: fonts.fontType.roboto,
    marginTop: '0.5vw',
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
    '& .MuiDialog-paper .MuiOutlinedInput-input': {
      padding: '0.7vw',
      fontSize: '0.9vw',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.primary,
    },
    '& .MuiFormControl-root': {
      margin: 0,
    },
  },
  errorText: {
    fontSize: '0.7vw',
    color: colors.errorText,
  },
}));

export default {
  useStyles,
};
