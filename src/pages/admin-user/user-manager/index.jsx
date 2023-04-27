import React, { useCallback, useState } from 'react';
import {
  Box, Grid, IconButton,
} from '@mui/material';
import {
  useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import ClearIcon from '@mui/icons-material/Clear';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import Button from '@mui/material/Button';
import Header from './header/header';
import StudentFilters from '../filters';
import {
  getUsers, getUserRoles, getAllFilteredUsers, getAllFilterForUserManager,
} from '../../../store/actions/getUser';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';
import { Buttons, NavigateRoutes } from '../../../constant';
import ListView from './list-view/listView';
import EditUser from './editUser/edit';
import AddUser from './addUser/addUser';
import { getMaskedEmail } from '../../../utils/methods';
import { postForgotPassword } from '../../../store/actions/auth';
import {
  DialogAtom, Loader,
} from '../../../components/atoms';
import ButtonAtom from '../../../components/atoms/button';
import {
  Main, AppBar, DrawerHeader, getUserObj,
} from './helperComponent';
import useDataTableParams from '../../../custom-hooks/useDataTableParams';
import { getLocalStorage, setLocalStorage } from '../../../utils/localStorageMethod';
import Constant from '../../../store/constant';
import {
  addFilterView,
} from '../../../store/actions/getStudent';
import { useStudent } from '../../../custom-hooks';

export const DrawerWidth = 240;

export default function UserManager() {
  const {
    nextPage,
    pageNumber,
    setIsFetching,
    handlePageNumberChange,
  } = useDataTableParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    setLoading(true);
    dispatch(getAllFilterForUserManager());
    dispatch(getUsers(setLoading));
    dispatch(getUserRoles());
  }, []);

  const classes = useStyles(styles)();
  const { t } = useTranslation();
  const [userFormError, setUserFormError] = useState(0);
  const [isRecoveryDialogOpen, setIsRecoveryDialogOpen] = useState(false);
  const [recoverPasswordSuccess, setRecoverPasswordSuccess] = useState(false);
  const [isEditUserProfile, setIsEditUserProfile] = useState(false);
  const [isNewUserProfile, setIsNewUserDialogOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(0);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [error, setError] = useState('');
  const userFilters = useSelector(
    (state) => state.getUser.userFilters,
  );
  const [filterOptions, setFilterOptions] = useState([]);
  const studentsData = useStudent()?.students || [];

  React.useEffect(() => {
  }, [pageNumber]);

  const getFilteredStudents = (filOpts) => {
    const filterPayload = { filters: {} };
    filOpts.forEach((filterOption) => {
      if (!filterOption?.options?.every((opt) => opt?.checked === false)) {
        const selectedOption = [];
        filterOption?.options?.forEach((option) => {
          if (option.checked) selectedOption.push(option?.value);
        });
        filterPayload.filters[filterOption?.filter] = selectedOption;
      }
    });
    setIsFetching(true);
    handlePageNumberChange(1);
    dispatch(getAllFilteredUsers(1, 100, nextPage, false, studentsData.length, filterPayload));
  };

  const onSetFilterOptions = (fil, refetchFilteredStudent) => {
    setFilterOptions(fil);
    const selectedFil = [];
    fil.forEach((fi) => {
      fi.options.forEach((fiOpt) => {
        if (fiOpt.checked) {
          selectedFil.push({
            label: fiOpt.label,
            groupBy: fi.label,
            filterKey: fi.filter,
          });
        }
      });
    });
    if (refetchFilteredStudent) {
      getFilteredStudents(fil);
    }
    setSelectedFilter(selectedFil);
  };

  const initialFilterPayload = (isRefresh) => {
    if (!isRefresh) {
      const currentYear = new Date().getFullYear();
      const nextYear = new Date().getFullYear() + 1;
      const selectedAcademicYear = { id: `${currentYear}-${nextYear}`, name: `${currentYear}-${nextYear}` };
      const fil = userFilters?.map((filterOpt) => {
        const options = filterOpt?.options?.map((op) => ({
          label: op[filterOpt.key],
          checked: !!((filterOpt.filter === 'academic_year' && op[filterOpt.key] === selectedAcademicYear.id)),
          value: op[filterOpt.key],
          filterKey: filterOpt.filter,
        }));
        return {
          ...filterOpt,
          expanded: false,
          options,
          value: filterOpt.label,
        };
      });
      setFilterOptions(fil);
      if (fil?.length > 0) {
        onSetFilterOptions(fil, true);
      }
    }
    if (isRefresh) {
      setFilterOptions(filterOptions);
      if (filterOptions?.length > 0) {
        onSetFilterOptions(filterOptions, true);
      }
    }
  };

  React.useEffect(() => {
    initialFilterPayload();
  }, [userFilters]);

  React.useEffect(() => {
    const fil = userFilters?.map((filterOpt) => {
      const options = filterOpt?.options?.map((op) => ({
        label: op[filterOpt.key],
        checked: false,
        value: op[filterOpt.key],
        filterKey: filterOpt.filter,
      }));
      return {
        ...filterOpt, expanded: false, options, value: filterOpt.label,
      };
    });
    setFilterOptions(fil);
  }, [userFilters]);
  const navigate = useNavigate();
  const sendPasswordRecoveryEmail = useCallback(async (email) => {
    const initialValues = {
      email,
    };
    dispatch(postForgotPassword(initialValues));
  }, []);

  const handleRecoverDialog = async () => {
    setIsRecoveryDialogOpen(false);
    await sendPasswordRecoveryEmail(selectedRecord?.manabadi_email).finally(() => {
      setTimeout(() => {
        setRecoverPasswordSuccess(true);
      }, 200);
    });
  };

  const onAddView = (title, filters, setShowAddViewDialog) => {
    const queryArray = [];
    filters.forEach((fil) => {
      fil.options.forEach((filOp) => {
        if (filOp.checked) {
          queryArray.push({
            label: filOp.label,
            groupBy: fil.label,
            filterKey: fil.filter,
          });
        }
      });
    });
    dispatch(
      addFilterView(
        {
          queryData: JSON.stringify(queryArray),
          name: title,
        },
        setShowAddViewDialog,
      ),
    );
  };

  const renderRecoveryContent = () => (
    <Grid>
      <Grid item xs={12} className={classes.recoveryContent}>
        {t('SEND_RECOVERY')}
      </Grid>
      <Grid item xs={12} className={classes.dialogButtons}>
        <ButtonAtom
          name={t('CANCEL')}
          onClick={() => setIsRecoveryDialogOpen(false)}
          btntype={Buttons.SECONDARY}
        />
        <ButtonAtom
          name={t('CONFIRM')}
          onClick={() => {
            handleRecoverDialog();
          }}
          btntype={Buttons.PRIMARY}
        />

      </Grid>
    </Grid>
  );

  const renderSuccessContent = () => (
    <Grid>
      <Grid item xs={10} className={classes.dialogContent}>
        <h1 className={classes.dialogHeader}>{t('RECOVER_PASSWORD_EMAIL')}</h1>
        {t('PASSWORD_RESET_LINK', { email: getMaskedEmail(selectedRecord?.personal_email) })}
      </Grid>
      <Grid container className={classes.content} justifyContent="flex-end">
        <ButtonAtom
          name={t('GOT_IT')}
          onClick={() => setRecoverPasswordSuccess(false)}
          btntype={Buttons.SECONDARY}
        />
      </Grid>
    </Grid>
  );

  const onClickMenu = (student) => {
    setSelectedRecord(student);
  };

  const onEditMenuClick = (selectedUser) => {
    const userObj = getUserObj(selectedUser);
    setUserInfo(userObj);
    setSelectedRecord(selectedUser);
  };

  const oncallUserClick = (selectedRow) => {
    setSelectedRecord(selectedRow);
  };

  const handleAddUserClick = () => {
    setIsNewUserDialogOpen(true);
  };

  const viewLogs = (onClose) => {
    onClose(false);
    navigate(NavigateRoutes.STUDENTS_LOGS, { state: { id: selectedRecord.id, lastRoute: NavigateRoutes.USER_MANAGER_VIEW } });
  };

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box className={`${classes.gridContainer} ${classes.paddingRemove}`}>
      {!loading && (
        <Grid container>
          <Grid item lg={0.2} />
          <Grid item xs={12} lg={12} className={classes.filterSection}>
            <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <AppBar position="fixed" open={open} />
              <Drawer
                sx={{
                  width: DrawerWidth,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: DrawerWidth,
                    boxSizing: 'border-box',
                  },
                }}
                variant="persistent"
                anchor="left"
                open={open}
              >
                <DrawerHeader>
                  {/* Search By Filters
                  <IconButton onClick={handleDrawerClose}>
                    <ClearIcon />
                  </IconButton> */}
                  <div>
                    <TuneOutlinedIcon className={classes.filterIcon} />
                    <span style={{
                      verticalAlign: 'top',
                      marginLeft: '0.8vw',
                    }}
                    >
                      {t('SEARCH_BY_FILTERS')}
                    </span>
                    <ClearIcon
                      onClick={handleDrawerClose}
                      style={{
                        marginLeft: '2.5vw',
                      }}
                      className={classes.clearIcon}
                    />
                  </div>
                </DrawerHeader>
                <StudentFilters
                  filterOptions={filterOptions}
                  setFilterOptions={onSetFilterOptions}
                  onAddView={onAddView}
                />
              </Drawer>

              <Main open={open} className={classes.mainSection}>

                <Grid className={classes.filterButton}>
                  <Grid container>
                    <Grid item xs={12}>

                      <Header
                        xs={10}
                        md={10}
                        lg={10.5}
                        setFilterOptions={(opts) => {
                          setFilterOptions(opts);
                          getFilteredStudents(opts);
                        }}
                        {...{
                          handleDrawerOpen,
                          selectedFilter,
                          setSelectedFilter,
                          filterOptions,
                        }}
                      />
                    </Grid>

                  </Grid>
                </Grid>
                <Grid container item xs={12} className={classes.iconsPanel}>
                  <Grid item xs={11.5} className={classes.rightIcons} alignItems="center" justifyContent="flex-end">
                    <Button
                      id="submit"
                      className={classes.activeButton}
                      onClick={handleAddUserClick}
                      variant="contained"
                      color="primary"
                    >
                      {t('ADDUSER')}
                    </Button>
                  </Grid>
                  <Grid item xs={0.5} className={classes.bulkEmail}>
                    <Tooltip title={t('SEND_EMAIL')}>
                      <IconButton
                        className={classes.emailIcon}
                        onClick={() => {
                          const emailList = getLocalStorage('adminBulkEmailUsers')?.split(',');
                          setLocalStorage('showSelectAllinEmail', false);
                          if (emailList?.length >= 1 && emailList?.[0] !== '') {
                            dispatch({ type: Constant.MAIL_FILTER, payload: 'User' });
                            dispatch({ type: Constant.RECIPIENTS, payload: emailList });
                            navigate(NavigateRoutes.ADMIN_EMAIL);
                          } else {
                            setLocalStorage('showSelectAllinEmail', true);
                            navigate(NavigateRoutes.ADMIN_EMAIL);
                          }
                        }}
                      >
                        <EmailOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid>
                  <span className={classes.errorText}>
                    { error }
                  </span>
                </Grid>
                <Grid>
                  <Grid container className={classes.userContainer}>
                    <Grid container className={classes.userListView}>
                      <ListView
                        oncallUserClick={(row) => oncallUserClick(row)}
                        // onEditUserClick={onEditUserClick}
                        recoveryDialogOpen={(row) => {
                          setSelectedRecord(row);
                          setIsRecoveryDialogOpen(true);
                        }}
                        setEditUserProfile={() => setIsEditUserProfile(true)}
                        onClickMenu={onClickMenu}
                        onEditMenuClick={onEditMenuClick}
                        setError={setError}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Main>
            </Box>
          </Grid>
        </Grid>
      )}
      {loading && (
        <Grid>
          <Loader message={t('LOADING')} />
        </Grid>
      )}
      <DialogAtom
        isOpen={isRecoveryDialogOpen}
        dialogHeading={t('PASSWORD_RECOVERY')}
        customClass={classes.passwordDialogAtom}
        content={renderRecoveryContent()}
        secHandle={() => setIsRecoveryDialogOpen(false)}
      />

      <DialogAtom
        isOpen={recoverPasswordSuccess}
        dialogHeading={t('PASSWORD_RECOVERY')}
        customClass={classes.passwordDialogAtom}
        content={renderSuccessContent()}
        secHandle={() => setIsRecoveryDialogOpen(false)}
      />
      <DialogAtom
        isOpen={isNewUserProfile}
        dialogHeading={t('ADD_USER_INFO')}
        secHandle={() => setIsNewUserDialogOpen(false)}
        customClass={classes.userDialogAtom}
        content={(
          <AddUser
            classes={classes}
            userInfo={null}
            setUserInfo={setUserInfo}
            userFormError={userFormError}
            setUserFormError={setUserFormError}
            setDialogOpen={setIsNewUserDialogOpen}
            selectedRecord={null}
            source="addUser"
          />
        )}
      />
      <DialogAtom
        isOpen={isEditUserProfile}
        dialogHeading={t('EDIT_USER_INFORMATION')}
        customClass={classes.studentDialogAtom}
        content={(
          <EditUser
            classes={classes}
            viewLogs={viewLogs}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            userFormError={userFormError}
            setUserFormError={setUserFormError}
            setDialogOpen={setIsEditUserProfile}
            selectedRecord={selectedRecord}
            source="editUser"
          />
        )}
        secHandle={() => setIsEditUserProfile(false)}
      />
    </Box>
  );
}
