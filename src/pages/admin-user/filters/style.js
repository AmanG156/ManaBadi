import { colors } from '../../../theme';

const filterStyle = (theme) => ({
  filterContainer: {
    minWidth: '10vw',
    padding: '0 10px',
    '& .MuiFormControl-root': {
      marginLeft: 12,
      margin: 0,
    },
    '& .MuiFormControlLabel-root': {
      '& .MuiTypography-root': {
        fontSize: '0.9vw',
      },
    },
  },
  drawer: {
    '& .css-4t3x6l-MuiPaper-root-MuiDrawer-paper': {
      marginTop: 100,
    },
  },
  checkBoxAll: {
    margin: '0 0 0 14px',
    '&+.MuiFormControl-root': {
      margin: 12,
    },
  },
  dFlex: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 12,
    height: '3vw',
  },
  expandIconAll: {
    marginTop: 0,
    display: 'flex',
    cursor: 'pointer',
    marginLeft: 'auto',
  },
  expandIcon: {
    display: 'flex',
    cursor: 'pointer',
  },
  line: {
    display: 'flex',
    padding: '5px 10px',
    fontSize: '0.9vw',
    [theme.breakpoints.down('md')]: {
      fontSize: 12,
    },
  },
  dialogButtons: {
    paddingRight: '1vw !important',
    textAlign: 'center',
  },
  button: {
    '& .MuiButtonBase-root.MuiButton-root': {
      minWidth: '10vw !important',
    },
  },
  errorText: {
    color: colors.errorText,
    fontSize: '0.7vw',
    display: 'block',
    [theme.breakpoints.down('lg')]: {
      fontSize: 12,
    },
  },
  btnFullView: {
    width: '96% !important',
    margin: '0 !important',
    minWidth: 'inherit !important',
  },
});

export default filterStyle;
