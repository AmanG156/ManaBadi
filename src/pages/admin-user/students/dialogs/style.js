import makeStyles from '@mui/styles/makeStyles';
import { colors } from '../../../../theme';

export const useStyles = makeStyles((theme) => ({
  swapCourseDialog: {
    '& .MuiDialog-paper': {
      '@media (min-width: 1200px)': {
        minWidth: '55vw !important',
        maxWidth: '65vw !important',
      },
      overflowX: 'hidden !important',
    },
    '& .MuiDialogContent-root .MuiGrid-root': {
      '@media (min-width: 1200px)': {
        width: '55vw',
      },
    },
    '& #acedemicYear': {
      '@media (min-width: 1200px)': {
        width: '22vw',
      },
    },
    '& #changeLogs': {
      '@media (min-width: 1200px)': {
        width: '47.2vw',
      },
    },
  },
  paymentDialogAtom: {
    '& .MuiDialog-paper': {
      '@media (min-width: 1200px)': {
        maxWidth: '55vw !important',
        minWidth: '50vw !important',
      },
      overflowX: 'hidden !important',
    },
    '& .MuiDialogContent-root .MuiGrid-root': {
      '@media (min-width: 1200px)': {
        // maxWidth: '65vw !important',
      },
    },
  },
  passwordDialogAtom: {
    '& .MuiButton-root.MuiButton-textPrimary': {
      minWidth: '11vw !important',
      marginLeft: '1vw !important',
    },
  },
  parentDialogAtom: {
    '& .MuiDialog-paper': {
      '@media (min-width: 1200px)': {
        maxWidth: '70vw !important',
        minWidth: '60vw !important',
      },
      overflowX: 'hidden !important',
    },
    '& .MuiDialogContent-root .MuiGrid-root': {
      // maxWidth: '65vw !important',
    },
    '& .MuiBox-root': {
      padding: '0 !important',
    },
    '& .MuiOutlinedInput-input': {
      width: '26.9vw !important',
    },
    '& #addressAutoComplete': {
      width: '100%',
      marginTop: '0.4vw',
    },
    '& .MuiButton-root': {
      marginTop: '1vw',
    },
  },
  studentDialogAtom: {
    '& .MuiDialog-paper': {
      '@media (min-width: 1200px)': {
        minWidth: '55vw !important',
        maxWidth: '65vw !important',
      },
      overflowX: 'hidden !important',
    },
    '& .MuiDialogContent-root .MuiGrid-root': {
      '@media (min-width: 1200px)': {
        maxWidth: '65vw !important',
        // minWidth: '24vw',
        // width: '48vw',
      },
    },
    '& .MuiBox-root': {
      padding: '0vw !important',
    },
    '& #academicSchool': {
      width: '100%',
    },
    '& #changeLogs': {
      width: '47.2vw',
    },
  },
  paymentInfoKeys: {
    color: colors.primary,
    textAlign: 'left',
    '@media (max-width: 1200px)': {
      display: 'flex',
      alignItems: 'center',
    },
    '@media (min-width: 1200px)': {
      height: '2vw',
      display: 'flex',
      alignItems: 'center',
    },
  },
  paymentInfoKey: {
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
      width: '7vw !important',
      // float: 'left',
    },
    color: colors.black,
    fontWeight: '600',
    textAlign: 'left',
    textTransform: 'Capitalize',
    minWidth: '110px',
  },
  paymentInfoValue: {
    color: colors.cardValueSecondaryColor,
    textAlign: 'left',
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
      height: '1.5vw',
    },
    // float: 'left !important',
    width: 'max-content',
  },
  value: {
    color: colors.cardValueSecondaryColor,
    textAlign: 'left',
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
      // float: 'right',
      width: '10vw',
    },
    // height: '1vw',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
      // width: '55%',
    },
  },
  paymentId: {
    // marginBottom: '1vw !important',
  },
  totalDiscount: {
    color: colors.primary,
    padding: '0.5vw 2vw 0.5vw 1vw',
    width: '100%',
    fontWeight: 'bold',
    // borderRadius: '0.5vw',
    // marginBottom: '0.5vw',
    marginTop: '0.5vw',
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
    border: `0.1vw solid ${colors.black}`,
  },
  totalInfoKeys: {
    color: colors.primary,
    textAlign: 'right',
    display: 'flex',
    '@media (max-width: 1200px)': {
    },
  },
  totalInfoValue: {
    color: colors.cardValueSecondaryColor,
    textAlign: 'right',
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
      // float: 'left',
      // width: '4.5vw',
      // height: '1.5vw',
    },
    whiteSpace: 'nowrap',
  },
  totalPayment: {
    background: colors.secondary,
    border: 'none',
  },
  amountMargin: {
    marginRight: -3,
  },
  totalInfoKey: {
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
      // width: '8vw !important',
      // float: 'left',
    },
    color: colors.black,
    fontWeight: '600',
    textAlign: 'right',
    textTransform: 'Capitalize',
  },
}));

export default {
  useStyles,
};
