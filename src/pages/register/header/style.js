import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { colors, fonts } from '../../../theme';

export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: '10%',
    '@media (max-width: 1199px)': {
      top: '25px',
    },
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: 'white',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: 'white',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

export const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: 'white',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    '& .MuiSvgIcon-root': {
      fill: colors.primary,
    },
  }),
  ...(ownerState.completed && {
    backgroundColor: 'white',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    '& .MuiSvgIcon-root': {
      fill: colors.primary,
    },
  }),
}));

const headerstyle = () => ({
  icon: {
    height: 30,
    width: 40,
  },
  mainHeaderTitle: {
    fontWeight: fonts.fontWeight.bold,
    textAlign: 'left',
    color: colors.white,
    '@media (min-width: 1200px)': {
      fontSize: '2vw',
      padding: '1vw 0vw 1vw 1vw',
    },
    '@media (max-width: 1199px)': {
      fontSize: 'calc(22px + 6 * ((100vw - 320px) / 1199))',
      paddingBottom: '10px',
    },
    '@media (max-width: 899px)': {
      textAlign: 'center',
    },
    '@media (max-width: 499px)': {
      // textAlign: 'center',
    },
  },
  mainHeaderDesc: {
    textAlign: 'left',
    fontWeight: fonts.fontWeight.normal,
    color: colors.mainHeaderDescColor,
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
    '@media (max-width: 1199px)': {
      fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    },
    '@media (max-width: 899px)': {
      textAlign: 'center',
    },
    '@media (max-width: 499px)': {
      // textAlign: 'center',
    },
  },
  wrapper: {
    justifyContent: 'center',
    width: '100%',
  },
  completed: {
    width: '4vw !important',
    height: '4vw !important',
  },
});

export default headerstyle;
