import { colors, fonts } from '../../../theme';

const headerstyle = () => ({
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

  iconsHoverHeader: {
    color: 'white',
    borderRadius: '0.4vw !important',
    position: 'relative',
    marginRight: '0.5vw !important',
    marginLeft: '0vw !important',
    maxWidth: '13vw',
    padding: '0.5vw',
    '& svg': {
      width: '1.5vw',
      height: '1.5vw',
      marginRight: '0.3vw',
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
    },
    '& .MuiListItemText-secondary': {
      fontWeight: 'bold',
      textAlign: 'left',
      fontSize: '1vw',
    },
  },
  menuItemIcon: {
    paddingRight: '0vw',
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
  menuItemLink: {
    '& .MuiModal-root-MuiPopover-root-MuiMenu-root': {
      marginTop: '8px',
      minWidth: '110px',
      fontSize: '0.5em',
    },
    '& .MuiPaper-root': {
      marginTop: '8px',
      minWidth: '110px',
      fontSize: '0.5em',
    },
  },

  userItemIcon: {
    color: 'white !important',
    borderRadius: '0.4vw !important',
    position: 'relative',
    marginRight: '0.5vw !important',
    marginLeft: '0vw !important',
    maxWidth: '13vw',
    padding: '0.5vw',
    '& svg': {
      color: 'unset !important',
      width: '1.5vw',
      height: '1.5vw !important',
      marginRight: '0.3vw',
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
    },
    '& .MuiListItemText-secondary': {
      fontWeight: 'bold',
      textAlign: 'left',
      fontSize: '1vw',
    },
  },
  homeIcon: {
    color: 'white',
    borderRadius: '0.4vw !important',
    position: 'relative',
    marginRight: '0.5vw !important',
    marginLeft: '0vw !important',
    maxWidth: '13vw',
    padding: '0.5vw',
    '& svg': {
      width: '1.9vw',
      height: '1.9vw',
      marginRight: '0.3vw',
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
    },
    '& .MuiListItemText-secondary': {
      fontWeight: 'bold',
      textAlign: 'left',
      fontSize: '1vw',
    },
  },
});

export default headerstyle;
