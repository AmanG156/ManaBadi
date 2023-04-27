import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Grid,
  IconButton, Typography,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useTranslation } from 'react-i18next';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { NavigateRoutes } from '../../../constant';
import useStyles from '../../../custom-hooks/useStyles';
import styles from '../my-class/style';
import { CustomUnsortedIcon, CustomAscendingIcon, CustomDescendingIcon } from '../../../utils/commonUiComponent';
import Constant from '../../../store/constant';
import { setLocalStorage } from '../../../utils/localStorageMethod';

export default function ListView({
  sortModel,
  onSortModelChange,
  studentsData,
  marksOpen,
  checkboxChanged,
  loading,
}) {
  const classes = useStyles(styles)();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getMarksHeader = () => (
    <div>
      <span style={{ height: '5vh' }}>
        {t('MARKS')}
      </span>
      <div>{t('Q2')}</div>
    </div>
  );

  const getHomeworkHeader = () => (
    <div>
      <span style={{ height: '5vh', left: -14 }}>
        {t('HOMEWORK')}
      </span>
      <div>{t('Q2')}</div>
    </div>
  );
  const columns = [
    {
      field: 'studentName',
      headerName: t('STUDENT_NAME'),
      align: 'left',
      sortable: true,
      class: 'studentNameField',
      headerClassName: 'studentNameHeader',
      cellClassName: 'studentNameCell',
      renderCell: (rowValues) => (
        <div className={classes.wrappingCell}>{`${rowValues?.row?.studentInfo?.firstName} ${rowValues?.row?.studentInfo?.lastName}`}</div>
      ),
    },
    {
      field: 'parentName',
      headerName: t('PARENT_NAME'),
      align: 'left',
      sortable: true,
      headerClassName: 'parentHeader',
      cellClassName: 'parentNameCell',
      renderCell: (rowValues) => (
        <div className={classes.wrappingCell}>{`${rowValues?.row?.parent1Info?.firstName} ${rowValues?.row?.parent1Info?.lastName}`}</div>
      ),
    },
    {
      field: 'studentEmailAddress',
      headerName: t('STUDENT_EMAIL_ADDRESS'),
      align: 'left',
      sortable: true,
      headerAlign: 'left',
      headerClassName: 'studentEmailHeader',
      cellClassName: 'studentEmailCell',
      renderCell: (rowValues) => (
        <Tooltip title={`${rowValues?.row?.studentInfo?.manabadiEmail}`}>
          <div className={classes.wrappingCell}>{`${rowValues?.row?.studentInfo?.manabadiEmail}`}</div>
        </Tooltip>
      ),
    },
    {
      field: 'marksQ1',
      sortable: false,
      headerName: t('Q1'),
      align: 'center',
      headerClassName: 'marksHeader',
      cellClassName: 'marksCell',
      renderCell: (cellValues) => (
        <div onClick={() => marksOpen(cellValues, 'marks', 'Q1')}>
          {
            cellValues?.row?.marks?.Q1?.obtainedMarks > 65
              ? <Typography className={classes.marksGreen}>{cellValues?.row?.marks?.Q1?.obtainedMarks === 'N/A' ? cellValues?.row?.marks?.Q1?.obtainedMarks : parseFloat(cellValues?.row?.marks?.Q1?.obtainedMarks).toFixed(2)}</Typography>
              : <Typography className={cellValues?.row?.marks?.Q1?.obtainedMarks < 65 ? classes.marksRed : classes.marksGreen}>{cellValues?.row?.marks?.Q2?.obtainedMarks === 'N/A' ? cellValues?.row?.marks?.Q1?.obtainedMarks : parseFloat(cellValues?.row?.marks?.Q1?.obtainedMarks).toFixed(2)}</Typography>
          }
        </div>
      ),
    },
    {
      field: 'marksQ2',
      headerName: getMarksHeader(),
      disableColumnResize: 'false',
      align: 'left',
      headerClassName: 'marksHeader',
      cellClassName: 'marksCell',
      sortable: false,
      renderCell: (cellValues) => (
        <div onClick={() => marksOpen(cellValues, 'marks', 'Q2')}>
          <Typography className={cellValues?.row?.marks?.Q2?.obtainedMarks < 65 ? classes.marksRed : classes.marksGreen}>{cellValues?.row?.marks?.Q2?.obtainedMarks === 'N/A' ? cellValues?.row?.marks?.Q2?.obtainedMarks : parseFloat(cellValues?.row?.marks?.Q2?.obtainedMarks).toFixed(2)}</Typography>
        </div>
      ),
    },
    {
      field: 'marksQ3',
      headerName: t('Q3'),
      headerClassName: 'marksHeader',
      align: 'left',
      cellClassName: 'marksCell',
      sortable: false,
      renderCell: (cellValues) => (
        <div onClick={() => marksOpen(cellValues, 'marks', 'Q3')}>
          {
            cellValues?.row?.marks?.Q3?.obtainedMarks > 65
              ? <Typography className={classes.marksGreen}>{cellValues?.row?.marks?.Q3?.obtainedMarks === 'N/A' ? cellValues?.row?.marks?.Q3?.obtainedMarks : parseFloat(cellValues?.row?.marks?.Q3?.obtainedMarks).toFixed(2)}</Typography>
              : <Typography className={cellValues?.row?.marks?.Q3?.obtainedMarks < 65 ? classes.marksRed : classes.marksGreen}>{cellValues?.row?.marks?.Q3?.obtainedMarks === 'N/A' ? cellValues?.row?.marks?.Q3?.obtainedMarks : parseFloat(cellValues?.row?.marks?.Q3?.obtainedMarks).toFixed(2)}</Typography>
          }
        </div>
      ),
    },
    {
      field: 'homeworkQ1',
      sortable: false,
      headerName: t('Q1'),
      align: 'center',
      headerClassName: 'marksHeader',
      cellClassName: 'marksCell',
      renderCell: (cellValues) => (
        <div onClick={() => marksOpen(cellValues, 'homework', 'Q1')}>
          {
            cellValues?.row?.homeworkMarks?.Q1?.obtainedMarks > 65
              ? <Typography className={classes.marksGreen}>{cellValues?.row?.homeworkMarks?.Q1?.obtainedMarks === 'N/A' ? cellValues?.row?.homeworkMarks?.Q1?.obtainedMarks : parseFloat(cellValues?.row?.homeworkMarks?.Q1?.obtainedMarks).toFixed(2)}</Typography>
              : <Typography className={cellValues?.row?.homeworkMarks?.Q1?.obtainedMarks < 65 ? classes.marksRed : classes.marksGreen}>{cellValues?.row?.homeworkMarks?.Q1?.obtainedMarks === 'N/A' ? cellValues?.row?.homeworkMarks?.Q1?.obtainedMarks : parseFloat(cellValues?.row?.homeworkMarks?.Q1?.obtainedMarks).toFixed(2)}</Typography>
          }
        </div>
      ),
    },
    {
      field: 'homeworkQ2',
      headerName: getHomeworkHeader(),
      disableColumnResize: 'false',
      align: 'left',
      headerClassName: 'marksHeader',
      cellClassName: 'marksCell',
      sortable: false,
      renderCell: (cellValues) => (
        <div onClick={() => marksOpen(cellValues, 'homework', 'Q2')}>
          {
            cellValues?.row?.homeworkMarks?.Q2?.obtainedMarks > 65
              ? <Typography className={classes.marksGreen}>{cellValues?.row?.homeworkMarks?.Q2?.obtainedMarks === 'N/A' ? cellValues?.row?.homeworkMarks?.Q2?.obtainedMarks : parseFloat(cellValues?.row?.homeworkMarks?.Q2?.obtainedMarks).toFixed(2)}</Typography>
              : <Typography className={cellValues?.row?.homeworkMarks?.Q2?.obtainedMarks < 65 ? classes.marksRed : classes.marksGreen}>{cellValues?.row?.homeworkMarks?.Q2?.obtainedMarks === 'N/A' ? cellValues?.row?.homeworkMarks?.Q2?.obtainedMarks : parseFloat(cellValues?.row?.homeworkMarks?.Q2?.obtainedMarks).toFixed(2)}</Typography>
          }
        </div>
      ),
    },
    {
      field: 'homeworkQ3',
      headerName: t('Q3'),
      headerClassName: 'marksHeader',
      align: 'left',
      cellClassName: 'marksCell',
      sortable: false,
      renderCell: (cellValues) => (
        <div onClick={() => marksOpen(cellValues, 'homework', 'Q3')}>
          {
            cellValues?.row?.homeworkMarks?.Q3?.obtainedMarks > 65
              ? <Typography className={classes.marksGreen}>{cellValues?.row?.homeworkMarks?.Q3?.obtainedMarks === 'N/A' ? cellValues?.row?.homeworkMarks?.Q3?.obtainedMarks : parseFloat(cellValues?.row?.homeworkMarks?.Q3?.obtainedMarks).toFixed(2)}</Typography>
              : <Typography className={cellValues?.row?.homeworkMarks?.Q3?.obtainedMarks < 65 ? classes.marksRed : classes.marksGreen}>{cellValues?.row?.homeworkMarks?.Q3?.obtainedMarks === 'N/A' ? cellValues?.row?.homeworkMarks?.Q3?.obtainedMarks : parseFloat(cellValues?.row?.homeworkMarks?.Q3?.obtainedMarks).toFixed(2)}</Typography>
          }
        </div>
      ),
    },
    {
      field: 'bonus',
      headerName: t('BONUS'),
      align: 'left',
      sortable: false,
      headerClassName: 'bonusHeader',
      cellClassName: 'bonusCell',
    },
    {
      field: 'grade',
      headerName: t('GRADE'),
      align: 'left',
      sortable: false,
      headerClassName: 'gradeHeader',
      cellClassName: 'gradeCell',
    },
    {
      field: 'gpa',
      headerName: t('GPA'),
      align: 'left',
      sortable: false,
      headerClassName: 'gpaHeader',
      cellClassName: 'gpaCell',
    },
    {
      field: 'annualScore',
      headerName: t('ANNUAL_SCORE'),
      align: 'left',
      sortable: true,
      headerClassName: 'annualHeader',
      cellClassName: 'annualCell',
    },
    {
      field: 'actions',
      headerName: t('ACTIONS'),
      align: 'left',
      sortable: false,
      headerClassName: 'actionHeader',
      cellClassName: 'actionCell',
      renderCell: (row) => (
        <Grid item xs={12} lg={3} display="flex">
          <Tooltip title={t('SEND_EMAIL')}>
            <IconButton
              className={classes.emailIconColor}
              onClick={() => {
                const { manabadiEmail } = row.row.studentInfo;
                const emailParents = [];
                emailParents.push(row?.row?.parent1Info?.personalEmail?.toString());
                emailParents.push(row?.row?.parent2Info?.personalEmail?.toString());
                dispatch({ type: Constant.RECIPIENTS, payload: [manabadiEmail] });
                dispatch({ type: Constant.MAIL_FILTER, payload: 'Student' });
                dispatch({ type: Constant.MAIL_PARENTS, payload: emailParents });
                setLocalStorage('showLocationFilterRecipients', false);
                setLocalStorage('showLocationAnnouncementsRecipients', false);
                setLocalStorage('showSelectAllinEmail', false);
                navigate(NavigateRoutes.TEACHER_VIEW_EMAIL);
              }}
            >
              <EmailOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      ),
    },
  ];
  return (
    <Grid container className={classes.studentDetails}>
      {/* {studentsData?.length > 0
        && ( */}
      <DataGridPro
        rows={studentsData}
        columns={columns}
        autoHeight
        disableColumnFilter
        disableColumnSelector
        disableColumnMenu
        disableColumnResize
        disableSelectionOnClick
        checkboxSelection
        hideFooterRowCount
        hideFooter
        hideFooterSelectedRowCount
        hideFooterPagination
        className={classes.dataGridMyClass}
        components={{
          ColumnUnsortedIcon: CustomUnsortedIcon,
          ColumnSortedAscendingIcon: CustomAscendingIcon,
          ColumnSortedDescendingIcon: CustomDescendingIcon,
        }}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedData = studentsData.filter((row) => selectedIDs.has(row.id));
          checkboxChanged(selectedData);
        }}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        pageSize={100}
        loading={loading}
      />
      {/* )} */}
    </Grid>
  );
}
