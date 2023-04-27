/* eslint-disable no-unused-expressions */
import React from 'react';
import {
  Grid, IconButton, Menu,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useTranslation } from 'react-i18next';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  menuContainer: {
    zIndex: '9999 !important',
  },
}));

function MenuWrapperComponent(props) {
  const { menuViewType, children } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const actionDots = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    // localStorage.setItem('collapseListStudent', false);
    // menuViewType === 'list' && setOpen(false);
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };
  const { t } = useTranslation();
  return (
    <Grid>
      <Tooltip title={t('OPTIONS')} placement="top">
        <IconButton
          aria-label="menu"
          onClick={handleClick}
        >
          <MoreHorizIcon style={{ color: '#015EEA' }} />
        </IconButton>
      </Tooltip>
      <Menu
        className={classes.menuContainer}
        anchorEl={anchorEl}
        open={actionDots}
        onClose={handleClose}
        onClick={(event) => handleClose(event)}
        PaperProps={{
          elevation: 0,
          sx: {
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
              overflow: 'auto',
            },
            '&.MuiPaper-root-MuiPopover-paper': {
              overflow: 'auto',
            },
          },
        }}
        style={
          menuViewType === 'grid' ? { display: 'flex', flexDirection: 'column' } : {}
        }
      >
        {children}
      </Menu>
    </Grid>

  );
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  return prevProps.row === nextProps.row;
}
export default React.memo(MenuWrapperComponent, areEqual);
