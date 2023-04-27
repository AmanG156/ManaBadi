/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import clsx from 'clsx';
import useStyles from '../../../custom-hooks/useStyles';
import style from './style';

function Phone({
  onChange, value, label, id, error, onBlur, defaultCountry, onCountryChange, customClass,
}) {
  const classes = useStyles(style)();
  return (
    <PhoneInput
      label={label}
      // useNationalFormatForDefaultCountryValue
      usenationalformatfordefaultcountryvalue
      international
      countryCallingCodeEditable={false}
      maxLength={15}
      placeholder={label}
      value={value}
      countries={['US', 'CA']}
      onChange={onChange}
      onCountryChange={onCountryChange}
      onBlur={onBlur}
      className={clsx(
        classes.phoneInput,
        error ? classes.errorBorder : '',
        classes[customClass],
      )}
      data-testid={id}
      // onBlur={onBlur}
      defaultCountry={defaultCountry || 'US'}
      addInternationalOption
      // international
    />
  );
}

export default Phone;
