import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { colors, fonts } from '../../../theme';

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
const style = () => ({
  errorText: {
    color: colors.errorText,
    fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    '@media (min-width: 1200px)': {
      fontSize: '0.7vw',
    },
    display: 'block',
    marginTop: '0.3vw',
    marginLeft: '0.2vw',
  },
  button: {
    justifyContent: 'flex-end',
    margin: '10px 4px 3px 1px',
    width: '98%',
  },
  setGreen: {
    color: colors.lightGreen,
  },
  innerContainer: {
    margin: '0.3vw 0.6vw',
    fontFamily: fonts.fontType.roboto,
    '@media (max-width: 1023px), @media (min-width: 375px)': {
      width: '97%',
      margin: '0 0 0 10px',
      '& .MuiFormControl-root': {
        margin: '10px 0 0 0',
      },
    },
    '& .MuiOutlinedInput-root': {
      '@media (min-width: 1200px)': {
        height: '2.692vw',
        borderRadius: '0.4vw',
        width: '100%',
      },
      '& .MuiSelect-select': {
        minHeight: '0vw !important',
      },
    },
    '& .MuiFormControl-root .MuiInputLabel-root': {
      lineHeight: '0.9vw !important',
      fontSize: '0.9vw',
      color: `${colors.primary} !important`,
    },
  },
  form: {
    marginTop: '0 !important',
  },
  changeGridLayout: {
    minWidth: '800px',
    '& .MuiFormControl-root': {
      width: '100%',
      '& .MuiInputLabel-root': {
        fontSize: '0.9vw',
        lineHeight: '1vw !important',
        transform: 'translate(0.7vw, 0.9vw)',
        '&.MuiInputLabel-shrink': {
          transform: 'translate(0.7vw, -0.5vw)',
          '@media (max-width: 1200px)': {
            transform: 'translate(14px, -9px) scale(0.75)',
          },
          fontSize: '0.7vw',
          color: '#104F96',
        },
      },
    },
    '& .MuiGrid-root.MuiGrid-container': {
      maxWidth: 'inherit !important',
    },
    '& .MuiGrid-root.MuiGrid-grid-md-3, & .MuiGrid-root.MuiGrid-grid-xs-3': {
      maxWidth: '25% !important',
      '& .MuiOutlinedInput-input': {
        width: '100%',
        height: '1.2vw',
        fontSize: '0.9vw',
        padding: '0.7vw',
        transform: 'translate(0vw, -0.1vw)',
      },
    },
  },
  switchSection: {
    textAlign: 'center',
    '& .MuiTypography-h5': {
      fontSize: '1vw',
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
  marksDropDown: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiFormControl-root': {
      width: '100px !important',
      marginRight: '10px !important',
    },
  },
  addStyleHead: {
    '& p': {
      color: colors.primary,
    },
  },
  alignHorCenter: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    '& p': {
      marginBottom: 0,
      fontSize: '0.9vw',
    },
  },
  secButtonNew: {
    marginRight: '20px',
    marginTop: '10px',
  },
});

export { style, AntSwitch };
