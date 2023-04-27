/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import FormControl from '@mui/material/FormControl';
import clsx from 'clsx';
import useStyles from '../../../custom-hooks/useStyles';
import style from './style';
import constant from '../../../constant/config';

function AddressAutoComplete({
  onChange, value, label, onPlaceSelected, error, onBlur, className, variant,
  addressAutoCompleteClass, customClass,
}) {
  const classes = useStyles(style)();
  return (
    <div>
      <FormControl
        className={!error ? `${classes[customClass]} ${className || classes.formControl}` : `${className || classes.formControl}`}
        // sx={{ m: 1, }}
        sx={{
          m: {
            lg: 1, // theme.breakpoints.up('lg')
          },
          width: 200,
        }}
      >
        <Autocomplete
          label={label}
          placeholder={label}
          value={value}
          onPlaceSelected={onPlaceSelected}
          onChange={onChange}
          apiKey={constant.REACT_APP_AUTO_COMPLETE_API}
          className={addressAutoCompleteClass || (!error
            ? classes.addressAutoComplete : clsx(classes.addressAutoComplete, classes.error))}
          options={{
            types: ['geocode', 'establishment'],
            // fields: ['address_components', 'geometry'],
          }}
          id="addressAutoComplete"
          onBlur={onBlur}
          variant={variant}
        />
      </FormControl>
    </div>
  );
}

export default AddressAutoComplete;
