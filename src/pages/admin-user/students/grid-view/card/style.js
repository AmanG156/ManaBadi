import makeStyles from '@mui/styles/makeStyles';
import { colors, fonts } from '../../../../../theme';

export const useStyles = makeStyles((theme) => ({
  studentKeys: {
    color: colors.primary,
    textAlign: 'left',
    paddingBottom: '0.3vw',
    // height: '2vw',
    '& .MuiFormControlLabel-label': {
      '@media (min-width: 1200px)': {
        fontSize: '1.37vw',
      },
    },
  },
  key: {
    color: colors.primary,
    textAlign: 'left',
    fontSize: '0.9vw',
    float: 'left',
    width: '7vw',
    [theme.breakpoints.down('md')]: {
      fontSize: 10,
      width: '40%',
    },
  },
  value: {
    color: colors.cardValueSecondaryColor,
    textAlign: 'left',
    fontSize: '0.9vw',
    float: 'right',
    width: '10vw',
    // height: '1vw',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('md')]: {
      fontSize: 10,
      width: '55%',
    },
  },
  alignGrid: {
    // paddingBottom: 25,
    // maxWidth: '25%',
    '&.MuiGrid-root.MuiGrid-item': {
      paddingTop: 0,
      paddingLeft: 0,
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
  studentCard: {
    minWidth: 'calc(100% - 30px)',
    width: 'calc(100% - 30px)',
    fontFamily: fonts.fontType.roboto,
    textAlign: 'center',
    borderRadius: '0.5vw',
    marginRight: '1vw',
    maxHeight: '18vw',
    minHeight: '18vw',
    border: '1px solid #C4C4C4',
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
      padding: '1.5vw 1vw',
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
        height: '15px !important',
        width: '15px !important',
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
    paddingTop: '1vw',
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
  studentCardHeader: {
    '&.MuiCardHeader-root': {
      padding: '0px !important',
      marginLeft: 10,
    },
    '& .MuiGrid-root': {
      background: colors.secondary,
      borderRadius: '0vw 0.7vw 0vw 1vw',
    },
  },
  studentName: {
    fontWeight: fonts.fontWeight.bold,
    color: colors.black,
    textAlign: 'center',
    fontSize: '1vw',
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
    },
  },
}));

export default {
  useStyles,
};
