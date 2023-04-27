import { colors, fonts } from '../../../theme';

const previewStyle = () => ({
  editButton: {
    color: colors.primary,
    '@media (min-width: 1200px)': {
      minWidth: 'max-content !important',
      marginLeft: '15vw !important',
      fontSize: '1vw',
      // textTransform: 'capitalize',
      '& svg': {
        width: '0.9vw',
        height: '1vw',
        marginRight: '0.5vw',
      },
    },
  },
  mainContainer: {
    padding: '0vw 1vw 1vw 1.3vw',
  },
  parentName: {
    '@media (min-width: 1200px)': {
      fontSize: '1.2vw',
    },
  },
  collon: {
    paddingRight: 2,
    display: 'flex',
    overflowWrap: 'break-word',
    hyphens: 'auto',
    wordBreak: 'break-word',
    flexWrap: 'wrap',
  },
  studentEditButton: {
    minWidth: '50px !important',
    marginLeft: '24.5vw !important',
  },
  borderBottom: {
    background: colors.mainHeaderDescColor,
    height: 6,
    display: 'block',
    width: '99%',
  },
  studentCard: {
    border: `0.1vw solid ${colors.actionIconsColor}`,
    borderRadius: '0.8vw',
    '@media (min-width: 1200px)': {
      minHeight: '43vw',
      maxHeight: '43vw',
      fontSize: '0.7vw',
      padding: '0.8vw',
      marginLeft: '1.5vw',
      marginTop: '1vw',
      width: '90%',
    },
    background: 'none !important',
  },
  arrowForwardIcon: {
    marginLeft: '1.303vw !important',
  },
  image: {
    outline: 'hidden',
    textAlign: 'center',
    paddingBottom: 10,
  },
  profileImg: {
    '@media (min-width: 1200px)': {
      marginTop: '1.303vw',
      // minHeight: 140,
      maxHeight: '6.515vw',
      minHeight: '6.515vw',
    },
    cursor: 'pointer',
    borderRadius: '100%',
  },
  headerTitle: {
    color: colors.heading,
    fontWeight: fonts.fontWeight.medium,
    '@media (min-width: 1200px)': {
      fontSize: '1.5vw',
      borderRadius: '0.4vw',
      paddingBottom: '0.5vw',
    },
  },
  prevHeading: {
    color: colors.heading,
    fontWeight: fonts.fontWeight.medium,
    width: '100%',
    '@media (min-width: 1200px)': {
      fontSize: '1.2vw',
      marginTop: '1vw',
      borderRadius: '0.4vw',
      paddingBottom: '1vw',
    },
  },
  button: {
    justifyContent: 'flex-end',
    margin: '0vw 0.261vw 0.195vw 0.065vw',
  },
  carousel: {
    marginTop: '1vw',
    marginLeft: 0,
    '& .MuiSvgIcon-root': {
      fill: colors.borderColor,
    },
    '& .react-multiple-carousel__arrow--left': {
      left: 'calc(-1% + 0.065vw)',
      marginLeft: '-0.6vw',
    },
    '& .react-multiple-carousel__arrow--right': {
      right: 'calc(-1% + 0vw)',
      marginRight: '-0.5vw',
    },
    '& .react-multiple-carousel__arrow--left::before': {
      color: `${colors.actionIconsColor} !important`,
    },
    '& .react-multiple-carousel__arrow--right::before': {
      color: `${colors.actionIconsColor} !important`,
    },
    '& .react-multiple-carousel__arrow': {
      background: 'transparent',
    },
    '& .react-multi-carousel-item': {
      '@media (min-width: 1200px)': {
        width: '29.772vw !important',
        minWidth: '29.772vw !important',
        maxWidth: '29.772vw !important',
        position: 'relative',
      },
    },
  },
  dataPadding: {
    padding: '0.4vw',
    display: 'flex',
    flexDirection: 'row',
  },
  additionalInfo: {
    display: 'flex',
  },
  label: {
    display: 'flex',
    fontWeight: fonts.fontWeight.medium,
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
      marginLeft: '-0.5vw',
    },
    color: colors.label,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    hyphens: 'manual',
  },
  studentCardLabel: {
    fontWeight: fonts.fontWeight.medium,
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
      paddingLeft: '1.5vw',
    },
    color: colors.heading,
  },
  value: {
    display: 'flex',
    fontWeight: fonts.fontWeight.low,
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
    color: colors.label,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    hyphens: 'manual',
  },
  innerContainer: {
    fontFamily: fonts.fontType.roboto,
    marginBottom: '2vw',
    '@media (max-width: 1023px), @media (min-width: 375px)': {
      // width: '97%',
      // margin: '0 0 0 10px',
      '& .MuiFormControl-root': {
        // margin: '10px 0 0 0',
      },
    },
  },
  previewValue: {
    marginLeft: '0.5vw !important',
  },
  parentContainer: {
    fontFamily: fonts.fontType.roboto,
    marginBottom: '1vw',
    '@media (max-width: 1023px), @media (min-width: 375px)': {
      // width: '97%',
      // margin: '0 0 0 10px',
      '& .MuiFormControl-root': {
        // margin: '10px 0 0 0',
      },
    },
  },
});
export const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    paritialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 40,
  },
};
export default previewStyle;
