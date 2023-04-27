import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';
import commonStyles from '../../../utils/commonClasses';
import ButtonAtom from '../../../components/atoms/button';
import DialogAtom from '../../../components/atoms/dialog';
import { Buttons, NavigateRoutes } from '../../../constant';
import { ViewIcon } from '../../../assets/svg';
import {
  getStudentLogs,
  getStudentLogDetail,
} from '../../../store/actions/getStudent';
import { logDate, formatDate } from '../../../utils/methods';

function DialogContent({
  data, classes, t,
}) {
  const arr = [];
  data[0].log_details.forEach((log, i) => {
    let oldVal = log.old_value;
    let newVal = log.new_value;
    if (log.field_name === 'dateOfBirth') {
      oldVal = formatDate(log.old_value, 'MMM DD, YYYY');
      newVal = formatDate(log.new_value, 'MMM DD, YYYY');
    }
    arr.push({
      id: i,
      item: log.field_name,
      from: oldVal,
      to: newVal,
    });
  });
  const columns = [
    {
      field: 'item',
      flex: 1,
      type: 'string',
      headerName: t('ITEM'),
      sortable: false,
      headerClassName: 'itemHeader',
      cellClassName: 'itemCell',
    },
    {
      field: 'from',
      flex: 1,
      type: 'string',
      headerName: t('FROM'),
      sortable: false,
      headerClassName: 'fromHeader',
      cellClassName: 'fromCell',
    },
    {
      field: 'to',
      flex: 1,
      type: 'string',
      headerName: t('TO'),
      sortable: false,
      headerClassName: 'toHeader',
      cellClassName: 'toCell',
    },
  ];
  return (
    <Grid>
      <Grid container justifyContent="space-between" className={classes.dialogOverviewWrapper}>
        <Box item className={classes.item} xs={3} lg={3}>
          <Typography className={classes.dialogOverview}>
            {t('LOG_MESSAGE')}
          </Typography>
          <br />
          {data.row.log_message}
        </Box>
        <div className={classes.vl} />
        <Box item className={classes.item} xs={3} lg={3}>
          <Typography className={classes.dialogOverview}>
            {t('CHANGED_BY')}
          </Typography>
          <br />
          {data.row.added_by}
        </Box>
        <div className={classes.vl} />
        <Box item className={classes.item} xs={3} lg={3}>
          <Typography className={classes.dialogOverview}>
            {t('DATE')}
          </Typography>
          <br />
          {logDate(data.row.added_on)}
        </Box>
      </Grid>
      <Box mt={4} mb={2} className={classes.changesMadeSection}>
        <Typography className={classes.dialogOverview}>
          {t('CHANGES_MADE')}
        </Typography>
      </Box>

      <Box className={classes.dialogTableWrapper} height="15vw">
        <DataGrid
          rows={arr}
          columns={columns}
          className={classes.dataGrid}
          // autoHeight
          disableColumnFilter
          disableColumnSelector
          disableSelectionOnClick
          hideFooterPagination
          disableColumnMenu
          hideFooter
          sx={{
            '.MuiDataGrid-root': {
              outline: 'none !important',
              border: 'none !important',
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: 'none !important',
              borderTop: 'none',
              fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
              fontStyle: 'normal',
              fontWeight: 'bold !important',
              fontSize: '18px',
              lineHeight: '131.19%',
            },
            '& .MuiDataGrid-iconSeparator': {
              visibility: 'hidden',
            },
            '& .MuiDataGrid-cell ': {
              border: '0px',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold !important',
            },
          }}
        />
      </Box>
    </Grid>
  );
}
function DialogFooter({
  classes, handleDialog, t,
}) {
  const commonClasses1 = useStyles(commonStyles)();

  return (
    <Grid container className={classes.content} justifyContent="flex-end">
      <ButtonAtom
        name={t('CLOSE')}
        onClick={handleDialog}
        btntype={Buttons.PRIMARY}
        className={`${commonClasses1.activeButton} ${classes.dialogButton}`}
      />
    </Grid>
  );
}
export default function StudentsLogs() {
  const { state: routeState } = useLocation();
  const dispatch = useDispatch();
  const { studentLogs } = useSelector((st) => st?.getStudent);
  const [rowData, setRowData] = useState([]);
  let logs = {};
  const rows = [];
  useEffect(() => {
    studentLogs?.forEach((logData) => {
      logs = {
        ...logData,
        added_by: `${logData?.user?.first_name}  ${logData?.user?.last_name}`,
        added_on: logDate(logData?.added_on),
        course: logData?.course,
        id: logData?.id,
        log_message: logData?.log_message,
        year: logData?.year,
      };
      rows.push(logs);
    });
    setRowData(rows);
  }, [studentLogs]);

  const { t } = useTranslation();
  const classes = useStyles(styles)();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();

  const renderDialog = (event, value) => {
    event.preventDefault();
    dispatch(getStudentLogDetail(value.id)).then((res) => {
      setMessage({ ...value, ...res.data });
      setDialogOpen(true);
    });
  };

  function onBackButtonClick() {
    navigate(routeState?.lastRoute ? routeState.lastRoute : NavigateRoutes.STUDENTS_VIEW);
  }

  useEffect(() => {
    dispatch(getStudentLogs(routeState?.id || ''));
  }, []);

  const columns = [
    {
      field: 'log_message',
      flex: 1,
      type: 'string',
      headerName: i18next.t('LOG_MESSAGE'),
      sortable: false,
    },
    {
      field: 'year',
      flex: 1,
      type: 'string',
      headerName: i18next.t('YEAR'),

      sortable: false,
    },
    {
      field: 'course',
      flex: 1,
      type: 'string',
      headerName: i18next.t('COURSE'),
      sortable: false,
    },
    {
      field: 'added_by',
      flex: 1,
      type: 'string',
      headerName: i18next.t('ADDED_BY'),
      sortable: false,
    },
    {
      field: 'added_on',
      flex: 1,
      type: 'string',
      headerName: i18next.t('ADDED_ON'),
      sortable: false,
    },
    {
      field: 'view',
      flex: 1,
      align: 'right',
      headerAlign: 'right',
      headerClassName: 'viewLogHeader',
      cellClassName: 'viewLogCell',
      renderHeader: () => (
        <>
          <ViewIcon fontSize="small" />
          {i18next.t('VIEW')}
        </>
      ),
      sortable: false,
      renderCell: (params) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a href="" onClick={(event) => renderDialog(event, params)} aria-hidden="false" style={{ color: '#025EE6' }}>
          {i18next.t('VIEW_LOG')}
        </a>
      ),
    },
  ];

  return (
    <>
      <Typography className={classes.mainHeaderTitle}>
        {
          routeState?.lastRoute === NavigateRoutes?.USER_MANAGER_VIEW ? t('VIEW_USER_LOGS') : t('VIEW_STUDENT_LOGS')
        }
      </Typography>
      <div className={classes.tableWrapper}>
        <DataGrid
          rows={rowData || []}
          columns={columns}
          className={classes.root}
          autoHeight
          disableColumnFilter
          disableColumnSelector
          disableColumnMenu
          disableSelectionOnClick
          hideFooterPagination
          hideFooter
          sx={{
            '.MuiDataGrid-root': {
              outline: 'none !important',
              border: 'none !important',
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: '0.1vw solid #025EE6 !important',
              borderTop: 'none',
              fontFamily: 'Roboto,sans-serif',
              fontStyle: 'normal',
              fontWeight: '500',
              '@media (min-width: 1200px)': {
                fontSize: '1.2vw',
              },
              lineHeight: '2vw',
              color: '#025EE6',
            },
            '& .MuiDataGrid-cell ': {
              '@media (max-width: 499px)': {
                overflow: 'visible !important',
              },
              border: '0vw',
            },
            '& .MuiDataGrid-iconSeparator': {
              visibility: 'hidden',
            },
          }}
        />
        <Grid container className={classes.backButton} justifyContent="flex-end">
          <ButtonAtom
            name={t('BACK')}
            /* eslint-disable-next-line react/jsx-no-bind */
            onClick={onBackButtonClick}
            btntype={Buttons.PRIMARY}
          />
        </Grid>
        <DialogAtom
          isOpen={isDialogOpen}
          customClass={classes.viewLogDialogAtom}
          dialogHeading={t('VIEW_LOGS')}
          secHandle={() => setDialogOpen(false)}
          content={<DialogContent data={message} classes={classes} t={t} />}
          footer={(
            <DialogFooter
              classes={classes}
              handleDialog={() => setDialogOpen(false)}
              t={t}
            />
          )}
        />
      </div>
    </>
  );
}
