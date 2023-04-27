import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Grid } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Loader, MultiSelectAutoComplete } from '../../../components/atoms';
import { Buttons } from '../../../constant';
import useStyles from '../../../custom-hooks/useStyles';
import styles from './style';
import commonStyle from '../../../utils/commonClasses';
import { addTeacher, getClassrooms } from '../../../store/actions/getLocationCoordinator';

function DialogFooter({
  classes, setDialogOpen, t, onSubmit,
}) {
  const commonClasses = useStyles(commonStyle)();
  return (
    <Grid container className={classes.dialogButtons}>
      <Grid container justifyContent="flex-end">
        <Button
          name={t('CANCEL')}
          onClick={() => setDialogOpen(false)}
          btntype={Buttons.SECONDARY}
        />
        <Button
          name={t('ADD_TEACHER')}
          onClick={onSubmit}
          btntype={Buttons.PRIMARY}
          className={commonClasses.activeButton}
        />
      </Grid>
    </Grid>
  );
}
export default function AddTeacher({
  viewLogs, setDialogOpen, addTeacherInfo,
  classroomListPayload,
}) {
  const { t } = useTranslation();
  const reduxStore = useSelector((state) => state);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const dispatch = useDispatch();
  const courseList = reduxStore?.getStudent?.courses;
  const classes = useStyles(styles)();
  const validationSchema = Yup.object({
  });
  const formik = useFormik({
    initialValues: {
    },
    validationSchema,
    onSubmit: () => {
      const isPrimaryTeacherSelected = selectedOptions?.filter((op) => op.checked === true);
      if (isPrimaryTeacherSelected?.length) {
        setError(false);
        setLoading(true);
        const loadRefreshData = () => {
          setDialogOpen(false);
          setLoading(false);
        };
        const refreshList = () => {
          dispatch(getClassrooms(classroomListPayload, loadRefreshData));
        };
        const addTeacherData = selectedOptions?.map((i) => ({
          isPrimary: i?.checked,
          email: i?.email,
          userId: i?.key,
          googleClassId: addTeacherInfo?.googleClassId,
          classRoomId: addTeacherInfo?.classRoomId,
        }));
        const payload = addTeacherData.filter((x) => (x.email !== '' || x.userId !== ''));

        dispatch(addTeacher(payload, refreshList));
      } else {
        setError(t('TEACHER_REQUIRED'));
      }
    },
  });

  const getErrorText = (key, errorText) => {
    if (formik.touched[key] && formik.errors[key]) {
      return (
        <span data-testid={key} className={classes.errorText}>
          {formik.errors[key]}
        </span>
      );
    } if (errorText) {
      return (
        <span className={classes.errorText}>
          {errorText}
        </span>
      );
    }
    return null;
  };

  useEffect(() => {
  }, [courseList, error]);
  return (
    <Grid container className={classes.gridContainer}>
      <form
        name="course-info"
        noValidate
        autoComplete="off"
        className={classes.form}
      >
        <Grid container spacing={2} className={classes.alignGrid} flexDirection="row">
          <Grid item xs={3} md={1.5} className={classes.label}>
            {t('COURSE')}
          </Grid>
          <Grid item xs={9} md={10.5} flexDirection="row">
            :
            <span className={classes.value}>
              {addTeacherInfo?.course}
              {` (${'Sec'} ${addTeacherInfo?.section})`}
            </span>
          </Grid>
          <Grid container spacing={2} className={classes.alignGrid} flexDirection="row">
            {getErrorText('course')}
          </Grid>
          <Grid container spacing={2} className={classes.alignGrid} flexDirection="row">
            <Grid item xs={3} md={1.5} className={classes.label}>
              {t('TEACHERS')}
            </Grid>
            <Grid item xs={9} md={8} flexDirection="row" className={classes.multiSelect}>
              :
              <MultiSelectAutoComplete
                data={addTeacherInfo}
                setSelectedOptions={setSelectedOptions}
                {...{
                  setSelectedOptions,
                  selectedOptions,
                  setError,
                  t,
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.alignGrid} flexDirection="row">
            {getErrorText({}, error)}
          </Grid>

        </Grid>
      </form>
      <DialogFooter
        classes={classes}
        setDialogOpen={setDialogOpen}
        viewLogs={viewLogs}
        onSubmit={formik.handleSubmit}
        t={t}
      />

      {loading && (
        <Grid>
          <Loader message={t('LOADING')} />
        </Grid>
      )}

    </Grid>
  );
}
