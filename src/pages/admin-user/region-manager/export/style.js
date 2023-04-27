import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  regionExportDialogAtom: {
    '& .MuiDialog-paper': {
      minWidth: '60vw !important',
      maxWidth: '60vw !important',
      '& .MuiFormControl-root': {
        margin: '0 !important',
      },
    },
  },
  selectAll: {
    display: 'flex !important',
    justifyContent: 'flex-start',
    '& .MuiFormControlLabel-label': {
      color: 'rgba(0, 0, 0, 0.87) !important',
      width: '120px !important',
    },
  },
  checkbox: {
    display: 'flex !important',
    marginBottom: '12px',
    '& .MuiFormControlLabel-label': {
      color: 'rgba(0, 0, 0, 0.87) !important',
    },
    '& div>MuiBox-root:first-child': {
      width: '25%',
    },
  },
  checkboxContent: {
    '& .MuiFormControlLabel-root': {
      whiteSpace: 'nowrap',
    },
    '& css-1vgzwi7-MuiFormControl-root:last child': {
      margin: '0 !important',
    },
  },
  popupButton: {
    textAlign: 'right',
  },
}));

export default {
  useStyles,
};
