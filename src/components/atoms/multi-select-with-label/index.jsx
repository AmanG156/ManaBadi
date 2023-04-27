import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ArrowDropdown from '@mui/icons-material/KeyboardArrowDown';
import { useTranslation } from 'react-i18next';
import style from './style';

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function LabeledMultiSelect({
  handleChange, label, id, options = [], value, onBlur, error, onFocus,
}) {
  const { t } = useTranslation();
  const classes = style();
  return (
    <div>
      <FormControl className={classes.formControl} sx={{ m: 1, width: 300 }}>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId={id}
          id={id}
          label={label}
          value={value}
          name={id}
          multiple
          IconComponent={ArrowDropdown}
          error={!!error}
          onChange={(e) => {
            handleChange(e);
          }}
          onBlur={onBlur}
          onClose={onBlur}
          onFocus={onFocus}
          renderValue={(selected) => {
            const values = [];
            selected.forEach((item) => {
              const selectedItem = options.find((opt) => opt.id === item);
              if (selectedItem) {
                values.push(t(selectedItem.name));
              }
            });
            return values.join(', ');
          }}
          MenuProps={MenuProps}
        >
          {options.map((opt) => (
            <MenuItem key={opt.name} value={opt.id} className={classes.menuItem}>
              <Checkbox checked={value && value.indexOf(opt.id) > -1} />
              <ListItemText primary={t(opt.name)} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
