import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  // IconButton,
  Typography,
  Stack,
  Menu, MenuItem,
} from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
import GridViewIcon from '@mui/icons-material/GridView';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import { uploadHelpVideo, uploadVideo, getHelpVideos } from '../../../store/actions/getResources';
import ButtonAtom from '../../../components/atoms/button';
import { Buttons } from '../../../constant';
import { DialogAtom } from '../../../components/atoms';
import ListViewIcon from '../../../assets/svg/listViewIcon';
import useStyles from '../../../custom-hooks/useStyles';
import Dropdown from '../../../components/atoms/dropdown';
import { getLocalStorage } from '../../../utils/localStorageMethod';
import CheckboxAtom from '../../../components/atoms/checkbox';
import { getAssignedLocations, getAllLocationCourse } from '../../../store/actions/getLocationCoordinator';
import styles from './style';
import userRoles from '../../../constant/userRoles';
import GridView from './grid-view';
import ListView from './list-view';
import { GetWithDeactivatedFiles, GetWithoutDeactivatedFiles } from '../resources/helper';

export default function HelpSite() {
  const { t } = useTranslation();
  const classes = useStyles(styles)();
  const getView = getLocalStorage('myView') ? getLocalStorage('myView') : 'gridView';
  const [view, setView] = useState(getView);
  const [isselectedYear, setSelectYear] = useState();
  const [issetUploadVOpenDialog, setUploadVideoOpenDialog] = useState(false);
  const [issetUploadVideoSize, setUploadVideoSize] = useState();
  const [issetUploadVideoName, setUploadVideoName] = useState('');
  const [issetUploadVideoExt, setUploadVideoExt] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [issetUploadVideo, setUploadVideo] = useState({});
  // const [isVideoUrl, setVideoUrl] = useState('');
  const [isselectedLocation, setSelectedLocation] = useState();
  // const [isFormData, setFormData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const userRole = getLocalStorage('userRole');
  const dispatch = useDispatch();
  const reduxStore = useSelector((state) => state?.getLocationCoordinator);
  const assignedYears = reduxStore?.assignedYears;
  const assignedLocations = reduxStore?.assignedLocations;
  const helpVideos = reduxStore?.helpVideos;
  const uploadVideoResponse = reduxStore?.uploadVideo;
  const [resources, setResources] = useState([]);
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

  useEffect(() => {
    // console.log(uploadVideoResponse);
    if (uploadVideoResponse?.message) {
      const payload = {
        name: uploadVideoResponse?.resourceName,
        url: uploadVideoResponse?.url,
        type: 'LOCATION_COORDINATOR',
        size: uploadVideoResponse?.fileSize,
      };
      // console.log(uploadVideoResponse?.fileSize);
      dispatch(uploadHelpVideo(payload));
    }
    dispatch(getHelpVideos({
      userRole: 'LOCATION_COORDINATOR',
    }));
  }, [uploadVideoResponse?.message]);

  const refreshList = () => {
    dispatch(getHelpVideos({
      userRole: 'LOCATION_COORDINATOR',
    }));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddvideo = () => {
    const videonames = `${issetUploadVideoName}.${issetUploadVideoExt}`;
    const formData = new FormData();
    formData.append('video', issetUploadVideo, videonames);
    dispatch(uploadVideo(formData));
  };

  const renderUploadVideoContent = () => (
    <Grid className={classes.addDialog}>
      {uploadVideoResponse?.message && (
        <Grid>
          <div className={classes.alertprimary} role="alert">
            {uploadVideoResponse?.message}
          </div>
        </Grid>
      )}
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            className={classes.popupTextField}
            required
            id="outlined-required"
            label="File Name"
            value={issetUploadVideoName}
            onChange={(e) => setUploadVideoName(e.target.value)}
            defaultValue="BalaBadi-I"
          />
        </div>
        <div className={classes.checkbox}>
          <CheckboxAtom
            label={t('USER_DOWNLOAD')}
            id="acceptCheckbox"
          />
        </div>
      </Box>
    </Grid>
  );

  const footerVideoSize = () => (
    <Grid>
      <div>
        <p className={classes.dialogfooter}>
          {t('FILE_SIZE')}
          &nbsp;
          :
          &nbsp;
          {issetUploadVideoSize}
          &nbsp;
          MB
        </p>
      </div>
      <Grid item xs={12} className={`${classes.dialogButtons} ${classes.popupButton}`}>
        <ButtonAtom
          className={classes.popupBtn}
          name={t('CANCEL')}
          onClick={() => {
            setUploadVideoOpenDialog(false);
            dispatch({
              type: 'UPLOAD_VIDEO',
              payload: [],
            });
          }}
          btntype={Buttons.SECONDARY}
        />
        <ButtonAtom
          className={classes.popupBtn}
          name={t('UPLOAD')}
          onClick={handleAddvideo}
          btntype={Buttons.PRIMARY}
        />
        {/* <ButtonAtom
          className={classes.popupBtn}
          name={t('DUMMY')}
          onClick={() => console.log(issetUploadVideoName, isVideoUrl, issetUploadVideoSize)}
          btntype={Buttons.PRIMARY}
        /> */}
      </Grid>
    </Grid>
  );

  const [issetSelectVideoFromDriveOpenDialog, setSelectVideoFromDriveOpenDialog] = useState(false);
  const [issetSelectVideoFromDriveFile, setSelectVideoFromDriveFile] = useState();
  const [issetSelectVideoFromDrive, setSelectVideoFromDrive] = useState([]);
  const [disabledCheck, setDisabledCheck] = useState(false);
  const [isVideochecked, setIsVideoChecked] = useState(false);

  const handleVideoCheck = (e) => {
    setIsVideoChecked(e.target.checked);
  };

  const getVideo = (callback) => {
    const gettoken = getLocalStorage('accessToken');
    const baseUrl = JSON.parse(gettoken);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.googleapis.com/drive/v3/files?pageSize=1000&supportAllDrives=false&includeItemsFromAllDrives=false&q="root" in parents');
    xhr.setRequestHeader('Authorization', `Bearer ${baseUrl?.access_token}`);
    xhr.onload = () => {
      callback(xhr.responseText);
    };
    xhr.onerror = () => {
      callback(null);
    };
    xhr.send();
  };

  const handleSelectVideoFromDriveDialog = () => {
    setSelectVideoFromDriveOpenDialog(true);
    getVideo((e) => {
      const fileData = JSON.parse(e).files;
      const mineType = fileData.filter(
        (item) => item.mimeType === 'video/mp4',
      );
      setSelectVideoFromDrive(mineType);
    });
  };

  const handleSelectVideoFromDrive = () => {
    const formData = new FormData();
    formData.append('video', issetSelectVideoFromDriveFile);
    dispatch(uploadVideo(formData));
  };

  const onChangeValue = (e, obj, callback) => {
    setDisabledCheck(true);
    const fileId = e.target.value;
    const gettoken = getLocalStorage('accessToken');
    const baseUrl = JSON.parse(gettoken);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${baseUrl?.access_token}`);
    // xhr.responseType = 'arraybuffer';
    xhr.responseType = 'blob';
    xhr.onload = () => {
      try {
        const filedata = new Blob([xhr.response], { type: obj?.mimeType });
        const file = new File([filedata], obj?.name.replace(/ /g, '_'));
        // setSelectVideoFromDriveFile(file);
        callback(file);
      } catch (err) {
        callback(null);
      }
    };
    xhr.onerror = () => {
      callback(null);
    };
    xhr.send();
  };

  const renderSelectVideoFromDriveContent = () => (
    <Grid>
      {uploadVideoResponse?.message && (
        <Grid>
          <div className={classes.alertprimary} role="alert">
            {uploadVideoResponse?.message}
          </div>
        </Grid>
      )}
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          {issetSelectVideoFromDrive?.map((obj) => (
            <div className={classes.popupTextField}>
              <input
                disabled={disabledCheck}
                type="radio"
                value={obj?.id}
                name="name"
                onChange={(e) => onChangeValue(e, obj, (file) => {
                  if (file) {
                    setSelectVideoFromDriveFile(file);
                    setDisabledCheck(false);
                  }
                })}
              />
              {obj?.name.replace(/ /g, '_')}
            </div>
          ))}
        </div>
        <div style={{ paddingTop: '21px' }}>
          <CheckboxAtom
            label={t('USER_DOWNLOAD')}
            id="acceptCheckbox"
            checked={isVideochecked}
            handleChange={(e) => handleVideoCheck(e)}
          />
        </div>
      </Box>
      <Grid item xs={12} className={`${classes.dialogButtons} ${classes.popupButton}`}>
        <div>
          <ButtonAtom
            className={classes.popupBtn}
            name={t('CANCEL')}
            onClick={() => {
              setSelectVideoFromDriveOpenDialog(false);
              dispatch({
                type: 'UPLOAD_VIDEO',
                payload: [],
              });
            }}
            btntype={Buttons.SECONDARY}
          />
        </div>
        <div className={issetSelectVideoFromDriveFile ? classes.popupBtn : classes.popupBtnDisable}>
          <ButtonAtom
            name={t('ADD')}
            onClick={handleSelectVideoFromDrive}
            btntype={Buttons.PRIMARY}
          />
        </div>
      </Grid>
    </Grid>
  );

  useEffect(() => {
    setResources(new GetWithoutDeactivatedFiles(helpVideos));
  }, [helpVideos]);

  const [isDeactivateChecked, setDeactivateChecked] = useState(false);
  const fetchDeactivatedFiles = () => {
    setDeactivateChecked(!isDeactivateChecked);
    if (isDeactivateChecked) {
      setResources(new GetWithoutDeactivatedFiles(helpVideos));
    } else {
      setResources(new GetWithDeactivatedFiles(helpVideos));
    }
  };

  return (
    <div className={classes.gridPadding}>
      <div className={classes.divstule}>
        <Stack sx={{ width: '100%' }} spacing={4}>

          <Grid container flexDirection="row" display="flex" className={classes.divWrapper}>
            {/* <Typography className={classes.headerTitle}>
          {t('HELP_SITE')}
        </Typography> */}
            {/* <button type="submit" onClick={() => console.log(assignedYears)}>dummy</button> */}
            <Grid container>
              <Grid container item className={classes.titleRow}>
                <Grid item>
                  <Typography className={classes.headerTitle}>
                    {t('HELP_SITE')}
                  </Typography>
                </Grid>
                {
                  userRole === userRoles.SUPER_ADMIN
                  && (
                    <Grid>
                      <ButtonAtom
                        className={classes.addbutton}
                        name={t('ADD')}
                        btntype={Buttons.PRIMARY}
                        type={Buttons.PRIMARY}
                        onClick={handleClick}
                        icon={<AddIcon />}
                      />
                    </Grid>
                  )
                }
                <Menu
                  className={classes.Menubox}
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  // onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 1px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiMenuItem-root': {
                        borderBottom: '0.1vw solid #d0d0d0',
                        '@media (min-width: 1200px)': {
                          padding: '1vw',
                          fontSize: '0.9vw',
                        },
                        borderRadius: '0vw',
                        display: 'list-item',
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >

                  <MenuItem
                    variant="contained"
                    component="label"
                  >
                    {t('UPLOADVIDEO')}
                    <input
                      type="file"
                      accept=".mp4,.mp3,audio/*"
                      hidden
                      onChange={(e) => {
                        const videosize = (e.target.files[0].size / (1024 * 1024)).toFixed(2);
                        setUploadVideoSize(parseFloat(videosize));
                        setUploadVideo(e.target.files[0]);
                        const video = (e.target.files[0].name);
                        const videoName = video.split('.');
                        setUploadVideoExt(videoName[1]);
                        setUploadVideoName(videoName[0]);
                        setUploadVideoOpenDialog(true);
                        handleClose();
                      }}
                    />
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleSelectVideoFromDriveDialog();
                      handleClose();
                    }}
                    onClose={handleClose}
                  >
                    {t('SELECT_VIDEO_FROM_DRIVE')}
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>
            <DialogAtom
              isOpen={issetUploadVOpenDialog}
              dialogHeading={t('UPLOADVIDEO')}
              customClass={classes.passwordDialogAtom}
              content={renderUploadVideoContent()}
              secHandle={() => {
                setUploadVideoOpenDialog(false);
                dispatch({
                  type: 'UPLOAD_VIDEO',
                  payload: [],
                });
              }}
              footer={footerVideoSize()}
            />

            <DialogAtom
              isOpen={issetSelectVideoFromDriveOpenDialog}
              dialogHeading={t('SELECT_VIDEO_FROM_DRIVE')}
              customClass={classes.passwordDialogAtom}
              content={renderSelectVideoFromDriveContent()}
              secHandle={() => {
                setSelectVideoFromDriveOpenDialog(false);
                dispatch({
                  type: 'UPLOAD_VIDEO',
                  payload: [],
                });
              }}
            />
            <Grid item className={classes.HeaderWrapper}>
              {
                userRole === userRoles.LOCATION_COORDINATOR
                && (
                  <div className={classes.dropdownWrap}>
                    <div className={classes.studentcourse}>
                      <Dropdown
                        id="studentCourse"
                        name={t('studentCourse')}
                        variant="standard"
                        options={assignedYears}
                        value={isselectedYear}
                        customClass={classes.dropdown}
                        changeCss
                        customFormControlCss={{ width: '100%' }}
                        labelId="studentCourse"
                        handleChange={handleYearDropDownChange}
                      />
                    </div>
                    <div className={classes.location}>
                      <Dropdown
                        id="studentCourse"
                        name={t('studentCourse')}
                        variant="standard"
                        options={assignedLocations}
                        value={isselectedLocation}
                        customClass={classes.dropdown}
                        changeCss
                        customFormControlCss={{ width: '100%' }}
                        labelId="studentCourse"
                        handleChange={handleLocationDromDownChange}
                      />
                    </div>
                  </div>
                )
              }
              {userRole === userRoles.SUPER_ADMIN
                ? (
                  <div className={`${classes.deactiveCheckbox}`}>
                    <CheckboxAtom
                      label={t('VIEW_INACTIVE')}
                      id="acceptCheckbox"
                      checked={isDeactivateChecked}
                      handleChange={() => fetchDeactivatedFiles()}
                    />
                  </div>
                )

                : null}
              {/* <button type="submit" onClick={handleDummy}>dummy</button> */}
              <Stack direction="row" spacing={1} justifyContent="flex-end" className={classes.toggleStack}>
                <div>
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

                </div>
              </Stack>
            </Grid>
          </Grid>
          <Grid container className={classes.resourceContainer}>
            {view === 'listView'
              ? (
                <Grid container className={classes.resourcesListView}>

                  <ListView tableData={resources} refreshData={refreshList} />
                </Grid>
              )
              : (
                <Grid container className={classes.resourcesGridView}>
                  <GridView tableData={resources} refreshData={refreshList} />
                </Grid>
              )}

          </Grid>
        </Stack>
      </div>
    </div>
  );
}
