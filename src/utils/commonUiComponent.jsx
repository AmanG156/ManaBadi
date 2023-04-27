import React from 'react';
import { createTheme, styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortUp,
  faSortDown,
} from '@fortawesome/fontawesome-free-solid';
import Switch from '@mui/material/Switch';
import { colors } from '../theme';

export const toolTipTheme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        popper: {
          marginTop: '-4vw !important',
        },
        tooltip: {
          '@media (min-width: 1200px)': {
            fontSize: '0.7vw !important',
          },
          maxWidth: '100% !important',
        },
      },
    },
  },
});

export function CustomUnsortedIcon() {
  return <FontAwesomeIcon icon={faSort} />;
}

export function CustomAscendingIcon() {
  return <FontAwesomeIcon icon={faSortUp} color="#C12900" />;
}

export function CustomDescendingIcon() {
  return <FontAwesomeIcon icon={faSortDown} color="#C12900" />;
}

export const AntSwitch = styled(Switch)(({ theme }) => ({
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
    backgroundColor: colors.white,
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
    position: 'absolute',
  },
}));
