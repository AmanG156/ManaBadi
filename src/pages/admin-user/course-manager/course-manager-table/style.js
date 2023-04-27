import { colors } from '../../../../theme';

const roleManagerStyle = () => ({
  roleManagerTable: {
    '&.MuiTableHead-root': {
      borderBottom: `0.15vw solid ${colors.actionIconsColor}`,
    },
    '& .MuiTableCell-head': {
      fontSize: '1vw',
      padding: '1.5vw 0.5vw',
      color: colors.actionIconsColor,
      fontWeight: 600,
      width: '20%',
    },
    '& .MuiTableCell-body': {
      fontSize: '0.9vw',
      padding: '1.5vw 0.5vw',
      width: '20%',
      '& .MuiSvgIcon-root': {
        width: '1.5vw',
        height: '1.5vw',
        color: colors.black,
      },
      '& .MuiIconButton-root:hover': {
        backgroundColor: colors.white,
      },
      '& .MuiIconButton-root': {
        padding: '0 0 0 1vw',
      },
      '& .MuiTypography-root': {
        display: 'block',
      },
      '& .MuiGrid-item': {
        paddingLeft: '0',
      },
    },
  },
  actionCell: {
    '& .MuiBox-root': {
      alignItems: 'end',
      justifyContent: 'flex-end',
    },
  },
  expandedData: {
    textAlign: 'right',
  },
  feeStructure: {
    width: '19vw',
    fontSize: '0.9vw',
  },
  feeName: {
    margin: '0',
    width: '16vw',
    textAlign: 'right',
    float: 'left',
  },
  feeValue: {
    margin: '0',
    width: '3vw',
    float: 'right',
  },
});

export default roleManagerStyle;
