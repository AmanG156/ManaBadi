import { fonts } from '../../../../theme';

const detailstyle = () => ({
  tableHeader: {
    '& td, th': {
      fontSize: '0.8vw',
      color: '#055BD8',
      fontWeight: fonts.fontWeight.normal,
      fontFamily: fonts.fontType.roboto,
      paddingBottom: '2px',
      paddintTop: 0,
      verticalAlign: 'bottom',
      borderBottom: '1.5px solid #CFC7C7 !important',
    },
    '& th:first-child': {
      paddingLeft: '60px',
    },
  },
  horizontalLine: {
    '@media (min-width: 1200px)': {
      marginTop: '40px',
    },
    border: '0.5px solid #CFC7C7',
  },
  noData: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
  },
  emailIcon: {
    color: '#000000 !important',
  },
  tableRow: {
    '& td, th': {
      fontSize: '1vw',
      fontFamily: fonts.fontType.roboto,
      paddingTop: '6.25px',
      paddingBottom: '6.25px',
      verticalAlign: 'middle',
    },
    '& td:first-child': {
      paddingLeft: '60px',
    },
  },
  tableContainer: {
    maxHeight: '600px',
  },
  teacherStatsTitle: {
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
