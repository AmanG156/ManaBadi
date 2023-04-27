/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FormControl } from '@mui/material';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';

export default function GroupedAutoComplete({
  label, options, onSelection, value = [], isStudentFilter, onInputChange, disabled, placeholder, allowUserInput,
}) {
  const classes = useStyles(styles)();
  return (
    <FormControl className={isStudentFilter ? classes.formControlStudentFilter : classes.formControl}>
      {
        options?.length !== 0
          ? (
            <Autocomplete
              id="grouped-demo"
              multiple
              options={Array.isArray(options?.[0].groupBy) === false ? options?.sort((a, b) => -b?.groupBy?.localeCompare(a.groupBy)) : options}
              groupBy={(option) => option.groupBy}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} />}
              onChange={(e, val) => {
                const filtered = val.filter((valu, index, self) => index === self.findIndex((t) => (
                  t.label === valu.label && t.groupBy === valu.groupBy
                )));
                onSelection(e, filtered);
              }}
              value={value}
              label={label}
              onInputChange={onInputChange}
              disabled={disabled}
              freeSolo={allowUserInput}
            />
          )
          : null
      }
    </FormControl>
  );
}
