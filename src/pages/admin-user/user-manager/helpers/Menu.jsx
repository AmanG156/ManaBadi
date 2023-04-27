import React from 'react';
import {
  Grid, IconButton, Menu, MenuItem,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import useStyles from '../../../../custom-hooks/useStyles';
import { colors } from '../../../../theme';

const styles = () => ({
  contactUsLinks: {
    textDecoration: 'none',
    color: colors.black,
    verticalAlign: 'middle',
  },
  menuItemIcon: {
    verticalAlign: 'middle',
    '@media (min-width: 1200px)': {
      width: '1.2vw',
    },
    marginRight: '0.3vw',
  },
});
export default function GetMenu({
  menuViewType,
  t,
  rowInfo,
  recoveryDialogOpen,
  setEditUserProfile,
  onEditMenuClick,
}) {
  const classes = useStyles(styles)();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const actionDots = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid>
      <Tooltip title={t('OPTIONS')} placement="top">
        <IconButton
          aria-label="menu"
          onClick={handleClick}
        >
          <MoreVertIcon style={{ color: '#015EEA' }} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={actionDots}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 1px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiMenuItem-root': {
              borderBottom: '0.1vw solid #d0d0d0',
              '@media (min-width: 1200px)': {
                padding: '1vw',
                fontSize: '0.9vw',
              },
              borderRadius: '0vw',
              display: 'list-item',

            },
          },
        }}
        style={
          menuViewType === 'grid' ? { display: 'flex', flexDirection: 'column' } : {}
        }
      >
        <a className={`${classes.menuItemAnchor} ${classes.contactUsLinks}`} href={`tel:${rowInfo.contact}`}>
          <MenuItem
            onClick={() => { }}
            href={`tel:${rowInfo.contact}`}
          >
            <CallOutlinedIcon className={classes.menuItemIcon} />
            {t('CALL_USER')}
          </MenuItem>
        </a>
        <MenuItem
          onClick={() => {
            onEditMenuClick(rowInfo);
            setEditUserProfile();
          }}
          className={classes.menuItem}
        >
          <EditOutlinedIcon className={classes.menuItemIcon} />
          {t('EDIT_USER')}
        </MenuItem>
        <MenuItem
          onClick={() => recoveryDialogOpen(rowInfo)}
          className={classes.menuItem}
        >
          <LockOpenOutlinedIcon className={classes.menuItemIcon} />
          {t('PASSWORD_RECOVERY')}
        </MenuItem>
      </Menu>
    </Grid>
  );
}
