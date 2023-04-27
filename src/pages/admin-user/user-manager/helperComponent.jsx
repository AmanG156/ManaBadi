import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Switch from '@mui/material/Switch';

export const DrawerWidth = 240;
export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${DrawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${DrawerWidth}px)`,
    marginLeft: `${DrawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const getUserObj = (user) => ({
  profileImage: user?.profilePhoto,
  userId: user?.id,
  userName: `${user?.first_name} ${user?.last_name}`,
  gender: user?.gender,
  email: user?.manabadi_email,
  personal_email: user?.personal_email,
  userStatus: user?.is_active,
  address: {
    add: user?.address,
    lat: user?.latitude,
    lng: user?.longitude,
  },
  role: user?.roles?.[0]?.name,
  changeLogs: '',
});

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
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#16D81E',
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

export const getList = (listClass, t) => (
  <ul className={listClass}>
    <li>
      {t('PROFILE_GUIDELINES.FIRST')}
    </li>
    <li>
      {t('PROFILE_GUIDELINES.SECOND')}
    </li>
    <li>
      {t('PROFILE_GUIDELINES.THIRD')}
    </li>
    <li>
      {t('PROFILE_GUIDELINES.FOURTH')}
    </li>
    <li>
      {t('PROFILE_GUIDELINES.FIFTH')}
    </li>
    <li>
      {t('PROFILE_GUIDELINES.SIXTH')}
    </li>
    <li>
      {t('PROFILE_GUIDELINES.SEVENTH')}
    </li>
    <li>
      {t('PROFILE_GUIDELINES.EIGHTH')}
    </li>
    <li>
      {t('PROFILE_GUIDELINES.NINTH')}
    </li>
    <li>
      {t('PROFILE_GUIDELINES.TENTH')}
    </li>
  </ul>
);
