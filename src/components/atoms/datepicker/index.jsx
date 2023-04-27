/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import CalenderIcon from '../../../assets/svg/calenderIconNew';
import useStyles from '../../../custom-hooks/useStyles';
import styles from './style';

export default function ViewsDatePicker(props) {
  const {
    label, value, onChange, wrapperClassName, error, maxDate, onBlur, minDate,
  } = props;

  const classes = useStyles(styles)();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={`${classes.wrapper} ${classes.datePicker}`}>
        <DesktopDatePicker
          InputProps={{ readOnly: true }}
          wrapperClassName={wrapperClassName}
          views={['year', 'month', 'day']}
          label={label}
          components={{
            OpenPickerIcon: CalenderIcon,
          }}
          format="MM/dd/yyyy"
          defaultCalendarMonth={minDate}
          defaultValue={new Date()}
          allowSameDateSelection
          value={value}
          onChange={onChange}
          maxDate={maxDate}
          minDate={minDate}
          onBlur={onBlur}
        // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => (
            <TextField
              id="datePickerDiv"
              onBlur={onBlur}
              readOnly
              {...params}
              helperText={null}
              error={error}
              sx={{
                svg: { fill: '#104F96', paddingTop: '0.6vw' },
              }}
            />
          )}
        />
      </div>
    </LocalizationProvider>
  );
}
