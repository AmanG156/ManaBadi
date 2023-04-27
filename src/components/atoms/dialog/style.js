import makeStyles from '@mui/styles/makeStyles';
import {
  colors,
  fonts,
} from '../../../theme';

const style = makeStyles((theme) => ({
  borderBottom: {
    background: colors.secondary,
    display: 'block',
    width: '95%',
    marginLeft: '2%',
  },
  '.MuiIconButton-root:hover': {
    backgroundColor: 'inherit',
  },
  // customizedButton: {
  //   position: 'absolute',
  //   left: '95%',
  //   top: '-9%',
  //   backgroundColor: 'lightgray',
  //   color: 'gray',
  // },
  dialog: {
    '& .MuiDialog-paper': {
      '@media (min-width: 1200px)': {
        maxHeight: '90vh',
        maxWidth: '65vw',
        minWidth: '40vw',
        borderRadius: '20px',
      },
      '@media (max-width: 1199px)': {
        borderRadius: 8,
        width: '100%',
        maxWidth: '90%',
      },
      margin: 0,
      boxShadow: 'none',
      boxSizing: 'border-box',
      paddingBottom: 20,
      '& .MuiFormControl-root': {
        marginTop: '0',
        width: '100%',
      },
      '& .MuiOutlinedInput-input': {
        width: '100% !important',
        borderRadius: '0.5vw',
      },
    },
    '& .MuiDialogTitle-root': {
      color: colors.primary,
      padding: '.75vw 1vw .75vw 2vw',
      marginBottom: 8,
      fontFamily: fonts.fontType.roboto,
      backgroundColor: colors.secondary,
      '@media (min-width: 1200px)': {
        fontSize: '1vw',
      },
      fontWeight: 600,
      [theme.breakpoints.down('md')]: {
        fontSize: 16,
      },
    },
    '& .MuiDialogContent-root': {
      '@media (min-width: 1200px)': {
        padding: '1vw 2vw 10px',
        fontSize: '0.9vw',
        overflowX: 'hidden !important',
      },
      [theme.breakpoints.down('md')]: {
        paddingBottom: 40,
      },
      '@media (max-width: 499px)': {
        paddingLeft: '4px',
        paddingRight: '4px',
      },
      '& .MuiGrid-root': {
        '@media (min-width: 1200px)': {
          maxWidth: '60vw',
          // minWidth: '24vw',
          // width: '48vw',
        },
      },
    },
    '& .MuiButton-textPrimary': {
      color: `${colors.white} !important`,
      '@media (min-width: 1200px)': {
        minWidth: '15vw !important',
        height: '2.7vw',
        borderRadius: '0.4vw !important',
        fontSize: '1vw',
      },
      background: `${colors.newBGColor} !important`,
    },
    '@global': {
      '*::-webkit-scrollbar': {
        width: '0.7vw',
      },
      '*::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: colors.scrollBarColor,
        // outline: '1px solid slategrey',
        borderRadius: '0.4vw',
      },
    },
  },
  dialogButtons: {
    // margin: '3% 3% 0%',
    justifyContent: 'flex-end',
    padding: '0 10px',
    '& .MuiButton-root': {
      '@media (min-width: 1200px)': {
        minWidth: '10vw !important',
        height: '2.7vw !important',
        fontSize: '0.8vw',
      },
    },
  },
  closeImg: {
    cursor: 'pointer',
    float: 'right',
    color: colors.black,
    width: '1.5vw !important',
    height: '1.5vw !important',
    padding: '0 !important',
    [theme.breakpoints.down('md')]: {
      width: '18px !important',
      height: '18px !important',
    },
    '& .MuiSvgIcon-root': {
      width: '1vw',
      height: '1vw',
    },
  },
}));

export default style;
