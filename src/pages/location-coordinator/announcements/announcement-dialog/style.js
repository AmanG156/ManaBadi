/* eslint-disable no-restricted-syntax */
import { colors } from '../../../../theme';

const announceDialog = () => ({
  threeBoxes: {
    flexDirection: 'row',
    display: 'flex',
    width: '100%',
  },
  announcementDialogAtom: {
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
    '& .MuiDialogContent-root': {
      '@media (min-width: 1200px)': {
        minWidth: '50vw',
        maxWidth: '50vw',
      },
    },
  },
  firstBox: {
    border: `1px solid ${colors.black}`,
    padding: '10px',
    height: '2%',
    width: '23%',
    flexDirection: 'column',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    marginRight: '2vw',
  },
  insideBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
  },
  mailID: {
    border: `1px solid ${colors.black}`,
    marginTop: '1vw',
    padding: '1vw',
    overflow: 'scroll',
    backgroundColor: colors.bgGrey,
  },
  sentIt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
  },
  iconGreen: {
    color: colors.lightGreen,
  },
  textGreen: {
    color: colors.lightGreen,
  },
  textPrimary: {
    color: colors.primary,
  },
  iconPrimary: {
    color: colors.primary,
  },
  textGrey: {
    color: colors.grey,
  },
  iconGrey: {
    color: colors.grey,
  },
  iconRed: {
    color: colors.errorText,
  },
  textRed: {
    color: colors.errorText,
  },
  announcementDetails: {
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
    '& .MuiTypography-root': {
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
        height: '1.5vw',
        '& svg': {
          width: '1.3vw',
          height: '1.3vw',
        },
      },
    },
  },
  analytics: {
    marginTop: '2vw',
    '& .MuiTableCell-root': {
      padding: '0.5vw',
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
      },
      border: 'none',
      width: '35%',
    },
    '& .MuiTableCell-head': {
      fontWeight: 600,
    },
  },
  read: {
    color: colors.lightGreen,
  },
  menssageHeader: {
    color: colors.primary,
    '@media (min-width: 1200px)': {
      width: '8vw',
    },
    float: 'left',
    margin: 0,
  },
  messageDetail: {
    float: 'right',
    margin: 0,
  },
  boxDetails: {
    marginLeft: '1vw',
  },
});

export default announceDialog;
