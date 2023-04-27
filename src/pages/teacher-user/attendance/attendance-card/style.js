import makeStyles from '@mui/styles/makeStyles';
import { colors, fonts } from '../../../../theme';

export const useStyles = makeStyles((theme) => ({
  alignGrid: {
    '&.MuiGrid-root.MuiGrid-item': {
      paddingTop: 0,
      paddingLeft: 0,
      curosor: 'pointer',
    },
    '& .MuiFormControl-root': {
      margin: '10px 0 !important',
      width: '99%',

      '& .MuiFormControl-root': {
        margin: '0 !important',
        width: '100%',
      },
    },
  },
  cursorPointer: {
    cursor: 'pointer',
  },
  absentHeight: {
    height: '22px',
  },
  studentCard: {
    minWidth: 'calc(100% - 30px)',
    width: 'calc(100% - 30px)',
    fontFamily: fonts.fontType.roboto,
    textAlign: 'center',
    borderRadius: '0.5vw',
    marginRight: '1vw',
    maxHeight: '13vw',
    minHeight: '13vw',
    border: '1px solid #558bb1',
    [theme.breakpoints.down('md')]: {
      minWidth: 'calc(100% - 10px)',
      width: 'calc(100% - 10px)',
      maxHeight: 'inherit',
    },
    '&.MuiPaper-root.MuiCard-root': {
      margin: '15px',
      [theme.breakpoints.down('md')]: {
        margin: 5,
      },
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
    '& .MuiCardContent-root': {
      padding: '1vw',
    },
  },
  studentDetails: {
    textAlign: 'center',
    paddingTop: '0.2vw',
    '& .MuiDataGrid-row': {
      minHeight: '5vw !important',
      maxHeight: '5vw !important',
      alignItems: 'center',
    },
    '& svg': {
      width: '1vw !important',
      height: '1vw !important',
      [theme.breakpoints.down('md')]: {
        height: '9px !important',
        width: '9px !important',
      },
    },
    '& .MuiDataGrid-cell': {
      border: 'none',
    },
    '& .MuiDataGrid-root': {
      minHeight: '5vw !important',
      border: 'none',
    },
    '& .MuiDataGrid-footerContainer': {
      border: 'none',
    },
    '& .fa-sort-down': {
      marginBottom: '0.5vw',
    },
    '& .fa-sort-up': {
      marginTop: '0.5vw',
    },
    '& .MuiDataGrid-columnHeader[data-role="studentName"]': {
      width: '5vw',
    },
  },
  imageGrid: {
    width: '7vw',
    height: '7vw',
    [theme.breakpoints.down('md')]: {
      height: 'inherit',
    },
  },
  studentCardImage: {
    width: '7vw',
    height: '7vw',
    borderRadius: '50%',
    textAlign: 'center !important',
    display: 'inline',
    [theme.breakpoints.down('md')]: {
      width: 60,
      height: 60,
    },
  },
  studentName: {
    color: colors.black,
    textAlign: 'center',
    fontSize: '1vw',
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
    },
  },
  absentText: {
    color: 'red',
    background: 'lightcyan',
    paddingBlock: '2px',
  },
  cardContent: {
    background: 'lightcyan',
    marginTop: '10px',
  },
}));

export default {
  useStyles,
};
