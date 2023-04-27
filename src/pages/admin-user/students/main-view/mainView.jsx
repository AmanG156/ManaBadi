import React, { memo } from 'react';
import { Grid } from '@mui/material';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';

import { useDispatch } from 'react-redux';
import ListView from '../list-view';
import { setLocalStorage } from '../../../../utils/localStorageMethod';
import { NavigateRoutes } from '../../../../constant';
import GridView from '../grid-view';
import LazyTab from '../helpers/lazyTab';
// import useDataTableParams from '../../../custom-hooks/useDataTableParams';
import { colors, fonts } from '../../../../theme';
import { getAllStudentsByAdmin } from '../../../../store/actions/getStudent';

const useStyles = makeStyles(() => ({
  studentContainer: {
    color: colors.black,
    width: 'auto',
    fontFamily: fonts.fontType.roboto,
  },
  studentListView: {
    textAlign: 'center',
    paddingBottom: 20,
  },
  studentTileView: {
    textAlign: 'center',
    paddingBottom: 20,
    justifyContent: 'center',
    marginLeft: '-1vw !important',
  },
}));

function MainView(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const {
    view,
    onUpdateParentClick,
    paymentDialogOpen,
    editExamDetailsOpen,
    onClickMenu,
    onClickCancelEnrollMenu,
    onEditMenuClick,
    sortModel,
    onSortModelChange,
    setEditStudentProfile,
    setSwapCourseOrLocation,
    setSelectedRecord,
    setIsRecoveryDialogOpen,
    pageNumber,
    pageLimit,
    nextPage,
    setIsFetching,
    isFetching,
    localFilterPayload,
    hasMore,
    setLoading,
    setError,
    selectedFilter,
    setOpenMarksPopUp,
    setDataAssignScore,
    setAssignLoading,
    setLoadingSpinner,
    loadingSpinner,
    filterOptions,
  } = props;

  const dispatch = useDispatch();
  function loadMoreItems(students) {
    setIsFetching(true);
    dispatch(getAllStudentsByAdmin(pageNumber, 100, nextPage, setLoading, students, localFilterPayload));
  }
  return (
    <Grid container className={classes.studentContainer}>
      {view === 'listView' ? (
        <LazyTab>
          <Grid container className={classes.studentListView}>
            <ListView
              {...{
                onUpdateParentClick,
                paymentDialogOpen,
                editExamDetailsOpen,
                onClickMenu,
                onClickCancelEnrollMenu,
                onEditMenuClick,
                sortModel,
                onSortModelChange,
                setEditStudentProfile,
                setSwapCourseOrLocation,
                pageLimit,
                pageNumber,
                isFetching,
                hasMore,
                setIsFetching,
                nextPage,
                loadMoreItems,
                setError,
                selectedFilter,
                setOpenMarksPopUp,
                setDataAssignScore,
                setAssignLoading,
                setLoadingSpinner,
                loadingSpinner,
                filterOptions,
              }}
              type="list"
              recoveryDialogOpen={(row) => {
                setSelectedRecord(row);
                setIsRecoveryDialogOpen(true);
              }}
              showStudentLogs={(row) => {
                setLocalStorage('myView', 'listView');
                navigate(NavigateRoutes.STUDENTS_LOGS, {
                  state: { id: _.get(row, 'userId', ''), lastRoute: NavigateRoutes.STUDENTS_VIEW },
                });
              }}
            />
          </Grid>
        </LazyTab>
      ) : (
        <LazyTab>
          <Grid container className={classes.studentTileView}>
            <GridView
              {...{
                onUpdateParentClick,
                paymentDialogOpen,
                editExamDetailsOpen,
                onClickMenu,
                onClickCancelEnrollMenu,
                onEditMenuClick,
                setEditStudentProfile,
                setSwapCourseOrLocation,
                pageLimit,
                pageNumber,
                isFetching,
                hasMore,
                setIsFetching,
                nextPage,
                loadMoreItems,
                setError,
                selectedFilter,
                filterOptions,
              }}
              type="grid"
              recoveryDialogOpen={(row) => {
                setSelectedRecord(row);
                setIsRecoveryDialogOpen(true);
              }}
              showStudentLogs={(row) => {
                setLocalStorage('myView', 'cardView');
                navigate(NavigateRoutes.STUDENTS_LOGS, {
                  state: { id: _.get(row, 'userId', ''), lastRoute: NavigateRoutes.STUDENTS_VIEW },
                });
              }}
            />
          </Grid>
        </LazyTab>
      )}
    </Grid>
  );
}

export default memo(MainView);
