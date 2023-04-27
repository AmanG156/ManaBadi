import { fonts } from '../../../../theme';

const detailstyle = () => ({

  notScored: {
    backgroundColor: '#CACACA',
    borderBottom: 'none',
    color: '#FFFFFF',
  },
  absent: {
    backgroundColor: '#F24813',
    color: '#FFFFFF',
    borderBottom: 'none',

  },
  score65: {
    color: '#FFFFFF',
    backgroundColor: '#F65C4B',
    borderBottom: 'none',

  },
  noData: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
  },
  score75: {
    color: '#FFFFFF',
    backgroundColor: '#FFEB3B',
    borderBottom: 'none',

  },
  score100: {
    backgroundColor: '#9CC962',
    color: '#FFFFFF',
    borderBottom: 'none',
  },
  tableRow: {
    '& td, th': {
      border: '1px solid #ffff',
      'white-space': 'nowrap',
    },
    fontSize: '16px',
  },
  table: {
    minWidth: '650px',
    marginTop: '45px',
  },
  whiteBG: {
    backgroundColor: '#FFFFFF',
  },
  tableHeader: {
    fontSize: '18px',
    fontFamily: fonts.fontType.roboto,
    fontWeight: fonts.fontWeight.low,
    '& td, th': {
      border: '1px solid #ffff',
      'white-space': 'nowrap',
    },
  },
  horizontalLine: {
    border: '0.5px solid #CFC7C7',
  },
  radioButtonWrapper: {
    padding: '0 0 2px 52px',
  },

  testScoreTitle: {
    fontWeight: fonts.fontWeight.semi,
    fontFamily: fonts.fontType.roboto,
    color: '#055BD8',
    '@media (min-width: 1200px)': {
      fontSize: '1.4vw',
    },
    padding: '1vw',
  },
});

export default detailstyle;
