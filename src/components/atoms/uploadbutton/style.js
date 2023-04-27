import makeStyles from '@mui/styles/makeStyles';
import { fonts } from '../../../theme';

const style = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginLeft: '0px',
    width: '100%',
    '@media (max-width: 1199px)': {
      marginRight: 0,
    },
  },
  fileLabel: {
    width: '70%',
    marginRight: '2%',
    cursor: 'not-allowed',
  },
  container: {
    display: 'flex',
    '& label': {
      backgroundColor: '#9cc',
      color: '#fff',
      boxShadow: 'none',
      padding: '8px 24px',
      letterSpacing: 2,
      '& span': {
        fontFamily: fonts.fontType.roboto,
      },
      '&:hover': {
        backgroundColor: '#019491',
        boxShadow: 'none',
      },
    },
  },
}));

export default style;
