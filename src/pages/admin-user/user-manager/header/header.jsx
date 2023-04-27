import React from 'react';
import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import DownLeftRightIcon from '../../../../assets/svg/downLeftRight';
import { GroupedAutoComplete } from '../../../../components/atoms';
import { useStyles } from './style';

function Header(props) {
  const {
    handleDrawerOpen,
    selectedFilter,
    setSelectedFilter,
    setFilterOptions,
    filterOptions,
  } = props;

  const classes = useStyles();
  const { t } = useTranslation();

  const onGroupAutoCompleteSelection = (e, val) => {
    setSelectedFilter(val);
    const updatedFilOptions = [...filterOptions].map((fiOpt) => {
      const opts = fiOpt.options;
      const options = opts.map((op) => {
        const findIn = _.findIndex(val, {
          label: op.label,
          groupBy: fiOpt.label,
        });
        if (findIn !== -1) {
          return { ...op, checked: true };
        }
        return { ...op, checked: false };
      });
      return { ...fiOpt, options };
    });
    setFilterOptions(updatedFilOptions);
  };
  const userFilters = useSelector(
    (state) => state.getUser.userFilters,
  );
  const getGroupOptions = () => {
    const studentFil = [...userFilters];
    const options = [];
    studentFil.forEach((stu) => {
      stu?.options?.forEach((stuOpt) => {
        options.push({
          label: stuOpt[stu.key],
          groupBy: stu.label,
          filterKey: stu.filter,
        });
      });
    });
    return options;
  };

  return (
    <div>
      <Grid container item className={classes.titleRow}>
        <Grid item>
          <Typography className={classes.headerTitle}>
            {t('USERMANAGER')}
          </Typography>
        </Grid>
      </Grid>
      <Grid className={classes.filterButton}>
        <Grid container>
          <Grid item xs={2} md={2} lg={1.5}>
            <Button variant="filter" onClick={handleDrawerOpen}>
              <DownLeftRightIcon />
              <TuneOutlinedIcon className={classes.filterIcon} />
              filter
            </Button>
          </Grid>
          <Grid item xs={10} md={10} lg={10.5} className={classes.ChipSection}>
            <GroupedAutoComplete
              isStudentFilter
              options={getGroupOptions()}
              onSelection={onGroupAutoCompleteSelection}
              value={selectedFilter}
              label={t('SEARCH')}
              placeholder={t('SEARCH')}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid />
    </div>
  );
}

export default Header;
