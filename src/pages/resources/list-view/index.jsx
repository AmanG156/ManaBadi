import React, { useEffect, useState } from 'react';
import {
  Grid, IconButton, Box, Menu, MenuItem,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { DataGridPro } from '@mui/x-data-grid-pro';

// import FileViewer from 'react-file-viewer';
import DownloadSharpIcon from '@mui/icons-material/DownloadSharp';
import Backdrop from '@mui/material/Backdrop';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import mbTxt from '../../../assets/images/mb_txt_icon.png';
import mbPdf from '../../../assets/images/mb_pdf_icon.png';
import mbPng from '../../../assets/images/mb_png_icon.png';
import defaultIcon from '../../../assets/images/defaultIcon.png';
import {
  DialogAtom, TextField, Button, Datepicker,
} from '../../../components/atoms';
import CheckboxAtom from '../../../components/atoms/checkbox';
import useStyles from '../../../custom-hooks/useStyles';
import styles from '../style';
import userRoles from '../../../constant/userRoles';
import { getLocalStorage } from '../../../utils/localStorageMethod';
import { Buttons } from '../../../constant';
import { CustomUnsortedIcon, CustomAscendingIcon, CustomDescendingIcon } from '../../../utils/commonUiComponent';
import {
  deactivateResource, updateResource, getStudentResourceInFolder, getFolderDetails, getTeacherResource,
} from '../../../store/actions/getResources';

function ShowFiles(props) {
  const { fileType, fileUrl, classes } = props;

  switch (fileType) {
    case 'png':
      return <div style={{ textAlign: 'center' }}><img src={fileUrl} alt={fileUrl} /></div>;
    case 'jpg':
      return <div style={{ textAlign: 'center' }}><img src={fileUrl} alt={fileUrl} /></div>;
    case 'jpeg':
      return <div style={{ textAlign: 'center' }}><img src={fileUrl} alt={fileUrl} /></div>;
    case 'ppt':
      return <div className={classes.fileEmbed}><iframe className={classes.embedStyle} src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`} height={810} width={600} title={fileUrl} /></div>;
    case 'pdf':
      return <div className={classes.fileEmbed}><iframe className={classes.embedStyle} src={fileUrl} height={810} width={600} title={fileUrl} /></div>;
    case 'doc':
      return <div className={classes.fileEmbed}><iframe className={classes.embedStyle} src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}&wdOrigin=BROWSELINK`} height={810} width={600} title={fileUrl} /></div>;
    case 'docx':
      return <div className={classes.fileEmbed}><iframe className={classes.embedStyle} src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}&wdOrigin=BROWSELINK`} height={810} width={600} title={fileUrl} /></div>;
    default:
      return <div className={classes.fileEmbed}><iframe className={classes.embedStyle} src={fileUrl} height={810} width={600} title={fileUrl} /></div>;
  }
}

export default function ListView({
  sortModel,
  onSortModelChange,
  tableData,
  typeResources,
  refreshData,
  selectedResource,
}) {
  const classes = useStyles(styles)();
  const [deactivateDateValue, setDeactivateDateValue] = useState(new Date());
  const [isSetEditFileOpenDialog, setEditFileOpenDialog] = useState(false);
  const [isSetDeactivateFileOpenDialog, setDeactivateFileOpenDialog] = useState(false);
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [isDownload, setIsDownload] = React.useState(false);
  const [resourceName, setResourceName] = React.useState('');
  const userRole = getLocalStorage('userRole');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const actionDots = Boolean(anchorEl);
  const [addfileerror, setAddFileError] = useState('');
  const [dateError, setDateError] = useState('');
  const [selectedRow, setSelectedRow] = useState([]);
  const [isEditedFileName, setEditedFileName] = useState('');
  const [resources, setResources] = useState([]);
  const [ischecked, setIsChecked] = useState(false);

  const icons = {
    png: <img src={mbPng} height="20" alt={t('ICON')} className={classes.fileIcon} />,
    jpg: <img src={mbPng} height="20" alt={t('ICON')} className={classes.fileIcon} />,
    jpeg: <img src={mbPng} height="20" alt={t('ICON')} className={classes.fileIcon} />,
    pdf: <img src={mbPdf} height="20" alt={t('ICON')} className={classes.fileIcon} />,
    Pdf: <img src={mbPdf} height="20" alt={t('ICON')} className={classes.fileIcon} />,
    txt: <img src={mbTxt} height="20" alt={t('ICON')} className={classes.fileIcon} />,
    webm: <img src={mbTxt} height="20" alt={t('ICON')} className={classes.fileIcon} />,
    doc: <img src={mbTxt} height="20" alt={t('ICON')} className={classes.fileIcon} />,
    docx: <img src={mbTxt} height="20" alt={t('ICON')} className={classes.fileIcon} />,
    ppt: <img src={mbTxt} height="20" alt={t('ICON')} className={classes.fileIcon} />,
    mp4: <img src={mbTxt} height="20" alt={t('ICON')} className={classes.fileIcon} />,
    mp3: <img src={mbTxt} height="20" alt={t('ICON')} className={classes.fileIcon} />,
    Mp3: <img src={mbTxt} height="20" alt={t('ICON')} className={classes.fileIcon} />,
  };

  useEffect(() => {
    setResources(tableData);
  }, [tableData]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const [fileType, setFileType] = React.useState(false);
  const [fileUrl, setFileUrl] = React.useState(false);

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
      const type = getFileType(obj.resourceName);
      setFileType(type);
      setFileUrl(obj.fileUrl);
      setIsDownload(obj.canDownload);
      setResourceName(obj?.resourceName);
      setOpen(!open);
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

  const openDeactivateFileDialog = () => {
    setDateError('');
    setDeactivateFileOpenDialog(true);
  };

  const openEditFileDialog = () => {
    setAddFileError('');
    setEditedFileName(selectedRow?.resourceName);
    setIsChecked(selectedRow?.canDownload);
    setEditFileOpenDialog(true);
  };

  const isValidDate = (value) => {
    const val = moment(value).format('yyyy-MM-DD');
    const now = moment().format('yyyy-MM-DD');
    if (moment(val).isBefore(moment(now))) {
      return false;
    }
    return true;
  };

  const deavtivateFile = () => {
    if (isValidDate(deactivateDateValue)) {
      const paylaod = {
        id: selectedRow?.id,
        deactivateDate: deactivateDateValue,
      };
      dispatch(deactivateResource(paylaod));
      setDeactivateFileOpenDialog(false);
      refreshData();
    }
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
      refreshData();
    }
  };

  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
  };

  const renderDeactivateFileContent = () => (
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
          <Datepicker
            className={classes.popupTextField}
            required
            value={deactivateDateValue}
            minDate={new Date()}
            onChange={(newValue) => {
              setDateError('');
              if (!isValidDate(newValue)) {
                setDateError(t('INVALID_DEACTIVATE_DATE'));
              }
              setDeactivateDateValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            id="outlined-required"
            label="Deactivate Date"
          />
        </div>
        <span className={classes.errorText}>{dateError}</span>
      </Box>
      <Grid item xs={12} className={`${classes.dialogButtons} ${classes.popupButton}`}>
        <Button
          className={classes.popupBtn}
          name={t('CANCEL')}
          onClick={() => setDeactivateFileOpenDialog(false)}
          btntype={Buttons.SECONDARY}
        />
        <Button
          className={classes.popupBtn}
          name={t('DEACTIVATE')}
          btntype={Buttons.PRIMARY}
          onClick={() => deavtivateFile()}
        />
      </Grid>
    </Grid>
  );
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
              setAddFileError('');
              if (e.target.value === '') {
                setAddFileError(t('FILE_NAME_CANNOT_BE_EMPTY'));
              }
              setEditedFileName(e.target.value);
            }}
            defaultValue="BalaBadi-I"
          />
        </div>
        <span className={classes.errorText}>{addfileerror}</span>
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
        <Button
          className={classes.popupBtn}
          name={t('CANCEL')}
          onClick={() => setEditFileOpenDialog(false)}
          btntype={Buttons.SECONDARY}
        />
        <Button
          className={classes.popupBtn}
          name={t('UPDATE')}
          btntype={Buttons.PRIMARY}
          onClick={() => editFile()}
        />
      </Grid>
    </Grid>
  );

  const columns = [
    {
      field: 'resourceName',
      headerName: t('FILE_NAME'),
      sortable: true,
      renderCell: (params) => (
        <Tooltip title={`${params.formattedValue}`}>
          <Grid display="flex" onClick={() => handleToggle(params.row)}>

            {
              params?.row?.fileIcon === '' || params?.row?.fileIcon === null
                ? icons[String(getFileType(params?.formattedValue))]
                : <img src={params?.row?.fileIcon ? defaultIcon : params?.row?.fileIcon} height="20" alt={t('ICON')} className={classes.fileIcon} />
            }

            <Typography>{params.formattedValue}</Typography>
          </Grid>
        </Tooltip>
      ),
      headerClassName: (userRole === userRoles.SUPER_ADMIN) ? 'fileNameHeader' : 'fileNameHeaderLC',
      cellClassName: (userRole === userRoles.SUPER_ADMIN) ? 'fileNameCell' : 'fileNameCellLC',
    },
    {
      field: 'createdAt',
      headerName: t('CREATED_ON'),
      align: 'left',
      renderCell: (params) => (
        <Grid display="flex">
          <Typography>{moment(params?.row?.createdAt).format('MMM DD, YYYY HH:mm:ss a')}</Typography>
        </Grid>
      ),
      headerClassName: 'dateCreatedHeader',
      cellClassName: 'dateCreatedCell',

    },
    {
      field: 'createdBy',
      headerName: t('CREATED_BY'),
      align: 'left',
      headerClassName: (userRole === userRoles.SUPER_ADMIN) ? 'createdByHeader' : 'createdByHeaderLC',
      cellClassName: (userRole === userRoles.SUPER_ADMIN) ? 'createdByCell' : 'createdByCellLC',
      renderCell: (params) => (
        <Grid display="flex">
          <Typography>{`${params?.row?.createdUser?.firstName} ${params?.row?.createdUser?.lastName}`}</Typography>
        </Grid>
      ),
    },
    {
      field: 'updatedAt',
      headerName: t('MODIFIED_ON'),
      align: 'left',
      headerAlign: 'left',
      renderCell: (params) => (
        <Grid display="flex">
          <Typography>{moment(params?.row?.updatedAt).format('MMM DD, YYYY HH:mm:ss a')}</Typography>
        </Grid>
      ),
      headerClassName: 'dateModifiedHeader',
      cellClassName: 'dateModifiedCell',
    },
    {
      field: 'updatedBy',
      headerName: t('MODIFIED_BY'),
      align: 'left',
      headerAlign: 'left',
      headerClassName: (userRole === userRoles.SUPER_ADMIN) ? 'modifiedByHeader' : 'modifiedByHeaderLC',
      cellClassName: (userRole === userRoles.SUPER_ADMIN) ? 'modifiedByCell' : 'modifiedByCellLC',
      renderCell: (params) => (
        <Grid display="flex">
          <Typography>{`${params?.row?.updatedUser?.firstName} ${params?.row?.updatedUser?.lastName}`}</Typography>
        </Grid>
      ),
    },
    {
      field: 'fileSize',
      headerName: t('SIZE'),
      align: 'left',
      headerAlign: 'left',
      headerClassName: 'fileSizeHeader',
      cellClassName: 'fileSizeCell',
    },
    {
      field: 'actions',
      headerName: t('ACTIONS'),
      sortable: false,
      headerAlign: 'center',
      align: 'left',
      headerClassName: 'actionHeader',
      cellClassName: 'actionCell',
      hide: (userRole !== userRoles.SUPER_ADMIN),
      renderCell: (params) => (
        <Grid item xs={12} lg={3} display="flex" alignItems="center">
          <Tooltip title={t('EDIT')}>
            <IconButton
              size="large"
              color="inherit"
              onClick={(e) => {
                handleClick(e);
                setSelectedRow(params?.row);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
          <Menu
            className={classes.profileWrapper}
            anchorEl={anchorEl}
            open={actionDots}
            onClose={handleCloseMenu}
            onClick={handleCloseMenu}
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
          >
            <MenuItem
              onClick={() => {
                openEditFileDialog();
              }}
              className={classes.menuItem}
            >
              {t('EDIT')}
            </MenuItem>
            <MenuItem
              onClick={() => {
                openDeactivateFileDialog();
              }}
              className={classes.menuItem}
            >
              {t('DEACTIVATE')}
            </MenuItem>
          </Menu>
        </Grid>
      ),
    },
  ];
  // const file = 'http://techslides.com/demos/sample-videos/small.mp4';
  // const type = 'mp4';
  return (
    <Grid container className={classes.studentDetails}>
      {/* {resourcesData?.length > 0
        ? ( */}
      <DataGridPro
        rows={resources}
        columns={columns}
        autoHeight
        disableColumnFilter
        disableColumnSelector
        disableColumnMenu
        disableColumnResize
        disableSelectionOnClick
        hideFooterRowCount
        hideFooter
        disableColumnReorder
        hideFooterSelectedRowCount
        hideFooterPagination
        className={classes.dataGrid}
        components={{
          ColumnUnsortedIcon: CustomUnsortedIcon,
          ColumnSortedAscendingIcon: CustomAscendingIcon,
          ColumnSortedDescendingIcon: CustomDescendingIcon,
        }}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        pageSize={100}
      />
      {/* ) : (
          <Grid>
            <Loader message={t('LOADING')} />
          </Grid>
        )} */}
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
      <DialogAtom
        isOpen={isSetDeactivateFileOpenDialog}
        dialogHeading={t('DEACTIVATE_FILE')}
        customClass={classes.deactivateFileDialogAtom}
        content={renderDeactivateFileContent()}
        secHandle={() => setDeactivateFileOpenDialog(false)}
      />
    </Grid>
  );
}
