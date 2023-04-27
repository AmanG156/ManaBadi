import React, { useState } from 'react';
import {
  Grid, IconButton, Box, Menu, MenuItem, Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import moment from 'moment';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useTranslation } from 'react-i18next';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Typography from '@mui/material/Typography';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import Tooltip from '@mui/material/Tooltip';
import { DataGridPro } from '@mui/x-data-grid-pro';

import FileViewer from 'react-file-viewer';
import Backdrop from '@mui/material/Backdrop';
import {
  DialogAtom, TextField, Button, Datepicker,
} from '../../../../components/atoms';
import useStyles from '../../../../custom-hooks/useStyles';
import styles from '../../../resources/style';
import userRoles from '../../../../constant/userRoles';
import { getLocalStorage } from '../../../../utils/localStorageMethod';
import { Buttons } from '../../../../constant';
// import { tableData } from '../constant';

// import Loader from '../../../components/atoms/loader';
import { CustomUnsortedIcon, CustomAscendingIcon, CustomDescendingIcon } from '../../../../utils/commonUiComponent';
// import PerformantTextField from '../../../../components/atoms/PerformantTextField';
import { updateHelpVideo, deactivateHelpVideos } from '../../../../store/actions/getResources';

export default function ListView({
  sortModel,
  onSortModelChange,
  tableData,
  refreshData,
}) {
  const classes = useStyles(styles)();
  const [deactivateDateValue, setDeactivateDateValue] = useState(new Date());
  const [isSetEditFileOpenDialog, setEditFileOpenDialog] = useState(false);
  const [isSetDeactivateFileOpenDialog, setDeactivateFileOpenDialog] = useState(false);
  const [dateError, setDateError] = useState('');
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const userRole = getLocalStorage('userRole');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const actionDots = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [fileType, setFileType] = useState(false);
  const [fileUrl, setFileUrl] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = (rowCell) => {
    const fileSplit = rowCell.row.name.split('.');
    const { length } = fileSplit;
    const type = fileSplit[length - 1];
    setFileType(type);
    setFileUrl(rowCell.row.url);
    setOpen(!open);
  };

  const [selectedRow, setSelectedRow] = useState([]);
  const [isEditedFileName, setEditedFileName] = useState('');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const grabVideoDetails = async (row) => {
    try {
      const curRow = await row;

      return setSelectedRow(curRow);
    } catch (err) {
      // console.log(err);
      return Promise.reject(err);
    }
  };

  const openEditFileDialog = () => {
    setEditedFileName(selectedRow.row.name);
    setEditFileOpenDialog(true);
  };
  const editFile = () => {
    const callback = () => {
      refreshData();
    };
    const paylaod = {
      id: selectedRow?.row?.id,
      name: isEditedFileName,
    };
    dispatch(updateHelpVideo(paylaod, callback));
    setEditFileOpenDialog(false);
  };

  const isValidDate = (value) => {
    const val = moment(value).format('yyyy-MM-DD');
    const now = moment().format('yyyy-MM-DD');
    if (moment(val).isBefore(moment(now))) {
      return false;
    }
    return true;
  };

  const openDeactivateFileDialog = () => {
    setDateError('');
    setDeactivateFileOpenDialog(true);
  };

  const deactivateFile = () => {
    const callback = () => {
      refreshData();
    };
    if (isValidDate(deactivateDateValue)) {
      const paylaod = {
        id: selectedRow?.row?.id,
        deactivateDate: deactivateDateValue,
      };
      dispatch(deactivateHelpVideos(paylaod, callback));
      setDeactivateFileOpenDialog(false);
    }
    // console.log(selectedRow.row);
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
          onClick={() => deactivateFile()}
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
            onChange={(e) => setEditedFileName(e.target.value)}
            defaultValue="BalaBadi-I"
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
          name={t('EDIT')}
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
      sortable: false,
      renderCell: (rowCell) => (
        <Grid display="flex" onClick={() => handleToggle(rowCell)}>

          {/* <Typography>{`${rowCell.row.file}`}</Typography> */}
          <span>

            <OndemandVideoOutlinedIcon sx={{ color: '#1034ad' }} />
          </span>
          <span>

            {`${rowCell.row.name}`}
          </span>
        </Grid>
      ),
      headerClassName: 'fileNameHeader',
      cellClassName: 'fileNameCell',
    },

    {
      field: 'createdAt',
      headerName: t('CREATED_ON'),
      align: 'left',
      headerClassName: 'dateCreatedHeader',
      cellClassName: 'dateCreatedCell',

    },
    {
      field: 'createdBy',
      headerName: t('CREATED_BY'),
      align: 'left',
      headerClassName: 'createdByHeader',
      cellClassName: 'createdByCell',
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
      headerClassName: 'dateModifiedHeader',
      cellClassName: 'dateModifiedCell',
      renderCell: (params) => (
        <Grid display="flex">
          <Typography>{moment(params?.row?.updatedAt).format('MMM DD, YYYY HH:mm:ss a')}</Typography>
        </Grid>
      ),
    },
    {
      field: 'updatedBy',
      headerName: t('MODIFIED_BY'),
      align: 'left',
      headerAlign: 'left',
      headerClassName: 'modifiedByHeader',
      cellClassName: 'modifiedByCell',
      renderCell: (params) => (
        <Grid display="flex">
          <Typography>{`${params?.row?.updatedUser?.firstName || ''} ${params?.row?.updatedUser?.lastName || ''}`}</Typography>
        </Grid>
      ),
    },
    {
      field: 'size',
      headerName: t('FILE_SIZE'),
      align: 'left',
      headerAlign: 'left',
      headerClassName: 'fileSizeHeader',
      cellClassName: 'fileSizeCell',
    },
  ];

  if (userRole === userRoles.SUPER_ADMIN) {
    columns.push(
      {
        field: 'actions',
        headerName: t('ACTIONS'),
        sortable: false,
        headerAlign: 'center',
        align: 'left',
        headerClassName: 'actionHeader',
        cellClassName: 'actionCell',
        renderCell: (row) => (
          <Grid item xs={12} lg={3} display="flex" alignItems="center">
            <Tooltip title={t('EDIT')}>
              <IconButton
                size="large"
                color="inherit"
                // onClick={handleClick}
                onClick={handleClick}
              >
                <MoreVertIcon onClick={() => grabVideoDetails(row)} />
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
                    padding: '1vw',
                    fontSize: '0.9vw',
                    borderRadius: '0vw',
                    display: 'list-item',

                  },
                },
              }}
            >
              <MenuItem
                // onClick={() => console.log(row)}
                onClick={openEditFileDialog}
                className={classes.menuItem}
              >
                {t('EDIT')}
              </MenuItem>
              <MenuItem
                onClick={() => openDeactivateFileDialog()}
                className={classes.menuItem}
              >
                {t('DEACTIVATE')}
              </MenuItem>
            </Menu>
          </Grid>
        ),
      },
    );
  }

  return (
    <Grid container className={classes.studentDetails}>
      {/* {resourcesData?.length > 0
        ? ( */}
      <DataGridPro
        rows={tableData}
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
          <FileViewer fileType={fileType} filePath={fileUrl} />
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
