import { colors } from '../../../../theme';

const announcementTableStyle = () => ({
  announcementTable: {
    '&.MuiTableHead-root': {
      borderBottom: `0.15vw solid ${colors.actionIconsColor}`,
    },
    '& .MuiTableCell-head': {
      '@media (min-width: 1200px)': {
        fontSize: '1vw',
      },
      padding: '1.5vw 0.5vw',
      color: colors.actionIconsColor,
      fontWeight: 600,
    },
    '& .MuiTableCell-body': {
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
      },
      width: '2vw',
      padding: '1.5vw 0.5vw',
      '& .MuiSvgIcon-root': {
        '@media (min-width: 1200px)': {
          width: '1.5vw',
          height: '1.5vw',
        },
      },
    },
  },
});

export default announcementTableStyle;
