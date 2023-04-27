import { fonts, colors } from '../../../theme';

const style = (theme) => ({
  gridContainer: {
    padding: '2vw 2vw 2vw 3vw !important',
    minHeight: '65vh',
  },
  titleRow: {
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontWeight: fonts.fontWeight.bold,
    '@media (min-width: 1200px)': {
      fontSize: '1.5vw',
      padding: '1vw 0.5vw 1vw 0',
    },
  },
  headerDesc: {
    fontWeight: fonts.fontWeight.bold,
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
    color: colors.settingsDescription,
    padding: '1.4vw 1vw 1vw 0',
  },
  LateFeeAmount: {
    padding: '1vw 0vw 1vw 2vw !important',
    '& .MuiFormControl-root': {
      marginLeft: '-0.5vw !important',
      '@media (min-width: 1200px)': {
        height: '2.5vw',
      },
      '& .MuiTableCell-head': {
        padding: '1vw 0vw 1vw 2vw',
      },
    },
  },
  secButton: {
    color: '#1976d2 !important',
    border: '0.1px solid #1976d2',
    '@media (min-width: 1200px)': {
      height: '3vw',
      fontSize: '1vw',
      padding: '0.8vw',
      width: '13vw',
    },
    background: 'white',
    boxSizing: 'border-box',
    fontFamily: 'Roboto, sans-serif',
    marginRight: '1vw',
    borderRadius: '0.4vw !important',
    textTransform: 'none',
    '& .MuiSvgIcon-root': {
      '@media (min-width: 1200px)': {
        width: '0.8vw',
        height: '0.8vw',
      },
    },
  },
  actionBtn: {
    '@media (min-width: 1200px)': {
      minWidth: '13.021vw !important',
      height: '3vw !important',
      fontSize: '0.9vw',
    },
    marginRight: '1.5vw !important',
  },
  addAcademicBtn: {
    '@media (min-width: 1200px)': {
      minWidth: '13.021vw !important',
      height: '3vw !important',
      fontSize: '0.9vw',
    },
    paddingRight: '1.7vw',
    textAlign: 'right',
  },
  tableCells: {
    '@media (min-width: 1200px)': {
      width: '20vw',
    },
  },
  tableCellCourse: {
    '@media (min-width: 1200px)': {
      width: '11vw',
    },
  },
  title: {
    '@media (min-width: 1200px)': {
      fontSize: '1.2vw',
      padding: '1vw 1vw 1vw 0',
    },
  },
  dropdown: {
    '@media (min-width: 1200px)': {
      minWidth: '25vw !important',
      marginTop: '0 !important',
      maxWidth: '20vw',
      fontSize: '1vw',
      marginLeft: '-1vw',
    },
  },
  registrationTable: {
    width: '99%',
    '& .MuiOutlinedInput-root': {
      '@media (min-width: 1200px)': {
        width: '13vw !important',
      },
    },
  },
  select: {
    padding: '1vw 1vw 1vw 0vw',
    transform: 'translate(16px, 0vw) scale(1)',
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
      height: '2vw',
      transform: 'translate(1vw, 0vw) scale(1)',
    },
    '& .MuiSelect-select': {
      paddingRight: '1vw !important',
      minWidth: '75px !important',
      '@media (min-width: 1200px)': {
        minWidth: '2vw !important',
        minHeight: '1vw !important',
      },
    },
    '& svg': {
      '@media (min-width: 1200px)': {
        width: '1.5vw',
        height: '1.5vw',
      },
    },
  },
  dropdownWrapper: {
    justifyContent: 'space-between',
  },
  tableHead: {
    '& .MuiTableCell-head': {
      fontWeight: `${fonts.fontWeight.bold}`,
      color: '#015EEA',
    },
    '& .MuiTableCell-root': {
      borderBottom: '0.2vw solid #015EEA',
      '@media (min-width: 1200px)': {
        fontSize: '1vw',
      },
      padding: '1vw',
    },
  },
  tableBody: {
    '& .MuiTableCell-root': {
      borderBottom: 'none',
      '@media (min-width: 1200px)': {
        fontSize: '1vw',
      },
      padding: '1vw',
    },
    '& .MuiTableCell-body': {
      '& .MuiInputLabel-root': {
        color: '#104F96',
        transform: 'translate(16px, 0vw) scale(1)',
        '@media (min-width: 1200px)': {
          fontSize: '0.7vw !important',
          transform: 'translate(1vw, 0vw) scale(1)',
        },
        fontFamily: fonts.fontType.roboto,
        marginLeft: 0,
        [theme.breakpoints.down('lg')]: {
          fontSize: '12px !important',
        },
        [theme.breakpoints.down('md')]: {
          fontSize: '10px !important',
        },
      },
      '& .MuiFormControl-root .MuiFormControl-root': {
        '& .MuiTypography-root': {
          fontSize: '1vw',
        },
        '& .MuiInputLabel-root': {
          transform: 'translate(16px, -6px) scale(1)',
          '@media (min-width: 1200px)': {
            transform: 'translate(1vw, 0vw) scale(1)',
          },
        },
      },
      '& .MuiOutlinedInput-root': {
        '@media (min-width: 1200px)': {
          height: '3vw',
        },
        borderRadius: '0.4vw',
        paddingLeft: '0.2vw',
      },
    },
    '& #datePickerDiv': {
      '@media (min-width: 1200px)': {
        height: '2vw',
      },
      transform: 'translate(0vw, 0.2vw) scale(1)',
      paddingLeft: '0.9vw',
    },
  },
  input: {
    textAlign: 'right',
    '& .MuiInputBase-input': {
      textAlign: 'right !important',
    },
  },
  errorText: {
    padding: '0vw 17vw !important',
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw !important',
    },
    color: 'red',
  },
  academicErrorText: {
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw !important',
    },
    color: 'red',
  },
});

export default style;
