import { colors, fonts } from '../../../theme';

const styles = (theme) => ({
  heading: {
    padding: 0,
    fontWeight: 600,
    color: colors.primary,
    paddingBottom: 20,
    fontSize: 18,
  },
  titleRow: {
    justifyContent: 'space-between',
    color: colors.actionIconsColor,
  },
  headerTitle: {
    fontWeight: fonts.fontWeight.bold,
    fontSize: '1.5vw',
    padding: '10px 10px 10px 1px',
    [theme.breakpoints.down('md')]: {
      fontSize: 16,
    },
  },

  sidebar: {
    borderRight: `1px solid ${colors.border}`,
  },

  contentCont: {
    minHeight: 300,
    border: `1px solid ${colors.border}`,
    margin: 30,
    marginTop: 0,
    borderRadius: 7,
    display: 'flex',
  },

  sectionTitleCont: {
    borderBottom: `1px solid ${colors.border}`,
    padding: 15,
    cursor: 'pointer',
  },

  sectionTitle: {
    fontWeight: 600,
    color: colors.black,
    fontSize: 12,
  },

  selectedSection: {
    boxShadow: `2px 2px 10px ${colors.border}`,
  },

  selectedSectionTitle: {
    color: colors.primary,
  },
});

export default styles;
