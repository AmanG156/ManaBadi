import { colors, fonts } from '../../../theme';

const listStyle = (theme) => ({
  dropdowns: {
    '@media (min-width: 1200px)': {
      maxHeight: '4vw',
    },
    // alignItems: 'flex-end',
  },
  noData: {
    width: '100%',
    textAlign: 'center',
    marginTop: '13vw',
  },
  mapPinImg: {
    '@media (min-width: 1200px)': {
      width: '1vw',
      height: '1vw',
      transform: 'translate(0.9vw, 0.1vw)',
    },
    marginRight: '0.2vw',
  },
  button: {
    '& .MuiButtonBase-root.MuiButton-root': {
      '@media (min-width: 1200px)': {
        minWidth: '10vw !important',
      },
    },
  },
  starIcon: {
    padding: '0  0.2vw 0 0.1vw',
    '& .MuiSvgIcon-root': {
      color: colors.primary,
      verticalAlign: 'text-top',
    },
  },
  '& .makeStyles-addressAutoComplete-1513': {
    border: 'none',
  },
  addressAutoCompleteClass: {
    height: '2vw',
    fontWeight: 400,
    // borderBottom: `0.1vw solid  ${colors.primary}`,
    border: 'none',
    background: 'white',
    minHeight: '2.347vw',
    borderRadius: '0.4vw',
    paddingLeft: '0.7vw',
    width: '94.8%',
    fontSize: 'calc(8px + 6 * ((100vw - 320px) / 680))',
    '&:focus, &:focus-visible': {
      // border: `0.2vw solid ${colors.primary}`,
      outline: 'none',
    },
    '&::placeholder': {
      fontFamily: `${fonts.fontType.roboto} !important`,
      fontSize: 'calc(8px + 6 * ((100vw - 320px) / 680))',
      fontWeight: 400,
      color: `${colors.placeHolderColor}!important`,
      letterSpacing: 1,
    },
  },
  year: {
    textAlign: 'start',
    '@media (min-width: 1200px)': {
      minWidth: '8vw',
    },
    '& .MuiFormControl-root': {
      // width: '90%',
      '& .MuiInputLabel-root': {
        fontFamily: fonts.fontType.roboto,
        color: `${colors.primary} !important`,
        '@media (min-width: 1200px)': {
          fontSize: '1vw',
        },
        letterSpacing: 1,
      },
      '& .MuiInput-root:before': {
        borderBottom: `0.1vw solid ${colors.actionIconsColor}`,
      },
      '& .MuiSelect-select.MuiSelect-select': {
        fontFamily: fonts.fontType.roboto,
        color: `${colors.black} !important`,
        '@media (min-width: 1200px)': {
          fontSize: '1vw',
          padding: '0.7vw !important',
          width: '6vw !important',
        },
        backgroundColor: 'inherit',
        [theme.breakpoints.down('md')]: {
          fontSize: 12,
        },
      },
      '& .MuiOutlinedInput-root': {
        background: 'white',
        '@media (min-width: 1200px)': {
          height: '2.7vw !important',
          lineHeight: '1vw',
        },
        borderRadius: '0.4vw',
        outline: 'none',
        '& .MuiOutlinedInput-notchedOutline': {
          border: `0.1vw solid ${colors.primary}`,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: `0.2vw solid ${colors.primary}`,
        },
        '&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: `0.2vw solid ${colors.errorText}`,
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          border: `0.1vw solid ${colors.errorText}`,
        },
      },
      '& .MuiSvgIcon-root': {
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw',
          width: '1vw',
          height: '1vw',
        },
      },
      '& input': {
        padding: '0.7vw 1vw 0.7vw 0.7vw',
        boxSizing: 'border-box',
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw',
        },
        fontFamily: fonts.fontType.roboto,
        color: '#696969 !important',
        '&::placeholder': {
          textTransform: 'uppercase',
          color: `${colors.placeHolderColor} !important`,
          opacity: 1,
          letterSpacing: 2,
          '@media (min-width: 1200px)': {
            padding: '0.7vw 1vw 0.7vw 0.7vw',
          },
          fontFamily: fonts.fontType.roboto,
          fontWeight: 400,
        },
      },
    },

  },
  locationDropdown: {
    textAlign: 'start',
    width: '100%',
    '@media (min-width: 1200px)': {
      minWidth: '40vw',
    },
    '& span': {
      display: 'flex',
      alignItems: 'center',
    },
    '& .MuiInputBase-root.MuiInput-root': {
      width: '90%',
      '@media (min-width: 1200px)': {
        minWidth: '35vw !important',
        maxWidth: '35vw !important',
      },
    },
    '& .MuiFormControl-root': {
      // width: '90%',
      '& .MuiInputLabel-root': {
        fontFamily: fonts.fontType.roboto,
        color: `${colors.primary} !important`,
        '@media (min-width: 1200px)': {
          fontSize: '1vw',
        },
        letterSpacing: 1,
      },
      '& .MuiInput-root:before': {
        borderBottom: `0.1vw solid ${colors.actionIconsColor}`,
      },
      '& .MuiSelect-select.MuiSelect-select': {
        fontFamily: fonts.fontType.roboto,
        color: `${colors.black} !important`,
        '@media (min-width: 1200px)': {
          fontSize: '1vw',
          padding: '0.7vw !important',
        },
        // width: '6vw !important',
        backgroundColor: 'inherit',
        [theme.breakpoints.down('md')]: {
          fontSize: 12,
        },
      },
      '& .MuiOutlinedInput-root': {
        background: 'white',
        '@media (min-width: 1200px)': {
          height: '2.7vw !important',
          lineHeight: '1vw',
        },
        borderRadius: '0.4vw',
        outline: 'none',
        '& .MuiOutlinedInput-notchedOutline': {
          border: `0.1vw solid ${colors.primary}`,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: `0.2vw solid ${colors.primary}`,
        },
        '&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: `0.2vw solid ${colors.errorText}`,
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          border: `0.1vw solid ${colors.errorText}`,
        },
      },
      '& .MuiSvgIcon-root': {
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw',
          width: '1vw',
          height: '1vw',
        },
      },
      '& input': {
        padding: '0.7vw 1vw 0.7vw 0.7vw',
        boxSizing: 'border-box',
        '@media (min-width: 1200px)': {
          fontSize: '0.9vw',
        },
        fontFamily: fonts.fontType.roboto,
        color: '#696969 !important',
        '&::placeholder': {
          textTransform: 'uppercase',
          color: `${colors.placeHolderColor} !important`,
          opacity: 1,
          letterSpacing: 2,
          padding: '0.7vw 1vw 0.7vw 0.7vw',
          fontFamily: fonts.fontType.roboto,
          fontWeight: 400,
        },
      },
    },

  },
  location: {
    '@media (min-width: 1200px)': {
      minWidth: '40vw',
    },
    '& .MuiInputBase-root.MuiInput-root': {
      '@media (min-width: 1200px)': {
        minWidth: '35vw !important',
        maxWidth: '35vw !important',
      },
    },
    '& .MuiInputLabel-root': {
      fontFamily: fonts.fontType.roboto,
      color: `${colors.primary} !important`,
      '@media (min-width: 1200px)': {
        fontSize: '1.2vw',
      },
      letterSpacing: 1,
    },
    '& .MuiInput-root:before': {
      borderBottom: `0.1vw solid ${colors.actionIconsColor}`,
    },
    '& .MuiSelect-select.MuiSelect-select': {
      textAlign: 'left',
      padding: '0.3vw 1vw 1vw 1vw',
      fontFamily: fonts.fontType.roboto,
      // color: `${colors.black} !important`,
      fontSize: '1vw',
      transform: 'translate(8px, 0px)',
      backgroundColor: 'inherit',
      [theme.breakpoints.down('md')]: {
        fontSize: 12,
      },
    },
    '& .MuiOutlinedInput-root': {
      background: 'white',
      '@media (min-width: 1200px)': {
        height: '2.7vw !important',
        lineHeight: '1vw',
      },
      borderRadius: '0.4vw',
      outline: 'none',
      '& .MuiOutlinedInput-notchedOutline': {
        border: `0.1vw solid ${colors.primary}`,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: `0.2vw solid ${colors.primary}`,
      },
      '&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: `0.2vw solid ${colors.errorText}`,
      },
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        border: `0.1vw solid ${colors.errorText}`,
      },
    },
    '& .MuiSvgIcon-root': {
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
        width: '1vw',
        height: '1vw',
      },
      right: '-0.5vw',
    },
    '& input': {
      padding: '0.7vw 1vw 0.7vw 0.7vw',
      boxSizing: 'border-box',
      fontSize: '0.9vw',
      // minWidth: 900,
      fontFamily: fonts.fontType.roboto,
      color: '#696969 !important',
      '&::placeholder': {
        textTransform: 'uppercase',
        color: `${colors.placeHolderColor} !important`,
        opacity: 1,
        letterSpacing: 2,
        padding: '0.7vw 1vw 0.7vw 0.7vw',
        fontFamily: fonts.fontType.roboto,
        fontWeight: 400,
      },
    },

  },
  addIcon: {
    textTransform: 'none !important',
    color: '#f3f8fe !important',
    boxShadow: '0 4px 4px -2px hsl(0deg 0% 65% / 25%)',
    boxSizing: 'border-box',
    '@media (min-width: 1200px)': {
      height: '2.7vw',
      marginLeft: '1.3vw',
      minWidth: '2.7vw',
    },
    fontFamily: 'inherit',
    padding: '0.8vw',
    borderRadius: '0.5vw !important',
    background: colors.newBGColor,
    fontSize: '0.9vw',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      height: 30,
    },
  },
  primaryTeacher: {
    color: colors.primary,
    fontWeight: fonts.fontWeight.low,
  },
  nonPrimaryTeacher: {
    color: colors.black,
    display: 'block',
    fontWeight: fonts.fontWeight.low,
    paddingLeft: '1.3vw',
  },
  gridContainer: {
    padding: '2vw 2vw 2vw 3vw !important',
    minHeight: '65vh',
    '@media (max-width: 600px)': {
      padding: '15px',
    },
  },
  '.MuiSvgIcon-root': {
    '@media (min-width: 1200px)': {
      width: '1.5vw',
      height: '1.5vw',
    },
  },
  alignGrid: {
    paddingBottom: 25,
    maxWidth: '20%',
    '&.MuiGrid-root.MuiGrid-item': {
      paddingTop: 0,
      paddingLeft: 0,
    },
    '& .MuiFormControl-root': {
      margin: '10px !important',
      marginLeft: '0px !important',
      width: '99%',
      marginRight: '0px !important',

      '& .MuiFormControl-root': {
        margin: '0 !important',
        width: '100%',
      },
    },
  },
  courseName: {
    fontWeight: fonts.fontWeight.bold,
    color: colors.black,
    textAlign: 'center',
    '@media (min-width: 1200px)': {
      fontSize: '1vw',
    },
  },
  studentDetails: {
    textAlign: 'left',
    paddingTop: '0.2vw',
    '& .MuiDataGrid-row': {
      // minHeight: '5vw !important',
      alignItems: 'center',
    },
    '& svg': {
      '@media (min-width: 1200px)': {
        width: '1vw !important',
        height: '1vw !important',
      },
      [theme.breakpoints.down('md')]: {
        width: '20px !important',
        height: '20px !important',
      },
    },
    '& .MuiDataGrid-cell': {
      border: 'none',
    },
    '& .MuiDataGrid-root': {
      '@media (min-width: 1200px)': {
        minHeight: '5vw !important',
      },
      border: 'none',
    },
    '& .MuiDataGrid-footerContainer': {
      border: 'none',
    },
    '& .fa-sort-down': {
      marginBottom: '0.5vw',
    },
    '& .fa-sort-up': {
      marginTop: '0.5vw',
    },
    '& .MuiDataGrid-columnHeader[data-role="courseName"]': {
      '@media (min-width: 1200px)': {
        width: '5vw',
      },
    },
  },
  studentKeys: {
    color: colors.primary,
    textAlign: 'left',
    paddingBottom: '0.5vw',
    '@media (min-width: 1200px)': {
      height: '2vw',
    },
    '& .MuiFormControlLabel-label': {
      '@media (min-width: 1200px)': {
        fontSize: '1.37vw',
      },
    },
  },
  key: {
    color: colors.primary,
    textAlign: 'left',
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
    float: 'left',
    width: '7vw',
  },
  value: {
    color: colors.cardValueSecondaryColor,
    textAlign: 'left',
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
    float: 'right',
    width: '10vw',
    height: '1vw',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  exportButton: {
    float: 'right',
    textAlign: 'center',
    textTransform: 'none',
    color: '#f3f8fe !important',
    boxShadow: '0 4px 4px -2px hsl(0deg 0% 65% / 25%)',
    boxSizing: 'border-box',
    marginLeft: '4vw',
    minWidth: '10.5vw',
    fontFamily: 'inherit',
    padding: '0.8vw',
    borderRadius: '0.5vw !important',
    background: colors.newBGColor,
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
      height: '2.7vw !important',
    },
    textDecoration: 'none',
    marginBottom: '3vw',
    [theme.breakpoints.down('md')]: {
      fontSize: 12,
      height: '24px !important',
      marginTop: 5,
      padding: '5px 10px',
      lineHeight: '15px',
    },
  },
  dataGrid: {
    '& .MuiDataGrid-row': {
      minHeight: '4vw !important',
      maxHeight: 'none !important',
    },
    '& .MuiDataGrid-root': {
      outline: 'none !important',
      border: 'none !important',
    },
    '& .MuiDataGrid-iconButtonContainer': {
      visibility: 'hidden',
      width: '0 !important',
      display: 'none',
    },
    '& .MuiDataGrid-columnHeaders': {
      borderBottom: '1px solid #025EE6 !important',
      borderTop: 'none',
      fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
      fontWeight: 'bold',
      '@media (min-width: 1200px)': {
        fontSize: '1vw',
        minHeight: '4vw !important',
        maxHeight: '4vw !important',
        lineHeight: '4vw !important',
      },
      color: '#025EE6',
    },
    '& .MuiDataGrid-iconSeparator': {
      visibility: 'hidden',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 'bold',
      '@media (min-width: 1200px)': {
        fontSize: '1vw',
      },
    },
    '& .MuiDataGrid-virtualScroller': {
      '@media (min-width: 1200px)': {
        height: '25vw !important',
        marginTop: '4vw !important',
        overflowY: 'auto !important',
      },
      '@media (max-width: 1021px)': {
        overflow: 'auto !important',
      },
    },
    '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeaderTitle:focus': {
      outline: 'none',
    },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within': {
      outline: 'none !important',
    },
    '& .MuiDataGrid-cell': {
      // margin: 'auto !important',
      '@media (min-width: 1200px)': {
        maxHeight: '20vw !important',
      },
      margin: 'auto !important',
    },
    '& .parentHeader, .parentNameCell': {
      width: '35vw !important',
      minWidth: '300px !important',
      maxWidth: '35vw !important',
      minHeight: '75px !important',
      maxHeight: 'fit-content !important',
      '@media (min-width: 1200px)': {
        width: '13vw !important',
        minWidth: '13vw !important',
        maxWidth: '13vw !important',
        fontSize: '0.9vw',
        minHeight: '4vw !important',
      },
      // maxHeight: 'auto !important',
      // marginTop: '1vw !important',
      // minWidth: '700px !important',
      // width: '700px !important',

    },
    '& .parentNameCell': {
      flexDirection: 'column',
      alignItems: 'flex-start',

    },
    '& .courseNameHeader, .courseNameCell': {
      '@media (min-width: 1200px)': {
        width: '17vw !important',
        minWidth: '17vw !important',
        maxWidth: '17vw !important',
        fontSize: '0.9vw',
        minHeight: '3vw !important',
        maxHeight: '3vw !important',
      },
    },
    '& .centerHeader': {
      '@media (min-width: 1200px)': {
        width: '20vw !important',
        minWidth: '15vw !important',
        maxWidth: '15vw !important',
        fontSize: '0.9vw',
        minHeight: '3vw !important',
        maxHeight: '3vw !important',
      },
    },
    '& .centerCell': {
      '@media (min-width: 1200px)': {
        width: '20vw !important',
        minWidth: '15vw !important',
        maxWidth: '15vw !important',
        fontSize: '0.9vw',
        minHeight: '3vw !important',
        maxHeight: '3vw !important',
      },
    },
    '& .classroomLink': {
      color: `${colors.primary} !important`,
      cursor: 'pointer',
      textDecoration: 'underline',
      width: '20vw !important',
      minWidth: '140px !important',
      maxWidth: '20vw !important',
      '@media (min-width: 1200px)': {
        fontSize: '0.9vw',
      },
      minHeight: '25px !important',
      maxHeight: '3vw !important',
      '& span': {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      },
    },
    '& .classHeader, .classCell': {
      '@media (min-width: 1200px)': {
        width: '9vw !important',
        minWidth: '9vw !important',
        maxWidth: '9vw !important',
        fontSize: '0.9vw',
        minHeight: '3vw !important',
        maxHeight: '3vw !important',
      },
    },
    '& .sectionHeader, .sectionCell': {
      '@media (min-width: 1200px)': {
        width: '8vw !important',
        minWidth: '8vw !important',
        maxWidth: '8vw !important',
        fontSize: '0.9vw',
        minHeight: '3vw !important',
        maxHeight: '3vw !important',
      },
    },
    '& .actionHeader, .actionCell': {
      '@media (min-width: 1200px)': {
        minWidth: '25vw !important',
        maxWidth: '25vw !important',
        fontSize: '0.9vw',
        minHeight: '3vw !important',
        maxHeight: '3vw !important',
      },
    },
    '& .actionCell': {
      paddingLeft: '5.5vw',
    },
  },
  courseGrid: {
    marginTop: '2vw',
  },

});

export default listStyle;
