/* eslint-disable react/jsx-props-no-spreading */
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

const DropdownWithLabel = memo(({
  handleChange, label, id, options, value, variant, error, errorText, changeCss, disabled, onBlur, onClose,
}) => {
  const classes = style();
  const { t } = useTranslation();
  return (
    <FormControl className={`${classes.formControl} ${changeCss ? classes.dropdownUi : ' '}`}>
      <InputLabel
        id={id}
      >
        {t(label)}
      </InputLabel>
      <Select
        labelId={id}
        id={id}
        label={t(label)}
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
        {options?.length ? options.map((opt) => (
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
      <span className={classes.errorText}>
        { error ? t(errorText) : ''}
      </span>
    </FormControl>
  );
});

DropdownWithLabel.defaultProps = {
  options: [],
  value: '',
  variant: 'outlined',
  placeholder: '',
  error: false,
  errorText: '',
  disabled: false,
};

export default DropdownWithLabel;
