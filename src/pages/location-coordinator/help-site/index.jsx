import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  // IconButton,
  Typography,
  Stack,
} from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
import GridViewIcon from '@mui/icons-material/GridView';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ListViewIcon from '../../../assets/svg/listViewIcon';
import useStyles from '../../../custom-hooks/useStyles';
import Dropdown from '../../../components/atoms/dropdown';
import { getLocalStorage } from '../../../utils/localStorageMethod';
import { getAssignedLocations, getAllLocationCourse, getHelpVideos } from '../../../store/actions/getLocationCoordinator';
import styles from './style';
import GridView from './grid-view';
import ListView from './list-view';

export default function HelpSite() {
  const { t } = useTranslation();
  const classes = useStyles(styles)();
  const getView = getLocalStorage('myView') ? getLocalStorage('myView') : 'gridView';
  const [view, setView] = useState(getView);
  const [isselectedYear, setSelectYear] = useState();
  const [isselectedLocation, setSelectedLocation] = useState();

  const dispatch = useDispatch();
  const reduxStore = useSelector((state) => state?.getLocationCoordinator);
  const assignedYears = reduxStore?.assignedYears;
  const assignedLocations = reduxStore?.assignedLocations;
  const helpVideos = reduxStore?.helpVideos;
  // const [helpVideos, setHelpVideos] = useState();
  useEffect(() => {
    dispatch(getAllLocationCourse({
      locationId: assignedLocations[0]?.id,
    }));
  }, [assignedLocations]);
  useEffect(() => {
    dispatch(getAssignedLocations());
  }, []);
  useEffect(() => {
    setSelectYear(assignedYears[0]?.id);
    setSelectedLocation(assignedLocations[0]?.id);
  }, []);

  const handleYearDropDownChange = (e) => {
    setSelectYear(e.target.value);
  };

  const handleLocationDromDownChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  useEffect(() => {
    dispatch(getHelpVideos({
      userRole: 'LOCATION_COORDINATOR',
    }));
  }, []);

  const refreshList = () => {
    dispatch(getHelpVideos({
      userRole: 'LOCATION_COORDINATOR',
    }));
  };

  return (
    <div className={classes.gridPadding}>
      <div className={classes.divstule}>
        <Stack sx={{ width: '100%' }} spacing={4}>
          <Grid container flexDirection="row" display="flex" className={classes.divWrapper}>
            <Typography className={classes.headerTitle}>
              {t('HELP_SITE')}
            </Typography>
            <Grid item className={classes.HeaderWrapper}>
              <Dropdown
                id="studentCourse"
                name={t('studentCourse')}
                className={classes.helpSite}
                variant="standard"
                options={assignedYears}
                value={isselectedYear}
                customClass={classes.dropdown}
                changeCss
                customFormControlCss={{ width: '100%' }}
                labelId="studentCourse"
                handleChange={handleYearDropDownChange}
              />
              <Dropdown
                id="studentCourse"
                name={t('studentCourse')}
                className={classes.helpSite}
                variant="standard"
                options={assignedLocations}
                value={isselectedLocation}
                customClass={classes.dropdown}
                changeCss
                customFormControlCss={{ width: '100%' }}
                labelId="studentCourse"
                handleChange={handleLocationDromDownChange}
              />
              {/* <button type="submit" onClick={handleDummy}>dummy</button> */}
              <Stack direction="row" spacing={1} justifyContent="space-between">
                <ToggleButtonGroup
                  value={view}
                  exclusive
                  aria-label="text alignment"
                  // onChange={handleView}
                  className={classes.toggleButtonGrp}
                >
                  <ToggleButton
                    value="listView"
                    aria-label="listView"
                    className={classes.toggleButtonList}
                    onClick={() => setView('listView')}
                  >
                    <ListViewIcon />
                  </ToggleButton>
                  <ToggleButton
                    value="gridView"
                    aria-label="gridView"
                    className={classes.toggleButtonGrid}
                    onClick={() => setView('gridView')}
                  >
                    <GridViewIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Grid>
          </Grid>
          <Grid container className={classes.resourceContainer}>
            {view === 'listView'
              ? (
                <Grid container className={classes.resourcesListView}>

                  <ListView tableData={helpVideos} refreshData={refreshList} />
                </Grid>
              )
              : (
                <Grid container className={classes.resourcesGridView}>
                  <GridView tableData={helpVideos} />
                </Grid>
              )}

          </Grid>
        </Stack>
      </div>
    </div>
  );
}
