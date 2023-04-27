/* eslint-disable no-return-assign */
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FormControl } from '@mui/material';
import Chip from '@mui/material/Chip';
import { Close } from '@material-ui/icons';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';
import profilePic from '../../../assets/images/profileUpload.png';

export default function AutoCompleteMultiSelect({
  options, onClose, onChange, onBlur, required, handleCheck,
  value = [],
}) {
  const classes = useStyles(styles)();
  return (
    <FormControl className={classes.formControl}>
      <Autocomplete
        multiple
        id="size-small-standard-multi"
        size="small"
        options={options}
        getOptionLabel={(option) => `${option?.firstName} ${option?.lastName}`}
        value={value}
        onChange={onChange}
        // defaultValue={[options[13]]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label={`Coordinators ${required ? '*' : ''}`}
            placeholder="Find User"
            key={params?.id}
          />
        )}
        onBlur={onBlur}
        onClose={onClose}
        renderTags={(values, getTagProps) => values.map((option, index) => (
          <div className={classes.chipMainDiv}>
            <img
              alt="avatar"
              className={classes.icon}
              src={option?.profilePhoto || profilePic}
            />
            <div className={option?.isPrimary === true ? classes.checkChipInnnerDiv : classes.unCheckChipInnnerDiv}>
              <Chip
                {...getTagProps({ index })}
                variant="outlined"
                deleteIcon={<Close />}
                key={option?.id}
                label={`${option?.firstName} ${option?.lastName}`}
                onDelete={() => {
                }}
              />
              <p className={classes.manabadiEmail}>
                {`${option?.manabadiEmail}`}
              </p>
            </div>
            <div className={classes.starIcon}>
              {option?.isPrimary === true ? (
                <span className={classes.checkedIcon} onClick={() => handleCheck(option, false)}>
                  <StarRateIcon />
                </span>
              ) : (
                <span className={classes.unCheckedIcon} onClick={() => handleCheck(option, true)}>
                  <StarOutlineIcon />
                </span>
              )}
            </div>
          </div>
        ))}
      />
    </FormControl>
  );
}
