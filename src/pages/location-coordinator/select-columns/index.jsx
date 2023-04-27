import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button, Checkbox } from '../../../components/atoms';
import { Buttons } from '../../../constant';
import useStyles from '../../../custom-hooks/useStyles';
import styles from './style';
import commonStyle from '../../../utils/commonClasses';

export default function SelectColumns({
  setDialogOpen, visibleFields,
  setVisibleFields, allFields,
  setFileHeaders,
  csvHeaders,
}) {
  // initially all options are checked
  const checkList = allFields;
  const { t } = useTranslation();
  const [checked, setChecked] = useState([]);
  const reduxStore = useSelector((state) => state);
  const courseList = reduxStore?.getStudent?.courses;
  const classes = useStyles(styles)();
  const commonClasses = useStyles(commonStyle)();
  useEffect(() => {
  }, [courseList]);
  useEffect(() => {
    setChecked(visibleFields);
  }, []);
  // to check the checkboxes
  const handleCheck = (event, item) => {
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, item];
    } else {
      updatedList.splice(checked.indexOf(item), 1);
    }
    setChecked(updatedList);
  };
  // to click of save
  const handleSubmit = () => {
    setVisibleFields(checked);
    setDialogOpen(false);
    const prevHeader = [...csvHeaders];
    const headers = prevHeader?.filter((o1) => checked?.some((o2) => o1.name === o2));
    if (headers?.length) {
      setFileHeaders(headers);
    }
  };
  // to check the item is un-checked and vice versa
  const isChecked = (item) => (!!checked.includes(item));
  return (
    <Grid container className={classes.gridContainer}>
      <Grid item xs={12}>
        <Grid container justifyContent="flex-start" flexDirection="row" flexWrap="wrap">
          <Grid className={classes.checkList}>
            {checkList.map((item) => (
              <Grid xs={6} md={4} lg={2.4}>
                <Checkbox
                  customClasses="columnCheckBox"
                  checked={isChecked(item)}
                  value={item}
                  label={item}
                  handleChange={(e) => handleCheck(e, item)}
                  disabled={item === (t('PICTURES')) || item === t('STUDENT_NAME')}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.dialogButtons}>
        <Grid container justifyContent="flex-end">
          <Button
            name={t('CANCEL')}
            onClick={() => setDialogOpen(false)}
            btntype={Buttons.SECONDARY}
          />
          <Button
            name={t('SAVE')}
            onClick={handleSubmit}
            btntype={Buttons.PRIMARY}
            className={commonClasses.activeButton}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
