import { colors } from '../../../../theme';

const regionManagerStyle = (theme) => ({
  regionManagerTable: {
    '&.MuiTableHead-root': {
      borderBottom: `0.15vw solid ${colors.actionIconsColor}`,
    },
    '& .MuiTableCell-head': {
      fontSize: '0.9vw',
      padding: '1.5vw 0.5vw',
      color: colors.actionIconsColor,
      fontWeight: 600,
      [theme.breakpoints.down('lg')]: {
        fontSize: 12,
      },
      [theme.breakpoints.down('md')]: {
        fontSize: 10,
      },
    },
    '& .MuiTableCell-body': {
      fontSize: '0.9vw',
      padding: '1.5vw 0.5vw',
      [theme.breakpoints.down('lg')]: {
        fontSize: 12,
      },
      [theme.breakpoints.down('md')]: {
        fontSize: 10,
      },
      '& .MuiSvgIcon-root': {
        width: '1.5vw',
        height: '1.5vw',
        cursor: 'pointer',
        [theme.breakpoints.down('lg')]: {
          width: 12,
          height: 12,
        },
      },
    },
  },
  upbutton: {
    cursor: 'pointer',
  },
});

export default regionManagerStyle;
