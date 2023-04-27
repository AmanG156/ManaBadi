/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Box,
  Typography,
  CardActionArea,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Card from '@mui/material/Card';
import Backdrop from '@mui/material/Backdrop';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import CardContent from '@mui/material/CardContent';
import { useDispatch } from 'react-redux';
// import CardMedia from '@mui/material/CardMedia';
import FileViewer from 'react-file-viewer';
import { DialogAtom, Button, TextField } from '../../../../components/atoms';
import { Buttons } from '../../../../constant';
// import { tableData } from '../constant';
import useStyles from '../../../../custom-hooks/useStyles';
import styles from '../../../resources/style';
import { getLocalStorage } from '../../../../utils/localStorageMethod';
import userRoles from '../../../../constant/userRoles';
import { updateHelpVideo } from '../../../../store/actions/getResources';

// react file viewer
export default function ResourcesData({ tableData, refreshData }) {
  const { t } = useTranslation();
  const classes = useStyles(styles)();
  // const [sampleData, setSampleData] = useState([]);
  const [open, setOpen] = useState(false);
  // const [videoDetails, setVideoDetails] = useState({});
  const [fileType, setFileType] = React.useState(false);
  const [fileUrl, setFileUrl] = React.useState(false);
  const userRole = getLocalStorage('userRole');
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = (obj) => {
    const fileSplit = obj.name.split('.');
    const { length } = fileSplit;
    const type = fileSplit[length - 1];
    setFileType(type);
    setFileUrl(obj.url);
    setOpen(!open);
  };

  // const playVideo = (obj) => {
  //   setVideoDetails(obj);
  //   setOpen(!open);
  // };

  const [selectedRow, setSelectedRow] = useState([]);
  const [isEditedFileName, setEditedFileName] = useState('');
  const [isSetEditFileOpenDialog, setEditFileOpenDialog] = useState(false);
  const openEditFileDialog = (obj) => {
    setSelectedRow(obj);
    setEditedFileName(obj.name);
    setEditFileOpenDialog(true);
  };

  const editFile = () => {
    const callback = () => {
      refreshData();
    };
    const paylaod = {
      id: selectedRow?.id,
      name: isEditedFileName,
    };
    dispatch(updateHelpVideo(paylaod, callback));
    setEditFileOpenDialog(false);
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

  return (

    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} className={classes.resourceGrid}>
        {tableData.map((obj) => (
          <Grid item lg={2} xs={6} md={3} className={classes.alignResourceGrid}>
            <Card className={classes.resourcesCard}>
              <CardActionArea className={classes.resourceGridCardImg} onClick={() => handleToggle(obj)}>
                <Grid lg={2} xs={6} md={3} className={classes.resourceGridCard}>
                  <OndemandVideoOutlinedIcon sx={{ color: '#1034ad' }} />
                </Grid>
              </CardActionArea>
              {/* <CardContent className={classes.resourceName}>
                <Typography className={classes.fileNameStyle}>
                  {obj.name}
                </Typography>
                <EditOutlinedIcon />
              </CardContent> */}
              <CardContent className={classes.resourceName}>
                {userRole === userRoles.SUPER_ADMIN ? (
                  <>
                    <Typography className={classes.fileNameStyle}>
                      {obj.name}
                    </Typography>
                    <EditOutlinedIcon onClick={() => openEditFileDialog(obj)} />
                  </>
                ) : (
                  <Typography className={classes.fileNameStyle}>
                    {obj.name}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
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
      </Grid>
    </Box>
  );
}
