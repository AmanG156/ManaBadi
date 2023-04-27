import { colors } from '../../../theme';

const starListStyle = (() => ({
  gridContainer: {
    minHeight: '40vh',
  },
  divider: {
    marginTop: '2vw',
    paddingBottom: '3vw',
  },
  teacherItem: {
    float: 'left',
    textAlign: 'left',
    width: '73%',
  },
  itemName: {
    padding: '0.5vw 0 0 0.5vw',
    display: 'block',
    textAlign: 'left',
  },
  itemEmail: {
    padding: '0.3vw 0 0 0.5vw',
    display: 'block',
    textAlign: 'left',
    margin: '0',
  },
  nonPrimaryCheckListContainer: {
    color: colors.black,
    paddingLeft: '1vw',
    textAlign: 'center',
    '@media (min-width: 1200px)': {
      minHeight: '4vw',
      minWidth: '25vw',
      maxWidth: '25vw',
      marginBottom: '1vw',
      borderRadius: '4vw',
      fontSize: '0.9vw',
    },
    '@media (max-width: 1200px)': {
      margin: '8px 0',
      width: 'calc((100vw)/ 2)',
      padding: '15px',
      minWidth: 'fit-content',
      borderRadius: '50px',
    },
    background: colors.secondary,
    display: 'block',
  },
  checkListContainer: {
    color: colors.primary,
    paddingLeft: '1vw',
    textAlign: 'center',
    '@media (min-width: 1200px)': {
      minHeight: '4vw',
      minWidth: '25vw',
      maxWidth: '25vw',
      marginBottom: '1vw',
      borderRadius: '4vw',
      fontSize: '0.9vw',
    },
    '@media (max-width: 1200px)': {
      margin: '8px 0',
      width: 'calc((100vw)/ 2)',
      padding: '15px',
      minWidth: 'fit-content',
      borderRadius: '50px',
    },
    background: colors.secondary,
    display: 'block',
  },
  checkList: {
    marginTop: '2px !important',
    color: colors.primary,
  },
  checkListIcon: {
    float: 'right',
    paddingRight: '1vw',
    marginTop: '1vw',
    '& .MuiSvgIcon-root': {
      color: colors.primary,
      cursor: 'pointer',
      display: 'block',
      '@media (min-width: 1200px)': {
        width: '1vw',
        height: '1vw',
      },
    },
  },
  crossIcon: {
    float: 'right',
    paddingRight: '1vw',
    marginTop: '1vw',
    '& .MuiSvgIcon-root': {
      color: colors.primary,
      cursor: 'pointer',
      display: 'block',
      '@media (min-width: 1200px)': {
        width: '1vw',
        height: '1vw',
      },
    },
  },
  dropdown: {
    '& .MuiSvgIcon-root': {
      display: 'none',
    },
    '& #tags-standard': {
      width: 'inherit',
      marginTop: '15px;',
    },
  },
}));

export default starListStyle;
