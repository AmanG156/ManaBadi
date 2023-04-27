import React, { useState, memo } from 'react';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import makeStyles from '@mui/styles/makeStyles';
import MainViewHeader from '../main-view-header/mainViewHeader';
import MainView from '../main-view/mainView';
import { colors } from '../../../../theme';
import { StudentProvider } from '../../../../contexts/StudentProvider';
import { getLocalStorage } from '../../../../utils/localStorageMethod';

const useStyles = makeStyles(() => ({
  errorText: {
    color: colors.errorText,
    fontSize: 'calc(12px + 6 * ((100vw - 320px) / 1199))',
    '@media (min-width: 1200px)': {
      fontSize: '0.9vw',
    },
  },
}));
function MainViewWithHeader(props) {
  const classes = useStyles();
  const getView = getLocalStorage('myView') || 'cardView';
  const [view, setView] = useState(getView);
  const [error, setError] = useState('');
  const [isSelectedCheckbox, setIsSelectedCheckbox] = useState([]);

  const onCheckBoxSelection = (e) => {
    if (getView !== 'cardView') {
      const idStudents = e.map((item) => item.userId);
      setIsSelectedCheckbox(idStudents);
    } else {
      setIsSelectedCheckbox(e);
    }
  };
  const [sortModel, setSortModel] = useState([
    {
      field: 'regDate',
      sort: 'desc',
    },
  ]);
  const [changedModel] = useState([
    {
      field: 'regDate',
      sort: 'desc',
    },
  ]);
  const handleView = (event, myView) => {
    if (myView !== null) {
      setView(myView);
    }
  };
  const {
    setSelectedFilter,
    setFilterOptions,
    filterByYearDropDown,
    filterOptions,
    onUpdateParentClick,
    paymentDialogOpen,
    editExamDetailsOpen,
    onClickMenu,
    onClickCancelEnrollMenu,
    onEditMenuClick,
    setEditStudentProfile,
    setSwapCourseOrLocation,
    setSelectedRecord,
    setIsRecoveryDialogOpen,
    setCancelEnroll,
    isFetching,
    hasMore,
    pageNumber,
    pageLimit,
    nextPage,
    setIsFetching,
    localFilterPayload,
    selectedFilter,
    setOpenMarksPopUp,
    setDataAssignScore,
    setAssignLoading,
    setLoadingSpinner,
    loadingSpinner,
  } = props;

  const studentFilterViews = useSelector(
    (state) => state.getStudent.studentFilterViews,
  );
  const getFilterViewOptions = () => {
    const opt = [
      {
        name: ' ',
        id: '',
      },
    ];
    studentFilterViews.forEach((filView) => {
      opt.push({
        name: filView.name,
        id: filView.id,
      });
    });
    return opt;
  };
  const onSortModelChange = (model) => {
    if (JSON.stringify(model) !== JSON.stringify(sortModel)) {
      setSortModel(model);
    }
  };

  const refreshSort = () => {
    if (JSON.stringify(sortModel) !== JSON.stringify(changedModel)) {
      setSortModel(changedModel);
    }
  };
  return (
    <div>
      <StudentProvider value={{ onCheckboxChange: onCheckBoxSelection }}>
        <MainViewHeader {...{
          refreshSort,
          handleView,
          getFilterViewOptions,
          studentFilterViews,
          setView,
          view,
          setSelectedFilter,
          setFilterOptions,
          filterByYearDropDown,
          filterOptions,
          setError,
          selectedFilter,
          isSelectedCheckbox,
        }}
        />
        <Grid>
          <span className={classes.errorText}>{error}</span>
        </Grid>
        <Grid>
          <MainView {...{
            view,
            onUpdateParentClick,
            paymentDialogOpen,
            editExamDetailsOpen,
            onClickMenu,
            onClickCancelEnrollMenu,
            onEditMenuClick,
            setCancelEnroll,
            sortModel,
            onSortModelChange,
            setEditStudentProfile,
            setSwapCourseOrLocation,
            setSelectedRecord,
            setIsRecoveryDialogOpen,
            isFetching,
            hasMore,
            pageNumber,
            pageLimit,
            nextPage,
            setIsFetching,
            localFilterPayload,
            setError,
            selectedFilter,
            setOpenMarksPopUp,
            setDataAssignScore,
            setAssignLoading,
            setLoadingSpinner,
            loadingSpinner,
            // to pass filters back
            filterOptions,
          }}
          />
        </Grid>
      </StudentProvider>
    </div>
  );
}
export default memo(MainViewWithHeader);
