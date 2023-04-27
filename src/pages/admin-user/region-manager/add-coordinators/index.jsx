import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector } from 'react-redux';
import styles from './style';
import Chip from './chip';
import useStyles from '../../../../custom-hooks/useStyles';

export default function App(props) {
  const {
    selectedOptions, setSelectedOptions, setError, t, name, id,
  } = props;
  const regionStore = useSelector((state) => state?.getRegion);

  const { data } = props;
  const [options, setOptions] = useState([]);
  const classes = useStyles(styles)();
  const [listData, setListData] = useState([]);

  const setTeachers = (teacherData) => {
    const teacherIndex = teacherData?.findIndex((i) => (i.isPrimary === true));
    if (teacherIndex >= 0) {
      setSelectedOptions(teacherData);
    } else {
      const teachers = teacherData;
      //   teachers[0].isPrimary = true;
      setSelectedOptions(teachers);
    }
  };
  useEffect(() => {
    setListData(selectedOptions);
  }, [selectedOptions]);
  useEffect(() => {
    const optionList = regionStore?.coordinators?.map((i) => {
      return {
        ...i,
        name: `${i?.firstName} ${i?.lastName}`,
        value: `${i?.firstName} ${i?.lastName}`,
        manabadiEmail: i?.manabadiEmail,
        isPrimary: i?.isPrimary === true ? i?.isPrimary : false,
      };
    });
    const newData = data?.map((i) => {
      return {
        ...i,
        name: `${i?.firstName} ${i?.lastName}`,
        value: `${i?.firstName} ${i?.lastName}`,
        isPrimary: i?.isPrimary === true ? i?.isPrimary : false,
      };
    });
    setOptions(optionList);
    if (newData) {
      setTeachers(newData);
    }
  }, [regionStore?.coordinators, data]);

  useEffect(() => {
    setListData(listData);
  }, [listData]);

  const setPrimaryError = (dataArray) => {
    const isPrimary = dataArray?.findIndex(((obj) => obj?.isPrimary === true));
    if (isPrimary < 0) {
      setError(t('PRIMARY_COORDINATORS_REQUIRED'));
    } else {
      setError(false);
    }
  };
  const handleCheck = (opt) => {
    const setValue = (item) => {
      if (item?.id === opt?.id) {
        return item.isPrimary !== true;
      }
      return false;
    };

    const updatedArray = listData?.map((i) => ({
      ...i,
      isPrimary: setValue(i),
    }));
    const checkedArray = selectedOptions?.map((i) => ({
      ...i,
      isPrimary: setValue(i),
    }));
    setPrimaryError(checkedArray);
    setListData(updatedArray);
    setSelectedOptions(checkedArray);
  };

  const handleChange = (event, value, method, option) => {
    const objIndex = selectedOptions?.findIndex(((obj) => obj?.id === option?.option?.id));
    const isPrimary = selectedOptions?.findIndex(((obj) => obj?.isPrimary === true));
    if (method !== 'remove-option' && objIndex !== -1) {
      selectedOptions[objIndex] = option?.option;
      setError(false);
    } else if (method === 'remove-option' && isPrimary !== objIndex && selectedOptions?.length > 1) {
      setSelectedOptions(value);
    } else if (method === 'remove-option' && selectedOptions?.length === 1 && isPrimary === objIndex) {
      setSelectedOptions(value);
      setError(t('COORDINATORS_REQUIRED'));
    } else if (method === 'remove-option' && selectedOptions?.length <= 1) {
      setSelectedOptions(value);
      setError(t('COORDINATORS_REQUIRED'));
    } else if (value) {
      setTeachers(value);
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
      id={id}
      name={name}
      options={options || []}
      value={selectedOptions}
      onChange={handleChange}
      filterSelectedOptions
      autoComplete
      getOptionLabel={(option) => option?.name}
      renderTags={(tagValue, getTagProps) => tagValue?.map((option, index) => (
        <Chip
          tagIndex={index}
          handleCheck={handleCheck}
          listData={listData}
          {...getTagProps({ index })}
        />
      ))}
      renderInput={(params) => (
        <TextField {...params} placeholder="Find User" />
      )}
    />
  );
}
