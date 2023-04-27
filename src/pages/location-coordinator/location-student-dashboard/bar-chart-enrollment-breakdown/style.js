import { fonts } from '../../../../theme';

const detailstyle = () => ({
  title: {
    fontWeight: fonts.fontWeight.semi,
    fontFamily: fonts.fontType.roboto,
    color: '#055BD8',
    '@media (min-width: 1200px)': {
      fontSize: '1.4vw',
    },
    padding: '1vw',
    borderBottom: '2px solid #CFC7C7',
  },
  horizontalLine: {
  },
  chartWrapper: {
    width: '95%',
    height: '75vw',
    '@media (min-width: 1200px)': {
      height: '38vw',
      width: '38vw',
      padding: '10px 10px 10px 28px',
    },
    '@media (max-width: 899px)': {
      fontSize: '14px',
    },
    '@media (max-width: 599px)': {
      fontSize: '12px',
    },
    '@media (max-width: 399px)': {
      fontSize: '11px',
    },
  },
  xAxisTickWrapper: {
    '@media (min-width: 1200px)': {
      fontSize: '0.1vw',

    },
  },
  bold: {
    fontWeight: 'bold',
    '@media (max-width: 1200px)': {
      display: 'none',
    },
  },
  legendItem: {
    '& .recharts-surface': {
      float: 'left',
      marginTop: '3px',
      marginRight: '3px',
    },
  },
  circleAlign: {
    float: 'left',
    marginTop: '3px',
    marginRight: '3px',
  },
});

export default detailstyle;
