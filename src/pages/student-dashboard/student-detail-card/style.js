import { fonts, colors } from '../../../theme';

const cardStyle = ({
  label: {
    fontWeight: 400,
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
    fontType: fonts.fontType.roboto,
    color: colors.black,
  },
  value: {
    fontWeight: 700,
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
    color: colors.black,
    fontType: fonts.fontType.roboto,
  },
  container: {
    marginTop: 4,
  },
  actionBtn: {
    minWidth: '10.5vw !important',
    marginLeft: '0vw !important',
    marginRight: '0.6vw !important',
  },
  googleClassroomBtn: {
    minWidth: '10.5vw !important',
    marginLeft: '0.3vw !important',
  },
  gmailBtn: {
    minWidth: '6vw !important',
  },
  profileImg: {
    borderRadius: '50%',
    width: '10vw !important',
    height: '10vw !important',

  },
  imgContainer: {
    marginBottom: '1vw',
  },
  studentDetails: {
    textAlign: 'center',
    height: 140,
  },
  btn: {
    marginTop: '1vw',
    marginBottom: '1vw',
    '@media (min-width: 1200px)': {
      fontSize: '1.15vw',
      justifyContent: 'center',
    },
    color: colors.black,
  },
  manabadiInfo: {
    marginTop: '1vw',
    marginBottom: '1vw',
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
    color: colors.black,
  },
  studentName: {
    fontWeight: fonts.fontWeight.bold,
    color: colors.actionIconsColor,
    textAlign: 'left',
    '@media (min-width: 1200px)': {
      fontSize: '1.37vw',
    },
  },
  studentKeys: {
    color: colors.primary,
    textAlign: 'left',
    height: '1vw',
    '& .MuiFormControlLabel-label': {
      '@media (min-width: 1200px)': {
        fontSize: '1.37vw',
      },
    },
  },
  key: {
    color: colors.primary,
    textAlign: 'left',
    fontSize: '0.9vw',
    float: 'left',
  },
  locationInfoDetail: {
    marginLeft: '2vw !important',
  },
  locationInfoKeys: {
    color: colors.black,
    display: 'inline-flex',
    paddingTop: '0.3vw',
    marginBottom: '0.3vw',
    '& svg': {
      '@media (min-width: 1200px)': {
        marginRight: '0.2vw',
        width: '1.3vw !important',
        height: '1.3vw !important',
      },
    },
  },
  locationDialogAtom: {
    '& .MuiDialog-paper': {
      '@media (min-width: 1200px)': {
        maxWidth: '55vw !important',
        minWidth: '44vw !important',
        overflowX: 'hidden !important',
      },
    },
    '& .MuiDialogContent-root': {
      fontFamily: `${fonts.fontType.roboto} !important`,
      '@media (max-width: 600px)': {
        paddingLeft: '0',
      },
      '@media (min-width: 1200px)': {
        lineHeight: '1.2vw',
      },
    },
    '& .MuiGrid-root': {
      marginLeft: 0,
      width: 'auto',
      alignItems: 'center',
      '@media (max-width: 600px)': {
        paddingLeft: '3px',
      },
    },
  },
  locationInfo: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  footerBottom: {
    background: colors.grey,
    height: 1,
    marginTop: '1vw',
    width: '100%',
  },
  locationDetails: {
    maxWidth: 'inherit !important',
    float: 'left',
  },
  locationId: {
    width: '19vw !important',
  },
  gmailInfo: {
    textAlign: 'center',
  },
  googleClassroomInfo: {
    textAlign: 'center',
  },
});
export default cardStyle;
