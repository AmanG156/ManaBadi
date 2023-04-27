import { colors } from '../../../../theme';

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
    display: 'flex',
    color: colors.black,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    fontSize: 16,
  },
  primaryItemName: {
    display: 'flex',
    color: colors.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    fontSize: 16,
  },
  itemEmail: {
    padding: '0.3vw 0 0 0.5vw',
    display: 'block',
    textAlign: 'left',
    margin: '0',
  },
  nonPrimaryCheckListContainer: {
    color: colors.black,
    padding: '0.5vw 1vw',
    textAlign: 'center',
    '@media (min-width: 1200px)': {
      minHeight: '2vw',
      minWidth: '25vw',
      maxWidth: '35vw',
      borderRadius: '4vw',
      fontSize: '0.9vw',
      display: 'flex',
      marginBottom: 0,
    },
    '@media (max-width: 1200px)': {
      margin: '8px 0',
      width: 'calc((100vw)/ 2)',
      padding: '15px',
      minWidth: 'fit-content',
      borderRadius: '50px',
    },
    background: colors.darkGrey,
    display: 'block',
  },
  labelDetails: {
    textAlign: 'left',
    fontSize: '0.9vw',
    '& p': {
      margin: '0',
    },
  },
  labelImage: {
    '& img': {
      width: '1.5vw',
      height: '1.5vw',
      borderRadius: '50%',
      marginRight: '0.5vw',
    },
  },
  checkListContainer: {
    padding: '0.5vw 1vw',
    textAlign: 'center',
    '@media (min-width: 1200px)': {
      minHeight: '2vw',
      minWidth: '25vw',
      maxWidth: '35vw',
      marginBottom: '0',
      borderRadius: '4vw',
      fontSize: '0.9vw',
      display: 'flex',
    },
    '@media (max-width: 1200px)': {
      margin: '8px 0',
      width: 'calc((100vw)/ 2)',
      padding: '15px',
      minWidth: 'fit-content',
      borderRadius: '50px',
    },
    background: colors.darkGrey,
    display: 'block',
  },
  checkList: {
    marginTop: '2px !important',
  },
  checkedIcon: {
    float: 'right',
    padding: '0 0.6vw',
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
  unCheckedIcon: {
    float: 'right',
    padding: '0 0.6vw',
    '& .MuiSvgIcon-root': {
      color: colors.black,
      cursor: 'pointer',
      display: 'block',
      '@media (min-width: 1200px)': {
        width: '1vw',
        height: '1vw',
      },
    },
  },
  checkedCross: {
    float: 'right',
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
    paddingRight: '10px',
    '& .MuiSvgIcon-root': {
      color: colors.black,
      cursor: 'pointer',
      display: 'block',
      '@media (min-width: 1200px)': {
        width: '1vw',
        height: '1vw',
      },
    },
  },
  dropdown: {
    border: '0.1vw solid rgba(0, 0, 0, 0.23)',
    borderRadius: 5,
    padding: '10px 15px',
    '& .MuiFormControl-root.MuiTextField-root': {
      marginBottom: 0,
    },
    '&.Mui-focused': {
      border: `0.2vw solid ${colors.primary}`,
    },
    '& input': {
      marginBottom: 0,
      padding: '0 !important',
    },
    '& .MuiInput-underline': {
      display: 'flex',
    },
    '& .app': {
      margin: '5px 10px 5px 0px',
    },
    '& .MuiSvgIcon-root': {
      display: 'none',
    },
    '& #tags-standard': {
      width: 'auto',
      marginTop: 0,
    },
    '& ::before': {
      display: 'none',
    },
    '& ::after': {
      display: 'none',
    },
  },
}));

export default starListStyle;
