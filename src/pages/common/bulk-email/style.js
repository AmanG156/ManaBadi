import { colors, fonts } from '../../../theme';

const style = () => ({
  gridContainer: {
    padding: '2vw 2vw 2vw 3vw !important',
    minHeight: '65vh',
    '& .MuiInputLabel-root': {
      textAlign: 'left',
      '@media (max-width: 1200px)': {
        transform: 'translate(8px, 16px)',
      },
      '@media (min-width: 1200px)': {
        transform: 'translate(0.7vw, 1vw)',
      },
      '&.MuiInputLabel-shrink': {
        '@media (max-width: 1199px)': {
          fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199)) !important',
          transform: 'translate(8px, -10px)',
          background: '#fff',
          padding: '0 3px',
        },
        '@media (min-width: 1200px)': {
          transform: 'translate(0.66vw, -0.5vw)',
          fontSize: '0.7vw !important',
        },
      },
    },
    '& .MuiOutlinedInput-root.Mui-disabled': {
      backgroundColor: colors.backgroundGrey,
    },
    '& .MuiAutocomplete-root': {
      '& .MuiInputLabel-root': {
        '@media (min-width: 1200px)': {
          transform: 'translate(0.7vw, 0.5vw)',
        },
        '&.MuiInputLabel-shrink': {
          transform: 'translate(0.7vw, -0.5vw)',
        },
      },
    },
    '& #emailFilter': {
      textAlign: 'left',
    },
  },
  title: {
    marginLeft: '0.2vw',
  },
  headerTitle: {
    '@media (max-width: 1200px)': {
      marginBottom: '12px',
    },
    '@media (min-width: 1200px)': {
      fontSize: '1.2vw',
    },
    fontWeight: 600,
    fontFamily: fonts.fontType.roboto,
  },
  locationYearDropdowns: {
    fontSize: '0.9vw',
    '& .MuiFormControl-root': {
      margin: '1vw 0 1.5vw 0',
    },
  },
  saveIcon: {
    // padding: '0.8vw 0',
    justifyContent: 'flex-start',
    '@media (max-width: 600px)': {
      padding: '8px 0',
    },
  },
  saveButton: {
    '@media (min-width: 1200px)': {
      height: '2.7vw',
      padding: '0.5vw',
    },
    '@media (max-width: 1199px)': {
      padding: '8px 10px',
    },
    minWidth: '3vw',
  },
  createNew: {
    marginLeft: '10px',
    paddingRight: '0.3vw',
    justifyContent: 'flex-end',
    '@media (max-width: 1199px)': {
      justifyContent: 'center',
      margin: '10px 0',
    },
    '& div': {
      '@media (max-width: 991px)': {
        justifyContent: 'space-between',
      },
    },
  },
  editorClass: {
    border: '1px solid #F1F1F1',
    height: '40vh',
    padding: '10px',
    fontWeight: 'Bold',
  },
  substitutionTagLabel: {
    width: '100%',
    '@media (min-width: 1200px)': {
      maxWidth: 500,
    },
    '@media (max-width: 1200px)': {
      padding: '15px',
    },
    textAlign: 'left',
    paddingLeft: '40px',
  },
  substitutionTagList: {
    '@media (min-width: 1200px)': {
      width: '70%',
      maxWidth: 360,
    },
    '@media (max-width: 1200px)': {
      width: '100%',
    },
    backgroundColor: '#fafafa',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
    '& ul': { padding: 0 },
  },
  substitutionTagListHeader: {
    fontWeight: '600', color: 'black', fontSize: '18px', backgroundColor: '#bedeed', borderBottom: '2px solid #bbb3b3',
  },
  emailEditor: {
    '& .toolbarClassName': {
      backgroundColor: colors.secondary,
    },
    '& .rdw-option-wrapper, .rdw-dropdown-wrapper': {
      border: `0.1vw solid ${colors.backgroundGrey}`,
      height: '1.5vw',
      minWidth: '1.5vw',
      padding: '0.5vw',
      fontSize: '0.9vw',
      '& .rdw-dropdown-selectedtext': {
        padding: '0 1.5vw 0 0.5vw',
      },
    },
  },
  cursorPointer: {
    cursor: 'pointer',
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
    '&[disabled]': {
      color: 'grey',
      cursor: 'default',
      '&:hover': {
        textDecoration: 'none',
      },
    },
  },
  actionButtons: {
    'margin-top': '30px',
  },
  dialogAtom: {
    '& .MuiDialog-paper': {
      // width: '95% !important',
      minWidth: '30vw',
    },
    '& .MuiDialogContent-root': {
      padding: '1vw !important',
    },
    '& .MuiDialogContent-root .MuiGrid-root': {
      maxWidth: '99% !important',
    },
  },
  emailTemplate: {
    '& #select-template': {
      textAlign: 'left',
    },
    '& .MuiFormControl-root': {
      '@media (min-width: 1200px)': {
        margin: '0.8vw',
      },
      '@media (min-width: 600px)': {
        margin: '0 0.8vw',
      },
      '@media (max-width: 600px)': {
        margin: '8px 0',
      },
    },
  },
  filterTemplate: {
    '& .MuiFormControl-root': {
      '@media (min-width: 600px)': {
        margin: '0 0.8vw',
      },
      '@media (max-width: 600px)': {
        margin: '8px 0',
      },
      '@media (min-width: 1200px)': {
        margin: '0.1vw 0.8vw',
      },
    },
  },
  errorText: {
    color: colors.errorText,
    fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw !important',
      marginLeft: '1vw',
      marginTop: '0vw',
      marginBottom: '0.5vw',
    },
  },
  mailSub: {
    '& > .MuiFormControl-root': {
      '@media (max-width: 1200px)': {
        margin: '25px 0.8vw 0.8vw 0',
      },
      '@media (max-width: 600px)': {
        margin: '8px 0.8vw 0.8vw 0',
      },
    },
  },
  mailSubright: {
    '& > .MuiFormControl-root': {
      '@media (max-width: 1200px)': {
        margin: '25px 0 0.8vw 0.8vw',
      },
      '@media (max-width: 600px)': {
        margin: '8px 0 0.8vw 0.8vw',
      },
    },
  },
  selectAllCheck: {
    '& .MuiFormControl-root': {
      margin: '0 0.5vw',
      '& .MuiFormControlLabel-root .MuiFormControlLabel-label': {
        '@media (min-width: 1200px)': {
          marginLeft: '0 !important',
          marginTop: '0.3vw',
        },
      },
    },
  },
  autoComplete: {
    '& .MuiFormControl-root': {
      '@media (min-width: 1200px)': {
        marginLeft: '0.4vw !important',
        '& .MuiOutlinedInput-root': {
          border: `0.1vw solid ${colors.primary}`,
          padding: '0 !important',
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
          maxHeight: '15vw',
          overflow: 'auto',
          border: 'none',
        },
        '& .MuiInputLabel-root.MuiInputLabel-shrink': {
          display: 'none',
        },
      },
    },
  },
});

export default style;
