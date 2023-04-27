/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import { usePropagateRef } from '../PerformantTextField/usePropagateRef';

import style from './style';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const PerfromantDropdown = memo((props) => {
  const classes = style();
  const {
    shrink, label, name, id,
  } = props;
  const { t } = useTranslation();
  const [field, meta] = useField(props.name);
  const error = !!meta.error && meta.touched;

  const [fieldValue, setFieldValue] = useState(field.value);
  const { loading, ...otherProps } = props;
  usePropagateRef({
    setFieldValue,
    name: props.name,
    value: field.value,
  });
  useEffect(() => {
    if ((meta.touched) && (field.value === fieldValue)) {
      return;
    }
    if (field.value !== fieldValue) {
      setFieldValue(field.value);
    }
    // eslint-disable-next-line
  }, [field.value]);
  const onChange = (evt) => {
    setFieldValue(evt.target.value);
    if (props.handleChange) {
      props.handleChange(evt);
    }
  };
  const onBlur = (evt) => {
    const val = evt.target.value || '';
    window.setTimeout(() => {
      field.onChange({
        target: {
          name: props.name,
          value: props.type === 'number' ? parseInt(val, 10) : val,
        },
      });
      if (props.onBlur) {
        setFieldValue(val);
        props.onBlur(evt);
      }
    }, 0);
  };

  const performanceProps = {
    ...field,
    value: fieldValue || '',
    onChange,
    onBlur,
  };

  const getLabel = () => {
    if (shrink) {
      return (t(props.label) + (props.required ? ' *' : ''));
    }
    return (props.value) ? '' : t(props.label) + (props.required ? ' *' : '');
  };
  return (
    <FormControl
      className={!shrink ? `${props.customClass || classes.formControl}`
        : `${classes.dropDownSelect} ${props.icon ? classes.withLeftIcon : ''}`}
    >
      <InputLabel
        {...(shrink && shrink)}
        {...(shrink && id)}
        className={props.customSelectClass}
      >
        {getLabel() }
      </InputLabel>
      <span>
        {props.icon || null}
        <Select
          {...otherProps}
          {...(shrink && label)}
          {...(shrink && id)}
          {...(shrink && name)}
          InputProps={{
            ...((props.type === 'number' && {
              inputProps: { min: props?.min, max: props?.max },
            })
                  || undefined),
          }}
          error={error}
          helperText={meta.touched && meta.error}
          {...performanceProps}
          MenuProps={MenuProps}
        >
          {props?.options?.length ? props?.options.map((opt) => (
            <MenuItem
              key={opt.id}
              value={opt.id}
              className={classes.menuItem}
            >
              {t(opt.name)}
            </MenuItem>
          )) : (
            <MenuItem className={classes.defaultMenu}>
              {t('NO_OPTIONS_AVAILABLE')}
            </MenuItem>
          )}
        </Select>
      </span>
      <span className={classes.errorText}>
        { props.error ? t(props.errorText) : ''}
      </span>
    </FormControl>
  );
});

export default PerfromantDropdown;
