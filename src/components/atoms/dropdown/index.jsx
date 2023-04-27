/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { memo } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import ArrowDropdown from '@mui/icons-material/KeyboardArrowDown';

import style from './style';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: '100%',
    },
  },
};

const Dropdown = memo(
  ({
    handleChange,
    label,
    required,
    icon,
    labelId,
    id,
    options,
    value,
    variant,
    error,
    errorText,
    customClass,
    customSelectClass,
    disabled,
    onBlur,
    onClose,
    customStyles,
  }) => {
    const classes = style();
    const { t } = useTranslation();

    return (
      <FormControl
        className={`${classes[customClass]} ${classes.formControl}`}
        style={customStyles}
      >
        <InputLabel shrink={false} id={labelId} className={customSelectClass}>
          {value ? '' : t(label) + (required ? ' *' : '')}
        </InputLabel>
        <span>
          {icon || null}
          <Select
            labelId={labelId}
            id={id}
            className={customSelectClass}
            // label={labelId ? label : false}
            value={value}
            name={id}
            onChange={handleChange}
            onBlur={onBlur}
            variant={variant}
            error={!!error}
            IconComponent={ArrowDropdown}
            disabled={disabled}
            data-testid={id}
            onClose={onClose}
            MenuProps={MenuProps}
          >
            {options?.length ? (
              options.map((opt) => (
                <MenuItem
                  key={opt.id}
                  value={opt.id}
                  className={classes.menuItem}
                >
                  {t(opt.name)}
                </MenuItem>
              ))
            ) : (
              <MenuItem className={classes.defaultMenu}>
                {t('NO_OPTIONS_AVAILABLE')}
              </MenuItem>
            )}
          </Select>
        </span>
        <span className={classes.errorText}>{error ? t(errorText) : ''}</span>
      </FormControl>
    );
  },
);

Dropdown.defaultProps = {
  options: [],
  value: '',
  variant: 'outlined',
  placeholder: '',
  error: false,
  errorText: '',
  disabled: false,
};

export default Dropdown;
