import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
} from '@mui/material';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  DialogContent,
} from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import ButtonAtom from '../button';
import Loader from '../loader';
import style from './style';
import { Buttons } from '../../../constant';
import commonStyles from '../../../utils/commonClasses';
import useStyles from '../../../custom-hooks/useStyles';

function DialogAtom({
  isOpen, dialogHeading, content, dialogActions, primaryButton, secButton, footer,
  primaryHandle, secHandle, customClass, closeOnBlur, loading,
}) {
  const classes = style();
  const { t } = useTranslation();
  const [open, setOpen] = useState(isOpen);
  const commonClasses = useStyles(commonStyles)();

  useEffect(() => {
    if (isOpen) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isOpen]);

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={clsx(classes.dialog, customClass)}
      onClose={closeOnBlur}
    >
      <DialogTitle id="alert-dialog-title">
        {dialogHeading}
        <CloseIcon onClick={secHandle} className={classes.closeImg} />
      </DialogTitle>
      {dialogHeading && <div className={classes.borderBottom} />}
      <DialogContent>
        {content}
      </DialogContent>

      <DialogActions className={footer ? '' : classes.dialogButtons}>
        {dialogActions && secButton && (
          <ButtonAtom
            btntype={Buttons.SECONDARY}
            onClick={secHandle}
            className={commonClasses.secButton}
            name={secButton || t('OK')}
          />
        )}
        {dialogActions && primaryButton
          && (
          <ButtonAtom
            onClick={primaryHandle}
            btntype={Buttons.PRIMARY}
            className={commonClasses.activeButton}
            name={primaryButton || t('NO')}
          />
          )}
      </DialogActions>
      {footer}
      {loading ? (
        <Grid>
          <Loader message={t('LOADING')} />
        </Grid>
      )
        : null}
    </Dialog>
  );
}

DialogAtom.propTypes = {
  isOpen: PropTypes.bool,
  dialogHeading: PropTypes.string,
  dialogActions: PropTypes.bool,
};

DialogAtom.defaultProps = {
  isOpen: false,
  dialogHeading: '',
  dialogActions: true,
};

export default DialogAtom;
