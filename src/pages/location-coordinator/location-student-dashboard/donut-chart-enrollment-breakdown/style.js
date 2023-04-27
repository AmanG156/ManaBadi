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
    padding: '10px 10px 10px 28px',
  },
});

export default detailstyle;
