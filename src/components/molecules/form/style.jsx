import makeStyles from '@mui/styles/makeStyles';
import { colors, fonts } from '../../../theme';

const style = makeStyles((theme) => ({
  leftLoginDetails: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  reisterButton: {
    display: 'flex',
    marginTop: 20,
    '& button': {
      padding: '8px 20px',
      '& span': {
        display: 'flex',
        justifyContent: 'center',
      },
    },
  },
  profileContainer: {
    width: '100%',
  },
  editor: {
    width: '80%',
    marginTop: 40,
    '& span.cke_bottom.cke_reset_all': {
      display: 'none',
    },
  },
  profileBtn: {
    width: '100%',
    '@media (max-width: 767px)': {
      flexDirection: 'column',
    },
  },
  label: {
    minWidth: 240,
    marginRight: 6,
    letterSpacing: 2,
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    fontSize: 17,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: fonts.fontType.roboto,
    '@media (max-width: 1199px)': {
      minWidth: '100%',
      marginRight: 0,
    },
  },
  textField: {
    width: '48%',
    marginBottom: '2%',
    '@media (max-width: 767px)': {
      width: '100%',
    },
  },
  profileFields: {
    width: '100%',
    '@media (max-width: 1199px)': {
      width: '100%',
      flexDirection: 'column',
      marginBottom: 30,
    },
    '@media (min-width: 1200px) and (max-width: 1599px)': {
      width: '100%',
    },
    '& .MuiSelect-select.MuiSelect-select': {
      paddingLeft: 0,
      color: '#696969',
      fontSize: 17,
    },
    '& .MuiSelect-selectMenu': {
      backgroundColor: 'transparent !important',
    },
    '& fieldset': {
      border: 0,
      borderBottom: '2px solid #019491 !important',
      borderRadius: 0,
      marginRight: 30,
      '& legend': {
        maxWidth: '100%',
      },
      '@media (max-width: 1199px)': {
        marginRight: 0,
      },
    },
    '& svg': {
      color: 'rgb(124 196 163)',
      fontSize: 26,
      top: 'calc(50% - 2px)',
      '@media (max-width: 767px)': {
        right: 0,
        top: 9,
      },
    },
    '& input': {
      paddingLeft: '0 !important',
      color: '#b7babf',
      fontSize: 16,
      fontWeight: 600,
      '&::placeholder': {
        fontWeight: 500,
        color: `${colors.placeHolderColor} !important`,
        display: 'block',
      },
    },
    '& .multilined-input': {
      width: '100%',
      border: '1px solid #9cc !important',
      boxSizing: 'border-box',
      marginTop: 30,
      '@media (max-width: 767px)': {
        marginTop: 10,
      },
      '& .ck.ck-editor__main': {
        height: 230,
        overflow: 'auto',
      },
      '& .ck.ck-toolbar': {
        border: 0,
        background: '#7cc4a326',
        padding: '12px 10px',
        borderBottom: '1px dashed #9cc',
      },
      '& .ck-content': {
        border: '0 !important',
        height: '100%',
        boxShadow: 'none !important',
        padding: '4px 18px',
        background: '#7cc4a326',
        boxSizing: 'border-box',
      },
    },
    '& textarea': {
      color: colors.black,
      fontSize: 15,
      letterSpacing: 3,
      fontFamily: fonts.fontType.roboto,
      '&::placeholder': {
        color: `${colors.placeHolderColor} !important`,
        opacity: 1,
      },
    },
  },
  buttonBox: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  asterik: {
    color: 'red',
  },
  profileViewBtn: {
    marginTop: 50,
    '@media (max-width: 1199px)': {
      marginTop: 0,
      marginRight: 0,
    },
    '& button': {
      textTransform: 'uppercase !important',
      letterSpacing: 3,
      color: '#fff !important',
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: '#9cc !important',
      padding: '12px 24px',
      marginRight: 20,
      borderRadius: 5,
      boxShadow: 'none',
      display: 'flex',
      justifyContent: 'center',
      '@media (max-width: 767px)': {
        marginBottom: 15,
        marginRight: 0,
        width: '100%',
      },
      '&:hover': {
        backgroundColor: '#009490 !important',
        boxShadow: 'none',
      },
    },
  },
}));

export default style;
