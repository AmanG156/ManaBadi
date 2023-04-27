import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import ArrowDropdown from '@mui/icons-material/KeyboardArrowDown';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'react-i18next';
import style from './style';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '20vw',
    },
  },
};

export default function MultipleSelectCheckmarks({
  handleChange, label, id, options = [], value, onBlur, error, required, onFocus,
}) {
  const { t } = useTranslation();
  const classes = style();
  return (
    <div className={classes.multiSelct}>
      <FormControl
        className={classes.formControl}
        // sx={{ m: 1, maxWidth: }}
        sx={{
          m: {
            lg: 1, // theme.breakpoints.up('lg')
          },
          maxWidth: {
            lg: '60vw',
          },
        }}
      >
        <InputLabel shrink={false} id={id}>{!(value?.length) && t(label) + (required ? ' *' : '')}</InputLabel>
        <Select
          labelId={id}
          name={id}
          id="demo-multiple-checkbox"
          multiple
          error={!!error}
          value={value || []}
          IconComponent={ArrowDropdown}
          onChange={(e) => {
            handleChange(e);
          }}
          onBlur={onBlur}
          onClose={onBlur}
          onFocus={onFocus}
          input={<OutlinedInput />}
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
