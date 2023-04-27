import React from 'react';
import {
  Grid, IconButton,
} from '@mui/material';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import { useTranslation } from 'react-i18next';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import FileViewer from 'react-file-viewer';
import Backdrop from '@mui/material/Backdrop';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { tableData } from '../constant';
import useStyles from '../../../../custom-hooks/useStyles';
import styles from '../../../admin-user/resources/styles';
// import { tableData } from './constants';

// import Loader from '../../../components/atoms/loader';
import { CustomUnsortedIcon, CustomAscendingIcon, CustomDescendingIcon } from '../../../../utils/commonUiComponent';

export default function ListView({
  sortModel,
  onSortModelChange,
}) {
  const classes = useStyles(styles)();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const columns = [
    {
      field: 'file',
      headerName: t('FILE_NAME'),
      sortable: false,
      renderCell: (rowCell) => (
        <Grid display="flex" onClick={handleToggle}>
          {/* <PictureAsPdfIcon /> */}
          <span>

            <OndemandVideoOutlinedIcon />
          </span>
          <span>

            {`${rowCell.row.file}`}
          </span>
        </Grid>
      ),
      headerClassName: 'fileNameHeader',
      cellClassName: 'fileNameCell',
    },
    {
      field: 'dateCreated',
      headerName: t('CREATED_ON'),
      align: 'left',
      headerClassName: 'dateCreatedHeader',
      cellClassName: 'dateCreatedCell',

    },
    {
      field: 'createdBy',
      headerName: t('CREATED_BY'),
      align: 'center',
      headerClassName: 'createdByHeader',
      cellClassName: 'createdByCell',
    },
    {
      field: 'dateModified',
      headerName: t('MODIFIED_ON'),
      align: 'left',
      headerAlign: 'left',
      headerClassName: 'dateModifiedHeader',
      cellClassName: 'dateModifiedCell',
    },
    {
      field: 'modifiedBy',
      headerName: t('MODIFIED_BY'),
      align: 'left',
      headerAlign: 'center',
      headerClassName: 'modifiedByHeader',
      cellClassName: 'modifiedByCell',
    },
    {
      field: 'fileSize',
      headerName: t('SIZE'),
      align: 'left',
      headerAlign: 'center',
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
      renderCell: () => (
        <Grid item xs={12} lg={3} display="flex" alignItems="center">
          <Tooltip title={t('EDIT')}>
            <IconButton
              size="large"
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      ),
    },

  ];
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
        // checkboxSelection
        hideFooterRowCount
        hideFooter
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
    </Grid>
  );
}
