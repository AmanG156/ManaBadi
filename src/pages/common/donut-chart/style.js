import { fonts } from '../../../theme';

const detailstyle = () => ({
  label: {
    '@media (min-width: 1200px)': {
      fontSize: '0.8vw',
    },
    fontWeight: fonts.fontWeight.bold,
  },
  customLegend: {
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
      width: '35vw',
    },
    display: 'flex',
    flexWrap: 'wrap',
  },
  legendItem: {
    margin: '0 20px 20px 0',
    flex: '0 0 7vw',
  },
  chartWrapper: {
    width: '95%',
    height: '75vh',
    '@media (min-width: 1200px)': {
      width: '30vw',
      height: '30vw',
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
  noData: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
  },
  loadingStyles: {
    marginLeft: '20px',
    marginTop: '10px',
  },
});

export default detailstyle;
