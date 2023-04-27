import { colors, fonts } from '../../../theme';

const headerstyle = (theme) => ({
  icon: {
    height: 30,
    width: 40,
  },
  mainHeaderTitle: {
    fontWeight: fonts.fontWeight.bold,
    fontSize: 30,
    textAlign: 'left',
    padding: '10px 0',
    color: colors.white,
  },
  mainHeaderDesc: {
    textAlign: 'left',
    fontWeight: fonts.fontWeight.normal,
    fontSize: 20,
    color: colors.mainHeaderDescColor,
  },
  HeaderWrapper: {
    boxShadow: 'none',
    left: '0',
    top: '0',
    padding: '0 1vw',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonActive: {
    backgroundColor: colors.white,
    color: `${colors.primary}  !important`,
    borderRadius: '0.4vw !important',
    textDecoration: 'none !important',
  },
  wrapper: {
    // justifyContent: 'flex-end',
    width: '100%',
  },
  divWrapper: {
    width: '100% !important',
  },
  wrapperMenu: {
    justifyContent: 'flex-end !important',
    width: '100%',
  },
  adminIcon: {
    '&:hover': {
      '& svg': {
        '& path': {
          fill: colors.primary,
        },
      },
    },
  },

  messageIcon: {
    '& svg': {
      marginTop: '0.1vw',
    },
  },
  // contentWrap: {
  //   [theme.breakpoints.down('md')]: {
  //     flexWrap: 'wrap',
  //   },
  // },

  iconsHoverHeader: {
    color: 'white',
    borderRadius: '0.4vw !important',
    position: 'relative',
    marginRight: '0.5vw !important',
    marginLeft: '0vw !important',
    maxWidth: '13vw',
    padding: '0.7vw',
    [theme.breakpoints.down('md')]: {
      fontSize: 20,
      maxWidth: 'inherit !important',
    },
    '& svg': {
      width: '1.5vw',
      height: '1.5vw',
      marginRight: '0.3vw',
      [theme.breakpoints.down('md')]: {
        width: '18px !important',
        height: '18px !important',
      },
    },
    '& .keyDownArrow': {
      marginRight: '0vw',
    },
    '&:hover': {
      backgroundColor: colors.white,
      color: `${colors.primary}  !important`,
      borderRadius: '5px !important',
    },
    '& .MuiListItemText-primary': {
      fontSize: '1vw',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
      },
    },
    '& .MuiListItemText-secondary': {
      fontWeight: 'bold',
      textAlign: 'left',
      fontSize: '1vw',
      [theme.breakpoints.down('md')]: {
        fontSize: 10,
      },
    },
  },
  menuItemIcon: {
    paddingRight: '1vw',
    textDecoration: 'none !important',

  },
  menuIcon: {
    border: 'solid',
    borderRadius: '100%',
    textDecoration: 'none !important',

  },
  '& .MuiListItemText-primary': {
    fontWeight: 'bold',
  },

  menuLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  menuWrapper: {
    justifyContent: 'space-between',
    '@media (max-width: 990px)': {
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  },
});

export default headerstyle;
