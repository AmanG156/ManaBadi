import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import FormControl from '@mui/material/FormControl';
import { useTranslation } from 'react-i18next';
import style from './style';
import useStyles from '../../../custom-hooks/useStyles';

function LabeledTextField({
  label, value, onChange, InputProps, multiline, rows, onBlur,
  customFormControlCss, type, variant, error,
  errorText, disable, title, minWidth, id, custominputProps, required,
}) {
  const classes = useStyles(style)();
  const { t } = useTranslation();
  return (
    // eslint-disable-next-line max-len
    <FormControl sx={{ m: 1, minWidth }} className={classes.formControl} style={customFormControlCss}>
      <TextField
        // labelId={id}
        required={required}
        id={id}
        label={t(label)}
        placeholder={label}
        value={value}
        name={id}
        onChange={onChange}
        InputProps={InputProps}
        type={type}
        variant={variant}
        error={!!error}
        helperText={t(errorText)}
        disabled={disable}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        inputProps={{
          'data-testid': id,
          ...custominputProps,
        }}
        InputLabelProps={{ shrink: true }}
        multiline={multiline}
        rows={rows}
        title={t(title)}
        onBlur={onBlur}
      />
    </FormControl>
  );
}
LabeledTextField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func.isRequired,
  InputProps: PropTypes.objectOf(Object),
  customFormControlCss: PropTypes.objectOf(Object),
  custominputProps: PropTypes.objectOf(Object),
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  variant: PropTypes.string,
  errorText: PropTypes.string,
  disable: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.string,
  title: PropTypes.string,
};

LabeledTextField.defaultProps = {
  label: '',
  value: '',
  InputProps: {},
  customFormControlCss: {},
  type: 'text',
  variant: 'outlined',
  custominputProps: {},
  errorText: '',
  disable: false,
  multiline: false,
  rows: '',
  title: '',
};

export default LabeledTextField;
