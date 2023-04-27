import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { colors, fonts } from '../../../../theme';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

const style = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginLeft: '0px',
    width: '100%',
    '@media (max-width: 1199px)': {
      marginRight: 0,
    },
  },
  fileLabel: {
    width: '70%',
    marginRight: '2%',
    cursor: 'not-allowed',
  },
  container: {
    display: 'flex',
    '& label': {
      backgroundColor: '#9cc',
      color: '#fff',
      boxShadow: 'none',
      padding: '8px 24px',
      letterSpacing: 2,
      '& span': {
        fontFamily: fonts.fontType.roboto,
      },
      '&:hover': {
        backgroundColor: '#019491',
        boxShadow: 'none',
      },
    },
  },
  switchText: {
    fontSize: '0.9vw !important',
    textAlign: 'center',
    [theme.breakpoints.down('lg')]: {
      fontSize: '12px !important',
    },
  },
  switchHeading: {
    fontSize: '1vw !important',
    fontWeight: fonts.fontWeight.bold,
    textAlign: 'center',
    [theme.breakpoints.down('lg')]: {
      fontSize: '13px !important',
    },
  },
  switchUi: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    '& p': {
      margin: '0 8px !important',
      fontSize: '0.9vw',
    },
    '& span': {
      marginTop: '0 !important',
      fontSize: '0.9vw',
    },
    '& .MuiSwitch-switchBase': {
      padding: 3,
      '&.Mui-checked+.MuiSwitch-track': {
        background: colors.lightGreen,
      },
    },
    '& .MuiSwitch-thumb': {
      width: 10,
      height: 10,
    },
  },
}));

export { style, AntSwitch };
