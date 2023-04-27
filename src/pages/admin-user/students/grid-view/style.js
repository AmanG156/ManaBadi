import makeStyles from '@mui/styles/makeStyles';

import { colors } from '../../../../theme';

export const useStyles = makeStyles(() => ({
  CardLayout: {
    textAlign: 'left',
    paddingBottom: '1vw',
    paddingLeft: '1.5vw',
  },
  studentKeys: {
    color: colors.primary,
    textAlign: 'left',
    paddingBottom: '0.3vw',
    '& .MuiFormControlLabel-label': {
      '@media (min-width: 1200px)': {
        fontSize: '1vw',
      },
    },
  },
  noData: {
    justifyContent: 'center',
    boxShadow: 'none',
    marginTop: '4vw',
  },
  loadMore: {
    textAlign: 'right',
    '& .MuiButton-root': {
      marginRight: '1vw',
      minWidth: '8vw',
    },
  },
  totalRowCount: {
    marginRight: '1.3vw',
    marginBottom: '1vw',
    textAlign: 'right',
    fontSize: '0.9vw',
    color: colors.black,
  },
}));

export default {
  useStyles,
};
