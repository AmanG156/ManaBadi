import React from 'react';
import {
  Grid, IconButton,
  MenuItem,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import {
  useNavigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import makeStyles from '@mui/styles/makeStyles';
import {
  impersonateUser,
} from '../../../../store/actions/getAdmin';
import MailIcon from '../../../../assets/svg/mailIcon';
import UserIcon from '../../../../assets/svg/userIcon';
import MenuWrapper from './menuWrapper';
import Constant from '../../../../store/constant';
import { NavigateRoutes } from '../../../../constant';
import { getLocalStorage, setLocalStorage } from '../../../../utils/localStorageMethod';
import userRoles from '../../../../constant/userRoles';

import { colors } from '../../../../theme';

const useStyles = makeStyles(() => ({
  menuItemIcon: {
    '@media (min-width: 1200px)': {
      width: '1.2vw',
      marginRight: '0.3vw',
    },
    verticalAlign: 'middle',
    marginRight: '0.3vw',
    overflow: 'auto',
  },
  studentCardMenuIcon: {
    color: `${colors.primary} !important`,
    '&.MuiButtonBase-root.MuiIconButton-root': {
      '@media (min-width: 1200px)': {
        padding: '0.1vw 0.8vw !important',
        fontSize: '2vw',
      },
      '@media (max-width: 1199px)': {
        padding: '0 10px',
      },
      display: 'block',
    },
  },
}));

function MenuComponent({
  menuViewType,
  t,
  rowInfo,
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
  MarksDetailsOpen,
  setOpen,
  filterOptions,
}) {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = getLocalStorage('userRole');
  const isAdmin = (userRole === userRoles.SUPER_ADMIN);

  const handleImpersonate = () => {
    dispatch(impersonateUser({
      email: rowInfo?.studentInfo?.manabadiEmail,
    }));
    localStorage.setItem('impersonateUser', JSON.stringify({ state: { showView: true, email: rowInfo?.studentInfo?.manabadiEmail } }));
    setLocalStorage('myView', 'cardView');
    navigate(NavigateRoutes.STUDENT_DASHBOARD, { state: { showView: true, email: rowInfo?.studentInfo?.manabadiEmail, filterOptions } });
  };
  return (
    <Grid>
      <MenuWrapper menuViewType={menuViewType} setOpen={setOpen} row={rowInfo}>
        {isAdmin ? (
          <MenuItem
            onClick={() => paymentDialogOpen(rowInfo)}
            className={classes.menuItem}
          >
            <MonetizationOnOutlinedIcon className={classes.menuItemIcon} />
            {t('SHOW_PAYMENT_INFO')}
          </MenuItem>
        ) : ''}

        <MenuItem
          onClick={() => recoveryDialogOpen(rowInfo)}
          className={classes.menuItem}
        >
          <LockOpenOutlinedIcon className={classes.menuItemIcon} />
          {t('PASSWORD_RECOVERY')}
        </MenuItem>

        {isAdmin ? (
          <MenuItem onClick={() => onUpdateParentClick(rowInfo)} className={classes.menuItem}>
            <EditOutlinedIcon className={classes.menuItemIcon} />
            {t('EDIT_PARENTINFO')}
          </MenuItem>
        ) : ''}

        {isAdmin ? (
          <MenuItem
            onClick={() => {
              onEditMenuClick(rowInfo);
              setEditStudentProfile(true);
            }}
            className={classes.menuItem}
          >
            <EditOutlinedIcon className={classes.menuItemIcon} />
            {t('EDIT_STUDENT_PROFILE')}
          </MenuItem>
        ) : ''}

        <MenuItem
          onClick={() => {
            onClickMenu(rowInfo);
            setSwapCourseOrLocation(true);
          }}
          className={classes.menuItem}
        >
          <SwapHorizOutlinedIcon className={classes.menuItemIcon} />
          {t('SWAP_COURSE_LOCATION')}
        </MenuItem>

        {isAdmin ? (
          <MenuItem
            onClick={() => showStudentLogs(rowInfo)}
            className={classes.menuItem}
          >
            <TextSnippetOutlinedIcon className={classes.menuItemIcon} />
            {t('SHOW_STUDENT_LOGS')}
          </MenuItem>
        ) : ''}
        {isAdmin ? (
          <MenuItem
            onClick={() => onClickCancelEnrollMenu(rowInfo)}
            className={classes.menuItem}
          >
            <TextSnippetOutlinedIcon className={classes.menuItemIcon} />
            {t('CANCEL_ENROLLMENT')}
          </MenuItem>
        ) : ''}

        {isAdmin ? (
          <MenuItem
            onClick={() => editExamDetailsOpen(rowInfo)}
            className={classes.menuItem}
          >
            <EditOutlinedIcon className={classes.menuItemIcon} />
            {t('EDIT_EXAM_DETAILS')}
          </MenuItem>
        ) : ''}

        {menuViewType !== 'grid' && isAdmin ? (
          <MenuItem
            onClick={() => MarksDetailsOpen(rowInfo)}
            className={classes.menuItem}
          >
            <BookmarksOutlinedIcon className={classes.menuItemIcon} />
            {t('MARKS_DETAILS')}
          </MenuItem>
        ) : ''}

      </MenuWrapper>
      {menuViewType === 'grid' && (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {isAdmin ? (
            <>
              <Tooltip title={t('SEND_EMAIL')} placement="right">
                <IconButton
                  onClick={() => {
                    const emailStudents = [];
                    const emailParents = [];
                    emailParents.push(rowInfo.parent1Info.personalEmail?.toString());
                    emailParents.push(rowInfo.parent2Info.personalEmail?.toString());
                    emailStudents.push(rowInfo.studentInfo.manabadiEmail?.toString());
                    const filtersList = [];
                    selectedFilter?.forEach((obj) => {
                      filtersList.push(obj);
                    });
                    setLocalStorage('showSelectAllinEmail', false);
                    dispatch({ type: Constant.RECIPIENTS, payload: emailStudents });
                    dispatch({ type: Constant.STUDENT_FILTERS, payload: filtersList });
                    dispatch({ type: Constant.MAIL_FILTER, payload: 'Student' });
                    dispatch({ type: Constant.MAIL_PARENTS, payload: emailParents });
                    navigate(NavigateRoutes.ADMIN_EMAIL);
                  }}
                  aria-label="mail"
                  className={classes.studentCardMenuIcon}
                >
                  <MailIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('IMPERSONATE')} placement="right">
                <IconButton
                  aria-label="impersonate"
                  className={classes.studentCardMenuIcon}
                  onClick={() => handleImpersonate()}
                >
                  <UserIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : ('')}
        </>
      )}
    </Grid>

  );
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  return prevProps.rowInfo === nextProps.rowInfo;
}
export default React.memo(MenuComponent, areEqual);
