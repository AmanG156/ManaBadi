/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopTimePicker from '@mui/lab/DesktopTimePicker';
import Stack from '@mui/material/Stack';
import useStyles from '../../../custom-hooks/useStyles';
import styles from './style';

export default function ViewsTimePicker(props) {
  const {
    label, value, onChange, error, onBlur, disabled,
  } = props;

  const classes = useStyles(styles)();
  // if (value === '') {
  //   // eslint-disable-next-line no-const-assign
  //   value = new Date();
  // }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={`${classes.wrapper} ${classes.datePicker}`}>
        <Stack spacing={3}>
          <DesktopTimePicker
            InputProps={{ value }}
            ampm={false}
            openTo="hours"
            views={['hours', 'minutes', 'seconds']}
            inputFormat="HH:mm:ss"
            mask="__:__:__"
            label={label}
            value={value}
            onChange={onChange}
            renderInput={(params) => (
              <TextField
                id="datePickerDiv"
                onBlur={onBlur}
                readOnly
                disabled={disabled}
                {...params}
                helperText={null}
                error={error}
                sx={{
                  svg: { fill: '#104F96', paddingTop: '0.6vw' },
                }}
              />
            )}
          />
        </Stack>
      </div>
    </LocalizationProvider>
  );
}
