import makeStyles from '@mui/styles/makeStyles';
import { colors, fonts } from '../../../theme/index';

const style = makeStyles(() => ({
  tderHead: {
    textTransform: 'initial',
  },
  footer: {
    borderTop: '1px solid #104F96',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '1vw 0 0 0',
    fontWeight: 'bold',
    height: '2.7vw',
    fontSize: '1vw',
  },
  totalFee: {
    paddingRight: '3.1vw',
    textAlign: 'right',
    fontWeight: 600,
    fontSize: '1vw',
  },
  totalFeeAmout: {
    paddingRight: '3.1vw',
    textAlign: 'right',
    fontWeight: 600,
    fontSize: '1vw',
  },
  tabelRowHead: {
    '& .MuiTableCell-head': {
      color: colors.black,
      padding: '0.5vw',
      fontSize: '1vw',
      fontWeight: 'bold',
      borderBottom: '0px solid #dddddd',
      lineHeight: '2vw',
      textAlign: 'right',
      width: '14.5%',
      backgroundColor: colors.secondary,
      fontFamily: fonts.fontType.roboto,
      '@media (max-width: 1199px)': {
        fontSize: '1vw',
      },
      '& .MuiTableSortLabel-root': {
        color: colors.black,
        '& svg': {
          fill: '#009490 !important',
          position: 'relative',
          top: -2,
        },
        '&:hover': {
          color: 'inherit',
          '& svg': {
            opacity: 1,
          },
        },
      },
      '&:first-child, &:nth-child(2)': {
        textAlign: 'left',
      },
    },
  },
  mainTable: {
    maxHeight: 440,
    boxShadow: 'none',
    width: '100%',
    overflowX: 'auto',
    fontFamily: 'inherit',
    tableLayout: 'fixed',
    // background: colors.gray,
    '@media (max-width: 1199px)': {
      maxHeight: 'inherit',
    },
    '& > table': {
      // borderBottom: '1px solid #009490',
      // marginBottom: 10,
    },
    '& .MuiTablePagination-root': {
      display: 'flex',
      justifyContent: 'center',
      '& > div': {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  },
  tabelRowBody: {
    overflowX: 'hidden',
    '& .MuiTableCell-body': {
      borderTop: '1px solid #104F96',
      color: colors.black,
      height: '2.7vw',
      fontSize: '0.9vw',
      position: 'relative',
      fontWeight: 'bold',
      textAlign: 'right',
      width: '4vw !important',
      padding: '0.5vw 2.5vw 0.5vw 0.5vw',
      fontFamily: fonts.fontType.roboto,
      '& button': {
        backgroundColor: 'transparent !important',
        color: '#7cc4a3',
        width: '100%',
        '& svg': {
          width: 30,
          height: 30,
        },
        '&:hover': {
          backgroundColor: 'transparent !important',
        },
      },
      '& div[class*="-formControl-"]': {
        marginLeft: 0,
        marginRight: 0,
        '& .MuiSelect-select.MuiSelect-select': {
          padding: '14px 10px !important',
          backgroundColor: 'transparent !important',
          fontSize: 12,
        },
      },
      '@media (max-width: 1199px)': {
        fontSize: 13,
      },
      '&:first-child, &:nth-child(2)': {
        textAlign: 'left',
      },
      '& .MuiChip-colorPrimary': {
        color: '#fff',
        borderRadius: 4,
        backgroundColor: '#9cc',
        fontSize: 12,
        '&:hover': {
          backgroundColor: colors.black,
        },
      },
      '& p': {
        fontWeight: 400,
        fontSize: '1vw',
        fontFamily: fonts.fontType.roboto,
        color: `${colors.black} !important`,
      },
    },
    // '&:last-child': {
    //   '& .MuiTableCell-body': {
    //     paddingBottom: 40,
    //   },
    // },
  },
  icons: {
    cursor: 'pointer',
    color: colors.webColor,
    fontSize: '14px !important',
    width: '85%',
    '& button': {
      width: '100% !important',
      justifyContent: 'center',
      padding: '10px',
      backgroundColor: '#9cc !important',
      boxShadow: 'none',
      fontWeight: 'bold',
      fontSize: 14,
      '&:hover': {
        backgroundColor: '#009490 !important',
        boxShadow: 'none',
      },
    },
  },
  tabel: {
    width: '100%',
    border: '2px solid #104F96',
    borderRadius: 5,
    margin: '20px 0px 0px 0px',
  },
  borderBtm: {
    background: colors.black,
    width: '100% !important',
    margin: '40px 0 22px',
    height: 1,
    display: 'flex',
    '@media (max-width: 1599px)': {
      width: '100% !important',
    },
  },
  separator: {
    '& td': {
      borderRight: '0px solid black',
      '&:last-child': {
        borderRight: 0,
        paddingRight: '3.5vw',
      },
    },
    '& th': {
      borderRight: '0px solid black',
      '&:last-child': {
        borderRight: 0,
        paddingRight: '1.7vw',
      },
    },
  },
  link: {
    cursor: 'pointer',
  },
  numberField: {
    textAlign: 'right !important',
  },
  warningField: {
    color: 'red',
  },
  sucessField: {
    color: colors.green,
  },
  tableInputs: {
    width: 140,
  },
  inputErrors: {
    color: 'red',
    display: 'block',
    textOverflow: 'ellipsis',
    width: '100%',
    overflow: 'hidden',
    fontSize: '12px !important',
    whiteSpace: 'nowrap',
    position: 'absolute',
    left: 0,
    right: 0,
    padding: '0 14px',
    boxSizing: 'border-box',
    zIndex: 1,
    bottom: -5,
    cursor: 'pointer',
  },
}));

export default style;
