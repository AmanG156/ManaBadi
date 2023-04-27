import React, { useState } from 'react';
import {
  Grid, IconButton, Box, Menu, MenuItem,
} from '@mui/material';
import { useDispatch } from 'react-redux';
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

import { updateHelpVideo } from '../../../../store/actions/getResources';

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
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const userRole = getLocalStorage('userRole');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const actionDots = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // const [fileType, setFileType] = React.useState(false);
  // const [fileUrl, setFileUrl] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  // const getFileType = (file) => {
  //   const fileSplit = file?.split('.');
  //   const { length } = fileSplit;
  //   const type = fileSplit[length - 1];
  //   return type;
  // };

  // const handleToggle = (obj) => {
  //   const type = getFileType(obj.resourceName);
  //   setFileType(type);
  //   setFileUrl(obj.fileUrl);
  //   setOpen(!open);
  // };
  const handleToggle = () => {
    setOpen(!open);
  };
  const [selectedRow, setSelectedRow] = useState([]);
  const [isEditedFileName, setEditedFileName] = useState('');
  const openEditFileDialog = (row) => {
    setSelectedRow(row);
    setEditFileOpenDialog(true);
  };
  const editFile = () => {
    const paylaod = {
      id: selectedRow?.row?.id,
      courseId: selectedRow?.row?.courseId,
      resourceName: isEditedFileName,
    };
    dispatch(updateHelpVideo(paylaod));
    setEditFileOpenDialog(false);
    refreshData();
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
        <Grid display="flex" onClick={handleToggle}>

          {/* <Typography>{`${rowCell.row.file}`}</Typography> */}
          <span>

            <OndemandVideoOutlinedIcon />
          </span>
          <span>

            {`${rowCell.row.name}`}
          </span>
        </Grid>
      ),
      headerClassName: 'fileNameHeader',
      cellClassName: 'fileNameCell',
    },
    // {
    //   field: 'createdAt',
    //   headerName: t('CREATED_ON'),
    //   align: 'left',
    //   headerClassName: 'dateCreatedHeader',
    //   cellClassName: 'dateCreatedCell',

    // },
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
    },
    {
      field: 'updatedAt',
      headerName: t('MODIFIED_ON'),
      align: 'left',
      headerAlign: 'left',
      headerClassName: 'dateModifiedHeader',
      cellClassName: 'dateModifiedCell',
    },
    {
      field: 'updatedBy',
      headerName: t('MODIFIED_BY'),
      align: 'left',
      headerAlign: 'left',
      headerClassName: 'modifiedByHeader',
      cellClassName: 'modifiedByCell',
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
        renderCell: (rowCell) => (
          <Grid item xs={12} lg={3} display="flex" alignItems="center">
            <Tooltip title={t('EDIT')}>
              <IconButton
                size="large"
                color="inherit"
                onClick={handleClick}
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
                onClick={() => openEditFileDialog(rowCell)}
                className={classes.menuItem}
              >
                {t('EDIT')}
              </MenuItem>
              <MenuItem
                onClick={() => setDeactivateFileOpenDialog(true)}
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
  const file = 'http://techslides.com/demos/sample-videos/small.mp4';
  const type = 'mp4';
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
          <FileViewer fileType={type} filePath={file} />
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
