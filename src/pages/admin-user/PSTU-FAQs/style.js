import { colors } from '../../../theme';

const pstuStyle = (() => ({
  pstuAccordion: {
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
    color: colors.black,
    '& .MuiTypography-root': {
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
      },
      color: colors.black,
    },
  },
}));
export default pstuStyle;
