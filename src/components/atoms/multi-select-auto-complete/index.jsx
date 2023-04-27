import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector } from 'react-redux';
import styles from './style';
import Chip from './chip';
import useStyles from '../../../custom-hooks/useStyles';

export default function App(props) {
  const {
    selectedOptions, setSelectedOptions, setError, t,
  } = props;
  const reduxStore = useSelector((state) => state);

  const optionsList = reduxStore?.getLocationCoordinator?.teachers;
  const { data } = props;
  const [options, setOptions] = useState([]);
  const classes = useStyles(styles)();
  const [listData, setListData] = useState([]);

  const setTeachers = (teacherData) => {
    const teacherIndex = teacherData?.findIndex((i) => (i.checked === true && i?.email?.length > 0));
    if (teacherIndex >= 0) {
      setSelectedOptions(teacherData);
    } else {
      const teachers = teacherData;
      teachers[0].checked = true;
      setSelectedOptions(teachers);
    }
  };

  useEffect(() => {
    setOptions(optionsList);
    if (data?.teachers) {
      setTeachers(data?.teachers);
    }
  }, [optionsList, data?.teachers]);

  useEffect(() => {
    const { googleClassId, classRoomId } = data;
    const updatedArray = selectedOptions?.map((i) => ({
      id: i?.key,
      checked: i?.checked,
      name: i.value,
      manabadiEmail: i?.email,
      googleClassId,
      classRoomId,
      teacherId: i?.key,
    }));
    setListData(updatedArray);
  }, [selectedOptions]);

  useEffect(() => {
    setListData(listData);
  }, [listData]);

  const handleCheck = (id) => {
    const setValue = (item) => {
      if (selectedOptions?.length === 1) { return true; }
      if (item?.id === id) {
        return !item.checked;
      }
      return false;
    };
    const updatedArray = listData?.map((i) => ({
      ...i,
      checked: setValue(i),
    }));
    const checkedArray = selectedOptions?.map((i) => ({
      ...i,
      checked: setValue(i),
    }));
    setListData(updatedArray);
    setSelectedOptions(checkedArray);
  };
  const handleChange = (event, value, method, option) => {
    const objIndex = selectedOptions.findIndex(((obj) => obj.id === option?.option?.id));
    const isPrimary = selectedOptions.findIndex(((obj) => obj.checked === true && obj?.email?.length > 0));
    if (method !== 'remove-option' && objIndex !== -1) {
      selectedOptions[objIndex] = option?.option;
      setError(false);
    } else if (method === 'remove-option' && isPrimary !== objIndex) {
      setSelectedOptions(value);
    } else if (method === 'remove-option' && selectedOptions?.length === 1 && isPrimary === objIndex) {
      setError(t('TEACHER_REQUIRED'));
    } else if (value) {
      const updatedValues = value?.filter((i) => i?.key?.length > 0);
      setTeachers(updatedValues);
      setError(false);
    }
  };
  return (
    <Autocomplete
      className={classes.dropdown}
      ListboxProps={
        {
          style: {
            maxHeight: '7vw',
          },
        }
      }
      multiple
      id="tags-standard"
      options={options || []}
      value={selectedOptions}
      onChange={handleChange}
      filterSelectedOptions
      autoComplete
      getOptionLabel={(option) => option?.value}
      style={{ width: 400 }}
      renderTags={(tagValue, getTagProps) => tagValue?.map((option, index) => (
        <Chip
          tagIndex={index}
          selectedOptions={selectedOptions}
          handleCheck={handleCheck}
          listData={listData}
          {...getTagProps({ index })}
          {...props}
        />
      ))}
      renderInput={(params) => (
        <TextField {...params} variant="standard" placeholder="Find User" />
      )}
    />
  );
}
