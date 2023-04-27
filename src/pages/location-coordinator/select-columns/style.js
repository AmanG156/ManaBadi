import { colors, fonts } from '../../../theme';

const addTeacherStyle = () => ({
  gridContainer: {
    minHeight: '40vh',
    '& .MuiFormControlLabel-label': {
      fontSize: '0.9vw !important',
      color: `${colors.black}!important`,
      marginLeft: '0.1vw !important',
      fontFamily: fonts.fontType.roboto,
      marginTop: '0.3vw',
    },
  },
  dialogButtons: {
    position: 'absolute',
    bottom: 20,
    right: 7,
    '& .MuiButton-root': {
      minWidth: '10vw !important',
      '@media (min-width: 1200px)': {
        height: '2.7vw !important',
        fontSize: '0.8vw',
      },
    },
  },
});

export default addTeacherStyle;
