import React, { useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';
import { Dropdown } from '../../../components/atoms';
import GridView from './gridView';
import EnrollbarWrapper from './charts/enrollment-bar/enrollmentBarWrapper';
import { filterYearOptions } from './charts/constants';
import useSelectedGraphOptions from '../../../custom-hooks/useSelectedGraphOption';
import { setEnrollGraphOption, setGraphOption } from '../../../store/actions/getAdmin';
import useAdmin from '../../../custom-hooks/useAdmin';

export default function AdminDashboard() {
  const { graphOption, handleGraphOption } = useSelectedGraphOptions();
  const adminData = useAdmin();
  const enrollGraphOption = adminData?.enrollGraphOption;

  const classes = useStyles(styles)();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const option = graphOption || 'acrossyear';
  useEffect(() => {
    if (option) { dispatch(setGraphOption(option)); }
  }, [graphOption, adminData?.enrollGraphOption]);

  const setEnrollBarGraphOption = (op) => {
    dispatch(setEnrollGraphOption(op));
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <Grid style={{ height: option === 'none' ? window.innerHeight - 100 : window.innerHeight + 100 }} className={classes.mainContainer}>
        <Box>
          <Grid container item className={classes.titleRow}>
            <Grid item>
              <Typography className={classes.headerTitle}>
                {t('STUDENTS')}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4} md={4} className={classes.alignGrid}>
            <Dropdown
              minWidth="100%"
              label={t('YEAR')}
              id="filterYear"
              name="filterYear"
              value={graphOption}
              handleChange={handleGraphOption}
              className={classes.dropdownText}
              options={filterYearOptions}
            />
          </Grid>
        </Grid>
        <Box>
          <EnrollbarWrapper {...{ enrollGraphOption }} setEnrollGraphOption={setEnrollBarGraphOption} />
        </Box>
        <Box mt={4}>
          <GridView selectedOption={graphOption} />
        </Box>
      </Grid>
    </div>
  );
}
