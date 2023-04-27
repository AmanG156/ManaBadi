/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import {
  Grid,
} from '@mui/material';
import useStyles from '../../../custom-hooks/useStyles';
import styles from './style';
import CheckboxAtom from '../../../components/atoms/checkbox';
import ButtonAtom from '../../../components/atoms/button';
import { Buttons } from '../../../constant';
import commonStyle from '../../../utils/commonClasses';
import DialogAtom from '../../../components/atoms/dialog';
import TextFieldAtom from '../../../components/atoms/text-field-with-label';

function AddDialogFooter({
  classes,
  t, secHandle, primaryHandle,
}) {
  const commonClasses = useStyles(commonStyle)();
  return (
    <Grid container className={classes.dialogButtons}>
      <Grid item xs={4} />
      <Grid item xs={8} className={classes.button} justifyContent="flex-end">
        <ButtonAtom
          name={t('CANCEL')}
          onClick={secHandle}
          btntype={Buttons.SECONDARY}
        />
        <ButtonAtom
          name={t('CREATE')}
          onClick={primaryHandle}
          btntype={Buttons.PRIMARY}
          className={commonClasses.activeButton}
        />
      </Grid>
    </Grid>
  );
}

export default function StudentFilters({
  filterOptions, onAddView, setFilterOptions,
}) {
  const [allSelection, setAllSelection] = useState(false);
  const [allExpand, setAllExpand] = useState(false);

  const classes = useStyles(styles)();
  const { t } = useTranslation();
  const commonClasses = useStyles(commonStyle)();
  const [showAddViewDialog, setShowAddViewDialog] = useState(false);

  const onFilterSelection = (filterValue, optValue, optChecked) => {
    const selectedFilterIndex = _.findIndex(filterOptions, { value: filterValue });
    const selectedOptionIndex = _.findIndex(
      filterOptions[selectedFilterIndex].options,
      (op) => op.value === optValue,
    );
    const updatedFilters = [...filterOptions];
    updatedFilters[selectedFilterIndex].options[selectedOptionIndex].checked = !optChecked;
    setFilterOptions(updatedFilters, true); // true is sending for calling student api again to fetch new filtered student
  };
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const onExpand = (filterValue, filterExpanded) => {
    const updatedFilters = [...filterOptions];
    const selectedFilterIndex = _.findIndex(updatedFilters, { value: filterValue });
    updatedFilters[selectedFilterIndex].expanded = !filterExpanded;
    const isAllExpanded = _.every(updatedFilters, (filter) => filter.expanded === true);
    setAllExpand(isAllExpanded);
    setFilterOptions(updatedFilters);
  };

  const onAllExpand = () => {
    setAllExpand(!allExpand);
    const upFilters = [...filterOptions].map((filter) => (
      { ...filter, expanded: !allExpand }));
    setFilterOptions(upFilters);
  };

  const isAllFilterChecked = () => {
    const res = [];
    filterOptions?.forEach((filter) => {
      const tt = filter?.options?.every((opt) => opt.checked);
      res.push(tt);
    });
    return !res.includes(false);
  };

  const onCreate = () => {
    setTitleError(!title ? t('TITLE_REQUIRED') : '');
    if (!title) return;
    onAddView(title, filterOptions, setShowAddViewDialog);
  };

  return (
    <div className={classes.filterContainer}>
      <div className={classes.dFlex}>
        <CheckboxAtom
          label={t('ALL')}
          checked={isAllFilterChecked()}
          handleChange={(e) => {
            const res = _.map(filterOptions, (f) => {
              const opts = _.map(f.options, (op) => ({ ...op, checked: e.target.checked }));
              return { ...f, options: opts };
            });
            setFilterOptions(res, true); // true is sending for calling student api again to fetch new filtered student
            setAllSelection(e.target.checked);
          }}
          customClasses={classes.checkBoxAll}
        />
        <div className={classes.expandIconAll} onClick={onAllExpand}>{allExpand ? '-' : '+'}</div>
      </div>

      {filterOptions.map((filter, i) => (
        <React.Fragment key={i}>
          <div className={classes.line}>
            <div style={{ width: '19vw', fontSize: '0.9vw' }}>{t(filter.label)}</div>
            <div className={classes.expandIcon} onClick={() => onExpand(filter.value, filter.expanded)}>{filter.expanded ? '-' : '+'}</div>
          </div>
          {filter.expanded ? (
            <>
              {filter.options.map((opt, index) => (
                <CheckboxAtom
                  key={index}
                  label={t(opt.label)}
                  checked={opt.checked}
                  handleChange={() => onFilterSelection(filter.value, opt.value, opt.checked)}
                  customClasses={classes.checkBoxAll}
                />
              ))}
            </>
          ) : ''}
        </React.Fragment>
      ))}
      <ButtonAtom
        name={t('ADD_TO_MY_VIEW')}
        onClick={() => setShowAddViewDialog(true)}
        btntype={Buttons.PRIMARY}
        className={classes.btnFullView}
      />
      <DialogAtom
        secHandle={() => setShowAddViewDialog(false)}
        isOpen={showAddViewDialog}
        dialogHeading={t('ADD_TO_MY_VIEW')}
        footer={(
          <AddDialogFooter
            classes={classes}
            t={t}
            primaryHandle={onCreate}
            secHandle={() => setShowAddViewDialog(false)}
          />
        )}
        content={(
          <Grid container spacing={2}>
            <Grid item xs={12} md={4} lg={4} className={classes.alignGrid}>
              <TextFieldAtom
                label={`${t('PLEASE_ADD_TITLE')} *`}
                id="title"
                required
                name="title"
                type="text"
                value={title}
                onBlur={() => {
                  setTitleError(!title ? t('TITLE_REQUIRED') : '');
                }}
                error={titleError}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setTitleError(!e.target.value ? t('TITLE_REQUIRED') : '');
                }}
              />
              <span className={classes.errorText}>
                {titleError}
              </span>
            </Grid>
          </Grid>
        )}
      />
    </div>
  );
}
