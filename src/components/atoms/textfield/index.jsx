/* eslint-disable */
import React, { memo } from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import FormControl from '@mui/material/FormControl';
import { useTranslation } from 'react-i18next';
import style from './style';
import useStyles from '../../../custom-hooks/useStyles';

function TextFieldAtom({
  label, name, value, onChange, InputProps, multiline, rows, onBlur,
  customFormControlCss, type, required, variant, placeholder, error,
  errorText, disable, title, minWidth, id, onKeyDown,
}) {
  const classes = useStyles(style)();
  const { t } = useTranslation();
  return (
    // eslint-disable-next-line max-len
    <FormControl sx={{ m: 1, minWidth }} className={classes.formControl} style={customFormControlCss}>
      <TextField
        id={name}
        value={value}
        label={label}
        onChange={onChange}
        InputProps={InputProps}
        type={type}
        required={required}
        variant={variant}
        placeholder={placeholder}
        error={!!error}
        helperText={t(errorText)}
        disabled={disable}
        {...(onKeyDown && { onKeyDown })}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        inputProps={{
          'data-testid': id,
        }}
        multiline={multiline}
        rows={rows}
        title={t(title)}
        onBlur={onBlur}
      />
    </FormControl>
  );
}
TextFieldAtom.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  InputProps: PropTypes.objectOf(Object),
  customFormControlCss: PropTypes.objectOf(Object),
  type: PropTypes.string,
  required: PropTypes.bool,
  variant: PropTypes.string,
  placeholder: PropTypes.string,
  errorText: PropTypes.string,
  disable: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.string,
  title: PropTypes.string,
};

TextFieldAtom.defaultProps = {
  label: '',
  value: '',
  InputProps: {},
  customFormControlCss: {},
  onChange: () => {},
  type: 'text',
  required: true,
  variant: 'outlined',
  placeholder: '',
  errorText: '',
  disable: false,
  multiline: false,
  rows: '',
  title: '',
};

export default TextFieldAtom;
