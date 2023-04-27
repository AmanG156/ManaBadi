import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
// import clsx from 'clsx';

import useStyles from '../../../custom-hooks/useStyles';
import styles from './style';

export default function CheckboxesAtom({
  checked, label, error, handleChange, customClasses = '', disabled,
}) {
  const classes = useStyles(styles)();

  return (
    <Box>
      <FormControl
        sx={{ m: 3 }}
        component="fieldset"
        variant="standard"
        className={`${classes.formControl} ${classes[customClasses]}`}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={checked} onChange={handleChange} name="gilad" disabled={disabled} />
            }
            label={label}
          />
        </FormGroup>
      </FormControl>
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
        className={{ customClasses }}
      >
        <FormHelperText>{error || ''}</FormHelperText>
      </FormControl>
    </Box>
  );
}
