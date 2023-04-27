import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import {
  DialogAtom,
  PerformantTextField,
  PerfromantMultiValueDropdown,
} from '../../../../components/atoms';
import { AntSwitch } from '../../../../utils/commonUiComponent';
import useStyles from '../../../../custom-hooks/useStyles';
import styles from './style';
import {
  getRolePermisstion,
  getRoles,
} from '../../../../store/actions/getRole';
import {
  addRoleService,
  updateRoleService,
} from '../../../../store/services/auth';

export default function AddRoleDialog(props) {
  const { open, handleClose, selectedRole } = props;
  const { t } = useTranslation();
  const [roleStatus, setRoleStatus] = useState(selectedRole?.isActive || false);
  const classes = useStyles(styles)();
  const dispatch = useDispatch();
  const roleStore = useSelector((state) => state.getRole);
  const [roleNameError, setRoleNameError] = useState('');
  const [stopCalling, setStopCalling] = useState(true);

  useEffect(() => {
    dispatch(getRolePermisstion());
  }, []);
  const handleStatusChange = (event) => {
    setRoleStatus(event.target.checked);
  };

  const validationSchema = Yup.object({
    roleName: Yup.string(t('ROLE_NAME_REQUIRED')).required(
      t('ROLE_NAME_REQUIRED'),
    ),
    rolePermissions: Yup.array()
      .min(1, t('ROLE_PERMISSIONS_REQUIRED'))
      .required(t('ROLE_PERMISSIONS_REQUIRED')),
  });

  const refreshList = () => {
    dispatch(getRoles());
    handleClose();
  };

  const onAddRole = (values) => {
    if (stopCalling === true) {
      setStopCalling(false);
      const payload = {
        name: values?.roleName,
        isActive: roleStatus,
        permissions: values.rolePermissions.map((per) => ({ id: per })),
      };
      addRoleService(payload)
        .then(() => {
          setRoleNameError('');
          refreshList();
          toast.success('New role added');
          setStopCalling(true);
        })
        .catch((err) => {
          if (err?.errors) {
            // setRoleNameError(err?.message);
            setRoleNameError(err.errors[0].msg);
          }
          setStopCalling(true);
        });
    }
  };

  const onEditRole = (values) => {
    const payload = {
      name: values?.roleName,
      isActive: roleStatus,
      permissions: values.rolePermissions.map((per) => ({ id: per })),
    };
    updateRoleService(selectedRole?.id, payload)
      .then(() => {
        setRoleNameError('');
        refreshList();
        toast.success('User Updated Successfully');
      })
      .catch((err) => {
        if (!err?.status) {
          setRoleNameError(err?.message);
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      roleName: selectedRole?.name,
      rolePermissions: selectedRole?.selectedPermissions || [],
    },
    validationSchema,
    onSubmit: (values) => {
      if (open === 'add') {
        onAddRole(values);
      }
      if (open === 'edit') onEditRole(values);
    },
  });

  const setPreviousFieldTouch = (key) => {
    const allFields = ['roleName', 'rolePermissions'];

    const index = allFields.indexOf(key);
    if (index > -1) {
      const obj = {};
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i <= index; i++) {
        const element = allFields[i];
        obj[element] = true;
      }
      formik.setTouched({ ...formik.touched, ...obj }, true);
    }
  };

  // eslint-disable-next-line no-nested-ternary
  const getErrorText = (key, errorText) => (formik.touched[key] && formik.errors[key] ? (
    <span data-testid={key} className={classes.errorText}>
      {formik.errors[key]}
    </span>
  ) : errorText ? (
    <span className={classes.errorText}>{errorText}</span>
  ) : null);

  return (
    <div>
      <DialogAtom
        isOpen={open}
        dialogHeading={t(open === 'add' ? 'ADD_ROLE' : 'EDIT_ROLE')}
        onClose={handleClose}
        dialogActions
        primaryButton={t('SAVE')}
        customClass={classes.addRoleManager}
        secButton={t('CANCEL')}
        content={(
          <FormikProvider value={formik}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid container spacing={1}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    className={`${classes.alignGrid} ${classes.dialContact}`}
                  >
                    <PerformantTextField
                      label={`${t('ROLE_NAME')}`}
                      id="roleName"
                      required
                      name="roleName"
                      type="text"
                      disabled={false}
                      value={formik.values.roleName}
                      onBlur={() => setPreviousFieldTouch('roleName')}
                      error={roleNameError || getErrorText('roleName')}
                      onChange={formik.handleChange}
                      labelId="roleName"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    className={classes.alignGrid}
                    alignSelf="center"
                  >
                    <Typography className={classes.switchHeading}>
                      {t('STATUS')}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography className={classes.switchText}>
                        {t('INACTIVE_STATUS')}
                      </Typography>
                      <AntSwitch
                        defaultChecked
                        checked={roleStatus}
                        onChange={handleStatusChange}
                        inputProps={{ 'aria-label': 'ant design' }}
                      // className={classes.dialContact}
                        className={classes.switchUi}
                      />
                      <Typography className={classes.switchText}>
                        {t('ACTIVE_STATUS')}
                      </Typography>
                    </Stack>
                    {getErrorText('Status')}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    className={`${classes.alignGrid} ${classes.dialContact} ${classes.maxWidthAssign}`}
                  >
                    <PerfromantMultiValueDropdown
                      minWidth="100%"
                      label={`${t('ROLE_PERMISSIONS')}`}
                      id="rolePermissions"
                      name="rolePermissions"
                      value={formik.values.rolePermissions}
                      onBlur={() => setPreviousFieldTouch('rolePermissions')}
                      error={getErrorText('rolePermissions')}
                      handleChange={formik.handleChange}
                      options={roleStore.permissions.map((per) => ({
                        id: per.id,
                        name: `${per.key}`,
                      }))}
                      required
                      labelId="rolePermissions"
                    />
                    {getErrorText('rolePermissions')}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </FormikProvider>
      )}
        primaryHandle={formik.handleSubmit}
        secHandle={handleClose}
      />
    </div>
  );
}
