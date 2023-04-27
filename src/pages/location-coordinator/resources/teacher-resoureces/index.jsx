import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Stack, Typography,
} from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ListViewIcon from '../../../../assets/svg/listViewIcon';
import MapPin from '../../../../assets/images/map-pin.png';
import {
  getAllLocationCourse,
  getAssignedLocations,
} from '../../../../store/actions/getLocationCoordinator';
import useStyles from '../../../../custom-hooks/useStyles';
import Dropdown from '../../../../components/atoms/dropdown';
import {
  setLocalStorage,
  // getLocalStorage,
} from '../../../../utils/localStorageMethod';
import styles from '../style';
// import ListView from '../list-view';
// import GridView from '../grid-view';
import ListView from '../../../resources/list-view';
import GridView from '../../../resources/grid-view';
import { getTeacherResource } from '../../../../store/actions/getResources';

export default function ResourcesData() {
  const { t } = useTranslation();
  const classes = useStyles(styles)();
  // const getView = getLocalStorage('myResourceView') || 'gridView';
  const [view, setView] = useState('gridView');
  const [locationData, setLocationData] = useState([]);
  const [isselectedvalue, setSelectedValue] = useState();
  const [isselectedYear, setSelectYear] = useState();
  const [isselectedLocation, setSelectedLocation] = useState();
  const dispatch = useDispatch();
  const reduxStore = useSelector((state) => state?.getLocationCoordinator);
  const assignedLocations = reduxStore?.assignedLocations;
  const locationCourses = reduxStore?.locationCourses;
  const assignedYears = reduxStore?.assignedYears;
  const teacherResource = reduxStore?.teacherResources;

  useEffect(() => {
    setSelectedLocation(assignedLocations[0]?.id);
  }, [assignedLocations]);

  useEffect(() => {
    dispatch(getAllLocationCourse({
      locationId: isselectedLocation,
    }));
    setSelectedLocation(isselectedLocation);
  }, [isselectedLocation]);

  useEffect(() => {
    dispatch(getAssignedLocations());
  }, []);

  const handleChange = (event) => {
    dispatch(getTeacherResource({
      courseId: event.target.value,
    }));
    setSelectedValue(event.target.value);
  };

  const handleAssignyear = (event) => {
    setSelectYear(event.target.value);
  };

  const handlelocation = (event) => {
    setSelectedLocation(event.target.value);
  };

  useEffect(() => {
    setLocationData(locationCourses);
    const currentYear = new Date().getFullYear();
    const pastYear = new Date().getFullYear() + 1;
    const currentAcademicYear = `${currentYear}-${pastYear}`;
    const index = assignedYears.findIndex((cur) => cur.name === currentAcademicYear);
    if (index >= 0) {
      setSelectYear(assignedYears[index]?.id);
    }
    if (locationCourses[0]?.id) {
      const event = {
        target: {
          value: locationCourses[0]?.id,
        },
      };
      handleChange(event);
    }
  }, [locationCourses]);

  const handleView = (event, myResourceView) => {
    if (myResourceView !== null) {
      setView(myResourceView);
    }
  };
  return (
    <div className={classes.gridPadding}>
      <div className={classes.divstule}>
        <Stack sx={{ width: '100%' }} spacing={4}>
          <Grid container flexDirection="row" display="flex" className={`${classes.divWrapper}`}>
            <Grid container item className={classes.titleRow}>
              <Typography className={classes.headerTitle}>
                {t('TEACHER_RESOURCES')}
              </Typography>
            </Grid>
            <Grid item className={classes.HeaderWrapper}>
              <div className={classes.dropdownWrap}>
                <div className={classes.assignyear}>
                  <Dropdown
                    minWidth="145px"
                    id="assignyear"
                    variant="standard"
                    options={assignedYears}
                    value={isselectedYear}
                    customClass={classes.dropdownone}
                    changeCss
                    customFormControlCss={{ width: '180px' }}
                    labelId="assignyear"
                    handleChange={handleAssignyear}
                  />
                </div>
                <div className={classes.location}>
                  <Dropdown
                    // minWidth="100%"
                    id="location"
                    variant="standard"
                    options={assignedLocations}
                    value={isselectedLocation}
                    customClass={classes.dropdown}
                    changeCss
                    customFormControlCss={{ width: '250px' }}
                    labelId="location"
                    handleChange={handlelocation}
                    icon={<img src={MapPin} alt="" className={classes.mapPinImg} />}
                  />
                </div>

                <div className={classes.studentcourse}>
                  <Dropdown
                    minWidth="100%"
                    id="studentCourse"
                    variant="standard"
                    className={classes.helpSite}
                    options={locationData}
                    value={isselectedvalue}
                    customClass={classes.dropdown}
                    changeCss
                    customFormControlCss={{ width: '120px' }}
                    labelId="studentCourse"
                    handleChange={handleChange}
                    icon={<HomeIcon />}
                  />
                </div>
              </div>
              <Stack direction="row" spacing={1} justifyContent="space-between">
                <ToggleButtonGroup
                  value={view}
                  exclusive
                  aria-label="text alignment"
                  onChange={handleView}
                  className={classes.toggleButtonGrp}
                >
                  <ToggleButton
                    value="listView"
                    aria-label="listView"
                    className={classes.toggleList}
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
                  {setLocalStorage('myResourceView', 'listView')}
                  <ListView tableData={teacherResource} />
                </Grid>
              )
              : (
                <Grid container className={classes.resourcesGridView}>
                  {setLocalStorage('myResourceView', 'gridView')}
                  <GridView data={teacherResource} />
                </Grid>
              )}
          </Grid>
        </Stack>
      </div>
    </div>
  );
}
