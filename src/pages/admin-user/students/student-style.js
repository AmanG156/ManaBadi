import makeStyles from '@mui/styles/makeStyles';

import { colors, fonts } from '../../../theme';

export const useStyles = makeStyles(() => ({
  recoveryContent: {
    paddingBottom: '2vw',
    textAlign: 'center',
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
  },
  dialogButtons: {
    paddingRight: '1vw !important',
    textAlign: 'center',
  },
  dialogHeader: {
    '@media (min-width: 1200px)': {
      fontSize: '1.32vw',
    },
    margin: '0 0 0.9vw 0',
    fontWeight: 500,
  },
  dialogContent: {
    marginBottom: '1vw',
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
  },
  filterSection: {
    position: 'relative',
    '& .MuiDrawer-docked .MuiDrawer-paper': {
      position: 'sticky',
      top: 0,
      maxHeight: '100vh',
      overflow: 'hidden',
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        width: 5,
      },
      '&::-webkit-scrollbar-thumb': {
        background: colors.primary,
      },
    },
  },
  gridContainer: {
    padding: '2vw 2vw 2vw 3vw !important',
    minHeight: '65vh',
  },
  paddingRemove: {
    padding: '0 !important',
  },
  viewLogs: {
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
    fontFamily: fonts.fontType.roboto,
    fontWeight: fonts.fontWeight.medium,
    display: 'flex',
    color: colors.actionIconsColor,
    paddingLeft: '3.5vw',
    textDecoration: 'underline',
    cursor: 'pointer',
    paddingTop: '1vw',
  },
  button: {
    '& .MuiButtonBase-root.MuiButton-root': {
      minWidth: '10vw !important',
    },
  },
  swapFooterBtn: {
    padding: '0 2.5vw !important',
    '& .MuiGrid-grid-xs-4': {
      paddingLeft: '0 !important',
    },
  },
  mainSection: {
    width: 'calc(100% - 240px)',
  },
}));

export default {
  useStyles,
};
