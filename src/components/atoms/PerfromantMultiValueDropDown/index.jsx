/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import ListItemText from '@mui/material/ListItemText';
import ArrowDropdown from '@mui/icons-material/KeyboardArrowDown';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';

import { usePropagateRef } from '../PerformantTextField/usePropagateRef';

import style from './style';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250,
    },
  },
};

const PerfromantMultiValueDropdown = memo((props) => {
  const classes = style();
  const { t } = useTranslation();
  const [field, meta] = useField(props.name);
  const error = !!meta.error && meta.touched;

  const [fieldValue, setFieldValue] = useState(field.value || []);
  const {
    loading, customClass, shrink, ...otherProps
  } = props;
  usePropagateRef({
    setFieldValue,
    name: props.name,
    value: field.value,
  });
  useEffect(() => {
    if (meta.touched) {
      return;
    }
    if (field.value !== fieldValue) {
      setFieldValue(field.value);
    }
    // eslint-disable-next-line
  }, [field.value]);
  const onChange = (evt) => {
    setFieldValue(evt.target.value);
    if (props.onChange) {
      props.onChange(evt);
    }
  };
  const onBlur = (evt) => {
    const val = evt.target.value || [];
    window.setTimeout(() => {
      field.onChange({
        target: {
          name: props.name,
          value: props.type === 'number' ? parseInt(val, 10) : val,
        },
      });
      if (props.onBlur) {
        props.onBlur(evt);
      }
    }, 0);
  };

  const performanceProps = {
    ...field,
    value: fieldValue || [],
    onChange,
    onBlur,
  };
  return (
    <div>
      <FormControl className={`${classes.formControl} ${classes[props.customClassSelect]} ${classes[customClass]}`} sx={{ m: 1, maxWidth: '60vw' }}>
        {!(performanceProps.value && performanceProps.value.length)
          && <InputLabel shrink={shrink} id={props.id}>{t(props.label) + (props.required ? '*' : '')}</InputLabel>}
        <Select
          {...otherProps}
          labelId={props.id}
          name={props.id}
          id="demo-multiple-checkbox"
          multiple
          error={!!error}
          IconComponent={ArrowDropdown}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            const values = [];
            if (!selected || !selected.length) return '';
            selected?.forEach((item) => {
              const selectedItem = props.options.find((opt) => opt.id === item);
              // console.log({selectedItem});

              if (selectedItem) {
                // translated value is not present for - selectedItem.name
                // values.push(t(selectedItem.name));
                values.push(selectedItem.name);
              }
            });
            return values.join(', ');
          }}
          MenuProps={MenuProps}
          {...performanceProps}
        >
          {props.options.map((opt) => (
            <MenuItem key={opt.name} value={opt.id}>
              <Checkbox checked={performanceProps.value && performanceProps.value.indexOf(opt.id) > -1} />
              <ListItemText primary={opt.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
});

export default PerfromantMultiValueDropdown;
