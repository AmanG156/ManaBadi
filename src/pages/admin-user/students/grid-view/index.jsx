/* eslint-disable react/button-has-type */
import React, {
  useState, memo, useRef, useContext,
} from 'react';
import {
  Box, Grid, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { useStudent } from '../../../../custom-hooks';
import { Button } from '../../../../components/atoms';
import { Buttons } from '../../../../constant';
import StudentGridCard from './card/card';
import { useStyles } from './style';
import { setLocalStorage } from '../../../../utils/localStorageMethod';
import StudentContext from '../../../../contexts/StudentProvider';

function GridView({
  onUpdateParentClick,
  recoveryDialogOpen,
  paymentDialogOpen,
  editExamDetailsOpen,
  setSwapCourseOrLocation,
  setEditStudentProfile,
  showStudentLogs,
  onClickMenu,
  onClickCancelEnrollMenu,
  onEditMenuClick,
  loadMoreItems,
  isFetching,
  hasMore,
  setError,
  selectedFilter,
  filterOptions,
}) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isSelectAllCheck, setSelectAllCheck] = useState(false);

  const studentsData = useStudent()?.students || [];
  const studentCount = useStudent()?.totalCount || 0;
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const refSelectedStudentIds = useRef(selectedStudentIds);
  const { onCheckboxChange } = useContext(StudentContext);
  const onCheckBoxSelection = (e, studentId) => {
    setError('');
    let selectedIds = [...refSelectedStudentIds.current];
    let selectedEmailIds = [];
    if (e.target.checked) {
      selectedIds.push(studentId);
    } else {
      selectedIds = selectedIds.filter((selectedStudent) => selectedStudent !== studentId);
    }
    const selectedIDs = new Set(selectedIds);
    selectedEmailIds = studentsData.filter((student) => selectedIDs.has(student?.studentInfo?.id));
    const emailList = [];
    const recipientList = [];
    emailList.push(selectedEmailIds.map((student) => student?.parent1Info?.personalEmail));
    recipientList.push(selectedEmailIds.map((student) => student?.studentInfo?.manabadiEmail));
    emailList.push(selectedEmailIds.map((student) => student?.parent2Info?.personalEmail));
    refSelectedStudentIds.current = selectedIds;
    onCheckboxChange(selectedIds);
    setSelectedStudentIds(selectedIds);
    setLocalStorage('adminBulkEmailStudents', emailList);
    setLocalStorage('adminBulkRecipientList', recipientList);
  };

  const onSelectAllCheck = (e) => {
    setError('');
    setSelectAllCheck(e.target.checked);
    let selectedIds = [];
    const emailList = [];
    const recipientList = [];
    if (e.target.checked) {
      selectedIds = studentsData.map((student) => student?.userId);
      emailList.push(studentsData.map((student) => student?.parent1Info?.personalEmail));
      recipientList.push(studentsData.map((student) => student?.studentInfo?.manabadiEmail));
      emailList.push(studentsData.map((student) => student?.parent2Info?.personalEmail));
    } else {
      selectedIds = [];
    }
    onCheckboxChange(selectedIds);
    setSelectedStudentIds(selectedIds);
    setLocalStorage('adminBulkEmailStudents', emailList);
    setLocalStorage('adminBulkRecipientList', recipientList);
  };
  return (
    <div>
      <Box>
        <div className={classes.CardLayout}>
          {studentsData.length > 0
            ? (
              <FormControlLabel
                value="end"
                className={classes.studentKeys}
                control={(
                  <Checkbox
                    checked={isSelectAllCheck || (studentsData.length === selectedStudentIds.length)}
                    onChange={onSelectAllCheck}
                  />
                )}
                label={t('SELECT_ALL')}
                labelPlacement="end"
              />
            ) : null}
        </div>
        <Grid container item lg={12}>
          {studentsData.length > 0 ? studentsData?.map((studentData, index) => (
            <StudentGridCard
              cardChecked={selectedStudentIds.includes(studentData.userId)}
              {...{
                onCheckBoxSelection,
                studentData,
                onUpdateParentClick,
                recoveryDialogOpen,
                paymentDialogOpen,
                editExamDetailsOpen,
                setSwapCourseOrLocation,
                setEditStudentProfile,
                showStudentLogs,
                onClickMenu,
                onClickCancelEnrollMenu,
                onEditMenuClick,
                selectedFilter,
                filterOptions,
              }}
              key={`${studentData.userId}_${index}`}
            />
          )) : (
            <Grid container className={classes.noData}>
              <Card sx={{ maxWidth: 345 }} className={classes.noData}>
                <DoNotDisturbIcon />
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    {t('NO_DATA')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
          {studentsData?.length > 0
            ? (
              <>
                <Grid xs={12} className={classes.totalRowCount}>
                  <span>
                    Total Rows
                    {' '}
                    {studentsData?.length}
                    {' '}
                    of
                    {' '}
                    {studentCount}
                  </span>
                </Grid>
                <Grid xs={12} className={classes.loadMore}>
                  {isFetching && <p>{t('FETCHING_STUDENTS')}</p>}
                  {!isFetching && hasMore && (
                    <Button
                      name={t('LOAD_MORE')}
                      btntype={Buttons.PRIMARY}
                      onClick={() => loadMoreItems(studentsData?.length)}
                    />
                  )}
                </Grid>
              </>
            ) : null}
        </Grid>
      </Box>
    </div>
  );
}

export default memo(GridView);
