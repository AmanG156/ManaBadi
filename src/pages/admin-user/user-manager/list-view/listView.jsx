import React, { useEffect, useState, memo } from 'react';
import {
  Grid, IconButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DataGridPro } from '@mui/x-data-grid-pro';
import Tooltip from '@mui/material/Tooltip';
import {
  useNavigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import MailIcon from '../../../../assets/svg/mailIcon';
import UserIcon from '../../../../assets/svg/userIcon';
import Loader from '../../../../components/atoms/loader';
import useUser from '../../../../custom-hooks/useUser';
import { CustomUnsortedIcon, CustomAscendingIcon, CustomDescendingIcon } from '../../../../utils/commonUiComponent';
import Menu from '../helpers/Menu';
import Constant from '../../../../store/constant';
import { NavigateRoutes } from '../../../../constant';
import useStyles from './style';
// import ProfileImage from '../helpers/ProfileImage';
import {
  impersonateUser,
} from '../../../../store/actions/getAdmin';
import CommonProfileImage from '../../../../components/molecules/common/CommonProfileImage';
import { setLocalStorage } from '../../../../utils/localStorageMethod';

function ListView({
  onUserClick,
  onEditUserClick,
  recoveryDialogOpen,
  setEditUserProfile,
  onClickMenu,
  onEditMenuClick,
  setError,
}) {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [sortModel, setSortModel] = useState([
    {
      field: 'regDate',
      sort: 'desc',
    },
  ]);

  const handleSortChange = (model) => {
    if (JSON.stringify(model) !== JSON.stringify(sortModel)) {
      setSortModel(model);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleImpersonate = (rowInfo) => {
    dispatch(impersonateUser({
      email: rowInfo?.studentInfo?.manabadiEmail,
    }));
    localStorage.setItem('impersonateUser', JSON.stringify({ state: { showView: true, email: rowInfo?.studentInfo?.manabadiEmail } }));
    setLocalStorage('myView', 'cardView');
    navigate(NavigateRoutes.STUDENT_DASHBOARD, { state: { showView: true, email: rowInfo?.studentInfo?.manabadiEmail } });
  };

  const selectedUserData = useUser();
  const [usersData, setUsersData] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);

  useEffect(() => {
    setLocalStorage('adminBulkEmailUsers', '');
    const emailList = [];
    if (selectedRows.length > 0) {
      const personalEmailList = selectedRows.map((user) => user?.personal_email).filter((x) => x !== null);
      // if (personalEmailList.length > 0) emailList.push(personalEmailList);
      const mbEmailList = selectedRows.map((user) => user?.manabadi_email).filter((x) => x !== null);
      if (mbEmailList.length > 0) emailList.push(mbEmailList);
      dispatch({ type: Constant.MAIL_PARENTS, payload: personalEmailList });

      setLocalStorage('adminBulkEmailUsers', emailList);
    } else {
      setLocalStorage('adminBulkEmailUsers', '');
    }
  }, [selectedRows]);

  let rows = [];
  let userObj = {};
  useEffect(() => {
    setUsersData(selectedUserData.users);
  }, [usersData, selectedUserData.users]);

  useEffect(() => {
    setUserRoles(selectedUserData.userRoles);
  }, [userRoles, selectedUserData.userRoles]);

  useEffect(() => {
    rows = [];
    usersData?.forEach((user) => {
      const selectedRoleOptions = [];
      user?.roles?.forEach((selectedVal) => {
        const selectedRole = userRoles.find((ro) => ro.name === selectedVal.name);
        if (selectedRole?.name) selectedRoleOptions.push(selectedRole.name);
      });
      userObj = {
        ...user,
        // id: user?.id,
        profileImage: user?.profile_photo,
        userName: `${user?.first_name} ${user?.last_name}`,
        manabadiEmail: user?.manabadi_email,
        userStatus: user?.is_active ? t('ACTIVE_STATUS') : t('INACTIVE_STATUS'),
        addressText: user?.address?.address,
        role: selectedRoleOptions.join(', '),
        actions: 'popup',
      };
      rows.push(userObj);
    });
    setRowData(rows);
  }, [usersData, selectedUserData.users]);
  const onEmailUser = () => {
  };
  const onImpersonateClick = () => {
  };
  const columns = [
    {
      field: 'profileImage',
      headerName: t('PICTURES'),
      sortable: false,
      renderCell: (rowInfo) => (
        <CommonProfileImage
          key={rowInfo?.id}
          src={`${rowInfo?.row?.profileImage}?${Date.now()}`}
        />
      ),
      headerClassName: 'picturesHeader',
      cellClassName: 'picturesCell',
    },
    {
      field: 'userName',
      headerName: t('NAME'),
      align: 'left',
      class: 'studentNameField',
      headerClassName: 'studentNameHeader',
      cellClassName: 'studentNameCell',

    },
    {
      field: 'role',
      headerName: t('ROLE_NAME'),
      align: 'left',
      headerClassName: 'studentNameHeader',
      cellClassName: 'studentNameHeader',
    },
    {
      field: 'gender',
      headerName: t('GENDER'),
      align: 'left',
      headerAlign: 'left',
      headerClassName: 'dateHeader',
      cellClassName: 'dateCell',
    },
    {
      field: 'manabadiEmail', headerName: t('EMAIL'), align: 'left', headerAlign: 'left', headerClassName: 'studentNameHeader', cellClassName: 'studentNameCell',
    },
    {
      field: 'addressText', headerName: t('ADDRESS'), align: 'left', headerAlign: 'left', headerClassName: 'studentNameHeader', cellClassName: 'studentNameCell',
    },
    {
      field: 'userStatus', headerName: t('STATUS'), align: 'left', headerAlign: 'left', headerClassName: 'dateHeader', cellClassName: 'dateCell',
    },
    {
      field: 'actions',
      headerName: t('ACTIONS'),
      sortable: false,
      headerAlign: 'center',
      align: 'left',
      headerClassName: 'actionHeader',
      cellClassName: 'actionCell',
      renderCell: (rowInfo) => (
        <Grid item xs={12} lg={3} display="flex" alignItems="center">
          <Tooltip title={t('SEND_EMAIL')}>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => {
                const emailUsers = [];
                const personalEmails = [];
                setLocalStorage('showSelectAllinEmail', false);
                personalEmails.push(rowInfo?.row?.personal_email?.toString());
                emailUsers.push(rowInfo?.row?.manabadiEmail?.toString());
                dispatch({ type: Constant.MAIL_FILTER, payload: 'User' });
                dispatch({ type: Constant.MAIL_PARENTS, payload: personalEmails });
                dispatch({ type: Constant.RECIPIENTS, payload: emailUsers });
                navigate(NavigateRoutes.ADMIN_EMAIL);
              }}
              aria-label="mail"
            >
              <MailIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('IMPERSONATE')}>
            <IconButton
              // onClick={() => handleImpersonate(rowInfo)}
              size="large"
              color="inherit"
            >
              <UserIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('HELP')}>
            <Menu
              key={rowInfo?.row?.id}
              t={t}
              rowInfo={rowInfo?.row}
              onUserClick={(row) => onUserClick(row)}
              onEditUserClick={onEditUserClick}
              recoveryDialogOpen={recoveryDialogOpen}
              onImpersonateClick={onImpersonateClick}
              onEmailUser={onEmailUser}
              setEditUserProfile={setEditUserProfile}
              onClickMenu={onClickMenu}
              onEditMenuClick={onEditMenuClick}
              menuViewType="list"
            />
          </Tooltip>
        </Grid>
      ),
    },

  ];

  return (
    <Grid container className={`${classes.userDetails} ${classes.withoutScroll}`}>
      {usersData?.length > 0
        ? (
          <div style={{ height: '26vw', width: '100%' }}>
            <DataGridPro
              rows={rowData}
              columns={columns}
              autoHeight
              disableColumnFilter
              disableColumnSelector
              disableColumnMenu
              disableSelectionOnClick
              checkboxSelection
              className={classes.dataGrid}
              components={{
                ColumnUnsortedIcon: CustomUnsortedIcon,
                ColumnSortedAscendingIcon: CustomAscendingIcon,
                ColumnSortedDescendingIcon: CustomDescendingIcon,
              }}
              sortModel={sortModel}
              onSortModelChange={handleSortChange}
              pageSize={100}
              onSelectionModelChange={(ids) => {
                setError('');
                const selectedIDs = new Set(ids);
                const selectedData = usersData.filter((row) => selectedIDs.has(row.id));
                setSelectedRows(selectedData);
              }}
            />
          </div>
        ) : (
          <Grid>
            <Loader message={t('LOADING')} />
          </Grid>
        )}
    </Grid>
  );
}
function areEqual() {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  return true;
}
export default memo(ListView, areEqual);
