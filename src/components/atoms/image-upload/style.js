import { colors, fonts } from '../../../theme';
import listIcon from '../../../assets/images/listIcon.png';

const imageUploadStyle = () => ({
  input: {
    display: 'none',
    cursor: 'pointer',
  },
  profileImg: {
    width: '8vw',
    minHeight: '8vw',
    '@media (max-width: 899px)': {
      width: '100px',
      maxHeight: '100px',
    },
    '@media (max-width: 499px)': {
      width: '75px',
      maxHeight: '75px',
    },
    // paddingTop: 10,
    // marginTop: '15px',
    // minHeight: 140,
    maxHeight: '10vw',
    cursor: 'pointer',
    // alignItems: 'center',
    outline: 'hidden',
    textAlign: 'center',
    borderRadius: '100%',
  },
  modal: {
    backgroundColor: colors.backgroundGrey,
  },
  list: {
    listStyleImage: `url(${listIcon})`,
    paddingLeft: '4%',
    marginBottom: '3px',
    lineHeight: '2em',
    fontFamily: 'inherit !important',
    '& li': {
      paddingLeft: '1em',
    },
  },
  modalContainer: {
    textAlign: 'center',
    alignItems: 'center',
    width: '600',
    // paddingTop: 20,
  },
  instructionTitle: {
    fontWeight: fonts.fontWeight.bold,
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
    textAlign: 'left',
    color: colors.modalInstructionColor,
    marginLeft: 20,
  },
  '.ReactCrop__image': {
    display: 'block',
    maxHeight: '15vw',
    margin: 'auto',
    width: '15vw',
  },

});

export default imageUploadStyle;
