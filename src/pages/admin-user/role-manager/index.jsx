import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import RoleManagerTable from './role-manager-table';
import ButtonAtom from '../../../components/atoms/button';
import { Buttons } from '../../../constant';
import { useStyles } from './style';
import AddRoleDialog from './add/index';
import { getRoles } from '../../../store/actions/getRole';

export default function RoleManager() {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const roleStore = useSelector((state) => state.getRole);
  const csvLink = useRef();

  const [dataForDownload, setDataForDownload] = useState([]);
  const [bDownloadReady, setDownloadReady] = useState(false);

  useEffect(() => {
    if (csvLink && csvLink.current && bDownloadReady) {
      csvLink.current.link.click();
      setDownloadReady(false);
    }
  }, [bDownloadReady]);

  const getPermisstionsValue = (permissions) => {
    let label = '';
    permissions.forEach((permission) => {
      label += `${permission.key}, `;
    });
    return label;
  };

  const exportRoleList = () => {
    const headers = ['Role Name', 'Status', 'Role Permissions'];
    const data = roleStore?.roles.map((elem) => {
      const perLabel = getPermisstionsValue(elem?.permissions);
      return [elem?.name, elem?.isActive, perLabel];
    });
    setDataForDownload([headers, ...data]);
    setDownloadReady(true);
  };

  useEffect(() => {
    dispatch(getRoles());
  }, []);
  const [showAddRoleDialog, setShowAddRoleDialog] = useState('');
  const [selectedRole, setSelectedRole] = useState({});

  // const currDate = new Date().toLocaleDateString();
  // const currTime = new Date().toLocaleTimeString();
  const now = moment().format('MM-DD-yyyy');
  const currentTime = moment().format('h.mm A');
  const name = 'Role';

  return (
    <Grid className={classes.roleRoot}>
      <Grid container item className={classes.titleRow}>
        <Grid item>
          <Typography className={classes.headerTitle}>
            {t('ROLE_MANAGER')}
          </Typography>
        </Grid>
        <Grid className={classes.dFlex}>
          <div className={classes.marginTop}>
            <ButtonAtom
              className={classes.addbutton}
              name={t('EXPORT_TO_CSV')}
              btntype={Buttons.PRIMARY}
              type={Buttons.PRIMARY}
              onClick={() => exportRoleList()}
            />
            <CSVLink
              data={dataForDownload}
              // filename="role-list.csv"
              filename={`${name}-${now}-${currentTime}.csv`}
              className="hidden"
              ref={csvLink}
              target="_blank"
            />
          </div>
          <ButtonAtom
            className={`${classes.addbutton} ${classes.marginTop}`}
            name={t('ADD')}
            btntype={Buttons.PRIMARY}
            type={Buttons.PRIMARY}
            onClick={() => {
              setSelectedRole({});
              setShowAddRoleDialog('add');
            }}
            icon={<AddIcon />}
          />
        </Grid>

      </Grid>
      <Grid container className={classes.roleManagerContainer}>
        <Grid container className={classes.roleManagerList}>
          <Grid className={classes.tableView}>
            <RoleManagerTable
              tableData={roleStore?.roles || []}
              onEdit={(row) => {
                const selectedPermissions = [];
                (row?.permissions || []).forEach((per) => selectedPermissions.push(per.id));
                setSelectedRole({ ...row, selectedPermissions });
                setShowAddRoleDialog('edit');
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {showAddRoleDialog && (
      <AddRoleDialog
        open={showAddRoleDialog}
        selectedRole={selectedRole}
        handleClose={() => setShowAddRoleDialog('')}
      />
      )}
    </Grid>
  );
}
