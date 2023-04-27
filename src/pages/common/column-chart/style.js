const detailstyle = () => ({
  customLegend: {
    width: '100%',
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
  xAxisTickWrapper: {
    '@media (min-width: 1200px)': {
      fontSize: '0.7vw',
    },
  },
  bold: {
    fontWeight: 'bold',
    '@media (max-width: 1200px)': {
      display: 'none',
    },
  },
  noData: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
  },
});

export default detailstyle;
