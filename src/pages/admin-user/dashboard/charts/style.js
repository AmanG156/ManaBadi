import { colors } from '../../../../theme';

const chartStyle = () => ({
  noData: {
    textAlign: 'center',
  },
  legend: {
    width: 10,
    height: 10,
    borderRadius: '90%',
    background: colors.purple,
  },
  nonClickedLegend: {
    width: 10,
    height: 10,
    borderRadius: '100%',
    marginRight: 5,
    background: 'grey',
  },
  containterLinerChart: {
    '& .recharts-wrapper': {
      minWidth: '45vw',
    },
  },
  containter: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    minHeight: '50vh',
    border: `1px solid ${colors.border}`,
    borderRadius: 5,
    padding: '10px 10px',
    height: '100% !important',
    boxSizing: 'border-box',
    overflow: 'hidden',
    '& .recharts-wrapper': {
      margin: 'auto',
      width: '100% !important',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      '& .customized-legend': {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        '& .legend-item': {
          display: 'flex',
          alignItems: 'center',
          fontSize: 14,
          marginBottom: 10,
          marginRight: 10,
          cursor: 'pointer',
          flexWrap: 'wrap',
          '& .symbol': {
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: '#f00',
            marginRight: 5,
          },
          '& span': {
            fontSize: 14,
          },
        },
      },
      '& svg': {
        width: '100%',
      },
      '& .recharts-legend-wrapper': {
        width: '100% !important',
        left: '0 !important',
        bottom: '0 !important',
        '& ul': {
          display: 'flex',
          flexWrap: 'wrap',
          padding: 0,
          margin: 0,
          '& li': {
            display: 'flex !important',
            alignItems: 'center !important',
            width: '50%',
            marginRight: '0 !important',
            paddingRight: 10,
            boxSizing: 'border-box',
            marginBottom: 5,
            fontSize: 14,
            '& svg': {
              marginRight: '6px !important',
              width: 13,
              height: 13,
              minWidth: 13,
            },
            '& span': {
              fontSize: 14,
              color: `${colors.black} !important`,
            },
          },
        },
      },
    },
    '& .highcharts-container': {
      '& svg': {
        fontFamily: 'inherit !important',
      },
    },
  },
  enrollWeekGraph: {
    height: '100%',
    '& .recharts-wrapper': {
      '& .recharts-legend-wrapper': {
        '& ul': {
          flexDirection: 'column',
          '& li': {
            width: '100%',
            marginBottom: 5,
            display: 'flex',
            alignItems: 'center',
            '& .dots': {
              width: 13,
              height: 13,
              borderRadius: '50%',
              marginRight: 5,
            },
          },
        },
      },
    },
  },
  regionPiechart: {
    '& .recharts-wrapper': {
      '& .recharts-legend-wrapper': {
        '& ul': {
          display: 'grid',
          gridTemplateColumns: 'auto auto auto',
          '& li': {
            width: 'auto',
          },
        },
      },
    },
  },
  geoRegionChart: {
    '& .recharts-wrapper': {
      '& .recharts-legend-wrapper': {
        '& ul': {
          display: 'grid',
          gridTemplateColumns: 'auto 140px',
          '& li': {
            width: 'auto',
          },
        },
      },
    },
  },
  legends: {
    '& ul': {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexWrap: 'wrap',
      '& li': {
        marginBottom: 10,
        marginRight: 10,
        fontSize: 14,
      },
    },
  },
  mapView: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '& svg': {
      fill: colors.greyBorder,
    },
  },
  svgContainer: {
    padding: 0,
  },
  heading: {
    padding: 0,
    fontWeight: 600,
    color: colors.primaryBlueColor,
    paddingBottom: 20,
    fontSize: 18,
  },
  pieCharts: {
    '& .recharts-default-legend': {
      display: 'flex',
      flexWrap: 'wrap',
      '& li': {
        width: '50%',
        textAlign: 'left',
        marginRight: '0 !important',
        display: 'flex !important',
        alignItems: 'center',
        '&:nth-child(even)': {
          justifyContent: 'flex-end',
        },
      },
    },
  },
  mapFilter: {
    display: 'flex',
    alignItems: 'center',
    borderTop: `1px solid ${colors.greyBorder}`,
    marginLeft: -10,
    marginRight: -10,
    padding: '0 10px',
    marginTop: 'auto',
    flexDirection: 'column',
  },
  filterContainer: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
  },
  filterLabel: {
    margin: 0,
    fontSize: 14,
    fontWeight: 400,
    color: colors.mapTitleColor,
    marginRight: 15,
    paddingTop: 2,
    borderTop: '2px solid transparent',
    cursor: 'pointer',
    marginBottom: 15,
  },
  activeFilter: {
    borderTop: `2px solid ${colors.navyBlue}`,
    color: colors.navyBlue,
    fontWeight: 500,
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.navyBlue,
    padding: '15px 0',
  },
});
export default chartStyle;
