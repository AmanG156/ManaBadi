import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Stack, Typography, Menu, MenuItem,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import ToggleButton from '@mui/material/ToggleButton';
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/FolderOutlined';
import FileIcon from '@mui/icons-material/AttachFileOutlined';
import VideoIcon from '@mui/icons-material/OndemandVideoOutlined';
import AddToDeiveIcon from '@mui/icons-material/AddToDriveOutlined';
// import CoverPageIcon from '@mui/icons-material/WebOutlined';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ListViewIcon from '../../../../assets/svg/listViewIcon';
import {
  uploadFile,
  uploadVideo,
  createStudentResource,
  getStudentResourceWRTCourse,
} from '../../../../store/actions/getResources';
import { getAllCourses } from '../../../../store/actions/getStudent';
import useStyles from '../../../../custom-hooks/useStyles';
import Dropdown from '../../../../components/atoms/dropdown';
import { DialogAtom } from '../../../../components/atoms';
import { setLocalStorage, getLocalStorage } from '../../../../utils/localStorageMethod';
import styles from '../style';
import ListView from '../../../resources/list-view';
import GridView from '../../../resources/grid-view';
// import { resource, tableData } from '../constants';
import ButtonAtom from '../../../../components/atoms/button';
import { Buttons } from '../../../../constant';
import CheckboxAtom from '../../../../components/atoms/checkbox';
import userRoles from '../../../../constant/userRoles';
import { GetWithDeactivatedFiles, GetWithoutDeactivatedFiles } from '../helper';

export default function ResourcesData() {
  const { t } = useTranslation();
  const classes = useStyles(styles)();
  const dispatch = useDispatch();
  const reduxStore = useSelector((state) => state?.getAdmin);
  const uploadFileResponse = reduxStore?.uploadFile;
  const uploadVideoResponse = reduxStore?.uploadVideo;
  const getStudentResourceInFolderResponse = reduxStore?.studentResourcesByFolder;
  const getCreateStudentResourceError = reduxStore?.createStudentResourceError;
  const createStudentResourceSuccess = reduxStore?.createStudentResource;
  const getFolderDetailsResponse = reduxStore?.folderDetails;
  // const getView = getLocalStorage('myResourceView') || 'gridView';
  const [view, setView] = useState('gridView');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [issetAddFileOpenDialog, setAddFileOpenDialog] = useState(false);
  const [issetAddFolderOpenDialog, setAddFolderOpenDialog] = useState(false);
  const [issetSelectVideoFromDriveOpenDialog, setSelectVideoFromDriveOpenDialog] = useState(false);
  const [issetUploadVOpenDialog, setUploadVideoOpenDialog] = useState(false);
  const [issetUploadVideo, setUploadVideo] = useState({});
  const [issetUploadVideoName, setUploadVideoName] = useState({});
  const [issetUploadVideoExt, setUploadVideoExt] = useState({});
  const [issetUploadFile, setUploadFile] = useState({});
  const [issetUploadFileName, setUploadFileName] = useState({});
  const [issetUploadFileExt, setUploadFileExt] = useState({});
  const [issetSelectVideoFromDrive, setSelectVideoFromDrive] = useState([]);
  // const [issetUploadVideoSize, setUploadVideoSize] = useState();
  const [issetUploadFileSize, setUploadFileSize] = useState();
  const [issetUploadFileSizeMessage, setUploadFileSizeMessage] = useState('');
  const [uploadFileSizeSuccess, setUploadFileSizeSuccess] = useState('');
  const [uploadVideoSizeSuccess, setUploadVideoSizeSuccess] = useState('');
  const [issetUploadVideoSizeMessage, setUploadVideoSizeMessage] = useState('');
  const [issetUploadVideoSize, setUploadVideoSize] = useState();

  const [issetSelectVideoFromDriveFile, setSelectVideoFromDriveFile] = useState();
  const [ischecked, setIsChecked] = useState(false);
  const [isVideochecked, setIsVideoChecked] = useState(false);
  const reduxStudentStore = useSelector((state) => state?.getStudent);
  const assignedCourses = reduxStudentStore?.courses;
  const reduxstudentStore = useSelector((state) => state?.getLocationCoordinator);
  const [studentResource, setStudentResource] = useState([]);
  const [isSelectedvalue, setSelectedValue] = useState('');
  const userRole = getLocalStorage('userRole');
  const [addFileError, setAddFileError] = useState('');
  const [addVideoError, setAddVideoError] = useState('');
  const [isAddFolderName, setAddFolderName] = useState('');
  // const [isParentKey, setParentKey] = useState('');
  const [disabledCheck, setDisabledCheck] = useState(false);
  const [selectedResource, setSelectedResource] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleView = (event, myResourceView) => {
    if (myResourceView !== null) {
      setView(myResourceView);
    }
  };

  useEffect(() => {
    setUploadFileSizeMessage(getCreateStudentResourceError?.msg);
  }, [getCreateStudentResourceError]);

  useEffect(() => {
    setUploadVideoSizeMessage(getCreateStudentResourceError?.msg);
  }, [getCreateStudentResourceError]);

  useEffect(() => {
    setStudentResource(reduxstudentStore?.studentResourceWRT);
  }, [reduxstudentStore?.studentResourceWRT]);

  useEffect(() => {
    setStudentResource(getStudentResourceInFolderResponse.data);
  }, [getStudentResourceInFolderResponse]);

  const refreshList = () => {
    setTimeout(() => {
      const payload = {
        courseId: isSelectedvalue,
        parentKey: selectedResource.selfKey,
      };
      dispatch(getStudentResourceWRTCourse(payload));
    }, 200);
  };

  useEffect(() => {
    dispatch(getAllCourses());
  }, []);

  useEffect(() => {
    if (assignedCourses[0]?.id) {
      setSelectedValue(assignedCourses[0]?.id);
    }
  }, [assignedCourses]);

  useEffect(() => {
    if (isSelectedvalue !== '' && isSelectedvalue !== undefined) {
      const payload = {
        courseId: isSelectedvalue,
        parentKey: selectedResource.selfKey,
      };
      dispatch(getStudentResourceWRTCourse(payload));
    }
  }, [isSelectedvalue]);

  const [resources, setResources] = useState([]);

  useEffect(() => {
    setResources(new GetWithoutDeactivatedFiles(studentResource));
  }, [studentResource]);

  const [isDeactivateChecked, setDeactivateChecked] = useState(false);
  const fetchDeactivatedFiles = () => {
    setDeactivateChecked(!isDeactivateChecked);
    if (isDeactivateChecked) {
      setResources(new GetWithoutDeactivatedFiles(studentResource));
    } else {
      setResources(new GetWithDeactivatedFiles(studentResource));
    }
  };

  useEffect(() => {
    if (uploadFileResponse?.message) {
      if (getFolderDetailsResponse) {
        const payload = {
          canDownload: ischecked,
          courseId: isSelectedvalue,
          fileSize: uploadFileResponse?.fileSize,
          fileType: uploadFileResponse?.fileType,
          fileUrl: uploadFileResponse?.url ? uploadFileResponse?.url.split(' ').join('') : '',
          isCoverPage: true,
          isPublished: true,
          resourceKind: 'student',
          resourceName: uploadFileResponse?.resourceName,
          parentKey: getFolderDetailsResponse.selfKey,
        };
        dispatch(createStudentResource(payload));
      } else {
        const payload = {
          canDownload: ischecked,
          courseId: isSelectedvalue,
          fileSize: uploadFileResponse?.fileSize,
          fileType: uploadFileResponse?.fileType,
          fileUrl: uploadFileResponse?.url ? uploadFileResponse?.url.split(' ').join('') : '',
          isCoverPage: true,
          isPublished: true,
          resourceKind: 'student',
          resourceName: uploadFileResponse?.resourceName,
          // parentKey: 'fa7fea05-146a-40ad-aaa9-f1991b64b118',
        };
        dispatch(createStudentResource(payload));
      }
    }
    if (isSelectedvalue !== '' && isSelectedvalue !== undefined) {
      const payload = {
        courseId: isSelectedvalue,
        parentKey: selectedResource.selfKey,
      };
      dispatch(getStudentResourceWRTCourse(payload));
    }
  }, [uploadFileResponse?.message]);

  useEffect(() => {
    setUploadFileSizeSuccess(uploadFileResponse?.message);
    setTimeout(() => {
      setAddFileOpenDialog(false);
      setUploadFileSizeMessage('');
      setUploadFileSizeSuccess('');
      uploadFileResponse.message = '';
    }, 1000);
  }, [createStudentResourceSuccess]);

  useEffect(() => {
    if (uploadVideoResponse?.message) {
      if (getFolderDetailsResponse) {
        const payload = {
          canDownload: isVideochecked,
          courseId: isSelectedvalue,
          fileSize: uploadVideoResponse?.fileSize,
          fileType: uploadVideoResponse?.fileType,
          fileUrl: uploadVideoResponse?.url ? uploadVideoResponse?.url.split(' ').join('') : '',
          isCoverPage: true,
          isPublished: true,
          resourceKind: 'student',
          resourceName: uploadVideoResponse?.resourceName,
          parentKey: getFolderDetailsResponse.selfKey,
        };
        dispatch(createStudentResource(payload));
      } else {
        const payload = {
          canDownload: isVideochecked,
          courseId: isSelectedvalue,
          fileSize: uploadVideoResponse?.fileSize,
          fileType: uploadVideoResponse?.fileType,
          fileUrl: uploadVideoResponse?.url ? uploadVideoResponse?.url.split(' ').join('') : '',
          isCoverPage: true,
          isPublished: true,
          resourceKind: 'student',
          resourceName: uploadVideoResponse?.resourceName,
        };
        dispatch(createStudentResource(payload));
      }
    }
    if (isSelectedvalue !== '' && isSelectedvalue !== undefined) {
      const payload = {
        courseId: isSelectedvalue,
        parentKey: selectedResource.selfKey,
      };
      dispatch(getStudentResourceWRTCourse(payload));
    }
    // setTimeout(() => {
    //   setUploadVideoOpenDialog(false);
    //   uploadVideoResponse.message = '';
    // }, 1000);
  }, [uploadVideoResponse?.message]);

  useEffect(() => {
    setUploadVideoSizeSuccess(uploadVideoResponse?.message);
    setTimeout(() => {
      setUploadVideoOpenDialog(false);
      setUploadVideoSizeMessage('');
      setUploadVideoSizeSuccess('');
      uploadVideoResponse.message = '';
    }, 1000);
  }, [createStudentResourceSuccess]);

  const handleAddfile = () => {
    if (issetUploadFileName !== '') {
      const filenames = `${issetUploadFileName}.${issetUploadFileExt}`;
      const filenamesScript = filenames.replace(/ /g, '_');
      const formData = new FormData();
      formData.append('file', issetUploadFile, filenamesScript);
      dispatch(uploadFile(formData));
    }
  };

  const handleAddvideo = () => {
    if (issetUploadVideoName !== '') {
      const videonames = `${issetUploadVideoName}.${issetUploadVideoExt}`;
      const filenamesScript = videonames.replace(/ /g, '_');
      const formData = new FormData();
      formData.append('video', issetUploadVideo, filenamesScript);
      dispatch(uploadVideo(formData));
    }
  };

  const handleAddFolder = () => {
    const payload = {
      canDownload: false,
      courseId: isSelectedvalue,
      fileIcon: '',
      fileSize: '',
      fileType: 'Folder',
      fileUrl: '',
      isCoverPage: true,
      isPublished: true,
      resourceKind: 'Student',
      resourceName: isAddFolderName,

    };
    dispatch(createStudentResource(payload));
    setAddFolderOpenDialog(false);
    refreshList();
  };

  const handleSelectVideoFromDrive = () => {
    const formData = new FormData();
    formData.append('video', issetSelectVideoFromDriveFile);
    dispatch(uploadVideo(formData));
  };

  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleVideoCheck = (e) => {
    setIsVideoChecked(e.target.checked);
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

  const renderAddFileContent = () => (
    <Grid className={classes.addDialog}>
      {uploadFileSizeSuccess && (
        <Grid>
          <div className={classes.alertprimary} role="alert">
            {uploadFileSizeSuccess}
          </div>
        </Grid>
      )}
      {/* {issetUploadFileSize > 5 && (
        <Grid>
          <div className={classes.errorPrimary} role="alert">
            {issetUploadFileSizeMessage}
          </div>
        </Grid>
      )} */}
      {issetUploadFileSizeMessage && (
        <Grid>
          <div className={classes.errorPrimary} role="alert">
            {issetUploadFileSizeMessage}
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
            value={issetUploadFileName}
            onChange={(e) => {
              setAddFileError('');
              if (e.target.value === '') {
                setAddFileError(t('FILE_NAME_CANNOT_BE_EMPTY'));
              }
              setUploadFileName(e.target.value);
            }}
            defaultValue="BalaBadi-I"
          />
        </div>
        <span className={classes.errorText}>{addFileError}</span>
        <div className={classes.checkbox}>
          <CheckboxAtom
            label={t('USER_DOWNLOAD')}
            id="acceptCheckbox"
            checked={ischecked}
            handleChange={(e) => handleCheck(e)}
          />
          <p className={classes.dialogfooter}>
            {t('FILE_SIZE')}
            :
            &nbsp;
            {issetUploadFileSize}
            MB
          </p>
        </div>
        <Grid item xs={12} className={`${classes.dialogButtons} ${classes.popupButton}`}>
          <ButtonAtom
            className={classes.popupBtn}
            name={t('CANCEL')}
            onClick={() => {
              setAddFileOpenDialog(false);
              setUploadFileSizeMessage('');
              dispatch({
                type: 'UPLOAD_FILE',
                payload: [],
              });
            }}
            btntype={Buttons.SECONDARY}
          />
          <div className={issetUploadFileSize > 5 ? classes.popupBtnDisable : classes.popupBtn}>
            <ButtonAtom
              name={t('ADD')}
              onClick={handleAddfile}
              btntype={Buttons.PRIMARY}
            />
          </div>
        </Grid>
      </Box>
    </Grid>
  );

  const renderAddFolderContent = () => (
    <Grid className={classes.addDialog}>
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
            label="Folder Name"
            value={isAddFolderName}
            onChange={(e) => setAddFolderName(e.target.value)}
            defaultValue="Lessons"

          />
        </div>
      </Box>
      <Grid item xs={12} className={`${classes.dialogButtons} ${classes.popupButton}`}>
        <ButtonAtom
          className={classes.popupBtn}
          name={t('CANCEL')}
          onClick={() => setAddFolderOpenDialog(false)}
          btntype={Buttons.SECONDARY}
        />
        <ButtonAtom
          className={classes.popupBtn}
          name={t('ADD')}
          btntype={Buttons.PRIMARY}
          onClick={handleAddFolder}
        />
      </Grid>
    </Grid>
  );

  const renderUploadVideoContent = () => (
    <Grid className={classes.addDialog}>
      {uploadVideoSizeSuccess && (
        <Grid>
          <div className={classes.alertprimary} role="alert">
            {uploadVideoSizeSuccess}
          </div>
        </Grid>
      )}
      {/* {issetUploadFileSize > 5 && (
        <Grid>
          <div className={classes.errorPrimary} role="alert">
            {issetUploadFileSizeMessage}
          </div>
        </Grid>
      )} */}
      {issetUploadVideoSizeMessage && (
        <Grid>
          <div className={classes.errorPrimary} role="alert">
            {issetUploadVideoSizeMessage}
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
            onChange={(e) => {
              setAddVideoError('');
              if (e.target.value === '') {
                setAddVideoError(t('FILE_NAME_CANNOT_BE_EMPTY'));
              }
              setUploadVideoName(e.target.value);
            }}
            defaultValue="BalaBadi-I"
          />
        </div>
        <span className={classes.errorText}>{addVideoError}</span>
        <div className={classes.checkbox}>
          <CheckboxAtom
            label={t('USER_DOWNLOAD')}
            id="acceptCheckbox"
            checked={isVideochecked}
            handleChange={(e) => handleVideoCheck(e)}
          />
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
              setUploadVideoSizeMessage('');
              dispatch({
                type: 'UPLOAD_VIDEO',
                payload: [],
              });
            }}
            btntype={Buttons.SECONDARY}
          />
          <div className={issetUploadVideoSize > 50 ? classes.popupBtnDisable : classes.popupBtn}>
            <ButtonAtom
              name={t('UPDATE')}
              onClick={handleAddvideo}
              btntype={Buttons.PRIMARY}
            />
          </div>
        </Grid>
      </Box>
    </Grid>
  );

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

  const handleAddFolderDialog = () => {
    setAddFolderOpenDialog(true);
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

  return (
    <div className={classes.gridPadding}>
      <div className={classes.divstule}>
        <Stack sx={{ width: '100%' }} spacing={4}>
          <Grid container flexDirection="row" display="flex" className={`${classes.divWrapper}`}>
            <Grid container>
              <Grid container item className={classes.titleRow}>
                <Grid item>
                  <Typography className={classes.headerTitle}>
                    {t('STUDNT_RESOURCES')}
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
                    className={`${classes.addFileUpload}`}
                    variant="contained"
                    component="label"
                  >
                    {/* <Button
                      className={`${classes.uploadVideoBtn}`}
                      variant="contained"
                      component="label"
                    > */}
                    <FileIcon />
                    {t('ADDFILE')}
                    <input
                      id="getFile"
                      type="file"
                      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document/,image/*,.pdf,.txt,*"
                      hidden
                      onChange={(e) => {
                        const filesize = (e.target.files[0].size / (1024 * 1024)).toFixed(2);
                        setUploadFileSize(filesize);
                        if (filesize > 5) {
                          setUploadFileSizeMessage('Maximum 5 MB allowed.');
                        }
                        setUploadFile(e.target.files[0]);
                        const file = (e.target.files[0].name);
                        const filename = file.split('.');
                        setUploadFileExt(filename.pop());
                        setUploadFileName(filename[0]);
                        setAddFileOpenDialog(true);
                        setAddVideoError('');
                        setIsChecked(false);
                        handleClose();
                      }}
                    />
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleAddFolderDialog();
                      handleClose();
                    }}
                    onClose={handleClose}
                  >
                    <FolderIcon />
                    {t('ADDFOLDER')}
                  </MenuItem>
                  <MenuItem
                    variant="contained"
                    component="label"
                  >
                    {/* <Button
                      className={`${classes.uploadVideoBtn}`}
                      variant="contained"
                      component="label"
                    > */}
                    <VideoIcon />
                    {t('UPLOADVIDEO')}
                    <input
                      type="file"
                      accept=".mp4,.mp3,audio/*"
                      hidden
                      onChange={(e) => {
                        const videosize = (e.target.files[0].size / (1024 * 1024)).toFixed(2);
                        setUploadVideoSize(videosize);
                        if (videosize > 50) {
                          setUploadVideoSizeMessage('Maximum 50 MB allowed.');
                        }
                        setUploadVideo(e.target.files[0]);
                        const video = (e.target.files[0].name);
                        const videoName = video.split('.');
                        setUploadVideoExt(videoName.pop());
                        setUploadVideoName(videoName[0]);
                        setUploadVideoOpenDialog(true);
                        setAddVideoError('');
                        setIsChecked(false);
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
                    <AddToDeiveIcon />
                    {t('SELECT_VIDEO_FROM_DRIVE')}
                  </MenuItem>
                  {/* <MenuItem>
                    <CoverPageIcon />
                    {t('CREATE_COVER_PAGE')}
                  </MenuItem> */}
                </Menu>
              </Grid>
            </Grid>
            <DialogAtom
              isOpen={issetAddFileOpenDialog}
              dialogHeading={t('ADDFILE')}
              customClass={classes.DialogAtom}
              content={renderAddFileContent()}
              secHandle={() => {
                setAddFileOpenDialog(false);
                setUploadFileSizeMessage('');
                dispatch({
                  type: 'UPLOAD_FILE',
                  payload: [],
                });
              }}
            />
            <DialogAtom
              isOpen={issetAddFolderOpenDialog}
              dialogHeading={t('ADDFOLDER')}
              customClass={classes.DialogAtom}
              content={renderAddFolderContent()}
              secHandle={() => setAddFolderOpenDialog(false)}
            />
            <DialogAtom
              isOpen={issetUploadVOpenDialog}
              dialogHeading={t('UPLOADVIDEO')}
              customClass={classes.DialogAtom}
              content={renderUploadVideoContent()}
              secHandle={() => {
                setUploadVideoOpenDialog(false);
                setUploadVideoSizeMessage('');
                dispatch({
                  type: 'UPLOAD_VIDEO',
                  payload: [],
                });
              }}
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
              <div className={classes.dropdownWrap}>
                <div className={classes.studentcourse}>
                  <Dropdown
                    minWidth="100%"
                    id="studentCourse"
                    className={classes.helpSite}
                    variant="standard"
                    options={assignedCourses}
                    value={isSelectedvalue}
                    customClass={classes.dropdown}
                    changeCss
                    customFormControlCss={{ width: '100%' }}
                    labelId="studentCourse"
                    handleChange={(e) => {
                      setSelectedResource([]);
                      setSelectedValue(e.target.value);
                    }}
                    icon={<HomeIcon />}
                  />
                </div>
                {selectedResource?.resourceName && (
                  <div className={classes.courseData}>
                    <span>
                      <span className={classes.slash}>/</span>
                      {selectedResource?.resourceName}
                    </span>
                  </div>
                )}
              </div>
              {userRole === userRoles.SUPER_ADMIN
                ? (
                  <div className={classes.deactiveCheckbox}>
                    <CheckboxAtom
                      label={t('VIEW_INACTIVE')}
                      id="acceptCheckbox"
                      checked={isDeactivateChecked}
                      handleChange={() => fetchDeactivatedFiles()}
                    />
                  </div>
                )

                : null}
              <Stack direction="row" spacing={1} justifyContent="space-between">
                <ToggleButtonGroup
                  value={view}
                  exclusive
                  aria-label="text alignment"
                  onChange={handleView}
                  className={classes.toggleButtonGrp}
                >
                  {/* <button type="submit" onClick={() => { console.log(getStudentResourceInFolderResponse.data[0].parentKey); }}>dummy</button> */}
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
                  {setLocalStorage('myResourceView', 'listView')}
                  <ListView tableData={resources} typeResources="student" refreshData={refreshList} selectedResource={setSelectedResource} />
                </Grid>
              )
              : (
                <Grid container className={classes.resourcesGridView}>
                  {setLocalStorage('myResourceView', 'gridView')}
                  <GridView data={resources} typeResources="student" refreshData={refreshList} selectedResource={setSelectedResource} />
                </Grid>
              )}
          </Grid>
        </Stack>
      </div>
    </div>
  );
}
