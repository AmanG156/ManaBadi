import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Grid, Box,
  Typography,
  CardActionArea,
  Tooltip,
  TextField,
} from '@mui/material';
import Card from '@mui/material/Card';
import Backdrop from '@mui/material/Backdrop';
import CardContent from '@mui/material/CardContent';
// import FileViewer from 'react-file-viewer';
import { useDispatch } from 'react-redux';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DownloadSharpIcon from '@mui/icons-material/DownloadSharp';
import CheckboxAtom from '../../../components/atoms/checkbox';
import mbPng from '../../../assets/images/mb_png_icon.png';
import mbPdf from '../../../assets/images/mb_pdf_icon.png';
import mbTxt from '../../../assets/images/mb_txt_icon.png';
import useStyles from '../../../custom-hooks/useStyles';
import styles from '../style';
import defaultIcon from '../../../assets/images/defaultIcon.png';
import { DialogAtom } from '../../../components/atoms';
import { Buttons } from '../../../constant';
import {
  updateResource, getStudentResourceInFolder, getFolderDetails,
  getTeacherResource,
} from '../../../store/actions/getResources';
import { getLocalStorage } from '../../../utils/localStorageMethod';
import userRoles from '../../../constant/userRoles';
import ButtonAtom from '../../../components/atoms/button';

function ShowFiles(props) {
  const { fileType, fileUrl, classes } = props;

  switch (fileType) {
    case 'png':
      return <img src={fileUrl} alt={fileUrl} />;
    case 'jpg':
      return <img src={fileUrl} alt={fileUrl} />;
    case 'jpeg':
      return <img src={fileUrl} alt={fileUrl} />;
    case 'ppt':
      return <div className={classes.fileEmbed}><iframe className={classes.embedStyle} src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`} height={810} width={600} title={fileUrl} /></div>;
    case 'pdf':
      return <div className={classes.fileEmbed}><iframe className={classes.embedStyle} src={fileUrl} height={810} width={600} title={fileUrl} /></div>;
    case 'doc':
      return <div className={classes.fileEmbed}><iframe className={classes.embedStyle} src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}&wdOrigin=BROWSELINK`} height={810} width={600} title={fileUrl} /></div>;
    case 'docx':
      return <div className={classes.fileEmbed}><iframe className={classes.embedStyle} src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}&wdOrigin=BROWSELINK`} height={810} width={600} title={fileUrl} /></div>;
    case 'mp4':
      return <div className={classes.divVideo}><iframe className={classes.responsiveIframe} src={fileUrl} title={fileUrl} width="90%" height="90%" /></div>;
    default:
      return <div className={classes.fileEmbed}><iframe className={classes.embedStyle} src={fileUrl} height={810} width={600} title={fileUrl} /></div>;
  }
}

// react file viewer
export default function ResourcesData({
  data,
  // refreshData,
  typeResources,
  selectedResource,
}) {
  const { t } = useTranslation();
  const classes = useStyles(styles)();
  // const reduxStore = useSelector((state) => state?.getAdmin);
  // const [sampleData, setSampleData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [fileType, setFileType] = React.useState(false);
  const [fileUrl, setFileUrl] = React.useState(false);
  const [isDownload, setIsDownload] = React.useState(false);
  const [resourceName, setResourceName] = React.useState('');
  const [isSetEditFileOpenDialog, setEditFileOpenDialog] = useState(false);
  const [isEditedFileName, setEditedFileName] = useState('');
  const userRole = getLocalStorage('userRole');
  const [resources, setResources] = useState([]);
  const [error, setError] = useState('');
  const [ischecked, setIsChecked] = useState(false);
  // const getStudentResourceInFolderResponse = reduxStore?.studentResourcesByFolder;

  useEffect(() => {
    setResources(data);
  }, [data]);

  const dispatch = useDispatch();
  const handleClose = () => {
    setIsDownload(false);
    setOpen(false);
  };
  const getFileType = (file) => {
    const fileSplit = file?.split('.');
    const { length } = fileSplit;
    const type = fileSplit[length - 1];
    return type;
  };

  const openFolder = (obj) => {
    const payload = {
      courseId: obj.courseId,
      parentKey: obj.selfKey,
    };
    dispatch(getFolderDetails(obj));
    if (obj.resourceKind === 'Student') {
      dispatch(getStudentResourceInFolder(payload));
    } else {
      dispatch(getTeacherResource(payload));
    }
  };
  const handleToggle = (obj) => {
    if (obj.fileType !== 'Folder') {
      const fileSplit = obj.resourceName.split('.');
      const { length } = fileSplit;
      const type = fileSplit[length - 1];
      setFileType(type);
      setFileUrl(obj.fileUrl);
      setIsDownload(obj.canDownload);
      setResourceName(obj?.resourceName);
      setOpen(!open);
      // selectedResource([]);
    } else {
      openFolder(obj);
      selectedResource(obj);
    }
  };

  const downloadFile = () => {
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = resourceName;
        link.click();
      });
  };

  const icons = {
    png: <img src={mbPng} height="40" alt={t('ICON')} />,
    jpg: <img src={mbPng} height="40" alt={t('ICON')} />,
    jpeg: <img src={mbPng} height="20" alt={t('ICON')} />,
    pdf: <img src={mbPdf} height="40" alt={t('ICON')} />,
    Pdf: <img src={mbPdf} height="40" alt={t('ICON')} />,
    txt: <img src={mbTxt} height="40" alt={t('ICON')} />,
    webm: <img src={mbTxt} height="40" alt={t('ICON')} />,
    doc: <img src={mbTxt} height="40" alt={t('ICON')} />,
    docx: <img src={mbTxt} height="40" alt={t('ICON')} />,
    ppt: <img src={mbTxt} height="40" alt={t('ICON')} />,
    mp4: <img src={mbTxt} height="40" alt={t('ICON')} />,
    mp3: <img src={mbTxt} height="40" alt={t('ICON')} />,
    Mp3: <img src={mbTxt} height="40" alt={t('ICON')} />,
  };

  const [selectedRow, setSelectedRow] = useState([]);

  const openEditFileDialog = () => {
    setError('');
    setEditFileOpenDialog(true);
  };

  const editFile = () => {
    if (isEditedFileName !== '') {
      const paylaod = {
        canDownload: ischecked,
        id: selectedRow?.id,
        courseId: selectedRow?.courseId,
        resourceName: isEditedFileName,
      };
      dispatch(updateResource(paylaod, typeResources));
      setEditFileOpenDialog(false);
      // refreshData();
    }
  };

  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
  };
  const renderEditFileContent = () => (
    <Grid>
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
            value={isEditedFileName}
            onChange={(e) => {
              setError('');
              if (e.target.value === '') {
                setError(t('FILE_NAME_CANNOT_BE_EMPTY'));
              }
              setEditedFileName(e.target.value);
            }}
            defaultValue="BalaBadi-I"
          />
        </div>
        <span className={classes.errorText}>{error}</span>
        <div className={classes.checkbox}>
          <CheckboxAtom
            label={t('USER_DOWNLOAD')}
            id="acceptCheckbox"
            checked={ischecked}
            handleChange={(e) => handleCheck(e)}
          />
        </div>
      </Box>
      <Grid item xs={12} className={`${classes.dialogButtons} ${classes.popupButton}`}>
        <ButtonAtom
          className={classes.popupBtn}
          name={t('CANCEL')}
          onClick={() => setEditFileOpenDialog(false)}
          btntype={Buttons.SECONDARY}
        />
        <ButtonAtom
          className={classes.popupBtn}
          name={t('UPDATE')}
          onClick={() => editFile()}
          btntype={Buttons.PRIMARY}
        />
      </Grid>
    </Grid>
  );

  return (
    <Box>

      <Grid container spacing={2} className={classes.resourceGrid}>
        {resources.map((obj) => (
          //   <Grid item lg={2} xs={6} md={3} className={classes.alignResourceGrid}>
          // {data.map((obj) => (
          <Grid item lg={2} xs={12} md={3} className={classes.alignResourceGrid}>
            <Card className={classes.resourcesCard}>
              <CardActionArea className={classes.resourceGridCardImg} onClick={() => handleToggle(obj)}>
                <Grid lg={2} xs={12} md={3} className={classes.resourceGridCard}>
                  {
                    obj?.fileIcon === '' || obj?.fileIcon === null
                      ? icons[String(getFileType(obj?.resourceName))]
                      : <img src={obj?.fileIcon ? defaultIcon : obj?.fileIcon} height="40" alt={t('ICON')} />
                  }
                </Grid>
              </CardActionArea>
              <Tooltip title={`${obj.resourceName}`}>
                <CardContent className={classes.resourceName}>
                  {userRole === userRoles.SUPER_ADMIN ? (
                    <>
                      <Typography className={classes.fileNameStyle}>
                        {obj.resourceName}
                      </Typography>
                      <EditOutlinedIcon onClick={() => {
                        setSelectedRow(obj);
                        setEditedFileName(obj?.resourceName);
                        setIsChecked(obj?.canDownload);
                        openEditFileDialog();
                      }}
                      />
                    </>
                  ) : (
                    <Typography className={classes.fileNameStyle}>
                      {obj.resourceName}
                    </Typography>
                  )}
                </CardContent>
              </Tooltip>
            </Card>
          </Grid>
        ))}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <div className={classes.fileViewer}>
            <div>
              {isDownload
                && (
                  <div className={classes.fileDownload}>
                    <DownloadSharpIcon onClick={(e) => { e.stopPropagation(); downloadFile(); }} />
                  </div>
                )}
              <ShowFiles fileType={fileType} fileUrl={fileUrl} classes={classes} />
            </div>
          </div>
        </Backdrop>
        <DialogAtom
          isOpen={isSetEditFileOpenDialog}
          dialogHeading={t('EDIT_FILE')}
          customClass={classes.editFileDialogAtom}
          content={renderEditFileContent()}
          secHandle={() => setEditFileOpenDialog(false)}
        />
      </Grid>
    </Box>
  );
}
