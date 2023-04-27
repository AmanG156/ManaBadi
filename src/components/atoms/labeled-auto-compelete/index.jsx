/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import clsx from 'clsx';
import useStyles from '../../../custom-hooks/useStyles';
import style from './style';
import constant from '../../../constant/config';

function LabeledAddressAutoComplete({
  id,
  onChange, value, label, onPlaceSelected, error, onBlur,
}) {
  const classes = useStyles(style)();
  return (
    <div>
      <FormControl
        className={classes.formControl}
        // sx={{ m: 1, width: 200 }}
        sx={{
          m: {
            lg: 1, // theme.breakpoints.up('lg')
          },
          width: {
            xs: '100%',
            lg: 200,
          },
        }}
      >
        {' '}
        {value ? <InputLabel id={id}>{label}</InputLabel> : null}
        <Autocomplete
          label={label}
          placeholder={label}
          id={id}
          name={id}
          value={value}
          onPlaceSelected={onPlaceSelected}
          onChange={onChange}
          apiKey={constant.REACT_APP_AUTO_COMPLETE_API}
          className={!error
            ? classes.addressAutoComplete : clsx(classes.addressAutoComplete, classes.error)}
          options={{
            types: ['geocode', 'establishment'],
            // fields: ['address_components', 'geometry'],
          }}
          onBlur={onBlur}
        />
      </FormControl>
    </div>
  );
}

export default LabeledAddressAutoComplete;
