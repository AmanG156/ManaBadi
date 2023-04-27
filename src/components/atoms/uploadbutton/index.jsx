import React from 'react';
import { Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import FormControl from '@mui/material/FormControl';
import { useTranslation } from 'react-i18next';

import style from './style';

function UploadButton({
  fileName, buttonLabel, onChange, error, errorText, accept,
}) {
  const classes = style();
  const { t } = useTranslation();

  return (
    <FormControl className={classes.formControl}>
      <div className={classes.container}>
        <TextField
          id="name"
          value={fileName}
          variant="outlined"
          error={error}
          helperText={t(errorText)}
          disabled
          className={classes.fileLabel}
        />
        <Button
          variant="contained"
          component="label"
        >
          {t(buttonLabel)}
          <input
            type="file"
            hidden
            onChange={onChange}
            accept={accept}
          />
        </Button>
      </div>
    </FormControl>
  );
}

UploadButton.propTypes = {
  fileName: PropTypes.string,
  buttonLabel: PropTypes.string,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  onChange: PropTypes.func,
  accept: PropTypes.string,
};

UploadButton.defaultProps = {
  fileName: '',
  buttonLabel: 'BROWSE',
  error: false,
  errorText: '',
  onChange: '',
  accept: '',
};

export default UploadButton;
